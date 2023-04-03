const express = require('express'),
  router = express.Router();
  const fs = require('fs');
  const UUID = require('uuid')

function loggedIn(request, response, next) {
  if (request.user) {
    next();
  } else {
    response.redirect('/login');
  }
}

router.get('/svg', function(request, response){
    let allsvgs = JSON.parse(fs.readFileSync('data/svgs.json'))
    response.status(200)
    response.setHeader('Content-Type', 'text/html')
    response.render("/svgs/allsvgs", {
        svgs : allsvgs
    });
});

router.get('/svg/new', loggedIn, function (request, response){
    let allsvgs = JSON.parse(fs.readFileSync('data/svgs.json'))
    response.status(200)
    response.setHeader('Content-Type', 'text/html')
    response.render("/svgs/svgNew")
});

router.get('/svg/:id', function(request, response){
    let svgs = JSON.parse(fs.readFileSync("../data/svgs.json"))
    let svgName = request.params.printName;
    if(svgs[svgName]){
        console.log("it's the if statement")
        response.status(200);
        response.setHeader('Content-Type', 'text/html')
        response.render("svgs/svgDetails", {
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
    let svgs = JSON.parse(fs.readFileSync("../data/svgs.json"))
    let svgName = request.params.printName;
    if(svgs[svgName]){
        console.log("it's the if statement")
        response.status(200);
        response.setHeader('Content-Type', 'text/html')
        response.render("svgs/svgEdit", {
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