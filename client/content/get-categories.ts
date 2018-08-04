import * as contentful from 'contentful';

interface Category {
  name: string;
  image: contentful.Asset;
}

const getCategories = async (): Promise<Array<Category>> => {
  const entries: contentful.EntryCollection<Category> = await fetch('/api/content/entries');

  return entries.items.map(entry => ({
    name: entry.fields.name,
    image: entry.fields.image.fields.file.url
  }));
};

export default getCategories;
