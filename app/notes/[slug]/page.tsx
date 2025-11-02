import { ArticleDetail } from '@/components/Note/NoteDetail';

export function generateStaticParams() {
  return [{ slug: '1' }, { slug: '2' }, { slug: '3' }];
}
export default function NoteDetailPage() {
  return (
    <div>
      <ArticleDetail />
    </div>
  );
}
