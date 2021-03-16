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

  return $('ul.product_list.grid.row .product-container')
    .map((i, element) => {
      const name = $(element)
        .find('.product-name').attr('title')
        .trim()
        .replace(/\s/g, ' ');
      const price = parseInt(
        $(element)
          .find('.price.product-price')
          .text()
      );
      const photo = $(element)
        .find('.product_img_link img')
        .attr('data-original');
      const link = $(element)
        .find('.product-name')
        .attr('href');
      const _id = uuidv5('url', name);
      const brand = 'adresse';
      const category = 'Men';
      const released = (new Date).toLocaleDateString();

      return {name, price,photo,_id,link,brand,category,released};
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