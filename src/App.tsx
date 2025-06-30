import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';

export const App = () => {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
};
