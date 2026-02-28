# LRMIS - Land Records Management & Information System

A modern, bilingual (English/Urdu) web application for managing land records, property registrations, and cadastral data for the Punjab Land Records Authority.

## 🌟 Features

### Core Functionality
- **Property Registry Management** - Complete land asset registration and tracking system
- **Ownership Transfer (Mutation)** - Digital workflow for property ownership transfers
- **Interactive GIS Mapping** - Canvas-based cadastral maps with plot visualization
- **Revenue Collection** - Government fee tracking and payment processing
- **Transaction Audit Trail** - Immutable record of all registry operations
- **Analytics Dashboard** - Real-time insights into land records performance
- **Document Generation** - Official certificates and reports (Fard-e-Malkiat)
- **Rightholder Search** - Advanced search across Khasra, Khewat, and identity records

### Technical Features
- **Bilingual Support** - Full English and Urdu (اردو) interface with RTL support
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Modern UI Components** - Built with Radix UI and shadcn/ui
- **Type Safety** - Full TypeScript implementation
- **Form Validation** - React Hook Form with Zod schemas
- **Interactive Charts** - Data visualization with Recharts
- **Map Integration** - Leaflet.js for geospatial features

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5.7
- **Styling:** Tailwind CSS 4.2
- **UI Components:** Radix UI + shadcn/ui
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts
- **Maps:** Leaflet + React Leaflet
- **Icons:** Lucide React
- **State Management:** React Context API

## 📦 Installation

### Prerequisites
- Node.js 18+ or higher
- npm, pnpm, or yarn

### Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd lrmis
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

### Deploy to Vercel

The easiest way to deploy this Next.js app is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Vercel will automatically detect Next.js and configure the build
4. Click "Deploy"

The build process typically takes 2-3 minutes. You'll see:
- ✅ Installing dependencies (pnpm install)
- ✅ Building application (next build)
- ✅ Deploying to production

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm run start
```

## 🏗️ Project Structure

```
├── app/                      # Next.js app router pages
│   ├── dashboard/           # Main dashboard and features
│   │   ├── analytics/       # Analytics and reporting
│   │   ├── maps/            # GIS mapping interface
│   │   ├── ownership-transfer/  # Mutation management
│   │   ├── payments/        # Revenue collection
│   │   ├── properties/      # Property registry
│   │   ├── reports/         # Document generation
│   │   ├── sales/           # Sales tracking
│   │   ├── search-rightholders/  # Rightholder lookup
│   │   ├── settings/        # System configuration
│   │   └── transactions/    # Audit trail
│   ├── login/               # Authentication
│   ├── register/            # User registration
│   └── page.tsx             # Landing page
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── interactive-map.tsx  # Canvas-based map
│   ├── leaflet-map.tsx      # Leaflet integration
│   ├── sidebar.tsx          # Navigation sidebar
│   └── theme-provider.tsx   # Theme management
├── contexts/                # React contexts
│   └── language-context.tsx # i18n implementation
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions
├── public/                  # Static assets
└── styles/                  # Global styles
```

## 🌐 Key Pages

### Landing Page (`/`)
- Government portal branding
- Feature highlights
- Call-to-action for citizen services

### Dashboard (`/dashboard`)
- Real-time statistics (assets, revenue, mutations)
- Performance charts
- Quick action buttons

### Properties (`/dashboard/properties`)
- Property registry with search and filters
- New parcel registration
- Cadastral ID management

### Ownership Transfer (`/dashboard/ownership-transfer`)
- Mutation workflow
- Khasra/Khewat/Identity search
- Transfer documentation

### Maps (`/dashboard/maps`)
- Interactive plot visualization
- Status-based color coding (sold/available/reserved)
- Zoom and pan controls

### Payments (`/dashboard/payments`)
- Revenue voucher generation
- Fee categories (Mutation, Stamp Duty, CVT, Registration)
- Payment tracking

### Transactions (`/dashboard/transactions`)
- Complete audit trail
- Event filtering
- Hash verification

## 🌍 Internationalization

The application supports English and Urdu with:
- Complete translation dictionary in `contexts/language-context.tsx`
- RTL (Right-to-Left) layout support for Urdu
- Language toggle in sidebar
- Persistent language preference

## 🎨 Design System

### Color Palette
- **Primary:** `#2d5a4c` (Deep emerald green)
- **Background:** `#f8faf9` (Light mint)
- **Accent:** Emerald shades for status indicators

### Typography
- **Headings:** Serif fonts for official feel
- **Body:** Sans-serif for readability
- **Urdu:** Custom Urdu font stack with proper line-height

### Components
All UI components follow the shadcn/ui design system with custom theming for government portal aesthetics.

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🔒 Security Notes

- TypeScript strict mode enabled
- Build errors ignored for rapid prototyping (remove in production)
- Images unoptimized (configure for production deployment)

## 🚧 Development Status

This is a prototype/demonstration application. For production use:
- Implement proper authentication and authorization
- Add backend API integration
- Configure database connections
- Enable image optimization
- Remove `ignoreBuildErrors` from next.config.mjs
- Add comprehensive error handling
- Implement data validation on server side
- Add rate limiting and security headers

## 📄 License

[Add your license here]

## 👥 Contributors

[Add contributors here]

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please contact the Punjab Land Records Authority.

---

**Note:** This is a demonstration project showcasing modern web development practices for government land records management systems.
