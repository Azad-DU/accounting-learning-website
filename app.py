# app.py

from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy # [# 1. IMPORT SQLAlchemy]

app = Flask(__name__)
CORS(app)

# [# 2. CONFIGURE THE DATABASE]
# This tells our app where to find the database file.
# We're creating a file named 'database.db' in our project folder.
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# [# 3. INITIALIZE THE DATABASE]
# Create a database object from the SQLAlchemy class
db = SQLAlchemy(app)


# [# 4. DEFINE OUR DATABASE MODELS]
# A model is a Python class that represents a table in our database.

class Topic(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    slug = db.Column(db.String(100), unique=True, nullable=False) # e.g., 'basic-accounting-equation'
    title = db.Column(db.String(150), nullable=False)
    content = db.Column(db.Text, nullable=False)
    # This creates a relationship, so we can easily get all questions for a topic
    questions = db.relationship('Question', backref='topic', lazy=True, cascade="all, delete-orphan")

class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question_text = db.Column(db.String(500), nullable=False)
    # We will store the options list and the answer string directly
    options = db.Column(db.JSON, nullable=False)
    answer = db.Column(db.String(200), nullable=False)
    # This 'foreign key' links this question to a specific topic
    topic_id = db.Column(db.Integer, db.ForeignKey('topic.id'), nullable=False)
class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    subject = db.Column(db.String(200), nullable=False)
    message = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=db.func.now())

# --- API ENDPOINT (Now using the database) ---

@app.route("/")
def hello_world():
    return "<p>Hello, this is the back-end speaking!</p>"

@app.route("/api/quiz/<string:slug>")
def get_quiz(slug):
    # [# 5. QUERY THE DATABASE instead of a dictionary]
    # Find the topic in the Topic table by its slug (e.g., 'basic-accounting-equation')
    topic = Topic.query.filter_by(slug=slug).first()

    if topic:
        # If we find the topic, prepare the data for the JSON response
        question_list = []
        for q in topic.questions:
            question_list.append({
                'question': q.question_text,
                'options': q.options,
                'answer': q.answer
            })
        
        return jsonify({
            "title": topic.title + " Quiz",
            "questions": question_list
        })
    else:
        # If not found, return an error message
        return jsonify({"error": "Quiz not found for topic: " + slug}), 404
# app.py

# ... existing get_quiz route ...

# --- NEW 'WRITE' API ENDPOINT ---
@app.route("/api/contact", methods=['POST'])
def handle_contact_form():
    # Get the JSON data sent from the front-end
    data = request.get_json()

    # Basic validation
    if not data or not all(k in data for k in ['name', 'email', 'subject', 'message']):
        return jsonify({"error": "Missing data"}), 400

    # Create a new Message object with the data
    new_message = Message(
        name=data['name'],
        email=data['email'],
        subject=data['subject'],
        message=data['message']
    )

    # Add the new message to the database session and commit to save it
    db.session.add(new_message)
    db.session.commit()

    # Return a success response
    return jsonify({"message": "Your message has been received successfully!"}), 201
# --- TEMPORARY ROUTE TO VIEW MESSAGES ---
@app.route("/api/messages")
def view_messages():
    # Get all messages from the database, ordered by newest first
    all_messages = Message.query.order_by(Message.timestamp.desc()).all()
    output = []
    for msg in all_messages:
        output.append({
            "id": msg.id,
            "name": msg.name,
            "email": msg.email,
            "subject": msg.subject,
            "message": msg.message,
            "timestamp": msg.timestamp.isoformat() # Convert timestamp to string
        })
    return jsonify(output)
 
# Note: We keep this part the same
if __name__ == '__main__':
    app.run(debug=True)