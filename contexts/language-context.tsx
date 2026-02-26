'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'en' | 'ur'

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => string
    isUrdu: boolean
}

const LanguageContext = createContext<LanguageContextType>({
    language: 'en',
    setLanguage: () => { },
    t: (key) => key,
    isUrdu: false,
})

// ─── Full Translation Dictionary ─────────────────────────────────────────────
export const translations: Record<string, Record<Language, string>> = {

    // ── Global / Shared ──────────────────────────────────────────────
    'lrmis_brand': { en: 'LRMIS', ur: 'ایل آر ایم آئی ایس' },
    'Punjab Land Records': { en: 'Punjab Land Records', ur: 'پنجاب اراضی ریکارڈ' },
    'brand_tagline': { en: 'نظامِ اراضی ریکارڈ', ur: 'نظامِ اراضی ریکارڈ' },
    'live_sync': { en: 'Live Registry Sync', ur: 'لائیو رجسٹری سنک' },
    'lrmis_footer': { en: 'Ministry of Land & Revenue Authority — Official Digital Registry', ur: 'وزارتِ خزانہ — سرکاری ڈیجیٹل رجسٹری' },
    'switch_to_urdu': { en: 'اردو', ur: 'اردو' },
    'switch_to_english': { en: 'English', ur: 'English' },

    // ── Sidebar ──────────────────────────────────────────────────────
    'nav_dashboard': { en: 'Dashboard', ur: 'ڈیش بورڈ' },
    'nav_properties': { en: 'Properties', ur: 'جائیدادیں' },
    'nav_maps': { en: 'Plots & Maps', ur: 'نقشہ جات' },
    'nav_ownership': { en: 'Ownership Transfer', ur: 'ملکیت کی منتقلی' },
    'nav_sales': { en: 'Sales', ur: 'فروخت' },
    'nav_payments': { en: 'Payments', ur: 'ادائیگیاں' },
    'nav_transactions': { en: 'Transactions', ur: 'لین دین' },
    'nav_analytics': { en: 'Analytics', ur: 'تجزیات' },
    'nav_reports': { en: 'Reports', ur: 'رپورٹیں' },
    'nav_search': { en: 'Search Rightholders', ur: 'حق داروں کی تلاش' },
    'nav_settings': { en: 'Settings', ur: 'ترتیبات' },
    'nav_logout': { en: 'Logout', ur: 'خروج' },

    // ── Dashboard ─────────────────────────────────────────────────────
    'dash_title': { en: 'Command Centre', ur: 'مرکزِ کمانڈ' },
    'dash_subtitle': { en: 'Land Records Management & Information System', ur: 'نظامِ انتظامِ اراضی ریکارڈ — پنجاب' },
    'stat_assets': { en: 'Registered Assets', ur: 'رجسٹرڈ اثاثے' },
    'stat_revenue': { en: 'Revenue (PKR)', ur: 'محاصل' },
    'stat_mutations': { en: 'Pending Mutations', ur: 'زیرِ التواء انتقال' },
    'stat_docs': { en: 'Documents Issued', ur: 'جاری دستاویزات' },
    'chart_mutations': { en: 'Monthly Mutation Throughput', ur: 'ماہانہ انتقال کا بوجھ' },
    'chart_land': { en: 'Land Classification', ur: 'اراضی کی درجہ بندی' },
    'quick_actions': { en: 'Quick Actions', ur: 'فوری اقدامات' },
    'btn_new_property': { en: 'New Property', ur: 'نئی جائیداد' },
    'btn_record_mutation': { en: 'Record Mutation', ur: 'انتقال درج کریں' },
    'btn_record_payment': { en: 'Record Payment', ur: 'ادائیگی درج کریں' },
    'btn_search_rh': { en: 'Search Rightholders', ur: 'حق داروں کی تلاش' },
    'btn_generate_report': { en: 'Generate Report', ur: 'رپورٹ بنائیں' },

    // ── Properties ────────────────────────────────────────────────────
    'prop_title': { en: 'Land Registry Assets', ur: 'اراضی رجسٹری اثاثے' },
    'prop_subtitle': { en: 'Official Property Inventory & Cadastral Database', ur: 'سرکاری جائیداد مخزن اور خسرہ ڈیٹابیس' },
    'btn_register_parcel': { en: 'Register New Parcel', ur: 'نیا قطعہ رجسٹر کریں' },
    'stat_registered': { en: 'Registered Assets', ur: 'رجسٹرڈ اثاثے' },
    'stat_available': { en: 'Verified Available', ur: 'تصدیق شدہ دستیاب' },
    'stat_market_cap': { en: 'Registry Market Cap', ur: 'رجسٹری کی مالیت' },
    'stat_districts': { en: 'Active Districts', ur: 'فعال اضلاع' },
    'col_asset': { en: 'Registry Asset', ur: 'رجسٹری اثاثہ' },
    'col_location': { en: 'Location Hierarchy', ur: 'مقام کی درجہ بندی' },
    'col_cadastral': { en: 'Cadastral IDs', ur: 'خسرہ شناخت' },
    'col_valuation': { en: 'Valuation', ur: 'قدر' },
    'col_actions': { en: 'Actions', ur: 'اقدامات' },
    'filter_placeholder': { en: 'Filter by Name, Mouza, Khasra...', ur: 'نام، موضع، یا خسرہ سے تلاش کریں...' },
    'records_found': { en: 'Records Found', ur: 'ریکارڈز ملے' },
    'modal_register_title': { en: 'Register Land Asset', ur: 'اراضی اثاثہ رجسٹر کریں' },
    'modal_register_sub': { en: 'Formal Mutation Entry for Permanent Registry', ur: 'مستقل رجسٹری کے لیے باضابطہ انتقال اندراج' },
    'field_property_title': { en: 'Property Title', ur: 'جائیداد کا عنوان' },
    'field_district': { en: 'District', ur: 'ضلع' },
    'field_tehsil': { en: 'Tehsil', ur: 'تحصیل' },
    'field_mouza': { en: 'Mouza', ur: 'موضع' },
    'field_khasra': { en: 'Khasra No.', ur: 'خسرہ نمبر' },
    'field_khewat': { en: 'Khewat No.', ur: 'خیوات نمبر' },
    'field_area': { en: 'Area Metrics', ur: 'رقبہ پیمائش' },
    'btn_authorize': { en: 'Authorize Parcel Registration', ur: 'قطعہ رجسٹریشن کی منظوری دیں' },

    // ── Ownership Transfer ────────────────────────────────────────────
    'own_title': { en: 'Ownership Mutation Hub', ur: 'مرکزِ انتقالِ ملکیت' },
    'own_subtitle': { en: 'Official Land Transfer & Registry Protocol', ur: 'سرکاری انتقالِ اراضی اور رجسٹری پروٹوکول' },
    'btn_new_mutation': { en: 'Initiate New Mutation', ur: 'نیا انتقال شروع کریں' },
    'tab_khasra': { en: 'Khasra Search', ur: 'خسرہ تلاش' },
    'tab_khewat': { en: 'Khewat Search', ur: 'خیوات تلاش' },
    'tab_identity': { en: 'Identity Search', ur: 'شناخت تلاش' },
    'btn_execute_search': { en: 'Execute Search', ur: 'تلاش کریں' },
    'mutation_records': { en: 'Validated Mutation Records', ur: 'تصدیق شدہ انتقال ریکارڈز' },
    'transferee': { en: 'Transferee (Buyer)', ur: 'منتقل الیہ (خریدار)' },
    'transferor': { en: 'Transferor (Seller)', ur: 'منتقل (فروخت کنندہ)' },
    'view_deed': { en: 'View Deed', ur: 'دستاویز دیکھیں' },
    'certificate': { en: 'Certificate', ur: 'سند' },
    'registry_health': { en: 'Registry Health', ur: 'رجسٹری کی صحت' },

    // ── Payments ──────────────────────────────────────────────────────
    'pay_title': { en: 'Government Revenue Ledger', ur: 'سرکاری محاصل بہی' },
    'pay_subtitle': { en: 'Official Fee Collection & Tax Tracking System (LRMIS-FIN)', ur: 'سرکاری فیس وصولی اور محصول نظام — ایل آر ایم آئی ایس' },
    'btn_gen_voucher': { en: 'Generate Revenue Voucher', ur: 'محاصل واؤچر جاری کریں' },
    'stat_settled': { en: 'Revenue Settled', ur: 'وصول شدہ محاصل' },
    'stat_outstanding': { en: 'Outstanding', ur: 'باقی واجبات' },
    'stat_overdue': { en: 'Overdue', ur: 'تاخیر سے واجب' },
    'stat_health_idx': { en: 'Health Index', ur: 'صحت اشاریہ' },
    'search_payments': { en: 'Search by Invoice #, Payer, or Property...', ur: 'انوائس نمبر، ادا کنندہ، یا جائیداد سے تلاش کریں...' },
    'btn_export': { en: 'Export', ur: 'برآمد کریں' },
    'field_payer': { en: 'Depositor / Payer Name', ur: 'ادا کنندہ کا نام' },
    'field_fee_cat': { en: 'Fee Category', ur: 'فیس زمرہ' },
    'field_amount': { en: 'Amount (PKR)', ur: 'رقم (روپے)' },
    'field_asset': { en: 'Associated Asset', ur: 'متعلقہ اثاثہ' },
    'btn_authorize_voucher': { en: 'Authorize & Generate Voucher', ur: 'منظوری اور واؤچر جاری' },
    'fee_mutation': { en: 'Mutation Fee', ur: 'انتقال فیس' },
    'fee_stamp': { en: 'Stamp Duty', ur: 'اسٹامپ ڈیوٹی' },
    'fee_cvt': { en: 'Capital Value Tax', ur: 'سرمایہ قدر محصول' },
    'fee_reg': { en: 'Reg. Fee', ur: 'رجسٹریشن فیس' },

    // ── Transactions ──────────────────────────────────────────────────
    'txn_title': { en: 'Audit Trail', ur: 'آڈیٹ لکیر' },
    'txn_subtitle': { en: 'Permanent Log of Mutations, Registrations & Revenue Events', ur: 'انتقالات، رجسٹری اور محصول واقعات کا مستقل ریکارڈ' },
    'btn_export_audit': { en: 'Export Audit Ledger', ur: 'آڈیٹ بہی برآمد کریں' },
    'btn_verify_hash': { en: 'Verify Record Hash', ur: 'ریکارڈ ہیش تصدیق کریں' },
    'stat_verified_mut': { en: 'Verified Mutations', ur: 'تصدیق شدہ انتقالات' },
    'stat_rev_settled': { en: 'Revenue Settled', ur: 'وصول شدہ محاصل' },
    'stat_pending_adj': { en: 'Pending Adjudication', ur: 'زیرِ التواء فیصلہ' },
    'stat_compliance': { en: 'Compliance Rate', ur: 'تعمیل شرح' },
    'search_audit': { en: 'Search Audit Trail: Hash ID, Description, Officer or Property...', ur: 'آڈیٹ لکیر تلاش: ہیش، تفصیل، افسر یا جائیداد...' },
    'filter_all': { en: 'All Events', ur: 'تمام واقعات' },
    'filter_mutations': { en: 'Mutations', ur: 'انتقالات' },
    'filter_registries': { en: 'Registries', ur: 'رجسٹریاں' },
    'filter_revenue': { en: 'Revenue', ur: 'محاصل' },
    'status_authorized': { en: 'Authorized', ur: 'منظور شدہ' },
    'status_verified': { en: 'Verified', ur: 'تصدیق شدہ' },
    'status_pending': { en: 'Pending Review', ur: 'زیرِ جائزہ' },
    'status_settled': { en: 'Settled', ur: 'طے شدہ' },

    // ── Analytics ─────────────────────────────────────────────────────
    'ana_title': { en: 'Strategic Intelligence', ur: 'تزویراتی تجزیات' },
    'ana_subtitle': { en: 'Real-time Land Records Performance & Revenue Metrics', ur: 'اراضی ریکارڈ اور محاصل کی لائیو رپورٹنگ' },
    'kpi_velocity': { en: 'Mutation Velocity', ur: 'انتقال کی رفتار' },
    'kpi_issuance': { en: 'Certified Issuance', ur: 'مصدقہ اجراء' },
    'kpi_collection': { en: 'Revenue Collection', ur: 'محاصل وصولی' },
    'kpi_users': { en: 'Active Service Users', ur: 'فعال صارفین' },
    'chart_throughput': { en: 'Mutation Throughput', ur: 'انتقال کا بوجھ' },
    'chart_revenue': { en: 'Revenue Growth (PKR M)', ur: 'محاصل میں اضافہ' },
    'chart_land_mix': { en: 'Land Classification Mix', ur: 'اراضی کی اقسام' },
    'chart_op_health': { en: 'Registry Operational Health', ur: 'رجسٹری کی عملی صحت' },

    // ── Reports ───────────────────────────────────────────────────────
    'rep_title': { en: 'Document Hub', ur: 'دستاویز مرکز' },
    'rep_subtitle': { en: 'Official Repository for Land Records, Maps & Genealogy', ur: 'اراضی ریکارڈ، نقشوں اور شجرہ نسب کا سرکاری مخزن' },
    'btn_request_copy': { en: 'Request Official Copy', ur: 'سرکاری نقل طلب کریں' },
    'search_docs': { en: 'Universal Document Search: Title, Doc ID, Khasra...', ur: 'دستاویز تلاش: عنوان، شناخت نمبر، خسرہ...' },
    'archives': { en: 'Archives', ur: 'مخزن' },
    'btn_preview': { en: 'Preview', ur: 'پیش نظارہ' },
    'modal_doc_title': { en: 'Document Issuance', ur: 'دستاویز اجراء' },
    'field_doc_type': { en: 'Select Document Type', ur: 'دستاویز کی قسم منتخب کریں' },
    'field_cert_level': { en: 'Certification Level', ur: 'تصدیق کی سطح' },
    'btn_authorize_issue': { en: 'Authorize Issuance', ur: 'اجراء منظور کریں' },
    'authenticating': { en: 'Authenticating Record...', ur: 'ریکارڈ تصدیق ہو رہا ہے...' },
    'data_services': { en: 'LRMIS Official Data Services', ur: 'ایل آر ایم آئی ایس سرکاری ڈیٹا سروسز' },
    'gateway_live': { en: 'Live Secure Gateway', ur: 'لائیو محفوظ گیٹ وے' },

    // ── Settings ──────────────────────────────────────────────────────
    'set_title': { en: 'System Preferences', ur: 'نظامی ترجیحات' },
    'set_subtitle': { en: 'Administrative Environment & Security Protocols', ur: 'انتظامی ماحول اور سلامتی پروٹوکول' },
    'tab_general': { en: 'General Configuration', ur: 'عمومی ترتیب' },
    'tab_security': { en: 'Security & Auth', ur: 'سلامتی اور تصدیق' },
    'tab_users': { en: 'Registry Access', ur: 'رجسٹری رسائی' },
    'tab_alerts': { en: 'Alert Center', ur: 'اطلاع مرکز' },
    'tab_backup': { en: 'Backup Archives', ur: 'بیک اپ مخزن' },
    'field_org': { en: 'Organization Authority', ur: 'ادارے کا نام' },
    'field_email': { en: 'Contact Email', ur: 'رابطہ ای میل' },
    'field_notes': { en: 'Admin Notes', ur: 'انتظامی نوٹس' },
    'notes_placeholder': { en: 'Enter organizational protocols...', ur: 'ادارے کے پروٹوکول درج کریں...' },
    'audit_note': { en: 'All changes are recorded in the system audit log.', ur: 'تمام تبدیلیاں نظامی آڈیٹ لاگ میں محفوظ ہوتی ہیں۔' },
    'btn_save': { en: 'Save Configuration', ur: 'ترتیب محفوظ کریں' },
    'saving': { en: 'Synchronizing...', ur: 'ہم آہنگ ہو رہا ہے...' },
    'two_fa_title': { en: 'Two-Factor Authentication', ur: 'دو مرحلہ تصدیق' },
    'two_fa_desc': { en: 'Mandatory for all registrar roles. Add a mobile authenticator to proceed.', ur: 'تمام رجسٹرار کے لیے لازمی ہے۔ موبائل تصدیق کار شامل کریں۔' },
    'configure_2fa': { en: 'Configure 2FA', ur: 'دو مرحلہ تصدیق ترتیب دیں' },
    'sessions_title': { en: 'Active Session Hub', ur: 'فعال سیشن مرکز' },
    'session_current': { en: 'Current', ur: 'موجودہ' },
    'session_revoke': { en: 'Revoke', ur: 'منسوخ کریں' },
    'maintenance_title': { en: 'Module Under Maintenance', ur: 'ماڈیول زیرِ ترمیم' },
    'maintenance_desc': { en: 'settings module is being optimized for high-performance data handling.', ur: 'ماڈیول اعلیٰ کارکردگی کے لیے بہتر کیا جا رہا ہے۔' },

    // ── Search Rightholders ───────────────────────────────────────────
    'srh_title': { en: 'Search Rightholders', ur: 'حق داروں کی تلاش' },
    'srh_subtitle': { en: 'Official LRMIS Rightholder Lookup System', ur: 'سرکاری ایل آر ایم آئی ایس حق دار تلاش نظام' },
    'btn_search': { en: 'Search', ur: 'تلاش کریں' },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('en')

    useEffect(() => {
        const saved = localStorage.getItem('lrmis-language') as Language | null
        if (saved === 'en' || saved === 'ur') setLanguageState(saved)
    }, [])

    const setLanguage = (lang: Language) => {
        setLanguageState(lang)
        localStorage.setItem('lrmis-language', lang)
        // Apply RTL to the document
        document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr'
        document.documentElement.lang = lang === 'ur' ? 'ur' : 'en'
    }

    // Apply on first load
    useEffect(() => {
        document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr'
        document.documentElement.lang = language === 'ur' ? 'ur' : 'en'
    }, [language])

    const t = (key: string): string => {
        const entry = translations[key]
        if (!entry) return key
        return entry[language] ?? entry['en'] ?? key
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, isUrdu: language === 'ur' }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    return useContext(LanguageContext)
}
