import {createHash} from 'node:crypto';
import {inflateSync} from 'node:zlib';
const signature=Buffer.from('89504e470d0a1a0a','hex');
const table=Array.from({length:256},(_,n)=>{for(let i=0;i<8;i++)n=(n&1)?0xedb88320^(n>>>1):n>>>1;return n>>>0;});
export function crc32(bytes){let c=0xffffffff;for(const b of bytes)c=table[(c^b)&255]^(c>>>8);return (c^0xffffffff)>>>0;}

function png(b){
  let at=8,header=null,ended=false,seenData=false,afterData=false,palette=false,chunks=0;
  const data=[],unsupported=[];
  while(at<b.length){
    if(++chunks>100000)throw Error('PNG chunk count limit exceeded');
    if(at+12>b.length)throw Error('Truncated PNG chunk');
    const size=b.readUInt32BE(at),end=at+12+size,type=b.toString('ascii',at+4,at+8);
    if(size>0x7fffffff||end>b.length)throw Error('PNG chunk length exceeds input');
    if(!/^[A-Za-z]{2}[A-Z][A-Za-z]$/.test(type))throw Error('Invalid PNG chunk type');
    if(crc32(b.subarray(at+4,end-4))!==b.readUInt32BE(end-4))throw Error('PNG CRC mismatch');
    const chunk=b.subarray(at+8,end-4);
    if(!header&&type!=='IHDR')throw Error('PNG must begin with IHDR');
    if(type==='IHDR'){
      if(header||size!==13)throw Error('Invalid PNG IHDR');
      header={width:chunk.readUInt32BE(0),height:chunk.readUInt32BE(4),bitDepth:chunk[8],colorType:chunk[9],compression:chunk[10],filter:chunk[11],interlace:chunk[12]};
      const valid={0:[1,2,4,8,16],2:[8,16],3:[1,2,4,8],4:[8,16],6:[8,16]};
      if(!header.width||!header.height||header.width>0x7fffffff||header.height>0x7fffffff||!valid[header.colorType]?.includes(header.bitDepth)||header.compression!==0||header.filter!==0||header.interlace>1)throw Error('Invalid PNG header values');
      if(header.width*header.height>16_000_000)throw Error('PNG pixel limit exceeded');
      if(header.bitDepth!==8||![2,6].includes(header.colorType)||header.interlace!==0)unsupported.push('Only noninterlaced 8-bit RGB/RGBA scanlines inspected');
    }else if(type==='IDAT'){
      if(afterData)throw Error('Nonconsecutive PNG image data');
      seenData=true;data.push(chunk);
    }else{
      if(seenData)afterData=true;
      if(type==='PLTE'){
        if(palette||seenData||![2,3,6].includes(header.colorType)||!size||size%3||size>768)throw Error('Invalid PNG palette');
        palette=true;
      }else if(type==='IEND'){
        if(size||!seenData||end!==b.length)throw Error('Invalid PNG ending');
        ended=true;
      }else if(['acTL','fcTL','fdAT'].includes(type))unsupported.push('Animated PNG not inspected');
      else if(type[0]===type[0].toUpperCase())unsupported.push('Unknown critical PNG chunk '+type);
    }
    at=end;
  }
  if(!ended||!seenData||(header.colorType===3&&!palette))throw Error('Incomplete PNG');
  if(unsupported.length)return {status:'UNSUPPORTED_ENCODING',mime:'image/png',facts:header,limitations:[...new Set(unsupported)]};
  const stride=header.width*(header.colorType===6?4:3)+1,expected=stride*header.height;
  if(expected>64*1024*1024)throw Error('PNG expanded byte limit exceeded');
  const packed=Buffer.concat(data),result=inflateSync(packed,{maxOutputLength:expected,info:true}),raw=result.buffer;
  if(result.engine.bytesWritten!==packed.length||raw.length!==expected)throw Error('PNG decompressed length or trailing compressed data invalid');
  for(let row=0;row<header.height;row++)if(raw[row*stride]>4)throw Error('Invalid PNG scanline filter');
  return {status:'STRUCTURE_INSPECTED',mime:'image/png',facts:{...header,scanlines:header.height},limitations:['Ancillary metadata semantics and color profiles not validated.','Scanlines decompressed; pixel appearance, animation and visual quality not evaluated.']};
}

function wave(b){
  if(b.length<12||b.readUInt32LE(4)+8!==b.length)throw Error('RIFF size mismatch');
  if(b.toString('ascii',8,12)!=='WAVE')return {status:'UNSUPPORTED_ENCODING',mime:'application/riff',limitations:['Only WAVE form inspected']};
  let at=12,format=null,data=null;
  while(at<b.length){
    if(at+8>b.length)throw Error('Truncated WAVE chunk');
    const type=b.toString('ascii',at,at+4),size=b.readUInt32LE(at+4),end=at+8+size,next=end+(size%2);
    if(next>b.length)throw Error('WAVE chunk exceeds input');
    const chunk=b.subarray(at+8,end);
    if(type==='fmt '){if(format||size<16)throw Error('Invalid WAVE format chunk');format={encoding:chunk.readUInt16LE(0),channels:chunk.readUInt16LE(2),sampleRate:chunk.readUInt32LE(4),byteRate:chunk.readUInt32LE(8),blockAlign:chunk.readUInt16LE(12),bitsPerSample:chunk.readUInt16LE(14)};}
    if(type==='data'){if(data)throw Error('Multiple WAVE data chunks unsupported');data=chunk;}
    at=next;
  }
  if(!format||!data)throw Error('WAVE format and data required');
  if(format.encoding!==1||![1,2].includes(format.channels)||![8,16].includes(format.bitsPerSample))return {status:'UNSUPPORTED_ENCODING',mime:'audio/wav',facts:format,limitations:['Only mono/stereo PCM 8/16-bit inspected']};
  if(!format.sampleRate||format.sampleRate>384000||format.blockAlign!==format.channels*format.bitsPerSample/8||format.byteRate!==format.sampleRate*format.blockAlign||data.length%format.blockAlign)throw Error('Invalid PCM alignment or rate');
  return {status:'STRUCTURE_INSPECTED',mime:'audio/wav',facts:{...format,frames:data.length/format.blockAlign,durationSeconds:data.length/format.byteRate},limitations:['No loudness, clipping, intelligibility or creative audio evaluation.']};
}

export function inspectMedia(bytes){
  if(!(bytes instanceof Uint8Array)||bytes.byteLength>32*1024*1024)throw Error('Media input must be bytes at most 32 MiB');
  const b=Buffer.from(bytes),receipt={digest:createHash('sha256').update(b).digest('hex'),byteLength:b.length};
  let inspected;
  if(b.subarray(0,8).equals(signature))inspected=png(b);
  else if(b.toString('ascii',0,4)==='RIFF')inspected=wave(b);
  else inspected={status:'UNINSPECTED',mime:null,limitations:['No supported signature; filename and MIME declarations are not media evidence.']};
  return {...receipt,...inspected};
}
