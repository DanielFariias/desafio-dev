import { useState } from 'react';
import styles from './styles.module.scss';

export function UploadCard() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith('.txt')) {
      setSelectedFile(file);
    } else {
      alert('Por favor selecione um arquivo .txt válido.');
    }
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file && file.name.endsWith('.txt')) {
      setSelectedFile(file);
    } else {
      alert('Por favor selecione um arquivo .txt válido.');
    }
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleRemoveFile() {
    setSelectedFile(null);
  }

  return (
    <div
      className={`${styles.card} ${isDragging ? styles.isDragging : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <h2 className={styles.title}>Upload de Arquivo CNAB</h2>

      {isDragging ? (
        <p className={styles.dropMessage}>Solte aqui o arquivo .txt</p>
      ) : selectedFile ? (
        <>
          <p className={styles.fileName}>
            Arquivo selecionado: {selectedFile.name}
          </p>
          <button className={styles.removeButton} onClick={handleRemoveFile}>
            Remover Arquivo
          </button>
        </>
      ) : (
        <>
          <p className={styles.instructions}>
            Arraste o arquivo <strong>.txt</strong> para cá ou
          </p>
          <label className={styles.uploadButton}>
            Selecionar Arquivo
            <input
              type="file"
              accept=".txt"
              hidden
              onChange={handleFileChange}
            />
          </label>
        </>
      )}
    </div>
  );
}
