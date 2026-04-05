import React, { useState } from 'react';
import {
  Bell, Shield, Eye, CreditCard, Globe, Moon, Palette,
  Smartphone, Mail, Lock, Key, ChevronRight, Check, AlertTriangle,
  Download, Trash2, RefreshCw, Sun,
} from 'lucide-react';
import { useTheme, THEMES } from '../context/ThemeContext';

const Toggle = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative w-11 h-6 rounded-full transition-all duration-200 flex-shrink-0 ${checked ? 'bg-accent-cyan' : 'bg-white/10'}`}
  >
    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${checked ? 'left-6' : 'left-1'}`} />
  </button>
);

const SettingRow = ({ icon: Icon, label, desc, children, danger }) => (
  <div className={`flex items-center justify-between py-4 border-b border-border-subtle last:border-0 ${danger ? 'group' : ''}`}>
    <div className="flex items-start gap-3">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${danger ? 'bg-accent-red/10 border border-accent-red/20' : 'bg-white/5 border border-border-subtle'}`}>
        <Icon size={14} className={danger ? 'text-accent-red' : 'text-slate-400'} />
      </div>
      <div>
        <p className={`text-sm font-medium ${danger ? 'text-accent-red' : 'text-white'}`}>{label}</p>
        {desc && <p className="text-xs text-slate-500 mt-0.5">{desc}</p>}
      </div>
    </div>
    <div className="ml-4 flex-shrink-0">{children}</div>
  </div>
);

export default function Settings() {
  const [notifs, setNotifs] = useState({
    transactions: true, goals: true, security: true, marketing: false, weekly: true, monthly: true,
  });
  const [privacy, setPrivacy] = useState({
    analytics: true, biometric: false, twoFactor: true, hideBalance: false,
  });
  const { themeId, setThemeId } = useTheme();
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('English');
  const [activeTab, setActiveTab] = useState('notifications');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'privacy', label: 'Privacy', icon: Eye },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'account', label: 'Account', icon: CreditCard },
  ];

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-white">Settings</h2>
          <p className="text-sm text-slate-500 mt-0.5 font-mono">Manage your preferences and account</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
            saved
              ? 'bg-accent-green/20 border border-accent-green/30 text-accent-green'
              : 'bg-accent-cyan text-bg-primary hover:opacity-90'
          }`}
        >
          {saved ? <Check size={14} /> : <RefreshCw size={14} />}
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="glass-card p-2 space-y-1">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                  activeTab === id
                    ? 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className="glass-card p-6">
              <h3 className="font-display text-base font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Notification Preferences</h3>
              <p className="text-xs font-mono mb-6" style={{ color: "var(--text-muted)" }}>Choose when and how you get notified</p>

              <div className="mb-6">
                <p className="text-xs font-mono text-slate-600 uppercase tracking-widest mb-3">Transaction Alerts</p>
                <SettingRow icon={CreditCard} label="Transaction Notifications" desc="Get notified for every transaction">
                  <Toggle checked={notifs.transactions} onChange={v => setNotifs(n => ({ ...n, transactions: v }))} />
                </SettingRow>
                <SettingRow icon={AlertTriangle} label="Budget Alerts" desc="When spending exceeds category budget">
                  <Toggle checked={notifs.goals} onChange={v => setNotifs(n => ({ ...n, goals: v }))} />
                </SettingRow>
                <SettingRow icon={Shield} label="Security Alerts" desc="Suspicious activity and login attempts">
                  <Toggle checked={notifs.security} onChange={v => setNotifs(n => ({ ...n, security: v }))} />
                </SettingRow>
              </div>

              <div className="mb-6">
                <p className="text-xs font-mono text-slate-600 uppercase tracking-widest mb-3">Reports & Summaries</p>
                <SettingRow icon={Bell} label="Weekly Summary" desc="Every Sunday morning">
                  <Toggle checked={notifs.weekly} onChange={v => setNotifs(n => ({ ...n, weekly: v }))} />
                </SettingRow>
                <SettingRow icon={Mail} label="Monthly Report" desc="Detailed report on the 1st of each month">
                  <Toggle checked={notifs.monthly} onChange={v => setNotifs(n => ({ ...n, monthly: v }))} />
                </SettingRow>
              </div>

              <div>
                <p className="text-xs font-mono text-slate-600 uppercase tracking-widest mb-3">Channels</p>
                <SettingRow icon={Smartphone} label="Push Notifications" desc="Mobile and desktop alerts">
                  <Toggle checked={true} onChange={() => {}} />
                </SettingRow>
                <SettingRow icon={Mail} label="Email Notifications" desc="alex@moneta.io">
                  <Toggle checked={notifs.marketing} onChange={v => setNotifs(n => ({ ...n, marketing: v }))} />
                </SettingRow>
              </div>
            </div>
          )}

          {/* Security */}
          {activeTab === 'security' && (
            <div className="glass-card p-6">
              <h3 className="font-display text-base font-semibold text-white mb-1">Security Settings</h3>
              <p className="text-xs text-slate-500 font-mono mb-6">Protect your account and data</p>

              <SettingRow icon={Key} label="Two-Factor Authentication" desc="Add an extra layer of security via SMS or authenticator app">
                <Toggle checked={privacy.twoFactor} onChange={v => setPrivacy(p => ({ ...p, twoFactor: v }))} />
              </SettingRow>
              <SettingRow icon={Smartphone} label="Biometric Login" desc="Use fingerprint or Face ID to sign in">
                <Toggle checked={privacy.biometric} onChange={v => setPrivacy(p => ({ ...p, biometric: v }))} />
              </SettingRow>
              <SettingRow icon={Lock} label="Change Password" desc="Last changed 90 days ago">
                <button className="flex items-center gap-1.5 text-xs text-accent-cyan font-mono hover:underline">
                  Update <ChevronRight size={12} />
                </button>
              </SettingRow>
              <SettingRow icon={Globe} label="Active Sessions" desc="2 devices currently logged in">
                <button className="flex items-center gap-1.5 text-xs text-accent-amber font-mono hover:underline">
                  Manage <ChevronRight size={12} />
                </button>
              </SettingRow>

              {/* Security Status */}
              <div className="mt-6 p-4 bg-accent-green/5 border border-accent-green/20 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Shield size={16} className="text-accent-green" />
                  <p className="text-sm font-medium text-accent-green">Security Score: Strong</p>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-4/5 rounded-full bg-accent-green" />
                </div>
                <p className="text-xs text-slate-500 mt-2">Enable biometric login to reach maximum security</p>
              </div>
            </div>
          )}

          {/* Privacy */}
          {activeTab === 'privacy' && (
            <div className="glass-card p-6">
              <h3 className="font-display text-base font-semibold text-white mb-1">Privacy Controls</h3>
              <p className="text-xs text-slate-500 font-mono mb-6">Control how your data is used</p>

              <SettingRow icon={Eye} label="Hide Balances by Default" desc="Balances are hidden until you choose to show them">
                <Toggle checked={privacy.hideBalance} onChange={v => setPrivacy(p => ({ ...p, hideBalance: v }))} />
              </SettingRow>
              <SettingRow icon={Globe} label="Analytics & Improvements" desc="Help improve the app with anonymous usage data">
                <Toggle checked={privacy.analytics} onChange={v => setPrivacy(p => ({ ...p, analytics: v }))} />
              </SettingRow>

              <div className="mt-6 pt-6 border-t border-border-subtle space-y-3">
                <p className="text-xs font-mono text-slate-600 uppercase tracking-widest mb-3">Data Management</p>
                <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-border-subtle text-sm text-slate-300 hover:border-accent-cyan/30 hover:text-white transition-all">
                  <div className="flex items-center gap-3">
                    <Download size={14} className="text-accent-cyan" />
                    Download My Data
                  </div>
                  <ChevronRight size={14} className="text-slate-600" />
                </button>
                <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-accent-red/20 bg-accent-red/5 text-sm text-accent-red hover:border-accent-red/40 transition-all">
                  <div className="flex items-center gap-3">
                    <Trash2 size={14} />
                    Delete All Data
                  </div>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Appearance */}
          {activeTab === 'appearance' && (
            <div className="glass-card p-6">
              <h3 className="font-display text-base font-semibold text-white mb-1">Appearance</h3>
              <p className="text-xs text-slate-500 font-mono mb-6">Customise how the app looks and feels</p>

              {/* ── Theme selector ── */}
              <div className="mb-8">
                <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>Theme</p>
                <div className="grid grid-cols-3 gap-3">
                  {Object.values(THEMES).map(t => {
                    const active = themeId === t.id;
                    const isLight = t.id === 'light';
                    return (
                      <button
                        key={t.id}
                        onClick={() => setThemeId(t.id)}
                        className={`p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                          active
                            ? 'border-accent-cyan scale-[1.02] shadow-glow-cyan'
                            : 'border-border-subtle hover:border-white/20'
                        }`}
                      >
                        {/* Mini preview */}
                        <div
                          className="w-full h-14 rounded-xl mb-3 overflow-hidden relative"
                          style={{ background: t['--bg-primary'] }}
                        >
                          {/* Sidebar strip */}
                          <div className="absolute left-0 top-0 bottom-0 w-6" style={{ background: t['--bg-secondary'] }} />
                          {/* Fake cards */}
                          <div className="absolute left-8 top-2 right-2 h-4 rounded-lg" style={{ background: t['--bg-card'], opacity: 0.8 }} />
                          <div className="absolute left-8 bottom-2 right-2 h-3 rounded-lg" style={{ background: t['--bg-elevated'], opacity: 0.6 }} />
                          {/* Accent dot */}
                          <div className="absolute left-2 top-2 w-2 h-2 rounded-full bg-accent-cyan" />
                          {/* Light icon */}
                          {isLight && <Sun size={10} className="absolute right-2 top-2 text-accent-amber" />}
                          {!isLight && <Moon size={10} className="absolute right-2 top-2 text-accent-purple opacity-60" />}
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{t.label}</p>
                          {active && <Check size={12} className="text-accent-cyan" />}
                        </div>
                        <p className="text-[10px] mt-0.5 font-mono" style={{ color: "var(--text-muted)" }}>
                          {t.id === 'light' ? 'Clean & bright' : t.id === 'midnight' ? 'Ultra dark' : 'Default dark'}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Current theme indicator */}
                <div className="mt-3 flex items-center gap-2 p-3 bg-accent-cyan/5 border border-accent-cyan/20 rounded-xl">
                  {themeId === 'light' ? <Sun size={14} className="text-accent-amber" /> : <Moon size={14} className="text-accent-purple" />}
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    Currently using <span className="font-medium" style={{ color: "var(--accent-cyan)" }}>{THEMES[themeId].label}</span> theme
                    {themeId === 'light' ? ' — light colours applied across all pages' : ' — dark mode active'}
                  </p>
                </div>
              </div>

              {/* ── Accent Color ── */}
              <div className="mb-8">
                <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Accent Color</p>
                <div className="flex gap-2 flex-wrap">
                  {[
                    { label: 'Cyan',   color: '#00D4FF', active: true  },
                    { label: 'Green',  color: '#00FF87', active: false },
                    { label: 'Purple', color: '#7B5EA7', active: false },
                    { label: 'Amber',  color: '#FFB800', active: false },
                    { label: 'Pink',   color: '#FF6B9D', active: false },
                  ].map(ac => (
                    <button key={ac.label}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs transition-all ${ac.active ? 'border-white/30 bg-white/10 text-white' : 'border-border-subtle text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                      <span className="w-3 h-3 rounded-full" style={{ background: ac.color }} />
                      {ac.label}
                      {ac.active && <Check size={10} className="text-accent-cyan" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Regional ── */}
              <div>
                <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Regional</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-2">Currency</label>
                    <select value={currency} onChange={e => setCurrency(e.target.value)}
                      className="select-enhanced w-full py-2.5 text-sm">
                      {['USD','EUR','GBP','JPY','CAD','AUD'].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-2">Language</label>
                    <select value={language} onChange={e => setLanguage(e.target.value)}
                      className="select-enhanced w-full py-2.5 text-sm">
                      {['English','Spanish','French','German','Japanese'].map(l => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Account */}
          {activeTab === 'account' && (
            <div className="space-y-4">
              <div className="glass-card p-6">
                <h3 className="font-display text-base font-semibold text-white mb-1">Account Plan</h3>
                <p className="text-xs text-slate-500 font-mono mb-5">Your current subscription</p>
                <div className="p-4 bg-accent-cyan/5 border border-accent-cyan/20 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-white font-display font-bold">Moneta PRO</p>
                      <span className="text-[10px] bg-accent-cyan/20 text-accent-cyan px-2 py-0.5 rounded-full font-mono">ACTIVE</span>
                    </div>
                    <p className="text-xs text-slate-500 font-mono">Billed monthly · Renews Jan 1, 2025</p>
                  </div>
                  <p className="font-display text-2xl font-bold text-accent-cyan">$12<span className="text-sm text-slate-500">/mo</span></p>
                </div>
                <button className="mt-3 w-full py-2.5 rounded-xl border border-border-subtle text-slate-400 text-sm hover:text-white hover:border-white/20 transition-all">
                  Manage Subscription
                </button>
              </div>

              <div className="glass-card p-6">
                <h3 className="font-display text-base font-semibold text-white mb-5">Linked Integrations</h3>
                {[
                  { name: 'Plaid', desc: 'Bank account sync', connected: true, icon: '🏦' },
                  { name: 'Google Drive', desc: 'Export reports', connected: true, icon: '📁' },
                  { name: 'Zapier', desc: 'Automation workflows', connected: false, icon: '⚡' },
                  { name: 'Stripe', desc: 'Payment processing', connected: false, icon: '💳' },
                ].map(int => (
                  <div key={int.name} className="flex items-center gap-3 py-3 border-b border-border-subtle last:border-0">
                    <span className="text-xl w-8 text-center">{int.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{int.name}</p>
                      <p className="text-xs text-slate-500">{int.desc}</p>
                    </div>
                    <button className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-all ${
                      int.connected
                        ? 'bg-accent-green/10 border-accent-green/30 text-accent-green'
                        : 'border-border-subtle text-slate-400 hover:text-white'
                    }`}>
                      {int.connected ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>

              <div className="glass-card p-6">
                <h3 className="font-display text-base font-semibold text-accent-red mb-5">Danger Zone</h3>
                <SettingRow icon={Trash2} label="Delete Account" desc="Permanently delete your account and all data" danger>
                  <button className="text-xs font-mono px-3 py-1.5 rounded-lg border border-accent-red/30 bg-accent-red/10 text-accent-red hover:opacity-80 transition-all">
                    Delete
                  </button>
                </SettingRow>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
