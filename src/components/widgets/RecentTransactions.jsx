import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, Clock, ChevronRight } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/formatters';

export default function RecentTransactions({ data }) {
  const [filter, setFilter] = useState('all');

  if (!data || data.length === 0) {
    return (
      <div className="glass-card p-6 flex flex-col items-center justify-center min-h-[200px] gap-3">
        <span className="text-3xl opacity-30">📋</span>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No transactions found</p>
      </div>
    );
  }

  const filtered = data.filter(t => {
    if (filter === 'income')  return t.amount > 0;
    if (filter === 'expense') return t.amount < 0;
    return true;
  });

  return (
    <div className="glass-card p-6 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-base font-semibold" style={{ color: 'var(--text-primary)' }}>Recent Transactions</h2>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{data.length} transactions this month</p>
        </div>
        <button className="flex items-center gap-1 text-xs font-mono transition-colors" style={{ color: 'var(--accent-cyan)' }}>
          View All <ChevronRight size={12} />
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 rounded-lg p-1 w-fit" style={{ background: 'var(--bg-elevated)' }}>
        {['all', 'income', 'expense'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-3 py-1 rounded-md text-xs font-mono capitalize transition-all"
            style={{
              background: filter === f ? 'var(--card-bg)' : 'transparent',
              color: filter === f ? 'var(--text-primary)' : 'var(--text-muted)',
              boxShadow: filter === f ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Transaction list */}
      <div className="space-y-1">
        {filtered.length === 0 ? (
          <p className="text-center py-6 text-sm" style={{ color: 'var(--text-muted)' }}>No {filter} transactions</p>
        ) : filtered.map((tx, i) => {
          const isIncome = tx.amount > 0;
          return (
            <div
              key={tx.id}
              className="flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer animate-fade-up transition-all duration-150 group"
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--hover-bg)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                style={{
                  background: isIncome
                    ? 'color-mix(in srgb, var(--accent-green) 12%, transparent)'
                    : 'var(--surface-1)',
                  border: `1px solid ${isIncome ? 'color-mix(in srgb, var(--accent-green) 22%, transparent)' : 'var(--border-subtle)'}`,
                }}>
                {tx.icon}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate transition-colors" style={{ color: 'var(--text-primary)' }}>
                  {tx.merchant}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>{tx.category}</span>
                  <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>•</span>
                  <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>{formatDate(tx.date)}</span>
                  {tx.status === 'pending' && (
                    <span className="flex items-center gap-0.5 text-[10px] font-mono" style={{ color: 'var(--accent-amber)' }}>
                      <Clock size={8} /> pending
                    </span>
                  )}
                </div>
              </div>

              {/* Amount */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-sm font-mono font-semibold"
                  style={{ color: isIncome ? 'var(--accent-green)' : 'var(--text-primary)' }}>
                  {isIncome ? '+' : ''}{formatCurrency(tx.amount)}
                </span>
                <div className="w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: isIncome ? 'color-mix(in srgb, var(--accent-green) 20%, transparent)' : 'var(--surface-2)' }}>
                  {isIncome
                    ? <ArrowDownLeft size={10} style={{ color: 'var(--accent-green)' }} />
                    : <ArrowUpRight size={10} style={{ color: 'var(--text-secondary)' }} />
                  }
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
