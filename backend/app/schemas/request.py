from pydantic import BaseModel, Field


class StudentRequest(BaseModel):
    hours_studied: int = Field(..., ge=1, le=44)
    attendance: int = Field(..., ge=60, le=100)
    previous_score: int = Field(..., ge=50, le=100)
    sleep_hours: int = Field(..., ge=4, le=10)
    tutoring_sessions: int = Field(..., ge=0, le=8)