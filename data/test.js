const fs = require('fs');

let tempTower_mini_IK = {
    "name":"tempTower_mini-IK",
    "description":"An automated temp tower from Prusa itself to test the new filament on the minis",
    "link":"https://www.printables.com/model/20652-temp-tower-pla-petg-absasa-for-prusa-mini-mk3s-and",
    "time":"229",
    "infil":"20",
    "width":"0.3",
    "studentName":"Ian_Kopke"  
}

fs.writeFileSync('prints.json', JSON.stringify(tempTower_mini_IK), 'utf8')

console.log("with fs \n" +JSON.parse(fs.readFileSync("prints.json")))