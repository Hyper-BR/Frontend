import {
  createContext,
  useCallback,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { getMe, login, logout } from '@/services/auth';
import { CustomerDTO } from '@/services/customer/types';
import { LoginCredentialsDTO } from '@/services/auth/types';

interface AuthContextType {
  customer: CustomerDTO | null;
  userSigned: boolean;
  isArtist: boolean;
  isLabel: boolean;
  signIn(credentials: LoginCredentialsDTO): Promise<void>;
  signOut(): Promise<void>;
  loadUser(): Promise<void>;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [customer, setCustomer] = useState<CustomerDTO | null>(null);

  console.log(customer);
  let isArtist = customer?.artist;
  let isLabel = customer?.label;
  let userSigned = !!customer;

  const loadUser = useCallback(async () => {
    try {
      const { data } = await getMe();
      setCustomer(data);
    } catch (err) {
      setCustomer(null);
    }
  }, []);

  const signIn = useCallback(
    async (credentials: LoginCredentialsDTO) => {
      try {
        await login(credentials);
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
      await logout();
    } catch (err) {
      console.warn('Erro ao sair:', err);
    } finally {
      setCustomer(null);
      isArtist = false;
      userSigned = false;
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
        isLabel,
        signIn,
        signOut,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
