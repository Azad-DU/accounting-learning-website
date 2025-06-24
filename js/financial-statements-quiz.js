document.addEventListener('DOMContentLoaded', () => {

    const quizContainer = document.getElementById('quiz-container');
    const submitButton = document.getElementById('submit-quiz');
    const resultsContainer = document.getElementById('quiz-results');
    const markCompleteBtn = document.getElementById('mark-topic-complete');

    // Quiz data specific to "Financial Statements"
    const quizData = [
        {
            question: "Which statement reports a company's financial performance over a period of time?",
            options: ["Balance Sheet", "Income Statement", "Statement of Cash Flows", "Statement of Equity"],
            answer: "Income Statement"
        },
        {
            question: "The formula 'Assets = Liabilities + Equity' represents which financial statement?",
            options: ["Balance Sheet", "Income Statement", "P&L Statement", "Statement of Cash Flows"],
            answer: "Balance Sheet"
        },
        {
            question: "Net Income calculated on the Income Statement flows into which part of the Balance Sheet?",
            options: ["Assets", "Liabilities", "Equity", "Expenses"],
            answer: "Equity"
        }
    ];

    // The quiz building and result showing logic remains the same.
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