import { sqlNeon } from '@/lib/db';

export async function getAllNote() {
  try {
    const rows =
      await sqlNeon`SELECT id, title, content FROM notes ORDER BY id DESC`;
    return {
      ok: true as const,
      data: rows as { id: string | number; title: string; content: string }[],
    };
  } catch (e: any) {
    return { ok: false as const, error: 'Failed to load notes' };
  }
}

export async function getAllWork() {
  try {
    const rows =
      await sqlNeon`SELECT id, title, content, link FROM works ORDER BY id DESC`;
    return {
      ok: true as const,
      data: rows as {
        id: string | number;
        title: string;
        content: string;
        link: string;
      }[],
    };
  } catch (e: any) {
    return { ok: false as const, error: 'Failed to load works' };
  }
}
