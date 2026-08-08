import { useState } from 'react'
import { ArrowRight, CalendarCheck2, Clock3, FileText, MessagesSquare, Moon, Sparkles } from 'lucide-react'
import { fields, initialValues, validatePrediction } from '../utils/predictionUtils'
import LoadingState from './LoadingState'

const icons = { Clock3, CalendarCheck2, FileText, Moon, MessagesSquare }

export default function PredictionForm({ onPredict, loading }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const updateValue = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }
  const submit = async (event) => {
    event.preventDefault()
    const nextErrors = validatePrediction(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    await onPredict(Object.fromEntries(Object.entries(values).map(([key, value]) => [key, Number(value)])))
  }
  return <form onSubmit={submit} noValidate className="card p-5 sm:p-7"><div className="mb-7 flex items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700"><Sparkles size={20} /></span><div><h2 className="text-lg font-semibold text-ink">Student learning profile</h2><p className="mt-1 text-sm text-slate-500">Enter the current study factors to request a model prediction.</p></div></div>
    <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">{fields.map((field) => {
      const Icon = icons[field.icon]
      return <div key={field.name} className={field.name === 'tutoring' ? 'sm:col-span-2' : ''}><label htmlFor={field.name} className="flex items-center gap-2 text-sm font-semibold text-slate-700"><Icon size={15} className="text-slate-400" aria-hidden="true" />{field.label}</label><p id={`${field.name}-help`} className="mt-1 text-xs text-slate-500">{field.helper}</p><div className="mt-3 flex items-center gap-3"><input id={field.name} name={field.name} type="number" min={field.min} max={field.max} step={field.step} value={values[field.name]} onChange={(event) => updateValue(field.name, event.target.value)} aria-describedby={`${field.name}-help ${errors[field.name] ? `${field.name}-error` : ''}`} aria-invalid={Boolean(errors[field.name])} className={`input-field ${errors[field.name] ? 'border-red-400 ring-2 ring-red-100' : ''}`} /><span className="w-12 text-right text-xs font-medium text-slate-400">{field.suffix || `${field.min}–${field.max}`}</span></div>{errors[field.name] && <p id={`${field.name}-error`} className="mt-1.5 text-xs text-red-600">{errors[field.name]}</p>}</div>
    })}</div>
    <div className="mt-8 border-t border-slate-100 pt-5">{loading && <div className="mb-4"><LoadingState /></div>}<button type="submit" disabled={loading} className="button-primary w-full justify-center sm:w-auto">{loading ? 'Analyzing student performance...' : 'Predict Performance'} {!loading && <ArrowRight size={17} aria-hidden="true" />}</button></div>
  </form>
}
