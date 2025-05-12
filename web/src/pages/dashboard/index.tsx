import { useEffect, useState } from 'react';
import { fetchStores, type Store } from '../../services/stores';
import { UploadCard } from '../../components/upload-card';
import { StoresTable } from '../../components/stores-table';

export function Dashboard() {
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadStores() {
    try {
      setIsLoading(true);
      const response = await fetchStores();
      setStores(response.data);
    } catch {
      setError('Erro ao carregar as lojas.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadStores();
  }, []);

  return (
    <div>
      <UploadCard onSuccess={loadStores} />
      <StoresTable stores={stores} isLoading={isLoading} error={error} />
    </div>
  );
}
