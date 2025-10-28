import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const baseAppUrl = process.env.APP_URL || 'http://localhost:5001/api';

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  APP_URL: baseAppUrl,
  bycrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  default_admin_pass:
    process.env.DEFAULT_ADMIN_PASS ??
    (process.env.DEFAULT_ADMIN_PASS || '123456'),
  redis: {
    url: process.env.REDIS_URL,
    exprires_in: process.env.REDIS_TOKEN_EXPRES_IN,
  },
  rabbitmq: {
    url: process.env.RABBITMQ_URL || 'amqp://localhost:5672',
  },
};
