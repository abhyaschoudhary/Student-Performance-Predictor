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

    # Keep only the columns required by the model
    df = df[FEATURES + [TARGET]]

    # Remove missing values
    df.dropna(inplace=True)

    # -------------------------------------------------
    # REALISTIC INPUT VALIDATION
    # -------------------------------------------------

    # Study hours must be between 0 and 24
    df = df[
        (df["Hours_Studied"] >= 0) &
        (df["Hours_Studied"] <= 24)
    ]

    # Sleep hours must be between 0 and 24
    df = df[
        (df["Sleep_Hours"] >= 0) &
        (df["Sleep_Hours"] <= 24)
    ]

    # Study + sleep cannot exceed 24 hours/day
    df = df[
        (df["Hours_Studied"] + df["Sleep_Hours"] <= 24)
    ]

    # Attendance must be between 0 and 100
    df = df[
        (df["Attendance"] >= 0) &
        (df["Attendance"] <= 100)
    ]

    # Previous score must be between 0 and 100
    df = df[
        (df["Previous_Scores"] >= 0) &
        (df["Previous_Scores"] <= 100)
    ]

    # Exam score must be between 0 and 100
    df = df[
        (df[TARGET] >= 0) &
        (df[TARGET] <= 100)
    ]

    return df


def split_features_target(df):

    X = df[FEATURES]

    y = df[TARGET]

    return X, y