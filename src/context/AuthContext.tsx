import { createContext, useEffect, useState, ReactNode } from 'react';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import {
  logInCustomer,
  refreshToken,
  getCustomerByEmail,
} from '../services/customer';
import { CustomerDTO, LoginCredentialsDTO } from '../services/customer/types';

interface AuthContextType {
  customer: CustomerDTO | null;
  userSigned: boolean;
  isArtist: boolean;
  signIn(credentials: LoginCredentialsDTO): Promise<void>;
  signOut(): void;
  refreshSession(): Promise<void>;
  currentArtistId: number | null;
  setCurrentArtistId: (id: number | null) => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [customer, setCustomer] = useState<CustomerDTO | null>(null);
  const [userSigned, setUserSigned] = useState(false);
  const [currentArtistId, setCurrentArtistId] = useState<number | null>(null);

  const isArtist = customer?.artistProfile != null;

  async function signIn(credentials: LoginCredentialsDTO) {
    try {
      const response = await logInCustomer(credentials);
      const { customer, token } = response.data;

      setCustomer(customer);
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
      setCustomer(response.data);
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
    setCustomer(null);
    setUserSigned(false);
  }

  useEffect(() => {
    if (customer?.artistProfile?.length) {
      setCurrentArtistId(customer.artistProfile[0].id);
    } else {
      setCurrentArtistId(null);
    }

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
        customer,
        userSigned,
        isArtist,
        signIn,
        signOut,
        refreshSession,
        currentArtistId,
        setCurrentArtistId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
