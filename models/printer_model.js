const fs = require('fs');

exports.getPrinters = function(){
    return JSON.parse(fs.readFileSync("data/printers.json"))
}