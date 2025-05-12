import styles from './styles.module.scss';

interface SpinnerProps {
  size?: number;
}

export function Spinner({ size = 40 }: SpinnerProps) {
  return (
    <div className={styles.loader} style={{ width: size, height: size }} />
  );
}
