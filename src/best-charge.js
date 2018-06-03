'use strict';
const loadAllItems = require("./items.js");
const loadPromotions = require("./promotions.js");

/* 
1. besetcharge(inputItems)
2. loadAllItems
3. loadPromotions
4. buildItemsString(inputItems,allItems)
5. buildPromotionsString(inputItems,allPromotions)
6. getItemPriceById(string id)
7. int promotionCount=  CountMaxPromotion(inputItems,allItems,allPromotions)
8. int totalPrice=  CountTotalPrice(inputItems,allItems,allPromotions)
 */

function buildOrderListString(inputItems, allItems) {
  let selectedFoods = [];
  let itemsStr = [];
  prePromotionTotalPrice = 0;
  //console.log('============= 订餐明细 =============\n');
  let orderStr = '============= 订餐明细 =============\n';

  inputItems.forEach(inputItem => {
    let foodInfos = inputItem.split('x', 2);
    let foodId = foodInfos[0].trim();
    let foodCount = foodInfos[1].trim();

    allItems.forEach(allItem => {

      if (allItem.id === foodId) {

        let price = allItem.price;
        let itemTotalPrice = (price * foodCount);
        let str = `${allItem.name} x ${foodCount} = ${itemTotalPrice}元\n`;
        orderStr += str;
        //console.log(str);
        prePromotionTotalPrice += itemTotalPrice;
      }
    })

  });
  console.log(orderStr);
  return orderStr;
}

function buildPromotionString(inputItems) {
  let foods = loadAllItems();
  let promotions = loadPromotions();
  let promotion1 = 0;
  let promotion2 = 0;
  let promotionStr = "";
  finalTotalPrice = prePromotionTotalPrice;
  let promotionFoodName = "指定菜品半价(";

  if (prePromotionTotalPrice >= 30) {
    promotion1 = 6
    finalTotalPrice = prePromotionTotalPrice - promotion1;

    promotionStr = `-----------------------------------
使用优惠:
满30减6元，省6元`;
  }

  inputItems.forEach(inputItem => {

    let foodInfos = inputItem.split('x', 2);
    let foodId = foodInfos[0].trim();
    let foodCount = foodInfos[1].trim();

    for (let index = 0; index < promotions.length; index++) {

      let promotion = promotions[index];
      let price = 0;

      if (promotion.type === '指定菜品半价' && promotion.items != 'undefined') {
        promotion.items.forEach(foodIdItem => {
          if (foodIdItem === foodId) {

            foods.forEach(allItem => {

              if (allItem.id === foodId) {
                promotion2 += (allItem.price * foodCount) / 2;

                promotionFoodName += allItem.name;
                promotionFoodName += "，";
              }
            });
          }
        });
      }
    }
  });
  promotionFoodName = promotionFoodName.substring(0, promotionFoodName.length - 1);

  promotionFoodName += `)，省${promotion2}元`;

  if (promotion2 >= promotion1 && promotion2 > 0) {
    promotionStr = `-----------------------------------
使用优惠:\n`;
    promotionStr += promotionFoodName;
    finalTotalPrice = prePromotionTotalPrice - promotion2;
  }
  if (promotionStr.length > 0) {
    promotionStr += '\n';
  }
  promotionStr += `-----------------------------------
总计：${finalTotalPrice}元
===================================`;
  console.log(promotionStr);
  return promotionStr;
}

let prePromotionTotalPrice = 0;
let finalTotalPrice = 0;

function bestCharge(selectedItems) {
  let foods = loadAllItems();
  let promotions = loadPromotions();
  let selectedFoods = [];

  let ordStr = buildOrderListString(selectedItems, foods);
  let proStr = buildPromotionString(selectedItems);
  let outStr = ordStr.concat(proStr);

  console.log(outStr);
  return outStr;
}

module.exports = bestCharge;