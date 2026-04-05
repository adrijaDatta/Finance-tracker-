import React, { createContext, useContext, useState, useEffect } from 'react';

export const THEMES = {
  dark: {
    id: 'dark',
    label: 'Dark',
    '--bg-primary':   '#080C14',
    '--bg-secondary': '#0D1322',
    '--bg-card':      '#111827',
    '--bg-elevated':  '#1A2235',
    '--text-primary': '#E8EDF5',
    '--text-secondary':'#94A3B8',
    '--text-muted':   '#64748B',
    '--border-subtle':'rgba(255,255,255,0.06)',
    '--card-bg':      'rgba(17,24,39,0.9)',
    '--card-elevated-bg': 'rgba(26,34,53,0.95)',
    '--card-border':  'rgba(255,255,255,0.08)',
    '--card-elevated-border': 'rgba(0,212,255,0.15)',
    '--scrollbar-track': '#0D1322',
    '--input-bg':     'rgba(26,34,53,1)',
    '--hover-bg':     'rgba(255,255,255,0.05)',
    '--grid-color':   'rgba(255,255,255,0.02)',
    '--surface-1':    'rgba(255,255,255,0.04)',
    '--surface-2':    'rgba(255,255,255,0.07)',
    '--surface-3':    'rgba(255,255,255,0.10)',
    '--text-on-accent': '#080C14',
    '--nav-active-bg':  'rgba(0,212,255,0.12)',
    '--nav-active-text':'#00D4FF',
    '--badge-neutral-bg': 'rgba(255,255,255,0.08)',
    '--badge-neutral-text': '#94A3B8',
    '--progress-track': 'rgba(255,255,255,0.06)',
    '--accent-cyan':  '#00D4FF',
    '--accent-green': '#00FF87',
    '--accent-amber': '#FFB800',
    '--accent-red':   '#FF4757',
    '--accent-purple':'#7B5EA7',
    '--icon-btn-bg':  'rgba(255,255,255,0.06)',
    '--icon-btn-hover':'rgba(255,255,255,0.10)',
    '--modal-overlay':'rgba(0,0,0,0.7)',
  },
  light: {
    id: 'light',
    label: 'Light',
    '--bg-primary':   '#EEF2F7',
    '--bg-secondary': '#FFFFFF',
    '--bg-card':      '#FFFFFF',
    '--bg-elevated':  '#F4F7FB',
    '--text-primary': '#0F172A',
    '--text-secondary':'#334155',
    '--text-muted':   '#64748B',
    '--border-subtle':'rgba(15,23,42,0.10)',
    '--card-bg':      'rgba(255,255,255,0.97)',
    '--card-elevated-bg': 'rgba(255,255,255,1)',
    '--card-border':  'rgba(15,23,42,0.10)',
    '--card-elevated-border': 'rgba(0,140,180,0.20)',
    '--scrollbar-track': '#DDE3ED',
    '--input-bg':     '#FFFFFF',
    '--hover-bg':     'rgba(0,0,0,0.04)',
    '--grid-color':   'rgba(0,0,0,0.025)',
    '--surface-1':    'rgba(0,0,0,0.04)',
    '--surface-2':    'rgba(0,0,0,0.06)',
    '--surface-3':    'rgba(0,0,0,0.08)',
    '--text-on-accent': '#FFFFFF',
    '--nav-active-bg':  'rgba(0,140,180,0.10)',
    '--nav-active-text':'#0088BB',
    '--badge-neutral-bg': 'rgba(0,0,0,0.06)',
    '--badge-neutral-text': '#475569',
    '--progress-track': 'rgba(0,0,0,0.06)',
    '--accent-cyan':  '#0099CC',
    '--accent-green': '#00A85A',
    '--accent-amber': '#D97700',
    '--accent-red':   '#E0303D',
    '--accent-purple':'#6B4FA0',
    '--icon-btn-bg':  'rgba(0,0,0,0.05)',
    '--icon-btn-hover':'rgba(0,0,0,0.09)',
    '--modal-overlay':'rgba(0,0,0,0.4)',
  },
  midnight: {
    id: 'midnight',
    label: 'Midnight',
    '--bg-primary':   '#05090F',
    '--bg-secondary': '#080D18',
    '--bg-card':      '#0B1120',
    '--bg-elevated':  '#131C2E',
    '--text-primary': '#E2E8F0',
    '--text-secondary':'#7B92B2',
    '--text-muted':   '#4A6080',
    '--border-subtle':'rgba(255,255,255,0.05)',
    '--card-bg':      'rgba(11,17,32,0.92)',
    '--card-elevated-bg': 'rgba(19,28,46,0.97)',
    '--card-border':  'rgba(255,255,255,0.05)',
    '--card-elevated-border': 'rgba(0,212,255,0.10)',
    '--scrollbar-track': '#080D18',
    '--input-bg':     'rgba(19,28,46,1)',
    '--hover-bg':     'rgba(255,255,255,0.04)',
    '--grid-color':   'rgba(255,255,255,0.015)',
    '--surface-1':    'rgba(255,255,255,0.03)',
    '--surface-2':    'rgba(255,255,255,0.055)',
    '--surface-3':    'rgba(255,255,255,0.08)',
    '--text-on-accent': '#05090F',
    '--nav-active-bg':  'rgba(0,212,255,0.10)',
    '--nav-active-text':'#00D4FF',
    '--badge-neutral-bg': 'rgba(255,255,255,0.06)',
    '--badge-neutral-text': '#7B92B2',
    '--progress-track': 'rgba(255,255,255,0.05)',
    '--accent-cyan':  '#00D4FF',
    '--accent-green': '#00FF87',
    '--accent-amber': '#FFB800',
    '--accent-red':   '#FF4757',
    '--accent-purple':'#7B5EA7',
    '--icon-btn-bg':  'rgba(255,255,255,0.05)',
    '--icon-btn-hover':'rgba(255,255,255,0.09)',
    '--modal-overlay':'rgba(0,0,0,0.80)',
  },
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(() => {
    try { return localStorage.getItem('moneta-theme') || 'dark'; } catch { return 'dark'; }
  });
  const theme = THEMES[themeId] || THEMES.dark;

  useEffect(() => {
    const root = document.documentElement;
    const t = THEMES[themeId] || THEMES.dark;
    Object.entries(t).forEach(([key, val]) => {
      if (key.startsWith('--')) root.style.setProperty(key, val);
    });
    root.setAttribute('data-theme', themeId);
    root.classList.toggle('theme-light', themeId === 'light');
    try { localStorage.setItem('moneta-theme', themeId); } catch {}
  }, [themeId]);

  return (
    <ThemeContext.Provider value={{ themeId, setThemeId, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
