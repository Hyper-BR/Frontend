import { Outlet } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { PlayerProvider } from './contexts/PlayerContext';
import { ModalProvider } from './contexts/ModalContext';
import KeyboardListener from './components/commons/Keyboard/KeyboardListener';

export const App = () => {
  return (
    <ModalProvider>
      <PlayerProvider>
        <KeyboardListener />
        <AppShell>
          <Outlet />
        </AppShell>
      </PlayerProvider>
    </ModalProvider>
  );
};
