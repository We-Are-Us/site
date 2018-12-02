import { Request, ResponseToolkit, ServerRoute } from 'hapi';
import Membership from '../../shared/domain/Membership';
import getViewContext from './getViewContext';
import MembershipDetailsDto from '../../shared/dto/MembershipDetailsDto';
import registerMember from '../api/registerMember';
import Plan, { getPlan } from '../domain/Plan';
import * as HttpStatus from 'http-status-codes';
import boom = require('boom');
import logger from '../logging/logger';

export interface RegistrationCookie {
  plan: Plan;
  email: string;
  description: string;
}

export const REGISTRATION_COOKIE_NAME = 'registration';

const routes: ReadonlyArray<ServerRoute> = [
  {
    method: 'GET',
    path: '/registration',
    handler: (request: Request, h: ResponseToolkit) => {
      const membership = request.params.membership as Membership;

      // TODO: get plan pricing from Stripe

      return h.view(
        'registration',
        Object.assign(
          {
            membership
          },
          getViewContext(request)
        )
      );
    }
  },
  {
    method: 'POST',
    path: '/registration',
    handler: async (request, h) => {
      try {
        const dto = request.payload as MembershipDetailsDto;

        await registerMember(dto);

        const data: RegistrationCookie = {
          plan: getPlan(dto.membership),
          email: dto.emailAddress,
          description: dto.practiceName || `${dto.firstName} ${dto.lastName}`
        };

        request.yar.set(REGISTRATION_COOKIE_NAME, data);

        return h.response().code(HttpStatus.OK);
      } catch (err) {
        logger.error(err.message);

        throw boom.boomify(err);
      }
    }
  }
];

export default routes;
