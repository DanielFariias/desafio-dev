import { useEffect, useState } from 'react';
import { fetchStores, type Store } from '../../services/stores';
import styles from './styles.module.scss';
import { Spinner } from '../spinner';
import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { EmptyState } from '../empty-state';

export function StoresTable() {
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

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
        <Spinner />
      ) : error ? (
        <p>{error}</p>
      ) : stores?.length === 0 ? (
        <EmptyState
          title="Nenhuma loja encontrada"
          description="Ainda não existem lojas cadastradas."
        />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome da Loja</th>
              <th>Dono da Loja</th>
              <th>Saldo Final</th>
              <th>Ações</th>
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
                  <td>
                    <button
                      className={styles.viewButton}
                      onClick={() => navigate(`/stores/${store.id}`)}
                      title="Ver detalhes"
                    >
                      <Eye size={20} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
