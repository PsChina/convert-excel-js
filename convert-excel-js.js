#!/usr/bin/env node

const argv2 = process.argv[2];

if(argv2 === '-v'){
   const package = require('./package.json');
   console.log(package.version);
}