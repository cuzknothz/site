import { neon, neonConfig } from '@neondatabase/serverless';

let sqlNeonInstance: ReturnType<typeof neon> | null = null;

export function getSqlNeon() {
  if (!sqlNeonInstance) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error('DATABASE_URL is not set');
    sqlNeonInstance = neon(url);
  }
  return sqlNeonInstance;
}
