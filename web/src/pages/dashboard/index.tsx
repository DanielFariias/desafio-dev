import { StoresTable } from '../../components/stores-table';
import { UploadCard } from '../../components/upload-card';

export function Dashboard() {
  return (
    <div>
      <UploadCard />
      <StoresTable />
    </div>
  );
}
