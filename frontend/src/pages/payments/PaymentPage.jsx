

// import React, { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { useNavigate, useLocation } from 'react-router-dom';

// const stripePromise = loadStripe('pk_test_51QRttoKCqI3VjcQbEyJsjCH2Yvl8AnLeD4JWubm0q8ixlDqAf0lYcCV3wAUbtJo7SMU76LdC2himU0aelHkVn7gQ00PC2W82rz');

// const PaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { username, password, plan } = location.state || {};

//   const [isProcessing, setIsProcessing] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!stripe || !elements) return;

//     setIsProcessing(true);
//     setError(null);

//     try {
//       // Fetch the client secret from the backend
//       const response = await fetch('/api/v1/payment/create-payment-intent', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ amount: 5000 }), // Replace 5000 with your dynamic amount (in cents)
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch client secret');
//       }

//       const { clientSecret } = await response.json();

//       if (!clientSecret) {
//         throw new Error('Client secret not provided');
//       }

//       // Confirm the payment using the client secret
//       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });

//       if (error) {
//         throw new Error(error.message);
//       }

//       console.log('PaymentIntent:', paymentIntent);
//       setSuccess(true);

//       // Redirect to signup or success page
//       navigate('/signup', { state: { username, password, plan } });
//     } catch (error) {
//       console.error('Payment failed:', error);
//       setError('Payment failed: ' + error.message);
//     } finally {
//       setIsProcessing(false);
//     }
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

//       <button
//         onClick={() => navigate('/signup', { state: { username, password, plan } })}
//         className="text-blue-500 underline mt-4 w-full text-center block"
//       >
//         Go back to Sign Up
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

















// import React, { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { useNavigate, useLocation } from 'react-router-dom';

// const stripePromise = loadStripe('pk_test_51QRttoKCqI3VjcQbEyJsjCH2Yvl8AnLeD4JWubm0q8ixlDqAf0lYcCV3wAUbtJo7SMU76LdC2himU0aelHkVn7gQ00PC2W82rz');

// const PaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { username, password, plan } = location.state || {};

//   const [isProcessing, setIsProcessing] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!stripe || !elements) return;

//     setIsProcessing(true);
//     setError(null);

//     try {
//       const response = await fetch('/api/v1/payment/create-payment-intent', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ amount: 5000 }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch client secret');
//       }

//       const { clientSecret } = await response.json();

//       if (!clientSecret) {
//         throw new Error('Client secret not provided');
//       }

//       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });

//       if (error) {
//         throw new Error(error.message);
//       }

//       setSuccess(true);
//       navigate('/signup', { state: { username, password, plan } });
//     } catch (error) {
//       setError('Payment failed: ' + error.message);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="h-screen bg-cover bg-center" style={{ backgroundImage: `url('backpay.png')` }}>
//       <div className="h-full bg-black bg-opacity-50 flex justify-center items-center">
//         <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
//           <h2 className="text-3xl font-bold text-center text-white mb-6">Payment</h2>

//           {success ? (
//             <div className="text-green-500 text-center mb-6">Payment successful!</div>
//           ) : (
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label htmlFor="card" className="text-gray-300 block text-sm font-medium">Card Details</label>
//                 {/* <CardElement id="card" className="p-2  border-gray-300 mt-2  bg-black rounded-md text-white focus:outline-none" /> */}
//                 <CardElement
//   id="card"
//   className="p-2 border-gray-300 mt-2 bg-black rounded-md focus:outline-none"
//   options={{
//     style: {
//       base: {
//         color: 'white', // Set text color to white
//         backgroundColor: 'transparent', // Set background color to transparent
//         fontSize: '16px', // Adjust font size if needed
//         '::placeholder': {
//           color: 'rgba(255, 255, 255, 0.6)', // Set placeholder color to a light grey
//         },
//       },
//       invalid: {
//         color: 'red', // Change invalid text to red if needed
//       },
//     },
//   }}
// />
//               </div>

//               <div>
//                 <label htmlFor="securityCode" className="text-gray-300 block text-sm font-medium">Security Code (CVV)</label>
//                 <input
//                   type="text"
//                   id="securityCode"
//                   className="w-full p-2 mt-2 border border-gray-300 rounded-md text-white bg-black"
//                   placeholder="Enter security code"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="expirationDate" className="text-gray-300 block text-sm font-medium">Expiration Date</label>
//                 <input
//                   type="text"
//                   id="expirationDate"
//                   className="w-full p-2 mt-2  border border-gray-300 rounded-md text-white bg-black"
//                   placeholder="MM/YY"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="postalCode" className="text-gray-300 block text-sm font-medium">Postal Code</label>
//                 <input
//                   type="text"
//                   id="postalCode"
//                   className="w-full p-2 mt-2 border border-gray-300 rounded-md text-white bg-black"
//                   placeholder="Enter your postal code"
//                 />
//               </div>

//               {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

//               <button
//                 type="submit"
//                 className="w-full py-2 px-4 bg-red-600 text-white rounded-md mt-4 hover:bg-red-700 disabled:bg-gray-500"
//                 disabled={isProcessing || !stripe}
//               >
//                 {isProcessing ? 'Processing...' : 'Pay Now'}
//               </button>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const PaymentPage = () => (
//   <Elements stripe={stripePromise}>
//     <PaymentForm />
//   </Elements>
// );

// export default PaymentPage;


// import React, { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { useNavigate, useLocation } from 'react-router-dom';

// const stripePromise = loadStripe('pk_test_51QRttoKCqI3VjcQbEyJsjCH2Yvl8AnLeD4JWubm0q8ixlDqAf0lYcCV3wAUbtJo7SMU76LdC2himU0aelHkVn7gQ00PC2W82rz');

// const PaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { username, password, plan } = location.state || {};

//   const [isProcessing, setIsProcessing] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!stripe || !elements) return;

//     setIsProcessing(true);
//     setError(null);

//     try {
//       const response = await fetch('/api/v1/payment/create-payment-intent', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ amount: 5000 }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch client secret');
//       }

//       const { clientSecret } = await response.json();

//       if (!clientSecret) {
//         throw new Error('Client secret not provided');
//       }

//       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });

//       if (error) {
//         throw new Error(error.message);
//       }

//       setSuccess(true);
//       navigate('/signup', { state: { username, password, plan } });
//     } catch (error) {
//       setError('Payment failed: ' + error.message);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="h-screen bg-cover bg-center" style={{ backgroundImage: `url('backpay.png')` }}>
//       <div className="h-full bg-black bg-opacity-50 flex justify-center items-center">
//         <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
//           <h2 className="text-3xl font-bold text-center text-white mb-6">Payment</h2>

//           {success ? (
//             <div className="text-green-500 text-center mb-6">Payment successful!</div>
//           ) : (
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label htmlFor="card" className="text-gray-300 block text-sm font-medium">Card Details</label>
//                 <CardElement
//                   id="card"
//                   className="p-2 border-gray-300 mt-2 bg-black rounded-md focus:outline-none"
//                   options={{
//                     style: {
//                       base: {
//                         color: 'white', // Set text color to white
//                         backgroundColor: 'transparent', // Set background color to transparent
//                         fontSize: '16px', // Adjust font size if needed
//                         '::placeholder': {
//                           color: 'rgba(255, 255, 255, 0.6)', // Set placeholder color to a light grey
//                         },
//                       },
//                       invalid: {
//                         color: 'red', // Change invalid text to red if needed
//                       },
//                     },
//                   }}
//                 />
//               </div>

//               {/* Custom fields */}
//               <div>
//                 <label htmlFor="ownername" className="text-gray-300 block text-sm font-medium">CardHolder's Name</label>
//                 <input
//                   type="text"
//                   id="cardholder"
//                   className="w-full p-2 mt-2 border border-gray-300 rounded-md text-white bg-black"
//                   placeholder="Enter Cardholder name"
//                 />
//               </div>

//               {/* <div>
//                 <label htmlFor="expirationDate" className="text-gray-300 block text-sm font-medium">Expiration Date</label>
//                 <input
//                   type="text"
//                   id="expirationDate"
//                   className="w-full p-2 mt-2  border border-gray-300 rounded-md text-white bg-black"
//                   placeholder="MM/YY"
//                 />
//               </div> */}

//               {/* <div>
//                 <label htmlFor="postalCode" className="text-gray-300 block text-sm font-medium">Postal Code</label>
//                 <input
//                   type="text"
//                   id="postalCode"
//                   className="w-full p-2 mt-2 border border-gray-300 rounded-md text-white bg-black"
//                   placeholder="Enter your postal code"
//                 />
//               </div> */}

//               {error && <div className="text-red-500 text-sm mt-9">{error}</div>}

//               <button
//                 type="submit"
//                 className="w-full py-2 px-4 bg-red-600 text-white rounded-md mt-9 hover:bg-red-700 disabled:bg-gray-500"
//                 disabled={isProcessing || !stripe}
//               >
//                 {isProcessing ? 'Processing...' : 'Pay Now'}
//               </button>
//             </form>
//           )}
//         </div>
//       </div>
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
import { FaArrowLeft } from 'react-icons/fa'; // Importing the back arrow icon

const stripePromise = loadStripe('pk_test_51QRttoKCqI3VjcQbEyJsjCH2Yvl8AnLeD4JWubm0q8ixlDqAf0lYcCV3wAUbtJo7SMU76LdC2himU0aelHkVn7gQ00PC2W82rz');

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
      const response = await fetch('/api/v1/payment/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 5000 }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch client secret');
      }

      const { clientSecret } = await response.json();

      if (!clientSecret) {
        throw new Error('Client secret not provided');
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      setSuccess(true);
      navigate('/signup', { state: { username, password, plan } });
    } catch (error) {
      setError('Payment failed: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="h-screen bg-cover bg-center" style={{ backgroundImage: `url('backpay.png')` }}>
      <div className="h-full bg-black bg-opacity-50 flex justify-center items-center">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          
          {/* Back Button */}
          <div className="absolute top-4 left-4">
            <button onClick={() => navigate(-1)} className="text-white text-xl">
              <FaArrowLeft />
            </button>
          </div>

          <h2 className="text-3xl font-bold text-center text-white mb-6">Payment</h2>

          {success ? (
            <div className="text-green-500 text-center mb-6">Payment successful!</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="card" className="text-gray-300 block text-sm font-medium">Card Details</label>
                <CardElement
                  id="card"
                  className="p-2 border-gray-300 mt-2 bg-black rounded-md focus:outline-none"
                  options={{
                    style: {
                      base: {
                        color: 'white', 
                        backgroundColor: 'transparent', 
                        fontSize: '16px', 
                        '::placeholder': {
                          color: 'rgba(255, 255, 255, 0.6)', 
                        },
                      },
                      invalid: {
                        color: 'red', 
                      },
                    },
                  }}
                />
              </div>

              {error && <div className="text-red-500 text-sm mt-9">{error}</div>}

              <button
                type="submit"
                className="w-full py-2 px-4 bg-red-600 text-white rounded-md mt-9 hover:bg-red-700 disabled:bg-gray-500"
                disabled={isProcessing || !stripe}
              >
                {isProcessing ? 'Processing...' : 'Pay Now'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const PaymentPage = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default PaymentPage;
