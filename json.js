#!/usr/bin/env node

const fs = require("fs");
const XLSX = require("xlsx");
const _zip = require('lodash.zip');
const set = require("lodash.set");
const buf = fs.readFileSync(process.argv[2]); // 待处理文件名
const wb = XLSX.read(buf, { type: "buffer" });

const keys = [];
const values = [];
for (const key in wb.Sheets.Sheet) {
  if (key.includes(process.argv[3])) {
    // key 所在列
    keys.push(wb.Sheets.Sheet[key].v);
  } else if (key.includes(process.argv[4])) {
    values.push(wb.Sheets.Sheet[key].v); //value 所在列
  }
}

keys.shift();
values.shift();

function translateArraysToJSON(keys, values) {
  const MyJSON = {};
  const arr = _zip(keys, values); // 注意如果key里面带.符号,会导致问题
  arr.forEach((item) => {
    set(MyJSON, item[0], item[1]);
  });
  // let index = 0;
  // for (const item of keys) {
  //   const currentKeys = item.split(".");
  //   let currentKey = "";
  //   for (let el of currentKeys) {
  //     while (el.includes("-")) {
  //       const caseIndex = el.indexOf("-") + 1;
  //       let elArr = el.split("");
  //       elArr[caseIndex] = elArr[caseIndex].toUpperCase();
  //       el = elArr.join("");
  //       el = el.replace("-", "");
  //     }
  //
  //     if (!isNaN(parseInt(el))) {
  //       currentKey += `["` + el + `"]`;
  //     } else {
  //       currentKey += "." + el;
  //     }
  //
  //     if (!eval("MyJSON" + currentKey)) {
  //       eval("MyJSON" + currentKey + "={}");
  //     }
  //   }
  //   eval("MyJSON" + currentKey + "=" + "`" + value[index++] + "`");
  // }
  return MyJSON;
}

let fileName =
  process.argv[5] ||
  process.argv[2]
    .split("/")
    .pop()
    .replace("xlsx", "json"); // 输出文件名

const fileNameArr = fileName.split(".");

let fileType = "any";
if (fileNameArr.length >= 1) {
  fileType = fileNameArr.pop();
}

fileName = fileName.replace("[time]", new Date().toLocaleString());

if (fileType === "js") {
  fs.writeFileSync(
    fileName,
    `'use strict';\n\n module.exports = ${JSON.stringify(
      translateArraysToJSON(keys, values),
      null,
      2
    )}`
  );
} else {
  fs.writeFileSync(
    fileName,
    `${JSON.stringify(translateArraysToJSON(keys, values), null, 2)}`
  );
}

console.log("done");
