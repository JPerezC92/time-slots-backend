export enum EnvironmentVariables {
  APP_PORT = 'APP_PORT',
  NODE_ENV = 'NODE_ENV',

  DB_CONNECTION = 'DB_CONNECTION',
  DB_HOST = 'DB_HOST',
  DB_PORT = 'DB_PORT',
  DB_DATABASE = 'DB_DATABASE',
  DB_USERNAME = 'DB_USERNAME',
  DB_PASSWORD = 'DB_PASSWORD',

  JWT_SECRET = 'JWT_SECRET',
}

export type TEnvironmentVariables = Record<
  keyof typeof EnvironmentVariables,
  string
>;
