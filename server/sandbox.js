/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const adressebrand = require('./sources/adressebrand');
const mudjeanbrand= require('./sources/mudjeansbrand.js');

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

async function tryFetch(){
  dedicatedbrand.fetchProducts().then(ob => console.log(ob));
}
async function sandbox1 (eshop1 = 'https://www.dedicatedbrand.com/en/men/news#page=6',eshop2='https://adresse.paris/640-e-shop?id_category=640&n=134',eshop3='https://mudjeans.eu/collections/') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop1} source`);

    //const products = await dedicatedbrand.scrape(eshop);
    let urls = await dedicatedbrand.getAllURLs(eshop1);
    //console.log(products);
    urls = urls.slice(0,-4);
    console.log(urls);
    var products=[];
    console.log("Looking for the products 🕵️‍♀️")

    await asyncForEach(urls, async (url) => {
      //await waitFor(50);
      if(!url.includes("news") && !url.includes("sale")){
        let newproducts = await dedicatedbrand.scrape(url+"#page=10");
        console.log("New products from "+url+" //COUNT : "+newproducts.length)
        products = products.concat(newproducts);
      }
      
      
    });
    console.log(`🕵️‍♀️  browsing ${eshop2} source`);
    newproducts = await adressebrand.scrape(eshop2);
    console.log(newproducts.length)
    products = products.concat(newproducts);

    mudjeans_urls = ["men","women-jeans"]
    console.log(`🕵️‍♀️  browsing ${eshop3} source`);
    console.log("Looking for the products 🕵️‍♀️");
    await asyncForEach(mudjeans_urls, async (url) => {
      //await waitFor(50);
    
      let newproducts = await mudjeanbrand.scrape(eshop3+url);
      console.log("New products from "+eshop3+url+url+" //COUNT : "+newproducts.length)
      products = products.concat(newproducts);  
    });

    console.log(products);
    console.log("nb of product = "+products.length);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function sandbox2 (eshop = 'https://adresse.paris/640-e-shop?id_category=640&n=134') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await adressebrand.scrape(eshop);

    console.log(products);
    console.log("nbProduct : "+products.length)
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function sandbox3 (eshop = 'https://mudjeans.eu/collections/') {
  try {
    mudjeans_urls = ["men","women-jeans"]
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    console.log("Looking for the products 🕵️‍♀️");
    var products=[];

    await asyncForEach(mudjeans_urls, async (url) => {
      //await waitFor(50);
    
      let newproducts = await mudjeanbrand.scrape(eshop+url);
      console.log("New products from "+eshop+url+url+" //COUNT : "+newproducts.length)
      products = products.concat(newproducts);  
    });

    console.log(products);
    console.log(products.length)
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
 }
}

const [,, eshop1,eshop2,eshop3] = process.argv;

//sandbox1(eshop1,eshop2,eshop3);
//sandbox2(eshop);
//sandbox3();
tryFetch();
