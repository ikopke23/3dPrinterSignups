//..............Include Express..................................//
const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const { application } = require('express');

//..............Create an Express server object..................//
const app = express();

//..............Apply Express middleware to the server object....//
app.use(express.json()); //Used to parse JSON bodies (needed for POST requests)
app.use(express.urlencoded());
app.use(express.static('public')); //specify location of static assests
app.set('views', __dirname + '/views'); //specify location of templates
app.set('view engine', 'ejs'); //specify templating library

//.............Define server routes..............................//
//Express checks routes in the order in which they are defined

app.get('/', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("index");
});

app.get('/guide', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("guide")
});

app.get('/schedule', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("schedule")
});

app.get('/printcreate', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("printCreate")
});

app.get('/halloffame', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("halloffame")
});



app.get('/print/:printName', function(request, response){
  let prints = JSON.parse(fs.readFileSync("data/prints.JSON"))
  
  let printName = request.params.printName;
  console.log("printName = "+printName)
  console.log("prints = "+prints[printName]["description"])
  if(prints[printName]){
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("printDetails", {
      print: prints[printName]
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
app.post('/printcreate', function(request,response){
  let prints = JSON.parse(fs.readFileSync("data/prints.json"));
  let printName = request.body.printName;

  console.log(prints);
  console.log("PrintName =  "+ printName);
  console.log(request.body.width)
  if(request.body.printName && request.body.description && request.body.link && request.body.infill && request.body.width && request.body.time && request.body.printer){
    let newPrint = {
      "name":printName,
      "description":request.body.description,
      "link":request.body.link,
      "time":request.body.time,
      "infill":request.body.infill,
      "width":request.body.width,
      "studentName":request.body.studentName,
      "printer":request.body.printer,
    };
    console.log("newPrint = ");
    console.log(newPrint)
    prints[printName] = newPrint;
    fs.writeFileSync("data/prints.json", JSON.stringify(prints))
    console.log(JSON.parse(fs.readFileSync('data/prints.json')))
    
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.redirect("/printDetails/"+printName)
  } else {
    alert("Please fill out all information before saving");
  }
});



// /*
// test Details
// app.get('/printDetails', function(request, response){
//   response.status(200)
//   response.setHeader('Content-Type', 'text/html')
//   response.render("printDetails", {
//     print:  {
//             "name":"tempTower_mini-IK",
//             "description":"An automated temp tower from Prusa itself to test the new filament on the minis",
//             "link":"https://www.printables.com/model/20652-temp-tower-pla-petg-absasa-for-prusa-mini-mk3s-and",
//             "time":"229",
//             "infill":"20",
//             "width":"0.3",
//             "studentName":"Ian_Kopke"
//         }
//   })
// });

// */


//------------------- DEMO CODE BELOW -------------------------------

app.get('/play', function(request, response) {
    let opponents = JSON.parse(fs.readFileSync('data/opponents.json'));
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("play", {
      data: opponents
    });
});

app.get('/results', function(request, response) {
    let opponents = JSON.parse(fs.readFileSync('data/opponents.json'));

    //accessing URL query string information from the request object
    let opponent = request.query.opponent;
    let playerThrow = request.query.throw;

    if(opponents[opponent]){
      let opponentThrowChoices=["Paper", "Rock", "Scissors"];
      let results={};

      results["playerThrow"]=playerThrow;
      results["opponentName"]=opponent;
      results["opponentPhoto"]=opponents[opponent].photo;
      results["opponentThrow"] = opponentThrowChoices[Math.floor(Math.random() * 3)];

      if(results["playerThrow"]===results["opponentThrow"]){
        results["outcome"] = "tie";
      }else if(results["playerThrow"]==="Paper"){
        if(results["opponentThrow"]=="Scissors") results["outcome"] = "lose";
        else results["outcome"] = "win";
      }else if(results["playerThrow"]==="Scissors"){
        if(results["opponentThrow"]=="Rock") results["outcome"] = "lose";
        else results["outcome"] = "win";
      }else{
        if(results["opponentThrow"]=="Paper") results["outcome"] = "lose";
        else results["outcome"] = "win";
      }

      if(results["outcome"]=="lose") opponents[opponent]["win"]++;
      else if(results["outcome"]=="win") opponents[opponent]["lose"]++;
      else opponents[opponent]["tie"]++;

      //update opponents.json to permanently remember results
      fs.writeFileSync('data/opponents.json', JSON.stringify(opponents));

      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.render("results", {
        data: results
      });
    }else{
      response.status(404);
      response.setHeader('Content-Type', 'text/html')
      response.render("error", {
        "errorCode":"404"
      });
    }
});

app.get('/scores', function(request, response) {
  let opponents = JSON.parse(fs.readFileSync('data/opponents.json'));
  let opponentArray=[];

  //create an array to use sort, and dynamically generate win percent
  for(name in opponents){
    opponents[name].win_percent = (opponents[name].win/parseFloat(opponents[name].win+opponents[name].lose+opponents[name].tie) * 100).toFixed(2);
    if(opponents[name].win_percent=="NaN") opponents[name].win_percent=0;
    opponentArray.push(opponents[name])
  }
  opponentArray.sort(function(a, b){
    return parseFloat(b.win_percent)-parseFloat(a.win_percent);
  })

  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("scores",{
    opponents: opponentArray
  });
});

app.get('/opponent/:opponentName', function(request, response) {
  let opponents = JSON.parse(fs.readFileSync('data/opponents.json'));

  // using dynamic routes to specify resource request information
  let opponentName = request.params.opponentName;

  if(opponents[opponentName]){
    opponents[opponentName].win_percent = (opponents[opponentName].win/parseFloat(opponents[opponentName].win+opponents[opponentName].lose+opponents[opponentName].tie) * 100).toFixed(2);
    if(opponents[opponentName].win_percent=="NaN") opponents[opponentName].win_percent=0;

    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("opponentDetails",{
      opponent: opponents[opponentName]
    });

  }else{
    response.status(404);
    response.setHeader('Content-Type', 'text/html')
    response.render("error", {
      "errorCode":"404"
    });
  }
});

app.get('/opponentCreate', function(request, response) {

    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("opponentCreate");
});

app.post('/opponentCreate', function(request, response) {
    let opponentName = request.body.opponentName;
    let opponentPhoto = request.body.opponentPhoto;
    if(opponentName&&opponentPhoto){
      let opponents = JSON.parse(fs.readFileSync('data/opponents.json'));
      let newOpponent={
        "name": opponentName,
        "photo": opponentPhoto,
        "win":0,
        "lose": 0,
        "tie": 0,
      }
      opponents[opponentName] = newOpponent;
      fs.writeFileSync('data/opponents.json', JSON.stringify(opponents));

      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.redirect("/opponent/"+opponentName);
    }else{
      response.status(400);
      response.setHeader('Content-Type', 'text/html')
      response.render("error", {
        "errorCode":"400"
      });
    }
});

// Because routes/middleware are applied in order,
// this will act as a default error route in case of
// a request fot an invalid route
app.use("", function(request, response){
  response.status(404);
  response.setHeader('Content-Type', 'text/html')
  response.render("error", {
    "errorCode":"404"
  });
});

//..............Start the server...............................//
const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server started at http://localhost:'+port+'.')
});
