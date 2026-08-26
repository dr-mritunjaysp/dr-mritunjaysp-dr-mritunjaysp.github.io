import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import ts from 'typescript';
import katex from 'katex';
import { Worker } from 'node:worker_threads';
import UTIF from 'utif';
import {image,createDemo,applyFilter,compareImages,statistics,recommend,kernelFor,kernelSpectrum,parameters,borderIndex,correlate,fft,transferValue,hysteresis,otsuThreshold,runExperiment,LIVE_FILTERS} from '../public/filterverse/engine.mjs';
import {createProcessor,addHistory,moveStage,workingSize,outputLabel} from '../public/filterverse/client.mjs';

function gray(values,w=3){const out=image(w,values.length/w);values.forEach((v,i)=>out.data.set([v,v,v,255],i*4));return out;}
const plane=img=>Array.from(img.data).filter((_,i)=>i%4===0);
const close=(a,b,tolerance=1e-8)=>assert.ok(Math.abs(a-b)<tolerance,`${a} != ${b}`);
const wait=()=>new Promise(r=>setTimeout(r,8));
const catalogSource=(await readFile(new URL('../app/filterverse/catalog.ts',import.meta.url),'utf8')).replace("'../../public/filterverse/engine.mjs'",JSON.stringify(new URL('../public/filterverse/engine.mjs',import.meta.url).href));
const catalogJS=ts.transpileModule(catalogSource,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {filters,byId,pythonCode}=await import(`data:text/javascript;base64,${Buffer.from(catalogJS).toString('base64')}`);

test('FilterVerse local kernels match hand-calculated neighborhoods and handle borders explicitly',()=>{
 const input=gray([10,20,30,20,40,20,30,20,10]);
 assert.equal(plane(applyFilter(input,'mean',{size:3}))[4],22);
 assert.equal(plane(applyFilter(input,'binomial',{size:3}))[4],25);
 assert.equal(plane(applyFilter(input,'median',{size:3}))[4],20);
 assert.equal(plane(applyFilter(input,'min',{size:3}))[4],10);
 assert.equal(plane(applyFilter(input,'max',{size:3}))[4],40);
 assert.equal(plane(applyFilter(input,'midpoint',{size:3}))[4],25);
 assert.deepEqual([-3,-2,-1,0,1,2,3,4,5].map(i=>borderIndex(i,3)),[1,2,1,0,1,2,1,0,1]);
 assert.equal(borderIndex(-1,3,'zero'),-1);assert.equal(borderIndex(-1,3,'wrap'),2);assert.equal(borderIndex(-1,3,'replicate'),0);assert.equal(borderIndex(500,1),0);
 const constant=gray(Array(25).fill(100),5);
 assert.equal(plane(applyFilter(constant,'mean',{size:3,border:'zero'}))[0],44);
 assert.deepEqual(plane(applyFilter(constant,'gaussian',{size:7,sigma:2})),Array(25).fill(100));
});
test('FilterVerse custom correlation, normalization, clipping and impulse rejection have known outputs',()=>{
 const input=gray([0,0,0,0,255,0,0,0,0]);
 assert.equal(plane(applyFilter(input,'median',{size:3}))[4],0);
 assert.equal(plane(applyFilter(input,'adaptive-median',{size:5}))[4],0);
 const identity=[0,0,0,0,1,0,0,0,0];
 assert.deepEqual(applyFilter(input,'custom',{kernel:identity}).data,input.data);
 assert.equal(plane(applyFilter(input,'custom',{kernel:identity,offset:-20}))[4],235);
 assert.equal(kernelFor('custom',{kernel:Array(9).fill(2),normalize:true})[0],1/9);
 const k=kernelFor('gaussian',{size:5,sigma:.8,sigmaY:2});close(k.reduce((s,v)=>s+v,0),1);assert.notEqual(k[2],k[10]);
 assert.throws(()=>kernelFor('custom',{kernel:[1,2]}),/3×3/);
 assert.throws(()=>correlate(new Float64Array(9),3,3,[1,2,3,4]),/odd square/);
});
test('FilterVerse gradients, morphology, Otsu and hysteresis follow their explicit definitions',()=>{
 const ramp=gray([0,10,20,0,10,20,0,10,20]);
 assert.equal(plane(applyFilter(ramp,'sobel',{direction:'x'}))[4],80);
 assert.equal(plane(applyFilter(ramp,'sobel',{direction:'y'}))[4],0);
 const impulse=gray(Array.from({length:25},(_,i)=>i===12?255:0),5);
 assert.equal(plane(applyFilter(impulse,'dilation',{size:3})).filter(v=>v===255).length,9);
 assert.ok(plane(applyFilter(impulse,'opening',{size:3})).every(v=>v===0));
 const hist=new Uint32Array(256);hist[20]=5;hist[200]=5;const t=otsuThreshold(hist);assert.ok(t>=20&&t<200);
 assert.deepEqual(plane(applyFilter(gray([20,20,200,200],2),'otsu')),[0,0,255,255]);
 assert.deepEqual(Array.from(hysteresis(new Float64Array([100,50,0,50]),4,1,40,80)),[255,255,0,0]);
 const uniform=gray(Array(49).fill(70),7);assert.ok(plane(applyFilter(uniform,'canny')).every(v=>v===0));
});
test('FilterVerse FFT round trips, masks, and DC behavior are numerically correct',()=>{
 const re=Float64Array.from([1,2,3,4,5,6,7,8]),im=new Float64Array(8);fft(re,im);close(re[0],36);fft(re,im,true);re.forEach((v,i)=>close(v,i+1));
 const p=parameters({cutoff:.1,notchX:.2,notchY:.1,band:.04});
 assert.equal(transferValue('ideal-lpf',0,0,p),1);assert.equal(transferValue('ideal-hpf',0,0,p),0);close(transferValue('butter-lpf',.1,0,p),.5);
 assert.equal(transferValue('notch-reject',.2,.1,p),0);assert.equal(transferValue('notch-reject',-.2,-.1,p),0);
 const uniform=gray(Array(64).fill(100),8);assert.ok(plane(applyFilter(uniform,'gaussian-hpf')).every(v=>v===0));assert.deepEqual(plane(applyFilter(uniform,'butter-lpf')),Array(64).fill(100));
 assert.ok(plane(kernelSpectrum([0,0,0,0,1,0,0,0,0])).every(v=>v===255));
 assert.throws(()=>fft(new Float64Array(3),new Float64Array(3)),/power of two/);
});
test('FilterVerse metrics, histograms and recommendations use real pixel measurements',()=>{
 const a=gray([0,0,0,0],2),b=gray([10,10,10,10],2),same=compareImages(a,a),different=compareImages(a,b);
 assert.equal(same.mse,0);assert.equal(same.psnr,Infinity);close(same.ssim,1);assert.equal(same.changed,0);
 assert.equal(different.mae,10);assert.equal(different.mse,100);assert.equal(different.rmse,10);close(different.psnr,10*Math.log10(650.25));assert.equal(different.changed,100);close(different.ssim,6.5025/106.5025);
 assert.deepEqual(plane(different.difference),[10,10,10,10]);const s=statistics(gray([0,100,200,100],2));close(s.mean,100);close(s.std,Math.sqrt(5000));assert.equal(s.hist[0].reduce((a,b)=>a+b),4);
 const noise=createDemo('impulse',80,60),stats=statistics(noise);assert.ok(stats.impulse>1);assert.equal(recommend(stats)[0].id,'median');
 assert.throws(()=>compareImages(a,gray([0],1)),/identical dimensions/);
});
test('FilterVerse installed methods are runnable and reference entries never silently apply a substitute',()=>{
 assert.equal(new Set(filters.map(f=>f.id)).size,filters.length);
 assert.deepEqual(filters.filter(f=>f.live).map(f=>f.id).sort(),[...LIVE_FILTERS].sort());
 const src=createDemo('noise',12,10),copy=src.data.slice();
 for(const id of LIVE_FILTERS){const out=applyFilter(src,id,{size:3,iterations:2});assert.equal(out.width,12,id);assert.equal(out.height,10,id);assert.equal(out.data.length,480,id);assert.ok(Array.from(out.data).every(Number.isFinite),id);for(let i=3;i<480;i+=4)assert.equal(out.data[i],255,id);}
 assert.deepEqual(src.data,copy);assert.throws(()=>applyFilter(src,'bm3d'),/reference-only/);assert.throws(()=>applyFilter({width:9999,height:1,data:[]},'mean'),/valid RGBA/);
 for(const f of filters)assert.doesNotThrow(()=>katex.renderToString(f.formula,{throwOnError:true}),f.name);
 assert.match(pythonCode(byId.gaussian,{...parameters(),direction:'magnitude'},'OpenCV'),/GaussianBlur/);
 assert.match(pythonCode(byId.custom,{...parameters(),kernel:[0,0,0,0,1,0,0,0,0]},'NumPy'),/sliding_window_view/);
 assert.match(pythonCode(byId.bm3d,parameters()),/not executed/);
 assert.equal(outputLabel(byId.bm3d,{preview:true,pipeline:[]}), 'Original · no filter applied');
 assert.equal(outputLabel(byId.bm3d,{preview:true,pipeline:[{enabled:true}]}), 'Pipeline result');
 assert.equal(outputLabel(byId.gaussian,{preview:true,pipeline:[]}), 'Gaussian');
});
test('FilterVerse pipelines honor order, disabled stages and independently computed comparisons',()=>{
 const source=createDemo('impulse',24,16),pipeline=[{id:'median',params:{size:3},enabled:true},{id:'global',params:{threshold:100},enabled:false}];
 const result=runExperiment({source,selected:'sobel',params:{},pipeline,compare:['mean'],spectrum:true});
 assert.deepEqual(result.processed.data,applyFilter(applyFilter(source,'median',{size:3}),'sobel').data);
 assert.equal(result.stages.length,1);assert.deepEqual(result.comparisons[0].result.data,applyFilter(source,'mean').data);assert.equal(result.spectra.length,3);
 assert.throws(()=>runExperiment({source,pipeline:Array(9).fill(pipeline[0])}),/at most 8/);
 const stages=[{id:'a'},{id:'b'},{id:'c'}];assert.deepEqual(moveStage(stages,1,-1).map(v=>v.id),['b','a','c']);assert.deepEqual(stages.map(v=>v.id),['a','b','c']);
 let history={entries:[{value:1}],index:0};history=addHistory(history,{value:2});history=addHistory({...history,index:0},{value:3});assert.deepEqual(history.entries,[{value:1},{value:3}]);assert.equal(history.index,1);
 assert.deepEqual(workingSize(2000,1000),{width:640,height:320});assert.deepEqual(workingSize(1,2000),{width:1,height:640});assert.throws(()=>workingSize(9000,9000),/16 megapixels/);
});
test('FilterVerse worker controller cancels stale jobs and disposes without late UI updates',async()=>{
 const workers=[],results=[],errors=[],busy=[];class FakeWorker{constructor(url,opts){this.url=url;this.opts=opts;workers.push(this);}postMessage(data){this.sent=data;}terminate(){this.terminated=true;}}
 const processor=createProcessor({WorkerClass:FakeWorker,onResult:r=>results.push(r),onError:e=>errors.push(e),onBusy:v=>busy.push(v),delay:0});
 processor.schedule({filter:'mean'});await wait();const first=workers[0];assert.equal(first.opts.type,'module');processor.schedule({filter:'median'});assert.equal(first.terminated,true);await wait();const second=workers[1];first.onmessage({data:{id:first.sent.id,result:'stale'}});assert.deepEqual(results,[]);second.onmessage({data:{id:second.sent.id,result:'latest'}});assert.deepEqual(results,['latest']);assert.equal(second.terminated,true);assert.equal(busy.at(-1),false);
 processor.schedule({});await wait();const third=workers[2];third.onmessage({data:{id:third.sent.id,error:'bad input'}});assert.deepEqual(errors,['bad input']);
 processor.schedule({});await wait();const last=workers[3];processor.dispose();last.onmessage({data:{id:last.sent.id,result:'late'}});assert.deepEqual(results,['latest']);assert.equal(last.terminated,true);
});

test('FilterVerse real module worker processes a job and reports invalid jobs',async()=>{
 const workerUrl=new URL('../public/filterverse/worker.mjs',import.meta.url).href;
 const worker=new Worker(`const {parentPort}=require('node:worker_threads');global.self={postMessage:data=>parentPort.postMessage(data)};import(${JSON.stringify(workerUrl)}).then(()=>parentPort.on('message',data=>self.onmessage({data})));`,{eval:true});
 const send=message=>new Promise((resolve,reject)=>{worker.once('message',resolve);worker.once('error',reject);worker.postMessage(message);});
 try{const source=gray([0,0,0,0,255,0,0,0,0]);const response=await send({id:7,job:{source,selected:'median',params:{size:3}}});assert.equal(response.id,7);assert.equal(response.result.processed.data[16],0);const invalid=await send({id:8,job:{source,selected:'bm3d',params:{}}});assert.match(invalid.error,/reference-only/);}finally{await worker.terminate();}
});

test('FilterVerse bundled TIFF decoder reads actual pixel data and rejects malformed files',async()=>{
 const utifPath=new URL('../node_modules/utif/UTIF.js',import.meta.url).href;
 const source=(await readFile(new URL('../app/filterverse/decode.worker.ts',import.meta.url),'utf8')).replace("'utif'",JSON.stringify(utifPath));
 const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
 const moduleUrl=`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`;
 const worker=new Worker(`const {parentPort}=require('node:worker_threads');global.self={postMessage:data=>parentPort.postMessage(data)};import(${JSON.stringify(moduleUrl)}).then(()=>parentPort.on('message',data=>self.onmessage({data})));`,{eval:true});
 const send=data=>new Promise((resolve,reject)=>{worker.once('message',resolve);worker.once('error',reject);worker.postMessage(data);});
 try{const pixels=new Uint8Array([255,0,0,255,0,128,255,255]);const decoded=await send(UTIF.encodeImage(pixels,2,1));assert.equal(decoded.width,2);assert.equal(decoded.height,1);assert.deepEqual(Array.from(decoded.data),Array.from(pixels));const invalid=await send(new ArrayBuffer(2));assert.ok(invalid.error);}finally{await worker.terminate();}
});
