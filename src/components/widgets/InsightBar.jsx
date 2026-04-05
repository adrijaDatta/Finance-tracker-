import React from 'react';
import { Lightbulb, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

const insights = [
  { type: 'tip',     icon: Lightbulb,    colorVar: '--accent-amber',  msg: 'You spent 21% more on Shopping vs last month. Consider reviewing discretionary expenses.' },
  { type: 'warning', icon: AlertTriangle, colorVar: '--accent-red',    msg: 'Shopping budget exceeded by $200. 105% of monthly limit used.' },
  { type: 'good',    icon: CheckCircle,   colorVar: '--accent-green',  msg: 'MacBook Pro goal fully achieved! 🎉 Great savings discipline this quarter.' },
  { type: 'growth',  icon: TrendingUp,    colorVar: '--accent-cyan',   msg: 'Net worth grew 13% this year. On track to hit $80K projection by June.' },
];

export default function InsightBar() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
      {insights.map((insight, i) => {
        const Icon = insight.icon;
        return (
          <div
            key={i}
            className="flex items-start gap-3 p-3 rounded-xl animate-fade-up transition-all"
            style={{
              animationDelay: `${i * 80}ms`,
              animationFillMode: 'both',
              background: `color-mix(in srgb, var(${insight.colorVar}) 10%, transparent)`,
              border: `1px solid color-mix(in srgb, var(${insight.colorVar}) 20%, transparent)`,
            }}
          >
            <Icon size={14} className="mt-0.5 flex-shrink-0" style={{ color: `var(${insight.colorVar})` }} />
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{insight.msg}</p>
          </div>
        );
      })}
    </div>
  );
}
