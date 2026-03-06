/**
 * All-in-one: starts HTTP server, takes screenshot(s), shuts down.
 * Usage: node snap.mjs [label]
 * Saves to: temporary screenshots/screenshot-N[-label].png
 */
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3000;
const label = process.argv[2] || '';
const screenshotDir = path.join(__dirname, 'temporary screenshots');
if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

const MIME = {
  '.html':'text/html','.css':'text/css','.js':'application/javascript',
  '.mjs':'application/javascript','.json':'application/json',
  '.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg',
  '.gif':'image/gif','.svg':'image/svg+xml','.ico':'image/x-icon',
  '.woff':'font/woff','.woff2':'font/woff2','.ttf':'font/ttf',
};

// --- Start server ---
const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = path.join(__dirname, urlPath);
  const ext = path.extname(filePath).toLowerCase();
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('404'); return; }
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

await new Promise(resolve => server.listen(PORT, resolve));
console.log(`Server running at http://localhost:${PORT}`);

// --- Screenshot ---
const existing = fs.readdirSync(screenshotDir).filter(f => f.endsWith('.png') && f.startsWith('screenshot-'));
const nums = existing.map(f => parseInt(f.match(/screenshot-(\d+)/)?.[1] || '0')).filter(n => !isNaN(n));
const n = nums.length > 0 ? Math.max(...nums) + 1 : 1;
const filename = label ? `screenshot-${n}-${label}.png` : `screenshot-${n}.png`;

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 800));
await page.screenshot({ path: path.join(screenshotDir, filename), fullPage: true });
console.log(`Saved: temporary screenshots/${filename}`);

// --- Nav crop ---
await page.screenshot({ path: path.join(screenshotDir, 'nav-latest.png'), clip: { x: 0, y: 0, width: 1440, height: 96 } });
console.log('Saved: temporary screenshots/nav-latest.png');

// --- Footer crop ---
const footerTop = await page.evaluate(() => {
  const f = document.querySelector('footer');
  return f ? f.getBoundingClientRect().top + window.scrollY : 0;
});
if (footerTop > 0) {
  await page.evaluate(y => window.scrollTo(0, y), footerTop);
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(screenshotDir, 'footer-latest.png'), clip: { x: 0, y: footerTop, width: 1440, height: 500 } });
  console.log('Saved: temporary screenshots/footer-latest.png');
}

await browser.close();
server.close();
console.log('Done.');
