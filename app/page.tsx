'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Building2,
  ShieldCheck,
  Map as MapIcon,
  FileSearch,
  CreditCard,
  Activity,
  ArrowRight,
  Stamp,
  Globe
} from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8faf9] text-[#1a382f]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-800/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#2d5a4c] text-white shadow-lg shadow-emerald-900/20">
              <Stamp className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter uppercase leading-none">LRMIS</span>
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#2d5a4c]/60">Punjab Land Authority</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-[10px] font-black uppercase tracking-widest hover:text-[#2d5a4c] transition-colors">
              Administrative Login
            </Link>
            <Link href="/login">
              <Button className="bg-[#2d5a4c] hover:bg-[#1a382f] text-white font-black uppercase tracking-widest text-[9px] h-10 px-6 rounded-lg shadow-lg shadow-emerald-900/10">
                Register Property
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100 mb-8">
          <ShieldCheck className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">Official Government Portal</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-serif text-[#2d5a4c] mb-8 tracking-tighter leading-tight max-w-5xl">
          Digital Excellence in <span className="italic font-black">Land Records</span>
        </h1>
        <p className="text-lg text-[#2d5a4c]/70 mb-12 max-w-3xl leading-relaxed font-medium">
          The official Land Records Management & Information System (LRMIS) provides a secure, transparent, and efficient gateway for all property transactions, mutations, and title verifications.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link href="/login">
            <Button className="h-16 px-10 bg-[#2d5a4c] hover:bg-[#1a382f] text-white font-black uppercase tracking-[0.2em] text-xs rounded-xl shadow-2xl shadow-emerald-900/20 group">
              Access Citizen Portal
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" className="h-16 px-10 border-2 border-emerald-800/10 text-[#2d5a4c] font-black uppercase tracking-[0.2em] text-xs rounded-xl hover:bg-emerald-50 transition-all">
              Verify Fard-e-Malkiat
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-32">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: MapIcon,
              title: 'Cadastral Mapping',
              description: 'Precise GIS-integrated village maps (Massavi) showing exact plot boundaries and survey data.'
            },
            {
              icon: FileSearch,
              title: 'Mutation Tracking',
              description: 'End-to-end transparency in land title transfers from identity verification to final sanctioning.'
            },
            {
              icon: CreditCard,
              title: 'Revenue Ledger',
              description: 'Direct integration with state treasuries for secure payment of Stamp Duty and Registration Fees.'
            }
          ].map((feature, idx) => (
            <Card key={idx} className="p-10 bg-white border-2 border-emerald-800/5 hover:border-emerald-500/20 transition-all duration-500 shadow-sm hover:shadow-xl group">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-8 group-hover:bg-[#2d5a4c] transition-all">
                <feature.icon className="w-8 h-8 text-[#2d5a4c] group-hover:text-white transition-all" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[#2d5a4c] mb-4">
                {feature.title}
              </h3>
              <p className="text-[#2d5a4c]/60 text-sm leading-relaxed font-medium">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Trust Quote */}
      <section className="bg-[#2d5a4c] text-white py-24 overflow-hidden relative">
        <Globe className="absolute top-1/2 left-0 w-[800px] h-[800px] text-white/5 -translate-y-1/2 -ml-96 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-serif mb-8 italic">
              "Ensuring tenure security and absolute transparency for every citizen across the region."
            </h2>
            <div className="flex items-center gap-4">
              <div className="w-12 h-[2px] bg-white/40" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Directorate of Land Records</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-emerald-800/10 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:row items-center justify-between gap-8">
          <div className="flex items-center gap-3 grayscale opacity-50">
            <Stamp className="w-6 h-6" />
            <span className="text-sm font-black tracking-tighter uppercase">LRMIS PORTAL</span>
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2d5a4c]/40">
            &copy; 2026 Punjab Land Records Authority. All rights reserved.
          </div>
          <div className="flex gap-8">
            {['Privacy', 'Legal', 'Archives', 'Support'].map(item => (
              <Link key={item} href="#" className="text-[10px] font-black uppercase tracking-widest text-[#2d5a4c]/40 hover:text-[#2d5a4c]">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </main>
  )
}
