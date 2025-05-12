import styles from './styles.module.scss';

export function UploadCard() {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Upload de Arquivo CNAB</h2>
      <p className={styles.instructions}>
        Arraste o arquivo <strong>.txt</strong> para cá ou
      </p>
      <label className={styles.uploadButton}>
        Selecionar Arquivo
        <input type="file" accept=".txt" hidden />
      </label>
    </div>
  );
}
