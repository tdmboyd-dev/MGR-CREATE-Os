import { createServer, type ServerResponse } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { timingSafeEqual } from "node:crypto";
import { RivalReaperSession } from "./session.js";
import { EncryptedFileStore } from "./persistence.js";
import type { ReaperState } from "./engine.js";

export interface ReaperServerOptions {
  port?: number;
  hostToken: string;
  secret: string;
  dataPath: string;
  initialState: ReaperState;
  publicDir?: string;
}

function sameToken(actual: string | undefined, expected: string) {
  if (!actual) return false;
  const a = Buffer.from(actual), b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

function json(res: ServerResponse, status: number, value: unknown) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
  res.end(JSON.stringify(value));
}

async function body(req: import("node:http").IncomingMessage) {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    if (chunks.reduce((n, x) => n + x.length, 0) > 64_000) throw new Error("Request too large");
  }
  return chunks.length ? JSON.parse(Buffer.concat(chunks).toString("utf8")) : {};
}

export async function createRivalReaperServer(options: ReaperServerOptions) {
  const store = new EncryptedFileStore(options.dataPath, options.secret);
  const restored = await store.load();
  let session = restored ? RivalReaperSession.restore(restored) : new RivalReaperSession(options.initialState);
  const listeners = new Set<ServerResponse>();
  const publicDir = options.publicDir ?? resolve("examples/rival-reaper");

  function publicState() {
    return {
      sessionId: session.sessionId,
      assignments: session.state.assignments,
      teams: session.state.teams.map((team) => ({
        ...team,
        assigned: session.state.assignments.filter((a) => a.teamId === team.id).length,
      })),
      remaining: session.state.players.length - session.state.assignments.length,
      drawCount: session.receipts.length,
      lastReceiptHash: session.receipts.at(-1)?.receiptHash ?? null,
    };
  }
  function broadcast(type = "state") {
    const data = JSON.stringify(publicState());
    for (const res of listeners) res.write(`event: ${type}\ndata: ${data}\n\n`);
  }

  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url ?? "/", "http://localhost");
      if (req.method === "GET" && url.pathname === "/api/state") return json(res, 200, publicState());
      if (req.method === "GET" && url.pathname === "/api/events") {
        res.writeHead(200, {
          "content-type": "text/event-stream", "cache-control": "no-cache",
          "connection": "keep-alive", "x-accel-buffering": "no",
        });
        listeners.add(res);
        res.write(`event: state\ndata: ${JSON.stringify(publicState())}\n\n`);
        req.on("close", () => listeners.delete(res));
        return;
      }
      if (req.method === "POST" && url.pathname === "/api/host/draw") {
        if (!sameToken(req.headers.authorization?.replace(/^Bearer\s+/i, ""), options.hostToken)) return json(res, 401, { error: "unauthorized" });
        const input = await body(req) as { playerId?: string };
        if (!input.playerId) return json(res, 400, { error: "playerId required" });
        const result = session.drawAndLock(input.playerId);
        await store.save(session.snapshot());
        broadcast("draw");
        return json(res, 200, { team: result.team, receipt: result.receipt, randomSource: result.randomSource });
      }
      if (req.method === "GET" && url.pathname === "/api/host/audit") {
        if (!sameToken(req.headers.authorization?.replace(/^Bearer\s+/i, ""), options.hostToken)) return json(res, 401, { error: "unauthorized" });
        return json(res, 200, { receipts: session.receipts, state: session.state });
      }
      if (req.method === "GET" && ["/", "/index.html", "/arena", "/arena.html", "/host", "/host.html"].includes(url.pathname)) {
        const file = url.pathname.startsWith("/arena") ? "arena.html" : url.pathname.startsWith("/host") ? "host.html" : "index.html";
        const html = await readFile(resolve(publicDir, file), "utf8");
        res.writeHead(200, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" });
        return res.end(html);
      }
      return json(res, 404, { error: "not found" });
    } catch (error) {
      return json(res, 500, { error: error instanceof Error ? error.message : "internal error" });
    }
  });
  return {
    session,
    store,
    server,
    listen: () => new Promise<void>((resolveListen) => server.listen(options.port ?? 8787, resolveListen)),
    close: () => new Promise<void>((resolveClose, reject) => server.close((e) => e ? reject(e) : resolveClose())),
  };
}
