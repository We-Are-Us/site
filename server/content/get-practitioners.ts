import { ContentfulClientApi, Entry, EntryCollection } from 'contentful';
import Practitioner from '../domain/Practitioner';
import PractitionerDto, { dtoToDomain } from '../dto/PractitionerDto';
import itemToFields from './itemToFields';
import logger from '../logging/logger';

const getPractitioners = async (
  client: ContentfulClientApi
): Promise<Practitioner[]> => {
  const entries = await client.getEntries<PractitionerDto>({
    content_type: 'practitioner'
  });

  logger.debug('entries.items: %j', entries.items);

  return entries.items.map(itemToFields).map(dtoToDomain);
};

export default getPractitioners;
