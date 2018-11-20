import * as Stripe from 'stripe';
import { customers, subscriptions } from 'stripe';
import logger from '../../logging/logger';

// TODO: API Key
export const createClient = () =>
  new Stripe('sk_test_vXEGjLzSnaBxYXhK8FBE3QKf');

export const createCustomer = async (
  client: Stripe,
  customer: customers.ICustomerCreationOptions
) => {
  const response = await client.customers.create(customer);

  logger.debug('Stripe create customer response: %o', response);

  return response;
};

export const applyCoupon = async (
  client: Stripe,
  subscription: subscriptions.ISubscription,
  coupon: string
) => {
  const subscriptionId = subscription.id;
  const subscriptionUpdateOptions: subscriptions.ISubscriptionUpdateOptions = {
    coupon
  };

  const response = await client.subscriptions.update(
    subscriptionId,
    subscriptionUpdateOptions
  );

  return response;
};
