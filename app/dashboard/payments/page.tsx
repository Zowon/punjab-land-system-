'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Search, Receipt, AlertCircle, Clock,
  ArrowRight, Plus, FileText, ShieldCheck,
  Building2, Calendar, Download, Stamp, ChevronDown
} from 'lucide-react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useLanguage } from '@/contexts/language-context'
import { cn } from '@/lib/utils'

const initialPayments = [
  { id: 'TR-1082', reference: 'MUT-FE-4509', type: 'mutation', property: 'Khasra 12, Mouza Dharri / خسرہ ۱۲، موضع دھاڑی', amount: 'PKR 15,000', paidDate: '2024-01-25', payer: 'Ali Ahmed / علی احمد', status: 'Settled', method: 'National Bank / قومی بینک' },
  { id: 'TR-1083', reference: 'STP-DT-9912', type: 'stamp', property: 'Khasra 104, Mouza Malal / خسرہ ۱۰۴، موضع مالال', amount: 'PKR 450,000', paidDate: '2024-01-28', payer: 'Hassan Khan / حسن خان', status: 'Settled', method: 'E-Pay Punjab' },
  { id: 'TR-1084', reference: 'CVT-PR-3321', type: 'cvt', property: 'Khasra 12, Mouza Dharri / خسرہ ۱۲، موضع دھاڑی', amount: 'PKR 125,000', paidDate: null, payer: 'Fatima Ali / فاطمہ علی', status: 'Overdue', method: 'Pending' },
]

const statusConfig: Record<string, { bg: string; text: string; icon: any }> = {
  'Settled': { bg: 'bg-emerald-50', text: 'text-emerald-600', icon: ShieldCheck },
  'Processing': { bg: 'bg-sky-50', text: 'text-sky-600', icon: Clock },
  'Overdue': { bg: 'bg-rose-50', text: 'text-rose-500', icon: AlertCircle },
}

export default function PaymentsPage() {
  const { t, isUrdu } = useLanguage()
  const dir = isUrdu ? 'rtl' : 'ltr'
  const [search, setSearch] = useState('')
  const [payments, setPayments] = useState(initialPayments)
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({ payer: '', amount: '', type: 'Mutation Fee', property: '', status: 'Processing' })

  const filteredPayments = payments.filter(p =>
    p.reference.toLowerCase().includes(search.toLowerCase()) ||
    p.payer.toLowerCase().includes(search.toLowerCase()) ||
    p.property.toLowerCase().includes(search.toLowerCase())
  )

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault()
    const newPayment = {
      ...formData,
      id: `TR-${1080 + payments.length + 1}`,
      reference: `FE-${Math.floor(Math.random() * 9000) + 1000}`,
      amount: `PKR ${parseFloat(formData.amount).toLocaleString()}`,
      paidDate: new Date().toISOString().split('T')[0],
      method: 'National Bank',
    }
    setPayments([newPayment as any, ...payments])
    setIsOpen(false)
    setFormData({ payer: '', amount: '', type: 'Mutation Fee', property: '', status: 'Processing' })
  }

  const feeTypes = [
    t('fee_mutation'), t('fee_stamp'), t('fee_cvt'), t('fee_reg')
  ]

  return (
    <div className="p-8 bg-[#f8faf9] min-h-screen" dir={dir}>

      {/* Header */}
      <div className={cn('flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6', isUrdu && 'md:flex-row-reverse')}>
        <div className={cn('flex items-center gap-4', isUrdu && 'flex-row-reverse')}>
          <div className="p-3 rounded-2xl bg-[#2d5a4c] text-white shadow-xl shadow-emerald-900/10">
            <Receipt className="w-8 h-8" />
          </div>
          <div className={isUrdu ? 'text-right' : ''}>
            <h1 className={cn('text-[#2d5a4c] tracking-tight', isUrdu ? 'font-urdu text-4xl' : 'text-3xl font-serif')}>
              {isUrdu ? 'سرکاری محاصل بہی' : <>Government <span className="font-black italic">Revenue Ledger</span></>}
            </h1>
            <p className={cn('text-[#2d5a4c]/50', isUrdu ? 'font-urdu text-base mt-1' : 'text-[10px] uppercase tracking-[0.3em] font-black')}>
              {t('pay_subtitle')}
            </p>
          </div>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className={cn('h-14 px-8 bg-[#2d5a4c] hover:bg-[#1a382f] text-white rounded-xl shadow-xl shadow-emerald-900/10', isUrdu ? 'font-urdu text-lg flex-row-reverse' : 'font-black uppercase tracking-widest text-[10px]')}>
              <Plus className={cn('w-4 h-4', isUrdu ? 'ml-2' : 'mr-2')} />
              {t('btn_gen_voucher')}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] bg-white border-0 p-0 overflow-hidden rounded-3xl shadow-2xl" dir={dir}>
            <div className="bg-[#2d5a4c] p-8 text-white">
              <DialogHeader>
                <DialogTitle className={cn('mb-1', isUrdu ? 'font-urdu text-3xl text-right' : 'text-3xl font-serif italic')}>
                  {isUrdu ? 'نیا محاصل اندراج' : 'New Revenue Entry'}
                </DialogTitle>
              </DialogHeader>
            </div>
            <form onSubmit={handleRecordPayment} className="p-8 space-y-6">
              <div className="space-y-2">
                <Label className={cn('text-[#2d5a4c]/60 block', isUrdu ? 'font-urdu text-base text-right' : 'text-[10px] font-black uppercase tracking-widest')}>{t('field_payer')}</Label>
                <Input value={formData.payer} onChange={e => setFormData({ ...formData, payer: e.target.value })} required className={cn('h-14 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl', isUrdu ? 'text-right font-urdu' : 'font-bold')} />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className={cn('text-[#2d5a4c]/60 block', isUrdu ? 'font-urdu text-base text-right' : 'text-[10px] font-black uppercase tracking-widest')}>{t('field_fee_cat')}</Label>
                  <div className="relative">
                    <select className={cn('w-full h-14 px-4 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl appearance-none', isUrdu ? 'font-urdu text-base text-right' : 'font-bold text-xs text-[#2d5a4c]')} value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                      {feeTypes.map(f => <option key={f}>{f}</option>)}
                    </select>
                    <ChevronDown className={cn('absolute top-1/2 -translate-y-1/2 w-4 h-4 text-[#2d5a4c]/40 pointer-events-none', isUrdu ? 'left-4' : 'right-4')} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className={cn('text-[#2d5a4c]/60 block', isUrdu ? 'font-urdu text-base text-right' : 'text-[10px] font-black uppercase tracking-widest')}>{t('field_amount')}</Label>
                  <Input type="number" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} required className="h-14 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl font-mono font-black text-lg" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className={cn('text-[#2d5a4c]/60 block', isUrdu ? 'font-urdu text-base text-right' : 'text-[10px] font-black uppercase tracking-widest')}>{t('field_asset')}</Label>
                <Input value={formData.property} onChange={e => setFormData({ ...formData, property: e.target.value })} required className={cn('h-14 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl', isUrdu ? 'text-right font-urdu' : 'font-bold')} />
              </div>
              <DialogFooter>
                <Button type="submit" className={cn('w-full h-14 bg-[#2d5a4c] hover:bg-[#1a382f] text-white rounded-xl shadow-xl shadow-emerald-900/10', isUrdu ? 'font-urdu text-lg' : 'font-black uppercase tracking-widest text-[10px]')}>
                  {t('btn_authorize_voucher')}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          { key: 'stat_settled', value: 'PKR 12.8M', icon: ShieldCheck },
          { key: 'stat_outstanding', value: 'PKR 1.2M', icon: Clock },
          { key: 'stat_overdue', value: '09', icon: AlertCircle },
          { key: 'stat_health_idx', value: '94%', icon: Receipt },
        ].map((s, i) => (
          <Card key={i} className="p-6 bg-white border-2 border-emerald-800/5 rounded-2xl shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:scale-110 transition-transform">
              <s.icon className="w-16 h-16 text-[#2d5a4c]" />
            </div>
            <p className={cn('text-[#2d5a4c]/40 mb-3', isUrdu ? 'font-urdu text-base text-right' : 'text-[9px] font-black uppercase tracking-widest')}>{t(s.key)}</p>
            <p className="text-3xl font-black font-mono text-[#2d5a4c] tracking-tight">{s.value}</p>
          </Card>
        ))}
      </div>

      {/* Search */}
      <Card className={cn('mb-8 bg-white border-2 border-emerald-800/5 rounded-2xl shadow-sm p-4 flex gap-4 items-center', isUrdu && 'flex-row-reverse')}>
        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-[#2d5a4c]">
          <Search className="w-6 h-6" />
        </div>
        <Input placeholder={t('search_payments')} value={search} onChange={(e) => setSearch(e.target.value)} className={cn('flex-1 bg-transparent border-0 h-10 text-[#2d5a4c] focus-visible:ring-0 placeholder:text-[#2d5a4c]/30', isUrdu ? 'font-urdu text-right text-base' : 'font-bold')} dir={dir} />
        <Button variant="outline" className={cn('h-11 px-6 border-2 border-emerald-800/10 text-[#2d5a4c] rounded-xl hover:bg-emerald-50', isUrdu ? 'font-urdu text-sm' : 'text-[9px] font-black uppercase tracking-widest')}>
          <Download className={cn('w-4 h-4', isUrdu ? 'ml-2' : 'mr-2')} /> {t('btn_export')}
        </Button>
      </Card>

      {/* Payments List */}
      <div className="space-y-4">
        {filteredPayments.map((payment) => {
          const Config = statusConfig[payment.status] || statusConfig['Processing']
          const Icon = Config.icon
          return (
            <Card key={payment.id} className="p-6 bg-white border-2 border-emerald-800/5 rounded-2xl shadow-sm hover:shadow-lg hover:border-emerald-500/20 transition-all group">
              <div className={cn('flex flex-col md:flex-row items-center justify-between gap-6', isUrdu && 'md:flex-row-reverse')}>
                <div className={cn('flex items-center gap-6 flex-1', isUrdu && 'flex-row-reverse')}>
                  <div className={`w-14 h-14 rounded-2xl ${Config.bg} ${Config.text} flex items-center justify-center`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <div className={cn('flex items-center gap-3 mb-2', isUrdu && 'flex-row-reverse')}>
                      <h3 className={cn('text-[#2d5a4c]', isUrdu ? 'font-urdu text-xl' : 'text-lg font-black')}>{payment.payer}</h3>
                      <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${Config.bg} ${Config.text}`}>
                        {t(`status_${payment.status.toLowerCase().replace(' ', '_')}`) || payment.status}
                      </span>
                    </div>
                    <div className={cn('grid grid-cols-2 md:grid-cols-3 gap-4', isUrdu && 'text-right')}>
                      <div className={cn('flex items-center gap-2 text-[10px] font-bold text-[#2d5a4c]/50', isUrdu && 'flex-row-reverse')}>
                        <FileText className="w-3.5 h-3.5" /><span className="font-mono">{payment.reference}</span>
                      </div>
                      <div className={cn('flex items-center gap-2 text-[10px] font-bold text-[#2d5a4c]/50 italic', isUrdu && 'flex-row-reverse')}>
                        <Building2 className="w-3.5 h-3.5" />{payment.property}
                      </div>
                      <div className={cn('flex items-center gap-2 text-[10px] font-bold text-[#2d5a4c]/40', isUrdu && 'flex-row-reverse')}>
                        <Calendar className="w-3.5 h-3.5" />{payment.paidDate || 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cn('flex items-center gap-8 pl-8 border-l border-emerald-800/5', isUrdu && 'pl-0 pr-8 border-l-0 border-r flex-row-reverse')}>
                  <div className={isUrdu ? 'text-right' : ''}>
                    <p className="text-xl font-black font-mono text-emerald-600 tracking-tighter">{payment.amount}</p>
                    <p className={cn('text-[#2d5a4c]/30', isUrdu ? 'font-urdu text-sm' : 'text-[8px] font-black uppercase tracking-widest')}>{payment.method}</p>
                  </div>
                  <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-2 border-emerald-800/5 hover:bg-emerald-50 text-[#2d5a4c]/40 hover:text-[#2d5a4c]">
                    <ArrowRight className={cn('w-4 h-4', isUrdu && 'rotate-180')} />
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="mt-16 text-center opacity-10 pointer-events-none">
        <Stamp className="w-12 h-12 mx-auto mb-4 text-[#2d5a4c]" />
        <p className={cn('text-[#2d5a4c]', isUrdu ? 'font-urdu text-base' : 'text-[8px] font-black uppercase tracking-[0.5em]')}>{t('lrmis_footer')}</p>
      </div>
    </div>
  )
}
