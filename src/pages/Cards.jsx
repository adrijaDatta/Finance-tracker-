import React, { useState } from 'react';
import {
  CreditCard, Lock, Unlock, Eye, EyeOff, Zap, Wifi,
  ShoppingBag, Coffee, Car, Home, Globe, MoreHorizontal,
  TrendingUp, AlertTriangle, CheckCircle, Plus,
} from 'lucide-react';

const cards = [
  {
    id: 1, name: 'Moneta Platinum', type: 'Visa', number: '4821 •••• •••• 9032',
    holder: 'Alex Kim', expiry: '12/27', cvv: '•••',
    limit: 15000, spent: 4230, available: 10770,
    color1: '#00D4FF', color2: '#0066CC',
    rewards: 'Cashback 2.5%', status: 'active', virtual: false,
  },
  {
    id: 2, name: 'Business Gold', type: 'Mastercard', number: '5412 •••• •••• 7741',
    holder: 'Alex Kim', expiry: '09/26', cvv: '•••',
    limit: 25000, spent: 12800, available: 12200,
    color1: '#FFB800', color2: '#cc7700',
    rewards: 'Points 3x Travel', status: 'active', virtual: false,
  },
  {
    id: 3, name: 'Virtual Shopping', type: 'Visa', number: '4891 •••• •••• 2210',
    holder: 'Alex Kim', expiry: '06/25', cvv: '•••',
    limit: 5000, spent: 4950, available: 50,
    color1: '#7B5EA7', color2: '#4a2d80',
    rewards: '5% Online Stores', status: 'near-limit', virtual: true,
  },
];

const recentCardTx = [
  { merchant: 'Amazon', amount: -89.99, category: 'Shopping', date: 'Dec 28', icon: '📦', card: 1 },
  { merchant: 'Delta Airlines', amount: -420.00, category: 'Travel', date: 'Dec 27', icon: '✈️', card: 2 },
  { merchant: 'Whole Foods', amount: -67.30, category: 'Food', date: 'Dec 26', icon: '🥦', card: 1 },
  { merchant: 'Apple Store', amount: -999.00, category: 'Shopping', date: 'Dec 21', icon: '🍎', card: 3 },
  { merchant: 'Starbucks', amount: -6.80, category: 'Coffee', date: 'Dec 20', icon: '☕', card: 1 },
];

const benefits = [
  { icon: Globe, label: 'No Foreign Transaction Fees', active: true },
  { icon: ShoppingBag, label: 'Purchase Protection up to $1K', active: true },
  { icon: Zap, label: 'Instant Virtual Card', active: true },
  { icon: Car, label: 'Roadside Assistance', active: false },
];

export default function Cards() {
  const [activeCard, setActiveCard] = useState(0);
  const [showNumbers, setShowNumbers] = useState(false);
  const [locked, setLocked] = useState(false);

  const card = cards[activeCard];
  const usedPct = (card.spent / card.limit) * 100;
  const nearLimit = usedPct > 85;

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-white">My Cards</h2>
          <p className="text-sm text-slate-500 mt-0.5 font-mono">{cards.length} cards linked to your account</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-cyan text-bg-primary font-semibold text-sm hover:opacity-90 transition-all">
          <Plus size={14} />
          Add Card
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Card Visual + Selector */}
        <div className="xl:col-span-2 space-y-4">

          {/* Card Selector Tabs */}
          <div className="flex gap-3 overflow-x-auto pb-1">
            {cards.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setActiveCard(i)}
                className={`flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm transition-all ${
                  activeCard === i
                    ? 'border-accent-cyan/30 bg-accent-cyan/10 text-white'
                    : 'border-border-subtle text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <CreditCard size={14} style={{ color: activeCard === i ? c.color1 : undefined }} />
                <span className="font-medium">{c.name}</span>
                {c.virtual && <span className="text-[9px] bg-accent-purple/20 text-accent-purple px-1.5 py-0.5 rounded font-mono">VIRTUAL</span>}
                {c.status === 'near-limit' && <span className="text-[9px] bg-accent-red/20 text-accent-red px-1.5 py-0.5 rounded font-mono">⚠</span>}
              </button>
            ))}
          </div>

          {/* Physical Card Visual */}
          <div
            className="relative w-full rounded-3xl p-8 overflow-hidden select-none"
            style={{
              background: `linear-gradient(135deg, ${card.color1} 0%, ${card.color2} 100%)`,
              aspectRatio: '1.6 / 1',
              maxHeight: 280,
            }}
          >
            {/* Card noise overlay */}
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")' }} />

            {/* Top row */}
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-white/70 text-xs font-mono uppercase tracking-widest">Moneta</p>
                <p className="text-white font-display font-bold text-lg mt-0.5">{card.name}</p>
              </div>
              <div className="flex items-center gap-2">
                {card.virtual && <Wifi size={18} className="text-white/70 rotate-90" />}
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Zap size={18} className="text-white" />
                </div>
              </div>
            </div>

            {/* Chip */}
            <div className="mt-6 relative z-10">
              <div className="w-10 h-8 rounded-md bg-gradient-to-br from-yellow-300/80 to-yellow-500/60 border border-yellow-200/30" />
            </div>

            {/* Card number */}
            <p className="text-white font-mono text-xl tracking-widest mt-4 relative z-10">
              {showNumbers ? card.number : card.number}
            </p>

            {/* Bottom row */}
            <div className="flex justify-between items-end mt-3 relative z-10">
              <div>
                <p className="text-white/60 text-[10px] uppercase tracking-widest">Card Holder</p>
                <p className="text-white font-medium text-sm mt-0.5">{card.holder}</p>
              </div>
              <div className="text-right">
                <p className="text-white/60 text-[10px] uppercase tracking-widest">Expires</p>
                <p className="text-white font-mono text-sm mt-0.5">{card.expiry}</p>
              </div>
              <div className="text-right">
                <p className="text-white/60 text-[10px] uppercase tracking-widest">CVV</p>
                <p className="text-white font-mono text-sm mt-0.5">{showNumbers ? '382' : card.cvv}</p>
              </div>
              <p className="text-white/80 font-bold text-lg italic">{card.type}</p>
            </div>

            {/* Lock overlay */}
            {locked && (
              <div className="absolute inset-0 bg-bg-primary/80 backdrop-blur-sm flex items-center justify-center rounded-3xl z-20">
                <div className="text-center">
                  <Lock size={32} className="text-accent-red mx-auto mb-2" />
                  <p className="text-white font-medium">Card Locked</p>
                </div>
              </div>
            )}
          </div>

          {/* Card Controls */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setShowNumbers(n => !n)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border-subtle text-sm text-slate-300 hover:text-white hover:border-white/20 transition-all"
            >
              {showNumbers ? <EyeOff size={14} /> : <Eye size={14} />}
              {showNumbers ? 'Hide' : 'Show'} Details
            </button>
            <button
              onClick={() => setLocked(l => !l)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm transition-all ${
                locked
                  ? 'border-accent-green/30 bg-accent-green/10 text-accent-green'
                  : 'border-accent-red/30 bg-accent-red/10 text-accent-red'
              }`}
            >
              {locked ? <Unlock size={14} /> : <Lock size={14} />}
              {locked ? 'Unlock Card' : 'Lock Card'}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border-subtle text-sm text-slate-300 hover:text-white transition-all">
              <MoreHorizontal size={14} />
              More Options
            </button>
          </div>

          {/* Spending Limit */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-medium text-white">Spending Limit</p>
                <p className="text-xs text-slate-500 font-mono mt-0.5">${card.spent.toLocaleString()} of ${card.limit.toLocaleString()} used</p>
              </div>
              {nearLimit && (
                <div className="flex items-center gap-1.5 text-xs text-accent-red font-mono">
                  <AlertTriangle size={12} />
                  Near Limit
                </div>
              )}
            </div>
            <div className="h-3 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${usedPct}%`,
                  background: nearLimit
                    ? 'linear-gradient(90deg, #FFB800, #FF4757)'
                    : `linear-gradient(90deg, ${card.color2}, ${card.color1})`,
                }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-slate-500 font-mono">
              <span>Available: ${card.available.toLocaleString()}</span>
              <span>{usedPct.toFixed(0)}% used</span>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-4">

          {/* Rewards */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-base font-semibold text-white">Rewards</h3>
              <span className="text-[10px] font-mono bg-accent-amber/20 text-accent-amber px-2 py-0.5 rounded-full">ACTIVE</span>
            </div>
            <div className="text-center py-3">
              <p className="text-xs text-slate-500 font-mono">Points Balance</p>
              <p className="font-display text-4xl font-bold text-accent-amber mt-1">12,840</p>
              <p className="text-xs text-slate-500 font-mono mt-1">≈ $128.40 cashback value</p>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="flex-1 p-3 bg-accent-amber/10 border border-accent-amber/20 rounded-xl text-center">
                <p className="text-xs text-accent-amber font-mono font-bold">+320</p>
                <p className="text-[10px] text-slate-500 font-mono">This month</p>
              </div>
              <div className="flex-1 p-3 bg-white/3 border border-white/5 rounded-xl text-center">
                <p className="text-xs text-slate-300 font-mono font-bold">{card.rewards}</p>
                <p className="text-[10px] text-slate-500 font-mono">Earn rate</p>
              </div>
            </div>
            <button className="w-full mt-3 py-2.5 rounded-xl bg-accent-amber/20 border border-accent-amber/30 text-accent-amber text-sm font-medium hover:opacity-90 transition-all">
              Redeem Points
            </button>
          </div>

          {/* Card Benefits */}
          <div className="glass-card p-5">
            <h3 className="font-display text-base font-semibold text-white mb-4">Card Benefits</h3>
            <div className="space-y-3">
              {benefits.map(({ icon: Icon, label, active }, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    active ? 'bg-accent-cyan/10 border border-accent-cyan/20' : 'bg-white/3 border border-white/5'
                  }`}>
                    <Icon size={14} className={active ? 'text-accent-cyan' : 'text-slate-600'} />
                  </div>
                  <p className={`text-xs ${active ? 'text-slate-300' : 'text-slate-600'}`}>{label}</p>
                  {active && <CheckCircle size={12} className="text-accent-green ml-auto flex-shrink-0" />}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Card Transactions */}
          <div className="glass-card p-5">
            <h3 className="font-display text-base font-semibold text-white mb-4">Recent Transactions</h3>
            <div className="space-y-2">
              {recentCardTx.filter(t => t.card === card.id).slice(0, 4).map((t, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-base w-7 text-center">{t.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-white truncate">{t.merchant}</p>
                    <p className="text-[10px] text-slate-500 font-mono">{t.date}</p>
                  </div>
                  <p className="text-xs font-mono text-accent-red">{t.amount < 0 ? '-' : '+'}${Math.abs(t.amount).toFixed(2)}</p>
                </div>
              ))}
              {recentCardTx.filter(t => t.card === card.id).length === 0 && (
                <p className="text-xs text-slate-600 text-center py-4">No transactions for this card</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
