var fs = require('fs');

function BasicFlashcard (front, back){

  this.type = 'basic';
  this.front = front;
  this.back = back;
  this.display = function(){

    console.log("--------------------");
    console.log("Front side: " + front);
    console.log("Back side: " + back);
    console.log("--------------------");
  }
  this.saveContent = function(){

    var content = "Front side: " + front + "\n" +
    "Back side: " + back + "\n\n";

    fs.appendFile("./saved-cards.txt", content, (err) => {
      if (err) throw err;
      console.log("Card saved!");

    })

  }
}
module.exports = BasicFlashcard;
