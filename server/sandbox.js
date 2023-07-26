/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const adressebrand = require('./sources/adressebrand');
const mudjeanbrand= require('./sources/mudjeansbrand.js');
const loom = require('./sources/loom');
const { MongoClient } = require("mongodb");

const MONGODB_URI =
"mongodb+srv://chloedaems0:M2ZVbOmmdRAzb0Mb@clearfashion.i5mykqs.mongodb.net/?retryWrites=true&w=majority";
const MONGODB_DB_NAME = 'clearFashion'

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

async function tryFetch(){
  dedicatedbrand.fetchProducts().then(ob => console.log(ob));
}

function checkDoubles(myArray){
  all_unique_Ids = [];
  myFilteredArray = [];
  myArray.forEach(x => {
    if(all_unique_Ids.includes(x.uuid)==false){
      all_unique_Ids.push(x.uuid);
      myFilteredArray.push(x);
    }
  })
  console.log(myFilteredArray.length)
  return myFilteredArray;
}

async function sandbox1 (eshop1 = 'https://www.dedicatedbrand.com/en/men/news#page=6',eshop2='https://adresse.paris/640-e-shop?id_category=640&n=168',eshop3='https://mudjeans.eu/collections/') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop1} source`);
    var products=[];
    console.log("Looking for the products 🕵️‍♀️")
    dedicatedbrand.fetchProducts().then(ob => products = products.concat(ob));

    pages = [
      'https://www.loom.fr/collections/vestiaire-homme',
      'https://www.loom.fr/collections/vestiaire-femme'
    ];

    console.log('\n');

    console.log(`🕵️‍♀️  browsing loom page with Promise.all`);

    const promises = pages.map(loom.scrape);
    const results = await Promise.all(promises);

    console.log(`👕 ${results.length} results of promises found`);
    console.log(`👕 ${results.flat().length} products found`);

    products.push(results.flat());
    products = products.flat();

    //We check for Repetitions (double products)

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

    console.log("nb of product before checking doubles = "+products.length);
    //products = checkDoubles(products);
    console.log("nb of product after checking doubles = "+products.length);
    
    //Connect the mongodb
    const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true,'useUnifiedTopology': true});
    const db =  client.db(MONGODB_DB_NAME)

    //We insert in the mongodb
    const collection = db.collection('Products');
    const result = await collection.insertMany(products,{'ordered': false});
    
    return result;
    //console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function askQueries(){
  console.log("Okay, lets go! ");
  const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true,'useUnifiedTopology': true});
  const db =  client.db(MONGODB_DB_NAME)
  const collection = db.collection('products');

  //Find all products related to a certain brand
  console.log("Finding all the products of adresse ... ");
  const brand = "adresse";
  const products1 = await collection.find({brand}).toArray();

  //console.log(products1);

  //Find all products less than 100€
  console.log("Finding all the products costing less than 100€ ... ");
  const products2 = await collection.find({price : { $lt: 100 }}).toArray();

  //console.log(products2);

  //Find all products sorted by price
  console.log("Finding all the products sorted by price ... ");
  const products3 = await collection.aggregate([
    { $sort : { price : 1 } }
  ]).toArray();
  
  //console.log(products3);

  //Find all products  of a certain category
  console.log("Finding all the products of a category ... ");
  const products4 = await collection.find({category : "Women"}).toArray();
  console.log(products4);




}

const [,, eshop1,eshop2,eshop3] = process.argv;

module.exports = sandbox1;
//askQueries();
