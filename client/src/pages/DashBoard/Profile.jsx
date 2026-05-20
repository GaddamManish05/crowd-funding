import { userAuth } from '../../store/AuthStore';
import { useNavigate } from 'react-router';
import { FaUser, FaDonate } from "react-icons/fa";
import { MdCampaign } from "react-icons/md";
import { useEffect } from 'react';

function Profile() {

  const navigate = useNavigate();

  const currentUser =
    userAuth(state => state.currentUser);

  const dashboardStats =
    userAuth(state => state.dashboardStats);

  const getDashboardStats =
    userAuth(state => state.getDashboardStats);

  useEffect(() => {

    getDashboardStats();

  }, []);

  const changePassword = () => {

    navigate('/dashboard/change-password');

  };

  return (

    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">

      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-10 text-white flex flex-col items-center">

          <div className="w-28 h-28 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center text-4xl font-bold shadow-lg backdrop-blur-md">
            {currentUser?.FirstName?.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-3xl font-bold mt-5">
            {currentUser?.FirstName} {currentUser?.LastName}
          </h1>

          <p className="text-blue-100 mt-2">
            {currentUser?.Email}
          </p>

        </div>

        {/* Body Section */}
        <div className="p-8">

          {/* User Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="bg-gray-50 rounded-2xl p-5 shadow-sm border">

              <h2 className="text-sm text-gray-500 font-medium">
                First Name
              </h2>

              <p className="text-xl font-semibold text-gray-800 mt-2">
                {currentUser?.FirstName}
              </p>

            </div>

            <div className="bg-gray-50 rounded-2xl p-5 shadow-sm border">

              <h2 className="text-sm text-gray-500 font-medium">
                Last Name
              </h2>

              <p className="text-xl font-semibold text-gray-800 mt-2">
                {currentUser?.LastName}
              </p>

            </div>

          </div>

          {/* Dashboard Stats */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Donations */}
            <div className="bg-white border rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 flex items-center gap-5">

              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">

                <FaDonate className="text-3xl text-green-600" />

              </div>

              <div>

                <h2 className="text-gray-500 text-sm font-medium">
                  Total Donations
                </h2>

                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {dashboardStats?.donationCount || 3}
                </p>

              </div>

            </div>

            {/* Campaign Participation */}
            <div className="bg-white border rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 flex items-center gap-5">

              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">

                <MdCampaign className="text-3xl text-blue-600" />

              </div>

              <div>

                <h2 className="text-gray-500 text-sm font-medium">
                  Campaigns Participated
                </h2>

                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {dashboardStats?.participatedCampaignCount || 5}
                </p>

              </div>

            </div>

          </div>

          {/* Buttons */}
          <div className="mt-10 flex justify-center">

            <button

              onClick={changePassword}

              className="px-8 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg transition duration-300"

            >
              Update Password
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Profile;