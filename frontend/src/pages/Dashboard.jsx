import { useEffect, useState } from 'react'
import { ArrowRight, Award, BarChart3, CheckCircle2, CircleX, GraduationCap, ShieldCheck, Sparkles, TrendingUp, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import LoadingState from '../components/LoadingState'
import ScoreChart from '../components/ScoreChart'
import StatCard from '../components/StatCard'
import { getApiErrorMessage, getPredictionHistory, getScoreTrend, getStudents } from '../services/api'

const SELECTED_STUDENT_KEY = 'edupredict-dashboard-student'

export default function Dashboard() {
  const [trend, setTrend] = useState([])
  const [history, setHistory] = useState([])
  const [students, setStudents] = useState([])
  const [selectedStudentId, setSelectedStudentId] = useState(() => sessionStorage.getItem(SELECTED_STUDENT_KEY) || '')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const [scoreTrend, predictionHistory, studentList] = await Promise.all([getScoreTrend(), getPredictionHistory(), getStudents()])
      setTrend(scoreTrend)
      setHistory(predictionHistory)
      setStudents(studentList)
      setSelectedStudentId((current) => {
        const stored = current || sessionStorage.getItem(SELECTED_STUDENT_KEY)
        const next = studentList.some((student) => String(student.id) === String(stored)) ? String(stored) : String(studentList[0]?.id || '')
        if (next) sessionStorage.setItem(SELECTED_STUDENT_KEY, next)
        return next
      })
    } catch (requestError) {
      setError(getApiErrorMessage(requestError))
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => { load() }, [])
  const selectStudent = (id) => {
    setSelectedStudentId(id)
    sessionStorage.setItem(SELECTED_STUDENT_KEY, id)
  }
  if (loading) return <main className="page-shell"><LoadingState text="Loading your performance dashboard..." /></main>
  if (error) return <main className="page-shell"><ErrorMessage message={error} onDismiss={() => setError('')} /><button className="button-primary mt-5" onClick={load}>Try again</button></main>
  if (!students.length) return <main className="page-shell"><NoStudentsState /></main>

  const studentNames = Object.fromEntries(students.map((student) => [student.id, student.name]))
  const selectedId = Number(selectedStudentId)
  const selectedStudent = students.find((student) => student.id === selectedId)
  const studentHistory = history.filter((prediction) => prediction.student_id === selectedId)
  const studentTrend = trend.filter((prediction) => prediction.student_id === selectedId)
  const latest = studentHistory[0]
  const average = studentHistory.length ? studentHistory.reduce((total, prediction) => total + Number(prediction.predicted_score), 0) / studentHistory.length : null
  const passCount = studentHistory.filter((prediction) => prediction.pass_fail === 'Pass').length
  const failCount = studentHistory.filter((prediction) => prediction.pass_fail === 'Fail').length
  const cards = [
    ['Total Predictions', studentHistory.length, `${selectedStudent?.name}'s recorded predictions`, BarChart3, 'brand'],
    ['Latest Score', latest ? `${Number(latest.predicted_score).toFixed(1)} / 100` : '—', 'Most recent model result', TrendingUp, 'brand'],
    ['Latest Grade', latest?.grade || '—', 'Most recent model result', GraduationCap, 'green'],
    ['Latest Performance', latest?.performance || '—', 'Most recent model result', Sparkles, 'amber'],
    ['Confidence Score', latest ? `${Number(latest.confidence_score).toFixed(1)}%` : '—', 'Latest model confidence', ShieldCheck, 'brand'],
    ['Average Score', average === null ? '—' : `${average.toFixed(1)} / 100`, 'For the selected student', Award, 'amber'],
    ['Pass Count', passCount, 'Selected student only', CheckCircle2, 'green'],
    ['Fail Count', failCount, 'Selected student only', CircleX, 'red'],
  ]
  return <main className="page-shell"><section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><p className="eyebrow">Performance analytics</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Student performance dashboard</h1><p className="mt-3 text-base text-slate-600">Every metric below is limited to the selected student.</p></div><Link to="/predict" className="button-primary shrink-0">New prediction <ArrowRight size={17} /></Link></section><section className="card mt-7 p-5 sm:p-6"><label htmlFor="dashboard-student" className="text-sm font-semibold text-slate-700">Student</label><select id="dashboard-student" value={selectedStudentId} onChange={(event) => selectStudent(event.target.value)} className="input-field mt-2 max-w-md"><option value="">Select a student</option>{students.map((student) => <option key={student.id} value={student.id}>{student.name} · Class {student.class_name}</option>)}</select></section><section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map(([label, value, detail, icon, tone]) => <StatCard key={label} label={label} value={value} detail={detail} icon={icon} tone={tone} />)}</section><section className="mt-6"><ScoreChart trend={studentTrend} /></section><HistoryTable history={studentHistory} studentNames={studentNames} selectedStudent={selectedStudent} /></main>
}

function HistoryTable({ history, studentNames, selectedStudent }) {
  return <section className="card mt-6 overflow-hidden"><div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-5 sm:px-6"><p className="eyebrow">Prediction history</p><h2 className="text-lg font-semibold text-ink">Recent results for {selectedStudent?.name}</h2><p className="text-sm text-slate-600">Newest predictions appear first.</p></div>{!history.length ? <p className="p-6 text-sm text-slate-600">No predictions have been recorded for this student yet.</p> : <div className="overflow-x-auto"><table className="min-w-[760px] w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr>{['Date', 'Student', 'Score', 'Grade', 'Performance', 'Confidence', 'Status'].map((heading) => <th key={heading} className="px-5 py-3.5 font-semibold">{heading}</th>)}</tr></thead><tbody className="divide-y divide-slate-100">{history.map((item) => <tr key={item.id} className="text-slate-700"><td className="whitespace-nowrap px-5 py-4 text-slate-500">{new Date(item.created_at).toLocaleString()}</td><td className="px-5 py-4 font-semibold text-ink">{studentNames[item.student_id] || `Student #${item.student_id}`}</td><td className="px-5 py-4">{Number(item.predicted_score).toFixed(1)}</td><td className="px-5 py-4">{item.grade}</td><td className="px-5 py-4">{item.performance}</td><td className="px-5 py-4">{Number(item.confidence_score).toFixed(1)}%</td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.pass_fail === 'Pass' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>{item.pass_fail}</span></td></tr>)}</tbody></table></div>}</section>
}

function NoStudentsState() { return <section className="mx-auto grid min-h-[52vh] max-w-xl place-items-center text-center"><div><span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-700"><Users size={25} /></span><h1 className="mt-6 text-3xl font-semibold tracking-tight text-ink">No students added yet</h1><p className="mt-3 text-base leading-7 text-slate-600">Add a student before viewing student-specific performance insights.</p><Link to="/predict?addStudent=1" className="button-primary mt-7">Add Student <ArrowRight size={17} /></Link></div></section> }
