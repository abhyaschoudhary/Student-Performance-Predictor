export const fields = [
  { name: 'hours', label: 'Hours Studied', helper: 'Average number of hours studied.', min: 1, max: 44, step: 1, icon: 'Clock3' },
  { name: 'attendance', label: 'Attendance', helper: 'Student attendance percentage.', min: 60, max: 100, step: 1, suffix: '%', icon: 'CalendarCheck2' },
  { name: 'prevScore', label: 'Previous Score', helper: 'Previous examination score.', min: 50, max: 100, step: 1, icon: 'FileText' },
  { name: 'sleep', label: 'Sleep Hours', helper: 'Average daily sleep.', min: 4, max: 10, step: 0.5, icon: 'Moon' },
  { name: 'tutoring', label: 'Tutoring Sessions', helper: 'Weekly tutoring sessions.', min: 0, max: 8, step: 1, icon: 'MessagesSquare' },
]

export const initialValues = { hours: 20, attendance: 85, prevScore: 75, sleep: 7, tutoring: 2 }

export function validatePrediction(values) {
  const errors = {}
  fields.forEach(({ name, label, min, max }) => {
    const value = Number(values[name])
    if (values[name] === '' || Number.isNaN(value)) errors[name] = `${label} is required.`
    else if (value < min || value > max) errors[name] = `Enter a value between ${min} and ${max}.`
  })
  return errors
}

export function getScoreState(score) {
  if (score >= 90) return { label: 'Excellent', color: '#15803d', soft: 'bg-emerald-50 text-emerald-800 border-emerald-200' }
  if (score >= 80) return { label: 'Good', color: '#2563eb', soft: 'bg-blue-50 text-blue-800 border-blue-200' }
  if (score >= 70) return { label: 'Average', color: '#b7791f', soft: 'bg-amber-50 text-amber-800 border-amber-200' }
  if (score >= 60) return { label: 'Needs Improvement', color: '#c2410c', soft: 'bg-orange-50 text-orange-800 border-orange-200' }
  return { label: 'At Risk', color: '#b91c1c', soft: 'bg-red-50 text-red-800 border-red-200' }
}

export const getPredictionStatus = (score) => score >= 40 ? 'Pass' : 'Fail'
