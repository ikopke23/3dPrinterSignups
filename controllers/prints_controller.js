const express = require('express'),
  router = express.Router();
  const fs = require('fs');
  const UUID = require('uuid')

  const Prints = require('../models/print_model')

function loggedIn(request, response, next) {
  if (request.user) {
    next();
  } else {
    response.redirect('/login');
  }
}

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
  router.get('/prints/:id', loggedIn, function(request, response){
    let prints = Prints.getPrints()
    console.log("/prints/:printName")
    let printName = request.params.printName;
    console.log("printName = "+printName)
    console.log("prints = "+prints[printName]["description"])
    if(prints[printName]){
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
        "errorCode":"404"
      });
    }
  
    response.status(200);

  });

  //used to be prints/printcreate
  router.post('/print', function(request,response){
    let prints = Prints.getPrints();
    let printName = request.printName;
    console.log(printName);
    
    // console.log(prints);
    // console.log("PrintName =  "+ printName);
    // console.log(request.body.width)
    if(request.body.printName && request.body.description && request.body.link && request.body.infill && request.body.width && request.body.time && request.body.printer && request.body.photo && request.body.user["_json"]["email"]){
    
      let newPrint = Prints.createPrint(request.body.printName && request.body.description && request.body.link && request.body.infill && request.body.width && request.body.time && request.body.printer && request.body.photo && request.body.user["_json"]["email"]);
      user_model.addPrint(request.body.printName)

    
      console.log(Prints.getPrints())
  
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.render("prints/printDetails", {
        user: request.user,
        print : newPrint
      })
      response.redirect("/print/"+printName)
    } else {
      alert("Please fill out all information before saving");
    }
  });
  

  
  router.get('/prints/:id/edit', loggedIn, function(request, response){
    let prints = Print.getPrints()

    let printName = request.params.printName;

    let userEmail = request.user["_json"]["email"];

    if(prints[printName] && prints[printName]["user"] == userEmail){
      console.log("it's the if statement")
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
        "errorCode":"404"
      });
    }
  
    response.status(200);

  });
  
  router.post('/print/edit', function(request,response){
    let prints = JSON.parse(fs.readFileSync("../data/prints.json"));
    let printName = request.printName;
    console.log(printName);
    
    // console.log(prints);
    // console.log("PrintName =  "+ printName);
    // console.log(request.body.width)
    if(request.body.printName && request.body.description && request.body.link && request.body.infill && request.body.width && request.body.time && request.body.printer && request.body.photo && request.body.user["_json"]["email"]){
    
      user_model.deletePrint(request.body.oldName);
      let newPrint = print_model.createPrint(request.body.printName && request.body.description && request.body.link && request.body.infill && request.body.width && request.body.time && request.body.printer && request.body.photo && request.body.user["_json"]["email"]);
      user_model.addPrint(request.body.printName)



      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.render("prints/printDetails", {
        user: request.user,
        print : newPrint
      })
      response.redirect("/print/"+printName)
    } else {
      alert("Please fill out all information before saving");
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
  

  module.exports = router;