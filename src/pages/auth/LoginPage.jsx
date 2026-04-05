import React, { useState } from 'react';
import { Eye, EyeOff, Zap, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const { login, setScreen } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return; }
    if (!form.email.includes('@')) { setError('Enter a valid email address.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    login(form.email, form.password);
    setLoading(false);
  };

  return (
    <div className="auth-bg min-h-screen flex items-center justify-center px-4 py-8">
      {/* Glow blob */}
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] opacity-20"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,212,255,0.4) 0%, transparent 70%)' }} />

      <div className="auth-card w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-green flex items-center justify-center">
            <Zap size={20} className="text-bg-primary" />
          </div>
          <div>
            <span className="font-display font-bold text-xl " style={{ color: "var(--text-primary)" }}>Moneta</span>
            <span className="ml-2 text-[10px] font-mono bg-accent-cyan/10 text-accent-cyan px-2 py-0.5 rounded-full">FINANCE</span>
          </div>
        </div>

        <h2 className="text-2xl font-display font-bold text-white mb-1">Welcome back</h2>
        <p className="text-sm text-slate-400 mb-7">Sign in to your dashboard</p>

        <form onSubmit={submit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-1.5 block">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handle}
              placeholder="alex@moneta.io"
              className="auth-input w-full"
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-1.5 block">Password</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handle}
                placeholder="••••••••"
                className="auth-input w-full pr-10"
                autoComplete="current-password"
              />
              <button type="button" onClick={() => setShowPw(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <AlertCircle size={14} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <button type="submit" disabled={loading}
            className="auth-btn-primary w-full flex items-center justify-center gap-2 mt-2">
            {loading ? (
              <span className="w-4 h-4 rounded-full border-2 border-bg-primary border-t-transparent animate-spin" />
            ) : (
              <>Sign In <ArrowRight size={15} /></>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm " style={{ color: "var(--text-muted)" }}>
            Don't have an account?{' '}
            <button onClick={() => setScreen('signup')}
              className="text-accent-cyan hover:underline font-medium transition-colors">
              Create one free
            </button>
          </p>
        </div>

        {/* Demo hint */}
        <div className="mt-4 px-3 py-2.5 rounded-xl bg-accent-cyan/5 border border-accent-cyan/10 text-center">
          <p className="text-xs " style={{ color: "var(--text-muted)" }}>Demo: enter any email & password (6+ chars)</p>
        </div>
      </div>
    </div>
  );
}
