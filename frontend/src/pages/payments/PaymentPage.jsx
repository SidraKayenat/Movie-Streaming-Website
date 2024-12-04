
// import React, { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// const stripePromise = loadStripe('pk_test_51QRttoKCqI3VjcQbEyJsjCH2Yvl8AnLeD4JWubm0q8ixlDqAf0lYcCV3wAUbtJo7SMU76LdC2himU0aelHkVn7gQ00PC2W82rz'); // Your public key

// const PaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!stripe || !elements) return;

//     setIsProcessing(true);
//     setError(null); // Reset any previous errors

//     const { error: cardError, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: elements.getElement(CardElement),
//     });

//     if (cardError) {
//       setError(cardError.message);
//       setIsProcessing(false);
//       return;
//     }

//     try {
//       // Send the payment method to the server
//       const response = await fetch('/api/v1/payment/create-payment-intent', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ amount: 5000 }), // Amount in cents (e.g., $50.00)
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create payment intent');
//       }

//       const { clientSecret } = await response.json();

//       // Confirm the payment with the clientSecret
//       const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: paymentMethod.id,
//       });

//       if (confirmError) {
//         setError(confirmError.message);
//       } else {
//         setSuccess(true);
//       }
//     } catch (error) {
//       console.error(error);
//       setError('Payment failed');
//     }

//     setIsProcessing(false);
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-16">
//       <h2 className="text-3xl font-bold text-center text-gray-800">Payment Information</h2>

//       {success ? (
//         <div className="text-green-500 mt-4">Payment successful!</div>
//       ) : (
//         <form onSubmit={handleSubmit} className="mt-8 space-y-4">
//           <div>
//             <label className="text-gray-700">Card details</label>
//             <CardElement className="mt-2 p-3 border border-gray-300 rounded-md" />
//           </div>

//           {error && <div className="text-red-500 mt-2">{error}</div>}

//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             disabled={isProcessing || !stripe}
//           >
//             {isProcessing ? 'Processing...' : 'Pay Now'}
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// const PaymentPage = () => (
//   <Elements stripe={stripePromise}>
//     <PaymentForm />
//   </Elements>
// );

// export default PaymentPage;







//correct wiht payment

// import React, { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// const stripePromise = loadStripe('pk_test_51QRttoKCqI3VjcQbEyJsjCH2Yvl8AnLeD4JWubm0q8ixlDqAf0lYcCV3wAUbtJo7SMU76LdC2himU0aelHkVn7gQ00PC2W82rz'); // Your public key

// const PaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate(); // Initialize the navigate hook
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!stripe || !elements) return;

//     setIsProcessing(true);
//     setError(null); // Reset any previous errors

//     const { error: cardError, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: elements.getElement(CardElement),
//     });

//     if (cardError) {
//       setError(cardError.message);
//       setIsProcessing(false);
//       return;
//     }

//     try {
//       // Send the payment method to the server
//       const response = await fetch('/api/v1/payment/create-payment-intent', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ amount: 5000 }), // Amount in cents (e.g., $50.00)
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create payment intent');
//       }

//       const { clientSecret } = await response.json();

//       // Confirm the payment with the clientSecret
//       const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: paymentMethod.id,
//       });

//       if (confirmError) {
//         setError(confirmError.message);
//       } else {
//         setSuccess(true);
//       }
//     } catch (error) {
//       console.error(error);
//       setError('Payment failed');
//     }

//     setIsProcessing(false);
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-16">
//       <h2 className="text-3xl font-bold text-center text-gray-800">Payment Information</h2>

//       {success ? (
//         <div className="text-green-500 mt-4">Payment successful!</div>
//       ) : (
//         <form onSubmit={handleSubmit} className="mt-8 space-y-4">
//           <div>
//             <label className="text-gray-700">Card details</label>
//             <CardElement className="mt-2 p-3 border border-gray-300 rounded-md" />
//           </div>

//           {error && <div className="text-red-500 mt-2">{error}</div>}

//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             disabled={isProcessing || !stripe}
//           >
//             {isProcessing ? 'Processing...' : 'Pay Now'}
//           </button>
//         </form>
//       )}
//       {/* Back Button */}
//       <button
//         onClick={() => navigate('/login')} // Navigate to the signup page
//         className="w-full py-2 px-4 bg-gray-500 text-white rounded-md mt-4 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
//       >
//         Back to Signup
//       </button>
//     </div>
//   );
// };

// const PaymentPage = () => (
//   <Elements stripe={stripePromise}>
//     <PaymentForm />
//   </Elements>
// );

// export default PaymentPage;









import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate, useLocation } from 'react-router-dom';

const stripePromise = loadStripe('your-public-key-here');

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();

  const { username, password, plan } = location.state || {};

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Mock payment process (implement actual Stripe logic here)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSuccess(true);

      navigate('/signup', { state: { username, password, plan } });
    } catch (error) {
      console.error(error);
      setError('Payment failed');
    }

    setIsProcessing(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-16">
      <h2 className="text-3xl font-bold text-center text-gray-800">Payment Information</h2>

      {success ? (
        <div className="text-green-500 mt-4">Payment successful!</div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="text-gray-700">Card details</label>
            <CardElement className="mt-2 p-3 border border-gray-300 rounded-md" />
          </div>

          {error && <div className="text-red-500 mt-2">{error}</div>}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isProcessing || !stripe}
          >
            {isProcessing ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
      )}

      <button
        onClick={() => navigate('/signup', { state: {  username, password, plan } })}
        className="text-blue-500 underline mt-4 w-full text-center block"
      >
        Go back to Sign Up
      </button>
    </div>
  );
};

const PaymentPage = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default PaymentPage;
