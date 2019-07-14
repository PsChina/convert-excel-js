#!/usr/bin/env node
const Excel = require("exceljs");

const path = require("path");

const argv2 = process.argv[2];

let filePath;

if(argv2.charAt('0')!=='/' && argv2.charAt('0')!=='~') {
  filePath = path.resolve(process.env.PWD, argv2);
} else {
  filePath = argv2;
}

const data = require(filePath);

function getName(path){
  let filename = path.split('/').pop()

  if(filename.includes('.')){
    filename = filename.split('.');
    filename.pop();
    filename = filename.join('.')
  }
  return filename
}

let filename;

if(process.argv[3]) {
  filename = getName(process.argv[3]);
} else {
  filename = getName(filePath);
}

filename = `${filename}.xlsx`;

  var workbook = new Excel.stream.xlsx.WorkbookWriter({
    filename,
  });
  var worksheet = workbook.addWorksheet("Sheet");
  
  worksheet.columns = [
    { header: "key", key: "header"},
    { header: "value", key: "value"},
  ];

var dataArray = [];

getTiledData(data, dataArray);

var length = dataArray.length;

// 当前进度
var current_num = 0;
var time_monit = 400;
var temp_time = Date.now();

// 开始添加数据
for(let i in dataArray) {
  worksheet.addRow(dataArray[i]).commit();
  current_num = i;
  if(Date.now() - temp_time > time_monit) {
    temp_time = Date.now();
    console.log((current_num / length * 100).toFixed(2) + "%");
  }
}
workbook.commit();
console.log('done');

function getTiledData(data, arr, fatherKey = ""){
  for (let key in data) {
    if(typeof data[key] === "object"){
      getTiledData(data[key], arr, fatherKey+key+".")
    } else {
      arr.push({
        header:fatherKey+key.replace(".",""),
        value: data[key]
      })   
    }
  }
}
