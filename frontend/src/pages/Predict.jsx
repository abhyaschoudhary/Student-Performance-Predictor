import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import PredictionForm from '../components/PredictionForm'
import PredictionResult from '../components/PredictionResult'
import StudentManager from '../components/StudentManager'

export default function Predict({ prediction, loading, error, setError, predict }) {
  const [searchParams] = useSearchParams()
  const [students, setStudents] = useState([])
  const [studentsLoading, setStudentsLoading] = useState(false)
  const [selectedStudentId, setSelectedStudentId] = useState('')
  const onPredict = async (values) => {
    await predict(values)
  }
  return <main className="page-shell"><section className="max-w-3xl"><p className="eyebrow">Prediction workspace</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Estimate student performance</h1><p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">Choose one of your students, then provide current academic factors for a secure model prediction.</p></section><div className="mt-8"><StudentManager startAdding={searchParams.get('addStudent') === '1'} students={students} setStudents={setStudents} selectedStudentId={selectedStudentId} onSelect={setSelectedStudentId} loading={studentsLoading} setLoading={setStudentsLoading} /></div><div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,.9fr)]"><div><ErrorMessage message={error} onDismiss={() => setError('')} /><div className={error ? 'mt-4' : ''}><PredictionForm students={students} selectedStudentId={selectedStudentId} onStudentChange={setSelectedStudentId} onPredict={onPredict} loading={loading} studentsLoading={studentsLoading} /></div></div><aside className="xl:sticky xl:top-24 xl:self-start">{prediction ? <PredictionResult result={prediction.result} /> : <PredictionPreview />}</aside></div></main>
}

function PredictionPreview() { return <section className="card border-dashed p-7"><p className="eyebrow">Result preview</p><h2 className="mt-2 text-xl font-semibold text-ink">Your prediction will appear here</h2><p className="mt-3 text-sm leading-6 text-slate-600">After the model responds, this area will show the server-returned score, grade, performance, confidence, and study recommendations.</p></section> }
