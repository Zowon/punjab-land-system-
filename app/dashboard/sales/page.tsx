'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Plus, Search, DollarSign, TrendingUp, FileText,
  BadgeCheck, Building, UserCheck, Calendar, Stamp, ChevronDown
} from 'lucide-react'
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from '@/contexts/language-context'
import { cn } from '@/lib/utils'

const initialSales = [
  {
    id: 'S-001',
    propertyEn: 'Downtown Residential Block', propertyUr: 'ڈاؤن ٹاؤن رہائشی بلاک',
    buyerEn: 'ABC Corporation', buyerUr: 'اے بی سی کارپوریشن',
    amount: 'PKR 4,50,000',
    date: '2024-01-20',
    statusEn: 'Completed', statusUr: 'مکمل',
    agentEn: 'John Doe', agentUr: 'جان ڈو',
  },
  {
    id: 'S-002',
    propertyEn: 'Commercial Plaza', propertyUr: 'تجارتی پلازہ',
    buyerEn: 'XYZ Enterprises', buyerUr: 'ایکس وائی زیڈ انٹرپرائزز',
    amount: 'PKR 12,00,000',
    date: '2024-01-18',
    statusEn: 'Completed', statusUr: 'مکمل',
    agentEn: 'Jane Smith', agentUr: 'جین اسمتھ',
  },
  {
    id: 'S-003',
    propertyEn: 'Mixed Use Development', propertyUr: 'کثیر المقاصد ترقیاتی منصوبہ',
    buyerEn: 'Development Inc', buyerUr: 'ڈیولپمنٹ انک',
    amount: 'PKR 28,00,000',
    date: '2024-01-15',
    statusEn: 'Pending', statusUr: 'زیرِ التواء',
    agentEn: 'Mike Johnson', agentUr: 'مائیک جانسن',
  },
  {
    id: 'S-004',
    propertyEn: 'Industrial Warehouse', propertyUr: 'صنعتی گودام',
    buyerEn: 'Logistics Co', buyerUr: 'لاجسٹکس کمپنی',
    amount: 'PKR 6,50,000',
    date: '2024-01-12',
    statusEn: 'In Progress', statusUr: 'جاری',
    agentEn: 'Sarah Wilson', agentUr: 'سارہ ولسن',
  },
]

const statusStyle: Record<string, { bg: string; text: string }> = {
  'Completed': { bg: 'bg-emerald-500/10', text: 'text-emerald-600' },
  'In Progress': { bg: 'bg-sky-500/10', text: 'text-sky-600' },
  'Pending': { bg: 'bg-amber-500/10', text: 'text-amber-600' },
}

const statusOptions = [
  { en: 'Pending', ur: 'زیرِ التواء' },
  { en: 'In Progress', ur: 'جاری' },
  { en: 'Completed', ur: 'مکمل' },
]

export default function SalesPage() {
  const { t, isUrdu } = useLanguage()
  const dir = isUrdu ? 'rtl' : 'ltr'

  const [search, setSearch] = useState('')
  const [sales, setSales] = useState(initialSales)
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({ property: '', buyer: '', amount: '', status: 'Pending' })

  const filteredSales = sales.filter(s =>
    s.propertyEn.toLowerCase().includes(search.toLowerCase()) ||
    s.propertyUr.includes(search) ||
    s.buyerEn.toLowerCase().includes(search.toLowerCase()) ||
    s.buyerUr.includes(search)
  )

  const handleRecordSale = (e: React.FormEvent) => {
    e.preventDefault()
    const newSale = {
      ...formData,
      id: `S-00${sales.length + 1}`,
      propertyEn: formData.property, propertyUr: formData.property,
      buyerEn: formData.buyer, buyerUr: formData.buyer,
      agentEn: 'Active User', agentUr: 'فعال صارف',
      statusUr: statusOptions.find(s => s.en === formData.status)?.ur || '',
      date: new Date().toISOString().split('T')[0],
    }
    setSales([newSale as any, ...sales])
    setIsOpen(false)
    setFormData({ property: '', buyer: '', amount: '', status: 'Pending' })
  }

  const completedCount = sales.filter(s => s.statusEn === 'Completed').length
  const successRate = ((completedCount / sales.length) * 100).toFixed(0)

  const stats = [
    {
      labelEn: 'Total Sales Volume', labelUr: 'کل فروخت حجم',
      value: sales.length,
      subEn: '+12% from last month', subUr: 'گزشتہ ماہ سے +۱۲٪',
      icon: TrendingUp, color: 'text-[#2d5a4c]',
    },
    {
      labelEn: 'Gross Revenue', labelUr: 'مجموعی آمدنی',
      value: 'PKR 51.0L',
      subEn: 'Accumulated platform sales', subUr: 'مجموعی پلیٹ فارم فروخت',
      icon: DollarSign, color: 'text-emerald-600',
    },
    {
      labelEn: 'Success Rate', labelUr: 'کامیابی کی شرح',
      value: `${successRate}%`,
      subEn: 'Conversion from lead to sale', subUr: 'لیڈ سے فروخت تک تبدیلی',
      icon: UserCheck, color: 'text-sky-600',
    },
  ]

  const tableHeaders = [
    { en: 'Sale Entity', ur: 'فروخت ادارہ' },
    { en: 'Property Details', ur: 'جائیداد کی تفصیل' },
    { en: 'Sales Agent', ur: 'سیلز ایجنٹ' },
    { en: 'Amount', ur: 'رقم' },
    { en: 'Status', ur: 'حیثیت' },
    { en: 'Documents', ur: 'دستاویزات' },
  ]

  return (
    <div className="p-8 bg-[#f8faf9] min-h-screen selection:bg-emerald-100" dir={dir}>

      {/* Header */}
      <div className={cn('flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6', isUrdu && 'md:flex-row-reverse')}>
        <div className={cn('flex items-center gap-4', isUrdu && 'flex-row-reverse')}>
          <div className="p-3 rounded-2xl bg-[#2d5a4c] text-white shadow-xl shadow-emerald-900/10">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div className={isUrdu ? 'text-right' : ''}>
            <h1 className={cn('text-[#2d5a4c] tracking-tight', isUrdu ? 'font-urdu text-4xl' : 'text-3xl font-serif')}>
              {isUrdu ? 'اراضی فروخت کا نظام' : <>Sales <span className="font-black italic">Management</span></>}
            </h1>
            <p className={cn('text-[#2d5a4c]/50', isUrdu ? 'font-urdu text-base mt-1' : 'text-[10px] uppercase tracking-[0.3em] font-black')}>
              {isUrdu ? 'جائیداد کی فروخت اور خریدار کی تفصیل' : 'Monitor property sales performance and buyer interactions'}
            </p>
          </div>
        </div>

        {/* Record Sale Modal */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className={cn('h-14 px-8 bg-[#2d5a4c] hover:bg-[#1a382f] text-white rounded-xl shadow-xl shadow-emerald-900/10', isUrdu ? 'font-urdu text-lg flex-row-reverse gap-2' : 'font-black uppercase tracking-widest text-[10px]')}>
              <Plus className={cn('w-4 h-4', isUrdu ? 'ml-1' : 'mr-2')} />
              {isUrdu ? 'نئی فروخت ریکارڈ کریں' : 'Record New Sale'}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[560px] bg-white border-0 p-0 overflow-hidden rounded-3xl shadow-2xl" dir={dir}>
            <div className="bg-[#2d5a4c] p-8 text-white">
              <DialogHeader>
                <DialogTitle className={cn('text-white mb-1', isUrdu ? 'font-urdu text-3xl text-right' : 'text-3xl font-serif italic')}>
                  {isUrdu ? 'جائیداد فروخت ریکارڈ' : 'Record Property Sale'}
                </DialogTitle>
                <DialogDescription className={cn('text-white/50', isUrdu ? 'font-urdu text-base text-right' : 'text-[9px] font-black uppercase tracking-[0.3em]')}>
                  {isUrdu ? 'نئی فروخت کی تفصیل درج کریں' : 'Input transaction details for a new property sale.'}
                </DialogDescription>
              </DialogHeader>
            </div>
            <form onSubmit={handleRecordSale} className="p-8 space-y-6">
              <div className="space-y-2">
                <Label className={cn('text-[#2d5a4c]/60 block', isUrdu ? 'font-urdu text-base text-right' : 'text-[10px] font-black uppercase tracking-widest')}>
                  {isUrdu ? 'جائیداد کا نام' : 'Property Name'}
                </Label>
                <Input
                  placeholder={isUrdu ? 'جائیداد منتخب کریں...' : 'Select property...'}
                  value={formData.property}
                  onChange={e => setFormData({ ...formData, property: e.target.value })}
                  required
                  className={cn('h-14 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl', isUrdu ? 'font-urdu text-right text-base' : 'font-bold')}
                  dir={dir}
                />
              </div>
              <div className="space-y-2">
                <Label className={cn('text-[#2d5a4c]/60 block', isUrdu ? 'font-urdu text-base text-right' : 'text-[10px] font-black uppercase tracking-widest')}>
                  {isUrdu ? 'خریدار / ادارہ' : 'Buyer Name / Entity'}
                </Label>
                <Input
                  placeholder={isUrdu ? 'مکمل نام یا ادارے کا نام...' : 'Full name or company...'}
                  value={formData.buyer}
                  onChange={e => setFormData({ ...formData, buyer: e.target.value })}
                  required
                  className={cn('h-14 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl', isUrdu ? 'font-urdu text-right text-base' : 'font-bold')}
                  dir={dir}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className={cn('text-[#2d5a4c]/60 block', isUrdu ? 'font-urdu text-base text-right' : 'text-[10px] font-black uppercase tracking-widest')}>
                    {isUrdu ? 'فروخت رقم (PKR)' : 'Sale Amount (PKR)'}
                  </Label>
                  <Input
                    type="number"
                    placeholder="e.g. 500000"
                    value={formData.amount}
                    onChange={e => setFormData({ ...formData, amount: e.target.value })}
                    required
                    className="h-12 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl font-mono font-bold"
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <Label className={cn('text-[#2d5a4c]/60 block', isUrdu ? 'font-urdu text-base text-right' : 'text-[10px] font-black uppercase tracking-widest')}>
                    {isUrdu ? 'فروخت کی حیثیت' : 'Sale Status'}
                  </Label>
                  <div className="relative">
                    <select
                      className={cn('w-full h-12 px-4 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl appearance-none', isUrdu ? 'font-urdu text-base text-right' : 'font-bold text-xs text-[#2d5a4c]')}
                      value={formData.status}
                      onChange={e => setFormData({ ...formData, status: e.target.value })}
                    >
                      {statusOptions.map(opt => (
                        <option key={opt.en} value={opt.en}>{isUrdu ? opt.ur : opt.en}</option>
                      ))}
                    </select>
                    <ChevronDown className={cn('absolute top-1/2 -translate-y-1/2 w-4 h-4 text-[#2d5a4c]/40 pointer-events-none', isUrdu ? 'left-3' : 'right-3')} />
                  </div>
                </div>
              </div>
              <DialogFooter className="pt-4 border-t border-emerald-800/5">
                <Button type="submit" className={cn('w-full h-14 bg-[#2d5a4c] hover:bg-[#1a382f] text-white rounded-xl shadow-xl shadow-emerald-900/10', isUrdu ? 'font-urdu text-lg' : 'font-black uppercase tracking-widest text-[10px]')}>
                  {isUrdu ? 'فروخت ریکارڈ محفوظ کریں' : 'Process Sale Record'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, i) => (
          <Card key={i} className="p-6 bg-white border-2 border-emerald-800/5 rounded-2xl shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:scale-110 transition-transform">
              <stat.icon className="w-16 h-16 text-[#2d5a4c]" />
            </div>
            <p className={cn('text-[#2d5a4c]/40 mb-3', isUrdu ? 'font-urdu text-base text-right' : 'text-[9px] font-black uppercase tracking-widest')}>
              {isUrdu ? stat.labelUr : stat.labelEn}
            </p>
            <p className={cn('mb-2 font-mono font-black', stat.color, isUrdu ? 'text-3xl text-right' : 'text-4xl')}>
              {stat.value}
            </p>
            <div className={cn('flex items-center gap-1 text-emerald-500', isUrdu && 'flex-row-reverse justify-end')}>
              <BadgeCheck className="w-4 h-4" />
              <span className={cn(isUrdu ? 'font-urdu text-sm' : 'text-xs font-bold')}>
                {isUrdu ? stat.subUr : stat.subEn}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Search */}
      <Card className={cn('mb-8 bg-white border-2 border-emerald-800/5 rounded-2xl p-4 flex items-center gap-4 shadow-sm', isUrdu && 'flex-row-reverse')}>
        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-[#2d5a4c]">
          <Search className="w-6 h-6" />
        </div>
        <Input
          placeholder={isUrdu ? 'جائیداد، خریدار یا ایجنٹ سے تلاش کریں...' : 'Search by property, buyer, or agent...'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={cn('flex-1 bg-transparent border-0 h-10 text-[#2d5a4c] focus-visible:ring-0 placeholder:text-[#2d5a4c]/30', isUrdu ? 'font-urdu text-right text-base' : 'font-bold')}
          dir={dir}
        />
        <div className={cn('px-4 text-[#2d5a4c]/40 whitespace-nowrap', isUrdu ? 'border-r border-emerald-800/10 font-urdu text-base' : 'border-l border-emerald-800/10 text-[10px] font-black uppercase tracking-widest')}>
          {filteredSales.length} {isUrdu ? 'ریکارڈز' : 'Records'}
        </div>
      </Card>

      {/* Table */}
      <Card className="bg-white border-2 border-emerald-800/5 rounded-3xl shadow-xl shadow-emerald-900/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" dir={dir}>
            <thead>
              <tr className="bg-[#2d5a4c]/5 border-b border-emerald-800/10">
                {tableHeaders.map((h, i) => (
                  <th key={i} className={cn('px-6 py-5 text-[#2d5a4c]/60', isUrdu ? 'font-urdu text-base text-right' : 'text-[10px] font-black uppercase tracking-widest text-left', i === tableHeaders.length - 1 && (isUrdu ? 'text-left' : 'text-right'))}>
                    {isUrdu ? h.ur : h.en}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredSales.map((sale) => (
                <tr key={sale.id} className="border-b border-emerald-800/5 hover:bg-emerald-50/30 transition-all">

                  {/* Buyer */}
                  <td className="px-6 py-5">
                    <div className={cn('flex items-center gap-3', isUrdu && 'flex-row-reverse')}>
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center font-black text-[#2d5a4c] text-sm flex-shrink-0">
                        {(isUrdu ? sale.buyerUr : sale.buyerEn).charAt(0)}
                      </div>
                      <div className={isUrdu ? 'text-right' : ''}>
                        <p className={cn('text-[#2d5a4c]', isUrdu ? 'font-urdu text-base' : 'font-bold text-sm')}>{isUrdu ? sale.buyerUr : sale.buyerEn}</p>
                        <p className={cn('text-[#2d5a4c]/40 font-mono', isUrdu ? 'text-sm' : 'text-[10px] font-bold uppercase tracking-widest')}>{sale.id}</p>
                      </div>
                    </div>
                  </td>

                  {/* Property */}
                  <td className="px-6 py-5">
                    <div className={cn('flex items-center gap-2 text-[#2d5a4c] mb-1', isUrdu && 'flex-row-reverse')}>
                      <Building className="w-4 h-4 text-[#2d5a4c]/30 flex-shrink-0" />
                      <span className={cn(isUrdu ? 'font-urdu text-base' : 'font-bold text-sm')}>{isUrdu ? sale.propertyUr : sale.propertyEn}</span>
                    </div>
                    <div className={cn('flex items-center gap-1 text-[#2d5a4c]/40', isUrdu && 'flex-row-reverse')}>
                      <Calendar className="w-3.5 h-3.5" />
                      <span className={cn(isUrdu ? 'font-urdu text-sm' : 'text-xs font-bold')}>
                        {isUrdu ? `تاریخ: ${sale.date}` : `Executed: ${sale.date}`}
                      </span>
                    </div>
                  </td>

                  {/* Agent */}
                  <td className="px-6 py-5">
                    <p className={cn('text-[#2d5a4c]', isUrdu ? 'font-urdu text-base text-right' : 'text-sm font-bold')}>{isUrdu ? sale.agentUr : sale.agentEn}</p>
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-5">
                    <p className={cn('text-emerald-600 font-mono font-black tracking-tighter', isUrdu ? 'text-xl text-right' : 'text-lg')}>{sale.amount}</p>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <Badge className={cn('border-0', statusStyle[sale.statusEn]?.bg, statusStyle[sale.statusEn]?.text, isUrdu ? 'font-urdu text-base px-3 py-1' : 'text-[10px] font-black tracking-widest uppercase px-3 py-1')}>
                      {isUrdu ? sale.statusUr : sale.statusEn}
                    </Badge>
                  </td>

                  {/* Documents */}
                  <td className="px-6 py-5">
                    <div className={cn('flex', isUrdu ? 'justify-start' : 'justify-end')}>
                      <Button size="sm" variant="ghost" className={cn('text-[#2d5a4c] hover:bg-emerald-50 group', isUrdu ? 'font-urdu text-sm flex-row-reverse gap-1' : 'text-[10px] font-black uppercase tracking-widest')}>
                        <FileText className={cn('w-4 h-4 group-hover:scale-110 transition-transform', isUrdu ? 'ml-1' : 'mr-2')} />
                        {isUrdu ? 'ای-رسید' : 'E-Receipt'}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Footer Stamp */}
      <div className="mt-16 text-center opacity-10 pointer-events-none">
        <Stamp className="w-12 h-12 mx-auto mb-4 text-[#2d5a4c]" />
        <p className={cn('text-[#2d5a4c]', isUrdu ? 'font-urdu text-base' : 'text-[8px] font-black uppercase tracking-[0.5em]')}>
          {t('lrmis_footer')}
        </p>
      </div>

    </div>
  )
}
