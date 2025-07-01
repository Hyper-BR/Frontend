import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { PlayerProvider } from './context/PlayerContext';

export const App = () => {
  return (
    <PlayerProvider>
      <AppShell>
        <Outlet />
      </AppShell>
    </PlayerProvider>
  );
};
