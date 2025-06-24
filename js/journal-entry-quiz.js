document.addEventListener('DOMContentLoaded', () => {

    const quizContainer = document.getElementById('quiz-container');
    const submitButton = document.getElementById('submit-quiz');
    const resultsContainer = document.getElementById('quiz-results');
    const markCompleteBtn = document.getElementById('mark-topic-complete');

    // Quiz data specific to "The Journal Entry"
    const quizData = [
        {
            question: "In a journal entry, which account is typically listed first?",
            options: ["The credited account", "The debited account", "The largest account", "The asset account"],
            answer: "The debited account"
        },
        {
            question: "A company performs a service for a client and receives cash. What is the correct journal entry?",
            options: ["Debit Accounts Receivable, Credit Service Revenue", "Debit Cash, Credit Accounts Payable", "Debit Cash, Credit Service Revenue", "Debit Service Revenue, Credit Cash"],
            answer: "Debit Cash, Credit Service Revenue"
        },
        {
            question: "What is the purpose of the 'memo' in a journal entry?",
            options: ["To state the debit amount", "To provide a brief explanation of the transaction", "To list the date", "To get final approval"],
            answer: "To provide a brief explanation of the transaction"
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