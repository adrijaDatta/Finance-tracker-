import React from 'react';
import {
  LayoutDashboard, TrendingUp, Wallet, CreditCard,
  Target, Settings, Zap, ArrowLeftRight, Bot, User, X, Crown,
} from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { useAuth, PLANS } from '../../context/AuthContext';
import RoleSwitcher from '../ui/RoleSwitcher';

const navItems = [
  { id: 'dashboard',    label: 'Dashboard',    icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
  { id: 'analytics',    label: 'Analytics',    icon: TrendingUp, badge: 'New' },
  { id: 'wallet',       label: 'Wallet',       icon: Wallet },
  { id: 'cards',        label: 'Cards',        icon: CreditCard },
  { id: 'goals',        label: 'Goals',        icon: Target },
];

const systemItems = [
  { id: 'ai-assistant', label: 'AI Assistant', icon: Bot, badge: 'AI', proOnly: true },
  { id: 'settings',     label: 'Settings',     icon: Settings },
];

export default function Sidebar({ mobileOpen, onMobileClose }) {
  const { activePage, setActivePage } = useFinance();
  const { user, plan, setScreen } = useAuth();
  const isPro = plan === 'pro';

  const navigate = (id) => {
    setActivePage(id);
    onMobileClose?.();
  };

  const NavButton = ({ id, label, icon: Icon, badge, proOnly }) => {
    const locked = proOnly && !isPro;
    const isActive = activePage === id;
    return (
      <button
        onClick={() => !locked && navigate(id)}
        className="nav-item w-full text-left group relative"
        style={{
          background: isActive ? 'var(--nav-active-bg)' : 'transparent',
          color: isActive ? 'var(--nav-active-text)' : locked ? 'var(--text-muted)' : 'var(--text-secondary)',
          cursor: locked ? 'not-allowed' : 'pointer',
        }}
        onMouseEnter={e => { if (!isActive && !locked) { e.currentTarget.style.background = 'var(--hover-bg)'; e.currentTarget.style.color = 'var(--text-primary)'; } }}
        onMouseLeave={e => { if (!isActive && !locked) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; } }}
      >
        {isActive && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-full"
            style={{ height: '60%', background: 'var(--nav-active-text)' }} />
        )}
        <Icon size={18} style={{ color: isActive ? 'var(--nav-active-text)' : locked ? 'var(--text-muted)' : 'inherit' }} />
        <span>{label}</span>
        {badge && !locked && (
          <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full font-mono"
            style={{
              background: badge === 'AI'
                ? 'color-mix(in srgb, var(--accent-purple) 18%, transparent)'
                : 'color-mix(in srgb, var(--accent-amber) 18%, transparent)',
              color: badge === 'AI' ? 'var(--accent-purple)' : 'var(--accent-amber)',
            }}>
            {badge}
          </span>
        )}
        {locked && (
          <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded-full font-mono flex items-center gap-1"
            style={{ background: 'color-mix(in srgb, var(--accent-amber) 10%, transparent)', color: 'var(--accent-amber)' }}>
            <Crown size={8} /> Pro
          </span>
        )}
      </button>
    );
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 flex-shrink-0" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-green flex items-center justify-center flex-shrink-0">
          <Zap size={16} style={{ color: 'var(--text-on-accent)' }} />
        </div>
        <span className="font-display font-bold text-lg tracking-tight" style={{ color: 'var(--text-primary)' }}>Moneta</span>
        <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full"
          style={{
            background: isPro ? 'color-mix(in srgb, var(--accent-cyan) 12%, transparent)' : 'var(--surface-1)',
            color: isPro ? 'var(--accent-cyan)' : 'var(--text-muted)',
          }}>
          {isPro ? 'PRO' : 'FREE'}
        </span>
        <button onClick={onMobileClose} className="lg:hidden ml-1 w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
          style={{ background: 'var(--surface-1)', color: 'var(--text-secondary)' }}>
          <X size={15} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="text-[10px] font-mono uppercase tracking-widest px-3 mb-2" style={{ color: 'var(--text-muted)' }}>Main Menu</p>
        {navItems.map(item => <NavButton key={item.id} {...item} />)}
        <p className="text-[10px] font-mono uppercase tracking-widest px-3 mb-2 pt-4" style={{ color: 'var(--text-muted)' }}>System</p>
        {systemItems.map(item => <NavButton key={item.id} {...item} />)}
      </nav>

      {/* Upgrade banner */}
      {!isPro && (
        <div className="mx-3 mb-3 px-3 py-3 rounded-xl" style={{
          background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent-cyan) 10%, transparent), color-mix(in srgb, var(--accent-purple) 10%, transparent))',
          border: '1px solid color-mix(in srgb, var(--accent-cyan) 15%, transparent)',
        }}>
          <div className="flex items-center gap-1.5 mb-1">
            <Crown size={11} style={{ color: 'var(--accent-amber)' }} />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider" style={{ color: 'var(--accent-amber)' }}>Upgrade to Pro</span>
          </div>
          <p className="text-[11px] mb-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>Unlock AI assistant, analytics & more</p>
          <button onClick={() => { setScreen('plans'); onMobileClose?.(); }}
            className="w-full py-1.5 rounded-lg text-xs font-bold font-mono transition-all hover:opacity-90"
            style={{ background: 'var(--accent-cyan)', color: 'var(--text-on-accent)' }}>
            View Plans →
          </button>
        </div>
      )}

      {/* Role switcher */}
      <div className="px-4 py-3" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <p className="text-[10px] font-mono uppercase tracking-widest mb-2 px-1" style={{ color: 'var(--text-muted)' }}>Access Role</p>
        <RoleSwitcher />
      </div>

      {/* User profile */}
      <div className="p-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <button onClick={() => navigate('profile')}
          className="glass-card p-3 flex items-center gap-3 w-full text-left transition-all"
          style={{ borderColor: activePage === 'profile' ? 'color-mix(in srgb, var(--accent-cyan) 30%, transparent)' : 'var(--card-border)' }}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{ color: '#fff' }}>
            {user?.initials || 'AK'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{user?.name || 'Alex Kim'}</p>
            <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{user?.email || 'alex@moneta.io'}</p>
          </div>
          <User size={13} className="flex-shrink-0" style={{ color: activePage === 'profile' ? 'var(--accent-cyan)' : 'var(--text-muted)' }} />
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 flex-shrink-0"
        style={{ background: 'var(--bg-secondary)', borderRight: '1px solid var(--border-subtle)' }}>
        <SidebarContent />
      </aside>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 backdrop-blur-sm" style={{ background: 'var(--modal-overlay)' }} onClick={onMobileClose} />
      )}

      <aside className={`lg:hidden fixed inset-y-0 left-0 z-50 w-72 flex flex-col transform transition-transform duration-300 ease-out ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ background: 'var(--bg-secondary)', borderRight: '1px solid var(--border-subtle)' }}>
        <SidebarContent />
      </aside>
    </>
  );
}
