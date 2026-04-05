import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  summaryStats as defaultStats,
  balanceTrend as defaultBalanceTrend,
  spendingCategories as defaultSpending,
  weeklyFlow as defaultWeeklyFlow,
  recentTransactions as defaultTransactions,
  savingsGoals as defaultGoals,
  portfolioAllocation as defaultPortfolio,
  topMerchants as defaultMerchants,
  netWorthProjection as defaultNetWorth,
} from '../data/mockData';

const FinanceContext = createContext(null);

const STORAGE_KEY = 'moneta-finance';

function loadFinance() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function saveFinance(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

// Mock API: simulates fetching fresh data
async function fetchMockData() {
  await new Promise(r => setTimeout(r, 600));
  // Return slightly varied data to simulate live updates
  return {
    summaryStats: {
      ...defaultStats,
      totalBalance: defaultStats.totalBalance + Math.floor(Math.random() * 2000 - 1000),
    },
    balanceTrend: defaultBalanceTrend,
    spendingCategories: defaultSpending,
    weeklyFlow: defaultWeeklyFlow,
    recentTransactions: defaultTransactions,
    savingsGoals: defaultGoals,
    portfolioAllocation: defaultPortfolio,
    topMerchants: defaultMerchants,
    netWorthProjection: defaultNetWorth,
    lastFetched: new Date().toISOString(),
  };
}

export function FinanceProvider({ children }) {
  const [activePeriod, setActivePeriod] = useState('1Y');
  const [activePage, setActivePage] = useState(() => {
    try { return localStorage.getItem('moneta-page') || 'dashboard'; } catch { return 'dashboard'; }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Hydrate from cache or defaults
  const saved = loadFinance();
  const [data, setData] = useState({
    summaryStats: saved?.summaryStats || defaultStats,
    balanceTrend: saved?.balanceTrend || defaultBalanceTrend,
    spendingCategories: saved?.spendingCategories || defaultSpending,
    weeklyFlow: saved?.weeklyFlow || defaultWeeklyFlow,
    recentTransactions: saved?.recentTransactions || defaultTransactions,
    savingsGoals: saved?.savingsGoals || defaultGoals,
    portfolioAllocation: saved?.portfolioAllocation || defaultPortfolio,
    topMerchants: saved?.topMerchants || defaultMerchants,
    netWorthProjection: saved?.netWorthProjection || defaultNetWorth,
    lastFetched: saved?.lastFetched || null,
  });

  // Persist page choice
  useEffect(() => {
    try { localStorage.setItem('moneta-page', activePage); } catch {}
  }, [activePage]);

  // Persist finance data
  useEffect(() => {
    saveFinance(data);
  }, [data]);

  // Mock API refresh
  const refreshData = async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const fresh = await fetchMockData();
      setData(prev => ({ ...prev, ...fresh }));
    } catch (err) {
      setApiError('Failed to fetch latest data. Showing cached data.');
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch on mount if data is stale (>5 min)
  useEffect(() => {
    const isStale = !data.lastFetched ||
      (Date.now() - new Date(data.lastFetched).getTime()) > 5 * 60 * 1000;
    if (isStale) refreshData();
  }, []);

  const value = {
    ...data,
    activePeriod,
    setActivePeriod,
    activePage,
    setActivePage,
    isLoading,
    apiError,
    refreshData,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
}

export const useFinance = () => {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error('useFinance must be used within FinanceProvider');
  return ctx;
};
