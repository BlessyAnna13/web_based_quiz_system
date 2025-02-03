

  // Fetch quiz data from server
  let quizData;
  $.ajax({
      type: "POST",
      url: 'quiz.php',
      data: '',
      success: function(response) {
          quizData = JSON.parse(response);
          console.log('quizData', quizData);
          displayQuestion(); // Display the first question
      }
  });

  var noticeIsOn = false;

  // Show alert if the user leaves the window
  document.addEventListener('mouseleave', function() {
      if (!noticeIsOn) {
          noticeIsOn = true;
          alert('Please do not switch the test window. You may be disqualified from the test');
          history.back();

          setTimeout(function() {
              noticeIsOn = false;
          }, 100);
      }
  });

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const prevButton = document.getElementById('prev');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];


  // Shuffle array function
  function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
  }

  // Display the current question
  function displayQuestion() {
      const questionData = quizData[currentQuestion];

      const questionElement = document.createElement('div');
      questionElement.className = 'question';
      questionElement.innerHTML = (currentQuestion + 1) + '. ' + questionData.question;

      const optionsElement = document.createElement('div');
      optionsElement.className = 'options';

      const shuffledOptions = [...questionData.options];
      shuffleArray(shuffledOptions);

      for (let i = 0; i < shuffledOptions.length; i++) {
          const option = document.createElement('label');
          option.className = 'option';

          const radio = document.createElement('input');
          radio.type = 'radio';
          radio.name = 'quiz';
          radio.value = shuffledOptions[i];

          const optionText = document.createTextNode(shuffledOptions[i]);

          option.appendChild(radio);
          option.appendChild(optionText);
          optionsElement.appendChild(option);
      }

      quizContainer.innerHTML = '';
      quizContainer.appendChild(questionElement);
      quizContainer.appendChild(optionsElement);
  }

  // Go to the previous question
  function previous() {
      if (currentQuestion > 0) {
          currentQuestion--;
          displayQuestion();
      }
  }

  // Check the selected answer
  function checkAnswer() {
      const selectedOption = document.querySelector('input[name="quiz"]:checked');
      if (selectedOption) {
          const answer = selectedOption.value;
          if (answer === quizData[currentQuestion].answer) {
              score++;
          } else {
              incorrectAnswers.push({
                  question: quizData[currentQuestion].question,
                  incorrectAnswer: answer,
                  correctAnswer: quizData[currentQuestion].answer,
              });
          }
          currentQuestion++;
          selectedOption.checked = false;
          if (currentQuestion < quizData.length) {
              displayQuestion();
          } else {
              displayResult();
          }
      }
  }

  // Display the result
  function displayResult() {
      quizContainer.style.display = 'none';
      submitButton.style.display = 'none';
      retryButton.style.display = 'inline-block';
      showAnswerButton.style.display = 'inline-block';
      resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }

  // Retry the quiz
  function retryQuiz() {
      currentQuestion = 0;
      score = 0;
      incorrectAnswers = [];
      quizContainer.style.display = 'block';
      submitButton.style.display = 'inline-block';
      retryButton.style.display = 'none';
      showAnswerButton.style.display = 'none';
      resultContainer.innerHTML = '';
      displayQuestion();
      resetTimer(); // Reset the timer on retry
  }

  // Show incorrect answers
  function showAnswer() {
      quizContainer.style.display = 'none';
      submitButton.style.display = 'none';
      retryButton.style.display = 'inline-block';
      showAnswerButton.style.display = 'none';

      let incorrectAnswersHtml = '';
      for (let i = 0; i < incorrectAnswers.length; i++) {
          incorrectAnswersHtml += `
              <p>
                <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
                <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
                <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
              </p>
          `;
      }

      resultContainer.innerHTML = `
          <p>You scored ${score} out of ${quizData.length}!</p>
          <p>Incorrect Answers:</p>
          ${incorrectAnswersHtml}
      `;
  }

  // Event listeners for buttons
  prevButton.addEventListener('click', previous);
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
 
  



          