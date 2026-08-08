import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { BrainCircuit, Menu, X } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/predict', label: 'Predict' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/about', label: 'About' },
]

const navClass = ({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-brand-700' : 'text-slate-600 hover:text-ink'}`

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8" aria-label="Main navigation">
        <Link to="/" className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-ink" onClick={close}>
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white"><BrainCircuit size={18} aria-hidden="true" /></span>
          EduPredict AI
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => <NavLink key={link.to} to={link.to} className={navClass}>{link.label}</NavLink>)}
          <Link to="/predict" className="button-primary text-sm">Predict Score</Link>
        </div>
        <button type="button" className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden" aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>
      {isOpen && <div className="border-t border-slate-100 bg-white px-5 py-4 md:hidden">
        <div className="mx-auto grid max-w-7xl gap-1">
          {links.map((link) => <NavLink key={link.to} to={link.to} className={({ isActive }) => `rounded-lg px-3 py-2.5 text-sm font-medium ${isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-700'}`} onClick={close}>{link.label}</NavLink>)}
          <Link to="/predict" className="button-primary mt-2 justify-center text-sm" onClick={close}>Predict Score</Link>
        </div>
      </div>}
    </header>
  )
}
