<div align="center">

# 💰 Moneta — Personal Finance Dashboard

**A sleek, AI-powered personal finance dashboard built with React 18 + Vite**

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-JSX-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Claude AI](https://img.shields.io/badge/Claude-AI_Powered-D4A27A?style=for-the-badge&logo=anthropic&logoColor=white)](https://anthropic.com/)

---

*Track spending. Visualize wealth. Manage goals. Get AI insights — all in one place.*

</div>

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| 📊 **Dashboard Overview** | Summary cards with live balance, income, expenses & savings at a glance |
| 📈 **Time-Based Visualizations** | Balance trend, weekly cash flow & net worth projection charts |
| 🍩 **Spending Breakdown** | Categorical spending analysis with radial bar charts |
| 🧾 **Transaction Management** | Full CRUD — add, edit, delete, search, filter & sort transactions |
| 🔍 **Smart Filtering** | Filter by category, type, and status; sort by date, amount, or merchant |
| 🔐 **Role-Based Access** | Admin / Editor / Viewer roles with granular permission control |
| 🤖 **AI Financial Assistant** | Chat with Claude AI for personalized financial insights |
| 🌗 **Dark / Light Theme** | Instant theme switching via CSS custom properties |
| 💾 **Persistent State** | Cache-first data strategy with localStorage, survives page refresh |
| 📱 **Responsive Design** | Mobile-friendly layout with horizontal scroll on transaction tables |

---

## 🖥️ Pages

```
/dashboard      → Overview with stats, charts, recent activity
/transactions   → Full transaction list with filters, sort, search
/analytics      → Deep-dive spending and income analytics
/wallet         → Account management and fund transfers
/cards          → Payment cards overview
/goals          → Savings goals tracker with progress bars
/ai-assistant   → Claude-powered chat for financial advice
/settings       → Theme, currency, language preferences
/profile        → User profile management
```

---

## 🛠️ Tech Stack

```
Frontend Framework   →  React 18 (JSX)
Build Tool           →  Vite 5
Styling              →  Tailwind CSS 3 + Custom Design System
Charts               →  Recharts 2
Icons                →  Lucide React
AI Integration       →  Anthropic Claude API (claude-sonnet)
State Management     →  React Context API (4 providers)
Persistence          →  localStorage with stale-while-revalidate pattern
```

---

## 🎨 Design System

Built from scratch — no component library, full design control.

- **Fonts:** Syne (display) · DM Sans (body) · JetBrains Mono (numbers)
- **Colors:** 4-layer background scale + 5 semantic accent tokens
- **Theme:** CSS custom properties for zero-flash dark/light switching
- **Motion:** Custom keyframe animations — `fadeUp`, `slideIn`, `glowPulse`, `shimmer`

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18+`
- An Anthropic API key → [console.anthropic.com](https://console.anthropic.com)

### Installation

```bash
# Clone the repo
git clone https://github.com/adrijaDatta/Finance-tracker.git
cd finance-dashboard

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

Open `.env.local` and add your API key:

```env
VITE_ANTHROPIC_API_KEY=sk-ant-your-key-here
```

```bash
# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and you're in. 🎉

---

## 🔐 Role-Based Access Control

The app ships with three roles you can switch between in the UI:

| Role | Add | Edit | Delete | Export |
|------|-----|------|--------|--------|
| 👑 **Admin** | ✅ | ✅ | ✅ | ✅ |
| ✏️ **Editor** | ✅ | ✅ | ❌ | ✅ |
| 👁️ **Viewer** | ❌ | ❌ | ❌ | ❌ |

---

## ⚠️ Known Limitations

- **AI API is browser-direct** — the Anthropic API is called from the client. Safe for local/demo use, but a serverless proxy is recommended for production deployment.
- **Mock data only** — no real backend. Data resets if localStorage is cleared.
- **No test coverage** — unit and integration tests are not yet written.
- **Charts on mobile** — Recharts visualizations work best on tablet and desktop screen sizes.

---

## 🗺️ Roadmap

- [ ] Serverless API proxy (Vercel/Netlify function) for secure key handling
- [ ] Real backend with Supabase or a REST API
- [ ] React Query / SWR for proper server state management
- [ ] Vitest + React Testing Library test suite
- [ ] PDF export in addition to CSV
- [ ] PWA support for offline use

---

## 📁 Project Structure

```
src/
├── components/
│   ├── charts/        # BalanceTrend, SpendingChart, WeeklyCashFlow, NetWorth
│   ├── layout/        # Sidebar, Topbar
│   ├── ui/            # TransactionModal, UpgradeModal, RoleSwitcher
│   └── widgets/       # StatCard, RecentTransactions, SavingsGoals, etc.
├── context/           # FinanceContext, RoleContext, ThemeContext, AuthContext
├── data/              # mockData.js, transactions.js
├── hooks/             # useCountUp
├── pages/             # Dashboard, Transactions, Analytics, Wallet, etc.
└── utils/             # formatters.js
```

---

## 📜 License

MIT — free to use, modify, and distribute.

---

<div align="center">

Built with ☕ and way too many CSS variables.

**If you found this useful, drop a ⭐ — it helps a lot!**

</div>
