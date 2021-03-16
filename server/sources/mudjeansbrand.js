const axios = require('axios');
const cheerio = require('cheerio');
const uuidv5 = require("uuidv5");

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);

  return $('.page-row-content .product-link.product-link__grid')
    .map((i, element) => {
      const name = $(element)
        .find('.product-title')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      const price = parseInt($(element)
          .find('.product-price')
          .text().split('€')[1].split('\n')[0]);

      const photo = "https:" + $(element)
        .find('.primary-image img').attr('src');
      const link = "https://mudjeans.eu" + $(element)
      .find('.product-title a').attr('href');
      const _id = uuidv5('url', name);

      const brand = 'mudjeans';

      const category =  (link.includes("women")?"Women":link.includes("men")?"Men":"Other");
      const date = (new Date).toLocaleDateString();
      return {name, price,photo,link,brand,_id,category,date};


      

      
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