from app import app, db

with app.app_context():
    # Create all tables
    db.create_all()
    print("Database tables created successfully!")
    
    # Test if we can query the database
    from app import User
    user_count = User.query.count()
    print(f"Current user count: {user_count}") 