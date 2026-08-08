from fastapi import APIRouter

from app.schemas.request import StudentRequest
from app.schemas.response import PredictionResponse
from app.services.prediction_service import prediction_service

router = APIRouter()


@router.post(
    "/predict",
    response_model=PredictionResponse
)
async def predict(student: StudentRequest):

    return prediction_service.predict(student)