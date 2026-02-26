'use client'

import { Card } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, Users, BarChart3, DollarSign, BadgeCheck, Stamp, Activity } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'
import { cn } from '@/lib/utils'

const mutationData = [
  { month: 'Jan', processed: 120, pending: 45, revenue: 1.8 },
  { month: 'Feb', processed: 150, pending: 30, revenue: 2.2 },
  { month: 'Mar', processed: 180, pending: 60, revenue: 3.1 },
  { month: 'Apr', processed: 210, pending: 15, revenue: 2.8 },
  { month: 'May', processed: 190, pending: 50, revenue: 3.6 },
  { month: 'Jun', processed: 250, pending: 20, revenue: 4.2 },
]

const landClassificationData = [
  { name: 'Maira / میرہ', value: 450, color: '#2d5a4c' },
  { name: 'Chahi / چاہی', value: 280, color: '#10b981' },
  { name: 'Banjar / بنجر', value: 180, color: '#6ee7b7' },
  { name: 'Abadi / آبادی', value: 90, color: '#d1fae5' },
]

export default function AnalyticsPage() {
  const { t, isUrdu } = useLanguage()
  const dir = isUrdu ? 'rtl' : 'ltr'

  const kpis = [
    { key: 'kpi_velocity', value: '84%', sub: isUrdu ? 'اوسط: ۳.۲ دن' : 'Avg Process: 3.2 Days', icon: TrendingUp },
    { key: 'kpi_issuance', value: '12,402', sub: isUrdu ? 'دستاویزات جاری' : 'Documents Released', icon: BadgeCheck },
    { key: 'kpi_collection', value: 'PKR 850M', sub: isUrdu ? 'ہدف: ۹۲٪ حاصل' : 'Target: 92% Achieved', icon: DollarSign },
    { key: 'kpi_users', value: '45.2K', sub: isUrdu ? 'ضلع بھر میں رسائی' : 'District Wide Reach', icon: Users },
  ]

  const districts = [
    { en: 'Attock City Central', ur: 'اٹک شہر مرکزی', load: 84 },
    { en: 'Fatehjang Tehsil', ur: 'فتح جنگ تحصیل', load: 92 },
    { en: 'Pindi Gheb Branch', ur: 'پنڈی گھیب شاخ', load: 68 },
    { en: 'Hassan Abdal Port', ur: 'حسن ابدال دفتر', load: 45 },
  ]

  return (
    <div className="p-8 bg-[#f8faf9] min-h-screen" dir={dir}>

      {/* Header */}
      <div className={cn('flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6', isUrdu && 'md:flex-row-reverse')}>
        <div className={cn('flex items-center gap-4', isUrdu && 'flex-row-reverse')}>
          <div className="p-3 rounded-2xl bg-[#2d5a4c] text-white shadow-xl shadow-emerald-900/10">
            <BarChart3 className="w-8 h-8" />
          </div>
          <div className={isUrdu ? 'text-right' : ''}>
            <h1 className={cn('text-[#2d5a4c] tracking-tight', isUrdu ? 'font-urdu text-4xl' : 'text-3xl font-serif')}>
              {isUrdu ? 'تزویراتی تجزیات' : <>Strategic <span className="font-black italic">Intelligence</span></>}
            </h1>
            <p className={cn('text-[#2d5a4c]/50', isUrdu ? 'font-urdu text-base mt-1' : 'text-[10px] uppercase tracking-[0.3em] font-black')}>
              {t('ana_subtitle')}
            </p>
          </div>
        </div>
        <div className={cn('flex items-center gap-3', isUrdu && 'flex-row-reverse')}>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className={cn('text-[#2d5a4c]/40', isUrdu ? 'font-urdu text-sm' : 'text-[9px] font-black uppercase tracking-[0.2em]')}>
            {isUrdu ? 'مالی سال ۲۴–۲۵ لائیو' : 'FY 2024–25 Live Sync'}
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {kpis.map((stat, i) => (
          <Card key={i} className="p-6 bg-white border-2 border-emerald-800/5 rounded-2xl shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:scale-110 transition-transform">
              <stat.icon className="w-16 h-16 text-[#2d5a4c]" />
            </div>
            <p className={cn('text-[#2d5a4c]/40 mb-3', isUrdu ? 'font-urdu text-base text-right' : 'text-[9px] font-black uppercase tracking-widest')}>
              {t(stat.key)}
            </p>
            <p className="text-3xl font-black font-mono text-[#2d5a4c] tracking-tight mb-1">{stat.value}</p>
            <p className={cn('text-emerald-600 italic', isUrdu ? 'font-urdu text-sm text-right' : 'text-[9px] font-bold')}>{stat.sub}</p>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="p-8 bg-white border-2 border-emerald-800/5 rounded-2xl shadow-sm">
          <div className={cn('flex items-center justify-between mb-8', isUrdu && 'flex-row-reverse')}>
            <div className={isUrdu ? 'text-right' : ''}>
              <h2 className={cn('text-[#2d5a4c] mb-1', isUrdu ? 'font-urdu text-2xl' : 'text-xl font-serif italic')}>{t('chart_throughput')}</h2>
              <p className={cn('text-[#2d5a4c]/30', isUrdu ? 'font-urdu text-sm' : 'text-[9px] font-black uppercase tracking-widest')}>
                {isUrdu ? 'ماہانہ انتقالات: عمل شدہ بمقابلہ زیرِ التواء' : 'Monthly volumes processed vs pending'}
              </p>
            </div>
            <Activity className="w-6 h-6 text-[#2d5a4c]/20" />
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={mutationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8f5f0" vertical={false} />
              <XAxis dataKey="month" stroke="#2d5a4c50" fontSize={10} axisLine={false} tickLine={false} />
              <YAxis stroke="#2d5a4c50" fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '2px solid #2d5a4c10', borderRadius: '12px' }} />
              <Bar dataKey="processed" fill="#2d5a4c" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pending" fill="#2d5a4c33" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-8 bg-white border-2 border-emerald-800/5 rounded-2xl shadow-sm">
          <div className={cn('flex items-center justify-between mb-8', isUrdu && 'flex-row-reverse')}>
            <div className={isUrdu ? 'text-right' : ''}>
              <h2 className={cn('text-[#2d5a4c] mb-1', isUrdu ? 'font-urdu text-2xl' : 'text-xl font-serif italic')}>{t('chart_revenue')}</h2>
              <p className={cn('text-[#2d5a4c]/30', isUrdu ? 'font-urdu text-sm' : 'text-[9px] font-black uppercase tracking-widest')}>
                {isUrdu ? '+۱۸.۴٪ اضافہ' : '+18.4% upward trend this year'}
              </p>
            </div>
            <DollarSign className="w-6 h-6 text-emerald-500/40" />
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={mutationData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2d5a4c" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2d5a4c" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8f5f0" vertical={false} />
              <XAxis dataKey="month" stroke="#2d5a4c50" fontSize={10} axisLine={false} tickLine={false} />
              <YAxis stroke="#2d5a4c50" fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '2px solid #2d5a4c10', borderRadius: '12px' }} />
              <Area type="monotone" dataKey="revenue" stroke="#2d5a4c" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <Card className="p-8 bg-white border-2 border-emerald-800/5 rounded-2xl shadow-sm">
          <h2 className={cn('text-[#2d5a4c] mb-8', isUrdu ? 'font-urdu text-2xl text-right' : 'text-xl font-serif italic')}>{t('chart_land_mix')}</h2>
          <div className={cn('flex items-center gap-8', isUrdu && 'flex-row-reverse')}>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={landClassificationData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={4} dataKey="value">
                  {landClassificationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '2px solid #2d5a4c10', borderRadius: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 w-48 shrink-0">
              {landClassificationData.map((item, idx) => (
                <div key={idx} className={cn('flex items-center justify-between p-3 rounded-xl bg-emerald-50/30 border border-emerald-800/5', isUrdu && 'flex-row-reverse')}>
                  <div className={cn('flex items-center gap-2', isUrdu && 'flex-row-reverse')}>
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[10px] font-bold text-[#2d5a4c]/60">{item.name}</span>
                  </div>
                  <span className="text-xs font-black text-[#2d5a4c] font-mono">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-8 bg-white border-2 border-emerald-800/5 rounded-2xl shadow-sm">
          <h2 className={cn('text-[#2d5a4c] mb-8', isUrdu ? 'font-urdu text-2xl text-right' : 'text-xl font-serif italic')}>{t('chart_op_health')}</h2>
          <div className="space-y-6">
            {districts.map((d, i) => (
              <div key={i} className="space-y-2">
                <div className={cn('flex items-center justify-between', isUrdu && 'flex-row-reverse')}>
                  <span className={cn('text-[#2d5a4c]', isUrdu ? 'font-urdu text-base' : 'text-[10px] font-black uppercase tracking-widest')}>{isUrdu ? d.ur : d.en}</span>
                  <span className="text-[8px] font-black uppercase tracking-widest text-[#2d5a4c]/40">{d.load}%</span>
                </div>
                <div className="w-full h-2.5 bg-emerald-50 rounded-full overflow-hidden border border-emerald-800/5">
                  <div className="h-full bg-[#2d5a4c] rounded-full transition-all duration-1000" style={{ width: `${d.load}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-8 text-center opacity-10 pointer-events-none">
        <Stamp className="w-12 h-12 mx-auto mb-4 text-[#2d5a4c]" />
        <p className={cn('text-[#2d5a4c]', isUrdu ? 'font-urdu text-base' : 'text-[8px] font-black uppercase tracking-[0.5em]')}>
          {t('lrmis_footer')}
        </p>
      </div>
    </div>
  )
}
