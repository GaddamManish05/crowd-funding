// src/styles/common.js

export const styles = {

  /* ---------------- TYPOGRAPHY ---------------- */

  headingXL:
    "text-5xl md:text-6xl font-semibold tracking-tight text-[#1d1d1f]",

  headingLG:
    "text-4xl md:text-5xl font-semibold tracking-tight text-[#1d1d1f]",

  headingMD:
    "text-2xl font-semibold text-[#1d1d1f]",

  paragraph:
    "text-[#6e6e73] text-base leading-relaxed",

  smallText:
    "text-sm text-[#86868b]",


  /* ---------------- LAYOUT ---------------- */

  container:
    "max-w-7xl mx-auto px-6 lg:px-8",

  flexCenter:
    "flex items-center justify-center",

  flexBetween:
    "flex items-center justify-between",

  grid3:
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",

  grid4:
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",

  sectionPadding:
    "py-24",


  /* ---------------- NAVBAR ---------------- */

  navbar:
    "w-full flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50",

  navLogo:
    "text-xl font-semibold text-[#1d1d1f]",

  navLinks:
    "flex items-center gap-8",

  navLinkItem:
    "text-sm text-[#1d1d1f]/80 hover:text-black transition-all duration-200 cursor-pointer",


  /* ---------------- BUTTONS ---------------- */

  primaryButton:
    "bg-[#0071e3] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#005bb5] transition-all duration-200",

  secondaryButton:
    "border border-[#d2d2d7] text-[#1d1d1f] px-6 py-2.5 rounded-full text-sm hover:bg-gray-100 transition-all duration-200",

  donateButton:
    "bg-[#34c759] text-white px-6 py-2.5 rounded-full text-sm hover:bg-[#28a745] transition-all duration-200",


  /* ---------------- CARDS ---------------- */

  card:
    "bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100",

  cardImage:
    "w-full h-52 object-cover",

  cardContent:
    "p-6",

  cardTitle:
    "text-lg font-semibold text-[#1d1d1f]",

  cardDescription:
    "text-[#6e6e73] text-lg mt-2",


  /* ---------------- CAMPAIGN ---------------- */

  campaignTitle:
    "text-xl font-semibold text-[#1d1d1f]",

  campaignAmount:
    "text-[#34c759] font-medium",

  progressBarContainer:
    "w-full max-w-85 mx-auto bg-gray-200 rounded-full h-2 mt-3",

  progressBar:
    "bg-[#34c759] h-2 rounded-full",


  /* ---------------- FORM ---------------- */

  formCard:
    "bg-white shadow-sm border border-gray-100 rounded-2xl p-10 max-w-md mx-auto",

  input:
    "w-full border border-[#d2d2d7] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition",

  textarea:
    "w-full border border-[#d2d2d7] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3]",

  label:
    "text-xs font-medium text-[#6e6e73] mb-1.5 block",

  formGroup:
    "mb-5",

  submitBtn:
    "w-full bg-[#0071e3] text-white font-medium py-2.5 rounded-full hover:bg-[#005bb5] transition-all duration-200 mt-3 text-sm",


  /* ---------------- SECTIONS ---------------- */

  heroSection:
    "w-full min-h-[70vh] flex flex-col items-center justify-center text-center bg-[#f5f5f7]",

  campaignSection:
    "py-24 bg-white",

  dashboardSection:
    "py-20 bg-[#f5f5f7]",


  /* ---------------- FOOTER ---------------- */

  footer:
    "bg-[#1d1d1f] text-white py-14",

  footerContainer:
    "max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-12",

  footerText:
    "text-sm text-gray-400 flex flex-col gap-4",

  footerLinks:
    "flex flex-col gap-4 text-gray-400 hover:text-white transition duration-200 cursor-pointer",


  /* ---------------- FEEDBACK ---------------- */

  errorClass:
    "bg-red-50 text-red-600 border border-red-200 rounded-xl px-4 py-3 text-sm mb-5",

  successClass:
    "bg-green-50 text-green-700 border border-green-200 rounded-xl px-4 py-3 text-sm",

  loadingClass:
    "text-[#0071e3]/60 text-sm animate-pulse text-center py-10",

  emptyStateClass:
    "text-center text-[#86868b] py-16 text-sm",


  /* ===================================================== */
  /* ---------------- DASHBOARD ---------------- */
  /* ===================================================== */

  dashboardLayout:
    "flex h-screen bg-[#f5f5f7]",


  /* Sidebar */

  sidebar:
    "w-64 bg-white border-r border-gray-100 flex flex-col",

  sidebarLogo:
    "text-lg font-semibold p-6 border-b border-gray-100",
sidebarMenu: "flex flex-col gap-3 p-4",

sidebarItem:
"flex items-center gap-3 px-4 py-2 text-sm text-[#1d1d1f]/80 rounded-lg hover:bg-gray-100 transition cursor-pointer",

sidebarActive:
"flex items-center gap-3 px-4 py-2 text-sm rounded-lg bg-[#0071e3] text-white",


  /* Dashboard Content */

  dashboardContent:
    "flex-1 flex flex-col",


  /* Topbar */
  topbar:
    "w-full flex items-center justify-between bg-white px-6 py-4 border-b border-gray-100",

  searchBar:
    "border border-[#d2d2d7] rounded-lg px-4 py-2 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30",

  profileAvatar:
    "w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center",


  /* Stats Cards */

 statsContainer:
"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",

statsCard:
"bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-5 flex items-center justify-between",

statsLeft:
"flex flex-col gap-1",

statsTitle:
"text-xs uppercase tracking-wide text-gray-500",

statsValue:
"text-2xl font-semibold text-gray-900",

statsIconBox:
"w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-lg",
  /* Tables */

  tableContainer:
    "bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden",

  table:
    "w-full text-left border-collapse",

  tableHead:
    "bg-[#f5f5f7] text-xs text-[#6e6e73]",

  tableHeaderCell:
    "px-6 py-3",

  tableRow:
    "border-t hover:bg-gray-50",

  tableCell:
    "px-6 py-3 text-sm text-[#1d1d1f]",


  /* Dashboard Sections */

  sectionTitle:
    "text-xl font-semibold mb-5 text-[#1d1d1f] text-center",
};