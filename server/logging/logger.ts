import {createLogger, format, transports} from 'winston';
const {combine, timestamp, printf} = format;

const level: string = ((logLevel: string) => {
  if (['error', 'warn', 'info', 'verbose', 'debug', 'silly'].indexOf(logLevel) > -1) {
    return logLevel;
  }

  return 'info';
})(process.env.LOG_LEVEL || 'info');

const logFormat = printf(info => (
  `${info.timestamp} ${info.level}: ${info.message}`
));

const logger = createLogger({
  level,
  format: combine(
    timestamp(),
    logFormat
  ),
  transports: [
    new transports.Console()
  ]
});

export default logger;
