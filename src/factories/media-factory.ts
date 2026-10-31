import type {Factory,FactoryRequest,FactoryResult} from "./contracts.js";

export interface MediaInput {
  modality:"IMAGE"|"VIDEO"|"AUDIO"|"3D";
  brief:string;
  modelCapability:string;
  lockRefs:string[];
  rightsRefs:string[];
  verificationCriteria:string[];
}

const MODALITIES=new Set(["IMAGE","VIDEO","AUDIO","3D"]);
export class MediaFactory implements Factory {
  kind="MEDIA" as const;
  async execute(req:FactoryRequest):Promise<FactoryResult>{
    const x=req.inputs as Partial<MediaInput>|null;
    const blockers:string[]=[];
    if(!x || typeof x!=="object") blockers.push("media input object required");
    if(!MODALITIES.has(x?.modality??"")) blockers.push("unsupported media modality");
    if(typeof x?.brief!=="string" || !x.brief.trim()) blockers.push("missing media brief");
    if(typeof x?.modelCapability!=="string" || !x.modelCapability.trim()){
      blockers.push("missing media capability");
    }
    if(!Array.isArray(x?.verificationCriteria) || !x.verificationCriteria.length){
      blockers.push("missing verification criteria");
    }
    if(!Array.isArray(x?.rightsRefs) || !x.rightsRefs.length){
      blockers.push("missing rights provenance");
    }
    // This default factory is metadata-only. No provider, bytes, receipt or
    // render engine is invoked, regardless of whether x describes 3D, video,
    // audio or images. Never mint a fake media_<digest> artifact as success.
    blockers.push("verified media artifact missing; executable provider adapter and independent output verification required");
    return {
      requestId:req.id,kind:this.kind,status:"BLOCKED",artifactRefs:[],
      evidenceRefs:[
        ...(Array.isArray(x?.lockRefs)?x.lockRefs:[]),
        ...(Array.isArray(x?.rightsRefs)?x.rightsRefs:[])
      ],
      blockers
    };
  }
}
