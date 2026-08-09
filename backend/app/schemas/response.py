from pydantic import BaseModel


class PredictionResponse(BaseModel):
    predicted_score: float
    grade: str
    performance: str
    pass_fail: str
    confidence_score: float
    recommendations: str