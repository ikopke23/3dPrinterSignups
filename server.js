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
  let hofPrints = JSON.parse(fs.readFileSync('data/hofprints.json'));
  let keys = Object.keys(hofPrints)
  let randomKey = Math.floor(Math.random()*keys.length);
  let print = hofPrints[keys[randomKey]]
  console.log(print)
  const date = new Date();
  console.log(date)

  response.status(200);
  response.setHeader('Content-Type', 'text/html');
  response.render("index", {
    hofPrint :print,
    printers: JSON.parse(fs.readFileSync('data/printers.json'))

  })
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

app.get('/status', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("status")
});

app.get('/report', function(request, response){
  printerList = JSON.parse(fs.readFileSync('data/printers.json'))
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("report", {
    printers:printerList
  })
});

app.post('/report', function(request, response){
  printerList = JSON.parse(fs.readFileSync('data/printers.json'))
  let name = request.body.printer;
  console.log("name = " + name);
  console.log(printerList[name])

  printerList[name]["errors"].push(request.body.errormsg)
  fs.writeFileSync('data/printers.json', JSON.stringify(printerList))
  
  let noSpaceName = name.split(' ').join('')
  
  response.status(200)
  response.setHeader('Content-Type', "text/html");
  response.render("printerDetails", {
    printer : printerList[name]
  })
  response.redirect("/printer/"+noSpaceName)
});

app.get('/addprinter', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("addPrinter")
});

app.post('/addprinter', function(request, response){
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
    response.render("/printerDetails", {
      printer:printerName.split(''),
    })
    response.redirect("printerDetails/"+printerName)
  }
});

app.get('/printer/:printerName', function(request, response){
  let printers = JSON.parse(fs.readFileSync("data/printers.json"))
  console.log("/print/:printName")
  let printerName = request.params.printName;
  // console.log("printName = "+printName)
  // console.log("prints = "+prints[printName]["description"])
  if(printers[printerName]){
    console.log("This is a real print")
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("printerDetails", {
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

app.get('/allprints', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("allPrints", {
    prints : JSON.parse(fs.readFileSync("data/prints.json"))
  })
});

app.get('/halloffame', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("halloffame", {
    hofPrints : JSON.parse(fs.readFileSync("data/hofprints.json"))
  })
});

app.get('/hofsubmit', function(request,response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("hofSubmit")
});

app.post('/hofsubmit', function(request, response){
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
    response.render('halloffame')
    response.redirect('/halloffame')
  } else {
    alert("Please fill out every field")
  }
})

app.get('/printcreate', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("printCreate")
});

app.get('/print/:printName', function(request, response){
  let prints = JSON.parse(fs.readFileSync("data/prints.JSON"))
  // console.log("/print/:printName")
  let printName = request.params.printName;
  // console.log("printName = "+printName)
  // console.log("prints = "+prints[printName]["description"])
  if(prints[printName]){
    console.log("it's the if statement")
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

  // console.log(prints);
  // console.log("PrintName =  "+ printName);
  // console.log(request.body.width)
  if(request.body.printName && request.body.description && request.body.link && request.body.infill && request.body.width && request.body.time && request.body.printer && request.body.photo){
    let newPrint = {
      "name":printName,
      "description":request.body.description,
      "link":request.body.link,
      "time":request.body.time,
      "infill":request.body.infill,
      "width":request.body.width,
      "studentName":request.body.studentName,
      "date":request.body.date,
      "printer":request.body.printer,
      "photo":request.body.photo,
    };
    console.log("newPrint = ");
    console.log(newPrint)
    prints[printName] = newPrint;
    fs.writeFileSync("data/prints.json", JSON.stringify(prints))
    console.log(JSON.parse(fs.readFileSync('data/prints.json')))

    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("printDetails", {
      print : newPrint
    })
    response.redirect("/print/"+printName)
  } else {
    alert("Please fill out all information before saving");
  }
});




// // test Details
app.get('/printDetails', function(request, response){
  response.status(200)
  response.setHeader('Content-Type', 'text/html')
  response.render("printDetails", {
    print:  {
      "name":"tempTower_mini-IK","description":"An automated temp tower from Prusa itself to test the new filament on the minis","link":"https://www.printables.com/model/20652-temp-tower-pla-petg-absasa-for-prusa-mini-mk3s-and","time":"229","infill":"20","width":"0.3","studentName":"Ian_Kopke","printer":"MK3Z", "date":"1/13/23/12:05/red"
        }
  })
});


//------------------- DEMO CODE BELOW ------------------------------
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
