'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FileText, Download, Calendar, Eye, Search, Shield, Loader2, Plus, Stamp, Globe, Map, BadgeCheck, Building2 } from 'lucide-react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useLanguage } from '@/contexts/language-context'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

const reports = [
  { id: 'DOC-5501', nameEn: 'Fard-e-Malkiat (Ownership Proof)', nameUr: 'فرد مالکیت (ثبوتِ ملکیت)', date: '2024-01-31', authorEn: 'Patwari Office', authorUr: 'پٹواری دفتر', type: 'Ownership', khasra: '12' },
  { id: 'map-002', nameEn: 'Massavi (Village Map) - Fatehjang', nameUr: 'مساوی (دیہاتی نقشہ) — فتح جنگ', date: '2024-01-25', authorEn: 'Tehsil Office', authorUr: 'تحصیل دفتر', type: 'Cadastral', khasra: 'All' },
  { id: 'AUD-9921', nameEn: 'Revenue Reconciliation Report', nameUr: 'محاصل مطابقت رپورٹ', date: '2024-01-20', authorEn: 'Finance Division', authorUr: 'مالیاتی شعبہ', type: 'Financial', khasra: 'N/A' },
  { id: 'SHA-1011', nameEn: 'Shajira-e-Nasab (Genealogy Tree)', nameUr: 'شجرۂ نسب', date: '2024-01-15', authorEn: 'Records Branch', authorUr: 'ریکارڈز شاخ', type: 'Heritage', khasra: '104' },
]

export default function ReportsPage() {
  const { t, isUrdu } = useLanguage()
  const dir = isUrdu ? 'rtl' : 'ltr'
  const [isGenerating, setIsGenerating] = useState(false)
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setIsOpen(false)
      toast.success(isUrdu ? 'دستاویز کامیابی سے جاری کی گئی' : 'Document issued successfully')
    }, 2000)
  }

  const filteredReports = reports.filter(r =>
    (isUrdu ? r.nameUr : r.nameEn).toLowerCase().includes(search.toLowerCase())
  )

  const docTypes = [
    { en: 'Fard-e-Malkiat (Ownership)', ur: 'فردِ مالکیت' },
    { en: 'Massavi (Map Request)', ur: 'مساوی (نقشہ طلب)' },
    { en: 'Field Book (Coordinates)', ur: 'فیلڈ بک' },
    { en: 'Shajira (Genealogy)', ur: 'شجرۂ نسب' },
  ]

  const certLevels = [
    { en: 'Official (Digital)', ur: 'سرکاری (ڈیجیٹل)' },
    { en: 'Certified (Stamp Required)', ur: 'مصدقہ (اسٹامپ ضروری)' },
  ]

  return (
    <div className="p-8 bg-[#f8faf9] min-h-screen" dir={dir}>

      {/* Header */}
      <div className={cn('flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6', isUrdu && 'md:flex-row-reverse')}>
        <div className={cn('flex items-center gap-4', isUrdu && 'flex-row-reverse')}>
          <div className="p-3 rounded-2xl bg-[#2d5a4c] text-white shadow-xl shadow-emerald-900/10">
            <Stamp className="w-8 h-8" />
          </div>
          <div className={isUrdu ? 'text-right' : ''}>
            <h1 className={cn('text-[#2d5a4c] tracking-tight', isUrdu ? 'font-urdu text-4xl' : 'text-3xl font-serif')}>
              {isUrdu ? 'دستاویز مرکز — ایل آر ایم آئی ایس' : <>LRMIS <span className="font-black italic">Document Hub</span></>}
            </h1>
            <p className={cn('text-[#2d5a4c]/50', isUrdu ? 'font-urdu text-base mt-1' : 'text-[10px] uppercase tracking-[0.3em] font-black')}>
              {t('rep_subtitle')}
            </p>
          </div>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className={cn('h-14 px-8 bg-[#2d5a4c] hover:bg-[#1a382f] text-white rounded-xl shadow-xl shadow-emerald-900/10', isUrdu ? 'font-urdu text-lg' : 'font-black uppercase tracking-widest text-[10px]')}>
              <Plus className={cn('w-4 h-4', isUrdu ? 'ml-2' : 'mr-2')} /> {t('btn_request_copy')}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] bg-white border-0 p-0 overflow-hidden rounded-3xl shadow-2xl" dir={dir}>
            <div className="bg-[#2d5a4c] p-8 text-white">
              <DialogHeader>
                <DialogTitle className={cn('text-white mb-1', isUrdu ? 'font-urdu text-3xl text-right' : 'text-3xl font-serif italic')}>
                  {t('modal_doc_title')}
                </DialogTitle>
              </DialogHeader>
            </div>
            <form onSubmit={handleGenerate} className="p-8 space-y-6">
              <div className="space-y-2">
                <Label className={cn('text-[#2d5a4c]/60 block', isUrdu ? 'font-urdu text-base text-right' : 'text-[10px] font-black uppercase tracking-widest')}>{t('field_doc_type')}</Label>
                <select className={cn('w-full h-14 px-4 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl appearance-none', isUrdu ? 'font-urdu text-base text-right' : 'font-bold text-sm text-[#2d5a4c]')}>
                  {docTypes.map(d => <option key={d.en}>{isUrdu ? d.ur : d.en}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className={cn('text-[#2d5a4c]/60 block', isUrdu ? 'font-urdu text-base text-right' : 'text-[10px] font-black uppercase tracking-widest')}>{t('field_khasra')}</Label>
                  <Input placeholder={isUrdu ? 'مثال: ۱۲' : 'e.g. 12'} className="h-14 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className={cn('text-[#2d5a4c]/60 block', isUrdu ? 'font-urdu text-base text-right' : 'text-[10px] font-black uppercase tracking-widest')}>{t('field_cert_level')}</Label>
                  <select className={cn('w-full h-14 px-4 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl appearance-none', isUrdu ? 'font-urdu text-base text-right' : 'font-bold text-sm text-[#2d5a4c]')}>
                    {certLevels.map(c => <option key={c.en}>{isUrdu ? c.ur : c.en}</option>)}
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className={cn('w-full h-14 bg-[#2d5a4c] hover:bg-[#1a382f] text-white rounded-xl', isUrdu ? 'font-urdu text-lg' : 'font-black uppercase tracking-widest text-[10px]')} disabled={isGenerating}>
                  {isGenerating
                    ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />{t('authenticating')}</>
                    : t('btn_authorize_issue')
                  }
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className={cn('mb-10 bg-white border-2 border-emerald-800/5 rounded-2xl shadow-sm p-4 flex gap-4 items-center', isUrdu && 'flex-row-reverse')}>
        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-[#2d5a4c]">
          <Search className="w-6 h-6" />
        </div>
        <Input placeholder={t('search_docs')} value={search} onChange={e => setSearch(e.target.value)} className={cn('flex-1 bg-transparent border-0 h-10 text-[#2d5a4c] focus-visible:ring-0 placeholder:text-[#2d5a4c]/30', isUrdu ? 'font-urdu text-right text-base' : 'font-bold')} dir={dir} />
        <div className={cn('flex items-center gap-2 px-4 text-[#2d5a4c]/40 border-l border-emerald-800/10', isUrdu ? 'border-l-0 border-r font-urdu text-sm' : 'text-[10px] font-black uppercase tracking-widest')}>
          {filteredReports.length} {t('archives')}
        </div>
      </Card>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {filteredReports.map((report) => (
          <Card key={report.id} className="group p-6 bg-white border-2 border-emerald-800/5 rounded-2xl shadow-sm hover:shadow-xl hover:border-emerald-500/20 transition-all overflow-hidden">
            <div className="flex flex-col h-full">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 text-[#2d5a4c] group-hover:bg-[#2d5a4c] group-hover:text-white transition-all">
                {report.type === 'Cadastral' ? <Map className="w-7 h-7" /> : <FileText className="w-7 h-7" />}
              </div>
              <div className={cn('text-[#2d5a4c]/30 mb-2', isUrdu ? 'font-urdu text-sm text-right' : 'text-[7px] font-black uppercase tracking-widest')}>
                {isUrdu ? 'شناخت:' : 'DOC ID:'} {report.id}
              </div>
              <h3 className={cn('text-[#2d5a4c] mb-2 leading-tight', isUrdu ? 'font-urdu text-xl text-right' : 'text-base font-black')}>
                {isUrdu ? report.nameUr : report.nameEn}
              </h3>
              <p className={cn('text-[#2d5a4c]/40 mb-6', isUrdu ? 'font-urdu text-sm text-right' : 'text-[9px] font-bold uppercase tracking-widest')}>
                {isUrdu ? 'قسم:' : 'Type:'} {report.type} • {isUrdu ? 'خسرہ:' : 'Khasra:'} {report.khasra}
              </p>
              <div className="mt-auto pt-6 border-t border-emerald-800/5 space-y-4">
                <div className={cn('flex items-center justify-between', isUrdu && 'flex-row-reverse')}>
                  <span className={cn('text-[#2d5a4c]/30 flex items-center gap-2', isUrdu ? 'font-urdu text-sm flex-row-reverse' : 'text-[9px] font-black uppercase tracking-widest')}>
                    <Calendar className="w-3.5 h-3.5" />{report.date}
                  </span>
                  <span className={cn('text-[#2d5a4c]/30 flex items-center gap-2', isUrdu ? 'font-urdu text-sm flex-row-reverse' : 'text-[9px] font-black uppercase tracking-widest')}>
                    <Globe className="w-3.5 h-3.5" />{isUrdu ? report.authorUr : report.authorEn}
                  </span>
                </div>
                <div className={cn('flex items-center gap-3', isUrdu && 'flex-row-reverse')}>
                  <Button variant="outline" className={cn('flex-1 h-11 border-2 border-emerald-800/10 text-[#2d5a4c] hover:bg-emerald-50 rounded-xl', isUrdu ? 'font-urdu text-sm' : 'text-[10px] font-black uppercase tracking-widest')}>
                    <Eye className={cn('w-4 h-4', isUrdu ? 'ml-2' : 'mr-2')} /> {t('btn_preview')}
                  </Button>
                  <Button variant="outline" className="w-11 h-11 border-2 border-emerald-800/10 text-[#2d5a4c] hover:bg-[#2d5a4c] hover:text-white rounded-xl">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Data Services */}
      <div className="border-t-2 border-emerald-800/5 pt-12">
        <div className={cn('flex items-center justify-between mb-8', isUrdu && 'flex-row-reverse')}>
          <h2 className={cn('text-[#2d5a4c] flex items-center gap-3', isUrdu ? 'font-urdu text-2xl flex-row-reverse' : 'text-2xl font-serif italic')}>
            <Building2 className="w-7 h-7" />
            {t('data_services')}
          </h2>
          <span className={cn('px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-800/10', isUrdu ? 'font-urdu text-sm' : 'text-[8px] font-black uppercase tracking-widest')}>
            {t('gateway_live')}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { en: 'Certified Fard Issuance', ur: 'مصدقہ فرد اجراء', typeEn: 'High Security', typeUr: 'اعلیٰ حفاظت', icon: BadgeCheck },
            { en: 'Village Map Verification', ur: 'نقشہ تصدیق', typeEn: 'Cadastral', typeUr: 'مساوی', icon: Map },
            { en: 'Heritage Link (Shajira)', ur: 'شجرۂ نسب', typeEn: 'Genealogy', typeUr: 'نسب نامہ', icon: Globe },
            { en: 'Discrepancy Resolution', ur: 'تضاد کا ازالہ', typeEn: 'Adjudication', typeUr: 'فیصلہ', icon: Shield },
          ].map((svc, i) => (
            <Card key={i} className="p-6 bg-white border-2 border-emerald-800/5 rounded-2xl shadow-sm hover:shadow-lg hover:border-emerald-500/20 transition-all cursor-pointer group">
              <div className={cn('flex items-center justify-between mb-4', isUrdu && 'flex-row-reverse')}>
                <div className="p-2 rounded-xl bg-emerald-50 text-[#2d5a4c] group-hover:bg-[#2d5a4c] group-hover:text-white transition-all">
                  <svc.icon className="w-5 h-5" />
                </div>
                <span className={cn('px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full', isUrdu ? 'font-urdu text-sm' : 'text-[7px] font-black tracking-widest uppercase')}>
                  {isUrdu ? svc.typeUr : svc.typeEn}
                </span>
              </div>
              <p className={cn('font-black text-[#2d5a4c] leading-snug', isUrdu ? 'font-urdu text-xl text-right' : 'text-[13px] uppercase tracking-tight')}>
                {isUrdu ? svc.ur : svc.en}
              </p>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center opacity-10 pointer-events-none">
        <Stamp className="w-12 h-12 mx-auto mb-4 text-[#2d5a4c]" />
        <p className={cn('text-[#2d5a4c]', isUrdu ? 'font-urdu text-base' : 'text-[8px] font-black uppercase tracking-[0.5em]')}>{t('lrmis_footer')}</p>
      </div>
    </div>
  )
}
