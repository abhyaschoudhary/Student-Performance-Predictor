class RecommendationService:

    def generate(
        self,
        hours_studied: float,
        attendance: float,
        previous_score: float,
        sleep_hours: float,
        tutoring_sessions: int,
        predicted_score: float
    ):

        recommendations = []
        recommendations.append(
            "Maintain a consistent daily study routine and review important topics regularly."
            
        )
        recommendations.append(
            "Take short breaks during study sessions to maintain concentration."
        )

     

        # Attendance
        if attendance < 75:
            recommendations.append(
                "Improve attendance to at least 75%."
            )
        elif attendance < 85:
            recommendations.append(
                "Try to maintain attendance above 85% for more consistent learning."
            )

        # Study hours
        if hours_studied < 6:
            recommendations.append(
                "Gradually increase focused study time while maintaining regular breaks."
            )
        elif hours_studied > 12:
            recommendations.append(
                "Avoid excessive study hours and focus on study quality, breaks, and revision."
            )

        # Sleep
        if sleep_hours < 7:
            recommendations.append(
                "Try to maintain at least 7 hours of sleep for better concentration and recovery."
            )
        elif sleep_hours > 10:
            recommendations.append(
                "Consider maintaining a consistent sleep schedule around 7–9 hours."
            )

        # Previous score
        if previous_score < 60:
            recommendations.append(
                "Focus on strengthening fundamental concepts and practice regularly."
            )
        elif previous_score < 75:
            recommendations.append(
                "Use regular revision and practice tests to improve your previous performance."
            )

        # Tutoring
        if tutoring_sessions == 0:
            recommendations.append(
                "Consider tutoring or peer support if you need help with difficult topics."
            )

        # Predicted score
        if predicted_score < 60:
            recommendations.append(
                "Your predicted score is relatively low. Focus on weak areas and consistent practice."
            )
        elif predicted_score < 75:
            recommendations.append(
                "Your predicted performance has room for improvement. Maintain consistent practice."
            )
        else:
            recommendations.append(
                "Good predicted performance. Continue your current routine and revise regularly."
            )

        # Make sure we always return something
        if not recommendations:
            recommendations.append(
                "Continue your current study routine and maintain a balanced schedule."
            )

        return recommendations


recommendation_service = RecommendationService()