import { Route, Routes } from 'react-router-dom';
import { Dashboard } from './dashboard';
import { StoreDetailsPage } from './store-details';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/stores/:storeId" element={<StoreDetailsPage />} />
    </Routes>
  );
}
