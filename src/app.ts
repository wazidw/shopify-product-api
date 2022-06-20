import 'dotenv/config'
import express from "express";
import exceljs from 'exceljs';
import {json} from 'body-parser';

import Shopify, { DataType } from '@shopify/shopify-api';
import Parse from './parse';
import { ProductModel } from './model/productmodel';

const app = express();
app.use(json());
const port = 3000;

const { API_SECRET_KEY, SHOP } = process.env;

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get('/shop', async (_req, res) => {

  const client = new Shopify.Clients.Rest(SHOP, API_SECRET_KEY);
  const shops = await client.get({
    path: 'shop',
    type: DataType.JSON,
  });

  res.json(shops.body);
})

app.get("/import-product", (_req, res) => {
  const client = new Shopify.Clients.Rest(SHOP, API_SECRET_KEY);
  const re: any = [];
  const workbook = new exceljs.Workbook();
  const excelfile = "./public/asset/jewelery.xlsx";
  workbook.xlsx.readFile(excelfile).then(() => {
      const dataarray: ProductModel[] = Parse.parseeExcel(workbook);

      const products = Parse.combineProduct(dataarray);
      products.forEach(async (product) => {
          let pbase : any = {};
          let pextend : any = {};
          const pimages : any = [];
          const pvariants : any = [];
          pbase = JSON.parse(product.children[0].toString())
          pimages.push({ src : pbase.image_src})
          pvariants.push({
              option1: pbase.option1_value,
              price: pbase.variant_price,
              sku: pbase.variant_sku
          });
          const poptions = [{
              name:pbase.option1_name,
              values:pbase.option1_value
          }]
          product.children.forEach((_, index) =>{
              if(index > 0){
                  pextend = JSON.parse(product.children[index].toString())
                  if(pextend.image_src){
                      pimages.push({src : pextend.image_src})
                  }
                  if(pextend.option1_value){
                      pvariants.push({
                          option1 : pextend.option1_value,
                          price: pextend.variant_price
                      })
                  }
              }
          })

          const body = {
              product: {
                  title: pbase.title,
                  body_html: pbase.body_html,
                  vendor: pbase.vendor,
                  product_type: pbase.product_type,
                  tags:pbase.tags ? pbase.tags.split(","):[],
                  variants:pvariants,
                  options:poptions,
                  images:pimages
              }
          };
          await client.post({
            path: 'products',
            data: body,
            type: DataType.JSON,
          });
      });
  })
  res.json({
    success: "success import",
  })
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;
