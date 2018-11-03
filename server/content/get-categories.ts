import { ContentfulClientApi } from 'contentful';
import CategoryDto, { dtoToDomain } from '../dto/CategoryDto';
import Category from '../domain/Category';
import itemToFields from './itemToFields';
import logger from '../logging/logger';

const getCategories = async (
  client: ContentfulClientApi
): Promise<Category[]> => {
  const entries = await client.getEntries<CategoryDto>({
    content_type: 'category'
  });

  logger.debug('entries.items: %j', entries.items);

  return entries.items.map(itemToFields).map(dtoToDomain);
};

export default getCategories;
