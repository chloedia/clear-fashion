const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const db = require('./db');

const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());


app.get('/products/search', async (req, response) => {
  let res;
  let meta;
  if(req.query.brand){
    res = await db.findPage(parseInt(req.query.page),parseInt(req.query.size),{'brand': req.query.brand});
    meta = await db.getMeta(parseInt(req.query.page),parseInt(req.query.size),{'brand': req.query.brand});
  }
  else{
    res = await db.findPage(parseInt(req.query.page),parseInt(req.query.size));
    meta = await db.getMeta(parseInt(req.query.page),parseInt(req.query.size));
  }
  
  
  let products = {
    "success" : true,
    "data" : {
    "result" : res,
    "meta": meta
      }}
  response.send(products);
});

app.get('/products/:id', (req, response) => {
  console.log("was requested 2");
  db.find({'_id': req.params.id}).then(res => response.send(res));
});

app.get('', async (req, response) => {
  console.log("was requested pagination");
  let res = await db.findPage(parseInt(req.query.page),parseInt(req.query.size))
  let meta = await db.getMeta(parseInt(req.query.page),parseInt(req.query.size))
  let products = {
    "success" : true,
    "data" : {
    "result" : res,
    //"meta" : {"currentPage":req.query.page,"pageCount":?,"pageSize":res.length,"count":?}
    "meta": meta
      }

  }
  response.send(products);
  
});

app.listen(PORT);
console.log(`📡 Running on port ${PORT}`);
