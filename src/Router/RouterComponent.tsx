import { createBrowserRouter } from 'react-router-dom';
import { App } from '../App';
import LoginPage from '../pages/Login/LoginPage';
import BecomeArtistPage from '../pages/Artist/BecomeArtistPage';

export const Routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/becomeArtist',
    element: <BecomeArtistPage />,
  },
]);
