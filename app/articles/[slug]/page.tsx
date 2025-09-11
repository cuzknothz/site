import { ArticleDetail } from '@/components/article/ArticleDetail';

export function generateStaticParams() {
  return [{ slug: '1' }, { slug: '2' }, { slug: '3' }];
}
export default function ArticleDetailPage() {
  return (
    <div>
      <ArticleDetail />
    </div>
  );
}
