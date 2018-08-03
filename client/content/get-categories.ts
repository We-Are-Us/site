import * as contentful from 'contentful';

interface Category {
  name: string;
  image: contentful.Asset;
}

const getCategories = async (client: contentful.ContentfulClientApi): Promise<Array<Category>> => {
  const entries: contentful.EntryCollection<Category> = await client.getEntries<Category>({
    content_type: 'category'
  });

  return entries.items.map(entry => ({
    name: entry.fields.name,
    image: entry.fields.image.fields.file.url
  }));
};

export default getCategories;
