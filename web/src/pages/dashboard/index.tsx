import React from 'react';

import { UploadCard } from '../../components/upload-card';
import { StoresTable } from '../../components/stores-table';

import { fetchStores } from '../../services/stores';

import type { Store } from '../../types/store';

export function Dashboard() {
  const [stores, setStores] = React.useState<Store[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

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

  React.useEffect(() => {
    loadStores();
  }, []);

  return (
    <div>
      <UploadCard onSuccess={loadStores} />
      <StoresTable stores={stores} isLoading={isLoading} error={error} />
    </div>
  );
}
