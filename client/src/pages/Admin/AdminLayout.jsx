import { Outlet, NavLink } from "react-router-dom";
import { LayoutDashboard } from 'lucide-react'
import { FaSignOutAlt} from 'react-icons/fa'
import { styles } from "../../styles/common";
import AdminSideBar from "./AdminSideBar";
import TopBar from "../../components/dashboard/TopBar";
function AdminLayout() {
    
    return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
        <div className="">
            <AdminSideBar></AdminSideBar>
        </div>
    
        <div className={styles.dashboardContent}>

        <TopBar />

        <div className="flex-1 overflow-y-auto p-6">

            <div className="max-w-6xl mx-auto w-full">
            <Outlet />
            </div>
        </div>
    </div>

    </div>
);
}

export default AdminLayout;