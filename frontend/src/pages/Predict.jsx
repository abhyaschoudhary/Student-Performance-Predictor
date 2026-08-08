import { useNavigate } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import PredictionForm from '../components/PredictionForm'
import PredictionResult from '../components/PredictionResult'

export default function Predict({ prediction, loading, error, setError, predict }) {
  const navigate = useNavigate()
  const onPredict = async (values) => {
    const completed = await predict(values)
    if (completed) navigate('/dashboard')
  }
  return <main className="page-shell"><section className="max-w-3xl"><p className="eyebrow">Prediction workspace</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Estimate student performance</h1><p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">Provide a few current academic factors. Your form is securely sent to the local machine learning API for a real prediction.</p></section><div className="mt-9 grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,.9fr)]"><div><ErrorMessage message={error} onDismiss={() => setError('')} /><div className={error ? 'mt-4' : ''}><PredictionForm onPredict={onPredict} loading={loading} /></div></div><aside className="xl:sticky xl:top-24 xl:self-start">{prediction ? <PredictionResult result={prediction.result} /> : <PredictionPreview />}</aside></div></main>
}

function PredictionPreview() { return <section className="card border-dashed p-7"><p className="eyebrow">Result preview</p><h2 className="mt-2 text-xl font-semibold text-ink">Your prediction will appear here</h2><p className="mt-3 text-sm leading-6 text-slate-600">After the model responds, this area will show the predicted score, returned grade, performance label, and the frontend pass/fail status.</p><div className="mt-7 space-y-3">{['Predicted Score', 'Grade and Performance', 'Performance Summary'].map((item) => <div className="flex items-center gap-3" key={item}><span className="h-2 w-2 rounded-full bg-brand-400" /><span className="text-sm text-slate-600">{item}</span></div>)}</div></section> }
