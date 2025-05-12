import { useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

import { EmptyState } from '../empty-state';
import { Spinner } from '../spinner';

import type { Store } from '../../types/store';

import styles from './styles.module.scss';

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
        <div className={styles.loading}>
          <Spinner />
        </div>
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
