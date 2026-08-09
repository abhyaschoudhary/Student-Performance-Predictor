import { useState } from 'react'
import { ArrowRight, BrainCircuit, LockKeyhole, Mail } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import LoadingState from '../components/LoadingState'
import { AuthInput } from './Login'
import { getApiErrorMessage, register } from '../services/api'

export default function Register() {
  const navigate = useNavigate()
  const [values, setValues] = useState({ email: '', password: '', confirmation: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const update = (event) => setValues((current) => ({ ...current, [event.target.name]: event.target.value }))
  const submit = async (event) => {
    event.preventDefault()
    if (values.password !== values.confirmation) return setError('Passwords do not match.')
    setError('')
    setLoading(true)
    try {
      await register({ email: values.email, password: values.password })
      navigate('/login', { replace: true, state: { registered: true } })
    } catch (requestError) {
      setError(getApiErrorMessage(requestError))
    } finally {
      setLoading(false)
    }
  }
  return <main className="page-shell grid min-h-[calc(100vh-9rem)] place-items-center"><section className="card w-full max-w-md p-6 sm:p-8"><div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-600 text-white"><BrainCircuit size={22} /></div><p className="eyebrow mt-6">Get started</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">Create your account</h1><p className="mt-3 text-sm leading-6 text-slate-600">Start managing student performance insights securely.</p><form className="mt-7 space-y-5" onSubmit={submit}><ErrorMessage message={error} onDismiss={() => setError('')} /><AuthInput icon={Mail} label="Email" name="email" type="email" value={values.email} onChange={update} autoComplete="email" /><AuthInput icon={LockKeyhole} label="Password" name="password" type="password" value={values.password} onChange={update} autoComplete="new-password" minLength="8" /><AuthInput icon={LockKeyhole} label="Confirm password" name="confirmation" type="password" value={values.confirmation} onChange={update} autoComplete="new-password" minLength="8" /><button disabled={loading} className="button-primary w-full justify-center" type="submit">{loading ? 'Creating account...' : 'Create account'} {!loading && <ArrowRight size={17} />}</button>{loading && <LoadingState text="Creating your account..." />}</form><p className="mt-6 text-center text-sm text-slate-600">Already have an account? <Link className="font-semibold text-brand-700 hover:text-brand-600" to="/login">Sign in</Link></p></section></main>
}
