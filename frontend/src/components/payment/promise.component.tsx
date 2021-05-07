import { loadStripe } from '@stripe/stripe-js';
const envVariables = process.env;

const {
    STRIPE_PK
} = envVariables;

const stripePromise = loadStripe(STRIPE_PK);

export default stripePromise;