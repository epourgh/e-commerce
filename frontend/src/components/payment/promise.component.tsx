import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51IaXztHM7dAIbx9CakfK3kB9ebDbihca7cXkvesYQyp4wsVZnsxeOAdwDJDivwmdocL7zMBJO4FdVaubqR7b2JFR00FhMThIzn');

export default stripePromise;