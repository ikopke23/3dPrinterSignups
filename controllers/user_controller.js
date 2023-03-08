const fs = require('fs');

exports.getUsers = function () {
    let users = getUsers();
    return users;
}

exports.isUser = function (userID) {
    let users = getUsers();
    if (users[userID] && users[userID]["privileges"].indexOf("user") >= 0) return true;
    else return false;
}

exports.makeAdmin = function (userID) {
    let allUsers = getUsers();
    if (users[userID] && users[userID]["privileges"].indexOf("admin") < 0) users[userID]["privileges"].push("admin");
    fs.writeFileSync(__dirname + '/../data/users.json', JSON.stringify(allUsers));
}

exports.isAdmin = function (userID) {
    let users = getUsers();
    if (users[userID] && users[userID]["privileges"].indexOf("admin") >= 0) return true;
    else return false;
}

exports.getUser = function (userID) {
    let users = getUsers();
    let prints = users[userID]["prints"];
    let printHours = 0;
    for (let i = 0; i, users[userID]["prints"].length; i++) {
        printHours += prints.printTime(users[userID]["prints"][i]);
    }
    users[userID]["printTime"] = printHours;
    return users[userID];
}

exports.createUser = function (userID, playerDisplayName) {
    let allUsers = getUsers();
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
        fs.writeFileSync(__dirname + '/../data/players.json', JSON.stringify(allUsers));
    }
}

exports.updateUser = function (playerName, results) {
    let allUsers = getUsers();

    /*  if(outcome=="player") allUsers[playerName]["win"]++;
      else if(outcome=="player") allUsers[playerName]["lose"]++;
      else allUsers[playerName]["tie"]++;
    */

    fs.writeFileSync(__dirname + '/../data/players.json', JSON.stringify(allUsers));
}

exports.removeUser = function (userID) {
    let allUsers = getUsers();
    if (allUsers[userID]) delete allUsers[userID];
    fs.writeFileSync(__dirname + '/../data/players.json', JSON.stringify(allUsers));
}

exports.addPrint = function (userID, printID) {
    let allUsers = getUsers();
    if (allUsers[userID]) {
        let prints = allUsers[userID].prints;
        prints.push[printID];
    }
    fs.writeFileSync(__dirname + '/../data/players.json', JSON.stringify(allUsers));
}

exports.addSVG = function (userID, printID) {
    let allUsers = getUsers();
    if (allUsers[userID]) {
        let prints = allUsers[userID].prints;
        prints.push[printID];
    }
    fs.writeFileSync(__dirname + '/../data/players.json', JSON.stringify(allUsers));
}