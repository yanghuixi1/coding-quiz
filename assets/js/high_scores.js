var returnButton = document.querySelector("#return-btn");
var clearScoreButton = document.querySelector("#clear-score-btn");
var scoreContainer = document.querySelector("#score-container");

function getSortedScores() {
  var initialScorePairs = [];
  for (var i = 0; i < localStorage.length; i++) {
    var initial = localStorage.key(i);
    var score = Number(localStorage.getItem(initial));
    var initialScorePair = {
      initial: initial,
      score: score,
    };
    initialScorePairs.push(initialScorePair);
  }
  initialScorePairs.sort(function (a, b) {
    if (a.score < b.score) {
      return 1;
    }
    return -1;
  });
  return initialScorePairs;
}

function buildScoreContainer(scorePairs) {
  for (var i = 0; i < scorePairs.length; i++) {
    var currPair = scorePairs[i];
    var currPairEl = document.createElement("li");
    currPairEl.textContent = `${currPair.initial} - ${currPair.score}`;
    scoreContainer.appendChild(currPairEl);
  }
}

var initialScorePairs = getSortedScores();
buildScoreContainer(initialScorePairs);

returnButton.addEventListener("click", function () {
  window.location.href = "/coding-quiz/index.html";
});

clearScoreButton.addEventListener("click", function () {
  var allInitials = [];
  for (var i = 0; i < localStorage.length; i++) {
    var initial = localStorage.key(i);
    allInitials.push(initial);
  }
  for (var i = 0; i < allInitials.length; i++) {
    localStorage.removeItem(allInitials[i]);
  }
  scoreContainer.innerHTML = "";
});
