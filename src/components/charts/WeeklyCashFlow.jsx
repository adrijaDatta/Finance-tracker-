import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { formatCurrency } from '../../utils/formatters';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const net = (payload[0]?.value || 0) - (payload[1]?.value || 0);
  return (
    <div className="glass-card-elevated px-3 py-2" style={{ border: '1px solid var(--border-subtle)', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
      <p className="text-xs font-mono mb-2" style={{ color: 'var(--text-muted)' }}>{label}</p>
      <div className="flex items-center gap-2 py-0.5">
        <span className="w-2 h-2 rounded-sm" style={{ background: 'var(--accent-cyan)', opacity: 0.7 }} />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Inflow</span>
        <span className="ml-auto text-xs font-mono" style={{ color: 'var(--accent-green)' }}>{formatCurrency(payload[0]?.value)}</span>
      </div>
      <div className="flex items-center gap-2 py-0.5">
        <span className="w-2 h-2 rounded-sm" style={{ background: 'var(--accent-red)', opacity: 0.7 }} />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Outflow</span>
        <span className="ml-auto text-xs font-mono" style={{ color: 'var(--accent-red)' }}>{formatCurrency(payload[1]?.value)}</span>
      </div>
      <div className="mt-1.5 pt-1.5 flex justify-between" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Net</span>
        <span className="text-xs font-mono font-medium" style={{ color: net >= 0 ? 'var(--accent-green)' : 'var(--accent-red)' }}>
          {net >= 0 ? '+' : ''}{formatCurrency(net)}
        </span>
      </div>
    </div>
  );
};

export default function WeeklyCashFlow({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="glass-card p-6 flex flex-col items-center justify-center min-h-[160px] gap-3">
        <span className="text-3xl opacity-30">📊</span>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No cash flow data</p>
      </div>
    );
  }

  const totalInflow  = data.reduce((s, d) => s + d.inflow, 0);
  const totalOutflow = data.reduce((s, d) => s + d.outflow, 0);
  const netFlow      = totalInflow - totalOutflow;

  return (
    <div className="glass-card p-6 flex flex-col gap-5">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-display text-base font-semibold" style={{ color: 'var(--text-primary)' }}>Weekly Cash Flow</h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Last 7 days</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>Net Flow</p>
          <p className="text-sm font-mono font-bold" style={{ color: netFlow >= 0 ? 'var(--accent-green)' : 'var(--accent-red)' }}>
            {netFlow >= 0 ? '+' : ''}{formatCurrency(netFlow)}
          </p>
        </div>
      </div>

      <div className="h-44 -mx-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barSize={14} barGap={3}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'JetBrains Mono' }}
              axisLine={false} tickLine={false}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--hover-bg)' }} />
            <Bar dataKey="inflow"  radius={[4, 4, 0, 0]} fill="var(--accent-cyan)"  fillOpacity={0.7} />
            <Bar dataKey="outflow" radius={[4, 4, 0, 0]} fill="var(--accent-red)"   fillOpacity={0.7} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex gap-4">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-1 rounded-full" style={{ background: 'var(--accent-cyan)', opacity: 0.7 }} />
          <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>Inflow {formatCurrency(totalInflow, true)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-1 rounded-full" style={{ background: 'var(--accent-red)', opacity: 0.7 }} />
          <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>Outflow {formatCurrency(totalOutflow, true)}</span>
        </div>
      </div>
    </div>
  );
}
