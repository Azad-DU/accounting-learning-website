// js/api-quiz.js

document.addEventListener('DOMContentLoaded', () => {
  const quizContainer = document.getElementById('quiz-container');
  const topicId = quizContainer.getAttribute('data-topic-id');

  if (!topicId) {
    console.error('No topic ID found for the quiz.');
    return;
  }

  // This is the URL of our Python API endpoint
  const apiUrl = `https://accounting-api-akazad.onrender.com/api/quiz/${topicId}`;

  // Use the modern fetch() function to get data from the API
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Convert the response to JSON
    })
    .then(data => {
      // Now that we have the data, build the quiz
      buildQuiz(data.questions);
    })
    .catch(error => {
      console.error('There was a problem fetching the quiz data:', error);
      quizContainer.innerHTML = '<p>Sorry, the quiz could not be loaded at this time.</p>';
    });

  function buildQuiz(questions) {
    // This is the same logic from our old quiz files
    const output = [];
    questions.forEach((currentQuestion, questionNumber) => {
        const options = [];
        for (const letter in currentQuestion.options) {
            options.push(
                `<label class="quiz-option">
                    <input type="radio" name="question${questionNumber}" value="${currentQuestion.options[letter]}">
                    ${currentQuestion.options[letter]}
                </label>`
            );
        }
        output.push(
            `<div class="quiz-question">
                <p>${currentQuestion.question}</p>
                <div class="quiz-options">${options.join('')}</div>
            </div>`
        );
    });
    quizContainer.innerHTML = output.join('');
    // We can add back the submit button logic later if needed
  }
});