var copyfiles = require('copyfiles');
console.log(__dirname);
copyfiles(['../src/public/**/*', '../src/views/**/*', './'], 2, () => {
    console.log("Files copied");
});
var aaa = require('./dist/server.js');