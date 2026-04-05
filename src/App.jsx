import React, { useState } from 'react';
import { FinanceProvider, useFinance } from './context/FinanceContext';
import { RoleProvider } from './context/RoleContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Analytics from './pages/Analytics';
import Wallet from './pages/Wallet';
import Cards from './pages/Cards';
import Goals from './pages/Goals';
import Settings from './pages/Settings';
import AIAssistant from './pages/AIAssistant';
import MyProfile from './pages/MyProfile';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import PlansPage from './pages/auth/PlansPage';
import UpgradeModal from './components/ui/UpgradeModal';
import { AlertTriangle, X } from 'lucide-react';

const PAGE_TITLES = {
  dashboard:     'Dashboard',
  transactions:  'Transactions',
  analytics:     'Analytics',
  wallet:        'Wallet',
  cards:         'Cards',
  goals:         'Goals',
  settings:      'Settings',
  'ai-assistant':'AI Assistant',
  profile:       'My Profile',
};

function AuthGate() {
  const { screen } = useAuth();
  if (screen === 'signup') return <SignupPage />;
  if (screen === 'plans') return <PlansPage />;
  return <LoginPage />;
}

function ApiErrorBanner({ message, onDismiss }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 text-sm"
      style={{
        background: 'color-mix(in srgb, var(--accent-amber) 12%, transparent)',
        borderBottom: '1px solid color-mix(in srgb, var(--accent-amber) 25%, transparent)',
      }}>
      <AlertTriangle size={14} style={{ color: 'var(--accent-amber)', flexShrink: 0 }} />
      <span style={{ color: 'var(--text-secondary)', flex: 1 }}>{message}</span>
      <button onClick={onDismiss} style={{ color: 'var(--text-muted)' }} className="hover:opacity-70 transition-opacity">
        <X size={14} />
      </button>
    </div>
  );
}

function AppShell() {
  const { activePage } = useFinance();
  const { apiError } = useFinance();
  const { screen, setScreen } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [errorDismissed, setErrorDismissed] = useState(false);

  // Show upgrade modal when authenticated user navigates to 'plans'
  const showUpgradeModal = screen === 'plans';

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':    return <Dashboard />;
      case 'transactions': return <Transactions />;
      case 'analytics':    return <Analytics />;
      case 'wallet':       return <Wallet />;
      case 'cards':        return <Cards />;
      case 'goals':        return <Goals />;
      case 'settings':     return <Settings />;
      case 'ai-assistant': return <AIAssistant />;
      case 'profile':      return <MyProfile />;
      default:             return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {apiError && !errorDismissed && (
          <ApiErrorBanner message={apiError} onDismiss={() => setErrorDismissed(true)} />
        )}
        <Topbar title={PAGE_TITLES[activePage] || 'Dashboard'} onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto" style={{ background: 'var(--bg-primary)' }}>
          <div
            className="pointer-events-none fixed top-0 left-0 lg:left-64 right-0 h-96 opacity-20"
            style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, color-mix(in srgb, var(--accent-cyan) 25%, transparent) 0%, transparent 70%)' }}
          />
          {renderPage()}
        </main>
      </div>

      {/* In-app upgrade modal — shown when authenticated user clicks "View Plans" / "Upgrade" */}
      {showUpgradeModal && (
        <UpgradeModal onClose={() => setScreen('dashboard')} />
      )}
    </div>
  );
}

function AppRouter() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <AuthGate />;
  return (
    <FinanceProvider>
      <AppShell />
    </FinanceProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <RoleProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </RoleProvider>
    </ThemeProvider>
  );
}
