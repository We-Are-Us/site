import { subscriptions } from 'stripe';
import Discount from './Discount';
import { createClient, applyCoupon } from '../integrations/stripe';

export const EARLY_BIRD_DATE = new Date('2018-12-31 23:59:59:59z+1300');
const EARLY_BIRD_COUPON = 'UqtKrWvw';

class EarlyBirdDiscount implements Discount {
  canBeApplied() {
    const now = Date.now();

    return now < EARLY_BIRD_DATE.getTime();
  }

  async apply(subscription: subscriptions.ISubscription) {
    const stripe = createClient();

    return await applyCoupon(stripe, subscription, EARLY_BIRD_COUPON);
  }
}

export default EarlyBirdDiscount;
