import { createClient } from 'contentful';
import config from '../config';

const space = config.get('contentful.spaceId');
const accessToken = config.get('contentful.accessToken');

const contentfulClient = createClient({
  space,
  accessToken
});

export default contentfulClient;
