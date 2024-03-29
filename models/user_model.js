const fs = require('fs');

exports.getUsers = function () {
    let users = JSON.parse(fs.readFileSync(__dirname + '/../data/users.json'));
    return users;
}

getlocalUsers = function () {
    let users = JSON.parse(fs.readFileSync(__dirname + '/../data/users.json'));
    return users;
}

exports.isUser = function (userID) {
    let users = getlocalUsers();
    if (users[userID] && users[userID]["privileges"].indexOf("user") >= 0) return true;
    else return false;
}

exports.makeAdmin = function (userID) {
    let allUsers = getlocalUsers();
    if (users[userID] && users[userID]["privileges"].indexOf("admin") < 0) users[userID]["privileges"].push("admin");
    fs.writeFileSync(__dirname + '/../data/users.json', JSON.stringify(allUsers));
}

exports.isAdmin = function (userID) {
    let users = getlocalUsers();
    if (users[userID] && users[userID]["privileges"].indexOf("admin") >= 0) return true;
    else return false;
}

exports.getUser = function (userID) {
    let users = getlocalUsers();
    let prints = users[userID]["prints"];
    let printHours = 0;
    for (let i = 0; i, users[userID]["prints"].length; i++) {
        printHours += prints.printTime(users[userID]["prints"][i]);
    }
    users[userID]["printTime"] = printHours;
    return users[userID];
}

exports.createUser = function (userID, playerDisplayName) {
    let allUsers = getlocalUsers();
    console.log(getlocalUsers());
    console.log("createUser function Called");
    if (!allUsers[userID]) {
        let newPlayer = {
            "displayName": playerDisplayName,
            "privileges": ["user"],
            "prints": [],
            "SVGs": [],
            "printHours": 0,
            "dateJoined": new Date()
        }
        allUsers[userID] = newPlayer;
        fs.writeFileSync(__dirname + '/../data/users.json', JSON.stringify(allUsers));
    }
}

exports.updateUser = function (playerName, results) {
    let allUsers = getlocalUsers();

    /*  if(outcome=="player") allUsers[playerName]["win"]++;
      else if(outcome=="player") allUsers[playerName]["lose"]++;
      else allUsers[playerName]["tie"]++;
    */

    fs.writeFileSync(__dirname + '/../data/users.json', JSON.stringify(allUsers));
}

exports.removeUser = function (userID) {
    let allUsers = getlocalUsers();
    if (allUsers[userID]) delete allUsers[userID];
    fs.writeFileSync(__dirname + '/../data/users.json', JSON.stringify(allUsers));
}

exports.addPrint = function (userID, printID) {
    let allUsers = getlocalUsers();
    if (allUsers[userID]) {
        allUsers[userID].prints.push[printID];
        allUsers[userID].printHours += Prints.getPrints()[printID][time]/60
    }

    fs.writeFileSync(__dirname + '/../data/users.json', JSON.stringify(allUsers));
}

exports.removePrint = function (userID, printID) {
    let allUsers = getlocalUsers();
    if (allUsers[userID]) {
        let prints = allUsers[userID].prints;
        prints.splice(prints.indexOf(printID), 1)
        allUsers[userID].prints = prints;
    }
    fs.writeFileSync(__dirname + '/../data/users.json', JSON.stringify(allUsers));
}

exports.usersPrint = function(userName, printName){
    users = getlocalUsers();
    console.log(users["prints"]);
    userPrints = users[userName].prints

    for(let i = 0; i < userPrints.length; i++){
        if(userPrints[i] == printName)
            return true;
    }
    return false;
}

exports.addSVG = function (userID, svgID) {
    let allUsers = getlocalUsers();
    if (allUsers[userID]) {
        let prints = allUsers[userID].svg;
        svg.push[svgID];
    }
    fs.writeFileSync(__dirname + '/../data/users.json', JSON.stringify(allUsers));
}

exports.removeSVG = function (userID, svgID) {
    let allUsers = getlocalUsers();
    if (allUsers[userID]) {
        let svgs = allUsers[userID].SVGs;
        svgs.splice(svgs.indexOf(svgID), 1)
        allUsers[userID].SVGs = svgs;
    }
    fs.writeFileSync(__dirname + '/../data/users.json', JSON.stringify(allUsers));
}
