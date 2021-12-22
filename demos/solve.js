// Require puppeteer extra and puppeteer stealth
const puppeteer = require('puppeteer-extra')
const pluginStealth = require('puppeteer-extra-plugin-stealth')

// Require our hcaptcha method
const { hcaptcha } = require('puppeteer-hcaptcha');

// Tell puppeteer to use puppeteer stealth
puppeteer.use(pluginStealth());

(async () => {
  // Instantiate a new browser object
  // Ignore errors associated to https
  // Can be headless but for example sake we want to show the browser
  // Set your desired arguments for your puppeteer browser
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    headless: false,
    args: [
      `--window-size=600,1000`,
      "--window-position=000,000",
      "--disable-dev-shm-usage",
      "--no-sandbox",
      '--user-data-dir="/tmp/chromium"',
      "--disable-web-security",
      "--disable-features=site-per-process"
    ],
  });

  // Get browser pages
  const [page] = await browser.pages();

  // Send page to your url
  await page.goto('URL OF PAGE WITH CAPTCHA ON IT')

  // Remove the page's default timeout function
  await page.setDefaultNavigationTimeout(0);

  // Call hcaptcha method passing in our page
  await hcaptcha(page);

  // Your page is ready to submit. Captcha solving should be the last function on your page so we don't have to worry about the response token expiring.
  /**
   * Example:
   * await page.click("loginDiv > loginBtn");
   */
})();