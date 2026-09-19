import {createHash} from "node:crypto";
function canonical(value:unknown):string{if(value===null||typeof value!=="object")return JSON.stringify(value);if(Array.isArray(value))return "["+value.map(canonical).join(",")+"]";const o=value as Record<string,unknown>;return "{"+Object.keys(o).sort().map(k=>JSON.stringify(k)+":"+canonical(o[k])).join(",")+"}"}
export function sha256Canonical(value:unknown){return createHash("sha256").update(canonical(value)).digest("hex")}
export function actionDigest(actionType:string,target:unknown,payload:unknown){return sha256Canonical({actionType,target,payload})}
