// Begin White Belt Coding For Node.js
// Constructor used to create Cloze Flashcard
var fs = require('fs');

function Cloze(cloze, phrase) {
    this.cloze = cloze;
    this.phrase = phrase;
}

Cloze.prototype.printClozeInfo = function() {
    console.log("Cloze: " + this.cloze + "\nPhrase: " + this.phrase + "\nThis card has been added to the database!");
};

module.exports = Cloze;