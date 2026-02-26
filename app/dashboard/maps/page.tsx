'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MapPin, Search, Map, Stamp } from 'lucide-react'
import { LeafletMap } from '@/components/leaflet-map'
import { useLanguage } from '@/contexts/language-context'
import { cn } from '@/lib/utils'

const plotData = [
  { id: 'P-001', khasraNumber: 'KH-001', x: 20, y: 30, width: 60, height: 50, status: 'sold', area: '500m²', ownerEn: 'Hassan Khan', ownerUr: 'حسن خان' },
  { id: 'P-002', khasraNumber: 'KH-012', x: 90, y: 20, width: 70, height: 55, status: 'available', area: '750m²', ownerEn: 'Available', ownerUr: 'دستیاب' },
  { id: 'P-003', khasraNumber: 'KH-045', x: 170, y: 35, width: 65, height: 48, status: 'reserved', area: '600m²', ownerEn: 'Ibrahim Khan', ownerUr: 'ابراہیم خان' },
  { id: 'P-004', khasraNumber: 'KH-089', x: 30, y: 100, width: 55, height: 50, status: 'sold', area: '450m²', ownerEn: 'Ahmed Abdullah', ownerUr: 'احمد عبداللہ' },
  { id: 'P-005', khasraNumber: 'KH-156', x: 100, y: 95, width: 75, height: 60, status: 'available', area: '800m²', ownerEn: 'Available', ownerUr: 'دستیاب' },
  { id: 'P-006', khasraNumber: 'KH-203', x: 185, y: 100, width: 68, height: 52, status: 'sold', area: '650m²', ownerEn: 'Layla Ahmed', ownerUr: 'لیلیٰ احمد' },
  { id: 'P-007', khasraNumber: 'KH-267', x: 50, y: 170, width: 62, height: 55, status: 'available', area: '700m²', ownerEn: 'Available', ownerUr: 'دستیاب' },
  { id: 'P-008', khasraNumber: 'KH-301', x: 125, y: 175, width: 70, height: 58, status: 'reserved', area: '550m²', ownerEn: 'Zainab Malik', ownerUr: 'زینب ملک' },
  { id: 'P-009', khasraNumber: 'KH-345', x: 200, y: 165, width: 65, height: 50, status: 'sold', area: '580m²', ownerEn: 'Samir Khan', ownerUr: 'سمیر خان' },
  { id: 'P-010', khasraNumber: 'KH-389', x: 80, y: 240, width: 68, height: 55, status: 'available', area: '720m²', ownerEn: 'Available', ownerUr: 'دستیاب' },
]

const statusConfig: Record<string, { bg: string; border: string; labelEn: string; labelUr: string }> = {
  sold: { bg: 'rgb(239,68,68)', border: '#c91e1e', labelEn: 'Sold', labelUr: 'فروخت شدہ' },
  available: { bg: 'rgb(34,197,94)', border: '#15803d', labelEn: 'Available', labelUr: 'دستیاب' },
  reserved: { bg: 'rgb(202,138,4)', border: '#a16207', labelEn: 'Reserved', labelUr: 'محفوظ' },
}

const statusDotClass: Record<string, string> = {
  sold: 'bg-rose-500',
  available: 'bg-emerald-500',
  reserved: 'bg-amber-500',
}

export default function MapsPage() {
  const { t, isUrdu } = useLanguage()
  const dir = isUrdu ? 'rtl' : 'ltr'
  const [selectedPlot, setSelectedPlot] = useState<typeof plotData[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPlots = plotData.filter((plot) =>
    plot.khasraNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plot.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plot.ownerEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plot.ownerUr.includes(searchTerm)
  )

  const statusStats = {
    sold: plotData.filter((p) => p.status === 'sold').length,
    available: plotData.filter((p) => p.status === 'available').length,
    reserved: plotData.filter((p) => p.status === 'reserved').length,
  }

  return (
    <div className="p-8 bg-[#f8faf9] min-h-screen" dir={dir}>

      {/* Header */}
      <div className={cn('flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6', isUrdu && 'md:flex-row-reverse')}>
        <div className={cn('flex items-center gap-4', isUrdu && 'flex-row-reverse')}>
          <div className="p-3 rounded-2xl bg-[#2d5a4c] text-white shadow-xl shadow-emerald-900/10">
            <Map className="w-8 h-8" />
          </div>
          <div className={isUrdu ? 'text-right' : ''}>
            <h1 className={cn('text-[#2d5a4c] tracking-tight', isUrdu ? 'font-urdu text-4xl' : 'text-3xl font-serif')}>
              {isUrdu ? 'نقشے اور قطعات' : <>Cadastral <span className="font-black italic">Maps & Plots</span></>}
            </h1>
            <p className={cn('text-[#2d5a4c]/50', isUrdu ? 'font-urdu text-base mt-1' : 'text-[10px] uppercase tracking-[0.3em] font-black')}>
              {isUrdu
                ? 'جائیداد کے قطعات کا تعاملی نقشہ — خسرہ میپنگ'
                : 'Interactive visualization of property plots — Khasra mapping'}
            </p>
          </div>
        </div>

        {/* Stats Strip */}
        <div className={cn('flex items-center gap-3', isUrdu && 'flex-row-reverse')}>
          {(['available', 'sold', 'reserved'] as const).map((status) => (
            <div key={status} className={cn('flex items-center gap-2 px-4 py-2 bg-white rounded-xl border-2 border-emerald-800/5 shadow-sm', isUrdu && 'flex-row-reverse')}>
              <div className={cn('w-2.5 h-2.5 rounded-full', statusDotClass[status])} />
              <span className={cn('text-[#2d5a4c]', isUrdu ? 'font-urdu text-base' : 'text-[9px] font-black uppercase tracking-widest')}>
                {isUrdu ? statusConfig[status].labelUr : statusConfig[status].labelEn}
              </span>
              <span className="text-xs font-black text-[#2d5a4c] font-mono">{statusStats[status]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Search */}
      <Card className={cn('bg-white border-2 border-emerald-800/5 rounded-2xl shadow-sm p-4 flex gap-4 items-center mb-8', isUrdu && 'flex-row-reverse')}>
        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-[#2d5a4c]">
          <Search className="w-6 h-6" />
        </div>
        <div className={cn('flex-1', isUrdu ? 'text-right' : '')}>
          <p className={cn('text-[#2d5a4c]/40 mb-1', isUrdu ? 'font-urdu text-sm' : 'text-[9px] font-black uppercase tracking-widest')}>
            {isUrdu ? 'خسرہ یا قطعہ نمبر سے تلاش کریں' : 'Search by Khasra or Plot ID'}
          </p>
          <Input
            placeholder={isUrdu ? 'مثال: KH-001 یا P-001...' : 'e.g., KH-001 or P-001...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={cn('bg-transparent border-0 h-9 text-[#2d5a4c] focus-visible:ring-0 placeholder:text-[#2d5a4c]/30 p-0', isUrdu ? 'font-urdu text-right text-base' : 'font-bold')}
            dir="ltr"
          />
        </div>
      </Card>

      {/* Map Viewer */}
      <Card className="mb-8 overflow-hidden rounded-2xl border-2 border-emerald-800/5 shadow-xl shadow-emerald-900/5">
        <div className={cn('px-6 py-4 bg-[#2d5a4c]/5 border-b border-emerald-800/5 flex items-center gap-3', isUrdu && 'flex-row-reverse')}>
          <MapPin className="w-4 h-4 text-[#2d5a4c]/40" />
          <span className={cn('text-[#2d5a4c]/50', isUrdu ? 'font-urdu text-base' : 'text-[9px] font-black uppercase tracking-widest')}>
            {isUrdu ? 'تعاملی اراضی نقشہ — اٹک، پنجاب' : 'Interactive Land Map — Attock, Punjab'}
          </span>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className={cn('text-[#2d5a4c]/30', isUrdu ? 'font-urdu text-sm' : 'text-[8px] font-black uppercase tracking-[0.2em]')}>
              {isUrdu ? 'لائیو نقشہ' : 'Live Map'}
            </span>
          </div>
        </div>
        <div style={{ height: '500px' }}>
          <LeafletMap onPlotSelect={setSelectedPlot} selectedPlot={selectedPlot} />
        </div>
      </Card>

      {/* Selected Plot Detail Panel */}
      {selectedPlot && (
        <Card className="bg-white border-2 border-emerald-500/30 rounded-2xl shadow-lg p-8 mb-8">
          <div className={cn('flex items-center gap-3 mb-6', isUrdu && 'flex-row-reverse')}>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-[#2d5a4c]">
              <MapPin className="w-5 h-5" />
            </div>
            <div className={isUrdu ? 'text-right' : ''}>
              <h2 className={cn('text-[#2d5a4c]', isUrdu ? 'font-urdu text-2xl' : 'text-lg font-black uppercase tracking-tight')}>
                {isUrdu ? 'منتخب قطعے کی تفصیل' : 'Selected Plot Details'}
              </h2>
            </div>
          </div>
          <div className={cn('grid grid-cols-2 md:grid-cols-4 gap-6', isUrdu && '[direction:rtl]')}>
            {[
              { labelEn: 'Khasra Number', labelUr: 'خسرہ نمبر', value: selectedPlot.khasraNumber },
              { labelEn: 'Plot ID', labelUr: 'قطعہ شناخت', value: selectedPlot.id },
              { labelEn: 'Area', labelUr: 'رقبہ', value: selectedPlot.area },
              { labelEn: 'Status', labelUr: 'حیثیت', value: isUrdu ? statusConfig[selectedPlot.status].labelUr : statusConfig[selectedPlot.status].labelEn, statusColor: statusConfig[selectedPlot.status].bg },
            ].map((item, i) => (
              <div key={i} className={isUrdu ? 'text-right' : ''}>
                <p className={cn('text-[#2d5a4c]/40 mb-1', isUrdu ? 'font-urdu text-sm' : 'text-[9px] font-black uppercase tracking-widest')}>{isUrdu ? item.labelUr : item.labelEn}</p>
                {item.statusColor
                  ? <div className={cn('flex items-center gap-2 mt-1', isUrdu && 'flex-row-reverse')}>
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.statusColor }} />
                    <p className={cn('text-[#2d5a4c]', isUrdu ? 'font-urdu text-xl' : 'font-bold text-lg')}>{item.value}</p>
                  </div>
                  : <p className={cn('text-[#2d5a4c]', isUrdu ? 'font-urdu text-xl' : 'font-bold text-lg font-mono')}>{item.value}</p>
                }
              </div>
            ))}
          </div>
          <div className={cn('mt-6 pt-6 border-t border-emerald-800/5', isUrdu && 'text-right')}>
            <p className={cn('text-[#2d5a4c]/40 mb-1', isUrdu ? 'font-urdu text-sm' : 'text-[9px] font-black uppercase tracking-widest')}>
              {isUrdu ? 'موجودہ مالک' : 'Current Owner'}
            </p>
            <p className={cn('text-[#2d5a4c]', isUrdu ? 'font-urdu text-2xl' : 'font-black text-xl')}>
              {isUrdu ? selectedPlot.ownerUr : selectedPlot.ownerEn}
            </p>
          </div>
        </Card>
      )}

      {/* Plot Cards Grid */}
      <div>
        <h2 className={cn('text-[#2d5a4c] mb-6', isUrdu ? 'font-urdu text-2xl text-right' : 'text-lg font-serif italic')}>
          {searchTerm
            ? (isUrdu ? `"${searchTerm}" کے نتائج` : `Plots matching "${searchTerm}"`)
            : (isUrdu ? 'تمام قطعات' : 'All Plots')
          }
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filteredPlots.map((plot) => (
            <Card
              key={plot.id}
              className="p-6 bg-white border-2 border-emerald-800/5 rounded-2xl hover:border-emerald-500/30 hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => setSelectedPlot(plot)}
            >
              <div className={cn('flex items-start justify-between mb-5', isUrdu && 'flex-row-reverse')}>
                <div className={isUrdu ? 'text-right' : ''}>
                  <h3 className="text-lg font-black font-mono text-[#2d5a4c]">{plot.khasraNumber}</h3>
                  <p className={cn('text-[#2d5a4c]/40 mt-0.5', isUrdu ? 'font-urdu text-sm' : 'text-xs font-bold uppercase tracking-widest')}>
                    {isUrdu ? `قطعہ: ${plot.id}` : plot.id}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: statusConfig[plot.status].bg }} />
                  <span className={cn('text-[#2d5a4c]/50', isUrdu ? 'font-urdu text-sm' : 'text-[8px] font-black uppercase tracking-widest')}>
                    {isUrdu ? statusConfig[plot.status].labelUr : statusConfig[plot.status].labelEn}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className={cn('flex items-center gap-3 text-[#2d5a4c]/50', isUrdu && 'flex-row-reverse')}>
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className={cn(isUrdu ? 'font-urdu text-base text-right' : 'text-xs font-bold')}>
                    {isUrdu ? `رقبہ: ${plot.area}` : plot.area}
                  </span>
                </div>
                <p className={cn('text-[#2d5a4c]', isUrdu ? 'font-urdu text-base text-right' : 'text-sm font-bold')}>
                  {isUrdu ? plot.ownerUr : plot.ownerEn}
                </p>
              </div>

              <Button
                className={cn('w-full h-11 bg-[#2d5a4c] hover:bg-[#1a382f] text-white rounded-xl shadow-sm group-hover:shadow-lg group-hover:shadow-emerald-900/10 transition-all', isUrdu ? 'font-urdu text-base' : 'font-black uppercase tracking-widest text-[9px]')}
                size="sm"
              >
                {isUrdu ? 'تفصیل دیکھیں' : 'View Details'}
              </Button>
            </Card>
          ))}
        </div>
      </div>

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
