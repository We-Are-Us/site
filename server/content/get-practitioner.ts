import { ContentfulClientApi, Entry } from 'contentful';
import Practitioner from '../domain/Practitioner';
import logger from '../logging/logger';
import PractitionerDto, { dtoToDomain } from '../dto/PractitionerDto';
import itemToFields from './itemToFields';

const getPractitioner = async (
  client: ContentfulClientApi,
  identifier: string
): Promise<Practitioner> => {
  const entries = await client.getEntries<PractitionerDto>({
    content_type: 'practitioner'
  });

  if (entries.items.length === 0) {
    throw new Error();
  }

  logger.debug('entries.items: %j', entries.items);

  return entries.items.map(itemToFields).map(dtoToDomain)[0];
};

export default getPractitioner;
