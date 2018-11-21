import logger from '../logging/logger';
import { Request, ResponseToolkit } from 'hapi';
import { Account } from '../entity/Account';
import * as ono from 'ono';
import { createDatabaseConnection } from '../database';

export const IS_LOGGED_IN_COOKIE_NAME = 'is-logged-in';

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

  // FIXME: doesn't work
  request.yar.set('IS_LOGGED_IN_COOKIE_NAME', {
    isLoggedIn: true
  });

  return h.continue;
};

export const transformer = async (credentials: Credentials) => {
  const email = credentials.sub.split('|').slice(-1)[0];

  credentials.cn = email.substr(0, email.indexOf('@'));
  // TODO: lookup user in db and workout role
  // also if no user what do we do?

  logger.debug('credentials: %o', credentials);

  const connection = await createDatabaseConnection();

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
