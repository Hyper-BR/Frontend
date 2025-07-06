import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RegisterPage.module.scss';
import { register } from '@/services/auth';
import { CustomerDTO } from '@/services/customer/types';
import { useAuth } from '@/hooks/useAuth';

const RegisterPage = () => {
  const navigate = useNavigate();

  const { loadUser } = useAuth();

  const [form, setForm] = useState<CustomerDTO>({
    id: null,
    name: '',
    email: '',
    password: '',
    country: '',
    birthDate: '',
    avatarUrl: '',
    subscription: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await register(form);
    loadUser();

    navigate('/');
  };

  return (
    <div className={styles.registerWrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Criar conta</h2>

        <label>
          Nome completo
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Seu nome"
          />
        </label>

        <label>
          E-mail
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="email@exemplo.com"
          />
        </label>

        <label>
          Senha
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
          />
        </label>

        <label>
          País
          <input
            type="text"
            name="country"
            value={form.country}
            onChange={handleChange}
            required
            placeholder="Brasil"
          />
        </label>

        <label>
          Data de nascimento
          <input
            type="date"
            name="birthDate"
            value={form.birthDate}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Avatar (URL da imagem)
          <input
            type="text"
            name="avatarUrl"
            value={form.avatarUrl}
            onChange={handleChange}
            placeholder="https://exemplo.com/imagem.jpg"
          />
        </label>

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegisterPage;
