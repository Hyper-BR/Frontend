import {
  createContext,
  useCallback,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {
  getAuthenticatedCustomer,
  logInCustomer,
  logoutCustomer,
} from '../services/login';
import { CustomerDTO } from '../services/customer/types';
import { LoginCredentialsDTO } from '../services/login/types';

interface AuthContextType {
  customer: CustomerDTO | null;
  userSigned: boolean;
  isArtist: boolean;
  signIn(credentials: LoginCredentialsDTO): Promise<void>;
  signOut(): Promise<void>;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [customer, setCustomer] = useState<CustomerDTO | null>(null);

  const userSigned = !!customer;
  const isArtist = !!customer?.artistProfile != null;

  const loadUser = useCallback(async () => {
    try {
      const { data } = await getAuthenticatedCustomer();
      setCustomer(data);
    } catch (err) {
      console.error('Erro ao recuperar sessão:', err);
      setCustomer(null);
    }
  }, []);

  const signIn = useCallback(
    async (credentials: LoginCredentialsDTO) => {
      try {
        await logInCustomer(credentials);
        await loadUser();
      } catch (err) {
        console.error('Erro ao fazer login:', err);
        await signOut();
      }
    },
    [loadUser],
  );

  const signOut = useCallback(async () => {
    try {
      await logoutCustomer();
    } catch (err) {
      console.warn('Erro ao sair:', err);
    } finally {
      setCustomer(null);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <AuthContext.Provider
      value={{
        customer,
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
