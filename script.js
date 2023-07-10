// 3 quiz questions and answers 
const quizQuestions = [
    {
      question: "Commonly used data types do NOT include",
      answers: ["strings", "booleans", "alerts", "numbers"],
      correctAnswer: "alerts"
    },
    {
      question: "Which programming language is used for web development?",
      answers: ["Java", "Python", "JavaScript"],
      correctAnswer: "JavaScript"
    },
    {
      question: "The condition in an if/else statement is enclosed with",
      answers: ["quotes", "curly brackets", "parenthesis", "square brackets"],
      correctAnswer: "parenthesis"
    }
    
  ];
  //scoreboard
  let currentQuestionIndex = 0;
  let score = 0;
  let timeLeft = 75; 
  
  const takeQuizBtn = document.getElementById('take-quiz-btn');
  const questionContainer = document.getElementById('question-container');
  const questionTitle = document.getElementById('question-title');
  const answersList = document.getElementById('answers-list');
  const submitBtn = document.getElementById('submit-btn');
  const timer = document.getElementById('timer');
  const scoreEntryContainer = document.getElementById('score-entry');
  const emailInput = document.getElementById('email-input');
  const saveScoreBtn = document.getElementById('save-score-btn');
  const highScoresContainer = document.getElementById('high-scores');
  const scoresList = document.getElementById('scores-list');
  
  function startQuiz() {
    takeQuizBtn.style.display = 'none';
    questionContainer.style.display = 'block';
    showQuestion();
    startTimer();
  }
  
  function showQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionTitle.textContent = currentQuestion.question;
    answersList.innerHTML = '';
  
    currentQuestion.answers.forEach(function(answer) {
      const li = document.createElement('li');
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'answer';
      input.value = answer;
  
      label.appendChild(input);
      label.appendChild(document.createTextNode(answer));
      li.appendChild(label);
      answersList.appendChild(li);
    });
  }
  //answer function 
  function submitAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  
    if (selectedAnswer) {
      const userAnswer = selectedAnswer.value;
      const currentQuestion = quizQuestions[currentQuestionIndex];
      if (userAnswer === currentQuestion.correctAnswer) {
        score++;
      } else {
        timeLeft -= 15; 
      }
  
      currentQuestionIndex++;
      if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
      } else {
        endQuiz();
      }
    }
  }
  //timer function
  function startTimer() {
    timeLeft = 75; 
    updateTimerDisplay();
    const timerInterval = setInterval(function() {
      timeLeft--;
      updateTimerDisplay();
  
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endQuiz();
      }
    }, 1000);
  }
  
  function updateTimerDisplay() {
    timer.textContent = timeLeft;
  }
  
  function endQuiz() {
    questionContainer.style.display = 'none';
    scoreEntryContainer.style.display = 'block';
  
    const resultsContainer = document.createElement('div');
    resultsContainer.classList.add('results-container');
  
    const percentageScore = (score / quizQuestions.length) * 100;
  
    const scoreText = document.createElement('p');
    scoreText.textContent = `Your Score: ${score}/${quizQuestions.length} (${percentageScore}%)`;
    resultsContainer.appendChild(scoreText);
  
    document.body.appendChild(resultsContainer);
  }
  
  function saveScore() {
    const initials = emailInput.value.trim();
  
    if (initials !== '') {
      const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
      const scoreData = {
        initials: initials,
        score: score
      };
      highScores.push(scoreData);
      localStorage.setItem('highScores', JSON.stringify(highScores));
  
      scoreEntryContainer.style.display = 'none';
      showHighScores();
    }
  }
  
  function showHighScores() {
    highScoresContainer.style.display = 'block';
    scoresList.innerHTML = '';
  
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  
    highScores.forEach(function(scoreData) {
      const li = document.createElement('li');
      li.textContent = `${scoreData.initials}: ${scoreData.score}`;
      scoresList.appendChild(li);
    });
  }
  
  takeQuizBtn.addEventListener('click', startQuiz);
  submitBtn.addEventListener('click', submitAnswer);
  saveScoreBtn.addEventListener('click', saveScore);