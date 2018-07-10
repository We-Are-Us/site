import * as contentful from 'contentful';

interface Category {
  name: string;
  image: contentful.Asset;
}

const getCategories = async (client: contentful.ContentfulClientApi) => {
  const entries: contentful.EntryCollection<Category> = await client.getEntries<Category>({
    'content_type': 'category'
  });

  console.log('entries', entries);

  return entries.items.map(entry => ({
    name: entry.fields.name,
    image: entry.fields.image.fields.file.url
  }));
};

export default getCategories;
