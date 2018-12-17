//index.js: The file containing the logic for the course of the game, which depends on Word.js and:

// Randomly selects a word and uses the Word constructor to store it


// Prompts the user for each guess and keeps track of the user's remaining guesses




// Letter.js should not require any other files.
// Word.js should only require Letter.js
// HINT: Write Letter.js first and test it on its own before moving on, then do the same thing with Word.js
// HINT: If you name your letter's display function toString, JavaScript will call that function automatically whenever casting that object to a string (check out this example: https://jsbin.com/facawetume/edit?js,console)




var Word = require("./word.js");
var inquirer = require("inquirer");

var wordObj;               // Word Object contains the word to guess
var wrongLetters = [];     // guessed letters that are not in the answer
var guessesLeft = 10;      // start with 10 guesses

startGame();

function startGame() {
    console.log("GUESS A WORD!")
    wordObj = new Word();
    guessesLeft = 10;
    wrongLetters = [];
    //console.log(wordObj);
    console.log(wordObj.wordDisplay.join(" "));
    guessALetter();
}

function guessALetter() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Guess a Letter",
                name: "letter",
                validate: validateGuessedLetter
            }
        ])
        .then(function (player) {
            var continueGuessing = false;
            var letter = player.letter;

            if (player.letter) { letter = player.letter.trim(); }

            if (wordObj.isGuessCorrect(letter)) {
                console.log("YAY! CORRECT!!! You Guessed a letter!");
                if (wordObj.isComplete()) {
                    console.log("Word is complete");
                    console.log("WINNER! YOU WIN!!!");
                    return restartGame();
                } else {
                    continueGuessing = true;
                }
            } else {
                console.log("INCORRECT. " + letter + " IS NOT IN THE WORD.");
                wrongLetters.push(letter.toLowerCase());
                guessesLeft--;
                if (guessesLeft === 0) {
                    console.log("You're out of guesses :(");
                    console.log(wordObj.wordAnswer.split("").join(" "));
                    return restartGame();
                } else {
                    continueGuessing = true;
                } 
            }
            if (continueGuessing === true) {
                console.log("You have " + guessesLeft + " guesses left [out of 10 guesses].");
                console.log(wordObj.wordDisplay.join(" "));
                guessALetter();
            } 
        })
}

function restartGame() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Would you like to:",
                choices: ["Play Again", "Exit"],
                name: "restart"
            }
        ])
        .then(function (input) {
            if (input.restart === "Play Again") {
                startGame();
            } else {
                return;
            }
        })
}


/*===========================================================*/
// check letter against the previous 
// correct AND incorrect guesses
// if already guessed send user a message
function validateGuessedLetter(userInput) {
    var guess = userInput;
    if (userInput) { guess = userInput.trim(); }
    if (isLetter(guess)) {
        //.log(wordObj);
        if (wordObj.hasGuessedLetter(guess.toLowerCase()) ||
            wrongLetters.indexOf(guess.toLowerCase()) > -1) {
            console.log("\tYou've already guessed the letter " + guess + ".  INCORRECT GUESSES: " + wrongLetters);
            console.log(wordObj.wordDisplay.join(" "));
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

//check to see if the user input is a single letter
function isLetter(letter) {
    if (/^[A-Za-z]{1}$/.test(letter)) {
        //.log("test passed");
        return true;
    } else {
        console.log("\tPlease enter 1 letter.");
        return false;
    }
}


