import React from 'react';

const placeholders = {
  analytics:  { icon: '📊', title: 'Analytics',  desc: 'Deep analytics coming in Step 3' },
  wallet:     { icon: '👛', title: 'Wallet',      desc: 'Wallet management coming soon'   },
  cards:      { icon: '💳', title: 'Cards',       desc: 'Card management coming soon'     },
  goals:      { icon: '🎯', title: 'Goals',       desc: 'Goals tracker coming soon'       },
  settings:   { icon: '⚙️', title: 'Settings',   desc: 'Settings page coming soon'       },
};

export default function PlaceholderPage({ pageId }) {
  const info = placeholders[pageId] || { icon: '📄', title: pageId, desc: 'Coming soon' };
  return (
    <div className="flex-1 flex items-center justify-center p-12">
      <div className="text-center space-y-4">
        <div className="text-6xl">{info.icon}</div>
        <h2 className="font-display text-2xl font-bold text-white">{info.title}</h2>
        <p className="text-slate-500 text-sm">{info.desc}</p>
        <div className="inline-block px-4 py-2 bg-accent-cyan/10 border border-accent-cyan/20 rounded-xl text-accent-cyan text-xs font-mono">
          In Progress
        </div>
      </div>
    </div>
  );
}
