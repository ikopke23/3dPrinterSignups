const fs = require('fs');



exports.getPrints = function(){
    return JSON.parse(fs.readFileSync("data/prints.json"));
}

exports.printCreate = function(printName, description, infill, width, time, printer, user){
    let prints = getPrints();
    if(printName && description && time && infill && width && time && printer && user){
        let newPrint = {
            "name":request.body.printName,
            "description":request.body.description,
            "link":request.body.link,
            "time":request.body.time,
            "infill":request.body.infill,
            "width":request.body.width,
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
    let prints = getPrints();
    
    if(prints[printName]["user"] == user){

    }
}