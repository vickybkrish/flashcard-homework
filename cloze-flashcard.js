var fs = require('fs');

function ClozeFlashcard (fact, answer){

  this.fact = fact;
  this.answer = answer;
  this.displayQuestion = function(){
    console.log("Front: " + this.clozeQuestion);
  }

  this.displayFact = function(){
    console.log("Back: " + this.fact);
  }

  this.hideAnswer = function(text){
    this.clozeQuestion = fact.replace(text, "--------");
  }

  this.saveContent = function(){

    var content = "Front: " + this.clozeQuestion + "\n" +
    "Back: " + this.fact + "\n\n";

    fs.appendFile("./saved-cards.txt", content, (err) => {
      if (err) throw err;
      console.log("Card saved!");
    })
  }

}


module.exports = ClozeFlashcard;
