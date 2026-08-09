import os

from google import genai


class GeminiService:

    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")

        if not api_key:
            self.client = None
            return

        self.client = genai.Client(api_key=api_key)

    def generate_recommendations(
        self,
        hours_studied: float,
        attendance: float,
        previous_score: float,
        sleep_hours: float,
        tutoring_sessions: int,
        predicted_score: float,
        grade: str,
        performance: str,
    ):

        if self.client is None:
            return None

        prompt = f"""
You are an educational study advisor.

Student data:

Study hours per day: {hours_studied}
Attendance: {attendance}%
Previous score: {previous_score}
Sleep hours per day: {sleep_hours}
Tutoring sessions: {tutoring_sessions}
Predicted exam score: {predicted_score}
Grade: {grade}
Performance: {performance}

Generate exactly 3 to 5 practical recommendations.

STRICT RULES:

1. Treat study hours and sleep hours as DAILY values.
2. Never describe study hours as weekly or monthly.
3. Never recommend increasing study hours beyond 24 hours per day.
4. Study hours + sleep hours must NEVER exceed 24 hours per day.
5. Never recommend reducing sleep.
6. If sleep is below 7 hours, recommend increasing sleep toward 7-9 hours.
7. If study hours are already 12 or more, do NOT recommend increasing study hours.
8. If study hours are below 6, you may recommend gradually increasing focused study time.
9. Attendance is a percentage. If attendance is below 75%, recommend improving it to at least 75%.
10. If attendance is 75% or higher, do not claim that attendance is poor.
11. Do not assume the student has weak subjects.
12. Do not assume the student's study method.
13. Do not assume tutoring sessions are weekly or monthly.
14. Do not claim the student has conceptual gaps unless this information is provided.
14.5. Do not describe tutoring sessions as practical, theoretical, weekly, monthly, or any other type or frequency unless explicitly provided.
15. Do not invent any information.
16. Do not change or recalculate the predicted score.
17. Every recommendation must be directly supported by at least one supplied data value or by a general healthy study principle.
18. Encourage regular breaks and a healthy balanced routine.
19. Keep each recommendation concise.
20. Return ONLY a numbered list.

IMPORTANT:
The student has {hours_studied} study hours and {sleep_hours} sleep hours per day.
The total is {hours_studied + sleep_hours} hours.
Never recommend anything that would make this total exceed 24 hours.
"""

        try:

            response = self.client.models.generate_content(
                model="gemini-3.5-flash-lite",
                contents=prompt
            )

            return response.text

        except Exception as e:
            print("\n===== GEMINI ERROR =====")
            print(type(e).__name__)
            print(e)
            return None


gemini_service = GeminiService()