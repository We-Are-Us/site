import { ContentfulClientApi, Entry, EntryCollection } from 'contentful';
import Category from '../domain/Category';
import logger from '../logging/logger';

const getCategories = async (
  client: ContentfulClientApi
): Promise<Entry<Category>[]> => {
  const entries: EntryCollection<Category> = await client.getEntries<Category>({
    content_type: 'category'
  });

  logger.debug('entries.items: %j', entries.items);

  return entries.items;
};

export default getCategories;
