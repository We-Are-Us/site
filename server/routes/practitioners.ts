import { ServerRoute } from 'hapi';
import contentfulClient from '../content/client';
import getPracticioner from '../content/get-practitioner';
import getPracticioners from '../content/get-practitioners';
import logger from '../logging/logger';
import getViewContext from './getViewContext';

const routes: ReadonlyArray<ServerRoute> = [
  {
    method: 'GET',
    path: '/practitioners',
    handler: async (request, h) => {
      const practitioners = await getPracticioners(contentfulClient);

      logger.debug('practitioners: %O', practitioners);

      return h.view(
        'practitioners',
        Object.assign(
          {
            practitioners
          },
          getViewContext(request)
        )
      );
    }
  },
  {
    method: 'GET',
    path: '/practitioners/{name}',
    handler: async (request, h) => {
      const identifier = '6bcd8e2a-030c-4763-b3d8-38234f28da9d';
      const practitioner = await getPracticioner(contentfulClient, identifier);

      logger.debug('practitioner: %O', practitioner);
      // FIXME: we want address and we can convert to lat/lon with other tools
      logger.debug(
        'practitioner.contactLocation %O',
        practitioner.contactLocation
      );
      // 6bcd8e2a-030c-4763-b3d8-38234f28da9d
      // TODO: look up
      const modalities = ['Reflexology', 'Reki'];
      // const heroImage = '/public/assets/profile_header_1.jpg';
      // const practiceName = 'Walk In Light';
      // const location = 'Albany, Auckland';

      return h.view(
        'practitioner',
        Object.assign(
          {
            practitioner
          },
          getViewContext(request)
        )
      );
    }
  }
];

export default routes;
