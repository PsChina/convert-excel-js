# 介绍

[English](./README-en.md)

这是一个应用程序国际化助手，可以帮助你在 json 和 excel 之间完成文件类型转换。

## 使用 npm 安装

```bash
npm install convert-excel-js -g
```

## 使用 yarn 安装

```bash
yarn global add convert-excel-js
```

## 如何使用

将 json 转换为 excel 。

`excel [filePath] [fileName]`
```bash
excel ./filename.json
# excel ./filename.json appText
```

将 excel 转换为 json 。

`json [filePath] [sheetName] [keyColumn] [valueColumn] [fileName]`
```bash
json ./filename.xlsx 工作表1 A B
# json ./filename.xlsx 工作表1 A B fileName.js
```

## 添加时间戳

如果你希望生成文件时记录时间，只需在文件名中插入`[time]`即可，例如:

将 json 转换为 excel 。

`excel [filePath] [fileName]`
```bash
excel ./filename.json appText.[time].json
```

将 excel 转换为 json 。

`json [filePath] [sheetName] [keyColumn] [valueColumn] [fileName]`
```bash
json ./filename.xlsx 工作表1 A B fileName.[time].js
```
