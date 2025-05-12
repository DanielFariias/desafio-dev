import { useEffect, useState } from 'react';
import { fetchStores, type Store } from '../../services/stores';
import styles from './styles.module.scss';

export function StoresTable() {
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log({ stores });

  useEffect(() => {
    async function loadStores() {
      try {
        setIsLoading(true);
        const response = await fetchStores();
        setStores(response.data);
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar as lojas.');
      } finally {
        setIsLoading(false);
      }
    }

    loadStores();
  }, []);

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Lojas Cadastradas</h2>

      {isLoading ? (
        <p>Carregando lojas...</p>
      ) : error ? (
        <p>{error}</p>
      ) : stores?.length === 0 ? (
        <p>Nenhuma loja encontrada.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome da Loja</th>
              <th>Dono da Loja</th>
              <th>Saldo Final</th>
            </tr>
          </thead>
          <tbody>
            {stores?.length > 0 &&
              stores?.map((store) => (
                <tr key={store.id}>
                  <td>{store.name}</td>
                  <td>{store.ownerName}</td>
                  <td
                    className={
                      store.balance >= 0 ? styles.positive : styles.negative
                    }
                  >
                    R$ {store.balance.toFixed(2)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
