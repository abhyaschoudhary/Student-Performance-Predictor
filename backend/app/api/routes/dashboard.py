from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.prediction import Prediction
from app.models.student import Student
from app.models.user import User


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("")
def get_dashboard(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Get all predictions belonging to the current user
    predictions = (
        db.query(Prediction)
        .join(Student, Prediction.student_id == Student.id)
        .filter(Student.user_id == current_user.id)
        .order_by(Prediction.created_at.desc())
        .all()
    )

    # No predictions yet
    if not predictions:
        return {
            "total_predictions": 0,
            "latest_score": None,
            "latest_grade": None,
            "latest_performance": None,
            "latest_confidence": None,
            "pass_count": 0,
            "fail_count": 0,
            "average_score": None
        }

    latest = predictions[0]

    pass_count = sum(
        1
        for prediction in predictions
        if prediction.pass_fail == "Pass"
    )

    fail_count = sum(
        1
        for prediction in predictions
        if prediction.pass_fail == "Fail"
    )

    average_score = round(
        sum(prediction.predicted_score for prediction in predictions)
        / len(predictions),
        2
    )

    return {
        "total_predictions": len(predictions),
        "latest_score": latest.predicted_score,
        "latest_grade": latest.grade,
        "latest_performance": latest.performance,
        "latest_confidence": latest.confidence_score,
        "pass_count": pass_count,
        "fail_count": fail_count,
        "average_score": average_score
    }


@router.get("/score-trend")
def get_score_trend(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Get predictions from oldest to newest
    predictions = (
        db.query(Prediction)
        .join(Student, Prediction.student_id == Student.id)
        .filter(Student.user_id == current_user.id)
        .order_by(Prediction.created_at.asc())
        .all()
    )

    return [
        {
            "prediction_id": prediction.id,
            "student_id": prediction.student_id,
            "student_name": prediction.student.name,
            "predicted_score": prediction.predicted_score,
            "grade": prediction.grade,
            "confidence_score": prediction.confidence_score,
            "pass_fail": prediction.pass_fail,
            "created_at": prediction.created_at,
        }
        for prediction in predictions
    ]