// 'use client'
// import React, { useState, useEffect } from 'react';
// import { Menu, X, Search, Bell, User, LogOut, Settings as SettingsIcon, BarChart3, Users, Briefcase, Coins, FileText, ChevronDown, Home, Eye, Check, XCircle, Filter, Calendar, Download, Edit, Trash2, Plus } from 'lucide-react';

// // Skeleton Loader Components
// const SkeletonCard = () => (
//   <div className="bg-white p-6 rounded-xl shadow-sm border animate-pulse">
//     <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
//     <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
//     <div className="h-3 bg-gray-200 rounded w-2/3"></div>
//   </div>
// );

// const SkeletonTable = () => (
//   <div className="bg-white rounded-xl shadow-sm border animate-pulse">
//     <div className="p-6 border-b">
//       <div className="h-6 bg-gray-200 rounded w-1/4"></div>
//     </div>
//     {[...Array(5)].map((_, i) => (
//       <div key={i} className="p-6 border-b border-gray-100 flex items-center space-x-4">
//         <div className="h-4 bg-gray-200 rounded flex-1"></div>
//         <div className="h-4 bg-gray-200 rounded flex-1"></div>
//         <div className="h-4 bg-gray-200 rounded flex-1"></div>
//         <div className="h-8 bg-gray-200 rounded w-20"></div>
//       </div>
//     ))}
//   </div>
// );

// // Header Component
// const Header = ({ currentPage, onSearch, userProfile }) => {
//   const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  
//   return (
//     <header className="bg-white border-b border-gray-200 px-6 py-4">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           <h1 className="text-2xl font-bold text-gray-900">{currentPage}</h1>
//         </div>
        
//         <div className="flex items-center space-x-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input
//               type="text"
//               placeholder="Search..."
//               className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//               onChange={(e) => onSearch && onSearch(e.target.value)}
//             />
//           </div>
          
//           <button className="relative p-2 text-gray-400 hover:text-gray-600">
//             <Bell className="w-5 h-5" />
//             <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//           </button>
          
//           <div className="relative">
//             <button
//               onClick={() => setShowProfileDropdown(!showProfileDropdown)}
//               className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50"
//             >
//               <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center">
//                 <User className="w-4 h-4 text-white" />
//               </div>
//               <span className="text-sm font-medium text-gray-700">{userProfile.name}</span>
//               <ChevronDown className="w-4 h-4 text-gray-400" />
//             </button>
            
//             {showProfileDropdown && (
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
//                 <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
//                   <SettingsIcon className="w-4 h-4" />
//                   <span>Change Password</span>
//                 </button>
//                 <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2">
//                   <LogOut className="w-4 h-4" />
//                   <span>Logout</span>
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// // Sidebar Component
// const Sidebar = ({ activePage, setActivePage, isMobileOpen, setIsMobileOpen }) => {
//   const navItems = [
//     { id: 'overview', label: 'Dashboard Overview', icon: Home },
//     { id: 'users', label: 'Manage Users', icon: Users },
//     { id: 'gigs', label: 'Manage Gigs', icon: Briefcase },
//     { id: 'transactions', label: 'Transactions & Coins', icon: Coins },
//     { id: 'analytics', label: 'Reports & Analytics', icon: BarChart3 },
//     { id: 'settings', label: 'Settings', icon: SettingsIcon },
//   ];

//   return (
//     <>
//       {/* Desktop Sidebar */}
//       <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
//         <div className="flex-1 flex flex-col min-h-0 bg-gradient-to-b from-teal-600 to-cyan-700">
//           <div className="flex items-center h-16 flex-shrink-0 px-4 bg-teal-700">
//             <div className="flex items-center space-x-3">
//               <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
//                 <Briefcase className="w-5 h-5 text-teal-600" />
//               </div>
//               <span className="text-white text-xl font-bold">SkillsAmigo</span>
//             </div>
//           </div>
//           <div className="flex-1 flex flex-col overflow-y-auto">
//             <nav className="flex-1 px-2 py-4 space-y-1">
//               {navItems.map(({ id, label, icon: Icon }) => (
//                 <button
//                   key={id}
//                   onClick={() => setActivePage(id)}
//                   className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left transition-colors ${
//                     activePage === id
//                       ? 'bg-teal-800 text-white'
//                       : 'text-teal-100 hover:bg-teal-700 hover:text-white'
//                   }`}
//                 >
//                   <Icon className="mr-3 flex-shrink-0 h-5 w-5" />
//                   {label}
//                 </button>
//               ))}
//             </nav>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Sidebar */}
//       <div className={`md:hidden fixed inset-0 z-40 ${isMobileOpen ? '' : 'hidden'}`}>
//         <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileOpen(false)}></div>
//         <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-gradient-to-b from-teal-600 to-cyan-700 z-50">
//           <div className="flex items-center justify-between h-16 px-4 bg-teal-700">
//             <div className="flex items-center space-x-3">
//               <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
//                 <Briefcase className="w-5 h-5 text-teal-600" />
//               </div>
//               <span className="text-white text-xl font-bold">SkillsAmigo</span>
//             </div>
//             <button onClick={() => setIsMobileOpen(false)} className="text-white">
//               <X className="w-6 h-6" />
//             </button>
//           </div>
//           <nav className="px-2 py-4 space-y-1">
//             {navItems.map(({ id, label, icon: Icon }) => (
//               <button
//                 key={id}
//                 onClick={() => {
//                   setActivePage(id);
//                   setIsMobileOpen(false);
//                 }}
//                 className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left transition-colors ${
//                   activePage === id
//                     ? 'bg-teal-800 text-white'
//                     : 'text-teal-100 hover:bg-teal-700 hover:text-white'
//                 }`}
//               >
//                 <Icon className="mr-3 flex-shrink-0 h-5 w-5" />
//                 {label}
//               </button>
//             ))}
//           </nav>
//         </div>
//       </div>

//       {/* Mobile Bottom Navigation */}
//       <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
//         <div className="grid grid-cols-4 gap-1 px-2 py-2">
//           {navItems.slice(0, 4).map(({ id, label, icon: Icon }) => (
//             <button
//               key={id}
//               onClick={() => setActivePage(id)}
//               className={`flex flex-col items-center py-2 px-1 rounded-lg transition-colors ${
//                 activePage === id
//                   ? 'bg-teal-50 text-teal-600'
//                   : 'text-gray-600 hover:bg-gray-50'
//               }`}
//             >
//               <Icon className="w-5 h-5 mb-1" />
//               <span className="text-xs font-medium truncate">{label.split(' ')[0]}</span>
//             </button>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// // Overview Cards Component
// const OverviewCards = ({ isLoading }) => {
//   const cards = [
//     { title: 'Total Users', value: '12,456', change: '+12%', icon: Users, color: 'from-blue-500 to-blue-600' },
//     { title: 'Total Gigs Posted', value: '3,241', change: '+8%', icon: Briefcase, color: 'from-green-500 to-green-600' },
//     { title: 'Coins in Circulation', value: '892,341', change: '+24%', icon: Coins, color: 'from-yellow-500 to-yellow-600' },
//     { title: 'Total Revenue', value: '$45,231', change: '+18%', icon: BarChart3, color: 'from-purple-500 to-purple-600' },
//   ];

//   if (isLoading) {
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//       {cards.map(({ title, value, change, icon: Icon, color }, index) => (
//         <div key={index} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">{title}</p>
//               <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
//               <p className="text-sm text-green-600 mt-1">{change} from last month</p>
//             </div>
//             <div className={`p-3 rounded-xl bg-gradient-to-r ${color}`}>
//               <Icon className="w-6 h-6 text-white" />
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// // User Table Component
// const UserTable = ({ isLoading }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const usersPerPage = 5;

//   const users = [
//     { id: 1, username: 'john_doe', email: 'john@example.com', status: 'Active', coins: 1250 },
//     { id: 2, username: 'sarah_smith', email: 'sarah@example.com', status: 'Active', coins: 890 },
//     { id: 3, username: 'mike_jones', email: 'mike@example.com', status: 'Suspended', coins: 0 },
//     { id: 4, username: 'emily_davis', email: 'emily@example.com', status: 'Active', coins: 2100 },
//     { id: 5, username: 'alex_wilson', email: 'alex@example.com', status: 'Active', coins: 750 },
//     { id: 6, username: 'lisa_brown', email: 'lisa@example.com', status: 'Active', coins: 1680 },
//   ];

//   const filteredUsers = users.filter(user =>
//     user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
//   const startIndex = (currentPage - 1) * usersPerPage;
//   const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

//   if (isLoading) return <SkeletonTable />;

//   return (
//     <div className="bg-white rounded-xl shadow-sm border">
//       <div className="p-6 border-b border-gray-200">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
//           <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2">
//             <Plus className="w-4 h-4" />
//             <span>Add User</span>
//           </button>
//         </div>
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//           <input
//             type="text"
//             placeholder="Search users..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent w-full md:w-64"
//           />
//         </div>
//       </div>
      
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coins</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {currentUsers.map((user) => (
//               <tr key={user.id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="flex items-center">
//                     <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center">
//                       <span className="text-white text-sm font-medium">{user.username[0].toUpperCase()}</span>
//                     </div>
//                     <div className="ml-3">
//                       <div className="text-sm font-medium text-gray-900">{user.username}</div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                     user.status === 'Active' 
//                       ? 'bg-green-100 text-green-800' 
//                       : 'bg-red-100 text-red-800'
//                   }`}>
//                     {user.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.coins.toLocaleString()}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <div className="flex space-x-2">
//                     <button className="text-teal-600 hover:text-teal-900">
//                       <Edit className="w-4 h-4" />
//                     </button>
//                     <button className="text-red-600 hover:text-red-900">
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
      
//       <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
//         <div className="text-sm text-gray-700">
//           Showing {startIndex + 1} to {Math.min(startIndex + usersPerPage, filteredUsers.length)} of {filteredUsers.length} users
//         </div>
//         <div className="flex space-x-2">
//           <button
//             onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//             disabled={currentPage === 1}
//             className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <button
//             onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//             disabled={currentPage === totalPages}
//             className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Gig Management Component
// const GigManagement = ({ isLoading }) => {
//   const [activeTab, setActiveTab] = useState('pending');
  
//   const gigs = {
//     pending: [
//       { id: 1, title: 'Logo Design for Startup', category: 'Design', postedBy: 'john_doe', date: '2025-08-20' },
//       { id: 2, title: 'React Developer Needed', category: 'Programming', postedBy: 'sarah_smith', date: '2025-08-19' },
//     ],
//     approved: [
//       { id: 3, title: 'Content Writing', category: 'Writing', postedBy: 'mike_jones', date: '2025-08-18' },
//       { id: 4, title: 'Social Media Management', category: 'Marketing', postedBy: 'emily_davis', date: '2025-08-17' },
//     ],
//     rejected: [
//       { id: 5, title: 'Inappropriate Content', category: 'Other', postedBy: 'spam_user', date: '2025-08-16' },
//     ],
//   };

//   const tabs = [
//     { id: 'pending', label: 'Pending Approval', count: gigs.pending.length, color: 'text-yellow-600' },
//     { id: 'approved', label: 'Approved', count: gigs.approved.length, color: 'text-green-600' },
//     { id: 'rejected', label: 'Rejected', count: gigs.rejected.length, color: 'text-red-600' },
//   ];

//   if (isLoading) return <SkeletonTable />;

//   return (
//     <div className="bg-white rounded-xl shadow-sm border">
//       <div className="p-6 border-b border-gray-200">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Gig Management</h3>
//         <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
//           {tabs.map(({ id, label, count, color }) => (
//             <button
//               key={id}
//               onClick={() => setActiveTab(id)}
//               className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
//                 activeTab === id
//                   ? 'bg-white text-gray-900 shadow-sm'
//                   : 'text-gray-600 hover:text-gray-900'
//               }`}
//             >
//               {label} <span className={`ml-1 ${color}`}>({count})</span>
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="p-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {gigs[activeTab].map((gig) => (
//             <div key={gig.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
//               <div className="flex items-start justify-between mb-3">
//                 <h4 className="font-medium text-gray-900 text-sm">{gig.title}</h4>
//                 <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{gig.category}</span>
//               </div>
//               <div className="text-sm text-gray-600 mb-3">
//                 <p>Posted by: <span className="font-medium">{gig.postedBy}</span></p>
//                 <p>Date: {gig.date}</p>
//               </div>
//               <div className="flex space-x-2">
//                 {activeTab === 'pending' && (
//                   <>
//                     <button className="flex-1 bg-green-600 text-white text-xs py-2 px-3 rounded hover:bg-green-700 transition-colors flex items-center justify-center space-x-1">
//                       <Check className="w-3 h-3" />
//                       <span>Approve</span>
//                     </button>
//                     <button className="flex-1 bg-red-600 text-white text-xs py-2 px-3 rounded hover:bg-red-700 transition-colors flex items-center justify-center space-x-1">
//                       <XCircle className="w-3 h-3" />
//                       <span>Reject</span>
//                     </button>
//                   </>
//                 )}
//                 {activeTab !== 'pending' && (
//                   <button className="w-full bg-gray-600 text-white text-xs py-2 px-3 rounded hover:bg-gray-700 transition-colors flex items-center justify-center space-x-1">
//                     <Eye className="w-3 h-3" />
//                     <span>View Details</span>
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Transaction Component
// const TransactionTable = ({ isLoading }) => {
//   const transactions = [
//     { id: 'TXN001', user: 'john_doe', amount: 500, type: 'Credit', date: '2025-08-22' },
//     { id: 'TXN002', user: 'sarah_smith', amount: 250, type: 'Debit', date: '2025-08-21' },
//     { id: 'TXN003', user: 'mike_jones', amount: 1000, type: 'Credit', date: '2025-08-20' },
//     { id: 'TXN004', user: 'emily_davis', amount: 750, type: 'Debit', date: '2025-08-19' },
//   ];

//   if (isLoading) return <SkeletonTable />;

//   return (
//     <div className="space-y-6">
//       {/* Overview Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white p-6 rounded-xl shadow-sm border">
//           <h3 className="text-sm font-medium text-gray-600 mb-2">Total Transactions</h3>
//           <p className="text-2xl font-bold text-gray-900">15,432</p>
//           <p className="text-sm text-green-600 mt-1">+5.2% from last week</p>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-sm border">
//           <h3 className="text-sm font-medium text-gray-600 mb-2">Coins Purchased</h3>
//           <p className="text-2xl font-bold text-gray-900">234,567</p>
//           <p className="text-sm text-green-600 mt-1">+12.8% from last week</p>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-sm border">
//           <h3 className="text-sm font-medium text-gray-600 mb-2">Coins Withdrawn</h3>
//           <p className="text-2xl font-bold text-gray-900">45,890</p>
//           <p className="text-sm text-red-600 mt-1">+2.1% from last week</p>
//         </div>
//       </div>

//       {/* Transaction Table */}
//       <div className="bg-white rounded-xl shadow-sm border">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
//             <div className="flex space-x-2">
//               <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//                 <Filter className="w-4 h-4" />
//                 <span>Filter</span>
//               </button>
//               <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//                 <Calendar className="w-4 h-4" />
//                 <span>Date Range</span>
//               </button>
//               <button className="flex items-center space-x-2 px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
//                 <Download className="w-4 h-4" />
//                 <span>Export</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {transactions.map((transaction) => (
//                 <tr key={transaction.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.id}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.user}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.amount} coins</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                       transaction.type === 'Credit' 
//                         ? 'bg-green-100 text-green-800' 
//                         : 'bg-red-100 text-red-800'
//                     }`}>
//                       {transaction.type}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Analytics Component
// const AnalyticsCharts = ({ isLoading }) => {
//   const [selectedChart, setSelectedChart] = useState('users');

//   const chartData = {
//     users: [
//       { month: 'Jan', value: 1200 },
//       { month: 'Feb', value: 1800 },
//       { month: 'Mar', value: 2400 },
//       { month: 'Apr', value: 3200 },
//       { month: 'May', value: 4100 },
//       { month: 'Jun', value: 5200 },
//     ],
//     gigs: [
//       { category: 'Design', value: 35, color: '#0891b2' },
//       { category: 'Programming', value: 25, color: '#14b8a6' },
//       { category: 'Writing', value: 20, color: '#06b6d4' },
//       { category: 'Marketing', value: 15, color: '#0e7490' },
//       { category: 'Other', value: 5, color: '#155e75' },
//     ],
//     coins: [
//       { month: 'Jan', purchased: 15000, withdrawn: 8000 },
//       { month: 'Feb', purchased: 18000, withdrawn: 12000 },
//       { month: 'Mar', purchased: 22000, withdrawn: 15000 },
//       { month: 'Apr', purchased: 28000, withdrawn: 18000 },
//       { month: 'May', purchased: 35000, withdrawn: 22000 },
//       { month: 'Jun', purchased: 42000, withdrawn: 28000 },
//     ],
//   };

//   if (isLoading) {
//     return (
//       <div className="space-y-6">
//         <SkeletonCard />
//         <SkeletonCard />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Chart Selection */}
//       <div className="bg-white p-6 rounded-xl shadow-sm border">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics Dashboard</h3>
//         <div className="flex space-x-4 mb-6">
//           <button
//             onClick={() => setSelectedChart('users')}
//             className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//               selectedChart === 'users'
//                 ? 'bg-teal-600 text-white'
//                 : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//             }`}
//           >
//             User Growth
//           </button>
//           <button
//             onClick={() => setSelectedChart('gigs')}
//             className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//               selectedChart === 'gigs'
//                 ? 'bg-teal-600 text-white'
//                 : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//             }`}
//           >
//             Gigs by Category
//           </button>
//           <button
//             onClick={() => setSelectedChart('coins')}
//             className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//               selectedChart === 'coins'
//                 ? 'bg-teal-600 text-white'
//                 : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//             }`}
//           >
//             Coin Flow
//           </button>
//         </div>

//         {/* Chart Display */}
//         <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
//           {selectedChart === 'users' && (
//             <div className="w-full h-full flex items-end space-x-4 p-4">
//               {chartData.users.map((item, index) => (
//                 <div key={index} className="flex-1 flex flex-col items-center">
//                   <div
//                     className="w-full bg-gradient-to-t from-teal-500 to-cyan-400 rounded-t"
//                     style={{ height: `${(item.value / 5200) * 100}%`, minHeight: '20px' }}
//                   ></div>
//                   <span className="text-xs text-gray-600 mt-2">{item.month}</span>
//                   <span className="text-xs font-medium text-gray-900">{item.value}</span>
//                 </div>
//               ))}
//             </div>
//           )}

//           {selectedChart === 'gigs' && (
//             <div className="w-full h-full flex items-center justify-center">
//               <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full">
//                 {chartData.gigs.map((item, index) => (
//                   <div key={index} className="text-center">
//                     <div
//                       className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold"
//                       style={{ backgroundColor: item.color }}
//                     >
//                       {item.value}%
//                     </div>
//                     <span className="text-xs text-gray-600">{item.category}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {selectedChart === 'coins' && (
//             <div className="w-full h-full flex items-end space-x-2 p-4">
//               {chartData.coins.map((item, index) => (
//                 <div key={index} className="flex-1 flex flex-col items-center">
//                   <div className="w-full flex flex-col space-y-1">
//                     <div
//                       className="w-full bg-green-500 rounded-t"
//                       style={{ height: `${(item.purchased / 42000) * 80}px`, minHeight: '10px' }}
//                     ></div>
//                     <div
//                       className="w-full bg-red-500"
//                       style={{ height: `${(item.withdrawn / 42000) * 80}px`, minHeight: '10px' }}
//                     ></div>
//                   </div>
//                   <span className="text-xs text-gray-600 mt-2">{item.month}</span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="mt-4 flex justify-center">
//           <button className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
//             <Download className="w-4 h-4" />
//             <span>Export Report</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Settings Component
// const SettingsPanel = ({ isLoading }) => {
//   const [activeSection, setActiveSection] = useState('profile');

//   if (isLoading) return <SkeletonTable />;

//   return (
//     <div className="space-y-6">
//       {/* Settings Navigation */}
//       <div className="bg-white p-6 rounded-xl shadow-sm border">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
//         <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
//           <button
//             onClick={() => setActiveSection('profile')}
//             className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
//               activeSection === 'profile'
//                 ? 'bg-white text-gray-900 shadow-sm'
//                 : 'text-gray-600 hover:text-gray-900'
//             }`}
//           >
//             Admin Profile
//           </button>
//           <button
//             onClick={() => setActiveSection('system')}
//             className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
//               activeSection === 'system'
//                 ? 'bg-white text-gray-900 shadow-sm'
//                 : 'text-gray-600 hover:text-gray-900'
//             }`}
//           >
//             System Settings
//           </button>
//         </div>
//       </div>

//       {/* Settings Content */}
//       {activeSection === 'profile' && (
//         <div className="bg-white p-6 rounded-xl shadow-sm border">
//           <h4 className="text-md font-semibold text-gray-900 mb-4">Admin Profile Settings</h4>
//           <div className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//                 <input
//                   type="text"
//                   defaultValue="Admin User"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                 <input
//                   type="email"
//                   defaultValue="admin@skillsamigo.com"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
//               <input
//                 type="password"
//                 placeholder="Enter new password"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//               />
//             </div>
//             <button className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors">
//               Update Profile
//             </button>
//           </div>
//         </div>
//       )}

//       {activeSection === 'system' && (
//         <div className="space-y-6">
//           <div className="bg-white p-6 rounded-xl shadow-sm border">
//             <h4 className="text-md font-semibold text-gray-900 mb-4">Gig Categories</h4>
//             <div className="space-y-3">
//               {['Design', 'Programming', 'Writing', 'Marketing', 'Consulting'].map((category, index) => (
//                 <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
//                   <span className="text-sm font-medium text-gray-900">{category}</span>
//                   <div className="flex space-x-2">
//                     <button className="text-teal-600 hover:text-teal-700 text-sm">Edit</button>
//                     <button className="text-red-600 hover:text-red-700 text-sm">Delete</button>
//                   </div>
//                 </div>
//               ))}
//               <button className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-teal-500 hover:text-teal-600 transition-colors">
//                 + Add New Category
//               </button>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow-sm border">
//             <h4 className="text-md font-semibold text-gray-900 mb-4">Platform Settings</h4>
//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Coin Price (USD)</label>
//                   <input
//                     type="number"
//                     defaultValue="0.10"
//                     step="0.01"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Platform Fee (%)</label>
//                   <input
//                     type="number"
//                     defaultValue="5"
//                     min="0"
//                     max="100"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>
//               <button className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors">
//                 Save Settings
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Footer Component
// const Footer = () => (
//   <footer className="bg-white border-t border-gray-200 px-6 py-4 md:ml-64">
//     <div className="text-center text-sm text-gray-600">
//       © 2025 SkillsAmigo | Admin Panel
//     </div>
//   </footer>
// );

// // Main App Component
// const SkillsAmigoAdmin = () => {
//   const [activePage, setActivePage] = useState('overview');
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');

//   const userProfile = {
//     name: 'Admin User',
//     email: 'admin@skillsamigo.com',
//   };

//   // Simulate loading
//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 1500);
//     return () => clearTimeout(timer);
//   }, [activePage]);

//   const getPageTitle = (page) => {
//     const titles = {
//       overview: 'Dashboard Overview',
//       users: 'Manage Users',
//       gigs: 'Manage Gigs',
//       transactions: 'Transactions & Coins',
//       analytics: 'Reports & Analytics',
//       settings: 'Settings',
//     };
//     return titles[page] || 'Dashboard';
//   };

//   const renderPageContent = () => {
//     switch (activePage) {
//       case 'overview':
//         return (
//           <div className="space-y-6">
//             <OverviewCards isLoading={isLoading} />
//             {!isLoading && (
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 <div className="bg-white p-6 rounded-xl shadow-sm border">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Earners</h3>
//                   <div className="space-y-3">
//                     {[
//                       { name: 'sarah_smith', earnings: '2,450 coins' },
//                       { name: 'john_doe', earnings: '2,100 coins' },
//                       { name: 'emily_davis', earnings: '1,890 coins' },
//                     ].map((user, index) => (
//                       <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                         <div className="flex items-center space-x-3">
//                           <span className="text-sm font-bold text-teal-600">#{index + 1}</span>
//                           <span className="text-sm font-medium text-gray-900">{user.name}</span>
//                         </div>
//                         <span className="text-sm text-gray-600">{user.earnings}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="bg-white p-6 rounded-xl shadow-sm border">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
//                   <div className="space-y-3">
//                     {[
//                       { action: 'New user registered', time: '2 minutes ago' },
//                       { action: 'Gig approved', time: '15 minutes ago' },
//                       { action: 'Transaction completed', time: '1 hour ago' },
//                     ].map((activity, index) => (
//                       <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                         <span className="text-sm text-gray-900">{activity.action}</span>
//                         <span className="text-xs text-gray-500">{activity.time}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         );
//       case 'users':
//         return <UserTable isLoading={isLoading} />;
//       case 'gigs':
//         return <GigManagement isLoading={isLoading} />;
//       case 'transactions':
//         return <TransactionTable isLoading={isLoading} />;
//       case 'analytics':
//         return <AnalyticsCharts isLoading={isLoading} />;
//       case 'settings':
//         return <SettingsPanel isLoading={isLoading} />;
//       default:
//         return <div>Page not found</div>;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Mobile Menu Button */}
//       <div className="md:hidden fixed top-4 left-4 z-50">
//         <button
//           onClick={() => setIsMobileOpen(true)}
//           className="p-2 bg-teal-600 text-white rounded-lg shadow-lg"
//         >
//           <Menu className="w-5 h-5" />
//         </button>
//       </div>

//       {/* Sidebar */}
//       <Sidebar
//         activePage={activePage}
//         setActivePage={setActivePage}
//         isMobileOpen={isMobileOpen}
//         setIsMobileOpen={setIsMobileOpen}
//       />

//       {/* Main Content */}
//       <div className="md:ml-64 flex flex-col min-h-screen">
//         <Header
//           currentPage={getPageTitle(activePage)}
//           onSearch={setSearchTerm}
//           userProfile={userProfile}
//         />
        
//         <main className="flex-1 p-6 pb-20 md:pb-6">
//           {renderPageContent()}
//         </main>

//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default SkillsAmigoAdmin;




'use client'
import React, { useState, useEffect } from 'react';
import { Menu, X, Bell, User, LogOut, Settings as SettingsIcon, BarChart3, Users, Briefcase, Coins, FileText, ChevronDown, Home, Eye, Check, XCircle, Filter, Calendar, Download, Edit, Trash2, Plus, Search } from 'lucide-react';

// Utility function for CSV export
const downloadCSV = (data, filename) => {
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => `"${row[header]}"`).join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Utility function for PDF export (simple text-based)
const downloadPDF = (title, data) => {
  const content = `${title}\n\n${JSON.stringify(data, null, 2)}`;
  const blob = new Blob([content], { type: 'text/plain' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${title.replace(/\s+/g, '_').toLowerCase()}.txt`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Skeleton Loader Components
const SkeletonCard = () => (
  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
    <div className="h-6 sm:h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
  </div>
);

const SkeletonTable = () => (
  <div className="bg-white rounded-xl shadow-sm border animate-pulse">
    <div className="p-4 sm:p-6 border-b">
      <div className="h-6 bg-gray-200 rounded w-1/4"></div>
    </div>
    {[...Array(5)].map((_, i) => (
      <div key={i} className="p-4 sm:p-6 border-b border-gray-100 flex items-center space-x-4">
        <div className="h-4 bg-gray-200 rounded flex-1"></div>
        <div className="h-4 bg-gray-200 rounded flex-1"></div>
        <div className="h-4 bg-gray-200 rounded flex-1 hidden sm:block"></div>
        <div className="h-8 bg-gray-200 rounded w-16 sm:w-20"></div>
      </div>
    ))}
  </div>
);

// Header Component - Full Width
const Header = ({ currentPage, userProfile }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  
  return (
    <header className="w-full bg-white border-b border-gray-200 px-4 sm:px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-teal-600 to-cyan-700 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold text-teal-700">SkillsAmigo</span>
              <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Admin Panel</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900 hidden md:block">{currentPage}</h1>
          
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">{userProfile.name}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            
            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2 transition-colors">
                  <SettingsIcon className="w-4 h-4" />
                  <span>Change Password</span>
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 transition-colors">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile page title */}
      <div className="md:hidden mt-3">
        <h1 className="text-xl font-bold text-gray-900">{currentPage}</h1>
      </div>
    </header>
  );
};

// Mobile Navigation Component
const MobileNavigation = ({ activePage, setActivePage }) => {
  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: Home },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'gigs', label: 'Gigs', icon: Briefcase },
    { id: 'transactions', label: 'Coins', icon: Coins },
    { id: 'analytics', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
      <div className="grid grid-cols-6 gap-1">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActivePage(id)}
            className={`flex flex-col items-center py-2 px-1 transition-colors ${
              activePage === id
                ? 'bg-teal-50 text-teal-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Desktop Sidebar Component
const DesktopSidebar = ({ activePage, setActivePage }) => {
  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: Home },
    { id: 'users', label: 'Manage Users', icon: Users },
    { id: 'gigs', label: 'Manage Gigs', icon: Briefcase },
    { id: 'transactions', label: 'Transactions & Coins', icon: Coins },
    { id: 'analytics', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:top-20 lg:bottom-0">
      <div className="flex-1 flex flex-col bg-gradient-to-b from-teal-600 to-cyan-700 rounded-tr-xl shadow-lg">
        <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActivePage(id)}
                className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg w-full text-left transition-all duration-200 ${
                  activePage === id
                    ? 'bg-teal-800 text-white shadow-md transform scale-105'
                    : 'text-teal-100 hover:bg-teal-700 hover:text-white hover:transform hover:scale-102'
                }`}
              >
                <Icon className="mr-3 flex-shrink-0 h-5 w-5" />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

// Overview Cards Component
const OverviewCards = ({ isLoading }) => {
  const cards = [
    { title: 'Total Users', value: '12,456', change: '+12%', icon: Users, color: 'from-blue-500 to-blue-600' },
    { title: 'Total Gigs Posted', value: '3,241', change: '+8%', icon: Briefcase, color: 'from-green-500 to-green-600' },
    { title: 'Coins in Circulation', value: '892,341', change: '+24%', icon: Coins, color: 'from-yellow-500 to-yellow-600' },
    { title: 'Total Revenue', value: '$45,231', change: '+18%', icon: BarChart3, color: 'from-purple-500 to-purple-600' },
  ];

  const handleExport = () => {
    const exportData = cards.map(card => ({
      Metric: card.title,
      Value: card.value,
      Change: card.change,
    }));
    downloadCSV(exportData, 'dashboard_overview');
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Key Metrics</h2>
        <button
          onClick={handleExport}
          className="flex items-center space-x-2 px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm"
        >
          <Download className="w-4 h-4" />
          <span>Export</span>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {cards.map(({ title, value, change, icon: Icon, color }, index) => (
          <div key={index} className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-600 truncate">{title}</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{value}</p>
                <p className="text-sm text-green-600 mt-1">{change} from last month</p>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-r ${color} flex-shrink-0 ml-4`}>
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// User Table Component
const UserTable = ({ isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const users = [
    { id: 1, username: 'john_doe', email: 'john@example.com', status: 'Active', coins: 1250, joinDate: '2025-01-15' },
    { id: 2, username: 'sarah_smith', email: 'sarah@example.com', status: 'Active', coins: 890, joinDate: '2025-02-20' },
    { id: 3, username: 'mike_jones', email: 'mike@example.com', status: 'Suspended', coins: 0, joinDate: '2025-01-10' },
    { id: 4, username: 'emily_davis', email: 'emily@example.com', status: 'Active', coins: 2100, joinDate: '2025-03-05' },
    { id: 5, username: 'alex_wilson', email: 'alex@example.com', status: 'Active', coins: 750, joinDate: '2025-02-28' },
    { id: 6, username: 'lisa_brown', email: 'lisa@example.com', status: 'Active', coins: 1680, joinDate: '2025-03-12' },
  ];

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  const handleExport = () => {
    const exportData = filteredUsers.map(user => ({
      ID: user.id,
      Username: user.username,
      Email: user.email,
      Status: user.status,
      Coins: user.coins,
      'Join Date': user.joinDate,
    }));
    downloadCSV(exportData, 'users_data');
  };

  if (isLoading) return <SkeletonTable />;

  return (
    <div className="bg-white rounded-xl shadow-sm border">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent w-full sm:w-64 text-sm"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleExport}
                className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button className="bg-teal-600 text-white px-3 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2 text-sm">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add User</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Card View */}
      <div className="block sm:hidden">
        {currentUsers.map((user) => (
          <div key={user.id} className="p-4 border-b border-gray-200 hover:bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{user.username[0].toUpperCase()}</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{user.username}</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </div>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                user.status === 'Active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {user.status}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{user.coins.toLocaleString()} coins</span>
              <div className="flex space-x-2">
                <button className="text-teal-600 hover:text-teal-900">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coins</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">{user.username[0].toUpperCase()}</span>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{user.username}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    user.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.coins.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-teal-600 hover:text-teal-900">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-4 sm:px-6 py-3 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="text-sm text-gray-700">
          Showing {startIndex + 1} to {Math.min(startIndex + usersPerPage, filteredUsers.length)} of {filteredUsers.length} users
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

// Gig Management Component
const GigManagement = ({ isLoading }) => {
  const [activeTab, setActiveTab] = useState('pending');
  
  const gigs = {
    pending: [
      { id: 1, title: 'Logo Design for Startup', category: 'Design', postedBy: 'john_doe', date: '2025-08-20', budget: '$500' },
      { id: 2, title: 'React Developer Needed', category: 'Programming', postedBy: 'sarah_smith', date: '2025-08-19', budget: '$1200' },
      { id: 3, title: 'Content Writing Project', category: 'Writing', postedBy: 'alex_wilson', date: '2025-08-21', budget: '$300' },
    ],
    approved: [
      { id: 4, title: 'Content Writing', category: 'Writing', postedBy: 'mike_jones', date: '2025-08-18', budget: '$400' },
      { id: 5, title: 'Social Media Management', category: 'Marketing', postedBy: 'emily_davis', date: '2025-08-17', budget: '$800' },
    ],
    rejected: [
      { id: 6, title: 'Inappropriate Content', category: 'Other', postedBy: 'spam_user', date: '2025-08-16', budget: '$100' },
    ],
  };

  const tabs = [
    { id: 'pending', label: 'Pending', count: gigs.pending.length, color: 'text-yellow-600' },
    { id: 'approved', label: 'Approved', count: gigs.approved.length, color: 'text-green-600' },
    { id: 'rejected', label: 'Rejected', count: gigs.rejected.length, color: 'text-red-600' },
  ];

  const handleExport = () => {
    const allGigs = [...gigs.pending, ...gigs.approved, ...gigs.rejected];
    const exportData = allGigs.map(gig => ({
      ID: gig.id,
      Title: gig.title,
      Category: gig.category,
      'Posted By': gig.postedBy,
      Date: gig.date,
      Budget: gig.budget,
      Status: gigs.pending.includes(gig) ? 'Pending' : gigs.approved.includes(gig) ? 'Approved' : 'Rejected'
    }));
    downloadCSV(exportData, 'gigs_data');
  };

  if (isLoading) return <SkeletonTable />;

  return (
    <div className="bg-white rounded-xl shadow-sm border">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Gig Management</h3>
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm self-start"
          >
            <Download className="w-4 h-4" />
            <span>Export All</span>
          </button>
        </div>
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg overflow-x-auto">
          {tabs.map(({ id, label, count, color }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 min-w-0 py-2 px-3 sm:px-4 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="hidden sm:inline">{label} Approval</span>
              <span className="sm:hidden">{label}</span>
              <span className={`ml-1 ${color}`}>({count})</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gigs[activeTab].map((gig) => (
            <div key={gig.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-gray-900 text-sm line-clamp-2">{gig.title}</h4>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full flex-shrink-0 ml-2">{gig.category}</span>
              </div>
              <div className="text-sm text-gray-600 mb-3 space-y-1">
                <p>By: <span className="font-medium">{gig.postedBy}</span></p>
                <p>Date: {gig.date}</p>
                <p>Budget: <span className="font-medium text-green-600">{gig.budget}</span></p>
              </div>
              <div className="flex space-x-2">
                {activeTab === 'pending' && (
                  <>
                    <button className="flex-1 bg-green-600 text-white text-xs py-2 px-3 rounded hover:bg-green-700 transition-colors flex items-center justify-center space-x-1">
                      <Check className="w-3 h-3" />
                      <span>Approve</span>
                    </button>
                    <button className="flex-1 bg-red-600 text-white text-xs py-2 px-3 rounded hover:bg-red-700 transition-colors flex items-center justify-center space-x-1">
                      <XCircle className="w-3 h-3" />
                      <span>Reject</span>
                    </button>
                  </>
                )}
                {activeTab !== 'pending' && (
                  <button className="w-full bg-gray-600 text-white text-xs py-2 px-3 rounded hover:bg-gray-700 transition-colors flex items-center justify-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>View Details</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Transaction Component
const TransactionTable = ({ isLoading }) => {
  const transactions = [
    { id: 'TXN001', user: 'john_doe', amount: 500, type: 'Credit', date: '2025-08-22', description: 'Gig completion bonus' },
    { id: 'TXN002', user: 'sarah_smith', amount: 250, type: 'Debit', date: '2025-08-21', description: 'Service fee' },
    { id: 'TXN003', user: 'mike_jones', amount: 1000, type: 'Credit', date: '2025-08-20', description: 'Coin purchase' },
    { id: 'TXN004', user: 'emily_davis', amount: 750, type: 'Debit', date: '2025-08-19', description: 'Withdrawal' },
    { id: 'TXN005', user: 'alex_wilson', amount: 300, type: 'Credit', date: '2025-08-18', description: 'Referral bonus' },
  ];

  const handleExportTransactions = () => {
    const exportData = transactions.map(transaction => ({
      'Transaction ID': transaction.id,
      User: transaction.user,
      Amount: transaction.amount,
      Type: transaction.type,
      Date: transaction.date,
      Description: transaction.description,
    }));
    downloadCSV(exportData, 'transactions_data');
  };

  const handleExportOverview = () => {
    const overviewData = [
      { Metric: 'Total Transactions', Value: '15,432', Change: '+5.2%' },
      { Metric: 'Coins Purchased', Value: '234,567', Change: '+12.8%' },
      { Metric: 'Coins Withdrawn', Value: '45,890', Change: '+2.1%' },
    ];
    downloadCSV(overviewData, 'transaction_overview');
  };

  if (isLoading) return <SkeletonTable />;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Transaction Overview</h2>
          <button
            onClick={handleExportOverview}
            className="flex items-center space-x-2 px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export Overview</span>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Total Transactions</h3>
            <p className="text-2xl font-bold text-gray-900">15,432</p>
            <p className="text-sm text-green-600 mt-1">+5.2% from last week</p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Coins Purchased</h3>
            <p className="text-2xl font-bold text-gray-900">234,567</p>
            <p className="text-sm text-green-600 mt-1">+12.8% from last week</p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Coins Withdrawn</h3>
            <p className="text-2xl font-bold text-gray-900">45,890</p>
            <p className="text-sm text-red-600 mt-1">+2.1% from last week</p>
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            <div className="flex flex-wrap gap-2">
              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">Date Range</span>
                <span className="sm:hidden">Date</span>
              </button>
              <button
                onClick={handleExportTransactions}
                className="flex items-center space-x-2 px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-sm"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="block lg:hidden">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="p-4 border-b border-gray-200 hover:bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900">{transaction.id}</div>
                  <div className="text-sm text-gray-600">{transaction.user}</div>
                  <div className="text-xs text-gray-500 mt-1">{transaction.description}</div>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <div className="text-sm font-medium text-gray-900">{transaction.amount} coins</div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    transaction.type === 'Credit' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {transaction.type}
                  </span>
                </div>
              </div>
              <div className="text-xs text-gray-500">{transaction.date}</div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.amount} coins</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      transaction.type === 'Credit' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Analytics Component
const AnalyticsCharts = ({ isLoading }) => {
  const [selectedChart, setSelectedChart] = useState('users');

  const chartData = {
    users: [
      { month: 'Jan', value: 1200 },
      { month: 'Feb', value: 1800 },
      { month: 'Mar', value: 2400 },
      { month: 'Apr', value: 3200 },
      { month: 'May', value: 4100 },
      { month: 'Jun', value: 5200 },
    ],
    gigs: [
      { category: 'Design', value: 35, color: '#0891b2' },
      { category: 'Programming', value: 25, color: '#14b8a6' },
      { category: 'Writing', value: 20, color: '#06b6d4' },
      { category: 'Marketing', value: 15, color: '#0e7490' },
      { category: 'Other', value: 5, color: '#155e75' },
    ],
    coins: [
      { month: 'Jan', purchased: 15000, withdrawn: 8000 },
      { month: 'Feb', purchased: 18000, withdrawn: 12000 },
      { month: 'Mar', purchased: 22000, withdrawn: 15000 },
      { month: 'Apr', purchased: 28000, withdrawn: 18000 },
      { month: 'May', purchased: 35000, withdrawn: 22000 },
      { month: 'Jun', purchased: 42000, withdrawn: 28000 },
    ],
  };

  const handleExportChart = () => {
    let exportData = [];
    let filename = '';

    switch (selectedChart) {
      case 'users':
        exportData = chartData.users.map(item => ({
          Month: item.month,
          'User Count': item.value,
        }));
        filename = 'user_growth_data';
        break;
      case 'gigs':
        exportData = chartData.gigs.map(item => ({
          Category: item.category,
          Percentage: item.value,
        }));
        filename = 'gigs_by_category_data';
        break;
      case 'coins':
        exportData = chartData.coins.map(item => ({
          Month: item.month,
          'Coins Purchased': item.purchased,
          'Coins Withdrawn': item.withdrawn,
        }));
        filename = 'coin_flow_data';
        break;
    }

    downloadCSV(exportData, filename);
  };

  const handleExportPDF = () => {
    const title = `Analytics Report - ${selectedChart.charAt(0).toUpperCase() + selectedChart.slice(1)} Data`;
    let data = chartData[selectedChart];
    downloadPDF(title, data);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Chart Selection */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Analytics Dashboard</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleExportChart}
              className="flex items-center space-x-2 px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handleExportPDF}
              className="flex items-center space-x-2 px-3 py-2 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedChart('users')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedChart === 'users'
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            User Growth
          </button>
          <button
            onClick={() => setSelectedChart('gigs')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedChart === 'gigs'
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Gigs by Category
          </button>
          <button
            onClick={() => setSelectedChart('coins')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedChart === 'coins'
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Coin Flow
          </button>
        </div>

        {/* Chart Display */}
        <div className="h-64 sm:h-80 flex items-center justify-center bg-gray-50 rounded-lg">
          {selectedChart === 'users' && (
            <div className="w-full h-full flex items-end space-x-2 sm:space-x-4 p-4">
              {chartData.users.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-teal-500 to-cyan-400 rounded-t transition-all duration-500"
                    style={{ height: `${(item.value / 5200) * 100}%`, minHeight: '20px' }}
                  ></div>
                  <span className="text-xs text-gray-600 mt-2">{item.month}</span>
                  <span className="text-xs font-medium text-gray-900">{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}

          {selectedChart === 'gigs' && (
            <div className="w-full h-full flex items-center justify-center p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
                {chartData.gigs.map((item, index) => (
                  <div key={index} className="text-center">
                    <div
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-sm sm:text-base transition-transform hover:scale-110"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.value}%
                    </div>
                    <span className="text-xs text-gray-600 block">{item.category}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedChart === 'coins' && (
            <div className="w-full h-full flex items-end space-x-1 sm:space-x-2 p-4">
              {chartData.coins.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex flex-col space-y-1">
                    <div
                      className="w-full bg-green-500 rounded-t transition-all duration-500"
                      style={{ height: `${(item.purchased / 42000) * 80}px`, minHeight: '10px' }}
                      title={`Purchased: ${item.purchased.toLocaleString()}`}
                    ></div>
                    <div
                      className="w-full bg-red-500 transition-all duration-500"
                      style={{ height: `${(item.withdrawn / 42000) * 80}px`, minHeight: '10px' }}
                      title={`Withdrawn: ${item.withdrawn.toLocaleString()}`}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 mt-2">{item.month}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Chart Legend */}
        <div className="mt-4 flex justify-center">
          {selectedChart === 'coins' && (
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Purchased</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>Withdrawn</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Settings Component
const SettingsPanel = ({ isLoading }) => {
  const [activeSection, setActiveSection] = useState('profile');

  if (isLoading) return <SkeletonTable />;

  return (
    <div className="space-y-6">
      {/* Settings Navigation */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveSection('profile')}
            className={`flex-1 py-2 px-3 sm:px-4 rounded-md text-sm font-medium transition-colors ${
              activeSection === 'profile'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Admin Profile
          </button>
          <button
            onClick={() => setActiveSection('system')}
            className={`flex-1 py-2 px-3 sm:px-4 rounded-md text-sm font-medium transition-colors ${
              activeSection === 'system'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            System Settings
          </button>
        </div>
      </div>

      {/* Settings Content */}
      {activeSection === 'profile' && (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Admin Profile Settings</h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  defaultValue="Admin User"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  defaultValue="admin@skillsamigo.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <button className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors">
              Update Profile
            </button>
          </div>
        </div>
      )}

      {activeSection === 'system' && (
        <div className="space-y-6">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
            <h4 className="text-md font-semibold text-gray-900 mb-4">Gig Categories</h4>
            <div className="space-y-3">
              {['Design', 'Programming', 'Writing', 'Marketing', 'Consulting'].map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <span className="text-sm font-medium text-gray-900">{category}</span>
                  <div className="flex space-x-2">
                    <button className="text-teal-600 hover:text-teal-700 text-sm">Edit</button>
                    <button className="text-red-600 hover:text-red-700 text-sm">Delete</button>
                  </div>
                </div>
              ))}
              <button className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-teal-500 hover:text-teal-600 transition-colors">
                + Add New Category
              </button>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
            <h4 className="text-md font-semibold text-gray-900 mb-4">Platform Settings</h4>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Coin Price (USD)</label>
                  <input
                    type="number"
                    defaultValue="0.10"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Platform Fee (%)</label>
                  <input
                    type="number"
                    defaultValue="5"
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
              <button className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Footer Component
const Footer = () => (
  <footer className="bg-white border-t border-gray-200 px-4 sm:px-6 py-4">
    <div className="text-center text-sm text-gray-600">
      © 2025 SkillsAmigo | Admin Panel
    </div>
  </footer>
);

// Main App Component
const SkillsAmigoAdmin = () => {
  const [activePage, setActivePage] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  const userProfile = {
    name: 'Admin User',
    email: 'admin@skillsamigo.com',
  };

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [activePage]);

  const getPageTitle = (page) => {
    const titles = {
      overview: 'Dashboard Overview',
      users: 'Manage Users',
      gigs: 'Manage Gigs',
      transactions: 'Transactions & Coins',
      analytics: 'Reports & Analytics',
      settings: 'Settings',
    };
    return titles[page] || 'Dashboard';
  };

  const renderPageContent = () => {
    switch (activePage) {
      case 'overview':
        return (
          <div className="space-y-6">
            <OverviewCards isLoading={isLoading} />
            {!isLoading && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Earners</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'sarah_smith', earnings: '2,450 coins' },
                      { name: 'john_doe', earnings: '2,100 coins' },
                      { name: 'emily_davis', earnings: '1,890 coins' },
                    ].map((user, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-bold text-teal-600">#{index + 1}</span>
                          <span className="text-sm font-medium text-gray-900">{user.name}</span>
                        </div>
                        <span className="text-sm text-gray-600">{user.earnings}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {[
                      { action: 'New user registered', time: '2 minutes ago' },
                      { action: 'Gig approved', time: '15 minutes ago' },
                      { action: 'Transaction completed', time: '1 hour ago' },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-900">{activity.action}</span>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case 'users':
        return <UserTable isLoading={isLoading} />;
      case 'gigs':
        return <GigManagement isLoading={isLoading} />;
      case 'transactions':
        return <TransactionTable isLoading={isLoading} />;
      case 'analytics':
        return <AnalyticsCharts isLoading={isLoading} />;
      case 'settings':
        return <SettingsPanel isLoading={isLoading} />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Full Width Header */}
      <Header
        currentPage={getPageTitle(activePage)}
        userProfile={userProfile}
      />

      <div className="flex">
        {/* Desktop Sidebar */}
        <DesktopSidebar
          activePage={activePage}
          setActivePage={setActivePage}
        />

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-4 sm:p-6 pb-20 lg:pb-6">
          {renderPageContent()}
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* Footer */}
      <div className="lg:ml-64">
        <Footer />
      </div>
    </div>
  );
};

export default SkillsAmigoAdmin;