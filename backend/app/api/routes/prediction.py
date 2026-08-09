from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.student import Student
from app.models.prediction import Prediction
from app.models.user import User
from app.schemas.request import StudentRequest
from app.schemas.response import PredictionResponse
from app.services.prediction_service import prediction_service
from app.services.recommendation_service import recommendation_service
from app.services.gemini_service import gemini_service


router = APIRouter()


@router.post(
    "/predict",
    response_model=PredictionResponse
)
async def predict(
    student: StudentRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    db_student = (
        db.query(Student)
        .filter(
            Student.id == student.student_id,
            Student.user_id == current_user.id
        )
        .first()
    )

    if not db_student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    result = prediction_service.predict(student)
    rule_recommendations = recommendation_service.generate(
    hours_studied=student.hours_studied,
    attendance=student.attendance,
    previous_score=student.previous_score,
    sleep_hours=student.sleep_hours,
    tutoring_sessions=student.tutoring_sessions,
    predicted_score=result["predicted_score"]
)
    ai_recommendations = gemini_service.generate_recommendations(
    hours_studied=student.hours_studied,
    attendance=student.attendance,
    previous_score=student.previous_score,
    sleep_hours=student.sleep_hours,
    tutoring_sessions=student.tutoring_sessions,
    predicted_score=result["predicted_score"],
    grade=result["grade"],
    performance=result["performance"]
)
    if ai_recommendations:
        recommendations = ai_recommendations
    else:
        recommendations = "\n".join(
        f"{i}. {item}"
        for i, item in enumerate(rule_recommendations, start=1)
    )

    pass_fail = (
        "Pass"
        if result["predicted_score"] >= 40
        else "Fail"
    )

    prediction_record = Prediction(
        student_id=db_student.id,
        hours_studied=student.hours_studied,
        attendance=student.attendance,
        previous_score=student.previous_score,
        sleep_hours=student.sleep_hours,
        tutoring_sessions=student.tutoring_sessions,
        predicted_score=result["predicted_score"],
        confidence_score=result["confidence_score"],
        grade=result["grade"],
        performance=result["performance"],
        pass_fail=pass_fail
    )

    db.add(prediction_record)
    db.commit()
    db.refresh(prediction_record)

    return {
    "predicted_score": result["predicted_score"],
    "grade": result["grade"],
    "performance": result["performance"],
    "pass_fail": pass_fail,
    "confidence_score": result["confidence_score"],
    "recommendations": recommendations
}