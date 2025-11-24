# Strategy Guru - AI Context Primer

**Quick Reference Guide for AI Assistants** | 2-Minute Read

---

## 🎯 Project Identity

**Name**: Strategy Guru
**Type**: Chief Product Officer & Strategy Platform
**Status**: Prototype → Moving toward Production
**Created**: January 2025
**Tech Stack**: Next.js 16 | TypeScript | Tailwind CSS 4 | Recharts | Zustand

---

## 📊 The Facts

### Scale
- **33 functional pages** across 8 main sections
- **10+ UI components** in component library
- **2 major components** (Dialog, AI Assistant) recently added
- **5 pages** with full CRUD operations
- **100% TypeScript** with strict mode
- **Mobile-first** responsive design

### Current State
- ✅ **Frontend**: Complete and functional
- ❌ **Backend**: None (mock data only)
- ❌ **Database**: None (Zustand state)
- ⚠️ **AI**: Simulated (no real API calls)
- ❌ **Auth**: None
- ❌ **Tests**: None

### Data
- All data currently in `store/useStore.ts` (Zustand)
- 6 key metrics, 3 OKRs, 4 segments, 4 features, etc.
- Mock data comprehensive but not persistent

---

## 🏗️ Architecture

```
Next.js 16 (App Router + Turbopack)
├── Frontend (React Server Components + Client Components)
│   ├── 33 pages in /app/
│   ├── Component library in /components/ui/
│   ├── Sidebar navigation
│   └── AI Assistant (simulated)
├── State (Zustand)
│   └── Mock data in store/useStore.ts
└── Types (TypeScript)
    └── All types in types/index.ts
```

**No backend yet.** Ready for integration.

---

## 📁 8 Main Sections

| Section | Pages | Interactive | AI |
|---------|-------|-------------|-----|
| **Overview** | 3 | - | ⚠️ |
| **Product Analytics** | 4 | - | ✅ |
| **Strategy** | 4 | ✅ OKRs, Competitive, Roadmap | ✅ |
| **Customer Insights** | 4 | ✅ Feedback | ✅ |
| **Business Metrics** | 4 | - | - |
| **Execution** | 4 | - | - |
| **Reporting** | 4 | ✅ Custom | ✅ |
| **Administration** | 4 | - | - |

**Total**: 31 pages + Dashboard + 404

---

## 🎨 Component Library

Built with Tailwind CSS 4:

- **Button** (6 variants: default, destructive, outline, secondary, ghost, link)
- **Card** (with Header, Title, Description, Content, Footer)
- **Dialog** ⭐ (Modal for forms)
- **Badge** (6 variants for status)
- **Input** (Text fields)
- **Table** (Data tables)
- **Tabs** (Content switching)
- **Progress** (Progress bars)
- **Select** (Dropdowns)

**AI Assistant** ⭐ (Context-aware chat, 7 contexts)

---

## 💻 Key Files

| File | Purpose | Lines |
|------|---------|-------|
| `store/useStore.ts` | All mock data + state | ~700 |
| `types/index.ts` | TypeScript definitions | ~300 |
| `components/sidebar.tsx` | Navigation | ~400 |
| `components/ai-assistant.tsx` ⭐ | AI chat interface | ~250 |
| `components/ui/dialog.tsx` ⭐ | Modal dialogs | ~100 |
| `app/layout.tsx` | Root layout | ~100 |
| `.cursorrules` ⭐ | AI coding standards | ~500 |

⭐ = Recently added

---

## 🔥 Interactive Pages (Full CRUD)

### 1. OKRs (`/strategy/okrs`)
- Create, Edit, Delete objectives
- Form validation
- AI assistance
- Dialog modals

### 2. Customer Feedback (`/customers/feedback`)
- Add feedback
- Reply to customers
- Mark as actioned
- Sentiment filtering

### 3. Competitive Intelligence (`/strategy/competitive`)
- Add competitors
- Track market share
- Threat assessment
- AI insights

### 4. Roadmap (`/strategy/roadmap`)
- Create initiatives
- Set priority/impact
- Timeline planning
- AI planning

### 5. Custom Reports (`/reporting/custom`)
- Create reports
- Set frequency
- Configure type
- AI suggestions

**Pattern**: All use Dialog component + Form state + Handlers + AI Assistant

---

## 🤖 AI Assistant

**Location**: `components/ai-assistant.tsx`

**Contexts** (7 total):
- `okr` - OKR creation and analysis
- `analytics` - Performance insights
- `feedback` - Sentiment analysis
- `reports` - Report generation
- `competitive` - Competitive analysis
- `roadmap` - Product planning
- `general` - General guidance

**Current State**: Simulated responses (hardcoded)
**Ready for**: OpenAI GPT-4o integration

**Integration**:
```typescript
import { AIAssistant } from "@/components/ai-assistant";
<AIAssistant context="okr" />
```

---

## 🛠️ Tech Details

### Tailwind CSS 4 Changes
```css
/* Old (v3) */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* New (v4) */
@import "tailwindcss";
```

PostCSS also changed:
```js
// Old
plugins: { tailwindcss: {}, autoprefixer: {} }

// New
plugins: { '@tailwindcss/postcss': {} }
```

### TypeScript
- Strict mode enabled
- All components properly typed
- Types in `types/index.ts`
- Never use `any` (prefer `unknown`)

### State Management
```typescript
// Zustand store
const useStore = create<Store>((set) => ({
  objectives: mockObjectives,
  metrics: mockMetrics,
  // ...
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen }))
}));
```

---

## 📊 Data Models

Key types (all in `types/index.ts`):

- **Objective** - OKRs with key results
- **Metric** - KPIs with trends
- **FeatureAnalytics** - Feature adoption
- **CustomerFeedback** - Customer input
- **CustomerSegment** - User segments
- **Competitor** - Competitive data
- **RoadmapItem** - Product initiatives
- **Project** - Execution tracking
- **Report** - Custom reports
- **Alert** - Notifications

---

## 🎯 Common Patterns

### Dialog/Form Pattern
```typescript
const [showDialog, setShowDialog] = useState(false);
const [formData, setFormData] = useState({ field: "" });

const handleSubmit = () => {
  console.log("Submitting:", formData);
  alert("Success!");
  setShowDialog(false);
  setFormData({ field: "" }); // Reset
};
```

### Page Structure
```typescript
"use client"; // Only if needed

import { ... } from "...";

export default function Page() {
  // 1. State hooks
  // 2. Store hooks
  // 3. Effects
  // 4. Handlers
  // 5. Computed values
  // 6. JSX return
}
```

### AI Integration
```typescript
<AIAssistant context="okr" />
```

---

## 🚀 Next Steps (Priority Order)

### Phase 1: Documentation ✅
- [x] `.cursorrules` - Coding standards
- [x] `README.md` - Project overview
- [x] `AI_CONTEXT_PRIMER.md` - This file
- [ ] `PROJECT_EXECUTIVE_SUMMARY.md` - Comprehensive overview
- [ ] `PROJECT_STATUS.md` - Current status
- [ ] `.env.example` - Environment template

### Phase 2: Backend (CRITICAL) 🔴
- [ ] Express/Fastify server
- [ ] PostgreSQL + Prisma
- [ ] API endpoints for all CRUD operations
- [ ] Data persistence

### Phase 3: Real AI (HIGH) 🟡
- [ ] OpenAI GPT-4o integration
- [ ] Replace simulated responses
- [ ] Context-aware AI functions
- [ ] Cost tracking

### Phase 4: Auth (HIGH) 🟡
- [ ] NextAuth.js
- [ ] Login/signup
- [ ] Role-based access
- [ ] User profiles

### Phase 5: Advanced (MEDIUM) 🟢
- [ ] Real-time updates
- [ ] Integrations (Slack, Jira)
- [ ] Email notifications
- [ ] Testing infrastructure

---

## 🔍 Quick Commands

```bash
# Dev
npm run dev        # Start with Turbopack

# Build
npm run build      # Production build
npm start          # Start production

# Code Quality
npm run lint       # ESLint
```

---

## 💡 Key Insights

1. **Frontend Complete**: All 33 pages functional and interactive
2. **No Backend Yet**: Biggest gap, transformative when added
3. **Ready for AI**: UI exists, just needs API calls
4. **Type-Safe**: 100% TypeScript with strict mode
5. **Modern Stack**: Next.js 16, Tailwind 4, latest tools
6. **Mobile-First**: Responsive across all devices
7. **Component-Driven**: Reusable UI library
8. **Well-Structured**: Clear separation of concerns

---

## ⚠️ Important Notes

### What Works
- All pages render and display data
- Forms validate and show feedback
- Charts visualize data beautifully
- Responsive design works perfectly
- Sidebar navigation with search

### What Doesn't Work Yet
- **No data persistence** (refresh = data loss)
- **No real AI** (simulated responses only)
- **No authentication** (anyone sees everything)
- **No backend** (no API, no database)
- **No real-time updates**
- **No tests**

### Quick Wins Available
1. Add `.env.example` (5 min)
2. Create comprehensive docs (2-4 hours)
3. Add environment config (10 min)

### Big Wins (More Effort)
1. Build backend + database (1-2 weeks)
2. Integrate real AI (3-5 days)
3. Add authentication (1 week)

---

## 📈 Metrics

- **Total Files**: ~50+
- **Total Lines**: ~15,000+
- **Components**: 10+ reusable
- **Pages**: 33 functional
- **Interactive Pages**: 5 with CRUD
- **AI Contexts**: 7 specialized
- **TypeScript**: 100%
- **Test Coverage**: 0% (no tests yet)

---

## 🎯 Target Users

- Chief Product Officers
- Chief Strategists
- Product Owners
- Business Owners
- Senior Executives

**For**: Firms of all sizes needing strategic planning and analytics tools

---

## 🔑 Remember

- **Read `.cursorrules` first** - Contains all coding standards
- **Check existing patterns** - Consistency is key
- **Use TypeScript strictly** - No `any` types
- **Mobile-first always** - Test responsive design
- **Document major changes** - Update relevant docs
- **Follow commit format** - `<type>: <description>`

---

## 📞 Quick Reference Card

| Need | File/Location |
|------|---------------|
| **Add new page** | `app/[section]/[page]/page.tsx` |
| **Add UI component** | `components/ui/[component].tsx` |
| **Define types** | `types/index.ts` |
| **Add mock data** | `store/useStore.ts` |
| **Update sidebar** | `components/sidebar.tsx` |
| **Coding rules** | `.cursorrules` |
| **Project overview** | `README.md` |

---

**Last Updated**: January 24, 2025
**Status**: Frontend Complete | Backend Pending | Documentation In Progress

---

*This primer is optimized for AI assistants to quickly understand Strategy Guru's architecture, current state, and development priorities.*
