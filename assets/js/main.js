question_1 = {
  text: "Commonly used data types DO NOT include:",
  choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
  answer: "3. alerts",
  answered: false,
};

question_2 = {
  text: "The condition in an if/else statement is enclosed within _____.",
  choices: [
    "1. quotes",
    "2. curly braces",
    "3. parenthesis",
    "4. square brackets",
  ],
  answer: "3. parenthesis",
  answered: false,
};

question_3 = {
  text: "Array in Javascript can be used to store _____. ",
  choices: [
    "1. numbers and strings",
    "2. other arrays",
    "3. booleans",
    "4. all of the above",
  ],
  answer: "4. all of the above",
  answered: false,
};

question_4 = {
  text: "String values must be enclosed within _____ when being assigned to variables.",
  choices: ["1. commas", "2. curly braces", "3. quotes", "4. parenthesis"],
  answer: "3. quotes",
  answered: false,
};

question_5 = {
  text: "A very useful tool used during development and debugging for printing content to the debugger is:",
  choices: [
    "1. Javascript",
    "2. terminal / bash",
    "3. for loops",
    "4. console.log",
  ],
  answer: "4. console.log",
  answered: false,
};

var questions = [question_1, question_2, question_3, question_4, question_5];
var currentQuestion;
var gameFinished = false;
var secondsLeft = 75;

var startButtonEl = document.querySelector("#start-btn");
var containerEl = document.querySelector("#main-container");
var timeEl = document.querySelector("#time-left");

function chooseRandomQuestion() {
  var questionIndex = Math.floor(Math.random() * questions.length);
  var question = questions[questionIndex];
  questions.splice(questionIndex, 1);
  return question;
}

function buildQuizContainer() {
  // h1 ul
  var questionEl = document.createElement("h1");
  questionEl.setAttribute("id", "question-text");
  var choicesEl = document.createElement("ul");
  choicesEl.setAttribute("id", "choices-container");

  resultEl = document.createElement("div");
  resultEl.setAttribute("id", "result-container");
  containerEl.appendChild(questionEl);
  containerEl.appendChild(choicesEl);
  containerEl.appendChild(resultEl);
  timeEl.textContent = secondsLeft;
}

function buildHighScoresContainer() {
  var completeEl = document.createElement("h2");
  completeEl.setAttribute("id", "complete");
  completeEl.textContent = "All done!";
  var finalScoreEl = document.createElement("p");
  var finalScore = Math.max(0, secondsLeft);
  finalScoreEl.setAttribute("id", "final-score");
  finalScoreEl.textContent = "Your final score is: " + finalScore;
  containerEl.appendChild(completeEl);
  containerEl.appendChild(finalScoreEl);

  var formEl = document.createElement("form");
  var initialEl = document.createElement("p");
  initialEl.textContent = "Enter initials: ";
  var inputEl = document.createElement("input");
  var buttonEl = document.createElement("button");
  buttonEl.textContent = "Submit";
  buttonEl.setAttribute("type", "submit");

  buttonEl.addEventListener("click", function (event) {
    event.preventDefault();
    var initials = inputEl.value;
    console.log(initials);
    if (initials != "") {
      localStorage.setItem(initials, finalScore);
    }
    window.location.href = "/high_scores.html";
  });

  initialEl.appendChild(inputEl);
  initialEl.appendChild(buttonEl);
  formEl.appendChild(initialEl);
  containerEl.appendChild(formEl);
}

function addChoicesListener() {
  var choicesEl = document.getElementById("choices-container");
  var resultEl = document.getElementById("result-container");
  choicesEl.addEventListener("click", function (event) {
    var element = event.target;

    if (element.matches("button")) {
      if (currentQuestion.answered) {
        return;
      }
      resultEl.innerHTML = "";
      var choiceText = element.textContent;
      var line = document.createElement("hr");
      var result = document.createElement("p");
      result.setAttribute("style", "font-style: italic; font-size: 20px;");
      resultEl.appendChild(line);
      resultEl.appendChild(result);

      if (choiceText === currentQuestion.answer) {
        result.textContent = "Correct!";
      } else {
        result.textContent = "Wrong!";
        var updatedSeconds = secondsLeft - 25;
        if (updatedSeconds <= 0) {
          gameFinished = true;
        }
        secondsLeft = Math.max(0, updatedSeconds);
      }
      setTimeout(function () {
        resultEl.innerHTML = "";
      }, 1500);

      if (questions.length == 0) {
        gameFinished = true;
      }

      currentQuestion.answered = true;
      askNextQuestion();
    }
  });
}

function startTimer() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = Math.max(0, secondsLeft);

    if (secondsLeft <= 0 || gameFinished) {
      clearInterval(timerInterval);
      containerEl.innerHTML = "";
      buildHighScoresContainer();
    }
  }, 1000);
}

function askNextQuestion() {
  if (gameFinished) {
    return;
  }
  var questionEl = document.getElementById("question-text");
  var choicesEl = document.getElementById("choices-container");
  choicesEl.innerHTML = "";

  currentQuestion = chooseRandomQuestion();
  questionEl.textContent = currentQuestion.text;

  for (i = 0; i < currentQuestion.choices.length; i++) {
    var liEl = document.createElement("li");
    var button = document.createElement("button");
    button.setAttribute("id", "choices");
    button.textContent = currentQuestion.choices[i];
    liEl.appendChild(button);
    choicesEl.appendChild(liEl);
  }
}

startButtonEl.addEventListener("click", function () {
  containerEl.innerHTML = "";
  buildQuizContainer();
  addChoicesListener();
  startTimer();
  askNextQuestion();
});
