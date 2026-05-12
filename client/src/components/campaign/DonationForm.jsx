import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import { styles } from '../../styles/common';
import { toast } from 'react-hot-toast'
import { createOrder , verifyPayment} from '../../store/paymentService.js'
function DonationForm() {
  const {register,handleSubmit} = useForm();
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const onNewDonation = async(data) => {
    setError(null);
    setLoading(true);
      try {
      // Step 1: Create Order
      const order = await createOrder(data.amount);

      // Step 2: Razorpay Options
      const options = {
        key: "rzp_test_xxxxxxxx", //  key_id
        amount: order.amount,
        currency: "INR",
        name: "CrowdFund",
        description: "Donation",
        order_id: order.id,

        handler: async function (response) {

          // Step 3: Verify Payment
          const verifyRes = await verifyPayment(response);

          if (verifyRes.success) {
            toast.success("Payment Successful 🎉");

            // Save donation (optional API)
            console.log("Save to DB");

          } else {
            toast.error("Payment Failed ❌");
          }
        },

        prefill: {
          name: data.name,
          email: data.email,
        },

        theme: {
          color: "#0071e3",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }finally{
      setLoading(false);
    }
  }
  return (
    <div className={`${styles.formGroup}`}>
      <form onSubmit={handleSubmit(onNewDonation)} className={styles.formCard}>
        {loading && <p className={styles.loadingClass}>{error}</p>}
        {error && <p className={styles.errorClass}>{error}</p>}
        <h1 className='text-xl text-center mb-3'>Donation Form</h1>
          <div>
            <label htmlFor="amount" className={styles.label}>Amount :</label>
            <input type="number" className={styles.input} {...register('amount',{required : true})}/>
          </div>
          <div>
            <label htmlFor="name" className={styles.label}>Name :</label>
            <input type="text" className={styles.input} {...register('name',{required : true})}/>
          </div>
          <div>
            <label htmlFor="email" className={styles.label}>Email :</label>
            <input type="text" className={styles.input} {...register('email',{required : true})}/>
          </div>
          <button type='submit' className={styles.submitBtn}>Donate</button>
      </form>
    </div>
  )
}

export default DonationForm