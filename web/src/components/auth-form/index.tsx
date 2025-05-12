import React from 'react';

import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import { Spinner } from '../spinner';

import { api } from '../../services/api';

import styles from './styles.module.scss';
import { useAuth } from '../../contexts/AuthContext';
import { AUTH_FORM_ACTIONS, AUTH_FORM_CONFIG } from './helper';

interface AuthFormProps {
  action: keyof typeof AUTH_FORM_ACTIONS;
}

export function AuthForm({ action = AUTH_FORM_ACTIONS.login }: AuthFormProps) {
  const {
    title,
    submitButtonText,
    apiEndpoint,
    redirectPath,
    redirectText,
    redirectLink,
    successMessage,
    errorMessage,
  } = AUTH_FORM_CONFIG[action];

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate();

  const { login } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await api.post(apiEndpoint, { email, password });

      if (action === 'login') {
        const token = response.data.access_token;

        login(token);
      }

      toast.success(successMessage);
      navigate(redirectPath);
    } catch {
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>{title}</h2>
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
          {isLoading ? <Spinner /> : submitButtonText}
        </button>
        <p>
          {redirectText}
          <Link to={redirectLink}>
            {redirectPath === '/login' ? ' Login' : ' Registrar'}
          </Link>
        </p>
      </form>
    </div>
  );
}
