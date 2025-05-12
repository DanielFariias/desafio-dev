import { useAuth } from '../../contexts/AuthContext';
import styles from './styles.module.scss';

export function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1>CNAB Web</h1>

        {isAuthenticated && (
          <button className={styles.logoutButton} onClick={logout}>
            Sair
          </button>
        )}
      </div>
    </header>
  );
}
