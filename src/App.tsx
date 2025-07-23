import { Outlet } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { PlayerProvider } from './contexts/PlayerContext';
import { ModalProvider } from './contexts/ModalContext';
import KeyboardListener from './components/commons/Keyboard/KeyboardListener';
import { DragDropProvider } from './contexts/DragDropProvider';

export const App = () => {
  return (
    <DragDropProvider>
      <ModalProvider>
        <PlayerProvider>
          <KeyboardListener />
          <AppShell>
            <Outlet />
          </AppShell>
        </PlayerProvider>
      </ModalProvider>
    </DragDropProvider>
  );
};
