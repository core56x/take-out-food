'use strict';
const  loadAllItems=require("./src/items.js");
const  bestCharge=require("./src/best-charge.js");

let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];

var outputs= bestCharge(inputs);