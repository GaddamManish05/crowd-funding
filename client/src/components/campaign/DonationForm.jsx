// ==========================================
// 1. IMPORTS & DEPENDENCIES
// ==========================================
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { styles } from '../../styles/common';
import { toast } from 'react-hot-toast';
import { createOrder, verifyPayment } from '../../store/paymentService.js';
import axios from 'axios';

// ==========================================
// 2. MAIN COMPONENT DECLARATION
// ==========================================
function DonationForm({ campaignId, onSuccess }) {
  // A. React & Third-Party Hooks
  const { register, handleSubmit, reset } = useForm();
  const BASE_URL = import.meta.env.VITE_API_URL
  // B. Local Component State
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // C. Event Handlers / Business Logic
  const onNewDonation = async (data) => {
    setError(null);
    setLoading(true);

    try {
      // CREATE ORDER
      await axios.post(`${BASE_URL}/payment-api/validate-donation`,
      { campaignId },
      { withCredentials: true }
    );
      const order = await createOrder(data.amount);

      // RAZORPAY OPTIONS
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Crowd Funding Platform",
        description: "Campaign Donation",
        order_id: order.id,
        handler: async function (response) {
          try {
            // VERIFY PAYMENT
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              campaignId,
              amount: data.amount
            });
            toast.success("Payment Successful 🎉");
            reset();
            if (onSuccess) {
              onSuccess();
            }
          } catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || "Payment Verification Failed");
          }
        },
        prefill: {
          name: data.name,
          email: data.email
        },
        theme: {
          color: "#2563eb"
        }
      };

      const razorpay = new window.Razorpay(options);

      // PAYMENT FAILED
      razorpay.on("payment.failed", function (response) {
        console.log(response.error);
        toast.error("Payment Failed ❌");
      });

      razorpay.open();
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Unable to initiate payment");
      toast.error("Unable to initiate payment");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // 3. JSX LAYOUT RETURN
  // ==========================================
  return (
    <div className={styles.formGroup}>
      <form onSubmit={handleSubmit(onNewDonation)} className={`${styles.formCard} space-y-4`}>
        {/* ERROR */}
        {error && (
          <p className={styles.errorClass}>
            {error}
          </p>
        )}

        {/* LOADING */}
        {loading && (
        <div className="flex items-center justify-center gap-3 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-3 rounded-xl shadow-sm">
          {/* SPINNER */}
          <div className="w-5 h-5 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />

          {/* TEXT */}
          <p className="font-medium">
            Processing Payment...
          </p>
        </div>
)}

        {/* TITLE */}
        <h1 className="text-2xl text-center font-semibold">
          Donation Form
        </h1>

        {/* AMOUNT */}
        <div className="space-y-1 text-left">
          <label htmlFor="amount" className={styles.label}>
            Amount :
          </label>
          <input
            type="number"
            placeholder="Enter donation amount"
            className={styles.input}
            {...register('amount', {
              required: true,
              min: 1
            })}
          />
        </div>

        {/* NAME */}
        <div className="space-y-1 text-left">
          <label htmlFor="name" className={styles.label}>
            Name :
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className={styles.input}
            {...register('name', { required: true })}
          />
        </div>

        {/* EMAIL */}
        <div className="space-y-1 text-left">
          <label htmlFor="email" className={styles.label}>
            Email :
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className={styles.input}
            {...register('email', { required: true })}
          />
        </div>

        {/* SUBMIT */}
        <button type="submit" disabled={loading} className={styles.submitBtn}>
          {loading ? "Processing..." : "Donate Now"}
        </button>
      </form>
    </div>
  );
}

export default DonationForm;