import React, { useEffect } from 'react'
import { Outlet } from 'react-router'
import NavBar from './NavBar/NavBar'
import Footer from './Footer'
import { userAuth } from '../../store/AuthStore'
function RootLayout() {

    const checkAuth = userAuth(state => state.checkAuth);

    const checkUserDetails = async()=>{
        await checkAuth();
    }

    useEffect(()=>{
        checkUserDetails()
    },[])

  return (

    <div className="flex flex-col min-h-screen">
        <nav>
            <NavBar></NavBar>
        </nav>
        <main className="">
            <Outlet></Outlet>
        </main>
        <footer className="bg-slate-900 text-white py-6 text-center">
            <Footer />
        </footer>
    </div>
  )
}

export default RootLayout