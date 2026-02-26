'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Search, Info, ChevronDown, User, Users, History, Stamp, ShieldCheck } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'
import { cn } from '@/lib/utils'

export default function SearchRightholdersPage() {
    const { t, isUrdu } = useLanguage()
    const dir = isUrdu ? 'rtl' : 'ltr'

    const [formData, setFormData] = useState({
        purpose: 'Personal Record',
        mauza: 'Ibn Chak',
        tehsil: 'Rawalpindi',
        district: 'Rawalpindi',
        cnic: '',
        identityType: 'CNIC',
        parentName: '',
        name: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Searching for:', formData)
    }

    const purposeOptions = [
        { en: 'Personal Record', ur: 'ذاتی ریکارڈ' },
        { en: 'Property Transfer', ur: 'جائیداد انتقال' },
        { en: 'Legal Verification', ur: 'قانونی تصدیق' },
    ]
    const mauzaOptions = [
        { en: 'Ibn Chak', ur: 'ابن چک' },
        { en: 'Dharri', ur: 'دھاڑی' },
        { en: 'Malal', ur: 'مالال' },
    ]
    const tehsilOptions = [
        { en: 'Rawalpindi', ur: 'راولپنڈی' },
        { en: 'Attock', ur: 'اٹک' },
        { en: 'Fateh Jang', ur: 'فتح جنگ' },
    ]
    const districtOptions = [
        { en: 'Rawalpindi', ur: 'راولپنڈی' },
        { en: 'Attock', ur: 'اٹک' },
        { en: 'Chakwal', ur: 'چکوال' },
    ]
    const identityOptions = [
        { en: 'CNIC', ur: 'شناختی کارڈ' },
        { en: 'Passport', ur: 'پاسپورٹ' },
        { en: 'B-Form', ur: 'بی-فارم' },
    ]

    const SelectField = ({
        labelEn, labelUr, options, value, onChange
    }: {
        labelEn: string
        labelUr: string
        options: { en: string; ur: string }[]
        value: string
        onChange: (v: string) => void
    }) => (
        <div className="space-y-2">
            <Label className={cn('text-[#2d5a4c]/60 block', isUrdu ? 'font-urdu text-base text-right' : 'text-[10px] font-black uppercase tracking-widest')}>
                {isUrdu ? labelUr : labelEn}
            </Label>
            <div className="relative">
                <select
                    className={cn('w-full h-12 px-4 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl appearance-none focus:outline-none focus:border-emerald-500 transition-all text-[#2d5a4c]', isUrdu ? 'font-urdu text-base text-right pr-4 pl-10' : 'font-bold text-sm')}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                >
                    {options.map(opt => (
                        <option key={opt.en} value={opt.en}>{isUrdu ? opt.ur : opt.en}</option>
                    ))}
                </select>
                <ChevronDown className={cn('absolute top-1/2 -translate-y-1/2 w-4 h-4 text-[#2d5a4c]/40 pointer-events-none', isUrdu ? 'left-3' : 'right-3')} />
            </div>
        </div>
    )

    return (
        <div className="p-8 bg-[#f8faf9] min-h-screen selection:bg-emerald-100" dir={dir}>

            {/* Header */}
            <div className={cn('mb-10', isUrdu && 'text-right')}>
                <div className={cn('flex items-center gap-4 mb-4', isUrdu && 'flex-row-reverse')}>
                    <div className="p-3 rounded-2xl bg-[#2d5a4c] text-white shadow-xl shadow-emerald-900/10">
                        <Search className="w-8 h-8" />
                    </div>
                    <div className={isUrdu ? 'text-right' : ''}>
                        <h1 className={cn('text-[#2d5a4c] tracking-tight', isUrdu ? 'font-urdu text-4xl' : 'text-3xl font-serif')}>
                            {isUrdu ? 'حق داروں کی تلاش' : <>Search <span className="font-black italic">Rightholders</span></>}
                        </h1>
                        <p className={cn('text-[#2d5a4c]/50', isUrdu ? 'font-urdu text-base mt-1' : 'text-[10px] uppercase tracking-[0.3em] font-black')}>
                            {isUrdu ? 'مرکزی اراضی رجسٹری کے ذریعے تصدیق' : 'Verification through Central Land Registry'}
                        </p>
                    </div>
                </div>

                {/* Info notice */}
                <div className={cn('flex items-center gap-2 px-4 py-3 bg-emerald-50 rounded-xl border border-emerald-800/10 text-[#2d5a4c]/60 max-w-xl', isUrdu && 'flex-row-reverse')}>
                    <Info className="w-4 h-4 flex-shrink-0" />
                    <p className={cn(isUrdu ? 'font-urdu text-sm' : 'text-[9px] font-black uppercase tracking-widest italic')}>
                        {isUrdu
                            ? 'یہ تلاش NADRA ڈیٹا بیس سے حق داروں کی شناخت کرتی ہے'
                            : 'This search identifies rightholders against the NADRA database'}
                    </p>
                </div>
            </div>

            {/* Main Form Card */}
            <div className="max-w-5xl mx-auto">
                <Card className="bg-white border-2 border-emerald-800/5 rounded-3xl shadow-xl shadow-emerald-900/5 p-10">
                    <form onSubmit={handleSubmit} className="space-y-10">

                        {/* Row 1: Location & Purpose */}
                        <div>
                            <p className={cn('text-[#2d5a4c]/30 mb-5', isUrdu ? 'font-urdu text-base text-right' : 'text-[8px] font-black uppercase tracking-[0.4em]')}>
                                {isUrdu ? '— مقام اور مقصد —' : '— Location & Purpose —'}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <SelectField
                                    labelEn="Purpose" labelUr="مقصد"
                                    options={purposeOptions}
                                    value={formData.purpose}
                                    onChange={v => setFormData({ ...formData, purpose: v })}
                                />
                                <SelectField
                                    labelEn="Mauza" labelUr="موضع"
                                    options={mauzaOptions}
                                    value={formData.mauza}
                                    onChange={v => setFormData({ ...formData, mauza: v })}
                                />
                                <SelectField
                                    labelEn="Tehsil" labelUr="تحصیل"
                                    options={tehsilOptions}
                                    value={formData.tehsil}
                                    onChange={v => setFormData({ ...formData, tehsil: v })}
                                />
                                <SelectField
                                    labelEn="District" labelUr="ضلع"
                                    options={districtOptions}
                                    value={formData.district}
                                    onChange={v => setFormData({ ...formData, district: v })}
                                />
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-emerald-800/5" />

                        {/* Row 2: Identity */}
                        <div>
                            <p className={cn('text-[#2d5a4c]/30 mb-5', isUrdu ? 'font-urdu text-base text-right' : 'text-[8px] font-black uppercase tracking-[0.4em]')}>
                                {isUrdu ? '— شناختی تفصیلات —' : '— Identity Details —'}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <Label className={cn('text-[#2d5a4c]/60 block', isUrdu ? 'font-urdu text-base text-right' : 'text-[10px] font-black uppercase tracking-widest')}>
                                        {isUrdu ? 'شناختی کارڈ نمبر' : 'CNIC'}
                                    </Label>
                                    <Input
                                        placeholder="10000-0000000-0"
                                        className="h-14 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl font-mono tracking-widest focus:border-emerald-500 transition-all text-[#2d5a4c]"
                                        value={formData.cnic}
                                        onChange={e => setFormData({ ...formData, cnic: e.target.value })}
                                        dir="ltr"
                                    />
                                </div>
                                <SelectField
                                    labelEn="Identity Type" labelUr="شناخت کی قسم"
                                    options={identityOptions}
                                    value={formData.identityType}
                                    onChange={v => setFormData({ ...formData, identityType: v })}
                                />
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-emerald-800/5" />

                        {/* Row 3: Names */}
                        <div>
                            <p className={cn('text-[#2d5a4c]/30 mb-5', isUrdu ? 'font-urdu text-base text-right' : 'text-[8px] font-black uppercase tracking-[0.4em]')}>
                                {isUrdu ? '— ذاتی معلومات —' : '— Personal Details —'}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <Label className={cn('text-[#2d5a4c]/60 block', isUrdu ? 'font-urdu text-base text-right' : 'text-[10px] font-black uppercase tracking-widest')}>
                                        {isUrdu ? 'والد / ولی کا نام' : 'Parent Name'}
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            placeholder={isUrdu ? 'والد کا نام درج کریں' : 'Enter Parent Name'}
                                            className={cn('h-14 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl focus:border-emerald-500 transition-all text-[#2d5a4c]', isUrdu ? 'font-urdu text-right text-base pr-4 pl-12' : 'font-bold pl-12')}
                                            value={formData.parentName}
                                            onChange={e => setFormData({ ...formData, parentName: e.target.value })}
                                            dir={dir}
                                        />
                                        <Users className={cn('absolute top-1/2 -translate-y-1/2 w-5 h-5 text-[#2d5a4c]/20', isUrdu ? 'left-4' : 'left-4')} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className={cn('text-[#2d5a4c]/60 block', isUrdu ? 'font-urdu text-base text-right' : 'text-[10px] font-black uppercase tracking-widest')}>
                                        {isUrdu ? 'درخواست گزار کا نام' : 'Name'}
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            placeholder={isUrdu ? 'نام درج کریں' : 'Enter Name'}
                                            className={cn('h-14 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl focus:border-emerald-500 transition-all text-[#2d5a4c]', isUrdu ? 'font-urdu text-right text-base pr-4 pl-12' : 'font-bold pl-12')}
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            dir={dir}
                                        />
                                        <User className={cn('absolute top-1/2 -translate-y-1/2 w-5 h-5 text-[#2d5a4c]/20', isUrdu ? 'left-4' : 'left-4')} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action row */}
                        <div className={cn('flex items-center justify-between pt-4 border-t border-emerald-800/5', isUrdu && 'flex-row-reverse')}>
                            <button
                                type="button"
                                className={cn('text-emerald-600 hover:text-emerald-800 transition-all border-b-2 border-emerald-600/20 flex items-center gap-2 pb-1', isUrdu ? 'font-urdu text-base flex-row-reverse gap-2' : 'text-[10px] font-black uppercase tracking-widest')}
                            >
                                <History className="w-3.5 h-3.5" />
                                {isUrdu ? 'شخص کی تاریخ دیکھیں' : 'View person history'}
                            </button>

                            <Button
                                type="submit"
                                className={cn('h-14 px-12 bg-[#2d5a4c] hover:bg-[#1a382f] text-white rounded-xl shadow-xl shadow-emerald-900/20 group transition-all', isUrdu ? 'font-urdu text-lg flex-row-reverse gap-3' : 'font-black uppercase tracking-[0.2em] text-[11px]')}
                            >
                                {isUrdu ? 'تلاش کریں' : 'Search'}
                                <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </Button>
                        </div>
                    </form>
                </Card>

                {/* Info panel below */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            en: 'Secure & Encrypted', ur: 'محفوظ اور خفیہ',
                            subEn: 'All queries encrypted via SSL/TLS',
                            subUr: 'تمام استفسارات SSL/TLS سے محفوظ',
                            icon: ShieldCheck
                        },
                        {
                            en: 'NADRA Verified', ur: 'نادرا سے تصدیق شدہ',
                            subEn: 'Identity cross-checked with national DB',
                            subUr: 'قومی ڈیٹا بیس سے شناخت تصدیق',
                            icon: User
                        },
                        {
                            en: 'Audit Logged', ur: 'آڈیٹ لاگ',
                            subEn: 'Every search is recorded for compliance',
                            subUr: 'ہر تلاش تعمیل کے لیے ریکارڈ شدہ',
                            icon: History
                        },
                    ].map((item, i) => (
                        <Card key={i} className={cn('p-5 bg-white border-2 border-emerald-800/5 rounded-2xl flex items-start gap-4 shadow-sm', isUrdu && 'flex-row-reverse')}>
                            <div className="p-2 rounded-lg bg-emerald-50 text-[#2d5a4c] flex-shrink-0">
                                <item.icon className="w-5 h-5" />
                            </div>
                            <div className={isUrdu ? 'text-right' : ''}>
                                <p className={cn('text-[#2d5a4c] mb-0.5', isUrdu ? 'font-urdu text-base' : 'text-xs font-black uppercase tracking-widest')}>{isUrdu ? item.ur : item.en}</p>
                                <p className={cn('text-[#2d5a4c]/40', isUrdu ? 'font-urdu text-sm' : 'text-[9px] font-bold')}>{isUrdu ? item.subUr : item.subEn}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Footer Stamp */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 opacity-[0.06] pointer-events-none">
                <div className={cn('flex flex-col items-center', isUrdu && 'text-center')}>
                    <Stamp className="w-20 h-20 text-[#2d5a4c]" />
                    <span className={cn('text-[#2d5a4c] mt-3', isUrdu ? 'font-urdu text-base' : 'text-[8px] font-black uppercase tracking-[0.5em]')}>
                        {isUrdu ? 'تصدیق شدہ رجسٹری لاگ' : 'Verified Registry Log'}
                    </span>
                </div>
            </div>

        </div>
    )
}
