import * as convict from 'convict';

require('dotenv').config();

const config = convict({
  env: {
    doc: 'The applicaton environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'Server port.',
    format: String,
    default: '8080'
  },
  logLevel: {
    doc: 'Logging level.',
    format: ['error', 'warn', 'info', 'verbose', 'debug', 'silly'],
    default: 'info',
    env: 'LOG_LEVEL'
  },
  contentful: {
    spaceId: {
      doc: 'Contentful space ID.',
      format: String,
      default: '',
      env: 'CONTENTFUL_SPACE_ID'
    },
    accessToken: {
      doc: 'Contentful access token.',
      format: String,
      default: '',
      env: 'CONTENTFUL_ACCESS_TOKEN',
      secret: true
    }
  },
  gtm: {
    containerId: {
      doc: 'Google Tag Manager container ID.',
      format: String,
      default: ''
    }
  },
  appInsights: {
    instrumentationKey: {
      doc: 'Azure Application Insights instrumentation key.',
      format: String,
      default: '',
      secret: true
    }
  }
});

config.validate({ allowed: 'strict' });

export default config;
