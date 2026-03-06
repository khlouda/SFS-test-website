import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
await new Promise(r => setTimeout(r, 600));
await page.screenshot({ path: 'temporary screenshots/nav-detail.png', clip: { x: 0, y: 0, width: 1440, height: 90 } });
const footerTop = await page.evaluate(() => {
  const footer = document.querySelector('footer');
  return footer ? footer.getBoundingClientRect().top + window.scrollY : 0;
});
await page.evaluate((top) => window.scrollTo(0, top), footerTop);
await new Promise(r => setTimeout(r, 400));
await page.screenshot({ path: 'temporary screenshots/footer-detail.png', clip: { x: 0, y: footerTop, width: 1440, height: 500 } });
await browser.close();
console.log('done');
