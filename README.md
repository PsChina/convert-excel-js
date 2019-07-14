# Convert Excel and JSON

This is an internationalization helper that helps you convert the files you want to internationalize between Json and Excel.

## Install with npm

```bash
npm install convert-excel-js -g
```

## yarn

```bash
yarn global add convert-excel-js
```

## How to use

Convert json to excel

`excel [filePath] [fileName]`
```bash
excel ./filename.json
# excel ./filename.json appText
```

Convert excel to json

`json [filePath] [keyColumn] [valueColumn] [fileName]`
```bash
json ./filename.xlsx A B
# json ./filename.xlsx A B fileName.js
```


