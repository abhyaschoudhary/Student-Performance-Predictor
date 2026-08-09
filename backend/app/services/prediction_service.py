import joblib
import pandas as pd

from app.utils.grades import get_grade, get_performance
from app.utils.confidence import calculate_confidence


class PredictionService:

    def __init__(self):
        self.model = joblib.load("models/student_model.pkl")

    def predict(self, student):

        data = pd.DataFrame([{
            "Hours_Studied": student.hours_studied,
            "Attendance": student.attendance,
            "Previous_Scores": student.previous_score,
            "Sleep_Hours": student.sleep_hours,
            "Tutoring_Sessions": student.tutoring_sessions
        }])

        prediction = self.model.predict(data)[0]

        prediction = round(float(prediction), 2)

        return {
    "predicted_score": prediction,
    "grade": get_grade(prediction),
    "performance": get_performance(prediction),
    "confidence_score": calculate_confidence(prediction)
}


prediction_service = PredictionService()