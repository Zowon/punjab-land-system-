'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  User,
  CreditCard,
  MapPin,
  Mail,
  Phone,
  Home,
  ChevronDown,
  Building2,
  Stamp,
  RotateCcw,
  Check
} from 'lucide-react'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    nic: '',
    guardianName: '',
    guardianType: 'Father',
    tehsil: '',
    district: '',
    email: '',
    phone: '',
    address: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // For demo purposes
    window.location.href = '/dashboard'
  }

  const handleReset = () => {
    setFormData({
      name: '',
      nic: '',
      guardianName: '',
      guardianType: 'Father',
      tehsil: '',
      district: '',
      email: '',
      phone: '',
      address: ''
    })
  }

  const handleNicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 13) value = value.slice(0, 13)

    let formatted = value
    if (value.length > 5) {
      formatted = value.slice(0, 5) + '-' + value.slice(5)
    }
    if (value.length > 12) {
      formatted = formatted.slice(0, 13) + '-' + formatted.slice(13)
    }
    setFormData({ ...formData, nic: formatted })
  }

  return (
    <main className="min-h-screen bg-[#f8faf9] flex flex-col items-center justify-start py-8 px-4 font-sans selection:bg-emerald-100">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-[#2d5a4c] text-white shadow-lg shadow-emerald-900/10">
            <Stamp className="w-5 h-5" />
          </div>
          <h1 className="text-3xl font-serif text-[#2d5a4c] tracking-tight">
            New <span className="font-black italic">Registration</span>
          </h1>
        </div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#2d5a4c]/50 font-black">
          Official Citizen Enrollment Service
        </p>
      </div>

      {/* Main Registration Form */}
      <div className="w-full max-w-5xl bg-white border-2 border-emerald-800/5 rounded-3xl shadow-xl shadow-emerald-900/5 p-8 md:p-12">
        <form onSubmit={handleSubmit} className="space-y-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">

            {/* Name */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center px-1">
                <Label className="text-[10px] font-black uppercase tracking-widest text-[#2d5a4c]/60">Name</Label>
              </div>
              <div className="relative group">
                <Input
                  placeholder="Enter Full Name"
                  className="h-14 pl-12 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl focus:border-emerald-500 transition-all font-bold text-[#2d5a4c]"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2d5a4c]/20 group-focus-within:text-emerald-500 transition-colors" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black uppercase text-[#2d5a4c]/30 italic opacity-0 group-hover:opacity-100 transition-opacity">Full Legal Name</span>
              </div>
            </div>

            {/* NIC */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center px-1">
                <Label className="text-[10px] font-black uppercase tracking-widest text-[#2d5a4c]/60">NIC</Label>
              </div>
              <div className="relative group">
                <Input
                  placeholder="xxxxx-xxxxxxx-x"
                  className="h-14 pl-12 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl focus:border-emerald-500 transition-all font-mono tracking-widest font-black text-[#2d5a4c]"
                  value={formData.nic}
                  onChange={handleNicChange}
                  required
                />
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2d5a4c]/20 group-focus-within:text-emerald-500 transition-colors" />
              </div>
            </div>

            {/* Guardian Name */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center px-1">
                <Label className="text-[10px] font-black uppercase tracking-widest text-[#2d5a4c]/60">Guardian Name</Label>
              </div>
              <div className="relative group">
                <Input
                  placeholder="Enter Guardian's Full Name"
                  className="h-14 pl-12 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl focus:border-emerald-500 transition-all font-bold text-[#2d5a4c]"
                  value={formData.guardianName}
                  onChange={e => setFormData({ ...formData, guardianName: e.target.value })}
                  required
                />
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2d5a4c]/20 group-focus-within:text-emerald-500 transition-colors" />
              </div>
            </div>

            {/* Guardian Type */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center px-1">
                <Label className="text-[10px] font-black uppercase tracking-widest text-[#2d5a4c]/60">Guardian</Label>
              </div>
              <div className="relative group">
                <select
                  className="w-full h-14 pl-4 pr-10 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl appearance-none focus:outline-none focus:border-emerald-500 transition-all font-black uppercase text-[11px] tracking-widest text-[#2d5a4c]"
                  value={formData.guardianType}
                  onChange={e => setFormData({ ...formData, guardianType: e.target.value })}
                >
                  <option>Select Guardian Type</option>
                  <option value="Father">Father</option>
                  <option value="Husband">Husband</option>
                  <option value="Guardian">Legal Guardian</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2d5a4c]/40 pointer-events-none" />
              </div>
            </div>

            {/* Tehsil */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center px-1">
                <Label className="text-[10px] font-black uppercase tracking-widest text-[#2d5a4c]/60">Tehsil</Label>
              </div>
              <div className="relative group">
                <select
                  className="w-full h-14 pl-4 pr-10 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl appearance-none focus:outline-none focus:border-emerald-500 transition-all font-black uppercase text-[11px] tracking-widest text-[#2d5a4c]"
                  value={formData.tehsil}
                  onChange={e => setFormData({ ...formData, tehsil: e.target.value })}
                >
                  <option>Select Tehsil</option>
                  <option>Attock</option>
                  <option>Fateh Jang</option>
                  <option>Hassan Abdal</option>
                  <option>Pindi Gheb</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2d5a4c]/40 pointer-events-none" />
              </div>
            </div>

            {/* District */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center px-1">
                <Label className="text-[10px] font-black uppercase tracking-widest text-[#2d5a4c]/60">District</Label>
              </div>
              <div className="relative group">
                <select
                  className="w-full h-14 pl-4 pr-10 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl appearance-none focus:outline-none focus:border-emerald-500 transition-all font-black uppercase text-[11px] tracking-widest text-[#2d5a4c]"
                  value={formData.district}
                  onChange={e => setFormData({ ...formData, district: e.target.value })}
                >
                  <option>Select District</option>
                  <option>Attock</option>
                  <option>Rawalpindi</option>
                  <option>Jhelum</option>
                  <option>Chakwal</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2d5a4c]/40 pointer-events-none" />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center px-1">
                <Label className="text-[10px] font-black uppercase tracking-widest text-[#2d5a4c]/60">Email</Label>
              </div>
              <div className="relative group">
                <Input
                  type="email"
                  placeholder="email@domain.com"
                  className="h-14 pl-12 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl focus:border-emerald-500 transition-all font-bold text-[#2d5a4c]"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2d5a4c]/20 group-focus-within:text-emerald-500 transition-colors" />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center px-1">
                <Label className="text-[10px] font-black uppercase tracking-widest text-[#2d5a4c]/60">Phone Number</Label>
              </div>
              <div className="relative group">
                <Input
                  placeholder="03XXXXXXXXX"
                  className="h-14 pl-12 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-xl focus:border-emerald-500 transition-all font-mono tracking-widest font-black text-[#2d5a4c]"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 11) })}
                />
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2d5a4c]/20 group-focus-within:text-emerald-500 transition-colors" />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2.5 md:col-span-2">
              <div className="flex justify-between items-center px-1">
                <Label className="text-[10px] font-black uppercase tracking-widest text-[#2d5a4c]/60">Address</Label>
              </div>
              <div className="relative group">
                <Textarea
                  placeholder="Enter Permanent Resident Address"
                  className="min-h-[120px] pl-12 pt-4 bg-emerald-50/10 border-2 border-emerald-800/10 rounded-2xl focus:border-emerald-500 transition-all font-bold text-[#2d5a4c] resize-none"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                />
                <MapPin className="absolute left-4 top-5 w-5 h-5 text-[#2d5a4c]/20 group-focus-within:text-emerald-500 transition-colors" />
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 pt-8 border-t border-emerald-800/5">
            <Button
              type="button"
              onClick={handleReset}
              variant="outline"
              className="h-14 px-10 border-2 border-emerald-800/10 text-[#2d5a4c] font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-emerald-50 transition-all group"
            >
              <RotateCcw className="w-4 h-4 mr-2 group-hover:rotate-[-90deg] transition-transform" />
              Reset Form
            </Button>
            <Button
              type="submit"
              className="h-14 px-12 bg-[#2d5a4c] hover:bg-[#1a382f] text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-xl shadow-xl shadow-emerald-900/20 group transition-all"
            >
              <Check className="w-4 h-4 mr-2 group-hover:scale-125 transition-transform" />
              Register Profile
            </Button>
          </div>
        </form>
      </div>

      {/* Login Link */}
      <div className="mt-12 text-center">
        <p className="text-[10px] font-black uppercase tracking-widest text-[#2d5a4c]/40">
          Already Enrolled?{' '}
          <Link href="/login" className="text-emerald-600 hover:text-emerald-800 hover:underline transition-all">
            Access Administrative Portal
          </Link>
        </p>
      </div>
    </main>
  )
}
