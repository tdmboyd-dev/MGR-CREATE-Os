#!/usr/bin/env node
/**
 * migrate-locks-to-ucos.js
 *
 * Converts the 57 legacy character locks (36 MGR agents + 21 iKi avatars) into
 * UCOS v3.5.3-compliant YAML files matching SHEET 1 schema.
 *
 * Sources:
 *   - D:/Money Grind Religion Projects/MGR AGENTS/AGENT_CHARACTER_LOCKS.md      (36 MGR)
 *   - D:/Money Grind Religion Projects/MGR AGENTS/IKICKITZ_CHARACTER_LOCKS.md   (21 iKi)
 *
 * Output:
 *   mgr-agents/public/agents/ucos-locks/<slug>.yaml  (one file per character)
 *   mgr-agents/public/agents/ucos-locks/_INDEX.json   (registry of all 57)
 *
 * Idempotent: re-running re-reads the .md sources and rewrites the YAMLs.
 * Does NOT delete the source .md files — those remain as legacy reference until
 * the migration is verified end-to-end.
 *
 * Usage:
 *   node scripts/migrate-locks-to-ucos.js
 *   node scripts/migrate-locks-to-ucos.js --dry-run   (print, no write)
 *   node scripts/migrate-locks-to-ucos.js --slug=milo (one character)
 *
 * © 2025-2026 Money Grind Religion Inc.
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.resolve(__dirname, "..", "..");
const MGR_LOCKS = path.join(ROOT, "AGENT_CHARACTER_LOCKS.md");
const IKI_LOCKS = path.resolve(__dirname, "..", "IKICKITZ_CHARACTER_LOCKS.md");
const OUT_DIR = path.resolve(__dirname, "..", "public", "agents", "ucos-locks");

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const SINGLE_SLUG = (args.find((a) => a.startsWith("--slug=")) || "").split("=")[1] || null;

// ─── PARSE LOCK MARKDOWN ─────────────────────────────────────────────────────

/**
 * Parse a single lock .md into character-blocks.
 * Block headers look like:  ## TITAN  /  ## SLOT 2 — HEIRLOOM  /  ## AGENT #5: BLAZE
 * Returns array of { slug, name, body } where body is the raw 7-layer text.
 */
function parseLockFile(filePath, platform) {
  if (!fs.existsSync(filePath)) {
    console.warn(`! ${filePath} not found — skipping`);
    return [];
  }
  const text = fs.readFileSync(filePath, "utf8");
  const headerRe = /^##\s+(?:AGENT|AVATAR|SLOT)?\s*#?\d*\s*[:\-—–]*\s*([A-Z_][A-Z0-9_\- ]*[A-Z0-9_])(?=\s*[\/\(\n]|\s*$)/gim;
  const blocks = [];
  let match;
  const positions = [];
  while ((match = headerRe.exec(text)) !== null) {
    positions.push({ start: match.index, name: match[1].trim(), endHeader: match.index + match[0].length });
  }
  for (let i = 0; i < positions.length; i++) {
    const pos = positions[i];
    const next = positions[i + 1];
    const body = text.slice(pos.endHeader, next ? next.start : text.length).trim();
    const slug = pos.name.toLowerCase().replace(/\s+/g, "_").replace(/-/g, "_");
    blocks.push({ slug, name: pos.name, body, platform });
  }
  // Filter out non-character meta sections (reference tables, indexes, summaries)
  const SKIP_SLUGS = new Set([
    "trigger_words_quick_reference",
    "cross_platform_disambiguation",
    "table_of_contents",
    "index",
    "appendix",
    "notes",
    "changelog",
  ]);
  return blocks.filter((b) => !SKIP_SLUGS.has(b.slug));
}

// ─── EXTRACT 7-LAYER FIELDS FROM BODY ───────────────────────────────────────

/**
 * The legacy locks are mostly **bullet lists** (one feature per line, prefixed with `-`),
 * not strict FACE:/BODY:/OUTFIT: labels. We use a heuristic classifier:
 * each bullet is matched against keyword patterns and bucketed into one of the 7 layers.
 *
 * Lines that match nothing land in `unclassified` (still preserved in raw_lock_text).
 *
 * Order matters — first match wins. Most-specific patterns first.
 */

// Keyword → layer routing table (case-insensitive substring match against each bullet)
const LAYER_PATTERNS = [
  // GEAR — accessories, jewelry, weapons, tech wearables (specific items)
  { layer: "gear", patterns: [
    /\b(rolex|chain|necklace|earring|stud|airpods|watch|glove|ring|pendant|crown|halo|book|wand|staff|sword|gun|cane|cigar|microphone|controller|gamepad|headphone|visor|bandana|do[\- ]?rag|bonnet|backpack|holster|brass\s+knuckle)\b/i,
    /\b(cuban link|gold cuban|diamond stud|gold tooth|grill|gold cuff|gold cuffs)\b/i,
  ]},
  // OUTFIT — clothing, footwear (whole-body coverage items)
  { layer: "outfit", patterns: [
    /\b(suit|tuxedo|tux|blazer|jacket|hoodie|tee|shirt|turtleneck|sweater|cardigan|coat|robe|dress|gown|kimono|kilt|skirt|jeans|pants|trousers|shorts|leggings|jumpsuit|tracksuit|uniform|scrubs|labcoat|apron|bomber|trench|peacoat|vest|tank)\b/i,
    /\b(jordans|sneakers|boots|loafers|heels|sandals|kicks|sneaker|trainer)\b/i,
    /\b(all\s+black|fitted|oversized|tailored|designer|fresh|skinny|baggy|cropped|distressed)\b/i,
  ]},
  // FACE — head, face, hair, eyes (when describing appearance, not power)
  { layer: "face", patterns: [
    /\b(skin|skinned|complexion|black\s+(man|woman)|brown[\- ]skinned|dark[\- ]skinned|light[\- ]skinned|medium[\- ](dark|light)[\- ]skinned|caramel|mocha|chocolate|tone)\b/i,
    /\b(face|jawline|chin|cheek|forehead|nose|lips|teeth|smile|grin|frown|expression|gaze)\b/i,
    /\b(eyes?|iris|pupil)\b(?!.*\b(beam|fire|laser|scan|glow.*neon|cosmic.*scan)\b)/i,
    /\b(hair|braid|loc|locs|dreadlock|fade|buzz\s+cut|afro|fro|cornrow|wave|wig|ponytail|topknot|bun|bald|shaved|head|natural)\b/i,
    /\b(\d+s|early\s+\d+s|mid\s+\d+s|late\s+\d+s)\b/i, // age cues
  ]},
  // BODY — height, build, posture, anatomy
  { layer: "body", patterns: [
    /\b(\d['′]\d+|\d['′]\s*\d+\s*(?:tall)?|\d+\s*feet|\d+\s*ft|tall|short|athletic|lean|chiseled|powerful|muscular|slim|stocky|burly|petite|curvy|toned|ripped|build|frame|stature|posture)\b/i,
    /\b(shoulder[s]?|chest|arm[s]?|hand[s]?|leg[s]?|torso|back|spine|knee|elbow|wrist|ankle|bicep|forearm|thigh|calf)\b(?!\s*(?:ring|chain|cuff|bracelet))/i,
  ]},
  // POWERS — energy, glow, lightning, fire, beams (visual power effects)
  { layer: "powers", patterns: [
    /\b(lightning|fire|flame|fla?me|ice|frost|smoke|fog|aura|energy|plasma|laser|beam|spark|crackle|electric|thunder|nova|cosmic|holo|hologram|holographic|particle|quantum|telekine|telepath|psychic|burn|radiat|emit|pulse|glow|shimmer|halo|wing|portal|teleport|reality)\b/i,
    /\b(green\s+lightning|blue\s+plasma|red\s+fire|golden\s+aura|purple\s+energy|cyan\s+glow|circuit\s+vein)\b/i,
    /\b(arc reactor|core|nucleus|matrix|web|grid|field|forcefield|shield)\b/i,
    /\b(erupt|burst|surge|cascade|spread|rip|crack|shatter|fracture|warp|distort|bend)\b/i,
  ]},
  // ENVIRONMENT — background, lighting, scene, fog
  { layer: "environment", patterns: [
    /\b(background|backdrop|cinematic|volumetric|fog|mist|smoke[\- ]filled|atmosphere|setting|scene|stage|environment|surrounding|world|space|void|cosmos|starfield|night|dark|bright|neon|moody|dramatic|lit|illuminated)\b/i,
    /\b(ground|floor|sky|ceiling|wall|street|alley|stage|throne|pedestal|platform|cityscape|skyline)\b/i,
  ]},
  // ABILITIES — orbiting items, charts, holograms tied to skill (last-resort bucket for "stuff floating around them")
  { layer: "abilities", patterns: [
    /\b(orbit|orbiting|float|floating|swirl|swirling|surround|surrounding|circle|circling|spiral|spiraling|hover|hovering)\b/i,
    /\b(chart|graph|dashboard|panel|interface|ui|hud|metric|stat|number|currency|dollar|coin|icon|logo|symbol|sigil|rune)\b/i,
    /\b(deal|pipeline|funnel|calendar|content|analytic|tracking|monitor|scanner|radar|map)\b/i,
  ]},
];

function extractLayers(body) {
  const layers = { face: [], body: [], outfit: [], gear: [], powers: [], environment: [], abilities: [] };

  // Each bullet line gets routed to first-matching layer
  const lines = body.split("\n");
  for (const line of lines) {
    const trimmed = line.replace(/^[\s\-•*]+/, "").trim();
    if (!trimmed) continue;

    let matched = false;
    for (const { layer, patterns } of LAYER_PATTERNS) {
      if (patterns.some((re) => re.test(trimmed))) {
        layers[layer].push(trimmed);
        matched = true;
        break;
      }
    }
    // If no match, put in environment (least-specific catchall)
    if (!matched) layers.environment.push(trimmed);
  }

  // Join arrays into clean comma-separated strings
  const out = {};
  for (const [k, arr] of Object.entries(layers)) {
    out[k] = arr.join(". ").replace(/\.\.+/g, ".").trim();
  }
  return out;
}

// ─── INFER METADATA ──────────────────────────────────────────────────────────

const MGR_RARITY_DEFAULT = "COMMON";
const IKI_RARITY_MAP = {
  time: "GOD_TIER",
  heirloom: "GOD_TIER",
  chase: "SUPER_ELITE",
  angelic: "SUPER_ELITE",
  warzone: "GOVERNOR",
  cupid: "GOVERNOR",
  arcade: "GOVERNOR",
  guardian: "GOVERNOR",
  big_bruh: "GOVERNOR",
};
const MGR_PRODUCT_LADDER = {
  ladder: "mgr_agents",
  available_to_subscription: ["pro", "business", "agency", "agency_pro", "founder"],
};
const IKI_PRODUCT_LADDER_BY_RARITY = {
  GOD_TIER:    { ladder: "iki", available_to_subscription: ["founder"] },
  SUPER_ELITE: { ladder: "iki", available_to_subscription: ["elite", "founder"] },
  GOVERNOR:    { ladder: "iki", available_to_subscription: ["diamond", "elite", "founder"] },
  COMMON:      { ladder: "iki", available_to_subscription: ["free", "diamond", "elite", "founder"] },
};
const POWER_TIER_BY_SUBSCRIPTION = {
  free: "Spark", starter: "Ember", pro: "Inferno", business: "Nova",
  agency: "Supernova", agency_pro: "Cosmos", founder: "Ascendant",
  diamond: "Inferno", elite: "Nova",
};

function buildAccessModel(slug, platform) {
  if (platform === "mgr") {
    return {
      product_ladder: MGR_PRODUCT_LADDER.ladder,
      character_rarity: MGR_RARITY_DEFAULT,
      available_to_subscription: MGR_PRODUCT_LADDER.available_to_subscription,
      power_tier_unlock_by_sub: Object.fromEntries(
        MGR_PRODUCT_LADDER.available_to_subscription.map((tier) => [tier, POWER_TIER_BY_SUBSCRIPTION[tier]])
      ),
    };
  }
  // iKi
  const rarity = IKI_RARITY_MAP[slug] || "COMMON";
  const cfg = IKI_PRODUCT_LADDER_BY_RARITY[rarity];
  return {
    product_ladder: cfg.ladder,
    character_rarity: rarity,
    available_to_subscription: cfg.available_to_subscription,
    power_tier_unlock_by_sub: Object.fromEntries(
      cfg.available_to_subscription.map((tier) => [tier, POWER_TIER_BY_SUBSCRIPTION[tier] || "Inferno"])
    ),
  };
}

// ─── BUILD UCOS YAML ─────────────────────────────────────────────────────────

function buildUcosYaml({ slug, name, platform, layers, body }) {
  const access = buildAccessModel(slug, platform);
  const ucosId = `CHAR_${platform.toUpperCase()}_${slug.toUpperCase()}_${access.character_rarity}`;
  const triggerWord = platform === "iki" ? `iki_${slug}` : `mgr_${slug}`;
  const sourceHash = crypto.createHash("sha256").update(body).digest("hex").slice(0, 16);

  // Indented YAML emitter — keeps it readable and human-edit-friendly
  const lines = [];
  const push = (s) => lines.push(s);

  push(`# UCOS_CHARACTER_${name}.yaml`);
  push(`# Generated by scripts/migrate-locks-to-ucos.js from ${platform === "iki" ? "IKICKITZ_CHARACTER_LOCKS.md" : "AGENT_CHARACTER_LOCKS.md"}`);
  push(`# Source hash: ${sourceHash}`);
  push(`# Migrated: ${new Date().toISOString()}`);
  push("");
  push(`sheet_type: character`);
  push(`schema_version: 3.5.3`);
  push("");
  push(`identity:`);
  push(`  ucos_id: "${ucosId}"`);
  push(`  slug: ${slug}`);
  push(`  name: ${name}`);
  push(`  platform: ${platform}`);
  push(`  rarity_tier: ${access.character_rarity}`);
  push(`  trigger_word: ${triggerWord}`);
  push(`  platform_compatibility: { unreal: true, unity: true, blender: true, usdview: true, mgr_runtime: true }`);
  push("");
  push(`access_model:`);
  push(`  product_ladder: ${access.product_ladder}`);
  push(`  character_rarity: ${access.character_rarity}`);
  push(`  available_to_subscription: [${access.available_to_subscription.join(", ")}]`);
  push(`  power_tier_unlock_by_sub:`);
  for (const [k, v] of Object.entries(access.power_tier_unlock_by_sub)) {
    push(`    ${k}: ${v}`);
  }
  push("");
  push(`prompt_layer:`);
  push(`  face:        ${yamlString(layers.face)}`);
  push(`  body:        ${yamlString(layers.body)}`);
  push(`  outfit:      ${yamlString(layers.outfit)}`);
  push(`  gear:        ${yamlString(layers.gear)}`);
  push(`  powers:      ${yamlString(layers.powers)}`);
  push(`  environment: ${yamlString(layers.environment)}`);
  push(`  abilities:   ${yamlString(layers.abilities)}`);
  push("");
  push(`rig_layer:`);
  push(`  face_morphs:`);
  push(`    - { name: smile,         base: "lip_corner_puller_L+R",        intensity: 0.8 }`);
  push(`    - { name: blink,         base: "eye_closure_L+R",              intensity: 1.0 }`);
  push(`    - { name: neutral_relax, base: "jaw_down+lip_relax_L+lip_relax_R", intensity: 0.3 }`);
  push(`  emotion_mapping:`);
  push(`    - { name: focused,    voice_pace_wpm: 110 }`);
  push(`    - { name: triumphant, voice_pitch_st: 3 }`);
  push(`    - { name: aggressive, voice_pitch_st: -2 }`);
  push(`  usd_composition:`);
  push(`    list_ops:        { allow_add: true, allow_remove: true, allow_reorder: true }`);
  push(`    prim_specifiers: [def, over, class]`);
  push(`  genome:`);
  push(`    inheritance_resolver: { resolve_chain: true, conflict_priority: child_over_parent }`);
  push(`    mutation_rate: ${access.character_rarity === "GOD_TIER" || access.character_rarity === "COSMIC" ? "0.0" : "0.05"}`);
  push(`  rig_compatibility:`);
  push(`    target_schema:    HumanRig_Mixamo`);
  push(`    joint_count:      22`);
  push(`    blendshape_count: 52`);
  push("");
  push(`anatomy_lock:`);
  push(`  fingers: "EXACTLY 5 per hand"`);
  push(`  eyes:    "2 eyes total unless prompt_layer.face specifies otherwise"`);
  push("");
  push(`voice_layer:`);
  push(`  tts_provider:       elevenlabs`);
  push(`  voice_id:           "${slug}_v1"`);
  push(`  prosody:            { stability: 0.5, clarity: 0.75, style: 0.0 }`);
  push(`  voice_clone_status: not_trained`);
  push("");
  push(`power_visual:`);
  push(`  signature_color:    "#000000"   # TODO: human review — pull from character-sheets.ts`);
  push(`  particle_effect:    ""`);
  push(`  aura_effect:        ""`);
  push(`  finisher:           ""`);
  push(`  special_move:       ""`);
  push(`  power_tier_unlocks: ${access.character_rarity === "GOD_TIER" || access.character_rarity === "COSMIC" ? "Ascendant" : "Inferno"}`);
  push("");
  push(`# Original lock (legacy 7-layer .md text — preserved for human review):`);
  push(`raw_lock_text: |`);
  for (const ln of body.split("\n")) {
    push(`  ${ln}`);
  }
  push("");

  return lines.join("\n");
}

function yamlString(s) {
  if (!s) return '""';
  // Quote and escape for safe single-line YAML
  const cleaned = s.replace(/"/g, '\\"').replace(/\s+/g, " ").trim();
  return `"${cleaned}"`;
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

function main() {
  console.log("═══ UCOS Lock Migration v3.5.3 ═══");
  console.log(`Source MGR: ${MGR_LOCKS}`);
  console.log(`Source iKi: ${IKI_LOCKS}`);
  console.log(`Output:     ${OUT_DIR}`);
  if (DRY_RUN) console.log("DRY RUN — no files will be written");
  if (SINGLE_SLUG) console.log(`Single slug filter: ${SINGLE_SLUG}`);
  console.log("");

  const mgrBlocks = parseLockFile(MGR_LOCKS, "mgr");
  const ikiBlocks = parseLockFile(IKI_LOCKS, "iki");
  console.log(`Parsed MGR: ${mgrBlocks.length} characters`);
  console.log(`Parsed iKi: ${ikiBlocks.length} characters`);
  console.log(`Total:      ${mgrBlocks.length + ikiBlocks.length} (expecting 57: 36 MGR + 21 iKi)`);
  console.log("");

  if (!DRY_RUN && !fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  const all = [...mgrBlocks, ...ikiBlocks].filter((b) => !SINGLE_SLUG || b.slug === SINGLE_SLUG);
  const index = [];
  let written = 0;
  let skipped = 0;

  for (const block of all) {
    const layers = extractLayers(block.body);
    const yaml = buildUcosYaml({ ...block, layers });
    const outPath = path.join(OUT_DIR, `${block.slug}.yaml`);

    if (DRY_RUN) {
      console.log(`[dry] ${block.platform}/${block.slug.padEnd(20)} ${Object.values(layers).filter(Boolean).length}/7 layers extracted`);
      skipped++;
    } else {
      fs.writeFileSync(outPath, yaml);
      console.log(`✓ ${block.platform}/${block.slug.padEnd(20)} → ${path.relative(ROOT, outPath)}`);
      written++;
    }
    index.push({
      slug: block.slug,
      name: block.name,
      platform: block.platform,
      file: `${block.slug}.yaml`,
      layers_extracted: Object.values(layers).filter(Boolean).length,
    });
  }

  if (!DRY_RUN) {
    const indexPath = path.join(OUT_DIR, "_INDEX.json");
    fs.writeFileSync(indexPath, JSON.stringify({ version: "3.5.3", generated_at: new Date().toISOString(), total: index.length, characters: index }, null, 2));
    console.log(`\n✓ Index: ${path.relative(ROOT, indexPath)}`);
  }

  console.log("");
  console.log(`═══ Done — wrote ${written}, skipped ${skipped} ═══`);
}

if (require.main === module) {
  main();
}
