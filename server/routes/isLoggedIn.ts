import { Request } from 'hapi';
import { IS_LOGGED_IN_COOKIE_NAME } from '../auth';
import logger from '../logging/logger';

const isLoggedIn = (request: Request) => {
  const result = request.yar.get(IS_LOGGED_IN_COOKIE_NAME);

  logger.debug('isLoggedIn: %o', result);

  if (result != null && typeof result === 'object') {
    return result.isLoggedIn;
  }

  return false;
};

export default isLoggedIn;
