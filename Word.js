// Word.js: Contains a constructor, Word that depends on the Letter constructor. 
// This is used to create an object representing the current word the user is attempting to guess. 

var Letter = require("./letter");

var Word = function () {
    this.letters = [];
    this.wordAnswer = this.pickWord();
    this.wordDisplay = [];
    this.wordDisplay = this.updateWordDisplay();
}

// Return a random word
Word.prototype.pickWord = function () {

    //must check to see if question has already been asked and prevent that
    var wordsNotPlayed = wordsToGuess.filter(function (word) {
        return word.asked === false;
    })

    if (wordsNotPlayed.length > 0) {
        //console.log("QUESTIONS THAT HAVE NOT BEEN ASKED: " + wordsNotPlayed.length);
    } else {
        //no unasked questions left
        //flip all the flags back to false;
        wordsToGuess.forEach(function (word) {
            word.asked = false;
        })
        wordsNotPlayed = wordsToGuess.filter(function (word) {
            return word.asked === false;
        })
        //console.log(wordsToGuess);
    }
    //randomly select a word
    var wordToGuessObj = wordsNotPlayed[Math.floor((wordsNotPlayed.length) * Math.random())];
    wordToGuessObj.asked = true;

    //console.log("wordToGuessObj.answer", wordToGuessObj.answer);

    // An array of new Letter objects representing the letters of the underlying word
    var letters = wordToGuessObj.answer.split("");

    for (var i = 0; i < letters.length; i++) {
        this.letters.push(new Letter(letters[i]));
    }

    return wordToGuessObj.answer;
};


// Print word to console (using Letter methods some may be hidden if not guessed yet)
Word.prototype.updateWordDisplay = function () {
    this.wordDisplay = [];
    for (var i = 0; i < this.letters.length; i++) {
        //console.log(this.letters[i]);
        this.wordDisplay.push(this.letters[i].displayLetter());
    }
    //console.log(this.wordDisplay);
    return this.wordDisplay;
}

// A function that takes a character as an argument and 
// calls the guess function on each letter object (the second function defined in Letter.js)
Word.prototype.letterOrWord = function (aLetterObj) {
    aLetterObj.displayLetter();
}

Word.prototype.isGuessCorrect = function (aLetter) {
    var isInWord = false;
    for (var i = 0; i < this.letters.length; i++) {
        //console.log("isGuessCorrect", aLetter);
        //console.log("isGuessCorrect", this.letters[i]);
        if (this.letters[i].letter.toLowerCase() == aLetter.toLowerCase()
            && !this.letters[i].guessed) {
            this.letters[i].guessed = true;
            this.wordDisplay = this.updateWordDisplay();
            isInWord = true;
        }
    }
    return isInWord;
}

Word.prototype.hasGuessedLetter = function (aLetter) {
    for (var i = 0; i < this.letters.length; i++) {
        //console.log("hasGuessedLetter", aLetter);
        //console.log("hasGuessedLetter", this.letters[i]);
        if (this.letters[i].letter.toLowerCase() == aLetter.toLowerCase()
            && this.letters[i].guessed) {
            return true;
        }
    }
    return false;
}

Word.prototype.isComplete = function () {

    var letterCount = 0;
    for (var i = 0; i < this.letters.length; i++) {
        if (this.letters[i].guessed) {
            letterCount++;
        }
    }
    //console.log("this.letters.length", this.letters.length);
    //console.log("letterCount", letterCount);
    if (this.letters.length === letterCount) return true;
    else return false;
}


var wordsToGuess = [
    { "answer": "reindeer", "asked": false },
    { "answer": "santa", "asked": false },
    { "answer": "presents", "asked": false },
    { "answer": "winter", "asked": false },
    { "answer": "tree", "asked": false },
];


module.exports = Word;

// "algorithm", "bandwidth", "bit", "byte", "bug", "cloud",
// "computer", "code", "cpu", "debug", "digital", "ethernet", "hacker", "hardware", "html", "index", "lan",
// "processor", "ram", "recursion", "software"