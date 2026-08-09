import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { BrainCircuit, LogOut, Menu, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const publicLinks = [{ to: '/', label: 'Home' }, { to: '/about', label: 'About' }]
const privateLinks = [{ to: '/predict', label: 'Predict' }, { to: '/dashboard', label: 'Dashboard' }]
const navClass = ({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-brand-700' : 'text-slate-600 hover:text-ink'}`

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, logout, user } = useAuth()
  const navigate = useNavigate()
  const close = () => setIsOpen(false)
  const signOut = () => { logout(); close(); navigate('/') }
  const links = isAuthenticated ? [...publicLinks, ...privateLinks] : publicLinks
  return <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur"><nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8" aria-label="Main navigation"><Link to="/" className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-ink" onClick={close}><span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white"><BrainCircuit size={18} /></span>EduPredict AI</Link><div className="hidden items-center gap-7 md:flex">{links.map((link) => <NavLink key={link.to} to={link.to} className={navClass}>{link.label}</NavLink>)}{isAuthenticated ? <><span className="max-w-40 truncate text-xs text-slate-500">{user?.email}</span><button onClick={signOut} className="button-secondary text-sm"><LogOut size={16} />Sign out</button></> : <Link to="/login" className="button-primary text-sm">Sign in</Link>}</div><button type="button" className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden" aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X size={21} /> : <Menu size={21} />}</button></nav>{isOpen && <div className="border-t border-slate-100 bg-white px-5 py-4 md:hidden"><div className="mx-auto grid max-w-7xl gap-1">{links.map((link) => <NavLink key={link.to} to={link.to} className={({ isActive }) => `rounded-lg px-3 py-2.5 text-sm font-medium ${isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-700'}`} onClick={close}>{link.label}</NavLink>)}{isAuthenticated ? <button onClick={signOut} className="button-secondary mt-2 justify-center text-sm"><LogOut size={16} />Sign out</button> : <Link to="/login" className="button-primary mt-2 justify-center text-sm" onClick={close}>Sign in</Link>}</div></div>}</header>
}
