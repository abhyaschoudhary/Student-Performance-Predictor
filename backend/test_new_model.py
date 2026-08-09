import joblib
import pandas as pd


model = joblib.load("models/student_model_v2.pkl")


test_data = pd.DataFrame([{
    "Hours_Studied": 10,
    "Attendance": 85,
    "Previous_Scores": 75,
    "Sleep_Hours": 8,
    "Tutoring_Sessions": 2
}])


prediction = model.predict(test_data)[0]

print("Test input:")
print(test_data)

print(f"\nPredicted Exam Score: {prediction:.2f}")