import { ServerRoute } from 'hapi';
import getViewContext from './getViewContext';

const routes: ReadonlyArray<ServerRoute> = [
  {
    method: 'GET',
    path: '/register',
    handler: (request, h) => {
      // TODO: put in features from contentful
      return h.view('register', getViewContext(request));
    }
  }
];

export default routes;
