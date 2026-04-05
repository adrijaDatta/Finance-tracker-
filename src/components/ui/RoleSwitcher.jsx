import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ShieldCheck } from 'lucide-react';
import { useRole, ROLES, PERMISSIONS } from '../../context/RoleContext';

export default function RoleSwitcher() {
  const { role, setRole, roleInfo } = useRole();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  /* close on outside click */
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-mono transition-all ${roleInfo.bg} ${roleInfo.color}`}
      >
        <ShieldCheck size={13} />
        <span className="flex-1 text-left">{roleInfo.icon} {roleInfo.label}</span>
        <ChevronDown size={11} className={`transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        /* Opens UPWARD — bottom-full so it never clips behind the profile card */
        <div className="absolute left-0 right-0 bottom-full mb-2 glass-card-elevated border border-border-subtle rounded-xl overflow-hidden shadow-card z-[60]">
          <div className="px-3 py-2 border-b border-border-subtle">
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Switch Role</p>
          </div>
          {Object.values(ROLES).map(r => {
            const perms = PERMISSIONS[r.id];
            const isActive = role === r.id;
            return (
              <button
                key={r.id}
                onClick={() => { setRole(r.id); setOpen(false); }}
                className={`w-full text-left px-3 py-2.5 flex items-start gap-3 transition-all hover:bg-white/5 ${isActive ? 'bg-white/5' : ''}`}
              >
                <span className="text-base mt-0.5 flex-shrink-0">{r.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${r.color}`}>{r.label}</span>
                    {isActive && <span className="text-[9px] bg-white/10 text-slate-400 px-1.5 py-0.5 rounded font-mono">ACTIVE</span>}
                  </div>
                  <div className="flex gap-2 mt-1 flex-wrap">
                    {perms.canAdd    && <span className="text-[9px] text-accent-green  font-mono">+ Add</span>}
                    {perms.canEdit   && <span className="text-[9px] text-accent-cyan   font-mono">✎ Edit</span>}
                    {perms.canDelete && <span className="text-[9px] text-accent-red    font-mono">✕ Delete</span>}
                    {perms.canExport && <span className="text-[9px] text-accent-amber  font-mono">↓ Export</span>}
                    {!perms.canAdd && !perms.canEdit && <span className="text-[9px] text-slate-600 font-mono">Read only</span>}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
