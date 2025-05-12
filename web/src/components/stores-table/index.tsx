import { type Store } from '../../services/stores';
import styles from './styles.module.scss';
import { Spinner } from '../spinner';
import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { EmptyState } from '../empty-state';

interface StoresTableProps {
  stores: Store[];
  isLoading: boolean;
  error: string | null;
}

export function StoresTable({ stores, isLoading, error }: StoresTableProps) {
  const navigate = useNavigate();

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
                      onClick={() =>
                        navigate(`/stores/${store.id}`, {
                          state: { storeName: store.name },
                        })
                      }
                      title="Ver detalhes"
                    >
                      <ExternalLink size={20} />
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
