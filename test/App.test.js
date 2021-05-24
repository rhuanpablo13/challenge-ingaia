const faker = require('faker');
const puppeteer = require('puppeteer');
const { createArrowFunction } = require('typescript');
let browser;
let page;
const domain = "http://localhost:3000/en-US";
// const domain = 'http://localhost:3000/en-US/characters/rick';

async function init() {
  browser = await puppeteer.launch({
    // headless igual a true, faz com que um chromium seja aberta
    headless: false,
    slowMo: 50,
    devtools: true
  }); 
  page = await browser.newPage() 
  await page.goto(domain) 
  page.setViewport({ width: 700, height: 900 })
}

async function submitForm() {
  await page.waitForSelector('#form-search');
  await page.type("input[role=input]", "rick");
  await Promise.all([
    page.waitForNavigation(),
    page.$eval(
      "button[type=submit]",
      form => {
        form.click();
      },
    ),
    // verificar se a div card-container foi carregada
    expect(await page.waitForSelector('#card-container')).not.toBeNull(),
  ])

}

async function loadCards() {
  const totalText = await page.$eval("#card-container", node => node.innerText);
  expect(totalText.length).not.toBe(0);
}

async function modalElements() {

  await page.waitForSelector('#card-1');
  const element = await page.$('[id="card-1"]');
  await element.click();

  await page.waitForSelector('[role="modal"]');
  const modal = await page.$('[role="modal"]');
  expect(modal).not.toBeNull();

  await page.waitForSelector('[role="title_about"]');
  const about = await modal.$('[role="title_about"]');
  let value = await page.evaluate(el => el.textContent, about)
  expect(value).toEqual('About');

  await page.waitForSelector('[role="title_origin"]');
  const origin = await modal.$('[role="title_origin"]');
  value = await page.evaluate(el => el.textContent, origin)
  expect(value).toEqual('ORIGIN');
  
  await page.waitForSelector('[role="title_origin"]');
  const locale = await modal.$('[role="title_location"]');
  value = await page.evaluate(el => el.textContent, locale)
  expect(value).toEqual('LOCALE');

}

describe('Search Form', () => {
  
  beforeAll(async () => {
    await init();
  })

  afterAll(async () => {
    await page.close()
    browser.close();
  })


  it('submit search form', async () => {
    await submitForm();
  }, 9999);
      
  it("result should be more 0", async () => {
    await loadCards();
  }, 9999);

  it("modal elements", async () => {
    await modalElements();
  }, 9999);

}, 99999);
    
