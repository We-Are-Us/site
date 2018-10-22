try {
  require('dotenv-safe').load({
    allowEmptyValues: true
  });
} catch (e) {
  console.warn('Exception thrown when loading dotenv-safe');
}

// console.dir(process.env);

require('./server/start');
