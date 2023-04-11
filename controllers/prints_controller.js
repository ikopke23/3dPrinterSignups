const express = require('express'),
  router = express.Router();
  const fs = require('fs');
const multer = require('multer');
const UUID = require('uuid')

  const Prints = require('../models/print_model');
  const user_model = require('../models/user_model');

function loggedIn(request, response, next) {
  if (request.user) {
    next();
  } else {
    response.redirect('/login');
  }
}


let privateStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, Date.now()+'-'+file.originalname.replace(' ', '-'));
  }
});
let privateUpload = multer({ storage: privateStorage });

let publicStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, Date.now()+'-'+file.originalname.replace(' ', '-'));
  }
});
let publicUpload = multer({ storage: publicStorage });

  //used to be prints/allprints
router.get('/print', function(request, response){
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    
    let printsJSON = Prints.getPrints();
    response.render("prints/allPrints", {
      user: request.user,
      prints : printsJSON
    })
  });
  
//used to be prints/printcreate
  router.get('/print/new', loggedIn, function(request, response){
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("prints/printCreate", {
      user: request.user
    })
  });
  
  //used to be prints/:printname
  router.get('/prints/:id', function(request, response){
    let prints = Prints.getPrints()
    console.log("/prints/:printName")
    let printName = request.params.id;
    // console.log(request)
    console.log("printName = "+printName)
    // console.log("prints = "+prints[printName]["description"])
    if(Prints.isPrint(printName)){
      console.log("it's the if statement")
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.render("prints/printDetails", {
        user: request.user,
        print: prints[printName],
      });
  
    } else{
      response.status(404);
      response.setHeader('Content-Type', 'text/html')
      response.render("error", {
        user: request.user,
        "errorCode":"404"
      });
    }
  
    response.status(200);

  });

  //used to be prints/printcreate
  router.post('/print', publicUpload.single('photo'), function(request,response){
    let prints = Prints.getPrints();
    let printName = request.body.printName;
    console.log(printName);
    const file = request.file;
    
    // console.log(prints);
    console.log("PrintName =  "+ printName);
    console.log("width = "+ request.body.width)
    console.log(request)
    // console.log(request.file);
    if(request.body.printName && request.body.description  && request.body.infill && request.body.width && request.body.time && request.body.printer  && request.user["_json"]["email"]){
    
      let newPrint = Prints.printCreate(request.body.printName, request.body.description, request.body.infill, request.body.width, request.body.time, request.body.printer, request.user["_json"]["email"],request.body.photo, request.body.studentName, request.body.date);
      user_model.addPrint(request.body.printName)

      console.log("trying to create the new print")
      console.log(Prints.getPrints())
  
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.render("prints/printDetails", {
        user: request.user,
        print : newPrint
      })
      response.redirect("/print/"+printName)
    } else {
    }
  });
  

  
  router.get('/prints/edit/:id', loggedIn, function(request, response){
    let prints = Prints.getPrints()

    let printName = request.params.id;

    let userEmail = request.user["_json"]["email"];
    // console.log(request);

    if(Prints.isPrint(printName) && user_model.usersPrint(userEmail, printName)){
      console.log("it's the if statement")
      console.log("print/:id/edit printName = :" + printName)
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.render("prints/printEdit", {
        user: request.user,
        print: prints[printName],
      });
  
    } else{
      response.status(404);
      response.setHeader('Content-Type', 'text/html')
      response.render("error", {
        user: request.user,
        "errorCode":"404"
      });
    }
  
    response.status(200);

  });
  
  router.post('/print/edit', function(request,response){
    let prints = Print.getPrints();
    let printName = request.printName;
    console.log(printName);
    
    // console.log(prints);
    // console.log("PrintName =  "+ printName);
    // console.log(request.body.width)
    if(request.body.printName && request.body.description && request.body.infill && request.body.width && request.body.time && request.body.printer && request.body.photo && request.body.user["_json"]["email"]){
    
      user_model.deletePrint(request.body.oldName);
      let newPrint = print_model.createPrint(request.body.printName && request.body.description && request.body.infill && request.body.width && request.body.time && request.body.printer && request.body.photo && request.body.user["_json"]["email"]);
      user_model.addPrint(request.body.printName)



      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.render("prints/printDetails", {
        user: request.user,
        print : newPrint
      })
      response.redirect("/print/"+printName)
    } else {
    }
  });
  
  // // test Details
  router.get('/printDetails', function(request, response){
    response.status(200)
    response.setHeader('Content-Type', 'text/html')
    response.render("prints/printDetails", {
      print:  {
        "name":"tempTower_mini-IK","description":"An automated temp tower from Prusa itself to test the new filament on the minis","link":"https://www.printables.com/model/20652-temp-tower-pla-petg-absasa-for-prusa-mini-mk3s-and","time":"229","infill":"20","width":"0.3","studentName":"Ian_Kopke","printer":"MK3Z", "date":"1/13/23/12:05/red"
          }
    })
  });
  

  router.post('/upload/photo', publicUpload.single('picture'), (req, res, next) => {
    const file = req.file;
    if (!file) {
      const error = {
      'httpStatusCode' : 400,
      'message':'Please upload a file'
       }
      res.send(error);
    }

  })

  module.exports = router;