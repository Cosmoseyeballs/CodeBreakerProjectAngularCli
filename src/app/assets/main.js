let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
let message = document.getElementById('message');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if (answer.value.length == 0 && attempt.value.length == 0) {
        setHiddenFields();
    }
    if (!validateInput(input.value.length)) {
        return false;
    }
    // we should increment the attempt hidden input by 1.
    // hvorfor arbejde med et hidden input??
    attempt.value = Number(attempt.value) + 1;

    let getResultsLet = getResults();
    if(getResultsLet){
        message.innerHTML = "You Win! :)";
        showAnswer(true);
        showReplay();
    }else if(!getResultsLet && Number(attempt.value)==10){
        setMessage("You Lose! :(");
        showAnswer(false);
        showReplay();
    }else{
        setMessage("Incorrect, try again.");
    }
}

showRes

function showAnswer(a){
    let code = document.getElementById('code');
    code.innerHTML = answer.value;
    code.className = (a)?"code success":"code failure";
} 

function showReplay(){
   let  guessingDiv =  document.getElementById('guessing-div');
   let  replayDiv =  document.getElementById('replay-div');
   
   guessingDiv.style.display = "none";
   replayDiv.style.display = "block";
}

//implement new functions here
function setHiddenFields() {
    let random = Math.floor((Math.random() * 1000));
    while (random.toString().length < 4) {
        random = 0 + random.toString();
    }
    answer.value = random;
    attempt.value = 0;
}

function setMessage(msg) {
    message.innerHTML = msg;
}

function validateInput(input) {

    if (input != 4) {
        setMessage("Guesses must be exactly 4 characters long.");
        return false;
    }
    return true;
}

function getResults() {
    let result = document.getElementById('results');
    let userGuess = document.getElementById('user-guess');
    let position = "";

    for (var i = 0, len = userGuess.value.length; i < len; i++) {
        // character is in the correct position in the answer
        if (userGuess.value[i] == answer.value[i]) {
            console.log("correct position in the answer");
            position += '<span class="glyphicon glyphicon-ok"></span>';
        } else if (answer.value.includes(userGuess.value[i])) {
            console.log("character is in the answer but isn't in the right position");
            position += '<span class="glyphicon glyphicon-transfer"></span>';
        } else{
            console.log("if the number isn't in the answer at all");
            position += '<span class="glyphicon glyphicon-remove"></span>';
        }


    }


    let value = `
        <div class="row">
        <span class="col-md-6">${userGuess.value}</span>
        <div class="col-md-6">
            ${position}
        </div>
    `


    result.innerHTML = result.innerHTML + value;
    return userGuess.value == answer.value;
}