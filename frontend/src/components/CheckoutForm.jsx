import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsProcessing(true);

        // Replace with your backend endpoint
        const response = await fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: 100000 }), // Example amount in the smallest currency unit (e.g., 1000 for 10 USD)
        });

        const { clientSecret } = await response.json();

        const { error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: "Customer Name", // Collect this dynamically if needed
                },
            },
        });

        if (error) {
            console.error(error.message);
        } else {
            alert("Payment Successful!");
        }

        setIsProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-4 bg-gray-100 rounded">
                <CardElement options={{ hidePostalCode: true }} />
            </div>
            <button
                type="submit"
                disabled={!stripe || isProcessing}
                className={`w-full py-2 text-white rounded ${isProcessing ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
            >
                {isProcessing ? "Processing..." : "Pay Now"}
            </button>
        </form>
    );
};

export default CheckoutForm;
