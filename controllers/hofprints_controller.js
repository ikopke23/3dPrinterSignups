import loggedIn from './auth.js'

const express = require('express'),
  router = express.Router();
const fs = require('fs');



router.get('/hofprints', function(request, response){
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("hofprints/halloffame", {
      hofPrints : JSON.parse(fs.readFileSync("data/hofprints.json"))
    })
  });
  
  router.get('/hofprints/hofsubmit', function(request,response){
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("hofprints/hofSubmit")
  });
  
  router.post('/hofprints', loggedIn, function(request, response){
    let hofPrints = JSON.parse(fs.readFileSync('data/hofprints.json'));
    let printName = request.body.printName;
    let desc = request.body.description;
    let printer = request.body.printer;
    let stName = request.body.studentName;
    let ph = request.body.photo;
  
    if(ph && stName && desc && printer && printName){
      newPrint = {
          "name":printName,
          "printer":printer,
          "student":stName,
          "description":desc,
          "photo":ph
      }
      hofPrints[printName] = newPrint;
      fs.writeFileSync('data/hofprints.json', JSON.stringify(hofPrints))
  
      response.status(200);
      response.setHeader('Content-Type', "text/html");
      response.render('hofprints/halloffame')
      response.redirect('/halloffame')
    } else {
      alert("Please fill out every field")
    }
  })

  module.exports = router;