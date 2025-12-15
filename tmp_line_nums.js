const fs = require('fs'); 
const path = process.argv[2]; 
const lines = fs.readFileSync(path,'utf8').split(/\r?\n/); 
lines.forEach((line,index)>=console.log((index + 1) + ': ' + line)); 
