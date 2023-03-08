const fs = require('fs');

exports.getUsers = function(){
  let users = getUsers();
  return users;
}

exports.isUser = function(userID){
  let users = getUsers();
  if(users[userID] && users[userID]["privileges"].indexOf("player")>=0) return true;
  else return false;
}

exports.makeAdmin = function(userID){
  let allUsers = getUsers();
  if(users[userID] && users[userID]["privileges"].indexOf("admin")<0) users[userID]["privileges"].push("admin");
  fs.writeFileSync(__dirname+'/../data/users.json', JSON.stringify(allUsers));
}

exports.isAdmin = function(userID){
  let users = getUsers();
  if(users[userID] && users[userID]["privileges"].indexOf("admin")>=0) return true;
  else return false;
}

exports.getUser = function(userID){
  let users = getUsers();

  users[userID].win_percent = (users[userID].win/parseFloat(users[userID].win+users[userID].lose+users[userID].tie) * 100).toFixed(2);
  if(users[userID].win_percent=="NaN") users[userID].win_percent=0;

  return users[userID];
}

exports.createUser =  function (userID, playerDisplayName){
  let allUsers = getUsers();
  if(!allUsers[userID]){
    let newPlayer={
      "displayName": playerDisplayName,
      "privileges": ["player"],
      "games": [],
      "dateJoined": new Date()
    }
    allUsers[userID] = newPlayer;
    fs.writeFileSync(__dirname+'/../data/players.json', JSON.stringify(allUsers));
  }
}

exports.updateUser =  function (playerName, results){
  let allUsers = getUsers();

/*  if(outcome=="player") allUsers[playerName]["win"]++;
  else if(outcome=="player") allUsers[playerName]["lose"]++;
  else allUsers[playerName]["tie"]++;
*/

  fs.writeFileSync(__dirname+'/../data/players.json', JSON.stringify(allUsers));
}

exports.removeUser = function(userID){
  let allUsers = getUsers();
  if(allUsers[userID]) delete allUsers[userID];
  fs.writeFileSync(__dirname+'/../data/players.json', JSON.stringify(allUsers));
}

exports.addPrint = function(userID, printID){
  let allUsers = getUsers();
  if(allUsers[userID]){
    let prints = allUsers[userID].prints;
    prints.push[printID];
    
  }
  fs.writeFileSync(__dirname+'/../data/players.json', JSON.stringify(allUsers));
}