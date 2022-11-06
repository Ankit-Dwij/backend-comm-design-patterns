const fs = require("fs");

console.log("before");

const res = fs.readFileSync("file.txt");
console.log(res);

console.log("after");
