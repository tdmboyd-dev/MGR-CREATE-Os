export type LicenseExpr={op:"LICENSE";id:string}|{op:"AND"|"OR";items:LicenseExpr[]}|{op:"WITH";license:LicenseExpr;exception:string};export interface ConsentRecord{id:string;subjectId:string;purposes:string[];effectiveAt:string;expiresAt?:string;revokedAt?:string}/** Technical purpose/time check only; not identity, legal clearance or approval. */
export function consentAllows(c:ConsentRecord,purpose:string,now=Date.now()){
 if(!c||typeof purpose!=='string'||!purpose.trim()||!Number.isFinite(now)||!Array.isArray(c.purposes)||c.purposes.some(x=>typeof x!=='string'||!x.trim())||!c.purposes.includes(purpose)||c.revokedAt!==undefined||typeof c.effectiveAt!=='string')return false;
 const effective=Date.parse(c.effectiveAt);if(!Number.isFinite(effective)||now<effective)return false;
 if(c.expiresAt!==undefined){if(typeof c.expiresAt!=='string')return false;const expiry=Date.parse(c.expiresAt);if(!Number.isFinite(expiry)||expiry<=effective||now>=expiry)return false;}
 return true;
}
export function licenseIds(x:LicenseExpr):string[]{if(x.op==="LICENSE")return[x.id];if(x.op==="WITH")return licenseIds(x.license);return x.items.flatMap(licenseIds)}