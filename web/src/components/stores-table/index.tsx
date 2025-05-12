import styles from './styles.module.scss';

const mockStores = [
  { id: '1', name: 'Bar do João', owner: 'João Macedo', balance: 1500.75 },
  {
    id: '2',
    name: 'Mercado Avenida',
    owner: 'Maria Oliveira',
    balance: -250.5,
  },
  { id: '3', name: 'Loja Exemplo', owner: 'Carlos Souza', balance: 3000 },
];

export function StoresTable() {
  return (
    <div className={styles.card}>
      <div className={styles.tableWrapper}>
        <h2 className={styles.title}>Lojas Cadastradas</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome da Loja</th>
              <th>Dono da Loja</th>
              <th>Saldo Final</th>
            </tr>
          </thead>
          <tbody>
            {mockStores.map((store) => (
              <tr key={store.id}>
                <td>{store.name}</td>
                <td>{store.owner}</td>
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
      </div>
    </div>
  );
}
