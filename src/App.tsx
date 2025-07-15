import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { PlayerProvider } from './contexts/PlayerContext';
import { ModalProvider } from './contexts/ModalContext';

export const App = () => {
  return (
    <ModalProvider>
      <PlayerProvider>
        <AppShell>
          <Outlet />
        </AppShell>
      </PlayerProvider>
    </ModalProvider>
  );
};
