import { useState } from 'react';
import { api } from '../../services/api';
import styles from './styles.module.scss';
import toast from 'react-hot-toast';
import { Spinner } from '../spinner';

interface UploadCardProps {
  onSuccess: () => void;
}

export function UploadCard({ onSuccess }: UploadCardProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith('.txt')) {
      setSelectedFile(file);
      setMessage(null);
    } else {
      toast.error('Por favor selecione um arquivo .txt válido.');
    }
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file && file.name.endsWith('.txt')) {
      setSelectedFile(file);
      setMessage(null);
    } else {
      toast.error('Por favor selecione um arquivo .txt válido.');
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
    setMessage(null);
  }

  async function handleUpload() {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append('file', selectedFile);

    const uploadToast = toast.loading('Enviando arquivo...');

    try {
      setIsUploading(true);
      setMessage(null);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      await api.post('/transactions/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Arquivo enviado com sucesso!', { id: uploadToast });
      setSelectedFile(null);
      onSuccess();
    } catch (error) {
      toast.error('Erro ao enviar o arquivo.', { id: uploadToast });
      console.error(error);
    } finally {
      setIsUploading(false);
    }
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
          <div className={styles.buttonGroup}>
            {isUploading ? (
              <Spinner />
            ) : (
              <>
                <button className={styles.uploadAction} onClick={handleUpload}>
                  Enviar Arquivo
                </button>
                <button
                  className={styles.removeButton}
                  onClick={handleRemoveFile}
                >
                  Remover
                </button>
              </>
            )}
          </div>
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

      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}
