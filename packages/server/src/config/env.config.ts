import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config({
  quiet: true,
});

const readEnv = (key: string): string => {
  const value = process.env[key];

  if (!value) {
    console.log(chalk.red('Can not read env variable with key of ' + key));
    process.exit();
  }

  return value;
};

export const APP_PORT = readEnv('APP_PORT');
export const CLIENT_HOST = readEnv('CLIENT_HOST');
export const DB_CONNECTION_STRING = readEnv('DB_CONNECTION_STRING');
export const JWT_SECRET = readEnv('JWT_SECRET');
export const NODE_ENV = readEnv('NODE_ENV');
