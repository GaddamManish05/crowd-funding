import React, { useEffect } from 'react'
import { Outlet } from 'react-router'
import NavBar from './NavBar/NavBar'
import Footer from './Footer'
import { userAuth } from '../../store/AuthStore'
import Loader from '../common/Loader'

function RootLayout() {

    const checkAuth = userAuth(state => state.checkAuth);
    const loading = userAuth(state => state.loading);

    useEffect(() => {
        checkAuth();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <nav>
                <NavBar />
            </nav>

            <main className="">
                <Outlet />
            </main>

            <footer className="bg-slate-900 text-white py-6 text-center">
                <Footer />
            </footer>
        </div>
    )
}

export default RootLayout