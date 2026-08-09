import { useEffect, useState } from 'react'
import { Plus, Users } from 'lucide-react'
import ErrorMessage from './ErrorMessage'
import LoadingState from './LoadingState'
import { createStudent, getApiErrorMessage, getStudents } from '../services/api'

export default function StudentManager({ startAdding = false, students, setStudents, selectedStudentId, onSelect, loading, setLoading }) {
  const [isAdding, setIsAdding] = useState(startAdding)
  const [values, setValues] = useState({ name: '', age: '', class_name: '' })
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    setLoading(true)
    getStudents().then((data) => {
      if (!active) return
      setStudents(data)
      if (data.length && !selectedStudentId) onSelect(String(data[0].id))
    }).catch((requestError) => active && setError(getApiErrorMessage(requestError))).finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  const submit = async (event) => {
    event.preventDefault()
    const age = Number(values.age)
    if (!values.name.trim() || !values.class_name.trim() || !Number.isInteger(age) || age < 1 || age > 120) return setError('Enter a student name, whole-number age, and class.')
    setError('')
    setLoading(true)
    try {
      const student = await createStudent({ name: values.name.trim(), age, class_name: values.class_name.trim() })
      setStudents((current) => [...current, student])
      onSelect(String(student.id))
      setValues({ name: '', age: '', class_name: '' })
      setIsAdding(false)
    } catch (requestError) {
      setError(getApiErrorMessage(requestError))
    } finally {
      setLoading(false)
    }
  }

  return <section className="card p-5 sm:p-6"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="eyebrow">Student management</p><h2 className="mt-1 text-lg font-semibold text-ink">Your students</h2><p className="mt-1 text-sm text-slate-600">Choose the student this prediction belongs to.</p></div><button type="button" className="button-secondary shrink-0" onClick={() => setIsAdding((current) => !current)}><Plus size={17} />{isAdding ? 'Cancel' : 'Add student'}</button></div>{error && <div className="mt-4"><ErrorMessage message={error} onDismiss={() => setError('')} /></div>}{loading && <div className="mt-4"><LoadingState text="Loading your students..." /></div>}{!loading && students.length > 0 && <div className="mt-5 flex flex-wrap gap-2">{students.map((student) => <button key={student.id} type="button" onClick={() => onSelect(String(student.id))} className={`rounded-lg border px-3 py-2 text-left text-sm transition ${String(student.id) === String(selectedStudentId) ? 'border-brand-200 bg-brand-50 text-brand-700' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'}`}><span className="font-semibold">{student.name}</span><span className="ml-2 text-xs opacity-75">Class {student.class_name}</span></button>)}</div>}{!loading && !students.length && !isAdding && <div className="mt-5 flex items-center gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600"><Users size={18} className="text-slate-400" />Add your first student to enable predictions.</div>}{isAdding && <form onSubmit={submit} className="mt-5 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-3"><label className="text-sm font-semibold text-slate-700">Name<input required value={values.name} onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))} className="input-field mt-2" /></label><label className="text-sm font-semibold text-slate-700">Age<input required type="number" min="1" max="120" step="1" value={values.age} onChange={(event) => setValues((current) => ({ ...current, age: event.target.value }))} className="input-field mt-2" /></label><label className="text-sm font-semibold text-slate-700">Class<input required value={values.class_name} onChange={(event) => setValues((current) => ({ ...current, class_name: event.target.value }))} placeholder="e.g. 10A" className="input-field mt-2" /></label><div className="sm:col-span-3"><button disabled={loading} className="button-primary" type="submit">Save student</button></div></form>}</section>
}
