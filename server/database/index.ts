import { createConnection, Connection } from 'typeorm';
import { Account } from '../entity/Account';
import config from '../config';
import logger from '../logging/logger';
import * as ono from 'ono';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Practitioner } from '../entity/Practitioner';

export const getConnectionOptions = (
  databaseUrl: URL
): PostgresConnectionOptions => ({
  type: 'postgres',
  host: databaseUrl.hostname,
  port: parseInt(databaseUrl.port || '5432', 10),
  username: databaseUrl.username,
  password: databaseUrl.password,
  database: databaseUrl.pathname.substring(1),
  entities: [Account, Practitioner],
  // This has to be off for Postgres to not go boom
  synchronize: false,
  logging: true
});

export const createDatabaseConnection = async (): Promise<Connection> => {
  const databaseUrl = config.get('database.url');
  logger.debug('databaseUrl: %s', databaseUrl);

  const connectionOptions = getConnectionOptions(new URL(databaseUrl));
  logger.debug('connectionOptions: %o', connectionOptions);

  try {
    return await createConnection(connectionOptions);
  } catch (err) {
    throw ono.error(
      'Error thrown when trying to create database connection',
      err
    );
  }
};
