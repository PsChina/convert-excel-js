let {exec} = require('child_process');
exec('json ./locale-zh.xlsx A B test.json',(err,stdout,stderr)=>{
    console.log(stdout);
    console.log(stderr);  // 应当返回正确的json, 哪怕key存在空格
})