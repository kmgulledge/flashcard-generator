// Begin White Belt Coding For Node.js

// NPM PACKAGES
var fs = require('fs'); // File system 
var inquirer = require('inquirer'); // A collection of common interactive command line user interfaces.
var jsonfile = require('jsonfile'); // Easily read/write JSON files.
var Basic = require("./BasicCard"); // Basic Card file
var Cloze = require('./ClozeCard') // Cloze Card File

// App Variables in use
var app = process.argv[2];
var questions = []; // Basic Questions Array
var clozeQuestions = []; // Close Questions Array

// Begin App
if (app === undefined) {

    console.log('Enter either "Basic" or "Cloze" to select which flash card you would like to save.');
} else if (app.toLowerCase() === "basic") {

    // Basic chooses to save basic Flash Cards
    console.log('Congrats, You chose to make a Basic flashcard.');

    // Questions for front and rear of card 
    var questionPrompts = [{
        type: "input",
        name: "question",
        message: "What's on the front of the card?"
    }, {
        type: "input",
        name: "answer",
        message: "What's on the back of the card?"
    }];

    // This handles the first repsonse input from the user
    var handleQuestionResponse = function(answers) {
        var newQuestion = new Basic(answers.question, answers.answer);
        newQuestion.printInfo();
        var newQuestionJSON = JSON.stringify(newQuestion);
        questions.push(newQuestionJSON);

        // creates and pushes to the txt file
        fs.appendFileSync('basicflashcard.txt', newQuestionJSON + "\n");

        // Checks to see if user wanted to input more than one flash card at a time
        return inquirer.prompt([{
            name: "another",
            message: "add another?",
            type: "confirm",
            default: true
        }]);
    };

    // Handler for multiple repsonses from user
    var handleAnotherResponse = function(one) {
        if (one.another) {
            promptForQuestion();
        } else {
            console.log("Number of Flashcards added to database: " + questions.length + ".");
        }
    };

    // Check errors and responsis given
    var handleError = function(err) {
        console.log("ERROR ERROR!!!");
    };

    // compiles all user input
    var promptForQuestion = function() {
        inquirer.prompt(questionPrompts)
            .then(handleQuestionResponse, handleError)
            .then(handleAnotherResponse, handleError);
    };

    promptForQuestion();

}
// When selected, moves user into Cloze Flash Cards
else if (app.toLowerCase() === "cloze") {

    // Tests the cloze statement
    console.log('Congrats, You chose to make a Cloze flashcard!');

    // Creating user prompts to create front and rear of cloze flash cards
    var clozeQuestionPrompts = [{
        type: "input",
        name: "cloze",
        message: "What would you like hidden (Cloze)?"
    }, {
        type: "input",
        name: "phrase",
        message: "What is the text of the card to finish the question?"
    }];

    // handle the first repsonse input from the user
    var handleClozeResponse = function(clozeAnswers) {
        var newClozeQuestion = new Cloze(clozeAnswers.cloze, clozeAnswers.phrase);
        newClozeQuestion.printClozeInfo();
        var newClozeQuestionJSON = JSON.stringify(newClozeQuestion);
        clozeQuestions.push(newClozeQuestionJSON);

        // creates and pushes to the txt file
        fs.appendFileSync('clozeflashcard.txt', newClozeQuestionJSON + "\n");

        // Checks to see if user wanted to input more than one flash card at a time
        return inquirer.prompt([{
            name: "anotherCloze",
            message: "Add another Cloze Card?",
            type: "confirm",
            default: true
        }]);
    };

    // handler for multiple repsonses from user
    var handleAnotherClozeResponse = function(two) {
        if (two.anotherCloze) {
            promptForClozeQuestion();
        } else {
            console.log("Number of Flashcards added to database: " + questions.length + ".");
        }
    };

    // Checks for errors and responsis given
    var handleClozeError = function() {
        console.log("ERROR ERROR!");
    };

    // compiles all of the users input
    var promptForClozeQuestion = function() {
        inquirer.prompt(clozeQuestionPrompts)
            .then(handleClozeResponse, handleClozeError)
            .then(handleAnotherClozeResponse, handleClozeError);
    };

    promptForClozeQuestion();

} else {
    console.log('Please choose either "Basic" or "Cloze" to select the type of flash card you would like to save.');
}