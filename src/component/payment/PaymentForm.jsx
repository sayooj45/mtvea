import React, { useState } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

import axios from "axios";

const PaymentForm = ({ participants }) => {

  const stripe = useStripe();
  const elements = useElements();

  const [loading,setLoading] = useState(false)
  const [message,setMessage] = useState("")

  const handleSubmit = async (e) => {

    e.preventDefault();

    if(!stripe || !elements) return;

    setLoading(true);

    try {

      // Create payment intent
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/payment/create-payment-intent`,
          {
            participants
          }
      );

      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if(result.error){
        setMessage(result.error.message)
      }else{
        if(result.paymentIntent.status === "succeeded"){
          setMessage("Payment successful 🎉")
        }
      }

    } catch (error) {

      setMessage("Payment failed")

    }

    setLoading(false)

  };

  return (

    <form onSubmit={handleSubmit} className="space-y-4" >

      <div className="border p-3 rounded-lg" >

        <CardElement
          options={{
            style:{
              base:{
                fontSize:"16px"
              }
            }
          }}
        />

      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600"
      >

        {loading ? "Processing..." : "Pay Now"}

      </button>

      {message && (
        <p className="text-center text-sm text-gray-600">
          {message}
        </p>
      )}

    </form>

  );
};

export default PaymentForm;