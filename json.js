#!/usr/bin/env node

const fs = require("fs");
const XLSX = require("xlsx");
const buf = fs.readFileSync(process.argv[2]); // 待处理文件名
const wb = XLSX.read(buf, { type: "buffer" });

const TABLE_NAME = process.argv[3] || 'Sheet';

const KEY_COLUMN_NAME = process.argv[4] || 'A';

const VALUE_COLUMN_NAME = process.argv[5] || 'B';

const EXPORT_FILE_NAME = process.argv[6] ||
process.argv[2]
  .split("/")
  .pop()
  .replace("xlsx", "json"); // 输出文件名

const keys = [];
const values = [];

const data = wb.Sheets[TABLE_NAME];

for (const key in data) {

  if (key.includes(KEY_COLUMN_NAME)) {
    // key 所在列
    keys.push(data[key].v);
  }

  if (key.includes(VALUE_COLUMN_NAME)) {
    //value 所在列
    values.push(data[key].v);
  }

}

keys.shift();
values.shift();

function translateArraysToJSON(keys, value) {
  const MyJSON = {};
  let index = 0;
  for (const item of keys) {
    const currentKeys = item.split(".");
    let currentKey = "";
    for (let el of currentKeys) {
      currentKey += `["` + el + `"]`;
      if (!eval("MyJSON" + currentKey)) {
        eval("MyJSON" + currentKey + "={}");
      }
    }
    eval("MyJSON" + currentKey + "=" + "`" + value[index++] + "`");
  }
  return MyJSON;
}

// 输出文件名
const fileNameArr = EXPORT_FILE_NAME.split(".");

let fileType = "any";
if (fileNameArr.length >= 1) {
  fileType = fileNameArr.pop();
}

const fileName = EXPORT_FILE_NAME.replace("[time]", new Date().toLocaleString());

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
