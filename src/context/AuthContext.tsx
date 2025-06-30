import { ReactNode, createContext, useEffect, useState } from 'react';
import { parseCookies, setCookie } from 'nookies';
import { logInCustomer, getCustomerByEmail } from '../services/customer';
import { CustomerDTO, LoginDTO } from '../services/customer/types';

interface AuthContextProps {
  user: CustomerDTO | null;
  userSigned: boolean;
  signIn(data: LoginDTO): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<CustomerDTO | null>(null);
  const [userSigned, setUserSigned] = useState(false);

  async function signIn(data: LoginDTO) {
    try {
      const response = await logInCustomer(data);

      setUserSigned(true);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  }

  async function updateUser(email: string) {
    try {
      const response = await getCustomerByEmail(email);
      setUser(response.data);
      setUserSigned(true);
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
    }
  }

  function signOut() {
    setUser(null);
    setUserSigned(false);
    setCookie(null, 'token', 'null');
    setCookie(null, 'user', 'null');
  }

  useEffect(() => {
    const { token, user: userEmail } = parseCookies();
    if (token && token !== 'null' && userEmail && userEmail !== 'null') {
      updateUser(userEmail);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, userSigned, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
