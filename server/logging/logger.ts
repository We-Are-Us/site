import { createLogger, format, transports } from 'winston';
import config from '../config';
const { combine, timestamp, printf, splat } = format;

const level = config.get('logLevel');

const logFormat = printf(
  info => `${info.timestamp} ${info.level}: ${info.message}`
);

const logger = createLogger({
  level,
  format: combine(splat(), timestamp(), logFormat),
  transports: [new transports.Console()]
});

export default logger;
