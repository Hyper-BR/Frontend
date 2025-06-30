import { NextUIProvider } from '@nextui-org/react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Player } from './components/Player/Player';
import { AuthProvider } from './context/AuthContext';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.scss';

export const App = () => {
  return (
    <AuthProvider>
      <NextUIProvider>
        <main className="dark">
          <Navbar />

          <div className="flex app_root_container">
            <Sidebar />
            <Outlet />
          </div>

          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
          />

          <Player />
        </main>
      </NextUIProvider>
    </AuthProvider>
  );
};
