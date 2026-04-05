import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, ChevronDown, RefreshCw, X, CheckCircle, AlertTriangle, TrendingUp, Info, ChevronLeft, ChevronRight, Menu, LogOut, Crown } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { useAuth } from '../../context/AuthContext';
import { allTransactions } from '../../data/transactions';

const NOTIFICATIONS = [
  { id: 1, type: 'warning', icon: AlertTriangle, colorVar: '--accent-amber', title: 'Shopping budget exceeded', body: "You've used 105% of your monthly shopping budget.", time: '2 min ago', read: false },
  { id: 2, type: 'success', icon: CheckCircle,   colorVar: '--accent-green', title: 'Goal achieved! 🎉',       body: 'Congratulations — MacBook Pro goal fully funded.',    time: '1 hr ago', read: false },
  { id: 3, type: 'info',    icon: TrendingUp,    colorVar: '--accent-cyan',  title: 'Portfolio up +3.8%',     body: 'Your investments gained $2,430 this month.',          time: '3 hr ago', read: false },
  { id: 4, type: 'info',    icon: Info,          colorVar: '--accent-purple',title: 'Salary deposit received',body: '$5,800.00 deposited to Primary Checking.',             time: 'Yesterday', read: true },
  { id: 5, type: 'warning', icon: AlertTriangle, colorVar: '--accent-red',   title: 'Unusual transaction',    body: 'Apple Store charge of $999 detected.',                time: 'Yesterday', read: true },
];

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const TIME_RANGES = [
  { id: '1W', label: '1W' }, { id: '1M', label: '1M' }, { id: '3M', label: '3M' },
  { id: '6M', label: '6M' }, { id: '1Y', label: '1Y' }, { id: 'ALL', label: 'ALL' },
];

function MonthPicker({ value, onChange, onClose }) {
  const [year, setYear] = useState(value.year);
  return (
    <div className="absolute right-0 top-full mt-2 w-56 glass-card-elevated rounded-2xl z-50 p-4 animate-fade-up"
      style={{ border: '1px solid var(--border-subtle)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => setYear(y => y - 1)} className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
          style={{ background: 'var(--surface-1)', color: 'var(--text-secondary)' }}>
          <ChevronLeft size={14} />
        </button>
        <span className="text-sm font-mono font-bold" style={{ color: 'var(--text-primary)' }}>{year}</span>
        <button onClick={() => setYear(y => y + 1)} className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
          style={{ background: 'var(--surface-1)', color: 'var(--text-secondary)' }}>
          <ChevronRight size={14} />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {MONTHS.map((m, i) => {
          const active = i === value.month && year === value.year;
          return (
            <button key={m} onClick={() => { onChange({ month: i, year }); onClose(); }}
              className="py-2 rounded-xl text-xs font-mono font-medium transition-all"
              style={{
                background: active ? 'var(--accent-cyan)' : 'transparent',
                color: active ? 'var(--text-on-accent)' : 'var(--text-secondary)',
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--surface-1)'; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
            >{m}</button>
          );
        })}
      </div>
    </div>
  );
}

export default function Topbar({ title = 'Dashboard', onMenuClick }) {
  const { setActivePage, activePeriod, setActivePeriod, refreshData, isLoading } = useFinance();
  const { logout, plan, setScreen } = useAuth();
  const isPro = plan === 'pro';

  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [selectedDate, setSelectedDate] = useState({ month: 11, year: 2024 });

  const searchRef = useRef(null);
  const notifsRef = useRef(null);
  const dateRef = useRef(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowSearch(false);
      if (notifsRef.current && !notifsRef.current.contains(e.target)) setShowNotifs(false);
      if (dateRef.current && !dateRef.current.contains(e.target)) setShowDatePicker(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (q) => {
    setSearchQuery(q);
    if (q.trim().length < 2) { setSearchResults([]); setShowSearch(false); return; }
    const results = allTransactions.filter(t =>
      t.merchant.toLowerCase().includes(q.toLowerCase()) ||
      t.category.toLowerCase().includes(q.toLowerCase())
    ).slice(0, 6);
    setSearchResults(results);
    setShowSearch(true);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshData();
    setTimeout(() => setRefreshing(false), 400);
  };

  const markAllRead = () => setNotifications(n => n.map(x => ({ ...x, read: true })));
  const dismissNotif = (id) => setNotifications(n => n.filter(x => x.id !== id));
  const dateLabel = `${MONTHS[selectedDate.month]} ${selectedDate.year}`;

  const iconBtnStyle = { background: 'var(--icon-btn-bg)', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' };

  return (
    <header className="sticky top-0 z-30 flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-3 sm:py-4 backdrop-blur-md"
      style={{ background: 'color-mix(in srgb, var(--bg-primary) 85%, transparent)', borderBottom: '1px solid var(--border-subtle)' }}>

      {/* Mobile hamburger */}
      <button onClick={onMenuClick} className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-all flex-shrink-0" style={iconBtnStyle}>
        <Menu size={17} />
      </button>

      {/* Title */}
      <div className="flex-1 min-w-0">
        <h1 className="font-display text-lg sm:text-xl font-bold leading-none truncate" style={{ color: 'var(--text-primary)' }}>{title}</h1>
        <p className="text-xs mt-0.5 font-mono hidden sm:block" style={{ color: 'var(--text-muted)' }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Time range pills */}
      <div className="hidden md:flex items-center gap-1 rounded-xl p-1" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
        {TIME_RANGES.map(({ id, label }) => (
          <button key={id} onClick={() => setActivePeriod(id)}
            className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all"
            style={{
              background: activePeriod === id ? 'var(--accent-cyan)' : 'transparent',
              color: activePeriod === id ? 'var(--text-on-accent)' : 'var(--text-muted)',
            }}>
            {label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative hidden sm:block" ref={searchRef}>
        <div className="flex items-center gap-2 rounded-xl px-3 py-2 transition-all duration-200"
          style={{
            background: 'var(--bg-elevated)',
            border: `1px solid ${showSearch || searchQuery ? 'color-mix(in srgb, var(--accent-cyan) 40%, transparent)' : 'var(--border-subtle)'}`,
            width: showSearch || searchQuery ? '240px' : '160px',
          }}>
          <Search size={14} className="flex-shrink-0 transition-colors" style={{ color: searchQuery ? 'var(--accent-cyan)' : 'var(--text-muted)' }} />
          <input type="text" value={searchQuery} onChange={e => handleSearch(e.target.value)}
            onFocus={() => searchQuery.length >= 2 && setShowSearch(true)}
            placeholder="Search..."
            style={{ background: 'transparent', color: 'var(--text-primary)', width: '100%', outline: 'none', fontSize: '0.875rem' }}
            className="placeholder-slate-500" />
          {searchQuery && (
            <button onClick={() => { setSearchQuery(''); setShowSearch(false); setSearchResults([]); }} style={{ color: 'var(--text-muted)' }} className="flex-shrink-0 hover:opacity-70 transition-opacity">
              <X size={12} />
            </button>
          )}
        </div>
        {showSearch && searchResults.length > 0 && (
          <div className="absolute left-0 top-full mt-2 w-80 glass-card-elevated rounded-2xl z-50 overflow-hidden animate-fade-up"
            style={{ border: '1px solid var(--border-subtle)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
            <div className="px-3 py-2 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <p className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{searchResults.length} results</p>
              <button onClick={() => { setActivePage('transactions'); setShowSearch(false); }} className="text-[10px] font-mono hover:underline" style={{ color: 'var(--accent-cyan)' }}>View all</button>
            </div>
            {searchResults.map(t => (
              <button key={t.id} onClick={() => { setActivePage('transactions'); setShowSearch(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 transition-all text-left"
                style={{ borderBottom: '1px solid var(--border-subtle)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--hover-bg)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <span className="text-lg">{t.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{t.merchant}</p>
                  <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{t.category} · {t.date}</p>
                </div>
                <p className="text-sm font-mono font-semibold flex-shrink-0" style={{ color: t.amount > 0 ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                  {t.amount > 0 ? '+' : ''}${Math.abs(t.amount).toFixed(2)}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Refresh */}
      <button onClick={handleRefresh} className="w-9 h-9 rounded-xl flex items-center justify-center transition-all flex-shrink-0" style={iconBtnStyle}
        title="Refresh data">
        <RefreshCw size={15} style={{ color: (refreshing || isLoading) ? 'var(--accent-cyan)' : 'var(--text-secondary)' }}
          className={(refreshing || isLoading) ? 'animate-spin' : ''} />
      </button>

      {/* Notifications */}
      <div className="relative" ref={notifsRef}>
        <button onClick={() => { setShowNotifs(v => !v); setShowDatePicker(false); }}
          className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all flex-shrink-0" style={iconBtnStyle}>
          <Bell size={15} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full flex items-center justify-center text-[9px] font-bold px-0.5"
              style={{ background: 'var(--accent-red)', color: '#fff', border: '2px solid var(--bg-primary)' }}>
              {unreadCount}
            </span>
          )}
        </button>
        {showNotifs && (
          <div className="absolute right-0 top-full mt-2 w-80 glass-card-elevated rounded-2xl z-50 overflow-hidden animate-fade-up"
            style={{ border: '1px solid var(--border-subtle)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
            <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <p className="text-sm font-display font-bold" style={{ color: 'var(--text-primary)' }}>Notifications</p>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && <button onClick={markAllRead} className="text-[10px] font-mono hover:underline" style={{ color: 'var(--accent-cyan)' }}>Mark all read</button>}
                <button onClick={() => setShowNotifs(false)} style={{ color: 'var(--text-muted)' }}><X size={14} /></button>
              </div>
            </div>
            <div className="max-h-[360px] overflow-y-auto">
              {notifications.map(n => {
                const Icon = n.icon;
                return (
                  <div key={n.id} className="relative flex gap-3 px-4 py-3 transition-all"
                    style={{ borderBottom: '1px solid var(--border-subtle)', opacity: n.read ? 0.55 : 1 }}>
                    {!n.read && <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent-cyan)' }} />}
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `color-mix(in srgb, var(${n.colorVar}) 12%, transparent)` }}>
                      <Icon size={14} style={{ color: `var(${n.colorVar})` }} />
                    </div>
                    <div className="flex-1 min-w-0 pr-4">
                      <p className="text-sm font-medium leading-tight" style={{ color: 'var(--text-primary)' }}>{n.title}</p>
                      <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{n.body}</p>
                      <p className="text-[10px] font-mono mt-1" style={{ color: 'var(--text-muted)' }}>{n.time}</p>
                    </div>
                    <button onClick={() => dismissNotif(n.id)} className="absolute right-3 top-3 transition-opacity hover:opacity-70" style={{ color: 'var(--text-muted)' }}>
                      <X size={12} />
                    </button>
                  </div>
                );
              })}
              {notifications.length === 0 && (
                <div className="px-4 py-8 text-center">
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>All caught up! 🎉</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Date picker */}
      <div className="relative hidden lg:block" ref={dateRef}>
        <button onClick={() => { setShowDatePicker(v => !v); setShowNotifs(false); }}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all"
          style={{
            border: `1px solid ${showDatePicker ? 'color-mix(in srgb, var(--accent-cyan) 40%, transparent)' : 'var(--border-subtle)'}`,
            background: showDatePicker ? 'color-mix(in srgb, var(--accent-cyan) 6%, transparent)' : 'transparent',
            color: 'var(--text-primary)',
          }}>
          <span className="font-mono">{dateLabel}</span>
          <ChevronDown size={13} className={`transition-transform ${showDatePicker ? 'rotate-180' : ''}`} style={{ color: 'var(--text-muted)' }} />
        </button>
        {showDatePicker && <MonthPicker value={selectedDate} onChange={setSelectedDate} onClose={() => setShowDatePicker(false)} />}
      </div>

      {/* Upgrade chip for free users */}
      {!isPro && (
        <button onClick={() => setScreen('plans')}
          className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex-shrink-0"
          style={{ background: 'color-mix(in srgb, var(--accent-amber) 12%, transparent)', border: '1px solid color-mix(in srgb, var(--accent-amber) 25%, transparent)', color: 'var(--accent-amber)' }}>
          <Crown size={11} /> Upgrade
        </button>
      )}

      {/* Logout */}
      <button onClick={logout} className="w-9 h-9 rounded-xl flex items-center justify-center transition-all flex-shrink-0" style={iconBtnStyle} title="Sign out"
        onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent-red)'; e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--accent-red) 30%, transparent)'; }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}>
        <LogOut size={15} />
      </button>
    </header>
  );
}
