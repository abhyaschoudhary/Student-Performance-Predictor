from app.services.recommendation_service import recommendation_service


recommendations = recommendation_service.generate(
    hours_studied=10,
    attendance=85,
    previous_score=75,
    sleep_hours=8,
    tutoring_sessions=2,
    predicted_score=65.66
)

print("\n===== RULE-BASED RECOMMENDATIONS =====")

for i, recommendation in enumerate(recommendations, start=1):
    print(f"{i}. {recommendation}")