import { neon, neonConfig } from '@neondatabase/serverless';

export const sqlNeon = neon(process.env.DATABASE_URL!);
