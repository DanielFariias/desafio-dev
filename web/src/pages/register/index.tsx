import { type FormEvent, useState } from 'react';
import { api } from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import styles from './styles.module.scss';
import { Spinner } from '../../components/spinner';

export function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      setIsLoading(true);
      await api.post('/auth/register', { email, password });
      toast.success('Cadastro realizado! Faça login.');
      navigate('/login');
    } catch {
      toast.error('Erro ao cadastrar. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Criar Conta</h2>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? <Spinner /> : 'Cadastrar'}
        </button>
        <p>
          Já tem uma conta? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
