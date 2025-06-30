import { Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Sidebar from './components/Sidebar/Sidebar';
import styles from './App.module.scss';

export const App = () => {
  return (
    <AuthProvider>
      <div className={styles.appContainer}>
        <Sidebar />
        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </AuthProvider>
  );
};
