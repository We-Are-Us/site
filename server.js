try {
  require('dotenv-safe').load({
    allowEmptyValues: true
  });
} catch (e) {
  console.warn('Exception thrown when loading dotenv-safe');
}

const logger = require('./server/logging/logger');

logger.debug('process.env %O', process.env);

require('./server/start');
