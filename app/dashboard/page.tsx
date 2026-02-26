'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, MapPin, DollarSign, FileText, ArrowUpRight, ArrowDownRight, Building2, Stamp } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'
import { cn } from '@/lib/utils'

const salesData = [
  { month: 'Jan', mutations: 120 },
  { month: 'Feb', mutations: 150 },
  { month: 'Mar', mutations: 180 },
  { month: 'Apr', mutations: 210 },
  { month: 'May', mutations: 190 },
  { month: 'Jun', mutations: 250 },
]

const propertyData = [
  { name: 'Maira / میرہ', value: 45 },
  { name: 'Chahi / چاہی', value: 28 },
  { name: 'Banjar / بنجر', value: 18 },
  { name: 'Abadi / آبادی', value: 9 },
]

const COLORS = ['#2d5a4c', '#10b981', '#6ee7b7', '#d1fae5']

export default function DashboardPage() {
  const { t, isUrdu } = useLanguage()

  const stats = [
    { labelKey: 'stat_assets', value: '1,248', change: '+12%', positive: true, icon: MapPin },
    { labelKey: 'stat_revenue', value: '850.4M', change: '+8.2%', positive: true, icon: DollarSign },
    { labelKey: 'stat_mutations', value: '24', change: '-3%', positive: false, icon: TrendingUp },
    { labelKey: 'stat_docs', value: '156', change: '+24%', positive: true, icon: FileText },
  ]

  const dir = isUrdu ? 'rtl' : 'ltr'

  return (
    <div className="p-8 bg-[#f8faf9] min-h-screen selection:bg-emerald-100" dir={dir}>

      {/* Header */}
      <div className={cn('flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6', isUrdu && 'md:flex-row-reverse')}>
        <div className={cn('flex items-center gap-4', isUrdu && 'flex-row-reverse')}>
          <div className="p-3 rounded-2xl bg-[#2d5a4c] text-white shadow-xl shadow-emerald-900/10">
            <Building2 className="w-8 h-8" />
          </div>
          <div className={isUrdu ? 'text-right' : ''}>
            <h1 className={cn('text-3xl text-[#2d5a4c] tracking-tight', isUrdu ? 'font-urdu text-4xl' : 'font-serif')}>
              {isUrdu ? 'مرکزِ کمانڈ — ایل آر ایم آئی ایس' : <>LRMIS <span className="font-black italic">Command Centre</span></>}
            </h1>
            <p className={cn('text-[#2d5a4c]/50', isUrdu ? 'font-urdu text-base mt-1' : 'text-[10px] uppercase tracking-[0.3em] font-black')}>
              {t('dash_subtitle')}
            </p>
          </div>
        </div>
        <div className={cn('flex items-center gap-3', isUrdu && 'flex-row-reverse')}>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className={cn('text-[#2d5a4c]/40', isUrdu ? 'font-urdu text-sm' : 'text-[9px] font-black uppercase tracking-[0.2em]')}>
            {t('live_sync')}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Card key={idx} className="p-6 bg-white border-2 border-emerald-800/5 rounded-2xl shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:scale-110 transition-transform">
                <Icon className="w-16 h-16 text-[#2d5a4c]" />
              </div>
              <p className={cn('text-[#2d5a4c]/40 mb-3', isUrdu ? 'font-urdu text-base text-right' : 'text-[9px] font-black uppercase tracking-widest')}>
                {t(stat.labelKey)}
              </p>
              <p className="text-3xl font-black font-serif italic text-[#2d5a4c] tracking-tight mb-2">{stat.value}</p>
              <div className={cn('flex items-center gap-1', isUrdu && 'flex-row-reverse')}>
                {stat.positive
                  ? <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                  : <ArrowDownRight className="w-4 h-4 text-rose-500" />
                }
                <span className={`text-xs font-black ${stat.positive ? 'text-emerald-500' : 'text-rose-500'}`}>{stat.change}</span>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <Card className="lg:col-span-2 p-8 bg-white border-2 border-emerald-800/5 rounded-2xl shadow-sm">
          <h2 className={cn('text-[#2d5a4c] mb-6', isUrdu ? 'font-urdu text-2xl text-right' : 'text-xl font-serif italic')}>
            {t('chart_mutations')}
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8f5f0" vertical={false} />
              <XAxis dataKey="month" stroke="#2d5a4c50" fontSize={10} axisLine={false} tickLine={false} />
              <YAxis stroke="#2d5a4c50" fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '2px solid #2d5a4c10', borderRadius: '12px' }} />
              <Bar dataKey="mutations" fill="#2d5a4c" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-8 bg-white border-2 border-emerald-800/5 rounded-2xl shadow-sm">
          <h2 className={cn('text-[#2d5a4c] mb-6', isUrdu ? 'font-urdu text-2xl text-right' : 'text-xl font-serif italic')}>
            {t('chart_land')}
          </h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={propertyData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                {propertyData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '2px solid #2d5a4c10', borderRadius: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 space-y-2">
            {propertyData.map((item, idx) => (
              <div key={idx} className={cn('flex items-center justify-between', isUrdu && 'flex-row-reverse')}>
                <div className={cn('flex items-center gap-2', isUrdu && 'flex-row-reverse')}>
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                  <span className="text-[10px] font-bold text-[#2d5a4c]/50">{item.name}</span>
                </div>
                <span className="text-xs font-black text-[#2d5a4c]">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-8 bg-white border-2 border-emerald-800/5 rounded-2xl shadow-sm">
        <h2 className={cn('text-[#2d5a4c] mb-6', isUrdu ? 'font-urdu text-2xl text-right' : 'text-lg font-serif italic')}>
          {t('quick_actions')}
        </h2>
        <div className={cn('flex flex-wrap gap-3', isUrdu && 'flex-row-reverse')}>
          {[
            { key: 'btn_new_property', href: '/dashboard/properties', primary: true },
            { key: 'btn_record_mutation', href: '/dashboard/ownership-transfer' },
            { key: 'btn_record_payment', href: '/dashboard/payments' },
            { key: 'btn_search_rh', href: '/dashboard/search-rightholders' },
            { key: 'btn_generate_report', href: '/dashboard/reports' },
          ].map((action) => (
            <Button
              key={action.href}
              onClick={() => window.location.href = action.href}
              className={cn(
                action.primary
                  ? 'h-12 px-8 bg-[#2d5a4c] hover:bg-[#1a382f] text-white rounded-xl shadow-lg shadow-emerald-900/10'
                  : 'h-12 px-8 bg-emerald-50 hover:bg-emerald-100 text-[#2d5a4c] rounded-xl border-2 border-emerald-800/10 transition-all',
                isUrdu ? 'font-urdu text-base' : 'font-black uppercase tracking-widest text-[10px]'
              )}
            >
              {t(action.key)}
            </Button>
          ))}
        </div>
      </Card>

      {/* Footer */}
      <div className="mt-16 text-center opacity-10 pointer-events-none">
        <Stamp className="w-12 h-12 mx-auto mb-4 text-[#2d5a4c]" />
        <p className={cn('text-[#2d5a4c]', isUrdu ? 'font-urdu text-base' : 'text-[8px] font-black uppercase tracking-[0.5em]')}>
          {t('lrmis_footer')}
        </p>
      </div>
    </div>
  )
}
