def get_grade(score: float) -> str:

    if score >= 90:
        return "A+"

    if score >= 80:
        return "A"

    if score >= 70:
        return "B"

    if score >= 60:
        return "C"

    return "D"


def get_performance(score: float) -> str:

    if score >= 90:
        return "Excellent"

    if score >= 80:
        return "Good"

    if score >= 70:
        return "Average"

    return "Poor"