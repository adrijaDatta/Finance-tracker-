import React, { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Activity, BarChart2, PieChart as PieIcon, Calendar, Download } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

const PERIODS = ['1W', '1M', '3M', '6M', '1Y'];

const monthlyIncome = [
  { month: 'Jul', income: 42000, expenses: 21500, savings: 20500 },
  { month: 'Aug', income: 44500, expenses: 20000, savings: 24500 },
  { month: 'Sep', income: 46000, expenses: 22500, savings: 23500 },
  { month: 'Oct', income: 43000, expenses: 21000, savings: 22000 },
  { month: 'Nov', income: 45000, expenses: 20000, savings: 25000 },
  { month: 'Dec', income: 44000, expenses: 22000, savings: 22000 },
];

const categoryTrend = [
  { month: 'Jul', Housing: 6800, Food: 2900, Transport: 1900, Shopping: 3800, Other: 6100 },
  { month: 'Aug', Housing: 6800, Food: 3100, Transport: 2000, Shopping: 4200, Other: 3900 },
  { month: 'Sep', Housing: 6800, Food: 2800, Transport: 2100, Shopping: 3500, Other: 7300 },
  { month: 'Oct', Housing: 6800, Food: 3000, Transport: 1800, Shopping: 3900, Other: 5500 },
  { month: 'Nov', Housing: 6800, Food: 3200, Transport: 2200, Shopping: 4500, Other: 3300 },
  { month: 'Dec', Housing: 6800, Food: 3200, Transport: 2100, Shopping: 4200, Other: 5700 },
];

const topInsights = [
  { label: 'Avg Monthly Savings', value: '$22,750', change: +8.2, color: 'text-accent-green' },
  { label: 'Savings Rate', value: '51.7%', change: +2.1, color: 'text-accent-cyan' },
  { label: 'Highest Expense Month', value: 'Sep', change: null, color: 'text-accent-amber' },
  { label: 'Expense Reduction', value: '-$2,800', change: -11.2, color: 'text-accent-red' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card-elevated px-3 py-2 shadow-card text-xs">
      <p className="text-slate-400 font-mono mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color }} className="font-medium">
          {p.name}: ${p.value?.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

export default function Analytics() {
  const { spendingCategories } = useFinance();
  const [activePeriod, setActivePeriod] = useState('6M');
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-white">Financial Analytics</h2>
          <p className="text-sm text-slate-500 mt-0.5 font-mono">Deep dive into your financial patterns</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-bg-elevated border border-border-subtle rounded-xl p-1">
            {PERIODS.map(p => (
              <button
                key={p}
                onClick={() => setActivePeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activePeriod === p
                    ? 'bg-accent-cyan text-bg-primary font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border-subtle text-sm text-slate-300 hover:border-accent-cyan/30 hover:text-white transition-all">
            <Download size={14} />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {topInsights.map((ins, i) => (
          <div key={i} className="glass-card p-5 animate-fade-up" style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">{ins.label}</p>
            <p className={`font-display text-2xl font-bold mt-2 ${ins.color}`}>{ins.value}</p>
            {ins.change !== null && (
              <div className={`flex items-center gap-1 mt-2 text-xs font-mono ${ins.change >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                {ins.change >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                {Math.abs(ins.change)}% vs prev period
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-bg-elevated border border-border-subtle rounded-xl p-1 w-fit">
        {[
          { id: 'overview', label: 'Overview', icon: Activity },
          { id: 'spending', label: 'Spending', icon: BarChart2 },
          { id: 'categories', label: 'Categories', icon: PieIcon },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === id
                ? 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* Income vs Expenses vs Savings */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display text-base font-semibold text-white">Income vs Expenses vs Savings</h3>
                <p className="text-xs text-slate-500 mt-0.5 font-mono">6-month trend comparison</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5"><span className="w-3 h-1 rounded bg-accent-green inline-block"/>Income</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-1 rounded bg-accent-red inline-block"/>Expenses</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-1 rounded bg-accent-cyan inline-block"/>Savings</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={monthlyIncome}>
                <defs>
                  <linearGradient id="igIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00FF87" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#00FF87" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="igExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF4757" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#FF4757" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="igSavings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#00D4FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" stroke="#475569" tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                <YAxis stroke="#475569" tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="income" stroke="#00FF87" strokeWidth={2} fill="url(#igIncome)" name="Income" />
                <Area type="monotone" dataKey="expenses" stroke="#FF4757" strokeWidth={2} fill="url(#igExpenses)" name="Expenses" />
                <Area type="monotone" dataKey="savings" stroke="#00D4FF" strokeWidth={2} fill="url(#igSavings)" name="Savings" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Cash Flow Efficiency */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="glass-card p-6">
              <h3 className="font-display text-base font-semibold text-white mb-1">Monthly Cash Flow</h3>
              <p className="text-xs text-slate-500 font-mono mb-6">Net cash position per month</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={monthlyIncome.map(m => ({ ...m, net: m.income - m.expenses }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="month" stroke="#475569" tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                  <YAxis stroke="#475569" tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="net" name="Net Cash" fill="#00D4FF" radius={[4, 4, 0, 0]} opacity={0.85} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="glass-card p-6">
              <h3 className="font-display text-base font-semibold text-white mb-1">Savings Rate Trend</h3>
              <p className="text-xs text-slate-500 font-mono mb-6">% of income saved each month</p>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={monthlyIncome.map(m => ({ ...m, rate: +((m.savings / m.income) * 100).toFixed(1) }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="month" stroke="#475569" tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                  <YAxis stroke="#475569" tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                  <Tooltip content={({ active, payload, label }) => active && payload?.length ? (
                    <div className="glass-card-elevated px-3 py-2 shadow-card text-xs">
                      <p className="text-slate-400 font-mono mb-1">{label}</p>
                      <p className="text-accent-green font-medium">Rate: {payload[0]?.value}%</p>
                    </div>
                  ) : null} />
                  <Line type="monotone" dataKey="rate" stroke="#00FF87" strokeWidth={2.5} dot={{ fill: '#00FF87', r: 4, strokeWidth: 0 }} name="Savings Rate" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Spending Tab */}
      {activeTab === 'spending' && (
        <div className="space-y-4">
          <div className="glass-card p-6">
            <h3 className="font-display text-base font-semibold text-white mb-1">Spending by Category (6 months)</h3>
            <p className="text-xs text-slate-500 font-mono mb-6">Stacked monthly breakdown</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="month" stroke="#475569" tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                <YAxis stroke="#475569" tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'JetBrains Mono', color: '#94a3b8' }} />
                <Bar dataKey="Housing" stackId="a" fill="#00D4FF" radius={[0,0,0,0]} />
                <Bar dataKey="Food" stackId="a" fill="#00FF87" />
                <Bar dataKey="Transport" stackId="a" fill="#FFB800" />
                <Bar dataKey="Shopping" stackId="a" fill="#FF4757" />
                <Bar dataKey="Other" stackId="a" fill="#7B5EA7" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Budget utilisation */}
          <div className="glass-card p-6">
            <h3 className="font-display text-base font-semibold text-white mb-1">Budget Utilisation</h3>
            <p className="text-xs text-slate-500 font-mono mb-5">Current month spending vs budget</p>
            <div className="space-y-4">
              {spendingCategories.map(cat => {
                const pct = Math.min((cat.value / cat.budget) * 100, 100);
                const over = cat.value > cat.budget;
                return (
                  <div key={cat.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{cat.icon}</span>
                        <span className="text-sm text-slate-300 font-medium">{cat.name}</span>
                        {over && <span className="text-[10px] bg-accent-red/20 text-accent-red px-1.5 py-0.5 rounded font-mono">OVER</span>}
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-mono font-medium text-white">${cat.value.toLocaleString()}</span>
                        <span className="text-xs text-slate-500 font-mono"> / ${cat.budget.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: over ? '#FF4757' : cat.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Categories Tab */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="glass-card p-6">
            <h3 className="font-display text-base font-semibold text-white mb-1">Spending Distribution</h3>
            <p className="text-xs text-slate-500 font-mono mb-4">Category breakdown this month</p>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={spendingCategories}
                  cx="50%" cy="50%"
                  innerRadius={70} outerRadius={110}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {spendingCategories.map((entry, i) => (
                    <Cell key={i} fill={entry.color} opacity={0.9} />
                  ))}
                </Pie>
                <Tooltip content={({ active, payload }) => active && payload?.length ? (
                  <div className="glass-card-elevated px-3 py-2 shadow-card text-xs">
                    <p className="text-white font-medium">{payload[0].name}</p>
                    <p style={{ color: payload[0].payload.color }}>${payload[0].value?.toLocaleString()}</p>
                  </div>
                ) : null} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {spendingCategories.map(cat => (
                <div key={cat.name} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cat.color }} />
                  <span className="text-xs text-slate-400 flex-1 truncate">{cat.name}</span>
                  <span className="text-xs font-mono" style={{ color: cat.color }}>{((cat.value / spendingCategories.reduce((a,b)=>a+b.value,0))*100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-display text-base font-semibold text-white mb-1">Category Details</h3>
            <p className="text-xs text-slate-500 font-mono mb-4">Spend, budget & status</p>
            <div className="space-y-3">
              {spendingCategories.map(cat => {
                const pct = ((cat.value / cat.budget) * 100).toFixed(0);
                const over = cat.value > cat.budget;
                return (
                  <div key={cat.name} className="flex items-center gap-3 p-3 bg-white/3 rounded-xl border border-white/5">
                    <div className="text-xl w-8 text-center">{cat.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">{cat.name}</p>
                      <p className="text-xs text-slate-500 font-mono">${cat.value.toLocaleString()} of ${cat.budget.toLocaleString()}</p>
                    </div>
                    <div className={`text-xs font-mono font-bold px-2 py-1 rounded-lg ${over ? 'bg-accent-red/20 text-accent-red' : 'bg-accent-green/10 text-accent-green'}`}>
                      {pct}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
