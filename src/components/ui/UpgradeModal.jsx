import React, { useState, useEffect } from 'react';
import { Check, X, Zap, ArrowRight, Star, Crown } from 'lucide-react';
import { useAuth, PLANS } from '../../context/AuthContext';

export default function UpgradeModal({ onClose }) {
  const { setPlan, plan: currentPlan } = useAuth();
  const [selected, setSelected] = useState('pro');
  const [billing, setBilling] = useState('monthly');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Prevent body scroll while modal open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const annualDiscount = 0.2;

  const getPrice = (plan) => {
    if (plan.price === 0) return '$0';
    const price = billing === 'annual' ? plan.price * (1 - annualDiscount) : plan.price;
    return `$${price.toFixed(0)}`;
  };

  const getBilling = (plan) => {
    if (plan.price === 0) return 'forever free';
    return billing === 'annual' ? 'per month, billed annually' : 'per month';
  };

  const handleConfirm = async () => {
    if (selected === currentPlan) { onClose(); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setPlan(selected);
    setLoading(false);
    setSuccess(true);
    setTimeout(() => { onClose(); }, 1600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'var(--modal-overlay)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl animate-fade-up"
        style={{
          background: 'var(--card-elevated-bg)',
          border: '1px solid var(--card-elevated-border)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 rounded-t-2xl"
          style={{ background: 'var(--card-elevated-bg)', borderBottom: '1px solid var(--border-subtle)' }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-green flex items-center justify-center">
              <Crown size={15} style={{ color: 'var(--text-on-accent)' }} />
            </div>
            <div>
              <h2 className="font-display font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                Upgrade Plan
              </h2>
              <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                Currently on <span style={{ color: 'var(--accent-cyan)' }}>{PLANS[currentPlan]?.label}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
            style={{ background: 'var(--surface-1)', color: 'var(--text-secondary)' }}
          >
            <X size={15} />
          </button>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Success state */}
          {success ? (
            <div className="flex flex-col items-center justify-center py-10 gap-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: 'color-mix(in srgb, var(--accent-green) 15%, transparent)' }}>
                <Check size={28} style={{ color: 'var(--accent-green)' }} />
              </div>
              <div className="text-center">
                <p className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                  {selected === 'pro' ? '🎉 Welcome to Pro!' : 'Plan updated'}
                </p>
                <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                  {selected === 'pro'
                    ? 'All Pro features are now unlocked.'
                    : 'You\'ve switched to the Free plan.'}
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Billing toggle */}
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)' }}>
                  {['monthly', 'annual'].map(b => (
                    <button key={b} onClick={() => setBilling(b)}
                      className="relative px-5 py-2 rounded-lg text-sm font-medium transition-all"
                      style={{
                        background: billing === b ? 'var(--accent-cyan)' : 'transparent',
                        color: billing === b ? 'var(--text-on-accent)' : 'var(--text-secondary)',
                        fontWeight: billing === b ? 700 : 400,
                      }}>
                      {b.charAt(0).toUpperCase() + b.slice(1)}
                      {b === 'annual' && (
                        <span className="absolute -top-2.5 -right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                          style={{ background: 'var(--accent-green)', color: 'var(--text-on-accent)' }}>
                          -20%
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Plans grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.values(PLANS).map(plan => {
                  const isSelected = selected === plan.id;
                  const isPro = plan.id === 'pro';
                  const isCurrent = plan.id === currentPlan;

                  return (
                    <button
                      key={plan.id}
                      onClick={() => setSelected(plan.id)}
                      className="text-left rounded-2xl p-5 transition-all duration-200 relative"
                      style={{
                        background: isSelected
                          ? isPro
                            ? 'color-mix(in srgb, var(--accent-cyan) 8%, var(--card-elevated-bg))'
                            : 'color-mix(in srgb, var(--text-muted) 6%, var(--card-elevated-bg))'
                          : 'var(--surface-1)',
                        border: `2px solid ${isSelected
                          ? isPro ? 'var(--accent-cyan)' : 'color-mix(in srgb, var(--text-muted) 40%, transparent)'
                          : 'var(--border-subtle)'}`,
                        transform: isSelected ? 'scale(1.01)' : 'scale(1)',
                        boxShadow: isSelected && isPro ? '0 0 24px color-mix(in srgb, var(--accent-cyan) 15%, transparent)' : 'none',
                      }}
                    >
                      {/* Current badge */}
                      {isCurrent && (
                        <span className="absolute top-3 right-3 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full"
                          style={{ background: 'var(--surface-2)', color: 'var(--text-muted)' }}>
                          CURRENT
                        </span>
                      )}

                      {isPro && (
                        <div className="flex items-center gap-1.5 mb-3">
                          <Star size={11} style={{ color: 'var(--accent-cyan)', fill: 'var(--accent-cyan)' }} />
                          <span className="text-[10px] font-mono font-bold uppercase tracking-widest" style={{ color: 'var(--accent-cyan)' }}>
                            Most Popular
                          </span>
                        </div>
                      )}

                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                            {plan.label}
                          </h3>
                          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{getBilling(plan)}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-display font-bold"
                            style={{ color: isPro ? 'var(--accent-cyan)' : 'var(--text-primary)' }}>
                            {getPrice(plan)}
                          </span>
                          {plan.price > 0 && <span className="text-xs" style={{ color: 'var(--text-muted)' }}>/mo</span>}
                        </div>
                      </div>

                      <ul className="space-y-2 mb-4">
                        {plan.features.map(f => (
                          <li key={f} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                            <Check size={13} className="flex-shrink-0 mt-0.5" style={{ color: isPro ? 'var(--accent-cyan)' : 'var(--text-muted)' }} />
                            {f}
                          </li>
                        ))}
                        {plan.limitations.map(f => (
                          <li key={f} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
                            <X size={13} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--text-muted)' }} />
                            {f}
                          </li>
                        ))}
                      </ul>

                      <div className="w-full py-2 rounded-xl text-center text-sm font-medium transition-all"
                        style={{
                          background: isSelected
                            ? isPro ? 'var(--accent-cyan)' : 'var(--surface-2)'
                            : 'var(--surface-1)',
                          color: isSelected
                            ? isPro ? 'var(--text-on-accent)' : 'var(--text-primary)'
                            : 'var(--text-muted)',
                        }}>
                        {isSelected ? '✓ Selected' : 'Select'}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* CTA */}
              <div className="flex gap-3">
                <button onClick={onClose} className="btn-ghost flex-1">Cancel</button>
                <button
                  onClick={handleConfirm}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium text-sm transition-all"
                  style={{
                    background: selected === 'pro'
                      ? 'linear-gradient(135deg, var(--accent-cyan), #00A8CC)'
                      : 'var(--surface-2)',
                    color: selected === 'pro' ? 'var(--text-on-accent)' : 'var(--text-primary)',
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? 'not-allowed' : 'pointer',
                  }}
                >
                  {loading ? (
                    <span className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin"
                      style={{ borderColor: 'var(--text-on-accent)', borderTopColor: 'transparent' }} />
                  ) : (
                    <>
                      {selected === currentPlan ? 'Keep current plan' :
                        selected === 'pro' ? 'Upgrade to Pro' : 'Switch to Free'}
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
