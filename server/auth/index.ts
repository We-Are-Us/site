import logger from '../logging/logger';
import { ResponseToolkit } from 'hapi';
import { createConnection, ConnectionOptions } from 'typeorm';
import { Account } from '../entity/Account';
import * as ono from 'ono';

export interface Credentials {
  sub: string;
  cn: string;
  email?: string;
  scope?: string;
}

export const success = async (
  credentials: Credentials,
  request: Request,
  h: ResponseToolkit
) => {
  logger.debug('success: %O', credentials);
};

export const transformer = async (credentials: Credentials) => {
  const email = credentials.sub.split('|').slice(-1)[0];

  credentials.cn = email.substr(0, email.indexOf('@'));
  // TODO: lookup user in db and workout role
  // also if no user what do we do?

  logger.debug('credentials: %o', credentials);

  const connectionOptions: ConnectionOptions = {
    type: 'postgres',
    host: process.env.TYPEORM_HOST || 'localhost',
    port: parseInt(process.env.TYPEORM_PORT || '5432', 10),
    username: process.env.TYPEORM_USERNAME || '',
    password: process.env.TYPEORM_PASSWORD || '',
    database: process.env.TYPEORM_DATABASE || '',
    entities: [Account],
    // This has to be off for Postgres to not go boom
    synchronize: false,
    logging: true
  };

  logger.debug('connectionOptions: %o', connectionOptions);

  const connection = await createConnection(connectionOptions);

  logger.debug('connection.entityMetadatas: %o', connection.entityMetadatas);

  try {
    logger.debug('search for account where username: %s', credentials.email);

    const account: Account | undefined = await connection
      .getRepository(Account)
      .findOne({ username: credentials.email });

    logger.debug('account: %o', account);

    const role = account ? account.role_id : 0;

    switch (role) {
      case 1:
        credentials.scope = 'user';
      case 2:
        credentials.scope = 'practitioner';
        break;
      case 3:
        credentials.scope = 'admin';
        break;
      default:
        credentials.scope = '';
    }
  } catch (err) {
    logger.error(err.message);

    throw ono.error('Error when trying to query database', err);
  } finally {
    await connection.close();
  }

  logger.debug('credentials: %o', credentials);

  return credentials;
};

// optional
export const error = async (
  err: Error,
  request: Request,
  h: ResponseToolkit
) => {
  logger.error(err.message);

  const response = h.response('<h1>Oh hey, sorry, something went wrong.</h1>');

  return response.takeover();
};
