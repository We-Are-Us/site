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
  auth0: {
    // bitter-snowflake-7928
    managementApi: {
      clientId: {
        doc: 'Auth0 management API client ID',
        format: String,
        default: '',
        env: 'AUTH0_MANAGEMENT_API_CLIENT_ID'
      },
      clientSecret: {
        doc: 'Auth0 management API client secret',
        format: String,
        default: '',
        env: 'AUTH0_MANAGEMENT_API_CLIENT_SECRET'
      }
    },
    audience: {
      doc: 'Auth0 audience',
      format: String,
      default: '',
      env: 'AUTH0_AUDIENCE'
    },
    clientId: {
      doc: 'Auth0 client ID',
      format: String,
      default: '',
      env: 'AUTH0_CLIENT_ID'
    },
    clientSecret: {
      doc: 'Auth0 client secret',
      format: String,
      default: '',
      env: 'AUTH0_CLIENT_SECRET'
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
  } /*,
  mailchimp: {
    apiKey: {
      doc: 'Mailchimp API key',
      format: String,
      default: null,
      env: 'MAILCHIMP_API_KEY'
    },
    listId: {
      doc: 'Mailchimp List ID',
      format: String,
      default: null,
      env: 'MAILCHIMP_LIST_ID'
    }
  }*/
});

config.validate({ allowed: 'strict' });

export default config;
