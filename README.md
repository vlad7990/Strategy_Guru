# Strategy Guru 📊

> A comprehensive Chief Product Officer and Strategy Platform for strategic planning, product analytics, customer insights, and business metrics.

![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## 🎯 Overview

Strategy Guru is a powerful, fully-functional platform designed for **Chief Product Officers**, **Strategists**, **Product Owners**, **Business Owners**, and **Senior Executives**. It provides comprehensive tools for strategic planning, performance tracking, competitive analysis, and data-driven decision making.

**Built for firms of all sizes**, Strategy Guru offers 33 interactive pages organized into 8 key sections, complete with AI-powered assistance and rich data visualizations.

---

## ✨ Key Features

### 📈 **8 Main Sections with 33 Functional Pages**

1. **Overview & Dashboard**
   - Executive dashboard with KPIs
   - Key metrics monitoring
   - Alert management

2. **Product Analytics**
   - Performance metrics and monitoring
   - Feature adoption tracking
   - User engagement analysis
   - A/B testing dashboard

3. **Strategy & Planning**
   - OKR management with CRUD operations ⭐
   - Product roadmap planning ⭐
   - Market analysis
   - Competitive intelligence ⭐

4. **Customer Insights**
   - User behavior analytics
   - Customer feedback management ⭐
   - Journey mapping
   - Segment analysis

5. **Business Metrics**
   - Revenue analytics and forecasting
   - Unit economics tracking
   - Pricing analysis
   - ROI measurement

6. **Execution**
   - Project management
   - Resource planning
   - Team performance tracking
   - Sprint analytics

7. **Reporting**
   - Custom report builder ⭐
   - Data export capabilities
   - Scheduled reports
   - Historical trend analysis

8. **Administration**
   - User management
   - Data source integration
   - Third-party integrations
   - System settings

⭐ = Interactive with full CRUD operations

### 🤖 **AI-Powered Assistant**

Context-aware AI assistant integrated across key pages:
- OKR creation and optimization
- Performance insights
- Customer feedback analysis
- Competitive intelligence
- Roadmap planning
- Report generation

### 🎨 **Modern UI/UX**

- **Responsive Design**: Mobile-first approach, works beautifully on all devices
- **Interactive Components**: Dialog modals, forms, charts, and data visualizations
- **Rich Data Visualizations**: Powered by Recharts (Line, Bar, Area, Pie, Radar charts)
- **Professional Design**: Clean interface with Tailwind CSS 4
- **Intuitive Navigation**: Sidebar with search functionality

### ⚡ **Interactive Functionality**

- **Create, Edit, Delete**: Full CRUD operations on OKRs, competitors, roadmap items, reports, and feedback
- **Form Validation**: Smart forms with real-time validation
- **User Feedback**: Clear success/error messages
- **Search**: Sidebar search across all pages

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS 4 |
| **Charts** | Recharts |
| **State** | Zustand |
| **Icons** | Lucide React |
| **Package Manager** | npm |

### Why These Technologies?

- **Next.js 16**: Latest features, App Router for better performance, Turbopack for faster builds
- **TypeScript**: Type safety, better IDE support, fewer bugs
- **Tailwind CSS 4**: Utility-first CSS, new import syntax, better performance
- **Recharts**: Powerful, declarative charts for React
- **Zustand**: Simple, scalable state management
- **Lucide React**: Beautiful, consistent icon system

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git
- PostgreSQL 14+ (for backend)

### Frontend Installation

```bash
# Clone the repository
git clone <repository-url>
cd Strategy_Guru

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

### Backend Setup ⭐ NEW

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your PostgreSQL connection string

# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# (Optional) Seed database with sample data
npm run prisma:seed

# Start backend server
npm run dev
```

Backend runs at [http://localhost:4000](http://localhost:4000)

Check health: [http://localhost:4000/health](http://localhost:4000/health)

### Build for Production

**Frontend:**
```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

**Backend:**
```bash
cd backend

# Build TypeScript
npm run build

# Start production server
npm start
```

---

## 📁 Project Structure

```
Strategy_Guru/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Executive Dashboard
│   ├── layout.tsx               # Root layout with sidebar
│   ├── globals.css              # Global styles and CSS variables
│   ├── overview/                # Overview section
│   │   ├── metrics/            # Key metrics page
│   │   └── alerts/             # Alerts page
│   ├── product-analytics/       # Product Analytics section
│   │   ├── performance/        # Performance metrics
│   │   ├── features/           # Feature adoption
│   │   ├── engagement/         # User engagement
│   │   └── ab-testing/         # A/B testing
│   ├── strategy/                # Strategy & Planning section
│   │   ├── okrs/               # OKR management ⭐ Interactive
│   │   ├── roadmap/            # Product roadmap ⭐ Interactive
│   │   ├── market/             # Market analysis
│   │   └── competitive/        # Competitive intelligence ⭐ Interactive
│   ├── customers/               # Customer Insights section
│   │   ├── behavior/           # User behavior
│   │   ├── feedback/           # Customer feedback ⭐ Interactive
│   │   ├── journey/            # Journey mapping
│   │   └── segments/           # Segment analysis
│   ├── business/                # Business Metrics section
│   │   ├── revenue/            # Revenue analytics
│   │   ├── economics/          # Unit economics
│   │   ├── pricing/            # Pricing analysis
│   │   └── roi/                # ROI tracking
│   ├── execution/               # Execution section
│   │   ├── projects/           # Project management
│   │   ├── resources/          # Resource planning
│   │   ├── team/               # Team performance
│   │   └── sprints/            # Sprint analytics
│   ├── reporting/               # Reporting section
│   │   ├── custom/             # Custom reports ⭐ Interactive
│   │   ├── export/             # Data export
│   │   ├── scheduled/          # Scheduled reports
│   │   └── historical/         # Historical trends
│   └── admin/                   # Administration section
│       ├── users/              # User management
│       ├── sources/            # Data sources
│       ├── integrations/       # Third-party integrations
│       └── settings/           # System settings
├── backend/                     # Backend API ⭐ NEW
│   ├── src/
│   │   ├── server.ts           # Fastify server entry point
│   │   ├── routes/             # API route handlers
│   │   │   ├── objectives.ts  # /api/objectives endpoints
│   │   │   ├── metrics.ts     # /api/metrics endpoints
│   │   │   ├── feedback.ts    # /api/feedback endpoints
│   │   │   ├── competitors.ts # /api/competitors endpoints
│   │   │   ├── roadmap.ts     # /api/roadmap endpoints
│   │   │   ├── reports.ts     # /api/reports endpoints
│   │   │   ├── projects.ts    # /api/projects endpoints
│   │   │   └── alerts.ts      # /api/alerts endpoints
│   │   └── controllers/        # Business logic controllers
│   │       ├── objectivesController.ts
│   │       ├── metricsController.ts
│   │       └── ... (8 total controllers)
│   ├── prisma/
│   │   └── schema.prisma      # Database schema (18 models)
│   ├── package.json           # Backend dependencies
│   ├── tsconfig.json          # TypeScript config
│   └── .env                   # Environment variables
├── components/                  # React components
│   ├── ui/                     # UI component library
│   │   ├── button.tsx          # Button component
│   │   ├── card.tsx            # Card component
│   │   ├── dialog.tsx          # Dialog/modal component ⭐ New
│   │   ├── badge.tsx           # Badge component
│   │   ├── input.tsx           # Input component
│   │   ├── table.tsx           # Table components
│   │   ├── tabs.tsx            # Tabs component
│   │   ├── progress.tsx        # Progress bar
│   │   └── select.tsx          # Select dropdown
│   ├── sidebar.tsx             # Navigation sidebar
│   └── ai-assistant.tsx        # AI Assistant component ⭐ New
├── lib/                        # Utility functions
│   └── utils.ts               # Helper functions (cn, formatCurrency, etc.)
├── store/                      # State management
│   └── useStore.ts            # Zustand store with mock data
├── types/                      # TypeScript definitions
│   └── index.ts               # All type definitions
├── public/                     # Static assets
├── .cursorrules               # AI coding rules ⭐ New
├── tailwind.config.ts         # Tailwind configuration
├── postcss.config.mjs         # PostCSS configuration
├── tsconfig.json              # TypeScript configuration
├── next.config.ts             # Next.js configuration
└── package.json               # Dependencies and scripts
```

⭐ = Recently added/enhanced

---

## 🎨 Component Library

Strategy Guru includes a comprehensive UI component library built with Tailwind CSS:

### Core Components

| Component | Description | Variants |
|-----------|-------------|----------|
| **Button** | Interactive button | default, destructive, outline, secondary, ghost, link |
| **Card** | Container with header, title, description, content, footer | - |
| **Dialog** | Modal dialog for forms and confirmations | - |
| **Badge** | Status indicator | default, secondary, destructive, success, warning, outline |
| **Input** | Text input field | - |
| **Select** | Dropdown selection | - |
| **Tabs** | Tabbed content switcher | - |
| **Table** | Data table with header, body, rows, cells | - |
| **Progress** | Progress bar indicator | - |

### Usage Example

```typescript
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

<Button onClick={() => setOpen(true)}>
  Open Dialog
</Button>

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

---

## 💾 Data Management

### Current State (Mock Data)

Currently, all data is stored in Zustand state (`store/useStore.ts`) with comprehensive mock data:

- **6 Key Metrics** (MRR, Active Users, Churn, NPS, CAC, LTV)
- **3 OKRs** with key results
- **4 Feature Analytics** entries
- **4 Customer Segments**
- **Revenue Forecasting** data
- **Team Members** and projects
- **Alerts** and reports
- **Competitors** and roadmap items

### Future Backend Integration

The app is designed for easy backend integration:

```typescript
// Current (mock data)
const { objectives } = useStore();

// Future (API call)
const { data: objectives } = useQuery('/api/objectives');
```

All forms and handlers are ready for API integration - just replace `console.log()` and `alert()` with actual API calls.

---

## 🤖 AI Assistant

The AI Assistant provides context-aware guidance across the platform:

### Available Contexts

- **OKR** - Help create impactful objectives and key results
- **Analytics** - Insights on performance metrics and trends
- **Feedback** - Analyze customer sentiment and prioritize feedback
- **Reports** - Generate custom reports and visualizations
- **Competitive** - Competitive analysis and positioning
- **Roadmap** - Product roadmap planning and prioritization
- **General** - General strategic guidance

### Integration

```typescript
import { AIAssistant } from "@/components/ai-assistant";

// Add to any page
<AIAssistant context="okr" />
```

The assistant appears as a floating button in the bottom right corner and provides:
- Quick prompt suggestions
- Context-specific guidance
- Simulated AI responses (ready for OpenAI integration)
- Minimizable chat interface

---

## 🎯 Interactive Features

### Pages with Full CRUD Operations

1. **OKRs Page** (`/strategy/okrs`)
   - ✅ Create new objectives
   - ✅ Edit existing OKRs
   - ✅ Delete OKRs
   - ✅ Form validation
   - ✅ AI assistance

2. **Customer Feedback** (`/customers/feedback`)
   - ✅ Add new feedback
   - ✅ Reply to customers
   - ✅ Mark as actioned
   - ✅ Sentiment filtering
   - ✅ AI analysis

3. **Competitive Intelligence** (`/strategy/competitive`)
   - ✅ Add competitors
   - ✅ Track market share
   - ✅ Threat level assessment
   - ✅ AI insights

4. **Roadmap** (`/strategy/roadmap`)
   - ✅ Create initiatives
   - ✅ Set priority and impact
   - ✅ Timeline planning
   - ✅ AI planning assistance

5. **Custom Reports** (`/reporting/custom`)
   - ✅ Create reports
   - ✅ Set frequency
   - ✅ Configure type
   - ✅ AI report suggestions

---

## 📊 Data Visualizations

Strategy Guru uses **Recharts** for powerful, responsive visualizations:

### Chart Types

- **Line Charts** - Trends over time (revenue, engagement, performance)
- **Bar Charts** - Comparisons (API endpoints, feature adoption)
- **Area Charts** - Cumulative data (throughput, error rates)
- **Pie Charts** - Distributions (user segments, cohorts)
- **Radar Charts** - Multi-dimensional comparisons (competitive positioning)

### Example

```typescript
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

<LineChart data={data}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="month" />
  <YAxis />
  <Tooltip />
  <Line type="monotone" dataKey="revenue" stroke="#3b82f6" />
</LineChart>
```

---

## 🔧 Development

### Scripts

```bash
# Development
npm run dev          # Start dev server with Turbopack

# Production
npm run build        # Create optimized build
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

### Key Files to Know

- **`.cursorrules`** - AI coding standards and patterns
- **`app/layout.tsx`** - Root layout, includes sidebar
- **`store/useStore.ts`** - All mock data and state
- **`types/index.ts`** - TypeScript definitions
- **`components/ui/`** - Reusable UI components
- **`lib/utils.ts`** - Utility functions

### Adding a New Page

1. Create folder: `app/[section]/[page]/`
2. Create file: `page.tsx`
3. Define types in `types/index.ts`
4. Add mock data to `store/useStore.ts`
5. Build UI with components from `/components/ui/`
6. Add to sidebar navigation in `components/sidebar.tsx`

### Adding a New Feature

1. **Define Types** - Add interfaces to `types/index.ts`
2. **Create Components** - Extract reusable parts
3. **Add State** - Update Zustand store if needed
4. **Build UI** - Use existing component patterns
5. **Add Interactivity** - Forms, dialogs, handlers
6. **Test** - Check responsive design, validation
7. **Document** - Update README if major feature

---

## 🎨 Styling

### Tailwind CSS 4

Strategy Guru uses the latest Tailwind CSS 4 with new import syntax:

```css
/* globals.css */
@import "tailwindcss";

:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  /* ... */
}
```

### Color System

| Variable | Usage | Color |
|----------|-------|-------|
| `--primary` | Primary actions, links | Blue |
| `--secondary` | Secondary actions | Gray |
| `--destructive` | Danger, delete | Red |
| `--success` | Success states | Green |
| `--warning` | Warnings | Yellow |
| `--muted` | Muted text | Light gray |

### Responsive Design

Mobile-first approach with breakpoints:
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px

---

## 🚀 Roadmap

### Current Status ✅

- [x] 33 functional pages across 8 sections
- [x] Interactive forms and dialogs
- [x] AI Assistant component (simulated)
- [x] Rich data visualizations
- [x] Responsive design
- [x] Comprehensive documentation

### Next Phase 🔄 (Planned)

#### Phase 1: Backend Infrastructure
- [ ] Express/Fastify backend setup
- [ ] PostgreSQL database with Prisma
- [ ] RESTful API endpoints
- [ ] Data persistence layer

#### Phase 2: Real AI Integration
- [ ] OpenAI GPT-4o integration
- [ ] Context-aware AI functions
- [ ] Cost tracking
- [ ] Real-time insights

#### Phase 3: Authentication
- [ ] NextAuth.js setup
- [ ] User login/signup
- [ ] Role-based access control
- [ ] User profiles

#### Phase 4: Advanced Features
- [ ] Real-time updates (WebSockets)
- [ ] External integrations (Slack, Jira, etc.)
- [ ] Email notifications
- [ ] Advanced analytics

#### Phase 5: Production Readiness
- [ ] Testing infrastructure
- [ ] CI/CD pipeline
- [ ] Deployment setup
- [ ] Monitoring and logging

---

## 📝 Documentation

- **`.cursorrules`** - AI coding rules and patterns
- **`README.md`** - This file
- **`AI_CONTEXT_PRIMER.md`** - Quick context for AI assistants
- **`PROJECT_EXECUTIVE_SUMMARY.md`** - Comprehensive overview
- **`PROJECT_STATUS.md`** - Current status and priorities
- **`ARCHITECTURE.md`** - Technical architecture details

---

## 🤝 Contributing

### Getting Started

1. Read `.cursorrules` for coding standards
2. Follow existing component patterns
3. Write TypeScript with proper types
4. Test responsive design
5. Update documentation

### Code Style

- Use TypeScript strict mode
- Follow ESLint rules
- Use Prettier for formatting
- Write clear commit messages

### Commit Message Format

```
<type>: <description>

Types: feat, fix, docs, style, refactor, test, chore
```

Example:
```
feat: Add OKR creation dialog with validation

- Created Dialog component for modal forms
- Added form state management
- Implemented validation logic
```

---

## 📄 License

MIT License - see LICENSE file for details

---

## 🙏 Acknowledgments

- **Next.js** team for the amazing framework
- **Tailwind CSS** for the utility-first CSS system
- **Recharts** for beautiful, declarative charts
- **Lucide** for the icon system
- **Zustand** for simple state management

---

## 📞 Support

For questions, issues, or feature requests, please open an issue on GitHub.

---

**Built with ❤️ for Chief Product Officers, Strategists, and Executives**

Transform your strategic planning with Strategy Guru - the comprehensive platform for data-driven decision making.
