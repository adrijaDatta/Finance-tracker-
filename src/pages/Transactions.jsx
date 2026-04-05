import React, { useState, useMemo } from 'react';
import {
  Search, Plus, Download, ArrowUpDown, ArrowUp, ArrowDown,
  Pencil, Trash2, Clock, CheckCircle, Filter, X, Lock,
} from 'lucide-react';
import { allTransactions, CATEGORIES, STATUSES } from '../data/transactions';
import { formatCurrency, formatDate } from '../utils/formatters';
import { useRole } from '../context/RoleContext';
import TransactionModal from '../components/ui/TransactionModal';

const SORT_FIELDS = { date: 'Date', amount: 'Amount', merchant: 'Merchant' };

function SortButton({ field, active, dir, onClick }) {
  const Icon = !active ? ArrowUpDown : dir === 'asc' ? ArrowUp : ArrowDown;
  return (
    <button
      onClick={() => onClick(field)}
      className={`flex items-center gap-1 text-xs font-mono transition-colors ${active ? 'text-accent-cyan' : 'text-slate-600 hover:text-slate-400'}`}
    >
      {SORT_FIELDS[field]} <Icon size={11} />
    </button>
  );
}

export default function Transactions() {
  const { permissions, roleInfo } = useRole();

  // data state
  const [data, setData]             = useState(allTransactions);
  const [search, setSearch]         = useState('');
  const [filterCat, setFilterCat]   = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortField, setSortField]   = useState('date');
  const [sortDir, setSortDir]       = useState('desc');
  const [page, setPage]             = useState(1);
  const [selected, setSelected]     = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);

  // modal state
  const [modal, setModal] = useState({ open: false, initial: null });

  const PER_PAGE = 10;

  // ── sort handler ─────────────────────────────────────────────
  const handleSort = (field) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('desc'); }
    setPage(1);
  };

  // ── filtered + sorted data ───────────────────────────────────
  const processed = useMemo(() => {
    let rows = [...data];

    if (search) {
      const q = search.toLowerCase();
      rows = rows.filter(t =>
        t.merchant.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.note.toLowerCase().includes(q)
      );
    }
    if (filterCat    !== 'All') rows = rows.filter(t => t.category === filterCat);
    if (filterType   !== 'All') rows = rows.filter(t => t.type === filterType);
    if (filterStatus !== 'All') rows = rows.filter(t => t.status === filterStatus);

    rows.sort((a, b) => {
      let av = a[sortField], bv = b[sortField];
      if (sortField === 'amount') { av = Math.abs(av); bv = Math.abs(bv); }
      if (sortField === 'date')   { av = new Date(av); bv = new Date(bv); }
      if (typeof av === 'string') av = av.toLowerCase();
      if (typeof bv === 'string') bv = bv.toLowerCase();
      return sortDir === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
    });

    return rows;
  }, [data, search, filterCat, filterType, filterStatus, sortField, sortDir]);

  const totalPages = Math.max(1, Math.ceil(processed.length / PER_PAGE));
  const pageData   = processed.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // ── summary stats ────────────────────────────────────────────
  const totalIncome  = processed.filter(t => t.type === 'income') .reduce((s, t) => s + t.amount, 0);
  const totalExpense = processed.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const netFlow      = totalIncome + totalExpense;

  // ── CRUD handlers ────────────────────────────────────────────
  const handleSave = (tx) => {
    setData(prev => {
      const idx = prev.findIndex(t => t.id === tx.id);
      if (idx >= 0) { const next = [...prev]; next[idx] = tx; return next; }
      return [tx, ...prev];
    });
  };

  const handleDelete = (id) => {
    if (!permissions.canDelete) return;
    setData(prev => prev.filter(t => t.id !== id));
    setSelected(s => { const n = new Set(s); n.delete(id); return n; });
  };

  const handleBulkDelete = () => {
    if (!permissions.canDelete) return;
    setData(prev => prev.filter(t => !selected.has(t.id)));
    setSelected(new Set());
  };

  const handleExport = () => {
    const csv = [
      ['Date', 'Merchant', 'Category', 'Type', 'Amount', 'Status', 'Note'],
      ...processed.map(t => [t.date, t.merchant, t.category, t.type, t.amount, t.status, t.note]),
    ].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a    = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'transactions.csv'; a.click();
  };

  const toggleSelect = (id) => setSelected(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleAll    = () => setSelected(s => s.size === pageData.length ? new Set() : new Set(pageData.map(t => t.id)));
  const clearFilters = () => { setSearch(''); setFilterCat('All'); setFilterType('All'); setFilterStatus('All'); setPage(1); };
  const hasFilters   = search || filterCat !== 'All' || filterType !== 'All' || filterStatus !== 'All';

  // Determine column template based on permissions
  const colTemplate = permissions.canDelete
    ? (permissions.canEdit || permissions.canDelete)
      ? 'grid-cols-[20px,minmax(140px,1fr),100px,80px,90px,90px,72px]'
      : 'grid-cols-[20px,minmax(140px,1fr),100px,80px,90px,90px]'
    : (permissions.canEdit || permissions.canDelete)
      ? 'grid-cols-[minmax(140px,1fr),100px,80px,90px,90px,72px]'
      : 'grid-cols-[minmax(140px,1fr),100px,80px,90px,90px]';

  return (
    <div className="p-4 sm:p-6 space-y-5 max-w-[1400px] mx-auto">

      {/* ── Role Banner ──────────────────────────────────────── */}
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm ${roleInfo.bg} ${roleInfo.color} animate-fade-up`}>
        <span className="text-lg">{roleInfo.icon}</span>
        <div className="flex-1 min-w-0">
          <span className="font-medium">{roleInfo.label} Mode</span>
          <span className="text-xs opacity-70 ml-2 font-mono hidden sm:inline">
            {permissions.canAdd ? '+ Add' : ''} {permissions.canEdit ? '✎ Edit' : ''} {permissions.canDelete ? '✕ Delete' : ''} {permissions.canExport ? '↓ Export' : ''}
            {!permissions.canAdd && !permissions.canEdit ? '— Read only access' : ''}
          </span>
        </div>
        {!permissions.canAdd && <Lock size={13} className="opacity-60 flex-shrink-0" />}
      </div>

      {/* ── Summary Cards ─────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 animate-fade-up" style={{ animationDelay: '50ms', animationFillMode: 'both' }}>
        {[
          { label: 'Total Income',   value: totalIncome,  color: 'text-accent-green', bg: 'bg-accent-green/10 border-accent-green/20' },
          { label: 'Total Expenses', value: totalExpense, color: 'text-accent-red',   bg: 'bg-accent-red/10   border-accent-red/20'   },
          { label: 'Net Flow',       value: netFlow,      color: netFlow >= 0 ? 'text-accent-cyan' : 'text-accent-red', bg: 'bg-bg-elevated border-border-subtle' },
        ].map(s => (
          <div key={s.label} className={`glass-card p-3 sm:p-4 border ${s.bg}`}>
            <p className="text-[10px] sm:text-xs font-mono text-slate-500 mb-1 truncate">{s.label}</p>
            <p className={`font-display text-base sm:text-xl font-bold ${s.color} break-all`}>
              {formatCurrency(s.value)}
            </p>
            <p className="text-[10px] text-slate-600 font-mono mt-1 hidden sm:block">{processed.length} transactions</p>
          </div>
        ))}
      </div>

      {/* ── Toolbar ───────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 animate-fade-up" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
        {/* Search */}
        <div className="flex items-center gap-2 bg-bg-elevated border border-border-subtle rounded-xl px-3 py-2 flex-1 min-w-[160px] group focus-within:border-accent-cyan/40 transition-colors">
          <Search size={13} className="text-slate-500 group-focus-within:text-accent-cyan transition-colors flex-shrink-0" />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search..."
            className="bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none w-full min-w-0"
          />
          {search && <button onClick={() => setSearch('')}><X size={12} className="text-slate-500 hover:text-white" /></button>}
        </div>

        {/* Filter toggle */}
        <button
          onClick={() => setShowFilters(f => !f)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-mono transition-all whitespace-nowrap ${showFilters || hasFilters ? 'border-accent-cyan/40 text-accent-cyan bg-accent-cyan/5' : 'border-border-subtle text-slate-400 hover:text-white'}`}
        >
          <Filter size={13} /> <span className="hidden sm:inline">Filters</span> {hasFilters && <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />}
        </button>

        {/* Sort buttons */}
        <div className="flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-xl border border-border-subtle">
          {Object.keys(SORT_FIELDS).map(f => (
            <SortButton key={f} field={f} active={sortField === f} dir={sortDir} onClick={handleSort} />
          ))}
        </div>

        <div className="flex-1 hidden sm:block" />

        {/* Bulk delete */}
        {selected.size > 0 && permissions.canDelete && (
          <button
            onClick={handleBulkDelete}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-accent-red/30 bg-accent-red/10 text-accent-red text-xs font-mono hover:bg-accent-red/20 transition-all whitespace-nowrap"
          >
            <Trash2 size={12} /> Delete ({selected.size})
          </button>
        )}

        {/* Export */}
        {permissions.canExport ? (
          <button onClick={handleExport} className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border-subtle text-xs font-mono text-slate-400 hover:text-white hover:border-white/20 transition-all whitespace-nowrap">
            <Download size={13} /> <span className="hidden sm:inline">Export CSV</span>
          </button>
        ) : (
          <button disabled className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border-subtle text-xs font-mono text-slate-700 cursor-not-allowed opacity-50 whitespace-nowrap" title="Viewer cannot export">
            <Lock size={12} /> <span className="hidden sm:inline">Export</span>
          </button>
        )}

        {/* Add */}
        {permissions.canAdd ? (
          <button onClick={() => setModal({ open: true, initial: null })} className="btn-primary flex items-center gap-1.5 whitespace-nowrap">
            <Plus size={14} /> <span className="hidden sm:inline">Add</span><span className="sm:hidden">+</span>
          </button>
        ) : (
          <button disabled className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 text-slate-600 text-sm cursor-not-allowed opacity-60 whitespace-nowrap" title="Viewer cannot add">
            <Lock size={13} />
          </button>
        )}
      </div>

      {/* ── Filter Panel ──────────────────────────────────────── */}
      {showFilters && (
        <div className="glass-card p-4 flex flex-wrap gap-3 sm:gap-4 items-center animate-slide-in">
          <div className="flex items-center gap-2">
            <label className="text-xs font-mono text-slate-500 whitespace-nowrap">Category</label>
            <select className="select-enhanced text-xs w-32 sm:w-36"
              value={filterCat} onChange={e => { setFilterCat(e.target.value); setPage(1); }}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-mono text-slate-500 whitespace-nowrap">Type</label>
            <select className="select-enhanced text-xs w-24 sm:w-28"
              value={filterType} onChange={e => { setFilterType(e.target.value); setPage(1); }}>
              {['All', 'income', 'expense'].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-mono text-slate-500 whitespace-nowrap">Status</label>
            <select className="select-enhanced text-xs w-24 sm:w-28"
              value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(1); }}>
              {STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          {hasFilters && (
            <button onClick={clearFilters} className="flex items-center gap-1 text-xs text-accent-red font-mono hover:text-accent-red/80 transition-colors ml-auto">
              <X size={11} /> Clear all
            </button>
          )}
        </div>
      )}

      {/* ── Table ─────────────────────────────────────────────── */}
      <div className="glass-card animate-fade-up" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
        {/* Scrollable wrapper for mobile */}
        <div className="overflow-x-auto overflow-y-visible">
          <div style={{ minWidth: '640px' }}>
            {/* Table header */}
            <div className={`grid ${colTemplate} gap-3 px-4 sm:px-5 py-3 border-b border-border-subtle text-[10px] font-mono text-slate-600 uppercase tracking-widest items-center`}>
              {permissions.canDelete && (
                <input type="checkbox"
                  checked={selected.size === pageData.length && pageData.length > 0}
                  onChange={toggleAll}
                  className="accent-accent-cyan w-3.5 h-3.5 cursor-pointer"
                />
              )}
              <span>Merchant</span>
              <span>Category</span>
              <span>Date</span>
              <span>Status</span>
              <span className="text-right">Amount</span>
              {(permissions.canEdit || permissions.canDelete) && <span>Actions</span>}
            </div>

            {/* Rows */}
            {pageData.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-slate-600">
                <span className="text-4xl mb-3">🔍</span>
                <p className="text-sm font-medium text-slate-500">No transactions found</p>
                <p className="text-xs font-mono mt-1">Try adjusting your filters</p>
                {hasFilters && <button onClick={clearFilters} className="mt-3 text-xs text-accent-cyan font-mono hover:underline">Clear filters</button>}
              </div>
            ) : pageData.map((tx, i) => {
              const isIncome = tx.type === 'income';
              const isSel    = selected.has(tx.id);
              return (
                <div
                  key={tx.id}
                  className={`grid ${colTemplate} gap-3 px-4 sm:px-5 py-3.5 border-b border-border-subtle items-center transition-all duration-150 group
                    ${isSel ? 'bg-accent-cyan/5' : 'hover:bg-white/3'}
                    animate-fade-up`}
                  style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }}
                >
                  {/* Checkbox */}
                  {permissions.canDelete && (
                    <input type="checkbox" checked={isSel} onChange={() => toggleSelect(tx.id)}
                      className="accent-accent-cyan w-3.5 h-3.5 cursor-pointer" />
                  )}

                  {/* Merchant */}
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0 border ${
                      isIncome ? 'bg-accent-green/10 border-accent-green/20' : 'bg-bg-elevated border-border-subtle'
                    }`}>{tx.icon}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate group-hover:text-accent-cyan transition-colors">{tx.merchant}</p>
                      {tx.note && <p className="text-[10px] text-slate-600 truncate font-mono">{tx.note}</p>}
                    </div>
                  </div>

                  {/* Category */}
                  <span className="text-xs font-mono px-2 py-1 rounded-lg bg-bg-elevated text-slate-400 whitespace-nowrap w-fit max-w-full truncate">{tx.category}</span>

                  {/* Date */}
                  <span className="text-xs font-mono text-slate-500 whitespace-nowrap">{formatDate(tx.date)}</span>

                  {/* Status */}
                  <span className={`flex items-center gap-1 text-[10px] font-mono whitespace-nowrap ${
                    tx.status === 'completed' ? 'text-accent-green' : 'text-accent-amber'
                  }`}>
                    {tx.status === 'completed'
                      ? <CheckCircle size={10} />
                      : <Clock size={10} />
                    }
                    {tx.status}
                  </span>

                  {/* Amount — always right-aligned, no wrap */}
                  <span className={`text-sm font-mono font-semibold text-right whitespace-nowrap ${isIncome ? 'text-accent-green' : 'text-white'}`}>
                    {isIncome ? '+' : ''}{formatCurrency(tx.amount)}
                  </span>

                  {/* Actions */}
                  {(permissions.canEdit || permissions.canDelete) ? (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {permissions.canEdit && (
                        <button
                          onClick={() => setModal({ open: true, initial: tx })}
                          className="w-7 h-7 rounded-lg bg-accent-cyan/10 text-accent-cyan hover:bg-accent-cyan/20 flex items-center justify-center transition-all"
                        >
                          <Pencil size={11} />
                        </button>
                      )}
                      {permissions.canDelete && (
                        <button
                          onClick={() => handleDelete(tx.id)}
                          className="w-7 h-7 rounded-lg bg-accent-red/10 text-accent-red hover:bg-accent-red/20 flex items-center justify-center transition-all"
                        >
                          <Trash2 size={11} />
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="w-16" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 flex-wrap gap-2">
          <p className="text-xs font-mono text-slate-600">
            {processed.length === 0 ? '0' : `${(page - 1) * PER_PAGE + 1}–${Math.min(page * PER_PAGE, processed.length)}`} of {processed.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-2 sm:px-3 py-1 rounded-lg text-xs font-mono border border-border-subtle text-slate-400 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >← Prev</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
              .reduce((acc, p, i, arr) => {
                if (i > 0 && p - arr[i - 1] > 1) acc.push('…');
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) => p === '…'
                ? <span key={`ellipsis-${i}`} className="px-2 text-slate-600 text-xs">…</span>
                : <button key={p} onClick={() => setPage(p)}
                    className={`w-7 h-7 rounded-lg text-xs font-mono transition-all ${page === p ? 'bg-accent-cyan text-bg-primary font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                  >{p}</button>
              )
            }
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-2 sm:px-3 py-1 rounded-lg text-xs font-mono border border-border-subtle text-slate-400 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >Next →</button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <TransactionModal
        open={modal.open}
        initial={modal.initial}
        onClose={() => setModal({ open: false, initial: null })}
        onSave={handleSave}
      />
    </div>
  );
}
