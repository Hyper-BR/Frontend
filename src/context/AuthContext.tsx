import { createContext, useEffect, useState, ReactNode } from 'react';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import {
  logInCustomer,
  refreshToken,
  getCustomerByEmail,
} from '../services/customer';
import {
  CustomerDTO,
  LoginCredentialsDTO,
  LoginDTO,
} from '../services/customer/types';

interface AuthContextType {
  user: CustomerDTO | null;
  userSigned: boolean;
  isArtist: boolean;
  signIn(credentials: LoginCredentialsDTO): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<CustomerDTO | null>(null);
  const [userSigned, setUserSigned] = useState(false);

  const isArtist = user?.artistProfiles?.length > 0;

  async function signIn(credentials: LoginCredentialsDTO) {
    try {
      const response = await logInCustomer(credentials);
      const { customer, token } = response.data;

      setUser(customer);
      setUserSigned(true);

      setCookie(null, 'token', token.token, { path: '/' });
      setCookie(null, 'user', customer.email, { path: '/' });
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      signOut();
    }
  }

  async function loadUser(email: string) {
    try {
      const response = await getCustomerByEmail(email);
      setUser(response.data);
      setUserSigned(true);
    } catch (err) {
      console.error('Erro ao carregar usuário:', err);
      signOut();
    }
  }

  async function refreshSession() {
    try {
      const response = await refreshToken();
      const token = response.data.token;
      setCookie(null, 'token', token, { path: '/' });
    } catch (err) {
      console.error('Erro ao renovar token:', err);
      signOut();
    }
  }

  function signOut() {
    destroyCookie(null, 'token');
    destroyCookie(null, 'user');
    setUser(null);
    setUserSigned(false);
  }

  useEffect(() => {
    const { token, user: userEmail } = parseCookies();
    if (token && token !== 'null' && userEmail && userEmail !== 'null') {
      loadUser(userEmail);
      refreshSession();

      const interval = setInterval(refreshSession, 1000 * 60 * 10);
      return () => clearInterval(interval);
    } else {
      signOut();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userSigned,
        isArtist,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
