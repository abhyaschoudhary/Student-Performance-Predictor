from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.prediction import Prediction
from app.models.student import Student
from app.models.user import User


router = APIRouter()


@router.get("/predictions/history")
async def get_prediction_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    predictions = (
        db.query(Prediction)
        .join(Student, Prediction.student_id == Student.id)
        .filter(Student.user_id == current_user.id)
        .order_by(Prediction.created_at.desc())
        .all()
    )

    return [
        {
            "id": prediction.id,
            "student_id": prediction.student_id,
            "hours_studied": prediction.hours_studied,
            "attendance": prediction.attendance,
            "previous_score": prediction.previous_score,
            "sleep_hours": prediction.sleep_hours,
            "tutoring_sessions": prediction.tutoring_sessions,
            "predicted_score": prediction.predicted_score,
            "confidence_score": prediction.confidence_score,
            "grade": prediction.grade,
            "performance": prediction.performance,
            "pass_fail": prediction.pass_fail,
            "created_at": prediction.created_at,
        }
        for prediction in predictions
    ]