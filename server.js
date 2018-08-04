try {
  require('dotenv-safe').load({
    allowEmptyValues: true
  });
} catch (e) {
  console.warn('Exception thrown when loading dotenv-safe');
}

require('./server/monitoring/index');
require('./server/start');
