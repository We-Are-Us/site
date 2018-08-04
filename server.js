try {
require('dotenv-safe').load({
    allowEmptyValues: true
  });
} catch (e) {
  console.log('error', e);XX
}

  require('./server/monitoring/index');
  require('./server/start');
