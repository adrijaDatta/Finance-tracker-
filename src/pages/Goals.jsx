import React, { useState } from 'react';
import {
  Target, Plus, Edit2, Trash2, CheckCircle, Clock,
  TrendingUp, Calendar, DollarSign, X, Save,
} from 'lucide-react';
import { useRole } from '../context/RoleContext';

const initGoals = [
  { id: 1, name: 'Emergency Fund', target: 25000, current: 18500, color: '#00D4FF', icon: '🛡️', deadline: '2025-03-31', category: 'Safety', monthlyContrib: 1200 },
  { id: 2, name: 'Japan Trip', target: 8000, current: 5200, color: '#00FF87', icon: '✈️', deadline: '2025-06-30', category: 'Travel', monthlyContrib: 600 },
  { id: 3, name: 'New MacBook Pro', target: 3500, current: 3500, color: '#FFB800', icon: '💻', deadline: '2024-12-01', category: 'Tech', monthlyContrib: 0 },
  { id: 4, name: 'Investment Fund', target: 50000, current: 22000, color: '#7B5EA7', icon: '📈', deadline: '2025-12-31', category: 'Investment', monthlyContrib: 2000 },
  { id: 5, name: 'Home Down Payment', target: 80000, current: 12000, color: '#FF6B9D', icon: '🏠', deadline: '2027-01-01', category: 'Housing', monthlyContrib: 2500 },
];

const iconOptions = ['🛡️','✈️','💻','📈','🏠','🚗','🎓','💍','⛵','🎸','🏋️','🌍'];
const colorOptions = ['#00D4FF','#00FF87','#FFB800','#7B5EA7','#FF6B9D','#FF4757','#45B7D1','#96CEB4'];
const categories = ['Safety','Travel','Tech','Investment','Housing','Vehicle','Education','Lifestyle'];

const emptyGoal = { name: '', target: '', current: '', color: '#00D4FF', icon: '🎯', deadline: '', category: 'Lifestyle', monthlyContrib: '' };

export default function Goals() {
  const { permissions } = useRole();
  const [goals, setGoals] = useState(initGoals);
  const [editingGoal, setEditingGoal] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(emptyGoal);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const totalSaved = goals.reduce((s, g) => s + g.current, 0);
  const totalTarget = goals.reduce((s, g) => s + g.target, 0);
  const achieved = goals.filter(g => g.current >= g.target).length;

  const openNew = () => {
    setFormData(emptyGoal);
    setEditingGoal(null);
    setShowForm(true);
  };

  const openEdit = (goal) => {
    setFormData({ ...goal, target: String(goal.target), current: String(goal.current), monthlyContrib: String(goal.monthlyContrib) });
    setEditingGoal(goal.id);
    setShowForm(true);
  };

  const saveGoal = () => {
    if (!formData.name || !formData.target) return;
    if (editingGoal) {
      setGoals(gs => gs.map(g => g.id === editingGoal ? { ...g, ...formData, target: +formData.target, current: +formData.current, monthlyContrib: +formData.monthlyContrib } : g));
    } else {
      setGoals(gs => [...gs, { ...formData, id: Date.now(), target: +formData.target, current: +formData.current || 0, monthlyContrib: +formData.monthlyContrib || 0 }]);
    }
    setShowForm(false);
  };

  const deleteGoal = (id) => {
    setGoals(gs => gs.filter(g => g.id !== id));
    setDeleteConfirm(null);
  };

  const monthsToGoal = (g) => {
    if (g.current >= g.target || !g.monthlyContrib) return null;
    return Math.ceil((g.target - g.current) / g.monthlyContrib);
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-white">Savings Goals</h2>
          <p className="text-sm text-slate-500 mt-0.5 font-mono">Track your financial milestones</p>
        </div>
        {permissions.canAdd && (
          <button
            onClick={openNew}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-cyan text-bg-primary font-semibold text-sm hover:opacity-90 transition-all"
          >
            <Plus size={14} />
            New Goal
          </button>
        )}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Total Saved', value: `$${totalSaved.toLocaleString()}`, color: 'text-accent-cyan', icon: '💰' },
          { label: 'Total Target', value: `$${totalTarget.toLocaleString()}`, color: 'text-white', icon: '🎯' },
          { label: 'Overall Progress', value: `${((totalSaved/totalTarget)*100).toFixed(0)}%`, color: 'text-accent-green', icon: '📊' },
          { label: 'Goals Achieved', value: `${achieved} / ${goals.length}`, color: 'text-accent-amber', icon: '🏆' },
        ].map((s, i) => (
          <div key={i} className="glass-card p-5 animate-fade-up" style={{ animationDelay: `${i*60}ms`, animationFillMode: 'both' }}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">{s.label}</p>
              <span className="text-lg">{s.icon}</span>
            </div>
            <p className={`font-display text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Overall Progress Bar */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-white">Overall Progress Across All Goals</p>
          <p className="text-sm font-mono text-accent-cyan">{((totalSaved/totalTarget)*100).toFixed(1)}%</p>
        </div>
        <div className="h-4 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${(totalSaved/totalTarget)*100}%`, background: 'linear-gradient(90deg, #7B5EA7, #00D4FF, #00FF87)' }}
          />
        </div>
        <div className="flex justify-between mt-1.5 text-xs text-slate-600 font-mono">
          <span>$0</span>
          <span>${totalTarget.toLocaleString()}</span>
        </div>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {goals.map(goal => {
          const pct = Math.min((goal.current / goal.target) * 100, 100);
          const done = goal.current >= goal.target;
          const months = monthsToGoal(goal);
          const deadline = new Date(goal.deadline);
          const overdue = !done && deadline < new Date();

          return (
            <div key={goal.id} className={`glass-card p-6 relative overflow-hidden transition-all hover:border-white/10 animate-fade-up`}
              style={{ animationFillMode: 'both' }}>
              {done && (
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1 bg-accent-green/20 border border-accent-green/30 text-accent-green px-2 py-1 rounded-full text-[10px] font-mono">
                    <CheckCircle size={10} />
                    Achieved!
                  </div>
                </div>
              )}

              {/* Icon & Title */}
              <div className="flex items-start gap-3 mb-4">
                <div className="text-3xl">{goal.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-base font-semibold text-white truncate">{goal.name}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-mono text-slate-500 bg-white/5 px-2 py-0.5 rounded">{goal.category}</span>
                    {overdue && <span className="text-[10px] font-mono bg-accent-red/20 text-accent-red px-2 py-0.5 rounded">Overdue</span>}
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span style={{ color: goal.color }}>${goal.current.toLocaleString()}</span>
                  <span className="text-slate-500">of ${goal.target.toLocaleString()}</span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, background: done ? '#00FF87' : goal.color }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-[10px] text-slate-600 font-mono">
                  <span>{pct.toFixed(0)}% complete</span>
                  <span>${(goal.target - goal.current).toLocaleString()} remaining</span>
                </div>
              </div>

              {/* Meta */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-white/3 rounded-lg p-2.5">
                  <p className="text-[10px] text-slate-500 font-mono">Deadline</p>
                  <p className="text-xs text-white font-medium mt-0.5">{deadline.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                </div>
                <div className="bg-white/3 rounded-lg p-2.5">
                  <p className="text-[10px] text-slate-500 font-mono">Monthly</p>
                  <p className="text-xs text-white font-medium mt-0.5">{goal.monthlyContrib > 0 ? `$${goal.monthlyContrib.toLocaleString()}` : '—'}</p>
                </div>
              </div>

              {months && !done && (
                <div className="flex items-center gap-1.5 text-xs text-accent-cyan font-mono mb-4">
                  <Clock size={11} />
                  ~{months} months to goal at current rate
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                {permissions.canEdit && (
                  <button
                    onClick={() => openEdit(goal)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-border-subtle text-slate-400 hover:text-accent-cyan hover:border-accent-cyan/30 text-xs transition-all"
                  >
                    <Edit2 size={11} />
                    Edit
                  </button>
                )}
                {permissions.canDelete && (
                  <button
                    onClick={() => setDeleteConfirm(goal.id)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-border-subtle text-slate-400 hover:text-accent-red hover:border-accent-red/30 text-xs transition-all"
                  >
                    <Trash2 size={11} />
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {/* Add New Placeholder */}
        {permissions.canAdd && (
          <button
            onClick={openNew}
            className="glass-card p-6 border-dashed flex flex-col items-center justify-center gap-3 min-h-[200px] text-slate-600 hover:text-accent-cyan hover:border-accent-cyan/30 transition-all"
          >
            <div className="w-12 h-12 rounded-xl border-2 border-dashed border-current flex items-center justify-center">
              <Plus size={20} />
            </div>
            <p className="text-sm font-medium">Add New Goal</p>
          </button>
        )}
      </div>

      {/* Goal Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card-elevated w-full max-w-lg p-6 animate-fade-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-lg font-bold text-white">{editingGoal ? 'Edit Goal' : 'New Goal'}</h3>
              <button onClick={() => setShowForm(false)} className="text-slate-500 hover:text-white"><X size={18} /></button>
            </div>

            <div className="space-y-4">
              {/* Icon Picker */}
              <div>
                <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-2">Icon</label>
                <div className="flex flex-wrap gap-2">
                  {iconOptions.map(ic => (
                    <button key={ic} onClick={() => setFormData(d => ({ ...d, icon: ic }))}
                      className={`w-10 h-10 rounded-xl text-xl transition-all ${formData.icon === ic ? 'bg-accent-cyan/20 border border-accent-cyan/40 scale-110' : 'bg-white/5 hover:bg-white/10'}`}
                    >{ic}</button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-2">Goal Name</label>
                <input value={formData.name} onChange={e => setFormData(d => ({ ...d, name: e.target.value }))}
                  placeholder="e.g. Dream Vacation"
                  className="w-full bg-bg-elevated border border-border-subtle rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-cyan/40 placeholder-slate-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-2">Target ($)</label>
                  <input type="number" value={formData.target} onChange={e => setFormData(d => ({ ...d, target: e.target.value }))}
                    placeholder="10000"
                    className="w-full bg-bg-elevated border border-border-subtle rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-cyan/40 placeholder-slate-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-2">Current ($)</label>
                  <input type="number" value={formData.current} onChange={e => setFormData(d => ({ ...d, current: e.target.value }))}
                    placeholder="0"
                    className="w-full bg-bg-elevated border border-border-subtle rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-cyan/40 placeholder-slate-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-2">Deadline</label>
                  <input type="date" value={formData.deadline} onChange={e => setFormData(d => ({ ...d, deadline: e.target.value }))}
                    className="w-full bg-bg-elevated border border-border-subtle rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-cyan/40"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-2">Monthly ($)</label>
                  <input type="number" value={formData.monthlyContrib} onChange={e => setFormData(d => ({ ...d, monthlyContrib: e.target.value }))}
                    placeholder="500"
                    className="w-full bg-bg-elevated border border-border-subtle rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-cyan/40 placeholder-slate-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-2">Category</label>
                <select value={formData.category} onChange={e => setFormData(d => ({ ...d, category: e.target.value }))}
                  className="select-enhanced w-full py-3 text-sm"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Color Picker */}
              <div>
                <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-2">Color</label>
                <div className="flex gap-2">
                  {colorOptions.map(col => (
                    <button key={col} onClick={() => setFormData(d => ({ ...d, color: col }))}
                      className={`w-8 h-8 rounded-full transition-all ${formData.color === col ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-bg-elevated' : ''}`}
                      style={{ background: col }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)}
                className="flex-1 py-3 rounded-xl border border-border-subtle text-slate-400 hover:text-white text-sm transition-all">
                Cancel
              </button>
              <button onClick={saveGoal}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-accent-cyan text-bg-primary font-semibold text-sm hover:opacity-90 transition-all">
                <Save size={14} />
                {editingGoal ? 'Update Goal' : 'Create Goal'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card-elevated w-full max-w-sm p-6 animate-fade-up">
            <h3 className="font-display text-lg font-bold text-white mb-2">Delete Goal</h3>
            <p className="text-sm text-slate-400 mb-6">Are you sure? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-3 rounded-xl border border-border-subtle text-slate-400 hover:text-white text-sm transition-all">
                Cancel
              </button>
              <button onClick={() => deleteGoal(deleteConfirm)}
                className="flex-1 py-3 rounded-xl bg-accent-red/20 border border-accent-red/30 text-accent-red font-semibold text-sm hover:opacity-90 transition-all">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
