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
  auth: {
    audience: {
      // doc: '',
      format: 'url',
      default: null,
      env: 'AUTH_AUDIENCE',
      sensitive: true
    },
    issuer: {
      // doc: '',
      format: 'url',
      default: null,
      env: 'AUTH_ISSUER'
    },
    jwksUri: {
      // doc: '',
      format: 'url',
      default: null,
      env: 'AUTH_JWKS_URI'
    }
  },
  database: {
    url: {
      doc: 'Database connection URL',
      format: String,
      default: 'postgres://localhost:5432/weareus',
      env: 'DATABASE_URL'
    }
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
      default: '',
      env: 'GTM_CONTAINER_ID'
    }
  } /* ,
  appInsights: {
    instrumentationKey: {
      doc: 'Azure Application Insights instrumentation key.',
      format: String,
      default: '',
      env: 'APPINSIGHTS_INSTRUMENTATIONKEY',
      secret: true
    }
  } */
});

config.validate({ allowed: 'strict' });

export default config;
