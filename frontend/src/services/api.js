import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',
  timeout: 12000,
})

export const requestPrediction = (values) => api.post('/predict', {
  hours_studied: values.hours,
  attendance: values.attendance,
  previous_score: values.prevScore,
  sleep_hours: values.sleep,
  tutoring_sessions: values.tutoring,
})

export default api
