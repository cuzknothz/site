'use server';

import WorksPage from '@/components/Works/WorksPage';
import { getAllWork } from '../actions';

export default async function WPage() {
  const { ok, data } = await getAllWork();
  console.log('data', data);
  return (
    <div>
      <WorksPage data={data!} />
    </div>
  );
}
