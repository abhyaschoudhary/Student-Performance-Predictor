import { useCallback, useState } from 'react'
import { getApiErrorMessage, predictStudent } from '../services/api'

export default function usePrediction() {
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const predict = useCallback(async (values) => {
    setLoading(true)
    setError('')
    try {
      const result = await predictStudent(values)
      const nextPrediction = { result, inputs: values, createdAt: new Date().toISOString() }
      setPrediction(nextPrediction)
      return nextPrediction
    } catch (requestError) {
      setError(getApiErrorMessage(requestError))
      return null
    } finally {
      setLoading(false)
    }
  }, [])
  return { prediction, loading, error, setError, predict }
}
