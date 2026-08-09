from dotenv import load_dotenv

load_dotenv()

from app.services.gemini_service import gemini_service


result = gemini_service.generate_recommendations(
    hours_studied=10,
attendance=85,
previous_score=75,
sleep_hours=8,
tutoring_sessions=2,
predicted_score=65.66,
grade="C",
performance="Poor"

)

if result:
    print("\n===== GEMINI RECOMMENDATIONS =====")
    print(result)
else:
    print("\n❌ Gemini did not return a response.")