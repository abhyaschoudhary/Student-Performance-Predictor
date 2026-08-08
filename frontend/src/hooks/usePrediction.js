import { useCallback, useState } from 'react'
import { requestPrediction } from '../services/api'

const STORAGE_KEY = 'edupredict-last-prediction'

function savedPrediction() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) } catch { return null }
}

function friendlyError(error) {
  if (!error.response) return 'Unable to connect to the prediction server. Please make sure it is running and try again.'
  if (error.response.status === 422) return 'Please check the entered values and try again.'
  if (error.response.status >= 500) return 'The prediction server had a problem. Please try again shortly.'
  return 'We could not complete the prediction. Please try again.'
}

export default function usePrediction() {
  const [prediction, setPrediction] = useState(savedPrediction)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const predict = useCallback(async (values) => {
    setLoading(true)
    setError('')
    try {
      const response = await requestPrediction(values)
      const nextPrediction = { result: response.data, inputs: values, createdAt: new Date().toISOString() }
      setPrediction(nextPrediction)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPrediction))
      return nextPrediction
    } catch (requestError) {
      setError(friendlyError(requestError))
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return { prediction, loading, error, setError, predict }
}
