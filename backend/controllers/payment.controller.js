// // payment.controller.js
// import Stripe from 'stripe';

// // Initialize Stripe with your secret key
// const stripe = new Stripe('sk_test_51QRttoKCqI3VjcQbv2qXb0YpjjdLZpKPWQ3h53gPUTNFOsKoGf8kvPtFS9KgmHZn5zvFGSU3iqTHlmuIfkTHAfY800pRPLbFsy'); // Replace with your actual Stripe secret key

// export const createPaymentIntent = async (req, res) => {
//     try {
//         const { amount } = req.body; // Amount in cents (e.g., $50 = 5000 cents)
        
//         // Create a payment intent with the amount and currency
//         const paymentIntent = await stripe.paymentIntents.create({
//             amount,
//             currency: 'usd', // You can change this to 'pkr' or any other currency
//         });

//         // Send the client secret to the frontend
//         res.status(200).json({
//             clientSecret: paymentIntent.client_secret,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

// payment.controller.js
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe('sk_test_51QRttoKCqI3VjcQbv2qXb0YpjjdLZpKPWQ3h53gPUTNFOsKoGf8kvPtFS9KgmHZn5zvFGSU3iqTHlmuIfkTHAfY800pRPLbFsy'); // Replace with your actual Stripe secret key

// Create a payment intent
export const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body; // Amount in cents (e.g., $50 = 5000 cents)

    // Create a payment intent with the amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd', // You can change this to 'pkr' or any other currency
    });

    // Send the client secret to the frontend
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Payment Intent Creation Failed:', error); // Log the error
    res.status(500).json({ error: 'Internal server error' });
  }
};
