import { customers } from 'stripe';
import { createClient, createCustomer } from '../integrations/stripe';
import Plan from '../domain/Plan';

// This is very similar to RegistrationCookie
interface Subscription {
  description: string;
  email: string;
  token: string;
  plan: Plan;
}

// TODO: change plans

const subscribeMember = async (
  subscription: Subscription
): Promise<customers.ICustomer> => {
  const stripe = createClient();

  const { description, email, token } = subscription;
  const plan = subscription.plan.id;

  const customerCreationOptions: customers.ICustomerCreationOptions = {
    email,
    plan,
    description,
    source: token
  };

  const customer = await createCustomer(stripe, customerCreationOptions);

  return customer;
};

export default subscribeMember;
