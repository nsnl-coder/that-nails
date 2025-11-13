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
