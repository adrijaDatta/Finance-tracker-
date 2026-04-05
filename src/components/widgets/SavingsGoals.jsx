import React from 'react';
import { CheckCircle2, Target } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export default function SavingsGoals({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="glass-card p-6 flex flex-col items-center justify-center min-h-[200px] gap-3">
        <span className="text-3xl opacity-30">🎯</span>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No savings goals yet</p>
      </div>
    );
  }

  const achieved = data.filter(g => g.current >= g.target).length;

  return (
    <div className="glass-card p-6 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-base font-semibold" style={{ color: 'var(--text-primary)' }}>Savings Goals</h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{achieved} of {data.length} achieved</p>
        </div>
        <Target size={16} style={{ color: 'var(--accent-purple)' }} />
      </div>

      <div className="space-y-4">
        {data.map((goal, i) => {
          const pct = Math.min((goal.current / goal.target) * 100, 100);
          const isAchieved = goal.current >= goal.target;
          return (
            <div
              key={goal.id}
              className="space-y-2 animate-fade-up"
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-base">{goal.icon}</span>
                  <span className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{goal.name}</span>
                  {isAchieved && <CheckCircle2 size={13} style={{ color: 'var(--accent-green)', flexShrink: 0 }} />}
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-mono font-medium" style={{ color: goal.color }}>
                    {formatCurrency(goal.current, true)}
                  </p>
                  <p className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>/ {formatCurrency(goal.target, true)}</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--progress-track)' }}>
                <div
                  className="h-full rounded-full transition-all duration-1000 relative"
                  style={{
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, ${goal.color}88, ${goal.color})`,
                    transitionDelay: `${i * 100 + 200}ms`,
                  }}
                >
                  {!isAchieved && <div className="absolute inset-0 shimmer-bg rounded-full" />}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>{pct.toFixed(0)}% complete</span>
                <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>{goal.deadline}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
