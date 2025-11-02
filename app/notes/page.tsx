'use server';

import { NotesPage } from '@/components/Notes/NotesPage';
import { getAllNote } from '../actions';

export default async function NotePage() {
  const { ok, data } = await getAllNote();
  return (
    <div>
      <NotesPage data={data!} />
    </div>
  );
}
