// node review.js -> out/_review.png : every still in out/ on one page, small, to look them over. throwaway
const fs = require('fs'), path = require('path'); const { chromium } = require('playwright');
(async () => {
  const out = path.join(__dirname, 'out'), files = fs.readdirSync(out).filter(f => f.endsWith('.png') && !f.startsWith('_') && !f.startsWith('swim') && (!process.argv[2] || f.startsWith(process.argv[2])));
  const html = `<body style="margin:0;background:#d9d4c8;font:10px monospace;display:flex;flex-wrap:wrap;gap:8px;padding:8px;width:1500px">${files.map(f => `<figure style="margin:0"><img src="data:image/png;base64,${fs.readFileSync(path.join(out, f)).toString('base64')}" style="height:${f.includes('wide') ? 240 : 430}px;border:1px solid #111;display:block"><figcaption>${f}</figcaption></figure>`).join('')}</body>`;
  const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1520, height: 600 } }); await p.setContent(html); await p.screenshot({ path: path.join(out, '_review' + (process.argv[2] || '') + '.png'), fullPage: true }); await b.close();
})();
