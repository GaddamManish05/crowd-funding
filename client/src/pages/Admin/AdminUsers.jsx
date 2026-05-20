import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { styles } from "../../styles/common.js";
import { userAuth } from "../../store/AuthStore.js";
import { useNavigate } from "react-router";
function AdminUser() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const checkAuth = userAuth((state) => state.checkAuth);

  const BASE_URL = import.meta.env.VITE_API_URL;
  // 🔹 Fetch Users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/admin-api/all-users`, {
        withCredentials : true
      });
      setUsers(res.data.payload);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete User
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.put(
        `${BASE_URL}/admin-api/soft-delete/${id}`,{},{withCredentials : true}
      );
      toast.success("User deleted");
      fetchUsers();
    } catch (err) {
      toast.error(err.message||"Delete failed");
    }
  };
  
  // 🔹 Change Role
  const handleRoleChange = async (id,role) => {
    try {
      await axios.put(
        `${BASE_URL}/admin-api/update-role/${id}`,{Role: role === "admin" ? "user" : "admin"},{withCredentials : true}
      );
      await checkAuth();
      const updatedUser = userAuth.getState().currentUser;

      if(updatedUser?.Role === "user"){
        navigate("/dashboard/overview");
      }

      toast.success("Role updated");
      fetchUsers();
    } catch (err) {
      console.log(err.message);
      toast.error("Role update failed");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔹 Search Filter
  const filteredUsers = users.filter((user) =>
    user.FirstName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* 🔹 Header */}
      <h1 className="text-2xl font-semibold mb-6 text-[#1d1d1f]">
        Users Management
      </h1>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search users..."
        className="border border-gray-200 px-4 py-2 mb-5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 📊 Table */}
      <div className={styles.userTableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th className={styles.tableHeaderCell}>FirstName</th>
              <th className={styles.tableHeaderCell}>LastName</th>
              <th className={styles.tableHeaderCell}>Email</th>
              <th className={styles.tableHeaderCell}>Role</th>
              <th className={styles.tableHeaderCell}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-5">
                  Loading...
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-5">
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user._id} className={styles.tableRow}>
                  <td className={styles.tableCell}>{user.FirstName}</td>
                  <td className={styles.tableCell}>{user.LastName}</td>
                  <td className={styles.tableCell}>{user.Email}</td>
                  <td className={styles.tableCell}>
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 capitalize">
                      {user.Role}
                    </span>
                  </td>

                  <td className={`${styles.tableCell} space-x-2`}>

    {/* ROLE BUTTON */}

    <button

        onClick={() =>
            handleRoleChange(
                user._id,
                user.Role
            )
        }

        className={`
            px-3
            py-1
            rounded-md
            text-xs
            text-white
            hover:opacity-80
            transition-all
            duration-200

            ${
                user.Role === "admin"

                ?

                "bg-purple-500"

                :

                "bg-blue-500"
            }
        `}
    >

        {
            user.Role === "admin"

            ?

            "👤 Make User"

            :

            "🛡️ Make Admin"
        }

    </button>

    {/* DELETE / RESTORE */}

    <button

        onClick={() =>
            handleDelete(user._id)
        }

        className={`
            px-3
            py-1
            rounded-md
            text-xs
            text-white
            hover:opacity-80
            transition-all
            duration-200

            ${
                user.IsActive

                ?

                "bg-red-500"

                :

                "bg-green-500"
            }
        `}
    >

        {
            user.IsActive

            ?

            "❌ Delete"

            :

            "♻️ Restore"
        }

    </button>

</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUser;