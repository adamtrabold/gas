// node render.js  -> sheet.png   (throwaway)
const http=require('http'),fs=require('fs'),path=require('path');const {chromium}=require('playwright');
const root=__dirname;const srv=http.createServer((q,r)=>{const f=path.join(root,q.url==='/'?'index.html':q.url.split('?')[0]);
  fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);return r.end()}r.writeHead(200,{'content-type':f.endsWith('.js')?'text/javascript':'text/html'});r.end(d)})}).listen(0,async()=>{
  const b=await chromium.launch();const p=await b.newPage({viewport:{width:1500,height:900}});
  p.on('console',m=>console.log(m.text()));p.on('pageerror',e=>console.log('ERR',e.message));
  await p.goto('http://localhost:'+srv.address().port+'/');await p.waitForFunction(()=>document.title==='done',null,{timeout:90000}).catch(e=>console.log('timeout'));
  await p.screenshot({path:path.join(root,'sheet.png'),fullPage:true});await b.close();srv.close()});
