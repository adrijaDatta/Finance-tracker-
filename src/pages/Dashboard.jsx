import React from 'react';
import { useFinance } from '../context/FinanceContext';
import StatCard from '../components/widgets/StatCard';
import BalanceTrendChart from '../components/charts/BalanceTrendChart';
import SpendingChart from '../components/charts/SpendingChart';
import WeeklyCashFlow from '../components/charts/WeeklyCashFlow';
import RecentTransactions from '../components/widgets/RecentTransactions';
import SavingsGoals from '../components/widgets/SavingsGoals';
import PortfolioWidget from '../components/widgets/PortfolioWidget';
import TopMerchants from '../components/widgets/TopMerchants';
import NetWorthProjection from '../components/charts/NetWorthProjection';
import InsightBar from '../components/widgets/InsightBar';

export default function Dashboard() {
  const {
    summaryStats,
    balanceTrend,
    spendingCategories,
    weeklyFlow,
    recentTransactions,
    savingsGoals,
    portfolioAllocation,
    topMerchants,
    netWorthProjection,
  } = useFinance();

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">

      {/* ─── Insight Bar ──────────────────────────────── */}
      <InsightBar />

      {/* ─── Summary Stats ────────────────────────────── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Balance"
          current={summaryStats.totalBalance}
          previous={summaryStats.previousBalance}
          icon="💰"
          color="cyan"
          delay={0}
        />
        <StatCard
          title="Monthly Income"
          current={summaryStats.income}
          previous={summaryStats.previousIncome}
          icon="📈"
          color="green"
          delay={100}
        />
        <StatCard
          title="Monthly Expenses"
          current={summaryStats.expenses}
          previous={summaryStats.previousExpenses}
          icon="💳"
          color="red"
          delay={200}
          invert
        />
        <StatCard
          title="Total Savings"
          current={summaryStats.savings}
          previous={summaryStats.previousSavings}
          icon="🏦"
          color="purple"
          delay={300}
        />
      </div>

      {/* ─── Main Charts Row ──────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <BalanceTrendChart data={balanceTrend} />
        </div>
        <div>
          <SpendingChart data={spendingCategories} />
        </div>
      </div>

      {/* ─── Secondary Row ────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RecentTransactions data={recentTransactions} />
        </div>
        <div className="space-y-4">
          <WeeklyCashFlow data={weeklyFlow} />
          <PortfolioWidget data={portfolioAllocation} />
        </div>
      </div>

      {/* ─── Bottom Row ───────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div>
          <SavingsGoals data={savingsGoals} />
        </div>
        <div>
          <TopMerchants data={topMerchants} />
        </div>
        <div>
          <NetWorthProjection data={netWorthProjection} />
        </div>
      </div>
    </div>
  );
}
