import { config } from 'dotenv';
import { cleanEnv, port, str } from 'envalid';

const NODE_ENV = process.env.NODE_ENV || 'development';

config({ path: `.env.${NODE_ENV}` });

export const CONFIG = cleanEnv(process.env, {
  PORT: port({ default: 3000 }),

  DB_HOST: str({ default: 'localhost' }),
  DB_PORT: port({ default: 3306 }),
  DB_USER: str({ default: 'root' }),
  DB_PASSWORD: str({ default: 'root' }),
  DB_NAME: str({ default: 'cub_deploy' }),
});
