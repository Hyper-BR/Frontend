import { Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

export const App = () => {
  return (
    <AuthProvider>
      <main className="dark">
        <div className="flex app_root_container">
          <Outlet />
        </div>
      </main>
    </AuthProvider>
  );
};
