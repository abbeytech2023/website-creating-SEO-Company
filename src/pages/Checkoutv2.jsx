// pages/Checkout.jsx (partial — integrates Stripe Checkout)
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // convert price string like "$120" -> 120.00
  function parsePriceValue(price) {
    if (typeof price === "number") return price;
    return parseFloat(String(price).replace(/[^0-9.]/g, "")) || 0;
  }

  const total = cart.reduce(
    (sum, item) => sum + parsePriceValue(item.price) * (item.qty || 1),
    0
  );

  async function handleStripeCheckout() {
    setLoading(true);
    try {
      // Prepare line items for server (we send name, unit_amount in cents, quantity)
      const items = cart.map((item) => ({
        id: item.id,
        name: item.name,
        unit_amount: Math.round(parsePriceValue(item.price) * 100),
        quantity: item.qty || 1,
      }));

      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          // tell server where to return user after success/cancel
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/checkout`,
        }),
      });
      const data = await res.json();
      if (data.url) {
        // redirect to Stripe Checkout (hosted page)
        window.location.href = data.url;
      } else {
        console.error("Stripe create session failed", data);
        alert("Payment failed to start.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      {/* existing form fields for name/email/address would be here */}

      <div className="mt-6">
        <p className="mb-4">
          Total: <strong>${total.toFixed(2)}</strong>
        </p>

        <button
          onClick={handleStripeCheckout}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg mr-4"
          disabled={loading || cart.length === 0}
        >
          {loading ? "Starting Stripe..." : "Pay with Card (Stripe)"}
        </button>

        {/* Paystack button shown below if you want both options */}
      </div>
    </section>
  );
}
