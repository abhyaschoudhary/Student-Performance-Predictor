import os
import joblib

from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

from app.ml.preprocess import load_data, split_features_target

DATASET_PATH = "data/StudentPerformanceFactors.csv"

MODEL_PATH = "models/student_model.pkl"


def train():

    df = load_data(DATASET_PATH)

    X, y = split_features_target(df)

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42
    )

    model = LinearRegression()

    model.fit(X_train, y_train)

    os.makedirs("models", exist_ok=True)

    joblib.dump(model, MODEL_PATH)

    print("✅ Model trained successfully!")


if __name__ == "__main__":
    train()