// ==========================================
// 1. IMPORTS & DEPENDENCIES
// ==========================================
import { create } from 'zustand';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;
// ==========================================
// 2. STATE STORE DECLARATION (ZUSTAND)
// ==========================================
export const userAuth = create((set, get) => ({

    // A. Authentication States
    currentUser: null,
    isAuthenticated: false,
    error: null,
    loading: false,
    
    // B. Dashboard States
    currentUserCampaigns: null,
    dashboardStats: null,
    
    // C. Search States
    search: "",
    filteredCampaigns: [],
    
    setSearch: (value) => set({
        search: value
    }),
    
    setFilteredCampaigns: (campaigns) => set({
        filteredCampaigns: campaigns
    }),
    
    // D. Notification States
    notifications: [],

    // ==========================================
    // 3. CORE CORE ACTIONS / FUNCTIONS
    // ==========================================

    // Add Notification
    addNotification: (notification) =>
        set((state) => ({
            notifications: [
                {
                    _id: Date.now(),
                    isRead: false,
                    createdAt: new Date(),
                    ...notification
                },
                ...state.notifications
            ]
        })),

    // Mark Single Notification as Read
    markNotificationAsRead: async (id) => {
        try {
            await axios.put(
                `${BASE_URL}/notifications/${id}/read`,
                {},
                { withCredentials: true }
            );

            set((state) => ({
                notifications: state.notifications.map((notification) =>
                    notification._id === id
                        ? { ...notification, isRead: true }
                        : notification
                )
            }));
        } catch (err) {
            console.log(err.response?.data?.message || err.message);
        }
    },

    // Clear Notifications
    clearNotifications: () =>
        set({
            notifications: []
        }),

    // Fetch Notifications
    fetchNotifications: async () => {
        try {
            const res = await axios.get(
                `${BASE_URL}/common-api/notifications`,
                { withCredentials: true }
            );

            set({
                notifications: res.data.payload || []
            });
        } catch (err) {
            console.log(err.response?.data?.message || err.message);
        }
    },

    // User Login Action
    login: async (userCredObj) => {
        let { role, ...userCredWithoutRole } = userCredObj;
        console.log("role is :", role);

        try {
            set({
                loading: true,
                error: null
            });

            let res = await axios.post(
                `${BASE_URL}/common-api/login`,
                userCredWithoutRole,
                { withCredentials: true }
            );

            console.log(res.data);

            set({
                currentUser: res.data?.payload,
                isAuthenticated: true,
                loading: false,
                error: null,
            });

            // Optional Login Notification
            get().addNotification({
                title: "Login Successful",
                message: `Welcome back ${res.data?.payload?.FirstName}`
            });
        } catch (err) {
            console.log(err?.response?.data);

            set({
                loading: false,
                error: err.response?.data?.message || "Login Failed",
                currentUser: null,
                isAuthenticated: false
            });
        }
    },

    // User Logout Action
    logout: async () => {
        try {
            set({
                loading: true,
                error: null
            });

            let res = await axios.post(
                `${BASE_URL}/common-api/logout`,
                {},
                { withCredentials: true }
            );

            console.log(res);

            set({
                currentUser: null,
                isAuthenticated: false,
                dashboardStats: null,
                notifications: [],
                loading: false,
                error: null
            });
        } catch (err) {
            console.log(err.response?.data?.error);

            set({
                loading: false,
                error: err.response?.data?.error || "Logout Failed",
                currentUser: null,
                isAuthenticated: false
            });
        }
    },

    // Session Verification Action
    checkAuth: async () => {
        set({
            loading: true
        });

        try {
            let res = await axios.get(`${BASE_URL}/common-api/check-auth`, { withCredentials: true });
            console.log("current User", res.data.payload);

            set({
                loading: false,
                error: null,
                currentUser: res.data.payload,
                isAuthenticated: true
            });
        } catch (err) {
            if (err.response?.status === 401) {
                set({
                    currentUser: null,
                    isAuthenticated: false,
                    loading: false,
                });
                return;
            }

            console.error("Auth check failed:", err);
            set({
                loading: false
            });
        }
    },

    // Fetch Profile Metrics Action
    getDashboardStats: async () => {
        try {
            const res = await axios.get(
                `${BASE_URL}/common-api/profile-stats`,
                { withCredentials: true }
            );

            console.log("Dashboard Stats", res.data.payload);

            set({
                dashboardStats: res.data.payload
            });
        } catch (err) {
            console.log(err.response?.data?.message || "Failed to fetch dashboard stats");
        }
    },

}));