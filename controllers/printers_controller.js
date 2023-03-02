import loggedIn from './auth.js'

const express = require('express'),
  router = express.Router();
 const fs = require('fs');


//used to be printers/allPrinters
router.get('/printer', loggedIn, function(request, response){
    let printerList = JSON.parse(fs.readFileSync('data/printers.json'))
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("printers/allPrinters", {
      printers: printerList
    })
});

//Used to be /report
router.get('/printer/allprints/report', loggedIn, function(request, response){ 
    printerList = JSON.parse(fs.readFileSync('data/printers.json'))
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("printers/report", {
      printers:printerList
    })
});

//used to be /report
router.post('/printer/allprints', function(request, response){
    printerList = JSON.parse(fs.readFileSync('data/printers.json'))
    let name = request.body.printer;
    console.log("name = " + name);
    console.log(printerList[name])
  
    printerList[name]["errors"].push(request.body.errormsg)
    fs.writeFileSync('data/printers.json', JSON.stringify(printerList))
    
    let noSpaceName = name.split(' ').join('')
    
    response.status(200)
    response.setHeader('Content-Type', "text/html");
    response.render("printers/printerDetails", {
      printer : printerList[name]
    })
    response.redirect("/printer/"+noSpaceName)
});
//used to be /printer/addPrinter
router.get('/printer/new', loggedIn, function(request, response){
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("printers/addPrinter")
  });


//used to be /printer/addprinter
router.post('/printer', function(request, response){
    let printers = JSON.parse(fs.readFileSync("data/printers.json"))
    let printerName = request.body.printName;
    let stats = request.body.status;
    let serv = request.body.service;
    let pho = request.body.photo;
    let location = request.body.local;
    let err = request.body.err;
    let prints = request.body.prints;
    let printTime = request.body.printTime;
  
    if(printerName && stats && serv && pho && location && err && prints){
      let newPrinter = {
        "name":printerName,
        "Status":stats,
        "errors":[err],
        "prints":[prints],
        "printingTime":printTime,
        "lastService":serv,
        "photo":pho,
        "location":location
      }
      printers[printerName] = newPrinter;
      fs.writeFileSync('data/printers.json', JSON.stringify(printers))
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.render("printers/printerDetails", {
        printer:printerName.split(' ').join(''),
      })
      response.redirect("printerDetails/"+printerName)
    }
  });
//used to be printer/printerName
router.get('/printer/:id', loggedIn, function(request, response){
    let printers = JSON.parse(fs.readFileSync("data/printers.json"))
    console.log("/printer/:id")
    let printerName = request.params.id;
    console.log("printerName = "+printerName)
    console.log("printer = "+printers[printerName])
    if(printers[printerName]){
      console.log("This is a real print")
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.render("printers/printerDetails", {
        printer: printers[printerName]
      });
    } else{
      response.status(404);
      response.setHeader('Content-Type', 'text/html')
      response.render("error", {
        "errorCode":"404"
      });
    }
  });


  module.exports = router;