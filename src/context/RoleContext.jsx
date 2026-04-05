import React, { createContext, useContext, useState } from 'react';

export const ROLES = {
  ADMIN:   { id: 'admin',   label: 'Admin',   color: 'text-accent-amber',  bg: 'bg-accent-amber/10  border-accent-amber/20',  icon: '👑' },
  EDITOR:  { id: 'editor',  label: 'Editor',  color: 'text-accent-cyan',   bg: 'bg-accent-cyan/10   border-accent-cyan/20',   icon: '✏️' },
  VIEWER:  { id: 'viewer',  label: 'Viewer',  color: 'text-accent-purple', bg: 'bg-accent-purple/10 border-accent-purple/20', icon: '👁️' },
};

export const PERMISSIONS = {
  admin:  { canAdd: true,  canEdit: true,  canDelete: true,  canExport: true  },
  editor: { canAdd: true,  canEdit: true,  canDelete: false, canExport: true  },
  viewer: { canAdd: false, canEdit: false, canDelete: false, canExport: false },
};

const RoleContext = createContext(null);

export function RoleProvider({ children }) {
  const [role, setRole] = useState('admin');
  const permissions = PERMISSIONS[role];

  return (
    <RoleContext.Provider value={{ role, setRole, permissions, roleInfo: ROLES[role.toUpperCase()] }}>
      {children}
    </RoleContext.Provider>
  );
}

export const useRole = () => {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error('useRole must be used within RoleProvider');
  return ctx;
};
