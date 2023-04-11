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


exports.printCreate = function(printName, description, infill, width, time, printer, user, photo, studentName, date){
    let prints = localGetPrints();
    if(printName && description && time && infill && width && time && printer && user && photo){
        let newPrint = {
            "name":printName,
            "description": description,
            "time": time,
            "infill": infill,
            "studentName": studentName,
            "date": date,
            "printer": printer,
            "photo": photo,
            "user":user
          };

          prints[printName] = newPrint;
          fs.writeFileSync("data/prints.json", JSON.stringify(prints))
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


