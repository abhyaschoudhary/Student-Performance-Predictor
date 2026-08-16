import axios from 'axios'

export const TOKEN_KEY = 'edupredict-access-token'
export const USER_KEY = 'edupredict-user'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000',
  timeout: 15000,
})
export const getToken = () => localStorage.getItem(TOKEN_KEY)

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearSession()
      window.dispatchEvent(new Event('edupredict:unauthorized'))
    }
    return Promise.reject(error)
  },
)

export const login = async (credentials) => (await api.post('/auth/login', credentials)).data
export const register = async (credentials) => (await api.post('/auth/register', credentials)).data
export const getStudents = async () => (await api.get('/students')).data
export const createStudent = async (student) => (await api.post('/students', student)).data
export const predictStudent = async (values) => (await api.post('/predict', values)).data
export const getPredictionHistory = async () => (await api.get('/predictions/history')).data
export const getDashboard = async () => (await api.get('/dashboard')).data
export const getScoreTrend = async () => (await api.get('/dashboard/score-trend')).data

export function getApiErrorMessage(error) {
  if (!error.response) return 'Unable to connect to the server. Check that the backend is running and try again.'
  const { status, data } = error.response
  const detail = typeof data?.detail === 'string' ? data.detail : ''
  if (status === 401) return 'Your session has expired. Please sign in again.'
  if (status === 404) return detail || 'The requested resource was not found.'
  if (status === 422) return detail || 'Please check the highlighted information and try again.'
  if (status >= 500) return 'The server encountered a problem. Please try again shortly.'
  return detail || 'We could not complete that request. Please try again.'
}

export default api
