'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Search, ArrowRight, MapPin, FileText, Plus,
  History, ShieldCheck, Download, Building2, Users,
  Fingerprint, Stamp, ArrowLeft, ChevronDown
} from 'lucide-react'
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { useLanguage } from '@/contexts/language-context'
import { cn } from '@/lib/utils'

const initialTransferData = [
  {
    id: 'T-001',
    khasraNumber: '12',
    mouzaEn: 'Dharri Rai Ditta', mouzaUr: 'دھاڑی رائے دِتہ',
    tehsilEn: 'Fatehjang', tehsilUr: 'فتح جنگ',
    districtEn: 'Attock', districtUr: 'اٹک',
    sellerEn: 'Ali Ahmed', sellerUr: 'علی احمد',
    buyerEn: 'Hassan Khan', buyerUr: 'حسن خان',
    transferDate: '2024-01-15',
    amount: 'PKR 2,500,000',
    status: 'completed',
    typeEn: 'Sale', typeUr: 'فروخت',
  },
  {
    id: 'T-002',
    khasraNumber: '104',
    mouzaEn: 'Malal', mouzaUr: 'مالال',
    tehsilEn: 'Fatehjang', tehsilUr: 'فتح جنگ',
    districtEn: 'Attock', districtUr: 'اٹک',
    sellerEn: 'Ali Ahmed', sellerUr: 'علی احمد',
    buyerEn: 'Fatima Ali', buyerUr: 'فاطمہ علی',
    transferDate: '2024-02-10',
    amount: 'PKR 3,200,000',
    status: 'completed',
    typeEn: 'Gift', typeUr: 'ہبہ',
  },
]

export default function OwnershipTransferPage() {
  const { t, isUrdu } = useLanguage()
  const dir = isUrdu ? 'rtl' : 'ltr'

  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false)
  const [transferSteps, setTransferSteps] = useState(1)
  const [searchType, setSearchType] = useState('khasra')

  const steps = isUrdu ? [
    { id: 1, label: 'شناخت کی تصدیق' },
    { id: 2, label: 'اثاثے کا انتخاب' },
    { id: 3, label: 'قدر اور نوعیت' },
    { id: 4, label: 'رجسٹری جائزہ' },
  ] : [
    { id: 1, label: 'Identity Verification' },
    { id: 2, label: 'Asset Selection' },
    { id: 3, label: 'Valuation & Type' },
    { id: 4, label: 'Registry Review' },
  ]

  const searchTabs = isUrdu
    ? [
      { key: 'khasra', label: 'خسرہ تلاش' },
      { key: 'khewat', label: 'خیوات تلاش' },
      { key: 'identity', label: 'شناخت تلاش' },
    ]
    : [
      { key: 'khasra', label: 'Khasra Search' },
      { key: 'khewat', label: 'Khewat Search' },
      { key: 'identity', label: 'Identity Search' },
    ]

  const districts = [
    { en: 'Attock', ur: 'اٹک' },
    { en: 'Rawalpindi', ur: 'راولپنڈی' },
  ]
  const tehsils = [
    { en: 'Fatehjang', ur: 'فتح جنگ' },
    { en: 'Pindi Gheb', ur: 'پنڈی گھیب' },
  ]
  const mouzas = [
    { en: 'Dharri Rai Ditta', ur: 'دھاڑی رائے دِتہ' },
    { en: 'Malal', ur: 'مالال' },
  ]

  const healthStats = isUrdu ? [
    { label: 'کل انتقالات (مالی سال ۲۴)', value: '12,402', sub: 'گزشتہ سہ ماہی سے +۱۲٪' },
    { label: 'اوسط وقت', value: '۳.۲ دن', sub: 'ہدف: ۵ دن سے کم' },
    { label: 'مصدقہ اجراء', value: '98.4%', sub: 'شہری اطمینان' },
  ] : [
    { label: 'Total Mutations (FY24)', value: '12,402', sub: '+12% from last quarter' },
    { label: 'Avg processing time', value: '3.2 Days', sub: 'Target: < 5 Days' },
    { label: 'Certified issuance', value: '98.4%', sub: 'Citizen satisfaction rate' },
  ]

  return (
    <div className="p-8 bg-[#f8faf9] min-h-screen selection:bg-emerald-100" dir={dir}>

      {/* Header */}
      <div className={cn('flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6', isUrdu && 'md:flex-row-reverse')}>
        <div className={cn('flex items-center gap-4', isUrdu && 'flex-row-reverse')}>
          <div className="p-3 rounded-2xl bg-[#2d5a4c] text-white shadow-xl shadow-emerald-900/10">
            <Building2 className="w-8 h-8" />
          </div>
          <div className={isUrdu ? 'text-right' : ''}>
            <h1 className={cn('text-[#2d5a4c] tracking-tight', isUrdu ? 'font-urdu text-4xl' : 'text-3xl font-serif')}>
              {isUrdu ? 'مرکزِ انتقالِ ملکیت' : <>Ownership <span className="font-black italic">Mutation Hub</span></>}
            </h1>
            <p className={cn('text-[#2d5a4c]/50', isUrdu ? 'font-urdu text-base mt-1' : 'text-[10px] uppercase tracking-[0.3em] font-black')}>
              {t('own_subtitle')}
            </p>
          </div>
        </div>

        <Button
          onClick={() => { setIsTransferModalOpen(true); setTransferSteps(1) }}
          className={cn('h-14 px-8 bg-[#2d5a4c] hover:bg-[#1a382f] text-white rounded-xl shadow-xl shadow-emerald-900/10', isUrdu ? 'font-urdu text-lg flex-row-reverse gap-2' : 'font-black uppercase tracking-widest text-[10px]')}
        >
          <Plus className={cn('w-4 h-4', isUrdu ? 'ml-1' : 'mr-2')} />
          {t('btn_new_mutation')}
        </Button>
      </div>

      {/* Tabbed Search */}
      <Card className="mb-10 bg-white border-2 border-emerald-800/5 rounded-2xl shadow-xl shadow-emerald-900/5 overflow-hidden">
        <div className={cn('bg-[#2d5a4c]/5 border-b border-emerald-800/5 flex', isUrdu && 'flex-row-reverse')}>
          {searchTabs.map((tab) => (
            <button
              key={tab.key}
              className={cn(
                'px-8 py-4 transition-all border-emerald-800/5',
                isUrdu ? 'border-l font-urdu text-base' : 'border-r text-[10px] font-black uppercase tracking-widest',
                searchType === tab.key
                  ? 'bg-white text-[#2d5a4c] border-b-2 border-b-[#2d5a4c]'
                  : 'text-[#2d5a4c]/40 hover:bg-emerald-50'
              )}
              onClick={() => setSearchType(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className={cn('p-8 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6 items-end', isUrdu && 'direction-rtl')}>

          {/* District */}
          <div className="space-y-2">
            <Label className={cn('text-[#2d5a4c]/60 block', isUrdu ? 'font-urdu text-base text-right' : 'text-[9px] font-black uppercase tracking-widest')}>
              {t('field_district')}
            </Label>
            <div className="relative">
              <select className={cn('w-full h-11 px-3 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl appearance-none focus:outline-none focus:border-emerald-500 transition-all', isUrdu ? 'font-urdu text-base text-right' : 'font-bold text-xs text-[#2d5a4c]')}>
                {districts.map(d => <option key={d.en}>{isUrdu ? d.ur : d.en}</option>)}
              </select>
              <ChevronDown className={cn('absolute top-1/2 -translate-y-1/2 w-3 h-3 text-[#2d5a4c]/40 pointer-events-none', isUrdu ? 'left-3' : 'right-3')} />
            </div>
          </div>

          {/* Tehsil */}
          <div className="space-y-2">
            <Label className={cn('text-[#2d5a4c]/60 block', isUrdu ? 'font-urdu text-base text-right' : 'text-[9px] font-black uppercase tracking-widest')}>
              {t('field_tehsil')}
            </Label>
            <div className="relative">
              <select className={cn('w-full h-11 px-3 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl appearance-none focus:outline-none focus:border-emerald-500 transition-all', isUrdu ? 'font-urdu text-base text-right' : 'font-bold text-xs text-[#2d5a4c]')}>
                {tehsils.map(t => <option key={t.en}>{isUrdu ? t.ur : t.en}</option>)}
              </select>
              <ChevronDown className={cn('absolute top-1/2 -translate-y-1/2 w-3 h-3 text-[#2d5a4c]/40 pointer-events-none', isUrdu ? 'left-3' : 'right-3')} />
            </div>
          </div>

          {/* Mouza */}
          <div className="space-y-2">
            <Label className={cn('text-[#2d5a4c]/60 block', isUrdu ? 'font-urdu text-base text-right' : 'text-[9px] font-black uppercase tracking-widest')}>
              {t('field_mouza')}
            </Label>
            <div className="relative">
              <select className={cn('w-full h-11 px-3 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl appearance-none focus:outline-none focus:border-emerald-500 transition-all', isUrdu ? 'font-urdu text-base text-right' : 'font-bold text-xs text-[#2d5a4c]')}>
                {mouzas.map(m => <option key={m.en}>{isUrdu ? m.ur : m.en}</option>)}
              </select>
              <ChevronDown className={cn('absolute top-1/2 -translate-y-1/2 w-3 h-3 text-[#2d5a4c]/40 pointer-events-none', isUrdu ? 'left-3' : 'right-3')} />
            </div>
          </div>

          {/* Search ID Input */}
          <div className="space-y-2">
            <Label className={cn('text-[#2d5a4c]/60 block', isUrdu ? 'font-urdu text-base text-right' : 'text-[9px] font-black uppercase tracking-widest')}>
              {isUrdu
                ? (searchType === 'khasra' ? 'خسرہ نمبر درج کریں' : searchType === 'khewat' ? 'خیوات نمبر درج کریں' : 'شناختی کارڈ')
                : `Enter ${searchType} ID`
              }
            </Label>
            <Input
              placeholder={searchType === 'khasra' ? (isUrdu ? 'مثال: ۱۲/۴' : 'e.g. 12/4') : (isUrdu ? 'مثال: 35202-0000000-1' : 'e.g. 35202-0000000-1')}
              className={cn('h-11 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl focus:border-emerald-500 transition-all', isUrdu ? 'font-urdu text-right text-base' : 'font-bold text-xs')}
              dir="ltr"
            />
          </div>

          {/* Search Button */}
          <Button className={cn('h-11 bg-[#2d5a4c] hover:bg-[#1a382f] text-white rounded-xl group transition-all', isUrdu ? 'font-urdu text-base flex-row-reverse gap-2' : 'font-black uppercase tracking-widest text-[9px]')}>
            {t('btn_execute_search')}
            <Search className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
          </Button>
        </div>
      </Card>

      {/* Mutation Records */}
      <div className="space-y-6">
        <div className={cn('flex items-center justify-between px-2', isUrdu && 'flex-row-reverse')}>
          <h2 className={cn('text-[#2d5a4c]', isUrdu ? 'font-urdu text-2xl' : 'text-xl font-serif italic')}>
            {t('mutation_records')}
          </h2>
          <div className={cn('flex items-center gap-2', isUrdu && 'flex-row-reverse')}>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className={cn('text-[#2d5a4c]/40', isUrdu ? 'font-urdu text-sm' : 'text-[9px] font-black uppercase tracking-[0.2em]')}>
              {isUrdu ? 'لائیو آڈیٹ سنک' : 'Live Audit Syncing'}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {initialTransferData.map((item) => (
            <Card key={item.id} className="p-6 bg-white border-2 border-emerald-800/5 rounded-2xl shadow-sm hover:shadow-lg hover:border-emerald-500/20 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                <Stamp className="w-24 h-24" />
              </div>

              {/* Parties Row */}
              <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10', isUrdu && '[direction:rtl]')}>

                {/* Buyer — shown first in LTR, last in RTL */}
                <div className={cn('space-y-1', isUrdu ? 'text-right md:order-3' : '')}>
                  <p className={cn('text-[#2d5a4c]/40', isUrdu ? 'font-urdu text-sm' : 'text-[8px] font-black uppercase tracking-widest')}>
                    {t('transferee')}
                  </p>
                  <p className={cn('text-[#2d5a4c]', isUrdu ? 'font-urdu text-xl' : 'text-lg font-black')}>
                    {isUrdu ? item.buyerUr : item.buyerEn}
                  </p>
                  <p className={cn('text-emerald-600 italic', isUrdu ? 'font-urdu text-sm' : 'text-[9px] font-bold')}>
                    {isUrdu ? 'بایومیٹرک سے تصدیق شدہ' : 'Authenticated via Biometric'}
                  </p>
                </div>

                {/* Transaction Type Centre */}
                <div className="flex flex-col items-center justify-center p-4 bg-emerald-50/30 rounded-2xl border border-emerald-800/5">
                  <div className={cn('flex items-center gap-3 mb-1', isUrdu && 'flex-row-reverse')}>
                    <span className={cn('text-[#2d5a4c]', isUrdu ? 'font-urdu text-xl' : 'text-[10px] font-black uppercase tracking-widest')}>
                      {isUrdu ? item.typeUr : item.typeEn}
                    </span>
                    <ArrowRight className={cn('w-4 h-4 text-emerald-500 group-hover:translate-x-1 transition-transform', isUrdu && 'rotate-180 group-hover:-translate-x-1')} />
                  </div>
                  <p className={cn('text-[#2d5a4c]/40', isUrdu ? 'font-urdu text-sm' : 'text-[8px] font-black uppercase tracking-[0.2em]')}>
                    {isUrdu ? 'لین دین پروٹوکول' : 'Transaction Protocol'}
                  </p>
                </div>

                {/* Seller — shown last in LTR, first in RTL */}
                <div className={cn('space-y-1', isUrdu ? 'text-right md:order-1' : 'md:text-right')}>
                  <p className={cn('text-[#2d5a4c]/40', isUrdu ? 'font-urdu text-sm' : 'text-[8px] font-black uppercase tracking-widest')}>
                    {t('transferor')}
                  </p>
                  <p className={cn('text-[#2d5a4c]', isUrdu ? 'font-urdu text-xl' : 'text-lg font-black')}>
                    {isUrdu ? item.sellerUr : item.sellerEn}
                  </p>
                  <p className={cn('text-emerald-600 italic', isUrdu ? 'font-urdu text-sm' : 'text-[9px] font-bold')}>
                    {isUrdu ? 'تصدیق شدہ عنوان مالک' : 'Verified Title Holder'}
                  </p>
                </div>
              </div>

              {/* Footer Row */}
              <div className={cn('mt-8 pt-6 border-t border-emerald-800/5 flex flex-col md:flex-row items-center justify-between gap-6', isUrdu && 'md:flex-row-reverse')}>
                <div className={cn('flex gap-8', isUrdu && 'flex-row-reverse')}>
                  <div className={cn('flex flex-col', isUrdu && 'items-end')}>
                    <span className={cn('text-[#2d5a4c]/30', isUrdu ? 'font-urdu text-sm' : 'text-[8px] font-black uppercase tracking-widest')}>
                      {isUrdu ? 'مقامِ اثاثہ' : 'Asset Location'}
                    </span>
                    <span className={cn('text-[#2d5a4c]', isUrdu ? 'font-urdu text-base' : 'text-[10px] font-black')}>
                      {isUrdu
                        ? `${item.mouzaUr}، خسرہ ${item.khasraNumber}`
                        : `${item.mouzaEn}, Khasra ${item.khasraNumber}`}
                    </span>
                  </div>
                  <div className={cn('flex flex-col', isUrdu && 'items-end')}>
                    <span className={cn('text-[#2d5a4c]/30', isUrdu ? 'font-urdu text-sm' : 'text-[8px] font-black uppercase tracking-widest')}>
                      {isUrdu ? 'قدر' : 'Valuation'}
                    </span>
                    <span className="text-[10px] font-black text-emerald-600 italic tracking-tighter">{item.amount}</span>
                  </div>
                </div>

                <div className={cn('flex gap-3', isUrdu && 'flex-row-reverse')}>
                  <Button variant="outline" className={cn('h-10 px-6 border-2 border-emerald-800/10 text-[#2d5a4c] hover:bg-emerald-50 rounded-xl', isUrdu ? 'font-urdu text-sm flex-row-reverse gap-2' : 'text-[10px] font-black uppercase tracking-widest')}>
                    <FileText className={cn('w-3.5 h-3.5', isUrdu ? 'ml-1' : 'mr-2')} />
                    {t('view_deed')}
                  </Button>
                  <Button className={cn('h-10 px-6 bg-[#2d5a4c] hover:bg-[#1a382f] text-white shadow-lg shadow-emerald-900/10 rounded-xl', isUrdu ? 'font-urdu text-sm flex-row-reverse gap-2' : 'text-[10px] font-black uppercase tracking-widest')}>
                    <Download className={cn('w-3.5 h-3.5', isUrdu ? 'ml-1' : 'mr-2')} />
                    {t('certificate')}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Registry Health Panel */}
      <div className="mt-10">
        <Card className="p-8 bg-[#2d5a4c] text-white rounded-3xl relative overflow-hidden shadow-2xl shadow-emerald-900/20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
          <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-10', isUrdu && 'direction-rtl')}>
            <div className={cn('md:col-span-1', isUrdu && 'text-right')}>
              <h3 className={cn('mb-6 flex items-center gap-3', isUrdu ? 'font-urdu text-2xl flex-row-reverse' : 'text-sm font-black uppercase tracking-[0.2em]')}>
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                {t('registry_health')}
              </h3>
              <div className={cn('flex items-center gap-3 opacity-40', isUrdu && 'flex-row-reverse')}>
                <Users className="w-4 h-4" />
                <p className={cn(isUrdu ? 'font-urdu text-sm' : 'text-[8px] font-black uppercase tracking-widest leading-relaxed')}>
                  {isUrdu
                    ? 'نظام ڈائریکٹر اراضی ریکارڈ اتھارٹی کے زیرِ انتظام'
                    : 'System maintained by Director Land Records Authority'}
                </p>
              </div>
            </div>
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {healthStats.map((stat, i) => (
                <div key={i} className={cn('space-y-1', isUrdu && 'text-right')}>
                  <p className={cn('text-white/40', isUrdu ? 'font-urdu text-sm' : 'text-[8px] font-black uppercase tracking-widest')}>{stat.label}</p>
                  <p className={cn('text-2xl font-black tracking-tighter', isUrdu ? 'font-urdu text-3xl' : 'font-serif italic')}>{stat.value}</p>
                  <p className={cn('text-emerald-400', isUrdu ? 'font-urdu text-sm' : 'text-[8px] font-bold')}>{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Mutation Wizard Modal */}
      <Dialog open={isTransferModalOpen} onOpenChange={setIsTransferModalOpen}>
        <DialogContent className="sm:max-w-[700px] bg-white border-0 p-0 overflow-hidden rounded-3xl shadow-2xl" dir={dir}>
          <div className="bg-[#2d5a4c] p-8 text-white relative">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24" />
            <DialogHeader>
              <div className={cn('flex items-center gap-2 mb-2', isUrdu && 'flex-row-reverse')}>
                {[1, 2, 3, 4].map(s => (
                  <div key={s} className={`h-1.5 rounded-full transition-all duration-500 ${transferSteps >= s ? 'bg-emerald-400 w-16' : 'bg-white/20 w-10'}`} />
                ))}
              </div>
              <DialogTitle className={cn('text-white mb-1', isUrdu ? 'font-urdu text-3xl text-right' : 'text-3xl font-serif italic')}>
                {steps[transferSteps - 1].label}
              </DialogTitle>
              <DialogDescription className={cn('text-white/50', isUrdu ? 'font-urdu text-base text-right' : 'text-[9px] font-black uppercase tracking-[0.3em]')}>
                {isUrdu
                  ? `سرکاری انتقال وزرڈ — مرحلہ ${transferSteps} از ۴`
                  : `Official Title Mutation Wizard Step ${transferSteps} of 4`}
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="p-8 min-h-[400px]">
            {/* Step 1 — Identity */}
            {transferSteps === 1 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className={cn('grid grid-cols-2 gap-10', isUrdu && '[direction:rtl]')}>
                  <div className="space-y-4">
                    <Label className={cn('text-[#2d5a4c]/60 block', isUrdu ? 'font-urdu text-base text-right' : 'text-[10px] font-black uppercase tracking-widest')}>
                      {isUrdu ? 'فروخت کنندہ / منتقل' : 'Seller / Transferor'}
                    </Label>
                    <div className="space-y-4">
                      <Input placeholder={isUrdu ? 'مکمل قانونی نام' : 'Full Legal Name'} className={cn('h-14 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl', isUrdu ? 'font-urdu text-right text-base' : 'font-bold')} dir={dir} />
                      <Input placeholder="CNIC: 00000-0000000-0" className="h-14 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl font-mono tracking-widest" dir="ltr" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label className={cn('text-[#2d5a4c]/60 block', isUrdu ? 'font-urdu text-base text-right' : 'text-[10px] font-black uppercase tracking-widest')}>
                      {isUrdu ? 'خریدار / منتقل الیہ' : 'Buyer / Transferee'}
                    </Label>
                    <div className="space-y-4">
                      <Input placeholder={isUrdu ? 'مکمل قانونی نام' : 'Full Legal Name'} className={cn('h-14 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl', isUrdu ? 'font-urdu text-right text-base' : 'font-bold')} dir={dir} />
                      <Input placeholder="CNIC: 00000-0000000-0" className="h-14 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl font-mono tracking-widest" dir="ltr" />
                    </div>
                  </div>
                </div>
                <div className={cn('p-6 rounded-2xl bg-[#2d5a4c]/5 border-2 border-dashed border-emerald-800/10 flex items-start gap-4', isUrdu && 'flex-row-reverse')}>
                  <Fingerprint className="w-8 h-8 text-[#2d5a4c] opacity-40 shrink-0" />
                  <p className={cn('text-[#2d5a4c]/60 italic leading-relaxed', isUrdu ? 'font-urdu text-base text-right' : 'text-[10px] font-bold')}>
                    {isUrdu
                      ? 'بایومیٹرک تصدیق دونوں فریقین کے لیے لازمی ہے۔ آخری مرحلے میں NADRA سے محفوظ رابطہ قائم کیا جائے گا۔'
                      : 'Biometric verification is MANDATORY for both parties. System will trigger a secure NADRA handshake in the final step.'}
                  </p>
                </div>
              </div>
            )}

            {/* Step 2 — Asset Selection */}
            {transferSteps === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className={cn('grid grid-cols-2 gap-6', isUrdu && '[direction:rtl]')}>
                  <div className="space-y-2">
                    <Label className={cn('text-[#2d5a4c]/60 block', isUrdu ? 'font-urdu text-base text-right' : 'text-[10px] font-black uppercase tracking-widest')}>
                      {isUrdu ? 'موضع / گاؤں' : 'Mauza / Village'}
                    </Label>
                    <div className="relative">
                      <select className={cn('w-full h-14 px-4 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl appearance-none', isUrdu ? 'font-urdu text-base text-right' : 'font-bold text-sm text-[#2d5a4c]')}>
                        {mouzas.map(m => <option key={m.en}>{isUrdu ? m.ur : m.en}</option>)}
                      </select>
                      <ChevronDown className={cn('absolute top-1/2 -translate-y-1/2 w-4 h-4 text-[#2d5a4c]/40 pointer-events-none', isUrdu ? 'left-4' : 'right-4')} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className={cn('text-[#2d5a4c]/60 block', isUrdu ? 'font-urdu text-base text-right' : 'text-[10px] font-black uppercase tracking-widest')}>
                      {t('field_khasra')}
                    </Label>
                    <Input
                      placeholder={isUrdu ? 'اثاثہ شناخت تلاش کریں...' : 'Search Asset ID...'}
                      className={cn('h-14 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl', isUrdu ? 'font-urdu text-right text-base' : 'font-bold text-lg')}
                      dir="ltr"
                    />
                  </div>
                </div>
                <div className="h-40 bg-emerald-50/30 rounded-2xl border-2 border-emerald-800/5 flex items-center justify-center">
                  <div className="text-center opacity-30">
                    <MapPin className="w-10 h-10 mx-auto mb-2" />
                    <p className={cn('text-[#2d5a4c]', isUrdu ? 'font-urdu text-base' : 'text-[10px] font-black uppercase tracking-widest')}>
                      {isUrdu ? 'اثاثہ پیش نظارہ دستیاب نہیں' : 'Asset Preview Not Loaded'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Steps 3 & 4 */}
            {transferSteps > 2 && (
              <div className="flex flex-col items-center justify-center h-[400px] text-center space-y-6">
                <div className="p-6 rounded-full bg-emerald-50 text-[#2d5a4c]">
                  <History className="w-12 h-12" />
                </div>
                <div>
                  <h3 className={cn('text-[#2d5a4c]', isUrdu ? 'font-urdu text-2xl' : 'text-xl font-bold')}>
                    {isUrdu ? 'دستاویزات کی تیاری جاری ہے' : 'Finalizing Documentation'}
                  </h3>
                  <p className={cn('text-[#2d5a4c]/60 max-w-sm mt-2', isUrdu ? 'font-urdu text-base' : 'text-sm')}>
                    {isUrdu
                      ? 'نظام سرکاری انتقال دستاویز تیار کر رہا ہے۔ براہ کرم یقین کریں کہ پچھلا ڈیٹا درست ہے۔'
                      : 'The system is preparing the official mutation deed for review. Please ensure all previous data is correct.'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <DialogFooter className={cn('p-8 pt-0 gap-4', isUrdu && 'flex-row-reverse')}>
            <Button
              variant="outline"
              onClick={() => transferSteps > 1 && setTransferSteps(prev => prev - 1)}
              disabled={transferSteps === 1}
              className={cn('h-14 px-8 border-2 border-emerald-800/10 text-[#2d5a4c] rounded-xl', isUrdu ? 'font-urdu text-base flex-row-reverse gap-2' : 'text-[10px] font-black uppercase tracking-widest')}
            >
              <ArrowLeft className={cn('w-4 h-4', isUrdu && 'rotate-180', isUrdu ? 'ml-1' : 'mr-2')} />
              {isUrdu ? 'پچھلا مرحلہ' : 'Previous Step'}
            </Button>
            {transferSteps < 4 ? (
              <Button
                onClick={() => setTransferSteps(prev => prev + 1)}
                className={cn('flex-1 h-14 bg-[#2d5a4c] hover:bg-[#1a382f] text-white rounded-xl shadow-xl shadow-emerald-900/10', isUrdu ? 'font-urdu text-lg flex-row-reverse gap-2' : 'text-[10px] font-black uppercase tracking-widest')}
              >
                {isUrdu ? 'اگلا مرحلہ' : 'Continue to Next Step'}
                <ArrowRight className={cn('w-4 h-4', isUrdu && 'rotate-180', isUrdu ? 'mr-1' : 'ml-2')} />
              </Button>
            ) : (
              <Button
                onClick={() => setIsTransferModalOpen(false)}
                className={cn('flex-1 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xl shadow-emerald-900/10', isUrdu ? 'font-urdu text-lg' : 'text-[10px] font-black uppercase tracking-widest')}
              >
                {isUrdu ? 'انتقال کی دستاویز جاری کریں' : 'Execute Mutation Deed'}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  )
}
