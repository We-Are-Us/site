import { Request } from 'hapi';
import logger from '../logging/logger';

// TODO: there will be a cookie with OAuth info
const isLoggedIn = (request: Request) => {
  logger.debug('request.state: %o', request.state);

  return false;
};

export default isLoggedIn;
