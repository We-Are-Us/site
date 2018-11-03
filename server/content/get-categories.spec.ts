import contentfulClient from './client';
import getCategories from './get-categories';

describe('getCategories', () => {
  it('should return an Array', async () => {
    const actual = await getCategories(contentfulClient);

    expect(Array.isArray(actual)).toBe(true);
  });

  it('should return provide imageUrl as a string', async () => {
    const actual = await getCategories(contentfulClient);

    const categoriesWithImages = actual.filter(
      category => category.imageUrl != null
    );

    categoriesWithImages.forEach(category => {
      // TODO: check these are URLs?
      expect(typeof category.imageUrl).toBe('string');
    });
  });
});
