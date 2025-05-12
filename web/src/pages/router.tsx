import { Route, Routes } from 'react-router-dom';
import { Dashboard } from './dashboard';
import { StoreDetailsPage } from './store-details';
import { LoginPage } from './login';
import { RequireAuth } from './require-auth';
import { RegisterPage } from './register';

export function Router() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/stores/:storeId"
        element={
          <RequireAuth>
            <StoreDetailsPage />
          </RequireAuth>
        }
      />
    </Routes>
  );
}
