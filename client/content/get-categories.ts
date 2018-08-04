import {EntryCollection} from 'contentful';
import Category from '../domain/Category';

const getCategories = async (): Promise<Array<Category>> => {
  const response: EntryCollection<Category> = await fetch('/api/content/entries');
  const entries = await response.json();

  return entries;
};

export default getCategories;
