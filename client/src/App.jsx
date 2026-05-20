import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Toaster } from 'react-hot-toast'
import RootLayout from "./components/layout/RootLayout";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Explore from "./pages/Explore";
import HowItWorks from "./pages/HowItWorks";

import DashBoard from "./pages/DashBoard/DashBoard";
import Overview from "./pages/DashBoard/Overview";
import MyCampaigns from "./pages/DashBoard/MyCampaigns";
import Donations from "./pages/DashBoard/Donations";
import Profile from "./pages/DashBoard/Profile";
import CreateCampaign from "./pages/DashBoard/CreateCampaign";
import ChangePassword from "./pages/DashBoard/ChangePassword";
import DonationForm from "./components/campaign/DonationForm";

import ProtectedRoute from "./components/Admin/ProtectedRoute";
import AdminCampaign from "./pages/Admin/AdminCampaign";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminDonation from "./pages/Admin/AdminDonation";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminOverview from "./pages/Admin/AdminOverview";
import AdminProfile from "./pages/Admin/AdminProfile";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path : "explore",
        element : <Explore></Explore>
      },
      {
        path : "how-it-works",
        element : <HowItWorks></HowItWorks>
      },
      {
        path: "sign-up",
        element: <SignUp />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "dashboard",
        element: <DashBoard />,
        children: [
          {
            index: true,
            element: <Overview />
          },
          {
            path: "overview",
            element: <Overview />,
            
          },
          {
            path: "my-campaigns",
            element: <MyCampaigns />
          },
          {
            path: "donations",
            element: <Donations />
          },
          {
            path: "create-campaign",
            element: <CreateCampaign />
          },
          {
            path: "user-profile",
            element: <Profile />,
          },
          {
            path:'change-password',
            element : <ChangePassword></ChangePassword>
          },
          {
              path : 'donation-form',
              element : <DonationForm/>
          }
        ]
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <AdminOverview /> },
          { path: "overview", element: <AdminOverview /> },
          { path: "campaigns", element: <AdminCampaign /> },
          { path: "donations", element: <AdminDonation /> },
          { path: "users", element: <AdminUsers /> },
          {path : "admin-profile", element : <AdminProfile></AdminProfile>}
        ]
      }
    ]
  }
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <>
      <Toaster position="top-left"
      reverseOrder={false} />
      </>
    </div>
  );
}

export default App;