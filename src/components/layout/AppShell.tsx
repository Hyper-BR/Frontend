import { ReactNode } from 'react';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';
import Player from './Player/Player';
import { useAuth } from '@/hooks/useAuth';
import styles from './AppShell.module.scss';

type AppShellProps = {
  children: ReactNode;
};

export const AppShell = ({ children }: AppShellProps) => {
  const { userSigned } = useAuth();
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div
        className={`${styles.layout} ${!userSigned ? styles.noSidebar : ''}`}
      >
        {userSigned && <Sidebar />}
        <main className={styles.home}>{children}</main>
      </div>
      <Player />
    </div>
  );
};
