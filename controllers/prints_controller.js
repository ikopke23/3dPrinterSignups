app.get('/print/allprints', function(request, response){
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("allPrints", {
      prints : JSON.parse(fs.readFileSync("data/prints.json"))
    })
  });
  
  
  app.get('/printcreate', function(request, response){
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("printCreate")
  });
  
  app.get('/print/:printName', function(request, response){
    let prints = JSON.parse(fs.readFileSync("data/prints.JSON"))
    console.log("/print/:printName")
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
  