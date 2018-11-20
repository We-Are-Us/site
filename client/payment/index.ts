// tslint:disable-next-line:no-reference
/// <reference path="../../node_modules/@types/stripe-v3/index.d.ts"/>
import stripeTokenHandler from './stripeTokenHandler';

// Custom styling can be passed to options when creating an Element.
const style = {
  base: {
    // Add your base input styles here. For example:
    fontSize: '16px',
    color: '#212529'
  }
};

// FIXME: this is the test API key
const stripe = Stripe('pk_test_4KyBr6yn4LqYkHn9jfrJ074D');
const elements = stripe.elements();

// Create an instance of the card Element.
const card = elements.create('card', { style });

// Add an instance of the card Element into the `card-element` <div>.
card.mount('#card-element');

// tslint:disable-next-line:no-console
console.log(card);

card.on('change', event => {
  const displayError = document.getElementById('card-errors');

  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

// Create a token or display an error when the form is submitted.
const form = document.getElementById('payment-form');

form.addEventListener('submit', async event => {
  event.preventDefault();

  const result = await stripe.createToken(card);

  if (result.error) {
    // Inform the customer that there was an error.
    const errorElement = document.getElementById('card-errors');

    errorElement.textContent = result.error.message;
  } else {
    // Send the token to your server.
    stripeTokenHandler(result.token);
  }
});
