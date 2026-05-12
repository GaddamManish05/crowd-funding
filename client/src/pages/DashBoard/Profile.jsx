import React from 'react'
import { userAuth } from '../../store/AuthStore'
import { styles } from '../../styles/common';
import { useNavigate } from 'react-router';
import { FaUser } from "react-icons/fa";
function Profile() {

  let navigate = useNavigate();
  const currentUser = userAuth(state => state.currentUser);
  console.log(currentUser);
  const changePassword = () => {
      navigate('/dashboard/change-password')
  }
  return (
    <div className={`${styles.card} p-6 flex flex-col gap-4 text-center`}>
      <h1 className={styles.sectionTitle}>Profile</h1>
      <div className={`${styles.profileAvatar} mx-auto w-15 h-15`}>
        <FaUser className='w-5 h-5'></FaUser>
      </div>
      <div className=''>
          <h2 className={styles.cardTitle}>FirstName :</h2>
          <h3 className={styles.cardDescription}>Sai</h3>
      </div>
      <div>
          <h2 className={styles.cardTitle}>LastName :</h2>
          <h3 className={styles.cardDescription}>Sriman</h3>
      </div>
      <div>
          <h2 className={styles.cardTitle}>Number of Donations :</h2>
          <h3 className={styles.cardDescription}>65</h3>
      </div>
      <div>
          <h2 className={styles.cardTitle}>Campaigns Participated :</h2>
          <h3 className={styles.cardDescription}>11</h3>
      </div>
      <div>
        <button onClick = {changePassword} className='w-30 rounded-2xl shadow-xl px-7 py-3 bg-blue-500 text-white'>Update Password</button>
      </div>
      
    </div>
  )
}

export default Profile