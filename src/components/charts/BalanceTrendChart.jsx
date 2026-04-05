import React, { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import { formatCurrency } from '../../utils/formatters';

const PERIODS = ['3M', '6M', '1Y'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card-elevated px-4 py-3 min-w-[160px]" style={{ border: '1px solid var(--border-subtle)', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
      <p className="text-xs font-mono mb-2" style={{ color: 'var(--text-muted)' }}>{label} 2024</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center justify-between gap-4 py-0.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
            <span className="text-xs capitalize" style={{ color: 'var(--text-secondary)' }}>{p.name}</span>
          </div>
          <span className="text-xs font-mono font-medium" style={{ color: 'var(--text-primary)' }}>
            {formatCurrency(p.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function BalanceTrendChart({ data }) {
  const [period, setPeriod] = useState('1Y');
  const [activeLines, setActiveLines] = useState({ balance: true, income: true, expenses: true });

  if (!data || data.length === 0) {
    return (
      <div className="glass-card p-6 flex flex-col items-center justify-center min-h-[260px] gap-3">
        <span className="text-3xl opacity-30">📈</span>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No balance trend data</p>
      </div>
    );
  }

  const slicedData = period === '3M' ? data.slice(-3) : period === '6M' ? data.slice(-6) : data;
  const toggleLine = (key) => setActiveLines(prev => ({ ...prev, [key]: !prev[key] }));

  const lines = [
    { key: 'balance',  color: '#00D4FF', label: 'Balance'  },
    { key: 'income',   color: '#00FF87', label: 'Income'   },
    { key: 'expenses', color: '#FF4757', label: 'Expenses' },
  ];

  return (
    <div className="glass-card p-6 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="font-display text-base font-semibold" style={{ color: 'var(--text-primary)' }}>Balance Trend</h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Portfolio performance over time</p>
        </div>
        <div className="flex items-center gap-1 rounded-lg p-1" style={{ background: 'var(--bg-elevated)' }}>
          {PERIODS.map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className="px-3 py-1 rounded-md text-xs font-mono transition-all"
              style={{
                background: period === p ? 'var(--accent-cyan)' : 'transparent',
                color: period === p ? 'var(--text-on-accent)' : 'var(--text-muted)',
                fontWeight: period === p ? 700 : 400,
              }}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Legend toggles */}
      <div className="flex flex-wrap gap-3">
        {lines.map(({ key, color, label }) => (
          <button
            key={key}
            onClick={() => toggleLine(key)}
            className="flex items-center gap-1.5 text-xs font-mono transition-all px-2 py-1 rounded-lg"
            style={{ opacity: activeLines[key] ? 1 : 0.3 }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--hover-bg)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <span className="w-3 h-0.5 rounded-full" style={{ background: color }} />
            <span style={{ color }}>{label}</span>
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="h-56 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={slicedData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gradBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#00D4FF" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#00D4FF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#00FF87" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#00FF87" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#FF4757" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#FF4757" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'JetBrains Mono' }}
              axisLine={false} tickLine={false} dy={8}
            />
            <YAxis
              tick={{ fill: 'var(--text-muted)', fontSize: 10, fontFamily: 'JetBrains Mono' }}
              axisLine={false} tickLine={false}
              tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
              width={42}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border-subtle)', strokeWidth: 1 }} />
            {activeLines.balance && (
              <Area type="monotone" dataKey="balance" stroke="#00D4FF" strokeWidth={2.5}
                fill="url(#gradBalance)" dot={false} activeDot={{ r: 4, fill: '#00D4FF', strokeWidth: 0 }} />
            )}
            {activeLines.income && (
              <Area type="monotone" dataKey="income" stroke="#00FF87" strokeWidth={2}
                fill="url(#gradIncome)" dot={false} activeDot={{ r: 4, fill: '#00FF87', strokeWidth: 0 }} />
            )}
            {activeLines.expenses && (
              <Area type="monotone" dataKey="expenses" stroke="#FF4757" strokeWidth={2}
                fill="url(#gradExpenses)" dot={false} activeDot={{ r: 4, fill: '#FF4757', strokeWidth: 0 }} />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
