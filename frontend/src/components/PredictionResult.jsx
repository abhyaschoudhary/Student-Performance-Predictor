import { Award, CheckCircle2, CircleAlert, GraduationCap, Lightbulb, ShieldCheck, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getScoreState } from '../utils/predictionUtils'

function recommendationItems(recommendations) {
  return String(recommendations || '').split('\n').map((item) => item.trim().replace(/^\d+[.)]\s*/, '')).filter(Boolean)
}

export default function PredictionResult({ result }) {
  const score = Number(result.predicted_score)
  const state = getScoreState(score)
  const status = result.pass_fail || '—'
  const gaugeStyle = { background: `conic-gradient(${state.color} ${score * 3.6}deg, #e8edf3 0deg)` }
  return <section className="card overflow-hidden"><div className="border-b border-slate-100 px-5 py-4 sm:px-6"><p className="eyebrow">Prediction result</p><h2 className="mt-1 text-lg font-semibold text-ink">Your model-generated estimate</h2></div><div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[150px_1fr]"><div className="mx-auto grid h-36 w-36 place-items-center rounded-full p-2" style={gaugeStyle}><div className="grid h-full w-full place-items-center rounded-full bg-white text-center"><span className="text-3xl font-semibold tracking-tight text-ink">{score.toFixed(1)}</span><span className="text-xs font-medium text-slate-500">out of 100</span></div></div><div><div className="grid grid-cols-2 gap-3"><ResultMetric icon={Award} label="Grade" value={result.grade} /><ResultMetric icon={TrendingUp} label="Performance" value={result.performance} /><ResultMetric icon={ShieldCheck} label="Confidence" value={`${Number(result.confidence_score).toFixed(1)}%`} /><ResultMetric icon={status === 'Pass' ? CheckCircle2 : CircleAlert} label="Status" value={status} /></div></div></div><div className="border-t border-slate-100 bg-slate-50/70 px-5 py-5 sm:px-6"><div className="flex gap-3"><Lightbulb className="mt-0.5 shrink-0 text-brand-600" size={18} /><div><h3 className="text-sm font-semibold text-ink">AI Study Recommendations</h3><ol className="mt-2 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-600">{recommendationItems(result.recommendations).map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ol><Link to="/dashboard" className="button-primary mt-5">View Dashboard</Link></div></div></div></section>
}
function ResultMetric({ icon: Icon, label, value }) { return <div className="rounded-xl border border-slate-100 bg-white p-3.5"><div className="flex items-center gap-2 text-xs font-medium text-slate-500"><Icon size={15} className="text-brand-600" />{label}</div><p className="mt-2 text-lg font-semibold text-ink">{value}</p></div> }
