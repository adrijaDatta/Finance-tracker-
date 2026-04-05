import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export default function TopMerchants({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="glass-card p-6 flex flex-col items-center justify-center min-h-[200px] gap-3">
        <span className="text-3xl opacity-30">🏪</span>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No merchant data</p>
      </div>
    );
  }

  const max = Math.max(...data.map(d => d.total));

  return (
    <div className="glass-card p-6 flex flex-col gap-4">
      <div>
        <h2 className="font-display text-base font-semibold" style={{ color: 'var(--text-primary)' }}>Top Merchants</h2>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Highest spend this month</p>
      </div>

      <div className="space-y-3">
        {data.map((m, i) => {
          const barPct = (m.total / max) * 100;
          return (
            <div
              key={m.name}
              className="group cursor-pointer animate-fade-up"
              style={{ animationDelay: `${i * 70}ms`, animationFillMode: 'both' }}
            >
              <div className="flex items-center gap-3 mb-1.5">
                <span className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                  style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)' }}>
                  {m.icon}
                </span>
                <span className="flex-1 text-sm transition-colors" style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>
                  {m.name}
                </span>
                <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{m.count}x</span>
                <div className="flex items-center gap-1">
                  {m.trend > 0
                    ? <TrendingUp size={10} style={{ color: 'var(--accent-red)' }} />
                    : m.trend < 0
                    ? <TrendingDown size={10} style={{ color: 'var(--accent-green)' }} />
                    : <Minus size={10} style={{ color: 'var(--text-muted)' }} />
                  }
                  <span className="text-[10px] font-mono" style={{
                    color: m.trend > 0 ? 'var(--accent-red)' : m.trend < 0 ? 'var(--accent-green)' : 'var(--text-muted)'
                  }}>
                    {m.trend !== 0 ? `${m.trend > 0 ? '+' : ''}${m.trend}%` : '—'}
                  </span>
                </div>
                <span className="text-sm font-mono font-medium w-16 text-right" style={{ color: 'var(--text-primary)' }}>
                  {formatCurrency(m.total)}
                </span>
              </div>
              <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--progress-track)' }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${barPct}%`,
                    background: `linear-gradient(90deg, color-mix(in srgb, var(--accent-cyan) 60%, transparent), var(--accent-cyan))`,
                    transitionDelay: `${i * 80 + 200}ms`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
