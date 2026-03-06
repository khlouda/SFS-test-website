import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
await new Promise(r => setTimeout(r, 600));
await page.screenshot({ path: 'temporary screenshots/nav-zoom.png', clip: { x: 0, y: 0, width: 1440, height: 96 } });
await browser.close();
console.log('done');
