document.addEventListener('DOMContentLoaded', () => {

    const quizContainer = document.getElementById('quiz-container');
    const submitButton = document.getElementById('submit-quiz');
    const resultsContainer = document.getElementById('quiz-results');
    const markCompleteBtn = document.getElementById('mark-topic-complete');

    // Define quiz data. In a real application, you might load this from a server.
    const quizData = [
        {
            question: "Which of the following is an example of an Asset?",
            options: ["Accounts Payable", "Owner's Investment", "Cash", "Service Revenue"],
            answer: "Cash"
        },
        {
            question: "Liabilities represent...",
            options: ["The owner's claim on assets", "What the company owes to others", "Resources owned by the company", "Profits earned by the company"],
            answer: "What the company owes to others"
        },
        {
            question: "The accounting equation must always...",
            options: ["Increase", "Decrease", "Balance", "Be zero"],
            answer: "Balance"
        }
    ];

    // Function to build and display the quiz
    function buildQuiz() {
        if (!quizContainer) return; // Exit if the quiz container doesn't exist on this page

        const output = [];

        quizData.forEach((currentQuestion, questionNumber) => {
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
        if(submitButton) submitButton.style.display = 'inline-block';
    }

    // Function to show the quiz results
    function showResults() {
        if (!quizContainer || !resultsContainer) return;

        const answerContainers = quizContainer.querySelectorAll('.quiz-options');
        let numCorrect = 0;

        quizData.forEach((currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            if (userAnswer === currentQuestion.answer) {
                numCorrect++;
            }
        });

        const score = (numCorrect / quizData.length) * 100;
        resultsContainer.innerHTML = `You scored ${numCorrect} out of ${quizData.length} (${score.toFixed(2)}%)`;

        // Add a class based on the score for styling
        if (score >= 70) {
            resultsContainer.className = 'quiz-results correct';
            if (markCompleteBtn) markCompleteBtn.style.display = 'inline-block'; // Show the "Mark Complete" button
        } else {
            resultsContainer.className = 'quiz-results incorrect';
            if (markCompleteBtn) markCompleteBtn.style.display = 'none';
        }
    }

    // Build the quiz as soon as the page loads
    buildQuiz();

    // Add event listener to the submit button
    if (submitButton) {
        submitButton.addEventListener('click', showResults);
    }
});