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
        .find('.product_img_link')
        .attr('href');
      const link = $(element)
        .find('.product-name')
        .attr('href');
      const id = uuidv5('url', link);
      const brand = 'adresse';

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