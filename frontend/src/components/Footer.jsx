import { Link } from 'react-router-dom'

export default function Footer() {
  return <footer className="border-t border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-8">
    <div><p className="font-semibold text-ink">EduPredict AI</p><p className="mt-1 text-slate-500">Student Performance Prediction using Machine Learning</p></div>
    <nav className="flex flex-wrap gap-x-5 gap-y-2 text-slate-600" aria-label="Footer navigation">{['Home', 'Predict', 'Dashboard', 'About'].map((item) => <Link key={item} to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="hover:text-brand-700">{item}</Link>)}</nav>
  </div></footer>
}
