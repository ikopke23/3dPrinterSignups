const express = require('express'),
  router = express.Router();

const fs = require('fs');

function loggedIn(request, response, next) {
  if (request.user) {
    next();
  } else {
    response.redirect('/login');
  }
}

  router.get('/', function(request, response) {
    let hofPrints = JSON.parse(fs.readFileSync('data/hofprints.json'));
    let keys = Object.keys(hofPrints)
    let randomKey = Math.floor(Math.random()*keys.length);
    let print = hofPrints[keys[randomKey]]
    // console.log(print)
    const date = new Date();
    console.log(date)
    response.status(200);
    response.setHeader('Content-Type', 'text/html');
    response.render("index", {
      user: request.user,
      hofPrint: print,
      printers: JSON.parse(fs.readFileSync('data/printers.json'))
  
    })
  });
  
  router.get('/guide', function(request, response) {
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("guide", {
      user: request.user
    })
  });
  
  router.get('/advtips', function(request, response){
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("advTips", {
      user: request.user
    })
  })
  
  router.get('/schedule', function(request, response){
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("schedule", {
      user: request.user
    })
  });
  

  router.get('/login', function(request, response) {
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("login", {
      user: request.user
    });
  });
  
router.get('/error', function(request, response) {
  const errorCode = request.query.code;
  if (!errorCode) errorCode = 400;
  const errors = {
    '400': "Unknown Client Error",
    '401': "Invlaid Login",
    '404': "Resource Not Found",
    '500': "Server problem"
  }

  response.status(errorCode);
  response.setHeader('Content-Type', 'text/html')
  response.render("error", {
    user: request.user,
    "errorCode": errorCode,
    "details": errors[errorCode]
  });
});

module.exports = router
