jest.setTimeout(15000);

import puppeteer from "puppeteer";
import testData from "./mocks/mockData";

const timeout = 30000;

const APP = "https://www.linkedin.com/";

describe('LinkedIn Login Test without browser', () => {
  let page;
  let browser;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await page.close()
  });

  it('should load without error', async () => {
    await page.goto(APP);
    await page.screenshot({fullPage: true, path: 'screenshot1.png'});
    await page.waitForSelector("body.guest");
    //await page.click("#login-submit");
    await page.type(".login-form .login-email", testData.email);
    await page.type(".login-form .login-password", testData.pass);
    await page.click("#login-submit");
    await page.waitForSelector("#global-alert-queue .error");
    await page.screenshot({fullPage: true, path: 'screenshot2.png'});
    //const errorMessage = await page.$eval('#global-alert-queue .error strong', e => e.innerText);
    const errorMessage = await page.evaluate(
        () => document.querySelector('#global-alert-queue .error strong').innerText);
    expect(errorMessage).toContain('one or more errors');
  });
}, timeout);