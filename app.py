# app.py

from flask import Flask, jsonify
from flask_cors import CORS # <-- 1. THIS IMPORT MUST BE HERE

app = Flask(__name__)
CORS(app) # <-- 2. THIS LINE MUST BE HERE, right after app is created

# ... all the rest of your QUIZ_DATABASE and route code ...
# (The code below should be identical to what you already have)

QUIZ_DATABASE = {
    "basic-accounting-equation": {
        "title": "Basic Accounting Equation Quiz",
        "questions": [
            {
                "question": "Which of the following is an example of an Asset?",
                "options": ["Accounts Payable", "Owner's Investment", "Cash", "Service Revenue"],
                "answer": "Cash"
            },
            {
                "question": "Liabilities represent...",
                "options": ["The owner's claim on assets", "What the company owes to others", "Resources owned by the company", "Profits earned by the company"],
                "answer": "What the company owes to others"
            },
            {
                "question": "The accounting equation must always...",
                "options": ["Increase", "Decrease", "Balance", "Be zero"],
                "answer": "Balance"
            }
        ]
    },
    "debits-credits": {
        "title": "Debits & Credits Quiz",
        "questions": [
             {
                "question": "To increase an Asset account, you should:",
                "options": ["Debit it", "Credit it", "Both Debit and Credit", "Neither"],
                "answer": "Debit it"
            },
            {
                "question": "A credit entry will increase which of the following accounts?",
                "options": ["Cash", "Expenses", "Liabilities", "Drawings"],
                "answer": "Liabilities"
            }
        ]
    },
    "financial-statements": {
        "title": "Financial Statements Quiz",
        "questions": [
            { "question": "Which statement reports financial performance over a period of time?", "options": ["Balance Sheet", "Income Statement", "Statement of Cash Flows"], "answer": "Income Statement"},
            { "question": "The formula 'Assets = Liabilities + Equity' represents which statement?", "options": ["Balance Sheet", "Income Statement", "Statement of Cash Flows"], "answer": "Balance Sheet"},
            { "question": "Net Income from the Income Statement flows into which part of the Balance Sheet?", "options": ["Assets", "Liabilities", "Equity"], "answer": "Equity"}
        ]
    },
    "journal-entry": {
        "title": "The Journal Entry Quiz",
        "questions": [
            { "question": "In a journal entry, which account is typically listed first?", "options": ["The credited account", "The debited account", "The largest account"], "answer": "The debited account"},
            { "question": "What is the purpose of the 'memo' in a journal entry?", "options": ["To state the debit amount", "To provide a brief explanation of the transaction", "To list the date"], "answer": "To provide a brief explanation of the transaction"}
        ]
    }
}

@app.route("/")
def hello_world():
    return "<p>Hello, this is the back-end speaking!</p>"

@app.route("/api/quiz/<string:topic_id>")
def get_quiz(topic_id):
    quiz = QUIZ_DATABASE.get(topic_id)
    if quiz:
        return jsonify(quiz)
    else:
        return jsonify({"error": "Quiz not found for topic: " + topic_id}), 404

if __name__ == '__main__':
    app.run(debug=True)