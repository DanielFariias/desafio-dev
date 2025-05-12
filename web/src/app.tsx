import { AppLayout } from './components/app-layout';
import { Router } from './pages/router';

export function App() {
  return (
    <AppLayout>
      <Router />
    </AppLayout>
  );
}
