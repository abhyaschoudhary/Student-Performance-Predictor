import joblib
import pandas as pd


MODEL_PATH = "models/student_model.pkl"


model = joblib.load(MODEL_PATH)


def predict_score(
    hours,
    attendance,
    previous_score,
    sleep,
    tutoring
):

    data = pd.DataFrame([{
        "Hours_Studied": hours,
        "Attendance": attendance,
        "Previous_Scores": previous_score,
        "Sleep_Hours": sleep,
        "Tutoring_Sessions": tutoring
    }])

    prediction = model.predict(data)[0]

    return float(prediction)