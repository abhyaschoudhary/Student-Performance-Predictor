import pandas as pd


FEATURES = [
    "Hours_Studied",
    "Attendance",
    "Previous_Scores",
    "Sleep_Hours",
    "Tutoring_Sessions"
]

TARGET = "Exam_Score"


def load_data(path: str):

    df = pd.read_csv(path)

    df = df[FEATURES + [TARGET]]

    df.dropna(inplace=True)

    return df


def split_features_target(df):

    X = df[FEATURES]

    y = df[TARGET]

    return X, y