import { SectionPage } from './SectionPage';
export default async function SpotifySectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <SectionPage slug={slug} />;
}
