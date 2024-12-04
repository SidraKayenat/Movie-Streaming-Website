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
import { createPaymentIntent } from '../controllers/payment.controller.js';

const router = express.Router();

// Route to create a payment intent (no authentication required)
router.post('/create-payment-intent', createPaymentIntent);

export default router;
