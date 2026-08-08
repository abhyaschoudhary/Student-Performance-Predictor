import { ResponsiveContainer, Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'

export default function FactorChart({ inputs }) {
  const data = [
    { factor: 'Study hours', value: inputs.hours },
    { factor: 'Attendance', value: inputs.attendance },
    { factor: 'Previous score', value: inputs.prevScore },
    { factor: 'Sleep hours', value: inputs.sleep },
    { factor: 'Tutoring', value: inputs.tutoring },
  ]
  return <section className="card p-5 sm:p-6"><div><p className="eyebrow">Input factors</p><h2 className="mt-1 text-lg font-semibold text-ink">Values used for this prediction</h2><p className="mt-1 text-xs text-slate-500">Each bar reflects the exact value submitted; units differ by factor.</p></div><div className="mt-5 h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}><CartesianGrid vertical={false} stroke="#e9eef5" /><XAxis dataKey="factor" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 11 }} interval={0} /><YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 11 }} /><Tooltip formatter={(value) => [value, 'Entered value']} cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(15,23,42,.08)' }} /><Bar dataKey="value" fill="#2674d9" radius={[5, 5, 0, 0]} maxBarSize={48} /></BarChart></ResponsiveContainer></div></section>
}
