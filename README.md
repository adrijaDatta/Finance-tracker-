<div align="center">

```
███╗   ███╗ ██████╗ ███╗   ██╗███████╗████████╗ █████╗
████╗ ████║██╔═══██╗████╗  ██║██╔════╝╚══██╔══╝██╔══██╗
██╔████╔██║██║   ██║██╔██╗ ██║█████╗     ██║   ███████║
██║╚██╔╝██║██║   ██║██║╚██╗██║██╔══╝     ██║   ██╔══██║
██║ ╚═╝ ██║╚██████╔╝██║ ╚████║███████╗   ██║   ██║  ██║
╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝   ╚═╝   ╚═╝  ╚═╝
```

### 〉Your money. Visualized. Understood. Controlled.

<br/>

[![React](https://img.shields.io/badge/React_18-black?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite_5-black?style=for-the-badge&logo=vite&logoColor=646CFF)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_3-black?style=for-the-badge&logo=tailwindcss&logoColor=06B6D4)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-black?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Claude AI](https://img.shields.io/badge/Claude_AI-black?style=for-the-badge&logo=anthropic&logoColor=D4A27A)](https://anthropic.com/)

<br/>

> **Moneta** is a full-featured personal finance dashboard — built from scratch with React 18, a custom design system, role-based access control, interactive charts, and a live AI assistant powered by Claude.

<br/>

---

## ⚡ What's Inside

</div>

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   📊  Dashboard        →  Stats, charts, recent activity        │
│   🧾  Transactions     →  Full CRUD, search, filter, sort       │
│   📈  Analytics        →  Deep-dive spending & income trends    │
│   💳  Wallet           →  Accounts overview & fund transfers    │
│   🎯  Goals            →  Savings goals with progress tracking  │
│   🤖  AI Assistant     →  Claude-powered financial advisor      │
│   🔐  Role System      →  Admin · Editor · Viewer permissions   │
│   🌗  Themes           →  Dark & light mode, instant toggle     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

<br/>

---

<div align="center">

## 🔥 Feature Highlights

</div>

<br/>

**📊 Rich Data Visualizations**
> Balance trend area charts · Weekly cash flow bars · Net worth projection · Radial spending breakdown — all powered by Recharts, all consuming live context state.

**🧾 Transaction Engine**
> Add, edit, delete, bulk-delete, export to CSV. Search by merchant, category or note. Filter by type and status. Sort by date, amount or merchant. Paginated. Animated.

**🔐 Role-Based Access Control**
> Three roles, one context. Permissions cascade from `RoleContext` to every button, checkbox, and action in the UI — no scattered conditionals, no hacks.

| | 👑 Admin | ✏️ Editor | 👁️ Viewer |
|:--|:--:|:--:|:--:|
| View data | ✅ | ✅ | ✅ |
| Add transactions | ✅ | ✅ | ❌ |
| Edit transactions | ✅ | ✅ | ❌ |
| Delete transactions | ✅ | ❌ | ❌ |
| Export CSV | ✅ | ✅ | ❌ |

**🤖 AI Financial Assistant**
> Chat interface backed by `claude-sonnet`. Sends your financial context — balances, spending patterns, goals — so Claude gives answers that are actually relevant to *your* money.

**💾 Cache-First State Strategy**
> `FinanceContext` hydrates from `localStorage` instantly on mount, checks staleness (> 5 min), then background-refreshes. Mirrors real SWR behavior without a library.

<br/>

---

## 🛠️ Stack

```yaml
Framework:        React 18 (JSX)
Build Tool:       Vite 5  →  instant HMR, Rollup production builds
Styling:          Tailwind CSS 3  +  custom design system (zero component libraries)
Charts:           Recharts 2  →  React-native, composable, themeable
Icons:            Lucide React
AI:               Anthropic Claude API  (claude-sonnet-4)
State:            React Context API  →  4 focused providers
Persistence:      localStorage  →  cache-first with stale detection
Fonts:            Syne · DM Sans · JetBrains Mono
```

---

## 🎨 Design System

Built entirely from scratch — **no MUI, no Chakra, no shadcn**. Every pixel is intentional.

```
Backgrounds  →  4-layer depth scale  (primary → secondary → card → elevated)
Accents      →  cyan · green · amber · red · purple
Typography   →  Syne (headings) · DM Sans (body) · JetBrains Mono (data)
Animations   →  fadeUp · slideIn · glowPulse · shimmer  (CSS keyframes via Tailwind)
Theming      →  CSS custom properties  →  zero re-render on theme switch
```

---

## 🚀 Run Locally

**1 — Clone**
```bash
git clone https://github.com/adrijaDatta/Finance-tracker-.git
cd finance-dashboard
```

**2 — Install**
```bash
npm install
```

**3 — Add your API key**
```bash
cp .env.example .env.local
```
```env
# .env.local
VITE_ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxx
```
> Get your key at [console.anthropic.com](https://console.anthropic.com) → takes 30 seconds.

**4 — Launch**
```bash
npm run dev
```
```
  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## 📁 Structure

```
src/
├── components/
│   ├── charts/      BalanceTrendChart · SpendingChart · WeeklyCashFlow · NetWorthProjection
│   ├── layout/      Sidebar · Topbar
│   ├── ui/          TransactionModal · RoleSwitcher · UpgradeModal
│   └── widgets/     StatCard · RecentTransactions · SavingsGoals · PortfolioWidget
│
├── context/         FinanceContext · RoleContext · ThemeContext · AuthContext
├── data/            mockData.js · transactions.js
├── hooks/           useCountUp.js
├── pages/           Dashboard · Transactions · Analytics · Wallet · Goals · AIAssistant · Settings · Profile
└── utils/           formatters.js
```

---

## ⚠️ Known Limitations

```diff
- AI API called directly from browser  →  key visible in network tab (use a proxy in production)
- No real backend  →  all data is mock, localStorage clears on cache wipe
- No test suite  →  Vitest + RTL planned
- Charts on very small screens  →  Recharts doesn't reflow below ~320px
```

---

## 🗺️ What's Next

```diff
+ Serverless proxy for Anthropic API  (Vercel / Netlify function)
+ Real backend  →  Supabase or Express REST API
+ React Query for server state + background sync
+ Vitest + React Testing Library coverage
+ PDF export alongside CSV
+ PWA  →  offline support + installable
```

---

<div align="center">

**Built with React · Styled with intention · Powered by Claude**

*If this helped you — a ⭐ goes a long way*

</div>
