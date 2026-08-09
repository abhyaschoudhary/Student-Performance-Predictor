def calculate_confidence(predicted_score: float) -> float:
    """
    Estimate prediction reliability using the model's validation MAE.

    Current model MAE = 1.21 marks.
    This is a reliability score, not a probability.
    """

    MAE = 1.21

    # Maximum expected error we consider acceptable
    MAX_ERROR = 10.0

    confidence = 100 - (MAE / MAX_ERROR * 100)

    # Keep the value between 0 and 100
    confidence = max(0.0, min(100.0, confidence))

    return round(confidence, 2)