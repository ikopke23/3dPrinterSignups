const fs = require('fs');

exports.getPrinters = function(){
    return JSON.parse(fs.readFileSync("data/printers.json"))
}

function getLocalPrinters(){
    return JSON.parse(fs.readFileSync("data/printers.json"))
}

exports.addPrint = function(printerName, printName){
    let printers = getLocalPrinters()
    let printer = printers[printerName];
    printer["prints"].push(printName);
    printers[printerName] = printer
    fs.writeFileSync("data/printers.json", JSON.stringify(printers))
}