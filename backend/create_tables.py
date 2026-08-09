from app.core.database import Base, engine
from app.models.user import User
from app.models.student import Student
from app.models.prediction import Prediction

print("Creating database tables...")

Base.metadata.create_all(bind=engine)

print("Database tables created successfully!")