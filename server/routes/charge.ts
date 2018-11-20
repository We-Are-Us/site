import { Request, ResponseToolkit, ServerRoute } from 'hapi';
import logger from '../logging/logger';
import boom = require('boom');
import subscribeMember from '../api/subscribeMember';
import discounts from '../billing/discounts';
import { RegistrationCookie, REGISTRATION_COOKIE_NAME } from './registration';
import getViewContext from './getViewContext';

interface ChargeDto {
  stripeToken: string;
}

const routes: ReadonlyArray<ServerRoute> = [
  {
    method: 'GET',
    path: '/charge',
    // TODO: if no session data reject
    handler: (request: Request, h: ResponseToolkit) =>
      h.view('payment', getViewContext(request))
  },
  {
    method: 'POST',
    path: '/charge',
    // TODO: validate
    handler: async (request: Request, h: ResponseToolkit) => {
      try {
        const { stripeToken } = request.payload as ChargeDto;
        const { description, email, plan } = request.yar.get(
          REGISTRATION_COOKIE_NAME
        ) as RegistrationCookie;

        const customer = await subscribeMember({
          description,
          email,
          plan,
          token: stripeToken
        });

        const subscription = customer.subscriptions.data[0];

        /*
        if (subscription) {
          const tasks = discounts
            .filter(discount => discount.canBeApplied())
            .map(discount => discount.apply(subscription));

          // can we do this - maybe applying in parallel is a bad idea
          await Promise.all(tasks);
        }
        */

        // redirect to profile setup
        return h.redirect('/view/profile-setup');
      } catch (err) {
        logger.error(err.message);

        throw boom.boomify(err);
      }
    }
  }
];

export default routes;
