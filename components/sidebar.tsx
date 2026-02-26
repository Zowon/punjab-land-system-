'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  MapPin, BarChart3, CreditCard, FileText,
  Settings, LogOut, Home, Users, TrendingUp, Map, Search, Languages
} from 'lucide-react'
import { useLanguage } from '@/contexts/language-context'

export function Sidebar() {
  const pathname = usePathname()
  const { t, language, setLanguage, isUrdu } = useLanguage()

  const menuItems = [
    { icon: Home, labelKey: 'nav_dashboard', href: '/dashboard' },
    { icon: MapPin, labelKey: 'nav_properties', href: '/dashboard/properties' },
    { icon: Map, labelKey: 'nav_maps', href: '/dashboard/maps' },
    { icon: Users, labelKey: 'nav_ownership', href: '/dashboard/ownership-transfer' },
    { icon: Users, labelKey: 'nav_sales', href: '/dashboard/sales' },
    { icon: CreditCard, labelKey: 'nav_payments', href: '/dashboard/payments' },
    { icon: TrendingUp, labelKey: 'nav_transactions', href: '/dashboard/transactions' },
    { icon: BarChart3, labelKey: 'nav_analytics', href: '/dashboard/analytics' },
    { icon: FileText, labelKey: 'nav_reports', href: '/dashboard/reports' },
    { icon: Search, labelKey: 'nav_search', href: '/dashboard/search-rightholders' },
  ]

  return (
    <aside className={cn(
      'w-72 bg-sidebar border-sidebar-border h-screen sticky top-0 overflow-y-auto flex flex-col',
      isUrdu ? 'border-l' : 'border-r'
    )}>

      {/* Logo + LRMIS Brand */}
      <div className="p-5 border-b border-sidebar-border">
        <div className={cn('flex items-center gap-3', isUrdu && 'flex-row-reverse')}>
          <div className="w-12 h-12 rounded-xl bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground font-black text-sm tracking-tight flex-shrink-0">
            LR
          </div>
          <div className="flex-1 min-w-0">
            <p className={cn('font-black text-sidebar-foreground text-sm tracking-tight', isUrdu && 'text-right font-urdu text-base')}>
              {isUrdu ? 'ایل آر ایم آئی ایس' : 'LRMIS'}
            </p>
            <p className={cn('text-[10px] text-sidebar-foreground/50 font-bold uppercase tracking-widest', isUrdu && 'text-right font-urdu text-xs normal-case tracking-normal')}>
              {isUrdu ? 'پنجاب اراضی ریکارڈ' : 'Punjab Land Records'}
            </p>
          </div>
        </div>

        {/* Language Toggle */}
        <div className="mt-4 flex rounded-xl overflow-hidden border-2 border-sidebar-border">
          <button
            onClick={() => setLanguage('en')}
            className={cn(
              'flex-1 py-2 text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-1.5',
              language === 'en'
                ? 'bg-sidebar-primary text-white'
                : 'text-sidebar-foreground/40 hover:text-sidebar-foreground hover:bg-sidebar-accent/30'
            )}
          >
            <span>EN</span>
            <span className="text-[8px] opacity-60">English</span>
          </button>
          <button
            onClick={() => setLanguage('ur')}
            className={cn(
              'flex-1 py-2 text-[11px] font-black transition-all flex items-center justify-center gap-1.5',
              language === 'ur'
                ? 'bg-sidebar-primary text-white'
                : 'text-sidebar-foreground/40 hover:text-sidebar-foreground hover:bg-sidebar-accent/30'
            )}
          >
            <Languages className="w-3 h-3" />
            <span className="font-urdu text-sm">اردو</span>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all group',
                isUrdu ? 'flex-row-reverse text-right' : '',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-black/20'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground'
              )}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span className={cn(
                'flex-1 truncate',
                isUrdu
                  ? 'font-urdu text-base leading-relaxed'
                  : 'font-bold text-[11px] uppercase tracking-wider'
              )}>
                {t(item.labelKey)}
              </span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        <Link
          href="/dashboard/settings"
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-xl transition-all group',
            isUrdu ? 'flex-row-reverse' : '',
            pathname === '/dashboard/settings'
              ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-black/20'
              : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground'
          )}
        >
          <Settings className="w-4 h-4 flex-shrink-0" />
          <span className={cn(
            'flex-1',
            isUrdu ? 'font-urdu text-base text-right' : 'font-bold text-[11px] uppercase tracking-wider'
          )}>
            {t('nav_settings')}
          </span>
        </Link>
        <button
          onClick={() => window.location.href = '/'}
          className={cn(
            'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground transition-all',
            isUrdu ? 'flex-row-reverse text-right' : 'text-left'
          )}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span className={cn(
            'flex-1',
            isUrdu ? 'font-urdu text-base' : 'font-bold text-[11px] uppercase tracking-wider'
          )}>
            {t('nav_logout')}
          </span>
        </button>
      </div>
    </aside>
  )
}
