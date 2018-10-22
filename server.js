try {
  require('dotenv-safe').load({
    allowEmptyValues: true
  });
} catch (e) {
  console.warn('Exception thrown when loading dotenv-safe');
}

console.dir(process.env);

const logger = require('./server/logging/logger').default;

logger.log('debug', 'process.env %O', process.env);

require('./server/start');
