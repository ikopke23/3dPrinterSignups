const fs = require('fs');
const User = require('../models/user_model');


exports.getSvgs = function(){
    return JSON.parse(fs.readFileSync("data/svgs.json"));
}

exports.saveSvgs = function(prints){
    fs.writeFileSync("../data/svg.json", JSON.stringify(prints))
}

exports.usersSvg = function(userName, cutName){
    svgs = getPrints();
    return svgs[cutName][user] == userName
}

exports.svgCreate = function(cutName, description, infill, width, time, printer, user){
    let svgs = getSvgs();
    if(cutName && description && photo && material && date && user){
        let newPrint = {
            "name":request.body.printName,
            "description":request.body.description,
            "link":request.body.link,
            "time":request.body.time,
            "width":request.body.width,
            "studentName":request.body.studentName,
            "date":request.body.date,

            "photo":request.body.photo,
            "user":request.user["_json"]["email"]
          };

          prints[printName] = newPrint;
          fs.writeFileSync("../data/prints.json", JSON.stringify(prints))
           return newPrint;
    }
}

exports.deleteSvg = function(printName, user){
    let prints = getSvgs();
    
    if(usersprint(user, printName)){
        User.removePrint(printName);

    }
}




