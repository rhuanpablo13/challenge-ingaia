const faker = require('faker');
const puppeteer = require('puppeteer');
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
  await page.type("input[role=input]", "morty");
  await Promise.all([
    page.waitForNavigation(),
    page.$eval(
      "button[type=submit]",
      form => {
        form.click();
      },
    ),
    // verificar se a div card-container foi carregada
    expect(await page.waitForSelector('')).not.toBeNull(),
  ])

}

async function loadCards() {
  const totalText = await page.$eval("#card-container", node => node.innerText);
  expect(totalText.length).not.toBe(0);
}

async function modalElements() {
    await Promise.all([
      page.waitForNavigation(),
      page.click('#card-1'),
      // expect(await page.$('[role="modal"]')).not.toBeNull(),
    ]);

//   await page.waitForSelector('#details-container')
//   .then(() => {
//     const about = page.$("#about").innerText;
//     expect(about).toEqual('About');
//   });

    console.log('2')


  // const origin = await card.getElementById("origin", node => node.innerText);
  // expect(origin).toEqual('ORIGIN');
  
  // const locale = await card.getElementById("locale", node => node.innerText);
  // expect(locale).toEqual('LOCALE');
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
  }, 999999);
      
  it("result should be more 0", async () => {
    //await loadCards();
  }, 999999);

  it("modal elements", async () => {
    await modalElements();
  }, 999999);

}, 9999999);
    
