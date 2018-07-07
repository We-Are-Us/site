require('dotenv-safe').load({
    allowEmptyValues: true
  });

  require('./server/monitoring/index');
  require('./server/start');
