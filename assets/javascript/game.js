

var computerWords  = ["tiger","elephant","rhinoceros","kangaroo","lion"];
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

//computer select Random word
 function computerChoice(){

    return computerWords[Math.floor(Math.random() * computerWords.length)];

 }

//when page load first time computer select word
    computerGuess = computerChoice();
    console.log("Computer Word  "+computerGuess);

    charactorFreq = getFrequency(computerGuess);

    wordConstruct = new Array(computerGuess.length);

    console.log( "Word Construct Length -->"+wordConstruct.length);
  
// When the user presses a key, it will run the following function...

document.onkeyup = function(event) {
    
    // Determine which key was pressed & change to lower case;
    userGuess = event.key.toLowerCase();


    console.log(userGuess);

    if( remainGuesses > 0){

        if(listofGuesses.indexOf(userGuess) < 0){

            //if the user guess letter exist
            if(charactorFreq[userGuess] > 0) {

                if(charactorFreq[userGuess]===1){

                    //insert user correct guess to a new array with same index order as computer guess word
                    //wordConstruct.splice(computerGuess.indexOf(userGuess),0,userGuess);
                    wordConstruct[computerGuess.indexOf(userGuess)] = userGuess;
                    //console.log("word construct -->"+wordConstruct);
                }else {
                    //if the letter repeating in the wordvar
                    var  noOfCharRepeat = charactorFreq[userGuess];
                    for(var i=0; computerGuess.length >i; i++ ) {

                        if(noOfCharRepeat > 0){
                                if(computerGuess[i] === userGuess){
                                    wordConstruct[i]= userGuess;
                                    console.log("Value of i -->"+i);
                                    noOfCharRepeat--;
                                    console.log(" %%%%%  word construct -->"+wordConstruct);
                                }
                                
                        }else{

                            break;
                        }
                    }
                }

                //add guess letter to the array
                listofGuesses.push(userGuess);
                remainGuesses--;
            }
            else {
                console.log("wrong letter");
                //add guess letter to the array
                listofGuesses.push(userGuess);
                remainGuesses--;

                }  

            } else{
                console.log("dup key");
            }

    }else{
        console.log("you loose");
    }
    console.log("word construct Final-->"+wordConstruct);
    console.log( "word construct Final length -->"+wordConstruct.length);
    //console.log(listofGuesses);
  

};






/*var arr = [];
arr[0] = "Jani";
arr[1] = "Hege";
arr[2] = "Stale";
arr[3] = "Kai Jim";
arr[4] = "Borge";

console.log(arr.join());
arr.splice(2, 0, "Lene");
console.log(arr.join());
The output of the code above will be:

Jani,Hege,Stale,Kai Jim,Borge
Jani,Hege,Lene,Stale,Kai Jim,Borge



 */