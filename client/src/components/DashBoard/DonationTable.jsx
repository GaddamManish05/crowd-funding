import React,{} from 'react'
import { styles } from '../../styles/common';

function DonationTable() {
  // const [amount,seAmount] = useState();
  const donations = [
  {
    id: 1,
    donor: "Ravi",
    campaign: "AI Startup",
    amount: 2000,
    payment: "Razorpay",
    date: "2026-03-10",
    status: "Success"
  },
  {
    id: 2,
    donor: "John",
    campaign: "Health Fund",
    amount: 500,
    payment: "Stripe",
    date: "2026-03-11",
    status: "Success"
  }
];

  return (
    <div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
            <thead className={styles.tableHead}>
                <tr className={styles.tableRow}>
                  <th className={styles.tableCell}>Donar</th>
                  <th className={styles.tableCell}>Campaign</th>
                  <th className={styles.tableCell}>Amount</th>
                  <th className={styles.tableCell}>Payment</th>
                  <th className={styles.tableCell}>Date</th>
                  <th className={styles.tableCell}>Status</th>
                </tr>
            </thead>
            <tbody>
              {
                  donations.map((donateObj) => <tr key={donateObj.id} className={styles.tableRow}>
                    <td className={styles.tableCell}>{donateObj.donor}</td>
                    <td className={styles.tableCell}>{donateObj.campaign}</td>
                    <td className={styles.tableCell}>{donateObj.amount}</td>
                    <td className={styles.tableCell}>{donateObj.payment}</td>
                    <td className={styles.tableCell}>{donateObj.date}</td>
                    <td className={styles.tableCell}>{donateObj.status === "Success" ? '✅Success' : '❌Pending'}</td>
                  </tr>)
              }
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default DonationTable