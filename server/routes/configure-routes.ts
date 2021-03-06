import { Server, Request, Lifecycle } from 'hapi';
import { Marked } from 'marked-ts';
import { omit } from 'lodash';
import logger from '../logging/logger';
import config from '../config';
import contentfulClient from '../content/client';
import getCategories from '../content/get-categories';
import getPracticioner from '../content/get-practitioner';
import getPracticioners from '../content/get-practitioners';
import getText from '../content/get-text';
import getTitledText from '../content/get-titled-text';
import getHeaderLinks from '../features/header-links';
import { footerLinks } from '../features/footer-links';
import isLoggedIn from './isLoggedIn';
import variation, { getUser } from '../variation/index';
import { HOMEPAGE_VARIATION } from '../variation/variations';

const EXPIRES_IN_SECONDS = 7200;

const getViewContext = (request: Request) => ({
  gtmContainerId: config.get('gtm.containerId'),
  jsBundle:
    config.get('env') === 'production'
      ? '/public/app.js'
      : 'http://localhost:1234/app.js',
  navigationTextColor: request.url.pathname === '/' ? 'white' : 'primary',
  navigationOutlineColor: request.url.pathname === '/' ? 'light' : 'primary',
  headerLinks: getHeaderLinks(isLoggedIn(request)),
  footerLinks
});

const handler: Lifecycle.Method = async (request, h) => {
  logger.debug('request.auth: %o', request.auth);

  // TODO: this should go in a separate module so it can be cached, reused, etc.
  const client = contentfulClient;

  const promises = await Promise.all([
    // getCategories(client),
    getText(client, 'lead')
    // getTitledText(client, 'benefit-1'),
    // getTitledText(client, 'benefit-2')
  ]);

  // const entries = promises[0];
  const lead = promises[0];

  /* const categories = entries.map((entry: Entry<any>) => ({
    name: entry.fields.name,
    image: entry.fields.image.fields.file.url
  })); */

  // const i = Math.floor(Math.random() * categories.length);
  // const modality = categories[i];

  // session id

  const user = getUser(request);
  logger.debug('user: %o', user);

  const showFeature = await variation(HOMEPAGE_VARIATION, user, false);

  if (showFeature) {
    return h
      .view(
        'index',
        Object.assign({ lead: Marked.parse(lead) }, getViewContext(request))
      )
      .header('Accept-CH', 'DPR, Viewport-Width, Width');
    // .header('link', `<${modality.image}>; rel=prefetch`);
  } else {
    return h
      .view(
        'prelaunch',
        omit(getViewContext(request), ['headerLinks', 'footerLinks'])
      )
      .header('Accept-CH', 'DPR, Viewport-Width, Width');
  }
};

const configureRoutes = (server: Server) => {
  server.route({
    method: 'GET',
    path: '/public/{param*}',
    options: {
      cache: {
        expiresIn: EXPIRES_IN_SECONDS,
        privacy: 'public'
      }
    },
    handler: {
      directory: {
        path: './public',
        redirectToSlash: true,
        index: true,
        etagMethod: 'simple'
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/',
    handler
  });

  server.route({
    method: 'GET',
    path: '/homepage',
    handler: async (request, h) => {
      logger.debug('request.auth: %o', request.auth);

      // TODO: this should go in a separate module so it can be cached, reused, etc.
      const client = contentfulClient;

      const promises = await Promise.all([
        // getCategories(client),
        getText(client, 'lead')
        // getTitledText(client, 'benefit-1'),
        // getTitledText(client, 'benefit-2')
      ]);

      // const entries = promises[0];
      const lead = promises[0];

      /* const categories = entries.map((entry: Entry<any>) => ({
        name: entry.fields.name,
        image: entry.fields.image.fields.file.url
      })); */

      // const i = Math.floor(Math.random() * categories.length);
      // const modality = categories[i];

      // session id

      return h
        .view(
          'index',
          Object.assign({ lead: Marked.parse(lead) }, getViewContext(request))
        )
        .header('Accept-CH', 'DPR, Viewport-Width, Width');
      // .header('link', `<${modality.image}>; rel=prefetch`);
    }
  });

  server.route({
    method: 'GET',
    path: '/practitioners',
    handler: async (request, h) => {
      const practitioners = await getPracticioners(contentfulClient);

      logger.debug('practitioners: %O', practitioners);

      return h.view(
        'practitioners',
        Object.assign({ practitioners }, getViewContext(request))
      );
    }
  });

  server.route({
    method: 'GET',
    path: '/practitioners/{name}',
    handler: async (request, h) => {
      const identifier = '6bcd8e2a-030c-4763-b3d8-38234f28da9d';
      const practitioner = await getPracticioner(contentfulClient, identifier);

      logger.debug('practitioner: %O', practitioner);
      // FIXME: we want address and we can convert to lat/lon with other tools
      logger.debug(
        'practitioner.contactLocation %O',
        practitioner.contactLocation
      );
      // 6bcd8e2a-030c-4763-b3d8-38234f28da9d
      // TODO: look up
      const modalities = ['Reflexology', 'Reki'];
      // const heroImage = '/public/assets/profile_header_1.jpg';
      // const practiceName = 'Walk In Light';
      // const location = 'Albany, Auckland';

      return h.view(
        'practitioner',
        Object.assign({ practitioner }, getViewContext(request))
      );
    }
  });
  // ['/', '/practicioner'].forEach(path => {
  // });

  server.route({
    method: 'GET',
    path: '/register',
    handler: (request, h) => {
      // TODO: put in features from contentful
      return h.view('register', getViewContext(request));
    }
  });

  server.route({
    method: 'GET',
    path: '/api/content/entries',
    handler: async (request, h) => {
      const client = contentfulClient;
      const categories = await getCategories(client);

      return categories;
    }
  });

  server.route({
    method: 'GET',
    path: '/view/{name}',
    handler: (request, h) => {
      if (process.env.NODE_ENV !== 'development') {
        throw new Error('/view/* is only supported in development mode');
      }

      const name = request.params.name;

      return h.view(name, getViewContext(request));
    }
  });

  server.route({
    method: 'GET',
    path: '/secure',
    options: {
      auth: {
        strategy: 'auth0',
        scope: ['user', 'admin']
      }
    },
    handler: async (request, h) => {
      logger.debug('request.headers: %O', request.headers);
      logger.debug('request.auth: %O', request.auth);

      return 'ok';
    }
  });
};

export default configureRoutes;
