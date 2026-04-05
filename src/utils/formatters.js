export const formatCurrency = (value, compact = false) => {
  if (compact && Math.abs(value) >= 1000) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatPercent = (value, decimals = 1) =>
  `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`;

export const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const calcChange = (current, previous) =>
  (((current - previous) / previous) * 100).toFixed(1);

export const clsx = (...args) =>
  args.filter(Boolean).join(' ');
