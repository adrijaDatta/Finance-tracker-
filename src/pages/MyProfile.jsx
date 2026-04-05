import React, { useState } from 'react';
import {
  User, Mail, Phone, MapPin, Calendar, Edit2, Trash2,
  Camera, Save, X, Shield, Award, TrendingUp, CheckCircle,
  AlertTriangle, LogOut, Key,
} from 'lucide-react';
import { useRole } from '../context/RoleContext';

const initProfile = {
  name: 'Alex Kim',
  email: 'alex@moneta.io',
  phone: '+1 (555) 234-5678',
  location: 'San Francisco, CA',
  joined: 'January 2023',
  avatar: 'AK',
  bio: 'Finance enthusiast and software engineer. Passionate about building wealth through smart spending and investing.',
  occupation: 'Senior Software Engineer',
  company: 'TechCorp Inc.',
};

const achievements = [
  { icon: '🏆', label: 'First Goal Achieved', date: 'Dec 2024', color: 'text-accent-amber' },
  { icon: '📈', label: '6-Month Streak', date: 'Nov 2024', color: 'text-accent-cyan' },
  { icon: '💰', label: '$50K Saved', date: 'Oct 2024', color: 'text-accent-green' },
  { icon: '🛡️', label: 'Emergency Fund Complete', date: 'Sep 2024', color: 'text-accent-purple' },
];

const activityLog = [
  { action: 'Logged in from new device', time: '2 hours ago', icon: Key, color: 'text-accent-amber' },
  { action: 'Updated savings goal', time: '1 day ago', icon: TrendingUp, color: 'text-accent-cyan' },
  { action: 'Added transaction', time: '2 days ago', icon: CheckCircle, color: 'text-accent-green' },
  { action: 'Changed password', time: '5 days ago', icon: Shield, color: 'text-accent-purple' },
];

export default function MyProfile() {
  const { permissions } = useRole();
  const [profile, setProfile] = useState(initProfile);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState(initProfile);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteStep, setDeleteStep] = useState(1);
  const [deleteInput, setDeleteInput] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setProfile(editData);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = () => {
    if (deleteStep === 1) { setDeleteStep(2); return; }
    if (deleteInput === 'DELETE') {
      alert('Account deletion requested. You will be logged out.');
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-white">My Profile</h2>
          <p className="text-sm text-slate-500 mt-0.5 font-mono">Manage your personal information</p>
        </div>
        <div className="flex items-center gap-3">
          {!editing && permissions.canEdit && (
            <button
              onClick={() => { setEditData(profile); setEditing(true); }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border-subtle text-sm text-slate-300 hover:text-white hover:border-accent-cyan/30 transition-all"
            >
              <Edit2 size={14} />
              Edit Profile
            </button>
          )}
          {editing && (
            <>
              <button onClick={() => setEditing(false)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border-subtle text-slate-400 text-sm hover:text-white transition-all">
                <X size={14} />Cancel
              </button>
              <button onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-cyan text-bg-primary font-semibold text-sm hover:opacity-90 transition-all">
                <Save size={14} />Save Changes
              </button>
            </>
          )}
        </div>
      </div>

      {saved && (
        <div className="flex items-center gap-3 p-4 bg-accent-green/10 border border-accent-green/30 rounded-xl animate-fade-up">
          <CheckCircle size={16} className="text-accent-green" />
          <p className="text-sm text-accent-green font-medium">Profile updated successfully!</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-4">
          <div className="glass-card p-6 text-center">
            {/* Avatar */}
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center text-3xl font-bold text-white font-display mx-auto">
                {profile.avatar}
              </div>
              {editing && (
                <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-accent-cyan flex items-center justify-center border-2 border-bg-secondary hover:opacity-90 transition-all">
                  <Camera size={13} className="text-bg-primary" />
                </button>
              )}
            </div>

            <h3 className="font-display text-xl font-bold text-white">{profile.name}</h3>
            <p className="text-sm text-slate-400 mt-0.5">{profile.occupation}</p>
            <p className="text-xs text-slate-500 font-mono">{profile.company}</p>

            <div className="flex justify-center mt-3">
              <span className="text-[10px] bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan px-3 py-1 rounded-full font-mono">PRO Member</span>
            </div>

            <p className="text-xs text-slate-500 mt-4 leading-relaxed">{profile.bio}</p>

            <div className="flex flex-col gap-2 mt-5 text-left">
              {[
                { icon: Mail, value: profile.email },
                { icon: Phone, value: profile.phone },
                { icon: MapPin, value: profile.location },
                { icon: Calendar, value: `Joined ${profile.joined}` },
              ].map(({ icon: Icon, value }, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-slate-400">
                  <Icon size={13} className="text-slate-600 flex-shrink-0" />
                  {value}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="glass-card p-5">
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">Financial Stats</p>
            <div className="space-y-3">
              {[
                { label: 'Net Worth', value: '$66,000', color: 'text-accent-cyan' },
                { label: 'Goals Active', value: '4', color: 'text-accent-green' },
                { label: 'Savings Rate', value: '51.7%', color: 'text-accent-amber' },
                { label: 'Portfolio ROI', value: '+3.8%', color: 'text-accent-purple' },
              ].map((s, i) => (
                <div key={i} className="flex justify-between items-center">
                  <p className="text-xs text-slate-400">{s.label}</p>
                  <p className={`text-sm font-mono font-bold ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">

          {/* Edit Form or View */}
          <div className="glass-card p-6">
            <h3 className="font-display text-base font-semibold text-white mb-5">
              {editing ? 'Edit Personal Information' : 'Personal Information'}
            </h3>

            {editing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-2">Full Name</label>
                    <input value={editData.name} onChange={e => setEditData(d => ({ ...d, name: e.target.value }))}
                      className="w-full bg-bg-elevated border border-border-subtle rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-cyan/40" />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-2">Email</label>
                    <input value={editData.email} onChange={e => setEditData(d => ({ ...d, email: e.target.value }))}
                      className="w-full bg-bg-elevated border border-border-subtle rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-cyan/40" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-2">Phone</label>
                    <input value={editData.phone} onChange={e => setEditData(d => ({ ...d, phone: e.target.value }))}
                      className="w-full bg-bg-elevated border border-border-subtle rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-cyan/40" />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-2">Location</label>
                    <input value={editData.location} onChange={e => setEditData(d => ({ ...d, location: e.target.value }))}
                      className="w-full bg-bg-elevated border border-border-subtle rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-cyan/40" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-2">Occupation</label>
                    <input value={editData.occupation} onChange={e => setEditData(d => ({ ...d, occupation: e.target.value }))}
                      className="w-full bg-bg-elevated border border-border-subtle rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-cyan/40" />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-2">Company</label>
                    <input value={editData.company} onChange={e => setEditData(d => ({ ...d, company: e.target.value }))}
                      className="w-full bg-bg-elevated border border-border-subtle rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-cyan/40" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-2">Bio</label>
                  <textarea value={editData.bio} onChange={e => setEditData(d => ({ ...d, bio: e.target.value }))}
                    rows={3}
                    className="w-full bg-bg-elevated border border-border-subtle rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-cyan/40 resize-none" />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-5">
                {[
                  { label: 'Full Name', value: profile.name },
                  { label: 'Email Address', value: profile.email },
                  { label: 'Phone Number', value: profile.phone },
                  { label: 'Location', value: profile.location },
                  { label: 'Occupation', value: profile.occupation },
                  { label: 'Company', value: profile.company },
                ].map((f, i) => (
                  <div key={i}>
                    <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1">{f.label}</p>
                    <p className="text-sm text-white font-medium">{f.value}</p>
                  </div>
                ))}
                <div className="col-span-2">
                  <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1">Bio</p>
                  <p className="text-sm text-slate-300 leading-relaxed">{profile.bio}</p>
                </div>
              </div>
            )}
          </div>

          {/* Achievements */}
          <div className="glass-card p-6">
            <h3 className="font-display text-base font-semibold text-white mb-5">Achievements</h3>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((a, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white/3 border border-white/5 rounded-xl">
                  <span className="text-2xl">{a.icon}</span>
                  <div>
                    <p className={`text-xs font-medium ${a.color}`}>{a.label}</p>
                    <p className="text-[10px] text-slate-600 font-mono">{a.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Log */}
          <div className="glass-card p-6">
            <h3 className="font-display text-base font-semibold text-white mb-5">Recent Activity</h3>
            <div className="space-y-3">
              {activityLog.map((a, i) => {
                const Icon = a.icon;
                return (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-border-subtle last:border-0">
                    <div className={`w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0`}>
                      <Icon size={13} className={a.color} />
                    </div>
                    <p className="text-sm text-slate-300 flex-1">{a.action}</p>
                    <p className="text-xs text-slate-600 font-mono flex-shrink-0">{a.time}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Danger Zone */}
          {permissions.canDelete && (
            <div className="glass-card p-6 border border-accent-red/10">
              <h3 className="font-display text-base font-semibold text-accent-red mb-5">Danger Zone</h3>
              <div className="flex items-center justify-between py-3 border-b border-border-subtle">
                <div className="flex items-start gap-3">
                  <LogOut size={16} className="text-slate-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white">Sign Out of All Devices</p>
                    <p className="text-xs text-slate-500 mt-0.5">Revokes all active sessions</p>
                  </div>
                </div>
                <button className="text-xs font-mono px-3 py-1.5 rounded-lg border border-border-subtle text-slate-400 hover:text-white transition-all">
                  Sign Out All
                </button>
              </div>
              <div className="flex items-center justify-between pt-3">
                <div className="flex items-start gap-3">
                  <Trash2 size={16} className="text-accent-red mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-accent-red">Delete Account</p>
                    <p className="text-xs text-slate-500 mt-0.5">Permanently remove account and all data</p>
                  </div>
                </div>
                <button
                  onClick={() => { setShowDeleteConfirm(true); setDeleteStep(1); setDeleteInput(''); }}
                  className="text-xs font-mono px-3 py-1.5 rounded-lg border border-accent-red/30 bg-accent-red/10 text-accent-red hover:opacity-80 transition-all"
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card-elevated w-full max-w-sm p-6 animate-fade-up">
            <div className="text-center mb-5">
              <div className="w-14 h-14 rounded-2xl bg-accent-red/10 border border-accent-red/20 flex items-center justify-center mx-auto mb-3">
                <AlertTriangle size={24} className="text-accent-red" />
              </div>
              <h3 className="font-display text-lg font-bold text-white">Delete Account</h3>
              <p className="text-sm text-slate-400 mt-1">
                {deleteStep === 1
                  ? 'This will permanently delete your account and all associated data. This action cannot be undone.'
                  : 'Type DELETE to confirm account deletion.'}
              </p>
            </div>

            {deleteStep === 2 && (
              <input
                value={deleteInput}
                onChange={e => setDeleteInput(e.target.value)}
                placeholder="Type DELETE"
                className="w-full bg-bg-elevated border border-accent-red/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-red/60 mb-4 placeholder-slate-600 text-center font-mono"
              />
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-3 rounded-xl border border-border-subtle text-slate-400 hover:text-white text-sm transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteStep === 2 && deleteInput !== 'DELETE'}
                className="flex-1 py-3 rounded-xl bg-accent-red/20 border border-accent-red/40 text-accent-red font-semibold text-sm hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {deleteStep === 1 ? 'Continue' : 'Delete Forever'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
