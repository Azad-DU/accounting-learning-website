document.addEventListener('DOMContentLoaded', () => {

    const quizContainer = document.getElementById('quiz-container');
    const submitButton = document.getElementById('submit-quiz');
    const resultsContainer = document.getElementById('quiz-results');
    const markCompleteBtn = document.getElementById('mark-topic-complete');

    // Quiz data specific to "Debits and Credits"
    const quizData = [
        {
            question: "To increase an Asset account, you should:",
            options: ["Debit it", "Credit it", "Both Debit and Credit", "Neither"],
            answer: "Debit it"
        },
        {
            question: "A credit entry will increase which of the following accounts?",
            options: ["Cash", "Expenses", "Liabilities", "Drawings"],
            answer: "Liabilities"
        },
        {
            question: "A company pays a bill for electricity. Which entry is correct?",
            options: ["Debit Cash, Credit Expenses", "Debit Expenses, Credit Cash", "Debit Assets, Credit Revenue", "Debit Cash, Credit Liabilities"],
            answer: "Debit Expenses, Credit Cash"
        }
    ];

    // --- The rest of the script is the same as quiz.js ---
    // You can copy it from quiz.js, or use this identical version below.

    function buildQuiz() {
        if (!quizContainer) return;

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
        if (submitButton) submitButton.style.display = 'inline-block';
    }

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

        if (score >= 70) {
            resultsContainer.className = 'quiz-results correct';
            if (markCompleteBtn) markCompleteBtn.style.display = 'inline-block';
        } else {
            resultsContainer.className = 'quiz-results incorrect';
            if (markCompleteBtn) markCompleteBtn.style.display = 'none';
        }
    }

    buildQuiz();

    if (submitButton) {
        submitButton.addEventListener('click', showResults);
    }
});