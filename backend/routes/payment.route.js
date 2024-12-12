// // payment.route.js
// import express from 'express';
// import { createPaymentIntent} from '../controllers/payment.controller.js';
// const router = express.Router();

// // Route to create a payment intent
// router.post('/create-payment-intent', createPaymentIntent);

// export default router;



// payment.route.js
// payment.routes.js
// payment.routes.js
import express from 'express';
import { createPaymentIntent, updateSubscription } from '../controllers/payment.controller.js';

const router = express.Router();

// Route to create a payment intent (no authentication required)
router.post('/create-payment-intent', createPaymentIntent);

// Route to handle updating the user's subscription (authentication required)
router.post('/update-subscription', updateSubscription);

export default router;

