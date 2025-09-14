const quizzes = [
  {
    title: "Science Quiz",
    questions: [
      { q: "What planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter"], answer: "Mars" },
      { q: "What is the chemical symbol for water?", options: ["H2O", "O2", "CO2"], answer: "H2O" },
      { q: "What gas do plants absorb?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen"], answer: "Carbon Dioxide" }
    ]
  },
  {
    title: "Sports Quiz",
    questions: [
      { q: "How many players are on a football (soccer) team?", options: ["9", "11", "12"], answer: "11" },
      { q: "Which country hosted the 2016 Olympics?", options: ["China", "Brazil", "Japan"], answer: "Brazil" },
      { q: "In tennis, what is the term for zero score?", options: ["Love", "Nil", "Zero"], answer: "Love" }
    ]
  }
];

let currentQuizIndex = 0;
let currentQuestionIndex = 0;
let score = 0;
let history = JSON.parse(localStorage.getItem("quizHistory")) || [];

function loadQuestion() {
  const quiz = quizzes[currentQuizIndex];
  document.getElementById("quiz-title").textContent = quiz.title;

  const question = quiz.questions[currentQuestionIndex];
  document.getElementById("question-title").textContent = question.q;

  // progress bar
  const progressPercent = ((currentQuestionIndex) / quiz.questions.length) * 100;
  document.getElementById("progress-bar").style.width = progressPercent + "%";

  const optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";
  question.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(btn, option);
    optionsContainer.appendChild(btn);
  });

  document.getElementById("score-display").textContent = `Score: ${score}`;
}

function checkAnswer(button, selected) {
  const correct = quizzes[currentQuizIndex].questions[currentQuestionIndex].answer;
  const buttons = document.querySelectorAll("#options-container button");

  buttons.forEach(btn => btn.disabled = true);

  if (selected === correct) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
    buttons.forEach(btn => {
      if (btn.textContent === correct) btn.classList.add("correct");
    });
  }

  document.getElementById("next-btn").style.display = "inline-block";
}

function nextQuestion() {
  currentQuestionIndex++;
  document.getElementById("next-btn").style.display = "none";

  if (currentQuestionIndex < quizzes[currentQuizIndex].questions.length) {
    loadQuestion();
  } else {
    showFinalScore();
  }
}

function showFinalScore() {
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("end-screen").style.display = "block";
  const finalScore = `You scored ${score}/${quizzes[currentQuizIndex].questions.length}`;
  document.getElementById("final-score").textContent = finalScore;

  // update progress bar full
  document.getElementById("progress-bar").style.width = "100%";

  // Store in history
  history.push({
    quizTitle: quizzes[currentQuizIndex].title,
    score: finalScore,
    date: new Date().toLocaleString()
  });
  localStorage.setItem("quizHistory", JSON.stringify(history));
}

function startNewQuiz() {
  currentQuizIndex = (currentQuizIndex + 1) % quizzes.length;
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById("quiz-container").style.display = "block";
  document.getElementById("end-screen").style.display = "none";
  document.getElementById("history-section").style.display = "none";
  loadQuestion();
}

function viewHistory() {
  const historyList = document.getElementById("history-list");
  historyList.innerHTML = "";
  history.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${item.quizTitle} - ${item.score} (${item.date})`;
    historyList.appendChild(li);
  });

  document.getElementById("history-section").style.display = "block";
}

// Initial load
window.onload = loadQuestion;
