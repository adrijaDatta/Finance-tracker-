import React, { useState } from 'react';
import {
  Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, ArrowLeftRight,
  Plus, Eye, EyeOff, TrendingUp, Clock, CheckCircle, AlertCircle,
} from 'lucide-react';

const accounts = [
  { id: 1, name: 'Primary Checking', bank: 'Chase Bank', balance: 24850.00, type: 'checking', color: '#00D4FF', icon: '🏦', last4: '4821', currency: 'USD' },
  { id: 2, name: 'High-Yield Savings', bank: 'Marcus by GS', balance: 18500.00, type: 'savings', color: '#00FF87', icon: '📈', last4: '7703', currency: 'USD' },
  { id: 3, name: 'Investment Account', bank: 'Fidelity', balance: 22000.00, type: 'investment', color: '#7B5EA7', icon: '💎', last4: '2290', currency: 'USD' },
  { id: 4, name: 'Emergency Fund', bank: 'Ally Bank', balance: 650.00, type: 'savings', color: '#FFB800', icon: '🛡️', last4: '5512', currency: 'USD' },
];

const recentTransfers = [
  { id: 1, from: 'Primary Checking', to: 'High-Yield Savings', amount: 2000, date: '2024-12-28', status: 'completed' },
  { id: 2, from: 'Primary Checking', to: 'Investment Account', amount: 1500, date: '2024-12-22', status: 'completed' },
  { id: 3, from: 'Primary Checking', to: 'Emergency Fund', amount: 500, date: '2024-12-18', status: 'pending' },
];

const typeColors = {
  checking: 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20',
  savings: 'bg-accent-green/10 text-accent-green border-accent-green/20',
  investment: 'bg-accent-purple/10 text-accent-purple border-accent-purple/20',
};

export default function Wallet() {
  const [showBalances, setShowBalances] = useState(true);
  const [activeAccount, setActiveAccount] = useState(1);
  const [showTransfer, setShowTransfer] = useState(false);
  const [transferData, setTransferData] = useState({ from: '', to: '', amount: '' });

  const totalBalance = accounts.reduce((s, a) => s + a.balance, 0);
  const active = accounts.find(a => a.id === activeAccount);

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-white">My Wallet</h2>
          <p className="text-sm text-slate-500 mt-0.5 font-mono">Manage your linked accounts</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowBalances(b => !b)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border-subtle text-sm text-slate-300 hover:border-accent-cyan/30 transition-all"
          >
            {showBalances ? <EyeOff size={14} /> : <Eye size={14} />}
            <span className="hidden sm:inline">{showBalances ? 'Hide' : 'Show'} Balances</span>
          </button>
          <button
            onClick={() => setShowTransfer(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-cyan text-bg-primary font-semibold text-sm hover:opacity-90 transition-all"
          >
            <ArrowLeftRight size={14} />
            Transfer
          </button>
        </div>
      </div>

      {/* Total Balance Card */}
      <div className="glass-card p-6 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-10"
          style={{ background: 'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(0,212,255,0.4) 0%, transparent 70%)' }} />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Total Portfolio Value</p>
            <p className="font-display text-5xl font-bold text-white">
              {showBalances ? `$${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '••••••'}
            </p>
            <div className="flex items-center gap-2 mt-3">
              <span className="stat-badge-up"><TrendingUp size={10} /> +8.4%</span>
              <span className="text-xs text-slate-500 font-mono">vs last quarter</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-right">
            <div>
              <p className="text-xs text-slate-500 font-mono">Liquid</p>
              <p className="text-lg font-display font-bold text-accent-cyan">{showBalances ? '$24,850' : '••••'}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-mono">Invested</p>
              <p className="text-lg font-display font-bold text-accent-purple">{showBalances ? '$22,000' : '••••'}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-mono">Savings</p>
              <p className="text-lg font-display font-bold text-accent-green">{showBalances ? '$19,150' : '••••'}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-mono">Accounts</p>
              <p className="text-lg font-display font-bold text-accent-amber">{accounts.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {accounts.map(acc => (
          <button
            key={acc.id}
            onClick={() => setActiveAccount(acc.id)}
            className={`glass-card p-5 text-left transition-all duration-200 hover:border-white/10 ${
              activeAccount === acc.id ? 'border-accent-cyan/30 ring-1 ring-accent-cyan/20' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl">{acc.icon}</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border capitalize ${typeColors[acc.type]}`}>
                {acc.type}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono mb-0.5">{acc.bank}</p>
            <p className="text-sm font-medium text-white mb-3">{acc.name}</p>
            <p className="font-display text-xl font-bold" style={{ color: acc.color }}>
              {showBalances ? `$${acc.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '••••••'}
            </p>
            <p className="text-xs text-slate-600 font-mono mt-1">•••• {acc.last4}</p>
          </button>
        ))}
      </div>

      {/* Account Detail + Transfers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Quick Actions for Selected Account */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-display text-base font-semibold text-white">{active?.name}</h3>
              <p className="text-xs text-slate-500 font-mono">{active?.bank} • •••• {active?.last4}</p>
            </div>
            <div className="text-right">
              <p className="font-display text-2xl font-bold" style={{ color: active?.color }}>
                {showBalances ? `$${active?.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '••••••'}
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: 'Deposit', icon: ArrowDownLeft, color: 'text-accent-green', bg: 'bg-accent-green/10 border-accent-green/20' },
              { label: 'Withdraw', icon: ArrowUpRight, color: 'text-accent-red', bg: 'bg-accent-red/10 border-accent-red/20' },
              { label: 'Transfer', icon: ArrowLeftRight, color: 'text-accent-cyan', bg: 'bg-accent-cyan/10 border-accent-cyan/20' },
            ].map(({ label, icon: Icon, color, bg }) => (
              <button
                key={label}
                onClick={() => label === 'Transfer' && setShowTransfer(true)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border ${bg} ${color} hover:opacity-80 transition-all`}
              >
                <Icon size={20} />
                <span className="text-xs font-medium">{label}</span>
              </button>
            ))}
          </div>

          {/* Mini transaction list */}
          <div>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Recent Activity</p>
            <div className="space-y-2">
              {[
                { label: 'Salary Deposit', amount: +5800, date: 'Dec 27', icon: '💼' },
                { label: 'Rent Payment', amount: -2200, date: 'Dec 25', icon: '🏠' },
                { label: 'Transfer → Savings', amount: -2000, date: 'Dec 28', icon: '💸' },
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white/3 rounded-xl">
                  <span className="text-base">{t.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm text-white">{t.label}</p>
                    <p className="text-xs text-slate-500 font-mono">{t.date}</p>
                  </div>
                  <p className={`text-sm font-mono font-semibold ${t.amount > 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                    {t.amount > 0 ? '+' : ''}{t.amount < 0 ? '-' : ''}${Math.abs(t.amount).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Transfers */}
        <div className="glass-card p-6">
          <h3 className="font-display text-base font-semibold text-white mb-1">Recent Transfers</h3>
          <p className="text-xs text-slate-500 font-mono mb-5">Between your accounts</p>
          <div className="space-y-3">
            {recentTransfers.map(t => (
              <div key={t.id} className="p-3 bg-white/3 rounded-xl border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono px-2 py-0.5 rounded-full flex items-center gap-1 ${
                    t.status === 'completed' ? 'bg-accent-green/10 text-accent-green' : 'bg-accent-amber/10 text-accent-amber'
                  }`}>
                    {t.status === 'completed' ? <CheckCircle size={9} /> : <Clock size={9} />}
                    {t.status}
                  </span>
                  <p className="text-sm font-mono font-bold text-white">${t.amount.toLocaleString()}</p>
                </div>
                <p className="text-xs text-slate-400">{t.from}</p>
                <div className="flex items-center gap-1 my-1">
                  <div className="flex-1 h-px bg-border-subtle" />
                  <ArrowDownLeft size={10} className="text-slate-600" />
                  <div className="flex-1 h-px bg-border-subtle" />
                </div>
                <p className="text-xs text-slate-400">{t.to}</p>
                <p className="text-[10px] text-slate-600 font-mono mt-1">{t.date}</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-xs text-accent-cyan font-mono hover:underline">View all transfers →</button>
        </div>
      </div>

      {/* Transfer Modal */}
      {showTransfer && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card-elevated w-full max-w-md p-6 animate-fade-up">
            <h3 className="font-display text-lg font-bold text-white mb-1">Transfer Funds</h3>
            <p className="text-xs text-slate-500 font-mono mb-6">Move money between your accounts</p>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-2">From Account</label>
                <select
                  value={transferData.from}
                  onChange={e => setTransferData(d => ({ ...d, from: e.target.value }))}
                  className="select-enhanced w-full py-3 text-sm"
                >
                  <option value="">Select account</option>
                  {accounts.map(a => <option key={a.id} value={a.id}>{a.name} (${a.balance.toLocaleString()})</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-2">To Account</label>
                <select
                  value={transferData.to}
                  onChange={e => setTransferData(d => ({ ...d, to: e.target.value }))}
                  className="select-enhanced w-full py-3 text-sm"
                >
                  <option value="">Select account</option>
                  {accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-2">Amount (USD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-mono">$</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={transferData.amount}
                    onChange={e => setTransferData(d => ({ ...d, amount: e.target.value }))}
                    className="w-full bg-bg-elevated border border-border-subtle rounded-xl px-4 py-3 pl-8 text-sm text-white focus:outline-none focus:border-accent-cyan/40"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowTransfer(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-border-subtle text-slate-400 hover:text-white text-sm transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowTransfer(false)}
                  className="flex-1 px-4 py-3 rounded-xl bg-accent-cyan text-bg-primary font-semibold text-sm hover:opacity-90 transition-all"
                >
                  Confirm Transfer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
