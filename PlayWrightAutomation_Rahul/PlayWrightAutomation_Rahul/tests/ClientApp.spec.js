 const {test, expect} = require('@playwright/test');




 test.skip('Client App login', async ({page})=>
 {
    //js file- Login js, DashboardPage
     const email = "rahulshetty@gmail.com";
     const productName = 'Zara Coat 4';
     const products = page.locator(".card-body");
     await page.goto("https://rahulshettyacademy.com/client");
     await page.locator("#userEmail").fill(email);
     await page.locator("#userPassword").type("Iamking@000");
     await page.locator("[value='Login']").click();
     await page.waitForLoadState('networkidle');
    const titles= await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    for(let i =0; i < count; ++i)
    {
    if(await products.nth(i).locator("b").textContent() === productName)
    {
        //add to cart
        await products.nth(i).locator("text= Add To Cart").click();
        break;
     }
    }
   
    await page.locator("[routerlink*='cart']").click();
    //await page.pause();
    
    await page.locator("div li").first().waitFor();
    const bool =await page.locator("h3:has-text('Zara Coat 4')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").type("ind",{delay:100});
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    optionsCount = await dropdown.locator("button").count();
    for(let i =0;i< optionsCount; ++i)
    {
        text =  await dropdown.locator("button").nth(i).textContent();
        if(text === " India")
        {
           await dropdown.locator("button").nth(i).click();
           break;
        }
    }
   await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.locator(".action__submit").click();
   
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log(orderId);
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
 const rows = await page.locator("tbody tr");


 for(let i =0; i<await rows.count(); ++i)
 {
    const rowOrderId =await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId))
    {
        await rows.nth(i).locator("button").first().click();
        break;
    }
 }
 const orderIdDetails =await page.locator(".col-text").textContent();
 expect(orderId.includes(orderIdDetails)).toBeTruthy();














  


    


    //Zara Coat 4





    









 });
 

 



 

