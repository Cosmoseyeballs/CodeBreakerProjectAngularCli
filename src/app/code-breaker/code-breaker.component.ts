import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'code-breaker',
  templateUrl: './code-breaker.component.html',
  styleUrls: ['./code-breaker.component.css']
})
export class CodeBreakerComponent implements OnInit {
  attempt: number;
  answer: string;
  userGuess: string;
  results: Array<{ guess: string, position: string }>;
  message: string;

  answerClass: string;

  showAnswer: boolean;
  code: string;
  constructor() { }

  ngOnInit() {
    this.attempt = 0;
    this.answer = this.getRandom();
    this.results = [];
    //this.answerClass = "success";

    this.code = "????";

    // this.results = [
    //   { guess: "3455", position: '<span class="glyphicon glyphicon-ok"></span><span class="glyphicon glyphicon-ok"></span><span class="glyphicon glyphicon-ok"></span><span class="glyphicon glyphicon-ok"></span>' },
    //   { guess: "2234", position: '<span class="glyphicon glyphicon-transfer"></span><span class="glyphicon glyphicon-transfer"></span><span class="glyphicon glyphicon-transfer"></span><span class="glyphicon glyphicon-transfer"></span>' }
    // ]
  }

  guess(userGuess: string) {

    if (!this.validateInput(userGuess)) {
      return false;
    }

    this.userGuess = userGuess;
    this.attempt++;

    let getResult = this.getResults();
    if (getResult) {
      this.showResults(false);
    } else if (!getResult && this.attempt >= 10) {
      this.showResults(false);
    } else {
      this.message = "Incorrect, try again.";
    }
  }

  validateInput(input) {
    if (input != 4 && !Number.isInteger(Number.parseInt(input))) {
      this.message = "Guesses must be exactly 4 characters long.";
      return false;
    }
    return true;
  }

  showResults(a: boolean) {
    if (a) {
      this.message = "You Win! :)";
      this.answerClass = "success";
    }
    else {
      this.message = "You Lose! :(";
      this.answerClass = "failure";
    }
    this.showAnswer = true;
    this.code = this.answer;
  }



  getRandom(): string {
    let random: string = (Math.floor((Math.random() * 1000))).toString();
    console.log(random)
    while (random.toString().length < 4) {
      random = (Math.floor((Math.random() * 10))) + random.toString();
    }
    return random;
  }

  getResults(): boolean {
    let position = "";

    for (var i = 0, len = this.userGuess.length; i < len; i++) {
      // character is in the correct position in the answer
      if (this.userGuess[i] == this.answer[i]) {
        position += '<span class="glyphicon glyphicon-ok"></span>';
      } else if (this.answer.includes(this.userGuess[i])) {
        position += '<span class="glyphicon glyphicon-transfer"></span>';
      } else {
        position += '<span class="glyphicon glyphicon-remove"></span>';
      }
    }

    this.results.push({ guess: this.userGuess, position })

    return this.userGuess == this.answer;
  }

  replay() {
    this.attempt = 0;
    this.answer = this.getRandom();
    this.userGuess = "";
    this.results = [];
    this.showAnswer = false;
    this.message = "";
  }

}


