import logger from '../logging/logger';
import {setup} from 'applicationinsights';

if (process.env.APPINSIGHTS_INSTRUMENTATIONKEY) {
  setup(process.env.APPINSIGHTS_INSTRUMENTATIONKEY).start();

  logger.log('debug', 'Applicationm Insights started.');
} else {
  logger.log('info', 'No monitoring.');
}
