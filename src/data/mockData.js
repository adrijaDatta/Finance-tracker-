// ─── Summary Stats ───────────────────────────────────────────────
export const summaryStats = {
  totalBalance: 66000,
  previousBalance: 58400,
  income: 44000,
  previousIncome: 39500,
  expenses: 22000,
  previousExpenses: 24800,
  savings: 8200,
  previousSavings: 6900,
  investmentReturn: 3.8,
};

// ─── Balance Trend (12 months) ───────────────────────────────────
export const balanceTrend = [
  { month: 'Jan', balance: 42000, income: 38000, expenses: 21000 },
  { month: 'Feb', balance: 45500, income: 40000, expenses: 19500 },
  { month: 'Mar', balance: 43000, income: 37500, expenses: 23000 },
  { month: 'Apr', balance: 47800, income: 41000, expenses: 20500 },
  { month: 'May', balance: 50200, income: 43000, expenses: 22000 },
  { month: 'Jun', balance: 49000, income: 39500, expenses: 24800 },
  { month: 'Jul', balance: 52500, income: 42000, expenses: 21500 },
  { month: 'Aug', balance: 55000, income: 44500, expenses: 20000 },
  { month: 'Sep', balance: 57800, income: 46000, expenses: 22500 },
  { month: 'Oct', balance: 59400, income: 43000, expenses: 21000 },
  { month: 'Nov', balance: 62000, income: 45000, expenses: 20000 },
  { month: 'Dec', balance: 66000, income: 44000, expenses: 22000 },
];

// ─── Spending Breakdown ──────────────────────────────────────────
export const spendingCategories = [
  { name: 'Housing',      value: 6800, color: '#00D4FF', icon: '🏠', budget: 7000 },
  { name: 'Food',         value: 3200, color: '#00FF87', icon: '🍔', budget: 3500 },
  { name: 'Transport',    value: 2100, color: '#FFB800', icon: '🚗', budget: 2500 },
  { name: 'Healthcare',   value: 1800, color: '#7B5EA7', icon: '💊', budget: 2000 },
  { name: 'Shopping',     value: 4200, color: '#FF4757', icon: '🛍️', budget: 4000 },
  { name: 'Utilities',    value: 1400, color: '#FF6B9D', icon: '⚡', budget: 1500 },
  { name: 'Entertainment',value: 1600, color: '#45B7D1', icon: '🎬', budget: 2000 },
  { name: 'Savings',      value: 8200, color: '#96CEB4', icon: '💰', budget: 8000 },
];

// ─── Weekly Cash Flow ────────────────────────────────────────────
export const weeklyFlow = [
  { day: 'Mon', inflow: 2400, outflow: 1800 },
  { day: 'Tue', inflow: 1200, outflow: 2100 },
  { day: 'Wed', inflow: 3100, outflow: 1400 },
  { day: 'Thu', inflow: 800,  outflow: 2600 },
  { day: 'Fri', inflow: 4200, outflow: 1900 },
  { day: 'Sat', inflow: 1600, outflow: 3200 },
  { day: 'Sun', inflow: 900,  outflow: 1100 },
];

// ─── Recent Transactions ─────────────────────────────────────────
export const recentTransactions = [
  { id: 1,  merchant: 'Netflix',         category: 'Entertainment', amount: -15.99,  date: '2024-12-28', icon: '🎬', status: 'completed' },
  { id: 2,  merchant: 'Salary Deposit',  category: 'Income',        amount: 5800.00, date: '2024-12-27', icon: '💼', status: 'completed' },
  { id: 3,  merchant: 'Whole Foods',     category: 'Food',          amount: -124.50, date: '2024-12-26', icon: '🛒', status: 'completed' },
  { id: 4,  merchant: 'AWS Services',    category: 'Utilities',     amount: -89.00,  date: '2024-12-25', icon: '☁️', status: 'completed' },
  { id: 5,  merchant: 'Freelance – UI',  category: 'Income',        amount: 2400.00, date: '2024-12-24', icon: '💻', status: 'completed' },
  { id: 6,  merchant: 'Uber Eats',       category: 'Food',          amount: -38.20,  date: '2024-12-23', icon: '🍕', status: 'completed' },
  { id: 7,  merchant: 'Tesla Insurance', category: 'Transport',     amount: -210.00, date: '2024-12-22', icon: '🚗', status: 'pending'   },
  { id: 8,  merchant: 'Apple Store',     category: 'Shopping',      amount: -999.00, date: '2024-12-21', icon: '🍎', status: 'completed' },
];

// ─── Savings Goals ───────────────────────────────────────────────
export const savingsGoals = [
  { id: 1, name: 'Emergency Fund',  target: 25000, current: 18500, color: '#00D4FF', icon: '🛡️', deadline: 'Mar 2025' },
  { id: 2, name: 'Japan Trip',      target: 8000,  current: 5200,  color: '#00FF87', icon: '✈️', deadline: 'Jun 2025' },
  { id: 3, name: 'New MacBook Pro', target: 3500,  current: 3500,  color: '#FFB800', icon: '💻', deadline: 'Achieved!' },
  { id: 4, name: 'Investment Fund', target: 50000, current: 22000, color: '#7B5EA7', icon: '📈', deadline: 'Dec 2025' },
];

// ─── Portfolio Allocation ─────────────────────────────────────────
export const portfolioAllocation = [
  { name: 'Stocks',  value: 45, color: '#00D4FF' },
  { name: 'ETFs',    value: 25, color: '#00FF87' },
  { name: 'Crypto',  value: 15, color: '#FFB800' },
  { name: 'Bonds',   value: 10, color: '#7B5EA7' },
  { name: 'Cash',    value: 5,  color: '#FF6B9D' },
];

// ─── Spending Heatmap (last 7 weeks × 7 days) ───────────────────
export const spendingHeatmap = Array.from({ length: 7 }, (_, week) =>
  Array.from({ length: 7 }, (_, day) => ({
    week,
    day,
    value: Math.floor(Math.random() * 500) + 50,
  }))
).flat();

// ─── Net Worth Projection ────────────────────────────────────────
export const netWorthProjection = [
  { month: 'Jan', actual: 66000, projected: 66000 },
  { month: 'Feb', actual: null,  projected: 68500 },
  { month: 'Mar', actual: null,  projected: 71200 },
  { month: 'Apr', actual: null,  projected: 74100 },
  { month: 'May', actual: null,  projected: 77300 },
  { month: 'Jun', actual: null,  projected: 80800 },
];

// ─── Top Merchants ───────────────────────────────────────────────
export const topMerchants = [
  { name: 'Amazon',    total: 1840, count: 12, icon: '📦', trend: +12 },
  { name: 'Whole Foods', total: 980, count: 8, icon: '🥦', trend: -5 },
  { name: 'Uber',      total: 640,  count: 22, icon: '🚗', trend: +3  },
  { name: 'Netflix',   total: 192,  count: 12, icon: '🎬', trend: 0   },
  { name: 'Starbucks', total: 284,  count: 18, icon: '☕', trend: +8  },
];
