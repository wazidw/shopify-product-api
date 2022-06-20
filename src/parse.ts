import exceljs, { Workbook, Worksheet, Row } from "exceljs";
import { ProductModel } from "./model/productmodel"
export default class Parse {

    private static attributeMap: object = {
        1: 'handle',
        2: 'title',
        3: 'body_html',
        4: 'vendor',
        5: 'product_type',
        6: 'tags',
        7: 'published',
        8: 'option1_name',
        9: 'option1_value',
        10: 'option2_name',
        11: 'option2_value',
        12: 'option3_name',
        13: 'option3_value',
        14: 'variant_sku',
        15: 'variantgrams',
        16: 'variant_inventory_tracker',
        17: 'variant_inventory_qty',
        18: 'variant_inventory_policy',
        19: 'variant_fulfillment_service',
        20: 'variant_price',
        21: 'variant_compare_at_price',
        22: 'variant_requires_shipping',
        23: 'variant_taxable',
        24: 'variant_barcode',
        25: 'image_src',
        26: 'image_position',
        27: 'image_alt_text',
        28: 'gift_card',
        29: 'seo_title',
        30: 'seo_description',
        31: 'google_shopping_google_product_category',
        32: 'google_shopping_gender',
        33: 'google_shopping_agegroup',
        34: 'google_shopping_mpn',
        35: 'google_shopping_adWordsgrouping',
        36: 'google_shopping_adWords_labels',
        37: 'google_shopping_condition',
        38: 'google_shopping_custom_product',
        39: 'google_shopping_custom_label_0',
        40: 'google_shopping_custom_label_1',
        41: 'google_shopping_custom_label_2',
        42: 'google_shopping_custom_label_3',
        43: 'google_shopping_custom_label_4',
        44: 'variant_image',
        45: 'variant_weight_unit',
        46: 'variant_tax_code'
    };

    static parseeExcel(workbook: Workbook): ProductModel[] {
        const self = this;
        if (!workbook || workbook.worksheets.length === 0) {
            throw Error();
        }
        const arr: ProductModel[] = [];
        const worksheet: Worksheet = workbook.worksheets[0];
        worksheet.eachRow((row: Row, rowNumber: number) => {
            if (rowNumber !== 1) {
                const model: any = {}
                row.eachCell((cell, colNumber) => {
                    model[self.attributeMap[colNumber as keyof object]] = cell.value?.toString();
                });
                arr.push(model);
            }
        });

        return arr;
    }

    static combineProduct(data: any){
        const products: { handle: any, children: {}[]; }[] = []

        data.forEach((item: { handle: any; }) => {
            const has = products.findIndex(o => o.handle === item.handle);
            if (has === -1) {
                products.push({
                    handle: item.handle,
                    children: [JSON.stringify(item)]
                })
            } else {
                products[has].children.push(JSON.stringify(item))
            }
        });
        return products;
    }
}