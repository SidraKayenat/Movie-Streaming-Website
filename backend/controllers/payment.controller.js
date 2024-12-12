



// import Stripe from 'stripe';

// // Initialize Stripe with your secret key
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Replace with your actual Stripe secret key

// // Create a payment intent
// export const createPaymentIntent = async (req, res) => {
//   try {
//     const { amount } = req.body; // Amount in cents (e.g., $50 = 5000 cents)

//     if (!amount || amount <= 0) {
//       return res.status(400).json({ error: 'Invalid amount' });
//     }

//     // Create a payment intent with the amount and currency
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency: 'usd', // Adjust the currency as needed
//     });

//     // Send the client secret to the frontend
//     res.status(200).json({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     console.error('Payment Intent Creation Failed:', error); // Log the error
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };



import Stripe from 'stripe';
// import { User } from '../models/User'; // Assuming you have a User model
import { User } from '../model/user.model.js'
// import { sendEmail } from '../utils/email'; // Optional: If you want to send a confirmation email

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Replace with your actual Stripe secret key

// Create a payment intent
export const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body; // Amount in cents (e.g., $50 = 5000 cents)

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // Create a payment intent with the amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd', // Adjust the currency as needed
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

// Update the subscription after successful payment
// Update the subscription after successful payment
// Update the subscription after successful payment
export const updateSubscription = async (req, res) => {
    try {
      const { email, subscriptionPlan } = req.body;
  
      if (!email || !subscriptionPlan) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      // Find the user by email
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Update the subscription plan
      user.subscriptionPlan = subscriptionPlan; // Example: "Basic" to "Premium"
      await user.save();
  
      // Optionally, send a confirmation email
    //   await sendEmail(user.email, 'Subscription Upgrade', `Your subscription has been successfully upgraded to ${subscriptionPlan}.`);
  
      res.status(200).json({ message: 'Subscription updated successfully' });
    } catch (error) {
      console.error('Subscription Update Failed:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  