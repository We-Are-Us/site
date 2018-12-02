import { Lifecycle } from 'hapi';
import logger from '../logging/logger';
import contentfulClient from '../content/client';
import getText from '../content/get-text';
import { getUser } from '../variation';
import { Marked } from 'marked-ts';
import getViewContext from './getViewContext';

const homepageHandler: Lifecycle.Method = async (request, h) => {
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

  return h
    .view(
      'index',
      Object.assign({ lead: Marked.parse(lead) }, getViewContext(request))
    )
    .header('Accept-CH', 'DPR, Viewport-Width, Width');
  // .header('link', `<${modality.image}>; rel=prefetch`);
};

export default homepageHandler;
