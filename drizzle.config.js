import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
    schema: './config/schema.js',
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://neondb_owner:WcRL0n9xTSPd@ep-soft-frog-a1sl3oak.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
    },
});
