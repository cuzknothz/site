import type { Metadata } from 'next';

export const metadata: Metadata = {
  icons: { icon: '/favicon/note.svg' },
};

export default function NoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children as any;
}
