import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.scss';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/commons/Button/Button';
import { Input } from '@/components/commons/Input/Input';

const LoginPage = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn({ email, password });
      navigate('/');
    } catch (err) {
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Entrar</h2>

        <label>
          E-mail
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
        </label>

        <label>
          Senha
          <Input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </label>

        <Button type="submit">Login</Button>
        <p className={styles.registerLink}>
          Ainda não tem conta? <Link to="/register">Crie uma aqui</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
