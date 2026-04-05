import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../utils/formatters';

// Fixed custom tooltip rendered outside recharts to fix positioning
function HoverTooltip({ data, activeIdx, total }) {
  if (activeIdx === null || !data[activeIdx]) return null;
  const d = data[activeIdx];
  const pct = ((d.value / total) * 100).toFixed(1);
  return (
    <div
      className="glass-card-elevated px-3 py-2.5 pointer-events-none"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        minWidth: 120,
        textAlign: 'center',
      }}
    >
      <div className="flex items-center justify-center gap-1.5 mb-1">
        <span>{d.icon}</span>
        <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{d.name}</span>
      </div>
      <p className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>{formatCurrency(d.value)}</p>
      <p className="text-xs font-mono mt-0.5" style={{ color: d.color }}>{pct}%</p>
    </div>
  );
}

export default function SpendingChart({ data }) {
  const [activeIdx, setActiveIdx] = useState(null);

  if (!data || data.length === 0) {
    return (
      <div className="glass-card p-6 flex flex-col items-center justify-center min-h-[240px] gap-3">
        <span className="text-3xl opacity-30">📊</span>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No spending data available</p>
      </div>
    );
  }

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="glass-card p-6 flex flex-col gap-5">
      <div>
        <h2 className="font-display text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
          Spending Breakdown
        </h2>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>December 2024 — by category</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Donut + tooltip overlay container */}
        <div className="relative flex-shrink-0" style={{ width: 160, height: 160 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={72}
                paddingAngle={3}
                dataKey="value"
                onMouseEnter={(_, idx) => setActiveIdx(idx)}
                onMouseLeave={() => setActiveIdx(null)}
                strokeWidth={0}
              >
                {data.map((entry, idx) => (
                  <Cell
                    key={entry.name}
                    fill={entry.color}
                    opacity={activeIdx === null || activeIdx === idx ? 1 : 0.3}
                    style={{ cursor: 'pointer', transition: 'opacity 0.2s, transform 0.15s' }}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center label — hidden when tooltip is showing */}
          {activeIdx === null && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>Total</span>
              <span className="text-sm font-display font-bold" style={{ color: 'var(--text-primary)' }}>
                {formatCurrency(total, true)}
              </span>
            </div>
          )}

          {/* Properly positioned tooltip centered in donut */}
          <HoverTooltip data={data} activeIdx={activeIdx} total={total} />
        </div>

        {/* Legend */}
        <div className="flex-1 grid grid-cols-1 gap-1.5 min-w-0">
          {data.slice(0, 6).map((item, idx) => {
            const pct = ((item.value / total) * 100).toFixed(0);
            const isActive = activeIdx === idx;
            return (
              <div
                key={item.name}
                className="flex items-center gap-2 cursor-pointer rounded-lg px-1.5 py-0.5 transition-all duration-150"
                style={{
                  background: isActive ? `${item.color}18` : 'transparent',
                }}
                onMouseEnter={() => setActiveIdx(idx)}
                onMouseLeave={() => setActiveIdx(null)}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0 transition-transform duration-150"
                  style={{
                    background: item.color,
                    transform: isActive ? 'scale(1.4)' : 'scale(1)',
                  }}
                />
                <span
                  className="text-xs truncate flex-1 transition-colors duration-150"
                  style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                >
                  {item.name}
                </span>
                <span className="text-xs font-mono flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Budget usage bars */}
      <div className="space-y-2 pt-2" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <p className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
          Budget vs Actual
        </p>
        {data.slice(0, 4).map(item => {
          const pct = Math.min((item.value / item.budget) * 100, 100);
          const over = item.value > item.budget;
          return (
            <div key={item.name} className="flex items-center gap-3">
              <span className="text-xs w-16 truncate" style={{ color: 'var(--text-secondary)' }}>{item.name}</span>
              <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--progress-track)' }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, background: over ? 'var(--accent-red)' : item.color }}
                />
              </div>
              <span
                className="text-[10px] font-mono w-8 text-right"
                style={{ color: over ? 'var(--accent-red)' : 'var(--text-muted)' }}
              >
                {pct.toFixed(0)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
