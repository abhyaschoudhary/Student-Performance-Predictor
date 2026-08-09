from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.student import Student
from app.models.user import User
from pydantic import BaseModel


router = APIRouter(
    prefix="/students",
)


class StudentCreate(BaseModel):
    name: str
    age: int
    class_name: str


class StudentResponse(BaseModel):
    id: int
    name: str
    age: int
    class_name: str

    class Config:
        from_attributes = True


@router.post(
    "",
    response_model=StudentResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_student(
    data: StudentCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    student = Student(
        user_id=current_user.id,
        name=data.name,
        age=data.age,
        class_name=data.class_name,
    )

    db.add(student)
    db.commit()
    db.refresh(student)

    return student


@router.get(
    "",
    response_model=list[StudentResponse],
)
def get_students(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return (
        db.query(Student)
        .filter(Student.user_id == current_user.id)
        .all()
    )


@router.get(
    "/{student_id}",
    response_model=StudentResponse,
)
def get_student(
    student_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    student = (
        db.query(Student)
        .filter(
            Student.id == student_id,
            Student.user_id == current_user.id,
        )
        .first()
    )

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found",
        )

    return student