'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  CreditCard,
  ArrowRight,
  Info,
  ChevronDown,
  ShieldCheck,
  Building2
} from 'lucide-react'

export default function LoginPage() {
  const [cnic, setCnic] = useState('')
  const [identityType, setIdentityType] = useState('CNIC')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Navigate to dashboard for demo
    window.location.href = '/dashboard'
  }

  // Format CNIC as xxxxx-xxxxxxx-x
  const handleCnicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 13) value = value.slice(0, 13)

    let formatted = value
    if (value.length > 5) {
      formatted = value.slice(0, 5) + '-' + value.slice(5)
    }
    if (value.length > 12) {
      formatted = formatted.slice(0, 13) + '-' + formatted.slice(13)
    }

    setCnic(formatted)
  }

  return (
    <main className="min-h-screen bg-[#f8faf9] flex flex-col items-center justify-start py-12 px-4 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Header / Brand */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif text-[#2d5a4c] mb-2 tracking-tight">
          Welcome to <span className="font-black italic">LRMIS</span>
        </h1>
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#2d5a4c]/60 font-bold">
          Land Records Management & Information System
        </p>
      </div>

      {/* Stepper Component */}
      <div className="w-full max-w-4xl mb-24 relative px-8">
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-emerald-100 -translate-y-1/2" />
        <div className="relative flex justify-between items-center">
          {[
            { id: 4, label: 'Pay Fee' },
            { id: 3, label: 'Display Selection' },
            { id: 2, label: 'Search Rightholders' },
            { id: 1, label: 'Login', active: true }
          ].map((step) => (
            <div key={step.id} className="flex flex-col items-center group">
              <div className={`
                w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-all duration-300 z-10
                ${step.active
                  ? 'bg-white border-yellow-500 text-yellow-500 shadow-lg shadow-yellow-200 ring-4 ring-yellow-500/10 scale-110'
                  : 'bg-white border-emerald-100 text-emerald-200'
                }
              `}>
                {step.id}
              </div>
              <span className={`
                absolute -bottom-8 text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-colors
                ${step.active ? 'text-[#2d5a4c]' : 'text-emerald-100'}
              `}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-5xl flex flex-col md:row items-center justify-center gap-16 mt-8">
        <div className="flex flex-col md:flex-row items-center gap-12 w-full justify-between">

          {/* Card Illustration Left */}
          <div className="flex-1 flex justify-center items-center relative group">
            <div className="absolute -top-12 -left-8 text-emerald-800/20">
              <Info className="w-8 h-8" />
            </div>

            {/* CNIC Card Skeleton */}
            <div className="w-[420px] h-[260px] bg-white border-2 border-emerald-800/20 rounded-2xl shadow-xl shadow-emerald-900/5 p-8 relative overflow-hidden group-hover:border-emerald-500/40 transition-all duration-500 cursor-default">
              {/* Card Patterns */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 opacity-[0.03] rounded-full -mr-16 -mt-16" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-50 opacity-[0.03] rounded-full -ml-24 -mb-24" />

              <div className="flex gap-6 mb-8">
                <div className="w-16 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-emerald-800/20" />
                </div>
                <div className="space-y-2 flex-1 pt-1">
                  <div className="h-2 w-3/4 bg-emerald-800/10 rounded-full" />
                  <div className="h-2 w-1/2 bg-emerald-800/10 rounded-full" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-10 w-14 border-2 border-emerald-800/10 rounded-lg" />
                  ))}
                </div>
                <div className="flex gap-3 pt-4">
                  <div className="h-1.5 w-full bg-emerald-800/5 rounded-full" />
                  <div className="h-1.5 w-2/3 bg-emerald-800/5 rounded-full" />
                </div>
                <div className="h-1.5 w-1/2 bg-emerald-800/5 rounded-full" />
              </div>

              {/* Hologram Circle */}
              <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-50 to-white border border-emerald-800/5 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-emerald-800/10" />
              </div>
            </div>
          </div>

          {/* Form Field Right */}
          <div className="flex-1 max-w-md w-full">
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Identity Type Dropdown */}
              <div className="space-y-3 relative group">
                <div className="flex justify-between items-center px-1">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2d5a4c]/60">Identity Type</Label>
                  <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded">Required</span>
                </div>
                <div className="relative">
                  <select
                    value={identityType}
                    onChange={(e) => setIdentityType(e.target.value)}
                    className="w-full h-14 pl-4 pr-10 bg-white border-2 border-emerald-800/10 rounded-xl appearance-none focus:outline-none focus:border-emerald-500 transition-all font-black uppercase text-xs tracking-widest text-[#2d5a4c] shadow-sm shadow-emerald-900/5"
                  >
                    <option value="CNIC">National ID / CNIC</option>
                    <option value="PPS">Passport Number</option>
                    <option value="ARC">Alien Registration Card</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2d5a4c]/40 pointer-events-none" />
                </div>
              </div>

              {/* CNIC Input */}
              <div className="space-y-3 relative group">
                <div className="flex justify-between items-center px-1">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2d5a4c]/60">{identityType} Number</Label>
                </div>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="xxxxx-xxxxxxx-x"
                    value={cnic}
                    onChange={handleCnicChange}
                    className="w-full h-14 pl-4 bg-white border-2 border-emerald-800/10 rounded-xl focus:border-emerald-500 transition-all font-mono text-lg tracking-[0.15em] text-[#2d5a4c] shadow-sm shadow-emerald-900/5"
                    required
                  />
                  <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2d5a4c]/20" />
                </div>
                <p className="text-[9px] text-[#2d5a4c]/40 font-bold italic px-1">Format: 35202-0000000-1</p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col items-center gap-8">
                <Button
                  type="submit"
                  className="w-full h-14 bg-[#2d5a4c] hover:bg-[#1a382f] text-white font-black uppercase tracking-[0.2em] text-xs rounded-xl shadow-xl shadow-emerald-900/20 group transition-all duration-300 active:scale-[0.98]"
                >
                  Proceed to Verification
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-emerald-800/10" />
                  <Link href="/register" className="text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-800 transition-colors border-b-2 border-emerald-600/20 pb-0.5">
                    Click here for New Registration
                  </Link>
                  <div className="w-8 h-[1px] bg-emerald-800/10" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Decorative Footer Graphics */}
      <div className="fixed bottom-0 left-0 p-8 w-full pointer-events-none opacity-40">
        <div className="flex items-end gap-1">
          {[2, 4, 3, 5, 2, 6, 3, 4].map((h, i) => (
            <div key={i} className="w-3 bg-[#2d5a4c]/20 rounded-t-full" style={{ height: `${h * 8}px` }} />
          ))}
          <span className="text-[8px] font-black uppercase tracking-widest text-[#2d5a4c]/20 ml-2 mb-1 italic">Authorized Personnel Only</span>
        </div>
      </div>
    </main>
  )
}
