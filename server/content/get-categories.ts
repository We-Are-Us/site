import {Asset, ContentfulClientApi, Entry, EntryCollection} from 'contentful';

interface Category {
  name: string;
  image: Asset;
}

const getCategories = async (client: ContentfulClientApi): Promise<Entry<Category>[]> => {
  const entries: EntryCollection<Category> = await client.getEntries<Category>({
    content_type: 'category'
  });

  return entries.items;
};

export default getCategories;
