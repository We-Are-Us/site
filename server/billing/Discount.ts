import { subscriptions } from 'stripe';

interface Discount {
  canBeApplied: () => boolean;

  apply: (
    subscription: subscriptions.ISubscription,
    coupon: string
  ) => Promise<subscriptions.ISubscription>;
}

export default Discount;
