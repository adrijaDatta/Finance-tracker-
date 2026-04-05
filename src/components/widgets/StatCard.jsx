import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency, calcChange } from '../../utils/formatters';
import { useCountUp } from '../../hooks/useCountUp';

export default function StatCard({ title, current, previous, icon, color = 'cyan', delay = 0, prefix = '$', invert = false }) {
  const animatedValue = useCountUp(Math.abs(current ?? 0), 1400, delay);
  const change = parseFloat(calcChange(current ?? 0, previous ?? 1));
  const isPositive = invert ? change < 0 : change > 0;

  // Use CSS variables for color theming
  const colorVarMap = {
    cyan:   { var: '--accent-cyan',   bgOpacity: '18', borderOpacity: '30' },
    green:  { var: '--accent-green',  bgOpacity: '14', borderOpacity: '28' },
    amber:  { var: '--accent-amber',  bgOpacity: '14', borderOpacity: '28' },
    red:    { var: '--accent-red',    bgOpacity: '12', borderOpacity: '25' },
    purple: { var: '--accent-purple', bgOpacity: '14', borderOpacity: '28' },
  };
  const c = colorVarMap[color] || colorVarMap.cyan;

  if (current == null) {
    return (
      <div className="glass-card p-5 flex flex-col gap-4 animate-pulse">
        <div className="h-3 rounded w-24" style={{ background: 'var(--surface-2)' }} />
        <div className="h-8 rounded w-32" style={{ background: 'var(--surface-2)' }} />
        <div className="h-3 rounded w-20" style={{ background: 'var(--surface-1)' }} />
      </div>
    );
  }

  return (
    <div
      className="glass-card p-5 flex flex-col gap-4 hover:border-glow transition-all duration-300 group animate-fade-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{title}</p>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-transform group-hover:scale-110 duration-300"
          style={{
            background: `color-mix(in srgb, var(${c.var}) ${c.bgOpacity}%, transparent)`,
            border: `1px solid color-mix(in srgb, var(${c.var}) ${c.borderOpacity}%, transparent)`,
          }}
        >
          {icon}
        </div>
      </div>

      <div>
        <div className="font-display text-3xl font-bold tracking-tight" style={{ color: `var(${c.var})` }}>
          {prefix}{animatedValue.toLocaleString()}
        </div>
        <p className="text-xs mt-1 font-mono" style={{ color: 'var(--text-muted)' }}>
          vs {formatCurrency(previous)} last month
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className={isPositive ? 'stat-badge-up' : 'stat-badge-down'}>
          {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {Math.abs(change)}%
        </span>
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>vs last month</span>
      </div>

      <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--progress-track)' }}>
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: `${Math.min(Math.abs(current / ((previous || 1) * 1.5)) * 100, 100)}%`,
            background: `var(${c.var})`,
            transitionDelay: `${delay + 400}ms`,
          }}
        />
      </div>
    </div>
  );
}
