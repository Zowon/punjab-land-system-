'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Plus, Search, MapPin, DollarSign,
  Trash2, Edit, Building2, LandPlot, ShieldCheck, Stamp, Globe, ChevronDown
} from 'lucide-react'
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from '@/contexts/language-context'
import { cn } from '@/lib/utils'

const initialProperties = [
  {
    id: 1,
    nameEn: 'Dharri Industrial Block',
    nameUr: 'دھاڑی صنعتی بلاک',
    districtEn: 'Attock', districtUr: 'اٹک',
    tehsilEn: 'Fatehjang', tehsilUr: 'فتح جنگ',
    mouzaEn: 'Dharri Rai Ditta', mouzaUr: 'دھاڑی رائے دِتہ',
    khasra: '12', khewat: '45',
    area: '5,000 m²', price: 'PKR 12.5M',
    status: 'Available', statusUr: 'دستیاب',
    owner: 'Government', ownerUr: 'سرکار',
    classificationEn: 'Maira', classificationUr: 'میرہ',
    date: '2024-01-15'
  },
  {
    id: 2,
    nameEn: 'Malal Commercial Plaza',
    nameUr: 'مالال تجارتی پلازہ',
    districtEn: 'Attock', districtUr: 'اٹک',
    tehsilEn: 'Fatehjang', tehsilUr: 'فتح جنگ',
    mouzaEn: 'Malal', mouzaUr: 'مالال',
    khasra: '104', khewat: '12',
    area: '2,500 m²', price: 'PKR 25.0M',
    status: 'Sold', statusUr: 'فروخت شدہ',
    owner: 'Private', ownerUr: 'نجی',
    classificationEn: 'Commercial', classificationUr: 'تجارتی',
    date: '2024-01-10'
  }
]

export default function PropertiesPage() {
  const { t, isUrdu } = useLanguage()
  const dir = isUrdu ? 'rtl' : 'ltr'

  const [search, setSearch] = useState('')
  const [properties, setProperties] = useState(initialProperties)
  const [isOpen, setIsOpen] = useState(false)
  const [newProperty, setNewProperty] = useState({
    nameEn: '', nameUr: '',
    districtEn: 'Attock', districtUr: 'اٹک',
    tehsilEn: 'Fatehjang', tehsilUr: 'فتح جنگ',
    mouzaEn: 'Dharri Rai Ditta', mouzaUr: 'دھاڑی رائے دِتہ',
    khasra: '', khewat: '', area: '', price: '',
    owner: 'Government', ownerUr: 'سرکار',
    status: 'Available', statusUr: 'دستیاب',
    classificationEn: 'Maira', classificationUr: 'میرہ'
  })

  const filteredProperties = properties.filter(p =>
    p.nameEn.toLowerCase().includes(search.toLowerCase()) ||
    p.nameUr.includes(search) ||
    p.mouzaEn.toLowerCase().includes(search.toLowerCase()) ||
    p.khasra.includes(search)
  )

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault()
    const property = {
      ...newProperty,
      id: properties.length + 1,
      date: new Date().toISOString().split('T')[0]
    }
    setProperties([property as any, ...properties])
    setIsOpen(false)
    setNewProperty({
      nameEn: '', nameUr: '',
      districtEn: 'Attock', districtUr: 'اٹک',
      tehsilEn: 'Fatehjang', tehsilUr: 'فتح جنگ',
      mouzaEn: 'Dharri Rai Ditta', mouzaUr: 'دھاڑی رائے دِتہ',
      khasra: '', khewat: '', area: '', price: '',
      owner: 'Government', ownerUr: 'سرکار',
      status: 'Available', statusUr: 'دستیاب',
      classificationEn: 'Maira', classificationUr: 'میرہ'
    })
  }

  const handleDelete = (id: number) => setProperties(properties.filter(p => p.id !== id))

  const districts = [
    { en: 'Attock', ur: 'اٹک' },
    { en: 'Rawalpindi', ur: 'راولپنڈی' },
    { en: 'Chakwal', ur: 'چکوال' },
  ]
  const tehsils = [
    { en: 'Fatehjang', ur: 'فتح جنگ' },
    { en: 'Taxila', ur: 'ٹیکسلہ' },
    { en: 'Hassan Abdal', ur: 'حسن ابدال' },
  ]
  const mouzas = [
    { en: 'Dharri Rai Ditta', ur: 'دھاڑی رائے دِتہ' },
    { en: 'Malal', ur: 'مالال' },
    { en: 'Khurd', ur: 'خورد' },
  ]
  const classifications = [
    { en: 'Maira', ur: 'میرہ' },
    { en: 'Chahi', ur: 'چاہی' },
    { en: 'Banjar', ur: 'بنجر' },
    { en: 'Abadi', ur: 'آبادی' },
    { en: 'Commercial', ur: 'تجارتی' },
  ]

  const stats = [
    { labelKey: 'stat_registered', value: properties.length, icon: Building2 },
    { labelKey: 'stat_available', value: properties.filter(p => p.status === 'Available').length, icon: ShieldCheck },
    { labelKey: 'stat_market_cap', value: '850.4M', icon: DollarSign },
    { labelKey: 'stat_districts', value: '24', icon: Globe },
  ]

  const tableHeaders = [
    { key: 'col_asset', align: 'left' },
    { key: 'col_location', align: 'left' },
    { key: 'col_cadastral', align: 'left' },
    { key: 'col_valuation', align: 'left' },
    { key: 'col_actions', align: 'right' },
  ]

  return (
    <div className="p-8 bg-[#f8faf9] min-h-screen selection:bg-emerald-100" dir={dir}>

      {/* Header */}
      <div className={cn('flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6', isUrdu && 'md:flex-row-reverse')}>
        <div className={cn('flex items-center gap-4', isUrdu && 'flex-row-reverse')}>
          <div className="p-3 rounded-2xl bg-[#2d5a4c] text-white shadow-xl shadow-emerald-900/10">
            <LandPlot className="w-8 h-8" />
          </div>
          <div className={isUrdu ? 'text-right' : ''}>
            <h1 className={cn('text-[#2d5a4c] tracking-tight', isUrdu ? 'font-urdu text-4xl' : 'text-3xl font-serif')}>
              {isUrdu ? 'اراضی رجسٹری اثاثے' : <>Land <span className="font-black italic">Registry Assets</span></>}
            </h1>
            <p className={cn('text-[#2d5a4c]/50', isUrdu ? 'font-urdu text-base mt-1' : 'text-[10px] uppercase tracking-[0.3em] font-black')}>
              {t('prop_subtitle')}
            </p>
          </div>
        </div>

        {/* Register Modal */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className={cn('h-14 px-8 bg-[#2d5a4c] hover:bg-[#1a382f] text-white rounded-xl shadow-xl shadow-emerald-900/10', isUrdu ? 'font-urdu text-lg flex-row-reverse gap-2' : 'font-black uppercase tracking-widest text-[10px]')}>
              <Plus className={cn('w-4 h-4', isUrdu ? 'ml-1' : 'mr-2')} />
              {t('btn_register_parcel')}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] bg-white border-0 p-0 overflow-hidden rounded-3xl shadow-2xl" dir={dir}>
            <div className="bg-[#2d5a4c] p-8 text-white">
              <DialogHeader>
                <DialogTitle className={cn('text-white mb-1', isUrdu ? 'font-urdu text-3xl text-right' : 'text-3xl font-serif italic')}>
                  {t('modal_register_title')}
                </DialogTitle>
                <DialogDescription className={cn('text-white/50', isUrdu ? 'font-urdu text-base text-right' : 'text-[9px] font-black uppercase tracking-[0.3em]')}>
                  {t('modal_register_sub')}
                </DialogDescription>
              </DialogHeader>
            </div>

            <form onSubmit={handleAddProperty} className="p-8 space-y-6">
              {/* Property Name */}
              <div className="space-y-2">
                <Label className={cn('text-[#2d5a4c]/60 block', isUrdu ? 'font-urdu text-base text-right' : 'text-[10px] font-black uppercase tracking-widest')}>
                  {t('field_property_title')}
                </Label>
                <Input
                  placeholder={isUrdu ? 'مثال: بلاک اے رہائشی مرکز' : 'e.g. Block A Residential Hub'}
                  value={isUrdu ? newProperty.nameUr : newProperty.nameEn}
                  onChange={e => setNewProperty(isUrdu
                    ? { ...newProperty, nameUr: e.target.value, nameEn: e.target.value }
                    : { ...newProperty, nameEn: e.target.value, nameUr: e.target.value }
                  )}
                  required
                  className={cn('h-14 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl', isUrdu ? 'font-urdu text-right text-base' : 'font-bold')}
                  dir={dir}
                />
              </div>

              {/* District / Tehsil / Mouza */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { labelKey: 'field_district', options: districts },
                  { labelKey: 'field_tehsil', options: tehsils },
                  { labelKey: 'field_mouza', options: mouzas },
                ].map((field) => (
                  <div key={field.labelKey} className="space-y-2">
                    <Label className={cn('text-[#2d5a4c]/60 block', isUrdu ? 'font-urdu text-base text-right' : 'text-[10px] font-black uppercase tracking-widest')}>
                      {t(field.labelKey)}
                    </Label>
                    <div className="relative">
                      <select className={cn('w-full h-12 px-4 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl appearance-none', isUrdu ? 'font-urdu text-base text-right pr-4 pl-10' : 'font-bold text-xs text-[#2d5a4c]')}>
                        {field.options.map(opt => (
                          <option key={opt.en}>{isUrdu ? opt.ur : opt.en}</option>
                        ))}
                      </select>
                      <ChevronDown className={cn('absolute top-1/2 -translate-y-1/2 w-4 h-4 text-[#2d5a4c]/40 pointer-events-none', isUrdu ? 'left-3' : 'right-4')} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Khasra / Khewat / Area */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label className={cn('text-[#2d5a4c]/60 block', isUrdu ? 'font-urdu text-base text-right' : 'text-[10px] font-black uppercase tracking-widest')}>{t('field_khasra')}</Label>
                  <Input
                    placeholder={isUrdu ? 'مثال: ۱۲' : 'e.g. 12'}
                    value={newProperty.khasra}
                    onChange={e => setNewProperty({ ...newProperty, khasra: e.target.value })}
                    required
                    className="h-12 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl font-mono font-bold"
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <Label className={cn('text-[#2d5a4c]/60 block', isUrdu ? 'font-urdu text-base text-right' : 'text-[10px] font-black uppercase tracking-widest')}>{t('field_khewat')}</Label>
                  <Input
                    placeholder={isUrdu ? 'مثال: ۴۵' : 'e.g. 45'}
                    value={newProperty.khewat}
                    onChange={e => setNewProperty({ ...newProperty, khewat: e.target.value })}
                    required
                    className="h-12 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl font-mono font-bold"
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <Label className={cn('text-[#2d5a4c]/60 block', isUrdu ? 'font-urdu text-base text-right' : 'text-[10px] font-black uppercase tracking-widest')}>{t('field_area')}</Label>
                  <Input
                    placeholder={isUrdu ? 'مثال: ۵,۰۰۰ مربع میٹر' : 'e.g. 5,000 m²'}
                    value={newProperty.area}
                    onChange={e => setNewProperty({ ...newProperty, area: e.target.value })}
                    required
                    className={cn('h-12 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl', isUrdu ? 'font-urdu text-right' : 'font-bold')}
                    dir={dir}
                  />
                </div>
              </div>

              {/* Classification */}
              <div className="space-y-2">
                <Label className={cn('text-[#2d5a4c]/60 block', isUrdu ? 'font-urdu text-base text-right' : 'text-[10px] font-black uppercase tracking-widest')}>
                  {isUrdu ? 'اراضی کی قسم' : 'Land Classification'}
                </Label>
                <div className="relative">
                  <select className={cn('w-full h-12 px-4 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl appearance-none', isUrdu ? 'font-urdu text-base text-right pr-4 pl-10' : 'font-bold text-xs text-[#2d5a4c]')}>
                    {classifications.map(c => (
                      <option key={c.en}>{isUrdu ? c.ur : c.en}</option>
                    ))}
                  </select>
                  <ChevronDown className={cn('absolute top-1/2 -translate-y-1/2 w-4 h-4 text-[#2d5a4c]/40 pointer-events-none', isUrdu ? 'left-3' : 'right-4')} />
                </div>
              </div>

              <DialogFooter className="pt-6 border-t border-emerald-800/5">
                <Button type="submit" className={cn('w-full h-14 bg-[#2d5a4c] hover:bg-[#1a382f] text-white rounded-xl shadow-xl shadow-emerald-900/10', isUrdu ? 'font-urdu text-lg' : 'font-black uppercase tracking-widest text-[10px]')}>
                  {t('btn_authorize')}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <Card key={i} className="p-6 bg-white border-2 border-emerald-800/5 rounded-2xl shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:scale-110 transition-transform">
              <stat.icon className="w-16 h-16 text-[#2d5a4c]" />
            </div>
            <p className={cn('text-[#2d5a4c]/40 mb-3', isUrdu ? 'font-urdu text-base text-right' : 'text-[9px] font-black uppercase tracking-widest')}>
              {t(stat.labelKey)}
            </p>
            <div className={cn('flex items-center gap-4', isUrdu && 'flex-row-reverse')}>
              <div className="p-2 rounded-lg bg-emerald-50 text-[#2d5a4c]">
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-black text-[#2d5a4c] font-mono">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Search */}
      <Card className={cn('mb-10 bg-white border-2 border-emerald-800/5 rounded-2xl shadow-xl shadow-emerald-900/5 p-4 flex gap-4 items-center', isUrdu && 'flex-row-reverse')}>
        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-[#2d5a4c]">
          <Search className="w-6 h-6" />
        </div>
        <Input
          placeholder={t('filter_placeholder')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={cn('flex-1 bg-transparent border-0 h-10 text-[#2d5a4c] focus-visible:ring-0 placeholder:text-[#2d5a4c]/30', isUrdu ? 'font-urdu text-right text-base' : 'font-bold')}
          dir={dir}
        />
        <div className={cn('flex items-center gap-2 px-4 border-emerald-800/10 text-[#2d5a4c]/40 whitespace-nowrap', isUrdu ? 'border-r font-urdu text-base' : 'border-l text-[10px] font-black uppercase tracking-widest')}>
          {filteredProperties.length} {t('records_found')}
        </div>
      </Card>

      {/* Records Table */}
      <Card className="bg-white border-2 border-emerald-800/5 rounded-3xl shadow-xl shadow-emerald-900/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" dir={dir}>
            <thead>
              <tr className="bg-[#2d5a4c]/5 border-b border-emerald-800/10">
                {tableHeaders.map((th) => (
                  <th key={th.key} className={cn('px-8 py-5 text-[#2d5a4c]/60', isUrdu ? 'font-urdu text-base text-right' : 'text-[10px] font-black uppercase tracking-widest text-left')}>
                    {t(th.key)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredProperties.map((property) => (
                <tr key={property.id} className="border-b border-emerald-800/5 hover:bg-emerald-50/30 transition-all group">

                  {/* Registry Asset */}
                  <td className="px-8 py-6">
                    <div className={cn('flex items-center gap-4', isUrdu && 'flex-row-reverse')}>
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-[#2d5a4c] font-black text-xs flex-shrink-0">
                        {property.id}
                      </div>
                      <div className={isUrdu ? 'text-right' : ''}>
                        <p className={cn('text-[#2d5a4c] leading-none mb-1', isUrdu ? 'font-urdu text-xl' : 'text-sm font-black uppercase tracking-tight')}>
                          {isUrdu ? property.nameUr : property.nameEn}
                        </p>
                        <Badge variant="outline" className={cn('h-4 border-emerald-800/10 text-[#2d5a4c]/40', isUrdu ? 'font-urdu text-xs' : 'text-[7px] font-black tracking-widest uppercase')}>
                          {isUrdu ? property.classificationUr : property.classificationEn}
                        </Badge>
                      </div>
                    </div>
                  </td>

                  {/* Location */}
                  <td className="px-8 py-6">
                    <p className={cn('text-[#2d5a4c] mb-1', isUrdu ? 'font-urdu text-base text-right' : 'text-[11px] font-bold')}>
                      {isUrdu ? `${property.districtUr}، ${property.tehsilUr}` : `${property.districtEn}, ${property.tehsilEn}`}
                    </p>
                    <p className={cn('text-[#2d5a4c]/40 italic', isUrdu ? 'font-urdu text-sm text-right' : 'text-[9px] font-black uppercase tracking-widest')}>
                      {isUrdu ? property.mouzaUr : property.mouzaEn}
                    </p>
                  </td>

                  {/* Cadastral IDs */}
                  <td className="px-8 py-6">
                    <div className={cn('flex flex-col gap-1', isUrdu && 'items-end')}>
                      <span className="text-[10px] font-black text-[#2d5a4c] font-mono">
                        {isUrdu ? 'خسرہ:' : 'KHASRA:'} {property.khasra}
                      </span>
                      <span className="text-[8px] font-black uppercase tracking-widest text-[#2d5a4c]/30">
                        {isUrdu ? 'خیوات:' : 'KHEWAT:'} {property.khewat}
                      </span>
                    </div>
                  </td>

                  {/* Valuation */}
                  <td className="px-8 py-6">
                    <p className={cn('text-emerald-600 tracking-tighter', isUrdu ? 'font-urdu text-xl text-right' : 'text-sm font-black font-serif italic')}>
                      {property.price}
                    </p>
                    <p className={cn('text-[#2d5a4c]/30', isUrdu ? 'font-urdu text-sm text-right' : 'text-[8px] font-black uppercase tracking-widest')}>
                      {property.area} {isUrdu ? 'تصدیق شدہ' : 'Verified'}
                    </p>
                  </td>

                  {/* Actions */}
                  <td className="px-8 py-6">
                    <div className={cn('flex items-center gap-2', isUrdu ? 'justify-start' : 'justify-end')}>
                      <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-2 border-emerald-800/5 hover:bg-emerald-50 text-[#2d5a4c]/40 hover:text-[#2d5a4c] transition-all">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 rounded-lg border-2 border-emerald-800/5 hover:bg-rose-50 hover:text-rose-500 text-[#2d5a4c]/20 transition-all"
                        onClick={() => handleDelete(property.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Footer */}
      <div className="mt-16 text-center opacity-20 pointer-events-none">
        <Stamp className="w-12 h-12 mx-auto mb-4 text-[#2d5a4c]" />
        <p className={cn('text-[#2d5a4c]', isUrdu ? 'font-urdu text-base' : 'text-[8px] font-black uppercase tracking-[0.5em]')}>
          {t('lrmis_footer')}
        </p>
      </div>

    </div>
  )
}
