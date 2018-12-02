import contentfulClient from '../content/client';
import { Lifecycle } from 'hapi';
import { omit } from 'lodash';
import logger from '../logging/logger';
import getText from '../content/get-text';
import { Marked } from 'marked-ts';
import getViewContext from './getViewContext';
import variation, { getUser } from '../variation/index';
import { HOMEPAGE_VARIATION } from '../variation/variations';

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

export default handler;
