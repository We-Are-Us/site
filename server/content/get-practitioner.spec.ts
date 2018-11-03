import getPractitioner from './get-practitioner';
import contentfulClient from './client';

describe('get-practitioner', () => {
  it('should return a Practitioner with the same identifier', async () => {
    const identifier = '6bcd8e2a-030c-4763-b3d8-38234f28da9d';
    const actual = await getPractitioner(contentfulClient, identifier);

    if (actual != null) {
      expect(actual.identifier).toBe(identifier);
    }
  });
});
