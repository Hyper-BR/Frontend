import { ReactNode } from 'react';
import styles from './AppShell.module.scss';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';
import Player from './Player/Player';

type AppShellProps = {
  children: ReactNode;
};

export const AppShell = ({ children }: AppShellProps) => (
  <div className={styles.wrapper}>
    <Navbar />
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.content}>{children}</main>
    </div>
    <Player />
  </div>
);
