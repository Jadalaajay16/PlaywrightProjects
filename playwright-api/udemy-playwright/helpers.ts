export async function loadHomepage(page) {
  await page.goto('https://www.example.com')
}
//adding a test comment here
export async function assertTitle(page) {
  await page.waitForSelector('h5')
}
