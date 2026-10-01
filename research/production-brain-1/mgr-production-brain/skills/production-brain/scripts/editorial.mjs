import {digest} from './brain.mjs';
const integer=n=>Number.isSafeInteger(n)&&n>=0;
const label=s=>typeof s==='string'&&s.trim().length>0&&s.length<=4096;
const sum=(a,b)=>{const n=a+b;if(!Number.isSafeInteger(n))throw Error('Frame count exceeds safe integer');return n;};
export function assembleTimeline(input){
  if(!input||!label(input.id)||!input.rate)throw Error('Timeline ID and rate required');
  const {numerator,denominator}=input.rate;
  if(![numerator,denominator].every(n=>integer(n)&&n>0&&n<=1_000_000))throw Error('Invalid rational frame rate');
  if(!Array.isArray(input.items)||!input.items.length||input.items.length>10_000)throw Error('Timeline requires 1–10000 items');
  const rate=numerator/denominator,ids=new Set(),items=[],children=[];
  const time=value=>({OTIO_SCHEMA:'RationalTime.1',value,rate});
  const range=(start,duration)=>({OTIO_SCHEMA:'TimeRange.1',start_time:time(start),duration:time(duration)});
  const itemFields={metadata:{},effects:[],markers:[],enabled:true};
  let cursor=0;
  for(const item of input.items){
    if(!item||!label(item.id)||ids.has(item.id)||!['clip','gap'].includes(item.kind)||!integer(item.durationFrames)||item.durationFrames===0)throw Error('Invalid or duplicate editorial item');
    ids.add(item.id);
    if(['rate','speed','transition','retime'].some(k=>Object.hasOwn(item,k)))throw Error('Mixed rate, transitions and retimes require another adapter');
    const end=sum(cursor,item.durationFrames),manifest={...item,recordStartFrame:cursor,recordEndFrameExclusive:end};
    if(item.kind==='gap')children.push({...itemFields,OTIO_SCHEMA:'Gap.1',name:item.id,source_range:range(0,item.durationFrames)});
    else{
      for(const k of ['sourceStartFrame','availableStartFrame','availableDurationFrames'])if(!integer(item[k]))throw Error('Integer clip ranges required');
      if(item.sourceStartFrame<item.availableStartFrame||sum(item.sourceStartFrame,item.durationFrames)>sum(item.availableStartFrame,item.availableDurationFrames))throw Error('Trim exceeds declared available media');
      if(item.assetDigest!==undefined&&!/^[a-f0-9]{64}$/.test(item.assetDigest))throw Error('Invalid asset digest');
      if(item.mediaUrl!==undefined){if(!label(item.mediaUrl))throw Error('Invalid media URL');const u=new URL(item.mediaUrl);if(!['file:','https:'].includes(u.protocol)||u.username||u.password)throw Error('Only credential-free file/https media references allowed');}
      const reference={OTIO_SCHEMA:item.mediaUrl?'ExternalReference.1':'MissingReference.1',name:item.id,metadata:{mgr:{assetDigest:item.assetDigest??null,rangeEvidence:'USER_DECLARED_UNPROBED'}},available_range:range(item.availableStartFrame,item.availableDurationFrames),available_image_bounds:null};
      if(item.mediaUrl)reference.target_url=item.mediaUrl;
      children.push({...itemFields,OTIO_SCHEMA:'Clip.2',name:item.id,source_range:range(item.sourceStartFrame,item.durationFrames),media_references:{DEFAULT_MEDIA:reference},active_media_reference_key:'DEFAULT_MEDIA'});
      manifest.mediaStatus=item.mediaUrl?'REFERENCE_UNPROBED':'MISSING';
    }
    items.push(manifest);cursor=end;
  }
  const inputDigest=digest(input);
  return {schemaVersion:1,inputDigest,totalFrames:cursor,rate:{numerator,denominator},durationSecondsExact:{numerator:(BigInt(cursor)*BigInt(denominator)).toString(),denominator:String(numerator)},items,otio:{OTIO_SCHEMA:'Timeline.1',name:input.id,metadata:{mgr:{inputDigest,rate:{numerator,denominator},coverage:'cuts-and-gaps-only',roundTripVerified:false}},global_start_time:time(0),tracks:{...itemFields,OTIO_SCHEMA:'Stack.1',name:'tracks',source_range:null,children:[{...itemFields,OTIO_SCHEMA:'Track.1',name:'V1',kind:'Video',source_range:null,children}]}},limitations:['Media references and ranges are not probed.','OTIO draft has not been round-tripped through an NLE.','No transitions, retimes, audio mix or video render.']};
}
