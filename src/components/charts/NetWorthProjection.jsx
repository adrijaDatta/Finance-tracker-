import React from 'react';
import {
  ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { formatCurrency } from '../../utils/formatters';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card-elevated px-3 py-2" style={{ border: '1px solid var(--border-subtle)', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
      <p className="text-xs font-mono mb-1.5" style={{ color: 'var(--text-muted)' }}>{label} 2025</p>
      {payload.map(p => p.value != null && (
        <div key={p.dataKey} className="flex justify-between gap-4 py-0.5">
          <span className="text-xs capitalize" style={{ color: 'var(--text-secondary)' }}>
            {p.dataKey === 'actual' ? '● Actual' : '◌ Projected'}
          </span>
          <span className="text-xs font-mono font-medium" style={{ color: p.color }}>{formatCurrency(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

export default function NetWorthProjection({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="glass-card p-6 flex flex-col items-center justify-center min-h-[200px] gap-3">
        <span className="text-3xl opacity-30">📉</span>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No projection data</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 flex flex-col gap-5">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-display text-base font-semibold" style={{ color: 'var(--text-primary)' }}>Net Worth Projection</h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>6-month forecast based on trends</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>Target Jun</p>
          <p className="text-sm font-mono font-bold" style={{ color: 'var(--accent-purple)' }}>$80,800</p>
        </div>
      </div>

      <div className="h-44 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gradProjected" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#7B5EA7" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#7B5EA7" stopOpacity={0} />
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
            <ReferenceLine x="Jan" stroke="color-mix(in srgb, var(--accent-cyan) 30%, transparent)" strokeDasharray="4 4"
              label={{ value: 'Today', position: 'top', fill: 'var(--accent-cyan)', fontSize: 10, fontFamily: 'JetBrains Mono' }} />
            <Area type="monotone" dataKey="projected" stroke="#7B5EA7" strokeWidth={2} strokeDasharray="6 3"
              fill="url(#gradProjected)" dot={false} activeDot={{ r: 4, fill: '#7B5EA7', strokeWidth: 0 }} connectNulls />
            <Line type="monotone" dataKey="actual" stroke="#00D4FF" strokeWidth={2.5}
              dot={{ r: 5, fill: '#00D4FF', strokeWidth: 0 }} activeDot={{ r: 6 }} connectNulls />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="flex gap-4">
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-0.5 rounded-full" style={{ background: 'var(--accent-cyan)' }} />
          <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>Actual</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-0.5 rounded-full" style={{ background: '#7B5EA7', backgroundImage: 'repeating-linear-gradient(90deg, #7B5EA7 0 4px, transparent 4px 7px)' }} />
          <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>Projected</span>
        </div>
      </div>
    </div>
  );
}
