import * as contentful from 'contentful';

interface Category {
  name: string;
  image: contentful.Asset;
}

const getCategories = async (): Promise<Array<Category>> => {
  const response: contentful.EntryCollection<Category> = await fetch('/api/content/entries');
  const entries = await response.json();

  return entries;
};

export default getCategories;
