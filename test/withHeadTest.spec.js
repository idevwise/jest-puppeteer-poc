jest.setTimeout(15000);

import puppeteer from "puppeteer";
import testData from "./mocks/mockData";

const APP = "https://www.linkedin.com/";

describe("LinkedIn Login Test with browser", () => {
  let page;
  let browser;
  const width = 1080;
  const height = 1920;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false, slowMo: 20, args: [`--window-size=${width},${height}`]
    });
    page = await browser.newPage();
    await page.setViewport({width, height});
    await page.screenshot({fullPage: true, path: 'screenshot.png'})
  });

  afterAll(() => {
    browser.close();
  });

  it("login to LinkedIn with wrong credentials", async () => {
    await page.goto(APP);
    await page.screenshot({fullPage: true, path: 'screenshot1.png'});
    await page.waitForSelector("body.guest");
    //await page.click("#login-submit");
    await page.type(".login-form .login-email", testData.email);
    await page.type(".login-form .login-password", testData.pass);
    await page.click("#login-submit");
    await page.waitForSelector("#global-alert-queue .error");
    await page.screenshot({fullPage: true, path: 'screenshot2.png'});
  });
});


