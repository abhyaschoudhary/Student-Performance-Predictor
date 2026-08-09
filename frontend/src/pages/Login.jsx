import { useState } from 'react'
import { ArrowRight, BrainCircuit, LockKeyhole, Mail } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import LoadingState from '../components/LoadingState'
import { useAuth } from '../context/AuthContext'
import { getApiErrorMessage } from '../services/api'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [values, setValues] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const update = (event) => setValues((current) => ({ ...current, [event.target.name]: event.target.value }))

  const submit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(values)
      navigate(location.state?.from?.pathname || '/dashboard', { replace: true })
    } catch (requestError) {
      setError(getApiErrorMessage(requestError))
    } finally {
      setLoading(false)
    }
  }

  return <main className="page-shell grid min-h-[calc(100vh-9rem)] place-items-center"><section className="card w-full max-w-md p-6 sm:p-8"><div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-600 text-white"><BrainCircuit size={22} /></div><p className="eyebrow mt-6">Welcome back</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">Sign in to your workspace</h1><p className="mt-3 text-sm leading-6 text-slate-600">Access your students, prediction history, and performance trends.</p><form className="mt-7 space-y-5" onSubmit={submit}><ErrorMessage message={error} onDismiss={() => setError('')} /><AuthInput icon={Mail} label="Email" name="email" type="email" value={values.email} onChange={update} autoComplete="email" /><AuthInput icon={LockKeyhole} label="Password" name="password" type="password" value={values.password} onChange={update} autoComplete="current-password" minLength="8" /><button disabled={loading} className="button-primary w-full justify-center" type="submit">{loading ? 'Signing in...' : 'Sign in'} {!loading && <ArrowRight size={17} />}</button>{loading && <LoadingState text="Signing you in..." />}</form><p className="mt-6 text-center text-sm text-slate-600">New to EduPredict? <Link className="font-semibold text-brand-700 hover:text-brand-600" to="/register">Create an account</Link></p></section></main>
}

export function AuthInput({ icon: Icon, label, ...props }) {
  return <label className="block"><span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"><Icon size={15} className="text-slate-400" />{label}</span><input required className="input-field" {...props} /></label>
}
