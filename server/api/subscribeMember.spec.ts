/// <reference path="../types/index.d.ts" />
import subscribeMember from './subscribeMember';
import * as random_name from 'node-random-name';
import { StandardPlan } from '../domain/Plan';

// as per https://stripe.com/docs/testing#international-cards
const VALID_TOKEN = 'tok_nz';

describe('subscribeMember', () => {
  describe('subscribeMember', () => {
    it('should work', async () => {
      const firstName = random_name({ first: true });
      const lastName = random_name({ last: true });
      const description = `${firstName} ${lastName}`;
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@mailnator.com`;

      const subscription = {
        email,
        description,
        token: VALID_TOKEN,
        plan: StandardPlan
      };

      const actual = await subscribeMember(subscription);

      expect(actual.id).not.toBeUndefined();
      expect(actual.object).toBe('customer');
      expect(actual.description).toBe(description);
      expect(actual.subscriptions.data.length).toBe(1);
      expect(actual.subscriptions.data[0].object).toBe('subscription');
      expect(actual.subscriptions.data[0].plan.id).toBe(StandardPlan.id);
    });
  });
});
