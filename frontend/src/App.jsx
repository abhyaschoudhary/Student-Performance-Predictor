import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import usePrediction from './hooks/usePrediction'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Predict from './pages/Predict'

export default function App() {
  const prediction = usePrediction()
  return <div className="flex min-h-screen flex-col"><Navbar /><div className="flex-1"><Routes><Route path="/" element={<Home />} /><Route path="/predict" element={<Predict {...prediction} />} /><Route path="/dashboard" element={<Dashboard prediction={prediction.prediction} />} /><Route path="/about" element={<About />} /><Route path="*" element={<NotFound />} /></Routes></div><Footer /></div>
}
