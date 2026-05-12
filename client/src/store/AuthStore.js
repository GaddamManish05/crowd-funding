import {create} from 'zustand'
import axios from 'axios';
export const userAuth = create((set) => ({
    currentUser : null,
    isAuthenticated : false,
    error: null,
    loading : false,
    currentUserCampaigns : null,
    // functions
    login : async(userCredObj) => {
        let {role,...userCredWithoutRole} = userCredObj;
        console.log("role is :",role)
        try{
            set({
                loading : true,
                error : null
            })
            let res = await axios.post('http://localhost:3000/common-api/login',userCredWithoutRole,{withCredentials : true});
            console.log(res.data);

            set({
                currentUser : res.data?.payload,
                isAuthenticated : true,
                loading : false,
                error : null,
            })
        }catch(err){
            console.log(err?.response.data);
            set({
                loading : false,
                error : err.response?.data?.error || "Login Failed",
                currentUser : null,
                isAuthenticated : false
            })
        }
    },
    logout : async () => {
        try{
            set({
                loading : true,
                error : null
            })
            let res = await axios.get('',{withCredentials : true});
            console.log(res);
            set({
                currentUser : null,
            })
        }catch(err){
            console.log(err.response?.data?.error);
            set({
                loading : false,
                error : err.response?.data?.error || "Logout Failed",
                currentUser : null,
                isAuthenticated : false
            })
        }
    },
    
}))