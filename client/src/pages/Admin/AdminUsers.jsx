import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { styles } from "../../styles/common";
function AdminUser() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // 🔹 Fetch Users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/admin-api/all-users", {
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
      await axios.delete(
        `http://localhost:3000/admin-api/soft-delete/${id}`,
        {
          withCredentials : true
        }
      );
      toast.success("User deleted");
      fetchUsers();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // 🔹 Change Role
  const handleRoleChange = async (id) => {
    try {
      await axios.put(
        `http://localhost:3000/admin-api/update-role/${id}`,
        {},
        {
          withCredentials : true
        }
      );
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
      <div className={styles.tableContainer}>
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
                    <button
                      onClick={() => handleRoleChange(user._id)}
                      className="bg-blue-400 text-white px-3 py-1 rounded-md text-xs hover:opacity-80"
                    >
                      Make Admin
                    </button>

                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md text-xs hover:opacity-80"
                    >
                      Delete
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