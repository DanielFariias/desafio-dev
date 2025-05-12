import { useParams } from 'react-router-dom';

export function StoreDetailsPage() {
  const { storeId } = useParams();

  return (
    <div>
      <h2>Detalhes da Loja</h2>
      <p>ID da loja: {storeId}</p>
    </div>
  );
}
