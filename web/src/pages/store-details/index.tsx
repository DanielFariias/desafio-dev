import React from 'react';

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

import { EmptyState } from '../../components/empty-state';
import { Spinner } from '../../components/spinner';

import { fetchStoreTransactions } from '../../services/transactions';

import type { Transaction } from '../../types/transaction';
import type { CNABType } from '../../types/common';

import { sleep } from '../../utils/sleep';

import styles from './styles.module.scss';

export function isNegativeTransaction(type: CNABType) {
  const negativeTypes: CNABType[] = ['BANK_SLIP', 'FINANCING', 'RENT'];
  return negativeTypes.includes(type);
}

export function StoreDetailsPage() {
  const { storeId } = useParams<{ storeId: string }>();
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const storeName = (location.state as { storeName?: string })?.storeName;

  React.useEffect(() => {
    async function loadTransactions() {
      if (!storeId) return;
      try {
        setIsLoading(true);
        await sleep();

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

  const subtotal = transactions.reduce((acc, tx) => {
    const value = Math.abs(tx.value);
    return isNegativeTransaction(tx.type as CNABType)
      ? acc - value
      : acc + value;
  }, 0);

  return (
    <div className={styles.card}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <ArrowLeft size={16} />
        Voltar
      </button>
      <div className={styles.container}>
        <h2> Transações da Loja {storeName ? `- ${storeName}` : ''}</h2>

        {isLoading ? (
          <div className={styles.loading}>
            <Spinner />
          </div>
        ) : transactions.length === 0 ? (
          <EmptyState
            title="Nenhuma transação encontrada"
            description="Essa loja ainda não possui registros de transações."
          />
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>CPF</th>
                <th>Cartão</th>
                <th>Valor</th>
                <th>Data da transação</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 &&
                transactions?.map((tx) => (
                  <tr key={tx.id}>
                    <td>{tx.type}</td>
                    <td>{tx.cpf}</td>
                    <td>{tx.card}</td>
                    <td
                      className={
                        isNegativeTransaction(tx.type as CNABType)
                          ? styles.negative
                          : styles.positive
                      }
                    >
                      R$ {isNegativeTransaction(tx.type as CNABType) ? '-' : ''}
                      {Math.abs(tx.value).toFixed(2)}
                    </td>
                    <td>{new Date(tx.transactionAt).toLocaleString()}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}

        {!isLoading && (
          <p className={styles.subtotal}>Subtotal: R$ {subtotal.toFixed(2)}</p>
        )}
      </div>
    </div>
  );
}
