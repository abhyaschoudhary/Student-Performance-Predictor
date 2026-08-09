import pandas as pd

from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

from app.ml.preprocess import load_data


DATASET_PATH = "data/StudentPerformanceFactors.csv"


def evaluate_model(features, name):

    df = load_data(DATASET_PATH)

    X = df[features]
    y = df["Exam_Score"]

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42
    )

    model = LinearRegression()

    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)

    mae = mean_absolute_error(y_test, y_pred)
    rmse = mean_squared_error(y_test, y_pred) ** 0.5
    r2 = r2_score(y_test, y_pred)

    print(f"\n===== {name} =====")
    print(f"Features: {features}")
    print(f"MAE  : {mae:.2f}")
    print(f"RMSE : {rmse:.2f}")
    print(f"R²   : {r2:.4f}")


# Model 1: 5 features
features_5 = [
    "Hours_Studied",
    "Attendance",
    "Previous_Scores",
    "Sleep_Hours",
    "Tutoring_Sessions"
]


# Model 2: 4 features
features_4 = [
    "Hours_Studied",
    "Attendance",
    "Previous_Scores",
    "Sleep_Hours"
]


evaluate_model(features_5, "5-FEATURE MODEL")

evaluate_model(features_4, "4-FEATURE MODEL")