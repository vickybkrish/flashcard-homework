var BasicFlashcard = require("./basic-flashcard");
var ClozeFlashcard = require("./cloze-flashcard");
var inquirer = require("./node_modules/inquirer");
var fs = require("fs");

selectOption();

function selectOption(){

  inquirer.prompt([{

    type:"list",
    message:"What action would you like to take?",
    choices:["Create a new basic flashcard","Create a new cloze flashcard",
    "Retrieve flashcards", "Do nothing"],
    name:"option"

  }]).then(function(answer){

    switch(answer.option){
      case "Create a new basic flashcard":
        createFlashcard("basic");
        break;
      case "Create a new cloze flashcard":
        createFlashcard("cloze");
        break;
      case "Retrieve flashcards":
        retrieveFlashcards();
        break;
      case "Do nothing":
        console.log("Enjoy your day.");
        return;
        break;
    }
  })
}

function createFlashcard(type){

  //User is entering information for a basic flashcard
  if(type === "basic"){
    console.log("This is loaded.");
      inquirer.prompt([{

        message:"Please enter a question for the front side of this flashcard.",
        name:"front"
      },
      {
        message:"Please enter the answer to your question for the back side of this flashcard.",
        name:"back"
      }
    ]).then(function(answers){

      var newBasicCard = new BasicFlashcard(answers.front, answers.back);
      newBasicCard.display();

      saveCard(newBasicCard);
    })
  }

  //User is entering information for a cloze flashcard
  else{

    inquirer.prompt([{

      message:"Please enter a fact for this flashcard.",
      name:"question"
    },
    {
      message:"Please enter the part of the fact you want to hide as the answer.\n"
      + " [Be careful to type the part exactly as above.]",
      name:"answer"
    }
  ]).then(function(responses){

      var newClozeCard = new ClozeFlashcard(responses.question, responses.answer);

      newClozeCard.hideAnswer(responses.answer);
      newClozeCard.displayQuestion();
      newClozeCard.displayFact();

      saveCard(newClozeCard);
    })
  }
}

function retrieveFlashcards(){
  fs.readFile('./saved-cards.txt', "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
  })
}

function saveCard(cardOBJ){

  inquirer.prompt([{

    type:"confirm",
    message:"Do you want to save this card?",
    name:"save"

  }]).then(function(answer){

      if (answer.save){

      cardOBJ.saveContent();

      }

      else{

        console.log("The card wasn't saved.")
        selectOption();
      }
    })
}
