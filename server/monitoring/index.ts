import config from '../config';
import logger from '../logging/logger';
import { setup } from 'applicationinsights';

/* const instrumentationKey = config.get('appInsights.instrumentationKey');

if (instrumentationKey !== '') {
  setup(instrumentationKey).start();

  logger.log('debug', 'Applicationm Insights started.');
} else { */
logger.log('info', 'No monitoring.');
// }
