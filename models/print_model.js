const fs = require('fs');
const User = require('../models/user_model');


exports.getPrints = function(){
    return JSON.parse(fs.readFileSync("data/prints.json"));
}

function localGetPrints(){
    return JSON.parse(fs.readFileSync("data/prints.json"));
}

exports.savePrints = function(prints){
    fs.writeFileSync("data/prints.json", JSON.stringify(prints))
}


exports.printCreate = function(printName, description, infill, width, time, printer, user, photo){
    let prints = localGetPrints();
    if(printName && description && time && infill && width && time && printer && user){
        let newPrint = {
            "name":request.body.printName,
            "description":request.body.description,
            "time":request.body.time,
            "infill":request.body.infill,
            "studentName":request.body.studentName,
            "date":request.body.date,
            "printer":request.body.printer,
            "photo":request.body.photo,
            "user":request.user["_json"]["email"]
          };

          prints[printName] = newPrint;
          fs.writeFileSync("../data/prints.json", JSON.stringify(prints))
           return newPrint;
    }
}

exports.deletePrint = function(printName, user){
    let prints = localGetPrints();
    
    if(usersprint(user, printName)){
        delete prints[printName]
        savePrints(prints);
    }
}

exports.isPrint = function(printName){
    return localGetPrints()[printName];
}


