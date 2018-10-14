import { ContentfulClientApi, Entry, EntryCollection } from 'contentful';
import Category from '../domain/Category';

const getCategories = async (
  client: ContentfulClientApi
): Promise<Entry<Category>[]> => {
  const entries: EntryCollection<Category> = await client.getEntries<Category>({
    content_type: 'category'
  });

  return entries.items;
};

export default getCategories;
