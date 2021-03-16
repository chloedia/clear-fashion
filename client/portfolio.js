// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};


// inititiqte selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const spanNbNewProducts = document.querySelector('#nbNewProducts')
const spanP50 = document.querySelector('#p50');
const spanP90 = document.querySelector('#p90');
const spanP95 = document.querySelector('#p95');
const lastReleased = document.querySelector('#lastReleased');
const selectBrand = document.querySelector('#brand-select');
const filterPrice = document.querySelector('#check-filterBy-Price')
const filterFav = document.querySelector('#check-filterBy-Fav');
const filterReleased = document.querySelector('#check-filterBy-Released')
const sortSelect = document.querySelector('#sort-select')

/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  console.log("We set new current product")
  console.log(result);
  currentProducts = result;
  currentPagination = meta;
  

};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12) => {
  try {
    const response = await fetch(
      `https://clear-fashion-livid.vercel.app?page=${page}&size=${size}`
      //`https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
    );

    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }
    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  let i = 0;
  const template = products
    .map(product => {

      
      if(i==0){
        i+=1;
        return `
      <div class="row">
      <div class="col">
      <div class="product" id=${product._id}>
      <img class="product-photo" src=${product.photo}><br>
        <span>${product.brand}</span><br>
        <a href="${product.link}" target="_blank">${product.name}</a><br>
        <span>${product.price} € </span><br><button id="favorite" onclick="addFavorite(this,'${product._id}')">${favorite.has(product._id)?'UnFav\'':'Fav\''}</button>
      </div>
      </div>`;}
    else if(i==products.length - 1){
      i+=1;
        return `
      <div class="col">
      <div class="product" id=${product._id}>
        <img class="product-photo" src=${product.photo}><br>
        <span>${product.brand}</span><br>
        <a href="${product.link}" target="_blank">${product.name}</a><br>
        <span>${product.price} € </span><br><button id="favorite" onclick="addFavorite(this,'${product._id}')">${favorite.has(product._id)?'UnFav\'':'Fav\''}</button>
      </div>
      </div>`;
    }
    else if(i%3 != 0){
      i+=1;
        return `
      <div class="col">
      <div class="product" id=${product._id}>
      <img class="product-photo" src=${product.photo}><br>
        <span>${product.brand}</span><br>
        <a href="${product.link}" target="_blank">${product.name}</a><br>
        <span>${product.price} € </span><br><button id="favorite" onclick="addFavorite(this,'${product._id}')">${favorite.has(product._id)?'UnFav\'':'Fav\''}</button>
      </div>
      </div>`;
    }
    else{
      i+=1;
        return `
        </div>
        <div class="row">
      <div class="col">
      <div class="product" id=${product._id}>
      <img class="product-photo" src=${product.photo}><br>
        <span>${product.brand}</span><br>
        <a href="${product.link}" target="_blank">${product.name}</a><br>
        <span>${product.price} € </span><br><button id="favorite" onclick="addFavorite(this,'${product._id}')">${favorite.has(product._id)?'UnFav\'':'Fav\''}</button>
      </div>
      </div>`;
    }
      
      
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>What you asked for 💅🏽</h2>';
  sectionProducts.appendChild(fragment);
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = (pagination,products) => {
  const {count} = pagination;

  spanNbProducts.innerHTML = products.length;
  spanNbNewProducts.innerHTML = products.filter(product => filterBy_released(product)).length;
  spanP50.innerHTML = percentile(products,0.5);
  spanP90.innerHTML = percentile(products,0.9);
  spanP95.innerHTML = percentile(products,0.95);
  lastReleased.innerHTML = sortby_date(products,false)[0].released;

};

const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination,products);
  renderBrand(products);
};

const renderFilter = (products,pagination) => {
  renderProducts(products);
  renderIndicators(pagination,products);
  console.log(products);
}

/**
 * Declaration of all Listeners
 */

/**
 * Feature 0
 * Select the number of products to display
 * @type {[type]}
 */
selectShow.addEventListener('change', event => {
  fetchProducts(currentPagination.currentPage, parseInt(event.target.value))
    .then(setCurrentProducts)
    .then(() => render(productsToShow(currentProducts,filters,sorts), currentPagination));
});

document.addEventListener('DOMContentLoaded', () =>
  fetchProducts()
    .then(setCurrentProducts)
    .then(() => render(productsToShow(currentProducts,filters,sorts), currentPagination))
);


/* 
*Feature 1:
Browse available pages
*/ 
selectPage.addEventListener('change', event => {
  fetchProducts(parseInt(event.target.value), parseInt(selectShow.value))
    .then(setCurrentProducts)
    .then(() => render(productsToShow(currentProducts,filters,sorts), currentPagination));
});


/**
 * 
 * Before applying filters we declare a filter variable containing all the different filters possible
 */
function filterBy_released(obj) {
  let date;
  let diff;
  date = Date.parse(obj.released);
  diff = Math.trunc((Date.now() - date) / (1000 * 3600 * 24)); 
  if(diff<2*7){
    return true;
  }
  else{
    return false;
  }
  
}

//Before applying filters we declare a filter variable containing all the different filters possible
const filters = {
  'brand':'all',
  'recentProducts':false,
  'reasonablePrice':false,
  'favorite':false
}
//Function to apply the filters
function applyFilters(products,filters){

  
  return products
  .filter(product => filters.brand == "all" || product.brand == filters.brand)
  .filter(product => !filters.reasonablePrice || product.price < 50)
  .filter(product => !filters.recentProducts || filterBy_released(product))
  .filter(product => !filters.favorite || favorite.has(product._id));

  
  
}

/*.filter(product => filters.reasonablePrice && product.price < 50)
.filter(product => filters.recentProducts && filterBy_released(product))*/

// declare the same way a sort variable
var sorts = "price-asc";

function applySort(products,sort){
  switch(sort){
    case "price-asc":
      return sortby_price(products,true);
    case "price-desc":
      return sortby_price(products,false);
    case "date-asc":
      return sortby_date(products,true);
    case "date-desc":
      return sortby_date(products,false);
    default :
      return products;
  }

}

function productsToShow(products,filters,sort){
  let filtered = applyFilters(products,filters);
  return applySort(filtered,sort);
}



/*
* Feature 2 : Filter By Brands
*/ 




const renderBrand = products => {
  const brands_list = []
  products.forEach(element => {
  if (!brands_list.includes(element.brand)){
    brands_list.push(element.brand);
  }
  });

  let options = '<option value="all">All</option>';
  options += Array.from(
    {'length': brands_list.length},
    (value, index) => `<option value="${brands_list[index]}">${brands_list[index]}</option>`
  ).join('');

  selectBrand.innerHTML = options;
  selectBrand.selectedIndex = selectBrand.index;

};



selectBrand.addEventListener('change', event => {
  filters.brand = event.target.value;
  console.log(applyFilters(currentProducts,filters));
  renderFilter(productsToShow(currentProducts,filters,sorts),currentPagination);
});

/* 
* Feature 3 : Filter by recent product
*/

filterReleased.addEventListener('change', event => {
  filters.recentProducts = !filters.recentProducts;
  renderFilter(productsToShow(currentProducts,filters,sorts),currentPagination);
});




/* 
* Feature 4 : Filter by reasonable price
*/

filterPrice.addEventListener('change', event => {
  filters.reasonablePrice = !filters.reasonablePrice;
  renderFilter(productsToShow(currentProducts,filters,sorts),currentPagination);
});



/**
 * Feature 5 and 6: Sort By Price and date
*/

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

function sortby_date(list,desc){
  return list.sort(function (a, b) {
    var date1 = new Date(a.released);
    var date2 = new Date(b.released);
    if(desc){
      return  date1-date2;
    }
    else{
      return  date2-date1;

    }

  });
}

sortSelect.addEventListener('change', event => {
  sorts = event.target.value;
  renderFilter(productsToShow(currentProducts,filters,sorts),currentPagination);

});

/**
 * Feature 8-9: Number of products indicator On the function up
 */

 /**
  * Feature 10 : p50,p90 et p95
  */

function percentile(products,n){
    var sorted = sortby_price(products,true);
    var pos = Math.round(((sorted.length) - 1) * n);
    return sorted[pos].price;
  
}

/**
 * Feature 11 : Last release indicator up
 */

/**
 * Feature 12 : open product link Done in the renderProduct()
 */ 

/**
 * Features 13 : Save as favorite
 */
const favorite = new Set();

function addFavorite(elmt,id){
  if (favorite.has(id)){
    favorite.delete(id);
    renderProducts(productsToShow(currentProducts,filters,sorts));
  } 
  else{
      favorite.add(id);

  } 
  renderFilter(productsToShow(currentProducts,filters,sorts),currentPagination);
  
}

/**
 * Features 14 : Filter By Favorite
 */

 filterFav.addEventListener('change', event => {
  filters.favorite = !filters.favorite;
  renderFilter(productsToShow(currentProducts,filters,sorts),currentPagination);
});
