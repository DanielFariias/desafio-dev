import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchStoreTransactions,
  type Transaction,
} from '../../services/stores';
import toast from 'react-hot-toast';
import styles from './styles.module.scss';
import { Spinner } from '../../components/spinner';
import { EmptyState } from '../../components/empty-state';
import { ArrowLeft } from 'lucide-react';

export function StoreDetailsPage() {
  const { storeId } = useParams<{ storeId: string }>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadTransactions() {
      if (!storeId) return;
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const response = await fetchStoreTransactions(storeId);
        setTransactions(response.data);
      } catch {
        toast.error('Erro ao carregar transações.');
      } finally {
        setIsLoading(false);
      }
    }

    loadTransactions();
  }, [storeId]);

  return (
    <div className={styles.card}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <ArrowLeft size={16} />
        Voltar
      </button>
      <div className={styles.container}>
        <h2>Transações da Loja</h2>

        {isLoading ? (
          <Spinner />
        ) : transactions.length === 0 ? (
          <EmptyState
            title="Nenhuma transação encontrada"
            description="Essa loja ainda não possui registros de transações."
          />
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Data</th>
                <th>CPF</th>
                <th>Cartão</th>
                <th>Tipo</th>
                <th>Valor</th>
                <th>Data da transação</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 &&
                transactions?.map((tx) => (
                  <tr key={tx.id}>
                    <td>{new Date(tx.date).toLocaleDateString()}</td>
                    <td>{tx.cpf}</td>
                    <td>{tx.card}</td>
                    <td>{tx.type}</td>
                    <td>R$ {tx.value.toFixed(2)}</td>
                    <td>{new Date(tx.transactionAt).toLocaleString()}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
