import exceljs from 'exceljs';
import { expect } from "chai";
import "mocha";
import Parse from './parse';
import { ProductModel } from './model/productmodel';

describe("Workbook", () => {
    describe("should", () => {
        it('read workbook data', async () => {
            const workbook = new exceljs.Workbook();
            const excelfile = "./public/asset/jewelery.xlsx"
            workbook.xlsx.readFile(excelfile).then(() => {
                const dataarray: ProductModel[] = Parse.parseeExcel(workbook);
                expect(dataarray.length).to.eql(41);
            })
        });
    });
    describe("should", () => {
        it('combineProduct', async () => {
            const dataarray = [
                {
                  handle: 'chain-bracelet',
                  title: '7 Shakra Bracelet',
                  body_html: '7 chakra bracelet, in blue or black.',
                  vendor: 'Company 123',
                  product_type: 'Bracelet',
                  tags: 'Beads',
                  published: 'true',
                  option1_name: 'Color',
                  option1_value: 'Blue',
                  variantgrams: '0',
                  variant_inventory_qty: '1',
                  variant_inventory_policy: 'deny',
                  variant_fulfillment_service: 'manual',
                  variant_price: '42.99',
                  variant_compare_at_price: '44.99',
                  variant_requires_shipping: 'true',
                  variant_taxable: 'true',
                  image_src: 'https://burst.shopifycdn.com/photos/7-chakra-bracelet_925x.jpg',
                  image_position: '1',
                  gift_card: 'false',
                  variant_image: 'https://burst.shopifycdn.com/photos/navy-blue-chakra-bracelet_925x.jpg',
                  variant_weight_unit: 'kg'
                },
                {
                  handle: 'chain-bracelet',
                  option1_value: 'Black',
                  variantgrams: '0',
                  variant_inventory_qty: '0',
                  variant_inventory_policy: 'deny',
                  variant_fulfillment_service: 'manual',
                  variant_price: '42.99',
                  variant_compare_at_price: '44.99',
                  variant_requires_shipping: 'true',
                  variant_taxable: 'true',
                  image_src: 'https://burst.shopifycdn.com/photos/navy-blue-chakra-bracelet_925x.jpg',
                  image_position: '2',
                  variant_image: 'https://burst.shopifycdn.com/photos/7-chakra-bracelet_925x.jpg',
                  variant_weight_unit: 'kg'
                },
                {
                  handle: 'leather-anchor',
                  title: 'Anchor Bracelet Mens',
                  body_html: 'Black leather bracelet with gold or silver anchor for men.',
                  vendor: 'Company 123',
                  product_type: 'Bracelet',
                  tags: 'Anchor, Gold, Leather, Silver',
                  published: 'true',
                  option1_name: 'Color',
                  option1_value: 'Gold',
                  variantgrams: '0',
                  variant_inventory_qty: '1',
                  variant_inventory_policy: 'deny',
                  variant_fulfillment_service: 'manual',
                  variant_price: '69.99',
                  variant_compare_at_price: '85',
                  variant_requires_shipping: 'true',
                  variant_taxable: 'true',
                  image_src: 'https://burst.shopifycdn.com/photos/anchor-bracelet-mens_925x.jpg',
                  image_position: '1',
                  gift_card: 'false',
                  variant_image: 'https://burst.shopifycdn.com/photos/anchor-bracelet-mens_925x.jpg',
                  variant_weight_unit: 'kg'
                },
                {
                  handle: 'leather-anchor',
                  option1_value: 'Silver',
                  variantgrams: '0',
                  variant_inventory_qty: '0',
                  variant_inventory_policy: 'deny',
                  variant_fulfillment_service: 'manual',
                  variant_price: '55',
                  variant_compare_at_price: '85',
                  variant_requires_shipping: 'true',
                  variant_taxable: 'true',
                  image_src: '[object Object]',
                  image_position: '2',
                  variant_image: 'https://burst.shopifycdn.com/photos/anchor-bracelet-for-men_925x.jpg',
                  variant_weight_unit: 'kg'
                },
                {
                  handle: 'leather-anchor',
                  image_src: 'https://burst.shopifycdn.com/photos/leather-anchor-bracelet-for-men_925x.jpg',
                  image_position: '3'
                }
              ];
            const products = Parse.combineProduct(dataarray);
            expect(products.length).to.eql(2);
        });
    });
});
