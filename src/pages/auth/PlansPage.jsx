import React, { useState } from 'react';
import { Check, X, Zap, ArrowRight, Star } from 'lucide-react';
import { useAuth, PLANS } from '../../context/AuthContext';

export default function PlansPage() {
  const { signup, setScreen, setPlan } = useAuth();
  const [selected, setSelected] = useState('pro');
  const [billing, setBilling] = useState('monthly'); // 'monthly' | 'annual'
  const [loading, setLoading] = useState(false);

  const annualDiscount = 0.2; // 20% off

  const getPrice = (plan) => {
    if (plan.price === 0) return '$0';
    const price = billing === 'annual' ? plan.price * (1 - annualDiscount) : plan.price;
    return `$${price.toFixed(0)}`;
  };

  const getBilling = (plan) => {
    if (plan.price === 0) return 'forever free';
    return billing === 'annual' ? 'per month, billed annually' : 'per month';
  };

  const handleContinue = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setPlan(selected);
    signup('Alex Kim', 'alex@moneta.io', '••••••', selected);
    setLoading(false);
  };

  return (
    <div className="auth-bg min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] opacity-15"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(0,212,255,0.5) 0%, transparent 70%)' }} />

      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-green flex items-center justify-center">
          <Zap size={20} className="text-bg-primary" />
        </div>
        <span className="font-display font-bold text-xl " style={{ color: "var(--text-primary)" }}>Moneta</span>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-white mb-2">Choose your plan</h2>
        <p className="" style={{ color: "var(--text-secondary)" }}>Start free, upgrade when you're ready</p>
      </div>

      {/* Billing toggle */}
      <div className="flex items-center gap-3 mb-8 p-1 rounded-xl bg-bg-elevated border border-border-subtle">
        {['monthly', 'annual'].map(b => (
          <button key={b} onClick={() => setBilling(b)}
            className={`relative px-5 py-2 rounded-lg text-sm font-medium transition-all ${billing === b ? 'bg-accent-cyan text-bg-primary font-bold' : 'text-slate-400 hover:text-white'}`}>
            {b.charAt(0).toUpperCase() + b.slice(1)}
            {b === 'annual' && (
              <span className="absolute -top-2.5 -right-2 text-[9px] font-bold bg-accent-green text-bg-primary px-1.5 py-0.5 rounded-full">-20%</span>
            )}
          </button>
        ))}
      </div>

      {/* Plans grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
        {Object.values(PLANS).map(plan => {
          const isSelected = selected === plan.id;
          const isPro = plan.id === 'pro';
          return (
            <button key={plan.id} onClick={() => setSelected(plan.id)}
              className={`plans-card text-left transition-all duration-200 ${isSelected ? 'plans-card-selected' : ''}`}
              style={isSelected ? { borderColor: isPro ? 'rgba(0,212,255,0.5)' : 'rgba(148,163,184,0.4)', background: isPro ? 'rgba(0,212,255,0.06)' : 'rgba(148,163,184,0.05)' } : {}}>

              {isPro && (
                <div className="flex items-center gap-1.5 mb-4">
                  <Star size={12} className="text-accent-cyan fill-accent-cyan" />
                  <span className="text-[10px] font-mono font-bold text-accent-cyan uppercase tracking-widest">Most Popular</span>
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-display font-bold text-white text-lg">{plan.label}</h3>
                  <p className="text-slate-500 text-xs mt-0.5">{getBilling(plan)}</p>
                </div>
                <div className="text-right">
                  <span className={`text-2xl font-display font-bold ${isPro ? 'text-accent-cyan' : 'text-white'}`}>
                    {getPrice(plan)}
                  </span>
                  {plan.price > 0 && <span className="text-slate-500 text-xs">/mo</span>}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-4">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm " style={{ color: "var(--text-secondary)" }}>
                    <Check size={14} className={`flex-shrink-0 mt-0.5 ${isPro ? 'text-accent-cyan' : 'text-slate-400'}`} />
                    {f}
                  </li>
                ))}
                {plan.limitations.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                    <X size={14} className="flex-shrink-0 mt-0.5 text-slate-700" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Selection indicator */}
              <div className={`w-full py-2 rounded-xl text-center text-sm font-medium transition-all ${isSelected ? (isPro ? 'bg-accent-cyan text-bg-primary' : 'bg-white/10 text-white') : 'bg-white/5 text-slate-500'}`}>
                {isSelected ? '✓ Selected' : 'Select'}
              </div>
            </button>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-6 flex flex-col items-center gap-3 w-full max-w-2xl">
        <button onClick={handleContinue} disabled={loading}
          className="auth-btn-primary w-full flex items-center justify-center gap-2 max-w-xs">
          {loading ? (
            <span className="w-4 h-4 rounded-full border-2 border-bg-primary border-t-transparent animate-spin" />
          ) : (
            <>
              {selected === 'free' ? 'Start for Free' : 'Start Pro Trial'}
              <ArrowRight size={15} />
            </>
          )}
        </button>
        <button onClick={() => setScreen('login')} className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
          Already have an account? Sign in
        </button>
      </div>
    </div>
  );
}
