// js/api-quiz.js - The new and improved version!

document.addEventListener('DOMContentLoaded', () => {
  const quizContainer = document.getElementById('quiz-container');
  const submitButton = document.getElementById('submit-quiz');
  const resultsContainer = document.getElementById('quiz-results');
  const markCompleteBtn = document.getElementById('mark-topic-complete');
  const topicId = quizContainer.getAttribute('data-topic-id');

  if (!topicId) {
    console.error('No topic ID found for the quiz.');
    return;
  }

  const apiUrl= `https://accounting-api-akazad.onrender.com/api/quiz/${topicId}`;
  let quizQuestions = []; // Variable to store the questions with answers

  // 1. Fetch the quiz data from our Python API
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      quizQuestions = data.questions; // Store the questions
      buildQuiz(quizQuestions);      // Build the HTML for the quiz
    })
    .catch(error => {
      console.error('There was a problem fetching the quiz data:', error);
      quizContainer.innerHTML = '<p>Sorry, the quiz could not be loaded at this time.</p>';
    });

  // 2. Function to build the quiz HTML
  function buildQuiz(questions) {
    const output = [];
    questions.forEach((currentQuestion, questionNumber) => {
      const options = [];
      currentQuestion.options.forEach(option => {
        options.push(
          `<label class="quiz-option">
              <input type="radio" name="question${questionNumber}" value="${option}">
              ${option}
          </label>`
        );
      });
      output.push(
        `<div class="quiz-question" data-question-number="${questionNumber}">
            <p>${questionNumber + 1}. ${currentQuestion.question}</p>
            <div class="quiz-options">${options.join('')}</div>
        </div>`
      );
    });
    quizContainer.innerHTML = output.join('');
    submitButton.style.display = 'inline-block'; // Show the submit button
  }

  // 3. Add an event listener to the submit button
  submitButton.addEventListener('click', () => {
    let score = 0;
    const answerContainers = quizContainer.querySelectorAll('.quiz-question');

    // Loop over each question and check the answer
    quizQuestions.forEach((currentQuestion, questionNumber) => {
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      if (userAnswer === currentQuestion.answer) {
        score++;
      }
    });

    // Display the results
    const percentage = (score / quizQuestions.length) * 100;
    resultsContainer.innerHTML = `You scored ${score} out of ${quizQuestions.length} (${percentage.toFixed(0)}%)`;
    resultsContainer.className = 'quiz-results correct'; // Style the results box

    // If the score is high enough, show the "Mark Complete" button
    if (percentage >= 70) {
      markCompleteBtn.style.display = 'inline-block';
    }
    submitButton.style.display = 'none'; // Hide the submit button after submission
  });
});