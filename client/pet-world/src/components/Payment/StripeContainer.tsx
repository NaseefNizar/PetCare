import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions } from '@stripe/stripe-js'; // Import the necessary types
import axios from "../../utils/axiosInstance";
import CheckoutForm from "./PaymentForm";
import { useAppSelector } from "../../redux/hooks";
// import "./checkout.css"

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise =  await loadStripe("pk_test_51NyzwcSA4C0Pm233lyhz8N3ijqvw9NTzSmVcZCCYtRbk0lvEAyPuXWbWBmWLOPV43bEjvvQgKKzeFHsEpBXvzWot00qQQ451Yv");


export default function StripeContainer() {
  const [clientSecret, setClientSecret] = useState("");
  const data = useAppSelector(state => state.slot.slot)
  console.log(data);
  
  

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    // fetch("http://localhost:8000/api/payment/createpaymentintent", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    // })
    axios.post("http://localhost:8000/api/payment/createpaymentintent",data)
      // .then((res) => res.json())
      .then((res) => 
      setClientSecret(res.data.clientSecret));
  }, []);

  // const appearance = {
  //   theme: 'stripe',
  // };
  const options:StripeElementsOptions = {
    clientSecret,
    appearance:{
      theme: 'stripe',
    }
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}