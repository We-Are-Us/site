import { ServerRoute } from 'hapi';
import contentfulClient from '../content/client';
import getCategories from '../content/get-categories';

const routes: ReadonlyArray<ServerRoute> = [
  {
    method: 'GET',
    path: '/api/content/entries',
    handler: async (request, h) => {
      const client = contentfulClient;
      const categories = await getCategories(client);

      return categories;
    }
  }
];

export default routes;
