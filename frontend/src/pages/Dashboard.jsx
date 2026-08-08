import { ArrowRight, CalendarCheck2, Clock3, FileText, GraduationCap, MessagesSquare, Moon, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import FactorChart from '../components/FactorChart'
import ScoreChart from '../components/ScoreChart'
import StatCard from '../components/StatCard'
import { getPredictionStatus, getScoreState } from '../utils/predictionUtils'

export default function Dashboard({ prediction }) {
  if (!prediction) return <main className="page-shell"><EmptyState /></main>
  const { result, inputs } = prediction
  const score = Number(result.predicted_score)
  const state = getScoreState(score)
  const status = getPredictionStatus(score)
  return <main className="page-shell"><section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="eyebrow">Prediction analytics</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Latest prediction overview</h1><p className="mt-3 text-base text-slate-600">Charts below use the submitted inputs and the model’s actual response.</p></div><Link to="/predict" className="button-secondary shrink-0">New prediction <ArrowRight size={17} /></Link></section><section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Prediction Score" value={`${score.toFixed(1)} / 100`} detail={state.label} icon={TrendingUp} tone="brand" /><StatCard label="Grade" value={result.grade} detail="Returned by the API" icon={GraduationCap} tone="green" /><StatCard label="Performance" value={result.performance} detail="Returned by the API" icon={TrendingUp} tone="amber" /><StatCard label="Prediction Status" value={status} detail="Pass threshold: 40 / 100" icon={status === 'Pass' ? GraduationCap : TrendingUp} tone={status === 'Pass' ? 'green' : 'red'} /></section><section className="mt-6 grid gap-6 xl:grid-cols-2"><ScoreChart score={score} /><FactorChart inputs={inputs} /></section><section className="mt-6"><div className="mb-4"><p className="eyebrow">Submitted factors</p><h2 className="mt-1 text-lg font-semibold text-ink">Data used in this request</h2></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"><StatCard label="Study Hours" value={inputs.hours} icon={Clock3} /><StatCard label="Attendance" value={`${inputs.attendance}%`} icon={CalendarCheck2} /><StatCard label="Previous Score" value={inputs.prevScore} icon={FileText} /><StatCard label="Sleep Hours" value={inputs.sleep} icon={Moon} /><StatCard label="Tutoring Sessions" value={inputs.tutoring} icon={MessagesSquare} /></div></section></main>
}

function EmptyState() { return <section className="mx-auto grid min-h-[52vh] max-w-xl place-items-center text-center"><div><span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-700"><TrendingUp size={25} /></span><h1 className="mt-6 text-3xl font-semibold tracking-tight text-ink">No prediction available</h1><p className="mt-3 text-base leading-7 text-slate-600">Complete a prediction to view your analytics.</p><Link to="/predict" className="button-primary mt-7">Make a prediction <ArrowRight size={17} /></Link></div></section> }
