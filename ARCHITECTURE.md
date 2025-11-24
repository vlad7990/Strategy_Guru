# Strategy Guru - Technical Architecture

**System Design & Technical Decisions**

Last Updated: January 24, 2025

---

## 🏗️ High-Level Architecture

### Current Architecture (Phase 1 - Frontend Only)

```
┌─────────────────────────────────────────────┐
│           Strategy Guru (Frontend)          │
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │      Next.js 16 App Router          │   │
│  │      (React Server Components)      │   │
│  └─────────────────────────────────────┘   │
│                    │                        │
│  ┌─────────────────┴────────────────────┐  │
│  │                                      │  │
│  │  ┌──────────────┐   ┌─────────────┐ │  │
│  │  │   33 Pages   │   │  Components │ │  │
│  │  │ (app/*/tsx)  │   │  (ui/ etc.) │ │  │
│  │  └──────────────┘   └─────────────┘ │  │
│  │                                      │  │
│  │  ┌──────────────┐   ┌─────────────┐ │  │
│  │  │   Zustand    │   │ TypeScript  │ │  │
│  │  │  (State)     │   │   (Types)   │ │  │
│  │  └──────────────┘   └─────────────┘ │  │
│  │                                      │  │
│  └──────────────────────────────────────┘  │
│                                             │
│  Mock Data (store/useStore.ts)             │
│  - No persistence                           │
│  - Refresh = data loss                      │
│                                             │
└─────────────────────────────────────────────┘
```

### Target Architecture (Phase 2+ - Full Stack)

```
┌──────────────────────────────────────────────────────────────┐
│                      Strategy Guru                           │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │              Frontend (Next.js 16)                 │     │
│  │                                                    │     │
│  │  ┌────────────┐  ┌───────────┐  ┌─────────────┐  │     │
│  │  │  33 Pages  │  │ Components│  │ AI Assistant│  │     │
│  │  └────────────┘  └───────────┘  └─────────────┘  │     │
│  │                                                    │     │
│  │  ┌──────────────────────────────────────────────┐ │     │
│  │  │      API Client Layer (/lib/api/)            │ │     │
│  │  └──────────────────────────────────────────────┘ │     │
│  └────────────────────┬───────────────────────────────┘     │
│                       │                                     │
│                       │ REST API                            │
│                       │ (JSON over HTTPS)                   │
│                       │                                     │
│  ┌────────────────────┴───────────────────────────────┐     │
│  │          Backend (Express/Fastify + Node.js)      │     │
│  │                                                    │     │
│  │  ┌──────────────┐  ┌──────────────┐              │     │
│  │  │    Routes    │  │ Controllers  │              │     │
│  │  └──────────────┘  └──────────────┘              │     │
│  │                                                    │     │
│  │  ┌──────────────┐  ┌──────────────┐              │     │
│  │  │   Services   │  │  Middleware  │              │     │
│  │  └──────────────┘  └──────────────┘              │     │
│  │                                                    │     │
│  │  ┌─────────────────────────────────────────────┐  │     │
│  │  │         AI Service Layer                    │  │     │
│  │  │  ┌────────────┐    ┌────────────────────┐  │  │     │
│  │  │  │ OpenAI SDK │    │ Prompt Engineering │  │  │     │
│  │  │  └────────────┘    └────────────────────┘  │  │     │
│  │  └─────────────────────────────────────────────┘  │     │
│  │                                                    │     │
│  └────────────────────┬───────────────────────────────┘     │
│                       │                                     │
│                       │ SQL Queries (Prisma ORM)            │
│                       │                                     │
│  ┌────────────────────┴───────────────────────────────┐     │
│  │        PostgreSQL Database (Prisma)                │     │
│  │                                                    │     │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │     │
│  │  │Users │ │ OKRs │ │Metrics│ │Projects│ │Alerts│  │     │
│  │  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘  │     │
│  │  ... 15+ tables                                 │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
│  ┌────────────────────────────────────────────────────┐     │
│  │           External Services                        │     │
│  │  ┌──────────┐ ┌────────┐ ┌─────────┐             │     │
│  │  │ OpenAI   │ │ SendGrid│ │ Slack   │             │     │
│  │  └──────────┘ └────────┘ └─────────┘             │     │
│  │  ┌──────────┐ ┌────────┐ ┌─────────┐             │     │
│  │  │   Jira   │ │Salesforce│ │ Sentry  │             │     │
│  │  └──────────┘ └────────┘ └─────────┘             │     │
│  └────────────────────────────────────────────────────┘     │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 🎨 Frontend Architecture

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 16 | React framework with App Router |
| **Build Tool** | Turbopack | Fast bundler (built into Next.js) |
| **Language** | TypeScript 5.x | Type-safe JavaScript |
| **Styling** | Tailwind CSS 4 | Utility-first CSS |
| **Charts** | Recharts | Data visualization |
| **State** | Zustand | Global state management |
| **Icons** | Lucide React | Icon system |
| **HTTP Client** | fetch (native) | API calls (future) |

### Directory Structure

```
app/                          # Next.js App Router
├── page.tsx                 # Dashboard (/)
├── layout.tsx               # Root layout
├── globals.css              # Global styles
├── [section]/               # Section folders
│   └── [page]/             # Individual pages
│       └── page.tsx        # Page component
│
components/                  # React components
├── ui/                     # UI component library
│   ├── button.tsx          # Button variants
│   ├── card.tsx            # Card container
│   ├── dialog.tsx          # Modal dialogs
│   ├── badge.tsx           # Status badges
│   ├── input.tsx           # Form inputs
│   ├── table.tsx           # Data tables
│   ├── tabs.tsx            # Tab navigation
│   ├── progress.tsx        # Progress bars
│   └── select.tsx          # Dropdowns
├── sidebar.tsx             # Navigation sidebar
└── ai-assistant.tsx        # AI chat interface
│
lib/                        # Utilities
├── utils.ts               # Helper functions
└── api/ (future)          # API client layer
│
store/                      # State management
└── useStore.ts            # Zustand store
│
types/                      # TypeScript
└── index.ts               # Type definitions
```

### Component Patterns

#### Server vs Client Components

```typescript
// Server Component (default)
export default async function ServerPage() {
  const data = await fetchData(); // Can fetch data
  return <div>{data}</div>;
}

// Client Component (interactive)
"use client";
import { useState } from "react";

export default function ClientPage() {
  const [state, setState] = useState();
  return <button onClick={...}>Click</button>;
}
```

**Rule**: Use Server Components by default, Client Components only when needed (state, effects, browser APIs).

#### Component Structure

```typescript
"use client"; // Only if needed

// 1. Imports
import { useState } from "react";
import { Button } from "@/components/ui/button";

// 2. Types
interface Props {
  title: string;
}

// 3. Component
export default function Component({ title }: Props) {
  // 4. State hooks
  const [state, setState] = useState();

  // 5. Store hooks
  const { data } = useStore();

  // 6. Effects
  useEffect(() => {}, []);

  // 7. Handlers
  const handleClick = () => {};

  // 8. Computed values
  const filtered = data.filter(...);

  // 9. JSX
  return <div>{title}</div>;
}
```

---

## 🔧 Backend Architecture (Future)

### Technology Stack (Planned)

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Fastify | Fast Node.js web framework |
| **Language** | TypeScript | Type-safe backend |
| **Database** | PostgreSQL | Relational database |
| **ORM** | Prisma | Type-safe database client |
| **Validation** | Zod | Schema validation |
| **Auth** | NextAuth.js | Authentication |
| **AI** | OpenAI SDK | AI integration |
| **Caching** | Redis (optional) | Performance |

### Directory Structure (Planned)

```
backend/
├── src/
│   ├── server.ts            # Entry point
│   ├── routes/              # API routes
│   │   ├── objectives.ts    # /api/objectives
│   │   ├── metrics.ts       # /api/metrics
│   │   ├── feedback.ts      # /api/feedback
│   │   └── ...
│   ├── controllers/         # Business logic
│   │   ├── objectivesController.ts
│   │   ├── metricsController.ts
│   │   └── ...
│   ├── services/            # Services
│   │   ├── ai/             # AI services
│   │   ├── email/          # Email services
│   │   └── integrations/   # Third-party integrations
│   ├── middleware/          # Middleware
│   │   ├── auth.ts         # Authentication
│   │   ├── validation.ts   # Request validation
│   │   └── errorHandler.ts # Error handling
│   ├── models/              # Prisma models
│   └── utils/               # Utilities
├── prisma/
│   ├── schema.prisma        # Database schema
│   ├── migrations/          # DB migrations
│   └── seed.ts             # Seed data
├── tests/                   # Tests
└── package.json
```

### API Design

#### RESTful Endpoints

```
Objectives:
GET    /api/objectives          # List all
GET    /api/objectives/:id      # Get one
POST   /api/objectives          # Create
PUT    /api/objectives/:id      # Update
DELETE /api/objectives/:id      # Delete

Metrics:
GET    /api/metrics
GET    /api/metrics/:id
POST   /api/metrics
PUT    /api/metrics/:id
DELETE /api/metrics/:id

Feedback:
GET    /api/feedback
GET    /api/feedback/:id
POST   /api/feedback
PUT    /api/feedback/:id
DELETE /api/feedback/:id
POST   /api/feedback/:id/reply

... (similar for all entities)
```

#### Request/Response Format

```typescript
// Request
POST /api/objectives
Content-Type: application/json

{
  "title": "Increase Revenue",
  "description": "Grow MRR by 30%",
  "quarter": "Q1",
  "year": 2024,
  "category": "Revenue"
}

// Response
HTTP/1.1 201 Created
Content-Type: application/json

{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Increase Revenue",
    "description": "Grow MRR by 30%",
    "quarter": "Q1",
    "year": 2024,
    "category": "Revenue",
    "createdAt": "2025-01-24T10:00:00Z",
    "updatedAt": "2025-01-24T10:00:00Z"
  }
}

// Error Response
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Title is required",
    "details": {
      "field": "title"
    }
  }
}
```

---

## 🗄️ Database Architecture (Future)

### Schema Overview

#### Core Entities

1. **Users & Auth**
   - `User` - User accounts
   - `Session` - User sessions
   - `Role` - User roles
   - `Permission` - Permissions

2. **Strategy**
   - `Objective` - OKRs
   - `KeyResult` - Key results
   - `RoadmapItem` - Product initiatives
   - `Competitor` - Competitive data

3. **Analytics**
   - `Metric` - KPIs
   - `FeatureAnalytic` - Feature data
   - `ABTest` - A/B tests

4. **Customers**
   - `Customer` - Customer records
   - `Feedback` - Customer feedback
   - `Segment` - Customer segments

5. **Execution**
   - `Project` - Projects
   - `Task` - Tasks
   - `Team` - Team members

6. **Reporting**
   - `Report` - Custom reports
   - `Alert` - Notifications

### Example Prisma Schema

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String
  role      UserRole
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  objectives Objective[]
  metrics    Metric[]

  @@map("users")
}

model Objective {
  id          String   @id @default(uuid())
  title       String
  description String
  quarter     String
  year        Int
  category    String
  ownerId     String
  owner       User     @relation(fields: [ownerId], references: [id])

  keyResults  KeyResult[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("objectives")
}

model KeyResult {
  id          String    @id @default(uuid())
  title       String
  target      Float
  current     Float
  objectiveId String
  objective   Objective @relation(fields: [objectiveId], references: [id])
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@map("key_results")
}

// ... more models
```

### Relationships

```
User ─┬─ has many ─> Objective
      ├─ has many ─> Metric
      ├─ has many ─> Project
      └─ has many ─> Feedback

Objective ─── has many ─> KeyResult

Project ─── has many ─> Task

Customer ─── has many ─> Feedback
```

---

## 🤖 AI Architecture (Future)

### AI Service Layer

```typescript
// backend/src/services/ai/

class AIService {
  private openai: OpenAI;

  async generateOKRSuggestions(context: {
    currentMetrics: Metric[];
    currentObjectives: Objective[];
    userInput: string;
  }): Promise<string> {
    const prompt = this.buildOKRPrompt(context);
    const response = await this.openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are an expert strategy consultant..." },
        { role: "user", content: prompt }
      ]
    });
    return response.choices[0].message.content;
  }

  async analyzePerformanceMetrics(data: Metric[]): Promise<string> {
    // AI analysis of metrics
  }

  async analyzeFeedbackSentiment(feedback: Feedback[]): Promise<string> {
    // AI sentiment analysis
  }

  // ... more AI functions
}
```

### AI Contexts

| Context | Purpose | Input | Output |
|---------|---------|-------|--------|
| **OKR** | Create objectives | Metrics, goals | OKR suggestions |
| **Analytics** | Performance insights | Metric data | Analysis, trends |
| **Feedback** | Sentiment analysis | Customer feedback | Sentiment, priorities |
| **Competitive** | Competitive analysis | Competitor data | Insights, positioning |
| **Roadmap** | Prioritization | Initiatives, data | Priority suggestions |
| **Reports** | Report generation | Data, requirements | Report content |

---

## 🔐 Security Architecture (Future)

### Authentication Flow

```
1. User enters credentials
2. NextAuth.js validates
3. Creates JWT session token
4. Token stored in httpOnly cookie
5. Every request includes token
6. Backend validates token
7. Returns protected data
```

### Authorization

```typescript
// Middleware
async function authorize(req, requiredRole: UserRole) {
  const session = await getSession(req);
  if (!session) throw new UnauthorizedError();
  if (session.user.role < requiredRole) throw new ForbiddenError();
  return session.user;
}

// Route
app.get('/api/admin/users', async (req, res) => {
  const user = await authorize(req, UserRole.ADMIN);
  // ... handle request
});
```

### Data Security

- **Passwords**: Hashed with bcrypt
- **Tokens**: JWT with short expiry
- **API Keys**: Encrypted at rest
- **Sensitive Data**: Encrypted in database
- **HTTPS**: Required in production
- **CORS**: Restricted origins
- **Rate Limiting**: Prevent abuse

---

## 📡 API Client Layer (Future)

### Frontend API Abstraction

```typescript
// lib/api/objectives.ts

export const objectivesAPI = {
  async getAll(): Promise<Objective[]> {
    const res = await fetch('/api/objectives');
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    return data.data;
  },

  async create(objective: CreateObjectiveDTO): Promise<Objective> {
    const res = await fetch('/api/objectives', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(objective)
    });
    if (!res.ok) throw new Error('Failed to create');
    const data = await res.json();
    return data.data;
  },

  // ... update, delete
};
```

### Usage in Components

```typescript
"use client";

import { useState, useEffect } from "react";
import { objectivesAPI } from "@/lib/api/objectives";

export default function OKRsPage() {
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    objectivesAPI.getAll()
      .then(setObjectives)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async (data) => {
    await objectivesAPI.create(data);
    // Refresh list
    const updated = await objectivesAPI.getAll();
    setObjectives(updated);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return <div>{/* Render objectives */}</div>;
}
```

---

## 🚀 Deployment Architecture (Future)

### Production Setup

```
┌─────────────────────────────────────────┐
│           Users (Browser)               │
└──────────────┬──────────────────────────┘
               │
               │ HTTPS
               │
┌──────────────┴──────────────────────────┐
│         Vercel (Frontend)               │
│      Next.js SSR + Static Pages         │
└──────────────┬──────────────────────────┘
               │
               │ REST API
               │
┌──────────────┴──────────────────────────┐
│      Railway/Render (Backend)           │
│      Node.js + Fastify API              │
└──────────────┬──────────────────────────┘
               │
               │ SQL Queries
               │
┌──────────────┴──────────────────────────┐
│    PostgreSQL (Railway/Supabase)        │
│         Database Instance               │
└─────────────────────────────────────────┘
```

### Environment Separation

| Environment | Frontend | Backend | Database | Purpose |
|-------------|----------|---------|----------|---------|
| **Development** | localhost:3000 | localhost:4000 | Local PostgreSQL | Development |
| **Staging** | staging.vercel.app | staging.railway.app | Staging DB | Testing |
| **Production** | app.strategyguru.com | api.strategyguru.com | Production DB | Live |

---

## 📊 Performance Considerations

### Frontend Optimization

- **Server Components**: Reduce client-side JavaScript
- **Code Splitting**: Automatic with Next.js
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: React.lazy for heavy components
- **Caching**: Static pages cached by CDN

### Backend Optimization

- **Database Indexing**: On frequently queried fields
- **Query Optimization**: Prisma query profiling
- **Caching**: Redis for hot data (optional)
- **Connection Pooling**: Prisma connection pool
- **Compression**: gzip/brotli for responses

### Target Metrics

- **Page Load**: < 3 seconds
- **API Response**: < 500ms (p95)
- **Time to Interactive**: < 5 seconds
- **Lighthouse Score**: > 90

---

## 🔄 Data Flow

### Create OKR Flow

```
1. User clicks "New Objective"
2. Dialog opens with form
3. User fills form
4. User clicks "Create"
5. Frontend validates input
6. API POST /api/objectives
7. Backend validates data
8. Prisma creates record
9. Database saves record
10. Backend returns created OKR
11. Frontend updates UI
12. Dialog closes
13. Success message shows
```

### AI Assistant Flow

```
1. User types question in AI chat
2. Frontend sends to backend
3. Backend prepares context
4. Backend calls OpenAI API
5. OpenAI returns response
6. Backend processes response
7. Backend logs usage/cost
8. Frontend receives response
9. Response displayed in chat
10. User can ask follow-up
```

---

## 📝 Technology Decisions

### Why Next.js 16?
- Latest version with App Router
- Excellent performance (Turbopack)
- SSR + SSG capabilities
- Built-in optimizations
- Large ecosystem

### Why TypeScript?
- Type safety catches errors early
- Better IDE support
- Self-documenting code
- Refactoring confidence
- Industry standard

### Why Tailwind CSS 4?
- Utility-first approach
- Rapid development
- Consistent design
- Small bundle size
- Excellent documentation

### Why Prisma?
- Type-safe database access
- Excellent TypeScript support
- Easy migrations
- Great developer experience
- Performance

### Why Zustand?
- Simple API
- No boilerplate
- TypeScript support
- React 19 compatible
- Small bundle (3kb)

---

**This architecture is designed for scalability, maintainability, and developer experience.**

**Last Updated**: January 24, 2025
