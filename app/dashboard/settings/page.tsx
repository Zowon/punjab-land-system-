'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Settings, Lock, Bell, Users, Database, CheckCircle2, Loader2, Stamp } from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export default function SettingsPage() {
  const { t, isUrdu } = useLanguage()
  const dir = isUrdu ? 'rtl' : 'ltr'
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('general')

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      toast.success(isUrdu ? 'ترتیب کامیابی سے محفوظ ہوئی' : 'Settings updated successfully')
    }, 1500)
  }

  const tabs = [
    { icon: Settings, labelKey: 'tab_general', id: 'general' },
    { icon: Lock, labelKey: 'tab_security', id: 'security' },
    { icon: Users, labelKey: 'tab_users', id: 'users' },
    { icon: Bell, labelKey: 'tab_alerts', id: 'notifications' },
    { icon: Database, labelKey: 'tab_backup', id: 'data' },
  ]

  const sessions = [
    { deviceEn: 'Desktop - Chrome', deviceUr: 'ڈیسک ٹاپ — کروم', locationEn: 'Rawalpindi, PK', locationUr: 'راولپنڈی، پاکستان', active: true },
    { deviceEn: 'iPhone 15 Pro', deviceUr: 'آئی فون ۱۵ پرو', locationEn: 'Islamabad, PK', locationUr: 'اسلام آباد، پاکستان', active: false },
  ]

  return (
    <div className="p-8 bg-[#f8faf9] min-h-screen" dir={dir}>

      {/* Header */}
      <div className={cn('flex items-center gap-4 mb-10', isUrdu && 'flex-row-reverse')}>
        <div className="p-3 rounded-2xl bg-[#2d5a4c] text-white shadow-xl shadow-emerald-900/10">
          <Settings className="w-8 h-8" />
        </div>
        <div className={isUrdu ? 'text-right' : ''}>
          <h1 className={cn('text-[#2d5a4c] tracking-tight', isUrdu ? 'font-urdu text-4xl' : 'text-3xl font-serif')}>
            {isUrdu ? 'نظامی ترجیحات' : <>System <span className="font-black italic">Preferences</span></>}
          </h1>
          <p className={cn('text-[#2d5a4c]/50', isUrdu ? 'font-urdu text-base mt-1' : 'text-[10px] uppercase tracking-[0.3em] font-black')}>
            {t('set_subtitle')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Tabs */}
        <div>
          <Card className="p-3 bg-white border-2 border-emerald-800/5 rounded-2xl shadow-sm sticky top-8">
            <div className="space-y-1">
              {tabs.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      'w-full h-12 rounded-xl transition-all gap-3',
                      isUrdu ? 'justify-end flex-row-reverse font-urdu text-base' : 'justify-start font-black uppercase tracking-widest text-[9px]',
                      isActive
                        ? 'bg-[#2d5a4c] text-white hover:bg-[#1a382f] shadow-lg shadow-emerald-900/10'
                        : 'text-[#2d5a4c]/50 hover:bg-emerald-50 hover:text-[#2d5a4c]'
                    )}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {t(item.labelKey)}
                  </Button>
                )
              })}
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'general' && (
            <Card className="p-8 bg-white border-2 border-emerald-800/5 rounded-2xl shadow-sm">
              <h2 className={cn('text-[#2d5a4c] mb-8 pb-4 border-b border-emerald-800/5', isUrdu ? 'font-urdu text-2xl text-right' : 'text-xl font-serif italic')}>
                {t('tab_general')}
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className={cn('text-[#2d5a4c]/60 block', isUrdu ? 'font-urdu text-base text-right' : 'text-[10px] font-black uppercase tracking-widest')}>{t('field_org')}</Label>
                    <Input defaultValue={isUrdu ? 'وزارتِ خزانہ و اراضی' : 'Ministry of Land & Resources'} className={cn('h-14 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl text-[#2d5a4c]', isUrdu ? 'font-urdu text-right text-base' : 'font-bold')} dir={dir} />
                  </div>
                  <div className="space-y-2">
                    <Label className={cn('text-[#2d5a4c]/60 block', isUrdu ? 'font-urdu text-base text-right' : 'text-[10px] font-black uppercase tracking-widest')}>{t('field_email')}</Label>
                    <Input type="email" defaultValue="admin@government.org" className="h-14 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl font-bold text-[#2d5a4c]" dir="ltr" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className={cn('text-[#2d5a4c]/60 block', isUrdu ? 'font-urdu text-base text-right' : 'text-[10px] font-black uppercase tracking-widest')}>{t('field_notes')}</Label>
                  <textarea
                    placeholder={t('notes_placeholder')}
                    className={cn('w-full min-h-[100px] p-5 rounded-xl bg-emerald-50/10 border-2 border-emerald-800/10 text-sm focus:outline-none focus:border-emerald-500 transition-all text-[#2d5a4c]', isUrdu ? 'font-urdu text-right text-base' : 'font-medium')}
                    dir={dir}
                  />
                </div>
                <div className={cn('flex items-center justify-between pt-6 border-t border-emerald-800/5', isUrdu && 'flex-row-reverse')}>
                  <p className={cn('text-[#2d5a4c]/30', isUrdu ? 'font-urdu text-sm text-right' : 'text-[9px] text-[#2d5a4c]/30 font-bold italic')}>{t('audit_note')}</p>
                  <Button className={cn('h-12 px-8 bg-[#2d5a4c] hover:bg-[#1a382f] text-white rounded-xl shadow-lg', isUrdu ? 'font-urdu text-base' : 'font-black uppercase tracking-widest text-[10px]')} onClick={handleSave} disabled={isSaving}>
                    {isSaving
                      ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />{t('saving')}</>
                      : <><CheckCircle2 className={cn('w-4 h-4', isUrdu ? 'ml-2' : 'mr-2')} />{t('btn_save')}</>
                    }
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card className="p-8 bg-white border-2 border-emerald-800/5 rounded-2xl shadow-sm">
              <h2 className={cn('text-[#2d5a4c] mb-8 pb-4 border-b border-emerald-800/5', isUrdu ? 'font-urdu text-2xl text-right' : 'text-xl font-serif italic')}>
                {t('tab_security')}
              </h2>
              <div className="space-y-8">
                <div className="p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-800/5">
                  <div className={cn('flex items-start gap-4', isUrdu && 'flex-row-reverse')}>
                    <div className="w-12 h-12 rounded-xl bg-[#2d5a4c] flex items-center justify-center text-white flex-shrink-0">
                      <Lock className="w-6 h-6" />
                    </div>
                    <div className={isUrdu ? 'text-right flex-1' : 'flex-1'}>
                      <h3 className={cn('text-[#2d5a4c] mb-1', isUrdu ? 'font-urdu text-xl' : 'font-black text-sm uppercase tracking-tight')}>{t('two_fa_title')}</h3>
                      <p className={cn('text-[#2d5a4c]/50 mb-4', isUrdu ? 'font-urdu text-base' : 'text-xs')}>{t('two_fa_desc')}</p>
                      <Button variant="outline" className={cn('border-2 border-emerald-800/10 text-[#2d5a4c] h-10 px-6 rounded-xl hover:bg-white', isUrdu ? 'font-urdu text-base' : 'font-black text-[10px] uppercase tracking-widest')}>
                        {t('configure_2fa')}
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className={cn('text-[#2d5a4c]/40', isUrdu ? 'font-urdu text-base text-right' : 'text-[10px] font-black uppercase tracking-widest')}>{t('sessions_title')}</h3>
                  {sessions.map((session, i) => (
                    <div key={i} className={cn('flex items-center justify-between p-5 rounded-xl border-2 border-emerald-800/5 bg-white', isUrdu && 'flex-row-reverse')}>
                      <div className={isUrdu ? 'text-right' : ''}>
                        <p className={cn('text-[#2d5a4c]', isUrdu ? 'font-urdu text-xl' : 'font-black text-sm')}>{isUrdu ? session.deviceUr : session.deviceEn}</p>
                        <p className={cn('text-[#2d5a4c]/40', isUrdu ? 'font-urdu text-sm' : 'text-[10px] font-bold uppercase')}>{isUrdu ? session.locationUr : session.locationEn}</p>
                      </div>
                      {session.active
                        ? <span className={cn('px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-800/10', isUrdu ? 'font-urdu text-sm' : 'text-[8px] font-black uppercase tracking-widest')}>{t('session_current')}</span>
                        : <Button variant="ghost" className={cn('text-rose-500 h-8 px-3 hover:bg-rose-50 rounded-lg', isUrdu ? 'font-urdu text-base' : 'text-[8px] font-black uppercase tracking-widest')}>{t('session_revoke')}</Button>
                      }
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {!['general', 'security'].includes(activeTab) && (
            <Card className="p-16 bg-white border-2 border-dashed border-emerald-800/10 rounded-2xl flex flex-col items-center justify-center text-center">
              <Database className="w-12 h-12 text-[#2d5a4c]/10 mb-6" />
              <h3 className={cn('text-[#2d5a4c] mb-2', isUrdu ? 'font-urdu text-2xl' : 'text-lg font-serif italic')}>{t('maintenance_title')}</h3>
              <p className={cn('text-[#2d5a4c]/30', isUrdu ? 'font-urdu text-base' : 'text-sm')}>
                {t('maintenance_desc')}
              </p>
            </Card>
          )}
        </div>
      </div>

      <div className="mt-16 text-center opacity-10 pointer-events-none">
        <Stamp className="w-12 h-12 mx-auto mb-4 text-[#2d5a4c]" />
        <p className={cn('text-[#2d5a4c]', isUrdu ? 'font-urdu text-base' : 'text-[8px] font-black uppercase tracking-[0.5em]')}>{t('lrmis_footer')}</p>
      </div>
    </div>
  )
}
