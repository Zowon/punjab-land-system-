'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Search, DollarSign, Calendar, ArrowRight, Filter,
  History, Download, ShieldCheck, Fingerprint, FileText, BadgeCheck, Scale, Stamp
} from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'
import { cn } from '@/lib/utils'

const initialTransactions = [
  { id: 'MUT-8812-X', date: '2024-01-28', descEn: 'Title Mutation - Khasra 12 (Sale)', descUr: 'انتقالِ ملکیت — خسرہ ۱۲ (فروخت)', type: 'mutation', amount: 'PKR 12.5M', officerEn: 'Assistant Commissioner', officerUr: 'اسسٹنٹ کمشنر', status: 'Verified', verification: 'NADRA-BIOM-4401' },
  { id: 'REG-9912-A', date: '2024-01-25', descEn: 'Deed Registration - Mouza Malal', descUr: 'دستاویز رجسٹریشن — موضع مالال', type: 'registration', amount: 'PKR 0.45M', officerEn: 'Sub-Registrar', officerUr: 'سب رجسٹرار', status: 'Verified', verification: 'STAMP-E-9011' },
  { id: 'SUC-1102-B', date: '2024-01-20', descEn: 'Succession Entry (Warasat)', descUr: 'وراثت اندراج', type: 'mutation', amount: 'N/A', officerEn: 'Tehsildar', officerUr: 'تحصیلدار', status: 'Pending Review', verification: 'CIV-COURT-332' },
  { id: 'TXN-0051-Z', date: '2024-01-18', descEn: 'Revenue Fee Collection - CVT', descUr: 'سرمایہ قدر محصول وصولی', type: 'fee', amount: 'PKR 125,000', officerEn: 'Revenue Officer', officerUr: 'محصول افسر', status: 'Settled', verification: 'SBP-GATE-1101' },
]

export default function TransactionsPage() {
  const { t, isUrdu } = useLanguage()
  const dir = isUrdu ? 'rtl' : 'ltr'
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filteredTransactions = initialTransactions.filter(tx => {
    const matchSearch = (isUrdu ? tx.descUr : tx.descEn).toLowerCase().includes(search.toLowerCase()) || tx.id.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || tx.type === filter
    return matchSearch && matchFilter
  })

  return (
    <div className="p-8 bg-[#f8faf9] min-h-screen" dir={dir}>

      {/* Header */}
      <div className={cn('flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6', isUrdu && 'md:flex-row-reverse')}>
        <div className={cn('flex items-center gap-4', isUrdu && 'flex-row-reverse')}>
          <div className="p-3 rounded-2xl bg-[#2d5a4c] text-white shadow-xl shadow-emerald-900/10">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className={isUrdu ? 'text-right' : ''}>
            <h1 className={cn('text-[#2d5a4c] tracking-tight', isUrdu ? 'font-urdu text-4xl' : 'text-3xl font-serif')}>
              {isUrdu ? 'آڈیٹ لکیر — ایل آر ایم آئی ایس' : <>LRMIS <span className="font-black italic">Audit Trail</span></>}
            </h1>
            <p className={cn('text-[#2d5a4c]/50', isUrdu ? 'font-urdu text-base mt-1' : 'text-[10px] uppercase tracking-[0.3em] font-black')}>
              {t('txn_subtitle')}
            </p>
          </div>
        </div>
        <div className={cn('flex gap-3', isUrdu && 'flex-row-reverse')}>
          <Button variant="outline" className={cn('h-12 px-6 border-2 border-emerald-800/10 text-[#2d5a4c] rounded-xl hover:bg-emerald-50', isUrdu ? 'font-urdu text-sm' : 'text-[9px] font-black uppercase tracking-widest')}>
            <Download className={cn('w-4 h-4', isUrdu ? 'ml-2' : 'mr-2')} /> {t('btn_export_audit')}
          </Button>
          <Button className={cn('h-12 px-6 bg-[#2d5a4c] hover:bg-[#1a382f] text-white rounded-xl shadow-lg', isUrdu ? 'font-urdu text-sm' : 'text-[9px] font-black uppercase tracking-widest')}>
            {t('btn_verify_hash')}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          { key: 'stat_verified_mut', value: '1,204', sub: isUrdu ? 'گزشتہ ۳۰ دن' : 'Last 30 Days', icon: Fingerprint },
          { key: 'stat_rev_settled', value: 'PKR 85.2M', sub: isUrdu ? 'مالی سہ ماہی ۱' : 'Fiscal Q1', icon: DollarSign },
          { key: 'stat_pending_adj', value: '420', sub: isUrdu ? 'جائزہ درکار' : 'Requires Review', icon: Scale },
          { key: 'stat_compliance', value: '99.8%', sub: isUrdu ? 'آڈیٹ اسکور' : 'Audit Score', icon: BadgeCheck },
        ].map((s, i) => (
          <Card key={i} className="p-6 bg-white border-2 border-emerald-800/5 rounded-2xl shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:scale-110 transition-transform">
              <s.icon className="w-16 h-16 text-[#2d5a4c]" />
            </div>
            <p className={cn('text-[#2d5a4c]/40 mb-3', isUrdu ? 'font-urdu text-base text-right' : 'text-[9px] font-black uppercase tracking-widest')}>{t(s.key)}</p>
            <p className="text-3xl font-black font-mono text-[#2d5a4c] mb-1">{s.value}</p>
            <p className={cn('text-emerald-600', isUrdu ? 'font-urdu text-sm text-right' : 'text-[9px] font-bold italic')}>{s.sub}</p>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className={cn('mb-8 bg-white border-2 border-emerald-800/5 rounded-2xl shadow-sm p-4 flex gap-4 items-center', isUrdu && 'flex-row-reverse')}>
        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-[#2d5a4c]">
          <Search className="w-6 h-6" />
        </div>
        <Input
          placeholder={t('search_audit')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={cn('flex-1 bg-transparent border-0 h-10 text-[#2d5a4c] focus-visible:ring-0 placeholder:text-[#2d5a4c]/30', isUrdu ? 'font-urdu text-right text-base' : 'font-bold')}
          dir={dir}
        />
        <div className={cn('flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-xl border-2 border-emerald-800/5', isUrdu && 'flex-row-reverse')}>
          <Filter className="w-4 h-4 text-[#2d5a4c]/40" />
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className={cn('bg-transparent border-none outline-none cursor-pointer text-[#2d5a4c]', isUrdu ? 'font-urdu text-base' : 'text-[9px] font-black uppercase tracking-widest')}>
            <option value="all">{t('filter_all')}</option>
            <option value="mutation">{t('filter_mutations')}</option>
            <option value="registration">{t('filter_registries')}</option>
            <option value="fee">{t('filter_revenue')}</option>
          </select>
        </div>
      </Card>

      {/* Transaction Feed */}
      <div className="space-y-4">
        {filteredTransactions.map((tx) => (
          <Card key={tx.id} className="p-6 bg-white border-2 border-emerald-800/5 rounded-2xl shadow-sm hover:shadow-lg hover:border-emerald-500/20 transition-all group">
            <div className={cn('flex flex-col lg:flex-row items-center justify-between gap-8', isUrdu && 'lg:flex-row-reverse')}>
              <div className={cn('flex items-start gap-6 flex-1', isUrdu && 'flex-row-reverse')}>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-[#2d5a4c] flex-shrink-0">
                  <History className="w-6 h-6" />
                </div>
                <div className="space-y-3 flex-1">
                  <div className={cn('flex items-center gap-3 flex-wrap', isUrdu && 'flex-row-reverse')}>
                    <h3 className={cn('text-[#2d5a4c]', isUrdu ? 'font-urdu text-xl' : 'text-base font-black')}>
                      {isUrdu ? tx.descUr : tx.descEn}
                    </h3>
                    <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${tx.status === 'Pending Review' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                      {t(tx.status === 'Pending Review' ? 'status_pending' : 'status_verified')}
                    </span>
                  </div>
                  <div className={cn('grid grid-cols-2 md:grid-cols-4 gap-4', isUrdu && 'text-right')}>
                    <div className={cn('flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-600', isUrdu && 'flex-row-reverse')}>
                      <FileText className="w-3.5 h-3.5" />{tx.id}
                    </div>
                    <div className={cn('flex items-center gap-2 text-[#2d5a4c]/40', isUrdu ? 'flex-row-reverse font-urdu text-sm' : 'text-[10px] font-bold italic')}>
                      <BadgeCheck className="w-3.5 h-3.5" />{isUrdu ? tx.officerUr : tx.officerEn}
                    </div>
                    <div className={cn('flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#2d5a4c]/30', isUrdu && 'flex-row-reverse')}>
                      <Fingerprint className="w-3.5 h-3.5" />{tx.verification}
                    </div>
                    <div className={cn('flex items-center gap-2 text-[10px] font-bold text-[#2d5a4c]/40', isUrdu && 'flex-row-reverse')}>
                      <Calendar className="w-3.5 h-3.5" />{tx.date}
                    </div>
                  </div>
                </div>
              </div>
              <div className={cn('flex items-center gap-6 pl-8 border-l border-emerald-800/5', isUrdu && 'pl-0 pr-8 border-l-0 border-r flex-row-reverse')}>
                <div className={isUrdu ? 'text-right' : ''}>
                  <p className="text-xl font-black font-mono text-[#2d5a4c] tracking-tighter">{tx.amount}</p>
                  <p className={cn('text-emerald-600', isUrdu ? 'font-urdu text-sm' : 'text-[8px] font-black uppercase tracking-widest')}>{t('status_authorized')}</p>
                </div>
                <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-2 border-emerald-800/5 hover:bg-emerald-50 text-[#2d5a4c]/40 hover:text-[#2d5a4c]">
                  <ArrowRight className={cn('w-4 h-4', isUrdu && 'rotate-180')} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center opacity-10 pointer-events-none">
        <Stamp className="w-12 h-12 mx-auto mb-4 text-[#2d5a4c]" />
        <p className={cn('text-[#2d5a4c]', isUrdu ? 'font-urdu text-base' : 'text-[8px] font-black uppercase tracking-[0.5em]')}>{t('lrmis_footer')}</p>
      </div>
    </div>
  )
}
