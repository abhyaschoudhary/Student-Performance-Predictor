import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import usePrediction from './hooks/usePrediction'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Predict from './pages/Predict'
import Register from './pages/Register'

export default function App() {
  return <AuthProvider><AppRoutes /></AuthProvider>
}

function AppRoutes() {
  const prediction = usePrediction()
  const protectedPage = (page) => <ProtectedRoute>{page}</ProtectedRoute>
  return <div className="flex min-h-screen flex-col"><Navbar /><div className="flex-1"><Routes><Route path="/" element={<Home />} /><Route path="/login" element={<Login />} /><Route path="/register" element={<Register />} /><Route path="/predict" element={protectedPage(<Predict {...prediction} />)} /><Route path="/dashboard" element={protectedPage(<Dashboard />)} /><Route path="/about" element={<About />} /><Route path="*" element={<NotFound />} /></Routes></div><Footer /></div>
}
