import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { CATEGORIES } from '../../data/transactions';

const EMPTY = {
  merchant: '', amount: '', category: 'Food', type: 'expense',
  date: new Date().toISOString().slice(0, 10), status: 'completed', note: '', icon: '💳',
};

const ICON_MAP = {
  Income: '💼', Food: '🍔', Entertainment: '🎬', Utilities: '⚡',
  Transport: '🚗', Shopping: '🛍️', Healthcare: '💊', Housing: '🏠', Investment: '📈',
};

export default function TransactionModal({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) setForm(initial ? { ...initial, amount: Math.abs(initial.amount) } : EMPTY);
    setErrors({});
  }, [open, initial]);

  const set = (k, v) => {
    setForm(f => {
      const next = { ...f, [k]: v };
      if (k === 'category') next.icon = ICON_MAP[v] || '💳';
      if (k === 'category' && v === 'Income') next.type = 'income';
      if (k === 'category' && v !== 'Income' && f.type === 'income') next.type = 'expense';
      return next;
    });
  };

  const validate = () => {
    const e = {};
    if (!form.merchant.trim()) e.merchant = 'Required';
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) e.amount = 'Enter a valid amount';
    if (!form.date) e.date = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const signed = form.type === 'expense' ? -Math.abs(Number(form.amount)) : Math.abs(Number(form.amount));
    onSave({ ...form, amount: signed, id: initial?.id || Date.now() });
    onClose();
  };

  if (!open) return null;

  const labelStyle = { color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'monospace', display: 'block', marginBottom: '6px' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 backdrop-blur-sm" style={{ background: 'var(--modal-overlay)' }} />
      <div
        className="relative glass-card-elevated w-full max-w-md rounded-2xl animate-fade-up"
        style={{ border: '1px solid var(--card-elevated-border)', boxShadow: '0 24px 64px rgba(0,0,0,0.3)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
          <h2 className="font-display text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
            {initial ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
            style={{ background: 'var(--surface-1)', color: 'var(--text-secondary)' }}>
            <X size={14} />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-5 space-y-4">
          {/* Type toggle */}
          <div className="flex gap-2 p-1 rounded-xl" style={{ background: 'var(--bg-elevated)' }}>
            {['expense', 'income'].map(t => (
              <button
                key={t}
                onClick={() => set('type', t)}
                className="flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-all"
                style={{
                  background: form.type === t
                    ? t === 'income'
                      ? 'color-mix(in srgb, var(--accent-green) 18%, transparent)'
                      : 'color-mix(in srgb, var(--accent-red) 18%, transparent)'
                    : 'transparent',
                  color: form.type === t
                    ? t === 'income' ? 'var(--accent-green)' : 'var(--accent-red)'
                    : 'var(--text-muted)',
                }}
              >
                {t === 'income' ? '↓ Income' : '↑ Expense'}
              </button>
            ))}
          </div>

          {/* Merchant */}
          <div>
            <label style={labelStyle}>Merchant / Source</label>
            <input
              className={`input-field ${errors.merchant ? 'border-accent-red/50' : ''}`}
              placeholder="e.g. Netflix, Salary..."
              value={form.merchant}
              onChange={e => set('merchant', e.target.value)}
            />
            {errors.merchant && <p className="text-[11px] font-mono mt-1" style={{ color: 'var(--accent-red)' }}>{errors.merchant}</p>}
          </div>

          {/* Amount + Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label style={labelStyle}>Amount (USD)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--text-muted)' }}>$</span>
                <input
                  type="number" min="0"
                  className={`input-field pl-7 ${errors.amount ? 'border-accent-red/50' : ''}`}
                  placeholder="0.00"
                  value={form.amount}
                  onChange={e => set('amount', e.target.value)}
                />
              </div>
              {errors.amount && <p className="text-[11px] font-mono mt-1" style={{ color: 'var(--accent-red)' }}>{errors.amount}</p>}
            </div>
            <div>
              <label style={labelStyle}>Date</label>
              <input
                type="date"
                className={`input-field ${errors.date ? 'border-accent-red/50' : ''}`}
                value={form.date}
                onChange={e => set('date', e.target.value)}
              />
            </div>
          </div>

          {/* Category + Status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label style={labelStyle}>Category</label>
              <select className="select-enhanced w-full py-2.5 text-sm" value={form.category} onChange={e => set('category', e.target.value)}>
                {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Status</label>
              <select className="select-enhanced w-full py-2.5 text-sm" value={form.status} onChange={e => set('status', e.target.value)}>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          {/* Note */}
          <div>
            <label style={labelStyle}>
              Note <span style={{ color: 'var(--text-muted)', opacity: 0.5 }}>(optional)</span>
            </label>
            <input
              className="input-field"
              placeholder="Add a note..."
              value={form.note}
              onChange={e => set('note', e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <button onClick={onClose} className="btn-ghost flex-1">Cancel</button>
          <button onClick={handleSave} className="btn-primary flex-1 flex items-center justify-center gap-2">
            <Check size={14} />
            {initial ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>
      </div>
    </div>
  );
}
