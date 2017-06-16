

var computerWords  = ["tiger","elephant","rhinoceros","kangaroo","lion","panda"];
var listofGuesses =[];
var remainGuesses = 12;
var wins = 0;
var wordConstruct;
var charactorFreq ={};
var userKeyPress = "";
var computerGuess ="";

//following function return an object with characters with no of repeates in the string
function getFrequency(string) {
    var freq = {};
    for (var i=0; i<string.length;i++) {
        var character = string.charAt(i);

        if (freq[character]) {
           freq[character]++;
        } else {
           freq[character] = 1;
        }
    }

    return freq;
}

function gameReset(){
    listofGuesses =[];
    remainGuesses = 12;
    computerGuess = computerChoice();
    wordConstruct = fillArray(new Array(computerGuess.length));
}

//computer select Random word
 function computerChoice(){

    return computerWords[Math.floor(Math.random() * computerWords.length)];

 }

//create an array same length as computer generated word and assign "_" to initialise

function fillArray(constructArry){

        for(var i=0; constructArry.length > i; i++) {

            constructArry[i] = "_";
        }
    return constructArry;
}

//when page load first time computer select word
    computerGuess = computerChoice();
    

    charactorFreq = getFrequency(computerGuess);

    wordConstruct = fillArray(new Array(computerGuess.length));


    
    //Update browser with results
    function updateScoreBoard(){
        var htmlString = "";
        var guessStr ="";
        var wordStr ="";

        //process Guessing Word for display
        for(var i=0; i< wordConstruct.length; i++ ) {
            wordStr = wordStr + wordConstruct[i].toUpperCase() +" ";
        }

        //process number of Guess so far
        for(var i=0; i< listofGuesses.length; i++ ) {
            guessStr = guessStr + listofGuesses[i].toUpperCase() +" ";
        }

        //crerate display html string
        htmlString = "<p> Wins :"+wins+"</p><p> Your Current Word :"+wordStr+"</p>"+
                
                        "<p> Guesses Left :"+remainGuesses+"</p><p>Your Guesses So Far :"+guessStr+"</p>";

        document.getElementById("results").innerHTML = htmlString;      
    }

  

  

// When the user presses a key, it will run the following function...

document.onkeyup = function(event) {
    
    // Determine which key was pressed & change to lower case;
    userGuess = event.key.toLowerCase();
    console.log("Computer Word  "+computerGuess);

    if( remainGuesses > 0){

        if(listofGuesses.indexOf(userGuess) < 0){

            //if the user guess letter exist
            if(charactorFreq[userGuess] > 0) {

                if(charactorFreq[userGuess]===1){

                    //insert user correct guess to a new array with same index order as computer guess word
                    //wordConstruct.splice(computerGuess.indexOf(userGuess),0,userGuess);
                    wordConstruct[computerGuess.indexOf(userGuess)] = userGuess;
    

                    //if the there is no _ in the wordConstruct arry means User won.
                    if(wordConstruct.indexOf("_") < 0){
                        wins++;
                        alert("You are the winner.Wining word is "+computerGuess);
                        gameReset();
                        updateScoreBoard();
                        
                    }else {

                        updateScoreBoard();
                    }
                    
                    console.log("Check arry is empty ->"+wordConstruct.indexOf("_"));
                    
                }else {

                    //if the letter repeating in the wordvar
                    var  noOfCharRepeat = charactorFreq[userGuess];
                    for(var i=0; computerGuess.length >i; i++ ) {

                        if(noOfCharRepeat > 0){
                                if(computerGuess[i] === userGuess){
                                    wordConstruct[i]= userGuess;
                                    //console.log("Value of i -->"+i);
                                    noOfCharRepeat--;
                                    
                                }

                                if(wordConstruct.indexOf("_") < 0){ 
                                    wins++;
                                    alert("You are the winner.Wining word is "+computerGuess);
                                    gameReset();
                                    updateScoreBoard();
                                    
                                    break;
                                }
                        }else{

                            break;
                        }
                    }

                }

                //add guess letter to the array
                listofGuesses.push(userGuess);
                remainGuesses--;

                if(remainGuesses===0){
                    gameReset();
                }

                updateScoreBoard();
            }
            else {
                console.log("wrong letter");
                //add guess letter to the array
                listofGuesses.push(userGuess);
                remainGuesses--;

                if(remainGuesses===0){
                    gameReset();
                }

                    updateScoreBoard();

                }  

            } else{
                console.log("dup key");
            }

    }else{
        alert("Sorry!, you lose the game .Try agin!");
        gameReset();
        updateScoreBoard();
    }
     

};






/*var arr = [];
arr[0] = "Jani";
arr[1] = "Hege";
arr[2] = "Stale";
arr[3] = "Kai Jim";
arr[4] = "Borge";
rhinoceros
console.log(arr.join());
arr.splice(2, 0, "Lene");
console.log(arr.join());
The output of the code above will be:

Jani,Hege,Stale,Kai Jim,Borge
Jani,Hege,Lene,Stale,Kai Jim,Borge



 */