// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

console.log('🚀 This is it.');

const MY_FAVORITE_BRANDS = [{
  'name': 'Hopaal',
  'url': 'https://hopaal.com/'
}, {
  'name': 'Loom',
  'url': 'https://www.loom.fr'
}, {
  'name': 'ADRESSE',
  'url': 'https://adresse.paris/'
}]

console.table(MY_FAVORITE_BRANDS);
console.log(MY_FAVORITE_BRANDS[0]);





/**
 * 🌱
 * Let's go with a very very simple first todo
 * Keep pushing
 * 🌱
 */

// 🎯 TODO: The cheapest t-shirt
// 0. I have 3 favorite brands stored in MY_FAVORITE_BRANDS variable

// 1. Create a new variable and assign it the link of the cheapest t-shirt
// I can find on these e-shops
// 2. Log the variable

const link = "https://www.loom.fr";
console.log(link);



/**
 * 👕
 * Easy 😁?
 * Now we manipulate the variable `marketplace`
 * `marketplace` is a list of products from several brands e-shops
 * The variable is loaded by the file data.js
 * 👕
 */

 

// 🎯 TODO: Number of products
// 1. Create a variable and assign it the number of products
// 2. Log the variable

const pNumber = marketplace.length;
console.log(pNumber);

// 🎯 TODO: Brands name
// 1. Create a variable and assign it the list of brands name only
// 2. Log the variable
// 3. Log how many brands we have

const brands_list = []
marketplace.forEach(element => {
  if (!brands_list.includes(element.brand)){
    brands_list.push(element.brand);
  }
});

console.log(brands_list);
console.log(brands_list.length);

// 🎯 TODO: Sort by price
// 1. Create a function to sort the marketplace products by price
// 2. Create a variable and assign it the list of products by price from lowest to highest
// 3. Log the variable

function sortby_price(list,desc){
  if(desc){
    return list.sort(function (a, b) {
      return a.price - b.price;
    });
  }
  else{
    return list.sort(function (a, b) {
      return b.price - a.price;
    });
  }

}
const marketplace_psorted = sortby_price(marketplace,true);
console.log(marketplace_psorted)

// 🎯 TODO: Sort by date
// 1. Create a function to sort the marketplace objects by products date
// 2. Create a variable and assign it the list of products by date from recent to old
// 3. Log the variable
function sortby_date(list,desc){
  return list.sort(function (a, b) {
    var date1 = new Date(a.date);
    var date2 = new Date(b.date);
    if(desc){
      return  date1-date2;
    }
    else{
      return  date2-date1;

    }

  });
}

const marketplace_dsorted = sortby_date(marketplace,false);
console.log(marketplace_dsorted);


// 🎯 TODO: Filter a specific price range
// 1. Filter the list of products between 50€ and 100€
// 2. Log the list

function filterBy_price(obj) {
  // Si c'est un nombre
  if (obj.price >= 50 && obj.price <=100) {
    return true;
  } 
    return false;
  
}

var marketplace_inRange = marketplace.filter(filterBy_price);
console.log(marketplace_inRange);

// 🎯 TODO: Average Basket
// 1. Determine the average basket of the marketplace
// 2. Log the average

function Find_averagePrice(list){
  var sum = 0;
  list.forEach(element => {
    sum += element.price;
  });
  return sum/list.length;
}

const avg_price = Find_averagePrice(marketplace);
console.log(avg_price);


/**
 * 🏎
 * We are almost done with the `marketplace` variable
 * Keep pushing
 * 🏎
 */

// 🎯 TODO: Products by brands
// 1. Create an object called `brands` to manipulate products by brand name
// The key is the brand name
// The value is the array of products
//
// Example:
// const brands = {
//   'brand-name-1': [{...}, {...}, ..., {...}],
//   'brand-name-2': [{...}, {...}, ..., {...}],
//   ....
//   'brand-name-n': [{...}, {...}, ..., {...}],
// };
//
// 2. Log the variable
// 3. Log the number of products by brands

function filterBy_brand(brand) {
  return function(element) {
      return element.brand == brand;
  }
}

var brands = {};
brands_list.forEach(element => {
  brands[element] = marketplace.filter(filterBy_brand(element));
  
});

console.log(brands);

var length_perBrand = {};
brands_list.forEach(element => {
  length_perBrand[element] = brands[element].length;
  
});
console.log(length_perBrand);


// 🎯 TODO: Sort by price for each brand
// 1. For each brand, sort the products by price, from highest to lowest
// 2. Log the sort

const sorted_brand_price = {};
brands_list.forEach(element => {
  sorted_brand_price[element] = sortby_price(brands[element],false);
});
console.log(sorted_brand_price);


// 🎯 TODO: Sort by date for each brand
// 1. For each brand, sort the products by date, from old to recent
// 2. Log the sort
const sorted_brand_date = {};
brands_list.forEach(element => {
  sorted_brand_date[element] = sortby_date(brands[element],true);
});
console.log(sorted_brand_date);



/**
 * 💶
 * Let's talk about money now
 * Do some Maths
 * 💶
 */

// 🎯 TODO: Compute the p90 price value
// 1. Compute the p90 price value of each brand
// The p90 value (90th percentile) is the lower value expected to be exceeded in 90% of the products

const p90_byBrands = {};
brands_list.forEach(element => {
  var sorted = sortby_price(brands[element],true);
  var pos = Math.round(((sorted.length) - 1) * 0.90);
  p90_byBrands[element] = sorted[pos].price;
});
console.log(p90_byBrands);




/**
 * 🧥
 * Cool for your effort.
 * It's almost done
 * Now we manipulate the variable `COTELE_PARIS`
 * `COTELE_PARIS` is a list of products from https://coteleparis.com/collections/tous-les-produits-cotele
 * 🧥
 */

const COTELE_PARIS = [
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-gris',
    price: 45,
    name: 'BASEBALL CAP - TAUPE',
    uuid: 'af07d5a4-778d-56ad-b3f5-7001bf7f2b7d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-navy',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - NAVY',
    uuid: 'd62e3055-1eb2-5c09-b865-9d0438bcf075',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-fuchsia',
    price: 110,
    name: 'VESTE - FUCHSIA',
    uuid: 'da3858a2-95e3-53da-b92c-7f3d535a753d',
    released: '2020-11-17'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-camel',
    price: 45,
    name: 'BASEBALL CAP - CAMEL',
    uuid: 'b56c6d88-749a-5b4c-b571-e5b5c6483131',
    released: '2020-10-19'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-beige',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BEIGE',
    uuid: 'f64727eb-215e-5229-b3f9-063b5354700d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-rouge-vermeil',
    price: 110,
    name: 'VESTE - ROUGE VERMEIL',
    uuid: '4370637a-9e34-5d0f-9631-04d54a838a6e',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-bordeaux',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BORDEAUX',
    uuid: '93d80d82-3fc3-55dd-a7ef-09a32053e36c',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/le-bob-dylan-gris',
    price: 45,
    name: 'BOB DYLAN - TAUPE',
    uuid: 'f48810f1-a822-5ee3-b41a-be15e9a97e3f',
    released: '2020-12-21'
  }
]

// 🎯 TODO: New released products
// // 1. Log if we have new products only (true or false)
// // A new product is a product `released` less than 2 weeks.
let date;
let diff;
let state = true;
COTELE_PARIS.forEach(e =>{
  date = Date.parse(e.released);
  diff = Math.trunc((Date.now() - date) / (1000 * 3600 * 24)); 
  if(diff > 2*7){
    state = false;
  }
})
console.log(state);



// 🎯 TODO: Reasonable price
// // 1. Log if coteleparis is a reasonable price shop (true or false)
// // A reasonable price if all the products are less than 100€
let stateR = true;
COTELE_PARIS.forEach(element =>{
  if( element.price >= 100){
    stateR = false;
  }
})
console.log(stateR);

// 🎯 TODO: Find a specific product
// 1. Find the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the product

function Find(id){
  let res = null;
  COTELE_PARIS.forEach(element =>{
    if( element.uuid == id){
      res = element;
    }
  })
  return res;
}
console.log(Find('b56c6d88-749a-5b4c-b571-e5b5c6483131'));

// 🎯 TODO: Delete a specific product
// 1. Delete the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the new list of product

function Delete(id){
  var copy = [...COTELE_PARIS];
  for( var i = 0; i < copy.length; i++){ 
                                   
    if ( copy[i].uuid == id) { 
        copy.splice(i, 1); 
        i--; 
    }
  }
  return copy;

}

console.log(Delete('b56c6d88-749a-5b4c-b571-e5b5c6483131'));

// 🎯 TODO: Save the favorite product
let blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// we make a copy of blueJacket to jacket
// and set a new property `favorite` to true
let jacket = blueJacket;
jacket.favorite = true;

// 1. Log `blueJacket` and `jacket` variables
// 2. What do you notice?
console.log(blueJacket);
console.log(jacket);
//Its exactly the same (jacket.favorite is also set to true)

blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// 3. Update `jacket` property with `favorite` to true WITHOUT changing blueJacket properties
jacket = {...blueJacket};
jacket.favorite = true;

console.log(blueJacket);
console.log(jacket);


/**
 * 🎬
 * The End
 * 🎬
 */

// 🎯 TODO: Save in localStorage
// 1. Save MY_FAVORITE_BRANDS in the localStorage
localStorage.setItem('MY_FAVORITE_BRAND', JSON.stringify(MY_FAVORITE_BRANDS));
// 2. log the localStorage
console.log(localStorage)
