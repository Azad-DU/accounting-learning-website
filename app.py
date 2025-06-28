# app.py

from flask import Flask, jsonify, request, session
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy # [# 1. IMPORT SQLAlchemy]
from werkzeug.security import generate_password_hash, check_password_hash

# The clean and correct configuration block

app = Flask(__name__)

# 1. Add all your configurations
app.config['SECRET_KEY'] = 'your-super-secret-key-that-should-be-random'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# 2. Initialize CORS *once* with the correct settings
CORS(app, supports_credentials=True)

# 3. Initialize the database
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
# In app.py, add this class with your other models

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False) # Store the hash, not the password

    # Method to set the password hash from a password
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    # Method to check a password against the stored hash
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)    

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
 # In app.py, add this new route with the others

@app.route("/api/register", methods=['POST'])
def register_user():
    # 1. Get the data from the incoming JSON request
    data = request.get_json()

    # 2. Basic validation to make sure all fields are present
    if not data or not all(k in data for k in ['username', 'email', 'password']):
        return jsonify({"error": "Missing username, email, or password"}), 400

    username = data['username']
    email = data['email']
    password = data['password']

    # 3. Check if the username or email already exists in the database
    if User.query.filter_by(username=username).first():
        # 409 is the HTTP status code for "Conflict"
        return jsonify({"error": "Username already exists"}), 409

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email address already registered"}), 409

    # 4. If validation passes, create a new User instance
    new_user = User(username=username, email=email)

    # 5. Set the hashed password using the secure method from our model
    new_user.set_password(password)

    # 6. Add the new user to the database session and commit to save it
    db.session.add(new_user)
    db.session.commit()

    # 7. Return a success response
    # 201 is the HTTP status code for "Created"
    return jsonify({"message": f"User '{username}' created successfully!"}), 201   
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
# In app.py, add this new route

@app.route("/api/login", methods=['POST'])
def login_user():
    data = request.get_json()
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({"error": "Missing username or password"}), 400

    user = User.query.filter_by(username=data.get('username')).first()

    # Check if user exists and if the password hash matches
    if user and user.check_password(data.get('password')):
        # If credentials are correct, store user info in the session
        session['user_id'] = user.id
        session['username'] = user.username
        return jsonify({"message": f"Welcome back, {user.username}!"}), 200
    else:
        # If credentials are bad, return an "Unauthorized" error
        return jsonify({"error": "Invalid username or password"}), 401 
@app.route("/api/logout", methods=['POST'])
def logout_user():
    session.clear() # Clears all data from the session
    return jsonify({"message": "Successfully logged out"}), 200
# In app.py, add this new route

@app.route("/api/check_session")
def check_session():
    if 'user_id' in session:
        # If the user's ID is found in the session, they are logged in.
        # Return their status and username.
        return jsonify({"logged_in": True, "username": session.get('username')})
    else:
        # If not, they are logged out.
        return jsonify({"logged_in": False})               
 
# Note: We keep this part the same
if __name__ == '__main__':
    app.run(debug=True)