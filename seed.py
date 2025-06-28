# seed.py

from app import app, db, Topic, Question

# Data to be inserted into the database
course_data = {
    "basic-accounting-equation": {
        "title": "The Basic Accounting Equation",
        "content": "<p>The basic accounting equation is the foundation...</p>", # You can add the full content here if you wish
        "quiz": [
            {"question": "Which of the following is an example of an Asset?", "options": ["Accounts Payable", "Owner's Investment", "Cash", "Service Revenue"], "answer": "Cash"},
            {"question": "Liabilities represent...","options": ["The owner's claim on assets", "What the company owes to others", "Resources owned by the company"],"answer": "What the company owes to others"},
            {"question": "The accounting equation must always...","options": ["Increase", "Decrease", "Balance", "Be zero"],"answer": "Balance"}
        ]
    },
    "debits-credits": {
        "title": "Understanding Debits & Credits",
        "content": "<p>Debits (Dr) and Credits (Cr) are the two fundamental aspects...</p>",
        "quiz": [
            {"question": "To increase an Asset account, you should:","options": ["Debit it", "Credit it", "Both Debit and Credit", "Neither"],"answer": "Debit it"},
            {"question": "A credit entry will increase which of the following accounts?","options": ["Cash", "Expenses", "Liabilities", "Drawings"],"answer": "Liabilities"}
        ]
    },
    "financial-statements": {
        "title": "Financial Statements", "content": "<p>...</p>",
        "quiz": [{"question": "Which statement reports financial performance over a period of time?", "options": ["Balance Sheet", "Income Statement", "Statement of Cash Flows"], "answer": "Income Statement"}]
    },
    "journal-entry": {
        "title": "The Journal Entry", "content": "<p>...</p>",
        "quiz": [{"question": "In a journal entry, which account is typically listed first?", "options": ["The credited account", "The debited account", "The largest account"], "answer": "The debited account"}]
    }
}

with app.app_context():
    db.drop_all() # Optional: Clears the database before seeding
    db.create_all() # Make sure tables are created

    for slug, data in course_data.items():
        # Create a new Topic object
        new_topic = Topic(slug=slug, title=data['title'], content=data['content'])
        db.session.add(new_topic)

        # For each question in the topic's quiz data...
        for q_data in data['quiz']:
            # Create a new Question object
            new_question = Question(
                question_text=q_data['question'],
                options=q_data['options'],
                answer=q_data['answer'],
                topic=new_topic # This links the question to the topic
            )
            db.session.add(new_question)

    # Commit all the changes to the database
    db.session.commit()
    print("Database has been seeded successfully!")
    