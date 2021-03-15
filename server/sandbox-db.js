/* eslint-disable no-console, no-process-exit */
<<<<<<< HEAD
const dedicatedbrand = require('./sources/dedicatedbrand');
const loom = require('./sources/loom');
const adressebrand = require('./sources/adressebrand');
const mudjeanbrand = require('./sources/mudjeansbrand')
const db = require('./db');

function checkDoubles(myArray){
  all_unique_Ids = [];
  myFilteredArray = [];
  myArray.forEach(x => {
    if(all_unique_Ids.includes(x._id)==false){
      all_unique_Ids.push(x._id);
      myFilteredArray.push(x);
    }
  })
  console.log(myFilteredArray.length)
  return myFilteredArray;
}


async function sandbox () {
  try {
    let products = [];
    console.log(`🕵️‍♀️  browsing dedicated source`);
    console.log("Looking for the dedicated products 🕵️‍♀️")
    dedicatedbrand.fetchProducts().then(ob => products = products.concat(ob));
    console.log("nb product found in dedicated : "+ products.length)
=======
const dedicatedbrand = require('./sites/dedicatedbrand');
const loom = require('./sites/loom');
const db = require('./db');

async function sandbox () {
  try {
    let products = [];
    let pages = [
      'https://www.dedicatedbrand.com/en/men/basics',
      'https://www.dedicatedbrand.com/en/men/sale'
    ];

    console.log(`🕵️‍♀️  browsing ${pages.length} pages with for...of`);

    // Way 1 with for of: we scrape page by page
    for (let page of pages) {
      console.log(`🕵️‍♀️  scraping ${page}`);

      let results = await dedicatedbrand.scrape(page);

      console.log(`👕 ${results.length} products found`);

      products.push(results);
    }

>>>>>>> f66195154ab69ddaba07392c2dc18dbae9549f74
    pages = [
      'https://www.loom.fr/collections/hauts',
      'https://www.loom.fr/collections/bas'
    ];

    console.log('\n');

<<<<<<< HEAD
    console.log(`🕵️‍♀️  browsing loom page with Promise.all`);

    const promises = pages.map(loom.scrape);
=======
    console.log(`🕵️‍♀️  browsing ${pages.length} pages with Promise.all`);

    const promises = pages.map(page => loom.scrape(page));
>>>>>>> f66195154ab69ddaba07392c2dc18dbae9549f74
    const results = await Promise.all(promises);

    console.log(`👕 ${results.length} results of promises found`);
    console.log(`👕 ${results.flat().length} products found`);

<<<<<<< HEAD
    products.push(results.flat());
    products = products.flat();

    console.log("🕵️‍♀️ browsing adresse page");
    page = "https://adresse.paris/640-e-shop?id_category=640&n=134"
    newproducts = await adressebrand.scrape(page);
    console.log(newproducts.length)
    products = products.concat(newproducts);

    console.log(`🕵️‍♀️  browsing mudjeans page with Promise.all`);
    pages= [
      'https://mudjeans.eu/collections/men',
      'https://mudjeans.eu/collections/women-jeans'
    ]

    const promises2 = pages.map(mudjeanbrand.scrape);
    const results2 = await Promise.all(promises2);

    console.log(`👕 ${results2.length} results of promises found`);
    console.log(`👕 ${results2.flat().length} products found`);

    products.push(results2.flat());
    products = products.flat();



    console.log('\n');

    console.log(`👕 ${products.length} total of products found before doubles`);

    products = checkDoubles(products);

    console.log("nb of product after checking doubles = "+products.length);
=======
    console.log(results);
    console.log(results.flat());

    products.push(results.flat());
    products = products.flat();

    console.log('\n');

    console.log(`👕 ${products.length} total of products found`);
>>>>>>> f66195154ab69ddaba07392c2dc18dbae9549f74

    console.log('\n');

    const result = await db.insert(products);

    console.log(`💽  ${result.insertedCount} inserted products`);

    console.log('\n');

    console.log('💽  Find Loom products only');

    const loomOnly = await db.find({'brand': 'loom'});

<<<<<<< HEAD
=======
    console.log(`👕 ${loomOnly.length} total of products found for Loom`);
>>>>>>> f66195154ab69ddaba07392c2dc18dbae9549f74
    console.log(loomOnly);

    db.close();
  } catch (e) {
    console.error(e);
  }
}

sandbox();
