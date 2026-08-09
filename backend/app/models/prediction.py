from datetime import datetime

from sqlalchemy import DateTime, Float, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Prediction(Base):
    __tablename__ = "predictions"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    student_id: Mapped[int] = mapped_column(
        ForeignKey("students.id"),
        nullable=False,
        index=True
    )

    hours_studied: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    attendance: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    previous_score: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    sleep_hours: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    tutoring_sessions: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    predicted_score: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )
    
    confidence_score: Mapped[float] = mapped_column(
    Float,
    nullable=False
    )

    grade: Mapped[str] = mapped_column(
        String(10),
        nullable=False
    )

    performance: Mapped[str] = mapped_column(
        String(30),
        nullable=False
    )

    pass_fail: Mapped[str] = mapped_column(
        String(10),
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    student = relationship(
        "Student",
        back_populates="predictions"
    )