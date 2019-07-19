# Convert Excel and JSON

This is an internationalization helper that helps you convert the files you want to internationalize between Json and Excel.

## Install with npm

```bash
npm install convert-excel-js -g
```

## Yarn

```bash
yarn global add convert-excel-js
```

## How to use it

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

## add time stamp

If you expect the file name to record the time just insert `[time]` 'into the name for example:

Convert json to excel

`excel [filePath] [fileName]`
```bash
excel ./filename.json appText.[time].json
```

Convert excel to json

`json [filePath] [keyColumn] [valueColumn] [fileName]`
```bash
json ./filename.xlsx A B fileName.[time].js
```
