import joblib

from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score
)
from sklearn.model_selection import train_test_split

from app.ml.preprocess import load_data, split_features_target


MODEL_PATH = "models/student_model.pkl"

DATASET_PATH = "data/StudentPerformanceFactors.csv"


def evaluate():

    df = load_data(DATASET_PATH)

    X, y = split_features_target(df)

    _, X_test, _, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42
    )

    model = joblib.load(MODEL_PATH)

    predictions = model.predict(X_test)

    print("\nModel Evaluation\n")

    print("MAE :", mean_absolute_error(y_test, predictions))

    print("MSE :", mean_squared_error(y_test, predictions))

    print("R2 Score :", r2_score(y_test, predictions))


if __name__ == "__main__":
    evaluate()