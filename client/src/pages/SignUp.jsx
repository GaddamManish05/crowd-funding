import React,{useState} from 'react'
import {useNavigate} from 'react-router'
import {useForm} from 'react-hook-form'
import axios from 'axios';
import { styles } from '../styles/common';
function SignUp() {
    let {register,handleSubmit} = useForm();
    let navigate = useNavigate();
    // error handling state
    let [error,setError] = useState(null);
    //loading state
    let [loading,setLoading] = useState(false);

    // function to create user
    const onCreateUser = async(newUserObj) => {
        //setError as false
        console.log(newUserObj);
        setError(null);
        //setloading to true
        setLoading(true);

        let { role , ...userObj} = newUserObj;
        console.log(role);
        try{
        // use axios to post the data with credientials
        
        let response = await axios.post('http://localhost:3000/common-api/signup',userObj);
        console.log(response.data);
        
        // navigate to login page
        navigate('/login');
        }catch(err){
            setError(err.message);
        }finally{
            setLoading(false);
        }
    }
    if (loading) {
    return <p className={styles.loadingClass}>Loading...</p>
  }
    
  return (
    <div className='mt-20'>
        <div className={styles.formCard}>
            <div className={styles.formGroup}>
                <h2 className='text-2xl text-center mx-auto mb-5'>Create Account</h2>
                    {error && <p className={styles}>{error}</p>}
                <form onSubmit={handleSubmit(onCreateUser)}>
                {/* Role Selection */}

                {/* First Name */}

            <div className={styles.formGroup}>
                <label className={styles.label}>First Name</label>
                <input
                type="text"
                {...register("FirstName", { required: true })}
                placeholder="First Name"
                className={styles.input}
                />
            </div>


            {/* Last Name */}

            <div className={styles.formGroup}>
                <label className={styles.label}>Last Name</label>
                <input
                type="text"
                {...register("LastName")}
                placeholder="Last Name"
                className={styles.input}
                />
            </div>


            {/* Email */}

            <div className={styles.formGroup}>
                <label className={styles.label}>Email</label>
                <input
                type="email"
                {...register("Email", { required: true })}
                placeholder="Enter Email"
                className={styles.input}
                />
            </div>


            {/* Password */}

            <div className={styles.formGroup}>
                <label className={styles.label}>Password</label>
                <input
                type="password"
                {...register("Password", { required: true })}
                placeholder="Enter Password"
                className={styles.input}
                />
            </div>
            {/* Phone Number */}
            <div className={styles.formGroup}>
                <label className={styles.label}>Contact</label>
                <input
                type="text"
                {...register("PhoneNumber")}
                placeholder="Phone Number"
                className={styles.input}
                />
            </div>

            <button type="submit" className={styles.submitBtn}>
                Register
            </button>
        </form>

        </div>
    </div>
</div>
)
}

export default SignUp