import styles from './styles.module.scss';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1>CNAB Web</h1>
        <nav>
          <a href="#">Documentação</a>
        </nav>
      </div>
    </header>
  );
}
