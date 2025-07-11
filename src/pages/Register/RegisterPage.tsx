import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RegisterPage.module.scss';
import { register } from '@/services/auth';
import { CustomerDTO } from '@/services/customer/types';
import { useAuth } from '@/hooks/useAuth';
import { countries } from '@/constants/Countries';
import { getTimeZoneByCountry } from '@/utils/getTimeZoneByCountry';
import { buildZonedDateTime } from '@/utils/buildZonedDateTime';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { loadUser } = useAuth();

  const [form, setForm] = useState<CustomerDTO>({
    name: '',
    email: '',
    password: '',
    country: '',
    birthDate: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    const timezone =
      (await getTimeZoneByCountry(form.country)) || 'America/Sao_Paulo';

    const zonedBirthDate = buildZonedDateTime(form.birthDate, timezone);

    const payload = {
      ...form,
      birthDate: zonedBirthDate,
    };

    await register(payload);
    loadUser();
    navigate('/');
  };

  return (
    <div className={styles.registerWrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Criar conta</h2>

        {error && <p className={styles.error}>{error}</p>}

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
          Confirmar senha
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
        </label>

        <label>
          País
          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um país</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
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

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegisterPage;
