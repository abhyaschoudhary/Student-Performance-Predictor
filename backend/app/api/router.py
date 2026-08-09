from fastapi import APIRouter

from app.api.routes.health import router as health_router
from app.api.routes.prediction import router as prediction_router
from app.api.routes.auth import router as auth_router
from app.api.routes.students import router as students_router
from app.api.routes.predictions import router as predictions_router
from app.api.routes.dashboard import router as dashboard_router


router = APIRouter()


router.include_router(
    health_router,
    tags=["Health"]
)

router.include_router(
    prediction_router,
    tags=["Prediction"]
)

router.include_router(
    auth_router,
    tags=["Authentication"]
)

router.include_router(
    students_router,
    tags=["Students"]
)

router.include_router(
    predictions_router,
    tags=["Prediction History"]
)

router.include_router(dashboard_router)