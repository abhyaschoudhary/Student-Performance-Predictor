from pydantic import BaseModel, Field, model_validator


class StudentRequest(BaseModel):

    student_id: int = Field(..., gt=0)

    hours_studied: float = Field(
        ...,
        ge=0,
        le=24
    )

    attendance: float = Field(
        ...,
        ge=0,
        le=100
    )

    previous_score: float = Field(
        ...,
        ge=0,
        le=100
    )

    sleep_hours: float = Field(
        ...,
        ge=0,
        le=24
    )

    tutoring_sessions: int = Field(
        ...,
        ge=0,
        le=8
    )

    @model_validator(mode="after")
    def validate_daily_time(self):

        if self.hours_studied + self.sleep_hours > 24:
            raise ValueError(
                "Study hours + sleep hours cannot exceed 24 hours per day"
            )

        return self