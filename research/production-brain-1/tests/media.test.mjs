import test from 'node:test';
import assert from 'node:assert/strict';
import {deflateSync} from 'node:zlib';
import {inspectMedia,crc32} from '../mgr-production-brain/skills/production-brain/scripts/media.mjs';
const chunk=(type,data)=>{const b=Buffer.alloc(data.length+12);b.writeUInt32BE(data.length);b.write(type,4);data.copy(b,8);b.writeUInt32BE(crc32(b.subarray(4,b.length-4)),b.length-4);return b;};
const png=(raw=Buffer.from([0,255,0,0]),options={})=>{const h=Buffer.alloc(13);h.writeUInt32BE(options.width??1,0);h.writeUInt32BE(1,4);h[8]=options.depth??8;h[9]=2;h[12]=options.interlace??0;return Buffer.concat([Buffer.from('89504e470d0a1a0a','hex'),chunk('IHDR',h),chunk('IDAT',deflateSync(raw)),chunk('IEND',Buffer.alloc(0))]);};
const wav=()=>{const b=Buffer.alloc(48);b.write('RIFF');b.writeUInt32LE(40,4);b.write('WAVEfmt ',8);b.writeUInt32LE(16,16);b.writeUInt16LE(1,20);b.writeUInt16LE(1,22);b.writeUInt32LE(8000,24);b.writeUInt32LE(16000,28);b.writeUInt16LE(2,32);b.writeUInt16LE(16,34);b.write('data',36);b.writeUInt32LE(4,40);return b;};
test('independent CRC check vector and supported PNG structure',()=>{assert.equal(crc32(Buffer.from('123456789')),0xcbf43926);const r=inspectMedia(png());assert.equal(r.status,'STRUCTURE_INSPECTED');assert.equal(r.facts.width,1);assert.equal(r.facts.scanlines,1);});
test('PNG corruption, truncation, scanline size/filter and resource limits',()=>{
  const bad=png();bad[20]^=1;
  for(const data of [bad,png().subarray(0,30),png(Buffer.from([5,0,0,0])),png(Buffer.alloc(100)),png(Buffer.from([0,0,0,0]),{width:20_000_000}),Buffer.concat([png(),Buffer.from('extra')])])assert.throws(()=>inspectMedia(data));
});
test('unsupported valid encoding stays unsupported; unknown bytes stay uninspected',()=>{assert.equal(inspectMedia(png(undefined,{depth:16})).status,'UNSUPPORTED_ENCODING');assert.equal(inspectMedia(Buffer.from('image.png')).status,'UNINSPECTED');});
test('PCM WAVE facts and invalid rate/alignment',()=>{const r=inspectMedia(wav());assert.equal(r.facts.frames,2);assert.equal(r.facts.durationSeconds,2/8000);const wrong=wav();wrong.writeUInt32LE(1,28);assert.throws(()=>inspectMedia(wrong),/alignment or rate/);const truncated=wav().subarray(0,47);assert.throws(()=>inspectMedia(truncated),/size mismatch/);});
test('odd RIFF metadata padding respected',()=>{const b=wav(),extra=Buffer.alloc(10);extra.write('JUNK');extra.writeUInt32LE(1,4);const extended=Buffer.concat([b,extra]);extended.writeUInt32LE(extended.length-8,4);assert.equal(inspectMedia(extended).status,'STRUCTURE_INSPECTED');const short=extended.subarray(0,extended.length-1);short.writeUInt32LE(short.length-8,4);assert.throws(()=>inspectMedia(short),/exceeds input/);});
