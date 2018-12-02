// tslint:disable-next-line:no-reference
/// <reference path="../../node_modules/@types/stripe-v3/index.d.ts"/>
const stripeTokenHandler = (token: stripe.Token) => {
  // Insert the token ID into the form so it gets submitted to the server
  const form = document.getElementById('payment-form') as HTMLFormElement;
  const hiddenInput = document.createElement('input');

  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeToken');
  hiddenInput.setAttribute('value', token.id);

  form.appendChild(hiddenInput);

  // Submit the form
  form.submit();
};

export default stripeTokenHandler;
