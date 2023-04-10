const express = require('express'),
  router = express.Router();
  const fs = require('fs');
  const SVG = require('../models/svg_model');

function loggedIn(request, response, next) {
  if (request.user) {
    next();
  } else {
    response.redirect('/login');
  }
}

router.get('/svg', function(request, response){
    let allsvgs = SVG.getSvgs()
    response.status(200)
    response.setHeader('Content-Type', 'text/html')
    response.render("svgs/allSvgs", {
        user: request.user,
        svgs : allsvgs
    });
});

router.get('/svg/new', loggedIn, function (request, response){
    let allsvgs = SVG.getSvgs()
    response.status(200)
    response.setHeader('Content-Type', 'text/html')
    response.render("svgs/svgNew", {
        user: request.user
    });
});

router.get('/svg/:id', function(request, response){
    let svgs = SVG.getSvgs()
    let svgName = request.params.printName;

    if(svgs[svgName]){
        console.log("it's the if statement")
        response.status(200);
        response.setHeader('Content-Type', 'text/html')
        response.render("svgs/svgDetails", {
            user: request.user,
            svg: svgs[svgName]
        });
    
    } else{
        response.status(404);
        response.setHeader('Content-Type', 'text/html')
        response.render("error", {
        "errorCode":"404"
        });
    }
    response.status(200);
})

router.get('/svg/:id/edit', function(request, response){
    let svgs = SVG.getSvgs()
    let svgName = request.params.printName;
    
    if(svgs[svgName]){
        console.log("it's the if statement")
        response.status(200);
        response.setHeader('Content-Type', 'text/html')
        response.render("svgs/svgEdit", {
            user: request.user,            
            svg: svgs[svgName]
        });
    
    } else{
        response.status(404);
        response.setHeader('Content-Type', 'text/html')
        response.render("error", {
        "errorCode":"404"
        });
    }
    response.status(200);
})





module.exports = router;