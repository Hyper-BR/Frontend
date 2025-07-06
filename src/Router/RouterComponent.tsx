import { createBrowserRouter } from 'react-router-dom';
import { App } from '@/App';
import LoginPage from '@/pages/Login/LoginPage';
import BecomeArtistPage from '@/pages/Artist/BecomeArtistPage';
import RegisterPage from '@/pages/Register/RegisterPage';
import ProfilePage from '@/pages/Profile/ProfilePage';
import HomePage from '@/pages/Home/HomePage';
import PrivateRoute from './PrivateRoute';
import PlaylistPage from '@/pages/Playlist/PlaylistPage';

export const Routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: '/playlist/:id',
        element: <PlaylistPage />,
      },
      {
        path: '/profile',
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: '/becomeArtist',
        element: (
          <PrivateRoute onlyArtist={false}>
            <BecomeArtistPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/release/upload',
        element: (
          <PrivateRoute onlyArtist>
            UploadPage
            {/* <UploadReleasePage /> */}
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
]);
