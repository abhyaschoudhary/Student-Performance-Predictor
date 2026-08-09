import { useState } from 'react'
import { ArrowRight, CalendarCheck2, Clock3, FileText, MessagesSquare, Moon, Sparkles } from 'lucide-react'
import { fields, initialValues, validatePrediction } from '../utils/predictionUtils'
import LoadingState from './LoadingState'

const icons = { Clock3, CalendarCheck2, FileText, Moon, MessagesSquare }

export default function PredictionForm({ students, selectedStudentId, onStudentChange, onPredict, loading, studentsLoading }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const updateValue = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined, schedule: undefined }))
  }
  const submit = async (event) => {
    event.preventDefault()
    const requestValues = { ...values, student_id: Number(selectedStudentId) || '' }
    const nextErrors = validatePrediction(requestValues)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    await onPredict(Object.fromEntries(Object.entries(requestValues).map(([key, value]) => [key, Number(value)])))
  }
  return <form onSubmit={submit} noValidate className="card p-5 sm:p-7"><div className="mb-7 flex items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700"><Sparkles size={20} /></span><div><h2 className="text-lg font-semibold text-ink">Student learning profile</h2><p className="mt-1 text-sm text-slate-500">Use the selected student and current learning factors to request a model prediction.</p></div></div>
    <div className="mb-6"><label htmlFor="student_id" className="text-sm font-semibold text-slate-700">Student</label><select id="student_id" value={selectedStudentId || ''} onChange={(event) => { onStudentChange(event.target.value); setErrors((current) => ({ ...current, student_id: undefined })) }} disabled={studentsLoading || !students.length} className={`input-field mt-3 ${errors.student_id ? 'border-red-400 ring-2 ring-red-100' : ''}`} aria-invalid={Boolean(errors.student_id)}><option value="">{studentsLoading ? 'Loading students...' : students.length ? 'Select a student' : 'Add a student to continue'}</option>{students.map((student) => <option key={student.id} value={student.id}>{student.name} · Class {student.class_name}</option>)}</select>{errors.student_id && <p className="mt-1.5 text-xs text-red-600">{errors.student_id}</p>}</div>
    <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">{fields.map((field) => { const Icon = icons[field.icon]; return <div key={field.name} className={field.name === 'tutoring_sessions' ? 'sm:col-span-2' : ''}><label htmlFor={field.name} className="flex items-center gap-2 text-sm font-semibold text-slate-700"><Icon size={15} className="text-slate-400" />{field.label}</label><p className="mt-1 text-xs text-slate-500">{field.helper}</p><div className="mt-3 flex items-center gap-3"><input id={field.name} type="number" min={field.min} max={field.max} step={field.step} value={values[field.name]} onChange={(event) => updateValue(field.name, event.target.value)} className={`input-field ${errors[field.name] ? 'border-red-400 ring-2 ring-red-100' : ''}`} aria-invalid={Boolean(errors[field.name])} /><span className="w-12 text-right text-xs font-medium text-slate-400">{field.suffix || `${field.min}–${field.max}`}</span></div>{errors[field.name] && <p className="mt-1.5 text-xs text-red-600">{errors[field.name]}</p>}</div> })}</div>
    {errors.schedule && <p className="mt-5 text-sm text-red-600">{errors.schedule}</p>}<div className="mt-8 border-t border-slate-100 pt-5">{loading && <div className="mb-4"><LoadingState /></div>}<button type="submit" disabled={loading || studentsLoading || !students.length} className="button-primary w-full justify-center sm:w-auto">{loading ? 'Analyzing student performance...' : 'Predict Performance'} {!loading && <ArrowRight size={17} />}</button></div>
  </form>
}
