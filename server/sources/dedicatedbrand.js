const axios = require('axios');
const cheerio = require('cheerio');
const uuidv5 = require("uuidv5");
const fetch = require("node-fetch");

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */

const fetchProducts = (data) => {
    console.log("PIF");
    let all_products = [];
    let all_ids = [];
    data.forEach((x) => {
      if(x!=undefined && x.length!=0 && !all_ids.includes(x.uid)){
        all_products.push( {
          'name' : x.name,
          'price' : x.price.priceAsNumber,
          'photo' : x.image[0],
          'link' : "https://www.dedicatedbrand.com/"+x.canonicalUri,
          'uuid' : uuidv5('url', x.name),
          'brand':"dedicated",
          'category': (x.canonicalUri.includes("women")?"Women":x.canonicalUri.includes("men")?"Men":"Other")
          
        });
        all_ids.push(x.uid);
      }
    })
    return all_products;
  
};

const checker = data =>{
  const $ = cheerio.load(data);
  return $('.mainNavigation-fixedContainer .mainNavigation-link-subMenu .mainNavigation-link-subMenu-link.mainNavigation-link-subMenu-link--image')
  .map((i,element) => {
    const url = "https://www.dedicatedbrand.com" + $(element)
    .find('a').attr('href');
    return url;
  }).get();
}

const parse = data => {
  const $ = cheerio.load(data);

  return $('.productList-container .productList')
    .map((i, element) => {
      const name = $(element)
        .find('.productList-title')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      const price = parseInt(
        $(element)
          .find('.productList-price')
          .text());
      const photo = $(element)
      .find('.productList-image img')
      .attr('src');


      const link= "https://www.dedicatedbrand.com" + $(element)
      .find('.productList-link')
      .attr('href');
      const id = uuidv5('url', link);
      const brand = 'dedicated';
      //const complet_link = "https://www.dedicatedbrand.com"+link;
      

      return {name, price,photo,id,link,brand};
    })
    .get();
};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async url => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return parse(data);
  }

  console.error(status);

  return null;
};

module.exports.getAllURLs = async url => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return checker(data);
  }

  console.error(status);

  return null;
};

module.exports.fetchProducts = async url => {
  const response = await axios ({
    url: "https://www.dedicatedbrand.com/en/loadfilter",
    method: "GET"
  })
  const products = response.data.products;
  const all_p = fetchProducts(products);
  return all_p;
};
