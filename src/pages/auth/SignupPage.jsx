import React, { useState } from 'react';
import { Eye, EyeOff, Zap, ArrowRight, AlertCircle, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const strength = (pw) => {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
};

const StrengthBar = ({ pw }) => {
  const s = strength(pw);
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['', 'bg-red-500', 'bg-accent-amber', 'bg-accent-cyan', 'bg-accent-green'];
  if (!pw) return null;
  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= s ? colors[s] : 'bg-white/10'}`} />
        ))}
      </div>
      <p className={`text-[10px] font-mono ${s >= 3 ? 'text-accent-green' : s === 2 ? 'text-accent-amber' : 'text-red-400'}`}>
        {labels[s]} password
      </p>
    </div>
  );
};

export default function SignupPage() {
  const { signup, setScreen } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim()) { setError('Please enter your full name.'); return; }
    if (!form.email.includes('@')) { setError('Enter a valid email address.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (!agreed) { setError('Please accept the terms to continue.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    // Go to plan selection first
    setScreen('plans');
    setLoading(false);
  };

  return (
    <div className="auth-bg min-h-screen flex items-center justify-center px-4 py-8">
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] opacity-20"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(120,80,255,0.4) 0%, transparent 70%)' }} />

      <div className="auth-card w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-green flex items-center justify-center">
            <Zap size={20} className="text-bg-primary" />
          </div>
          <span className="font-display font-bold text-xl " style={{ color: "var(--text-primary)" }}>Moneta</span>
        </div>

        <h2 className="text-2xl font-display font-bold text-white mb-1">Create your account</h2>
        <p className="text-sm text-slate-400 mb-7">Free forever — upgrade anytime</p>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-1.5 block">Full Name</label>
            <input type="text" name="name" value={form.name} onChange={handle}
              placeholder="Alex Kim" className="auth-input w-full" autoComplete="name" />
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-1.5 block">Email</label>
            <input type="email" name="email" value={form.email} onChange={handle}
              placeholder="alex@moneta.io" className="auth-input w-full" autoComplete="email" />
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-1.5 block">Password</label>
            <div className="relative">
              <input type={showPw ? 'text' : 'password'} name="password" value={form.password} onChange={handle}
                placeholder="Min 6 characters" className="auth-input w-full pr-10" autoComplete="new-password" />
              <button type="button" onClick={() => setShowPw(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            <StrengthBar pw={form.password} />
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-1.5 block">Confirm Password</label>
            <div className="relative">
              <input type={showPw ? 'text' : 'password'} name="confirm" value={form.confirm} onChange={handle}
                placeholder="Repeat password" className="auth-input w-full pr-10" autoComplete="new-password" />
              {form.confirm && form.confirm === form.password && (
                <Check size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-accent-green" />
              )}
            </div>
          </div>

          {/* Terms */}
          <label className="flex items-start gap-2.5 cursor-pointer group">
            <div onClick={() => setAgreed(v => !v)}
              className={`w-4 h-4 mt-0.5 rounded flex-shrink-0 border flex items-center justify-center transition-all ${agreed ? 'bg-accent-cyan border-accent-cyan' : 'border-border-subtle bg-bg-elevated'}`}>
              {agreed && <Check size={10} className="text-bg-primary" strokeWidth={3} />}
            </div>
            <span className="text-xs text-slate-400 leading-relaxed">
              I agree to the <span className="text-accent-cyan">Terms of Service</span> and <span className="text-accent-cyan">Privacy Policy</span>
            </span>
          </label>

          {error && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <AlertCircle size={14} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <button type="submit" disabled={loading}
            className="auth-btn-primary w-full flex items-center justify-center gap-2">
            {loading ? (
              <span className="w-4 h-4 rounded-full border-2 border-bg-primary border-t-transparent animate-spin" />
            ) : (
              <>Create Account <ArrowRight size={15} /></>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm " style={{ color: "var(--text-muted)" }}>
            Already have an account?{' '}
            <button onClick={() => setScreen('login')} className="text-accent-cyan hover:underline font-medium">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
