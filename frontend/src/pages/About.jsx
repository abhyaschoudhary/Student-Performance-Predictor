import { ArrowDown, ArrowRight, BrainCircuit, ChartNoAxesCombined, Database, KeyRound, Lightbulb, Server, ShieldCheck, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const steps = ['Student Information', 'Machine Learning Model', 'Predicted Exam Score', 'Grade & Performance', 'AI Study Recommendations']
const features = [
  'Machine learning based performance prediction',
  'Student-specific performance dashboard',
  'Prediction history and score trend analysis',
  'Confidence score and AI-powered recommendations',
  'Multiple student management',
  'Secure user authentication',
]
const stack = [
  { label: 'Frontend', value: 'React, Vite, Tailwind CSS', icon: ChartNoAxesCombined },
  { label: 'Backend', value: 'Python, FastAPI', icon: Server },
  { label: 'Machine Learning', value: 'Scikit-learn, Pandas, Joblib', icon: BrainCircuit },
  { label: 'Database', value: 'PostgreSQL / Neon', icon: Database },
  { label: 'AI', value: 'Google Gemini API', icon: Sparkles },
]

export default function About() {
  return <main className="page-shell"><section className="max-w-3xl"><p className="eyebrow">About EduPredict AI</p><h1 className="mt-2 text-4xl font-semibold tracking-tight text-ink">Student Performance Prediction and Analysis System</h1><p className="mt-5 text-lg leading-8 text-slate-600">EduPredict AI uses machine learning to estimate student exam performance from hours studied, attendance, previous scores, sleep hours, and tutoring sessions. It turns these academic factors into clear performance insights and practical study guidance.</p></section>

    <section className="mt-12 card p-6 sm:p-8"><p className="eyebrow">How it works</p><h2 className="mt-2 text-2xl font-semibold text-ink">From student information to actionable insight</h2><div className="mt-8 flex flex-col items-center gap-3 lg:flex-row lg:justify-between">{steps.map((step, index) => <div className="contents" key={step}><div className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-center text-sm font-semibold text-slate-700 lg:w-40">{step}</div>{index < steps.length - 1 && <ArrowRight className="hidden shrink-0 text-slate-300 lg:block" size={18} aria-hidden="true" />}{index < steps.length - 1 && <ArrowDown className="text-slate-300 lg:hidden" size={18} aria-hidden="true" />}</div>)}</div></section>

    <section className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_.95fr]"><article className="card p-6 sm:p-7"><span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700"><Sparkles size={20} /></span><h2 className="mt-5 text-xl font-semibold text-ink">Key features</h2><ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">{features.map((feature) => <li key={feature} className="flex gap-3"><ShieldCheck size={17} className="mt-0.5 shrink-0 text-brand-600" />{feature}</li>)}</ul></article><article className="card p-6 sm:p-7"><span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700"><Database size={20} /></span><h2 className="mt-5 text-xl font-semibold text-ink">Technology stack</h2><dl className="mt-5 space-y-4">{stack.map(({ label, value, icon: Icon }) => <div key={label} className="flex gap-3"><Icon size={17} className="mt-0.5 shrink-0 text-brand-600" /><div><dt className="text-sm font-semibold text-ink">{label}</dt><dd className="mt-0.5 text-sm leading-5 text-slate-600">{value}</dd></div></div>)}</dl></article></section>

    <section className="mt-10 rounded-2xl border border-brand-100 bg-brand-50 p-6 sm:p-7"><div className="flex gap-3"><KeyRound className="mt-0.5 shrink-0 text-brand-700" size={20} /><div><h2 className="text-xl font-semibold text-ink">Important note</h2><p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">EduPredict AI provides an estimated prediction based on the information entered by the user. Use it as an academic support and analysis tool, not as a guaranteed examination result.</p></div></div></section>

    <section className="mt-10 rounded-2xl border border-brand-100 bg-brand-50 p-7 sm:flex sm:items-center sm:justify-between"><div><h2 className="text-xl font-semibold text-ink">Ready to explore a prediction?</h2><p className="mt-2 text-sm text-slate-600">Select a student and turn current learning factors into an informed estimate.</p></div><Link to="/predict" className="button-primary mt-5 sm:mt-0">Predict Score <ArrowRight size={17} /></Link></section></main>
}
