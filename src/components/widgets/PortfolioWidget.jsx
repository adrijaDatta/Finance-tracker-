import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="glass-card-elevated px-3 py-2" style={{ border: '1px solid var(--border-subtle)' }}>
      <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{d.name}</p>
      <p className="text-xs font-mono" style={{ color: d.color }}>{d.value}%</p>
    </div>
  );
};

export default function PortfolioWidget({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="glass-card p-6 flex flex-col items-center justify-center min-h-[200px] gap-3">
        <span className="text-3xl opacity-30">📊</span>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No portfolio data</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-base font-semibold" style={{ color: 'var(--text-primary)' }}>Portfolio Mix</h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Asset allocation</p>
        </div>
        <div className="flex items-center gap-1 text-xs font-mono" style={{ color: 'var(--accent-green)' }}>
          <TrendingUp size={12} />
          <span>+3.8% ROI</span>
        </div>
      </div>

      {/* Donut chart */}
      <div className="relative" style={{ height: 160 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={48}
              outerRadius={72}
              paddingAngle={3}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} opacity={0.9} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>Total</p>
          <p className="font-display text-lg font-bold" style={{ color: 'var(--text-primary)' }}>$66K</p>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-1 gap-1.5">
        {data.map(item => {
          const value = (item.value / 100) * 66000;
          return (
            <div key={item.name} className="flex items-center gap-2.5 py-1" style={{ borderBottom: '1px solid var(--surface-1)' }}>
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
              <span className="text-xs flex-1" style={{ color: 'var(--text-secondary)' }}>{item.name}</span>
              <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>${(value / 1000).toFixed(0)}K</span>
              <span className="text-xs font-mono font-semibold w-8 text-right" style={{ color: item.color }}>{item.value}%</span>
            </div>
          );
        })}
      </div>

      <button className="flex items-center justify-center gap-1.5 text-xs font-mono hover:underline" style={{ color: 'var(--accent-cyan)' }}>
        View full portfolio <ArrowUpRight size={11} />
      </button>
    </div>
  );
}
