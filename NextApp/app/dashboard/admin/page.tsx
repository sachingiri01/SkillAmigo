




'use client'
import React, { useState, useEffect } from 'react';
import { DollarSign,Menu, X, Bell, User, LogOut, Settings as SettingsIcon, BarChart3, Users, Briefcase, Coins, FileText, ChevronDown, Home, Eye, Check, XCircle, Filter, Calendar, Download, Edit, Trash2, Plus, Search } from 'lucide-react';

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
          
          <a href="/">
                        <button
                          className="flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-200 hover:scale-105"
                          style={{ backgroundColor: '#f3f8f8', color: '#344545' }}
                        >
                          <Home className="w-5 h-5" />
                          
                        </button></a>
          
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
                {/* <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2 transition-colors">
                  <SettingsIcon className="w-4 h-4" />
                  <span>Change Password</span>
                </button> */}
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





// gig management
const GigTable = ({ isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const gigsPerPage = 10;

  const gigs = [
    { 
      id: 1, 
      title: 'Website Design for E-commerce Store', 
      seller: 'john_designer', 
      category: 'Design', 
      price: 150, 
      status: 'Active', 
      orders: 23, 
      rating: 4.8,
      createdDate: '2025-01-15'
    },
    { 
      id: 2, 
      title: 'React App Development', 
      seller: 'sarah_dev', 
      category: 'Programming', 
      price: 300, 
      status: 'Active', 
      orders: 15, 
      rating: 4.9,
      createdDate: '2025-02-20'
    },
    { 
      id: 3, 
      title: 'Content Writing for Blog Posts', 
      seller: 'mike_writer', 
      category: 'Writing', 
      price: 50, 
      status: 'Pending', 
      orders: 8, 
      rating: 4.5,
      createdDate: '2025-01-10'
    },
    { 
      id: 4, 
      title: 'Digital Marketing Campaign', 
      seller: 'emily_marketer', 
      category: 'Marketing', 
      price: 200, 
      status: 'Active', 
      orders: 31, 
      rating: 4.7,
      createdDate: '2025-03-05'
    },
    { 
      id: 5, 
      title: 'Business Consultation Services', 
      seller: 'alex_consultant', 
      category: 'Consulting', 
      price: 120, 
      status: 'Suspended', 
      orders: 5, 
      rating: 4.3,
      createdDate: '2025-02-28'
    },
    { 
      id: 6, 
      title: 'Logo Design Package', 
      seller: 'lisa_creative', 
      category: 'Design', 
      price: 80, 
      status: 'Active', 
      orders: 42, 
      rating: 4.9,
      createdDate: '2025-03-12'
    },
  ];

  const filteredGigs = gigs.filter(gig => {
    const matchesSearch = gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gig.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gig.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || gig.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredGigs.length / gigsPerPage);
  const startIndex = (currentPage - 1) * gigsPerPage;
  const currentGigs = filteredGigs.slice(startIndex, startIndex + gigsPerPage);

  const handleExport = () => {
    const exportData = filteredGigs.map(gig => ({
      ID: gig.id,
      Title: gig.title,
      Seller: gig.seller,
      Category: gig.category,
      Price: gig.price,
      Status: gig.status,
      Orders: gig.orders,
      Rating: gig.rating,
      'Created Date': gig.createdDate,
    }));
    downloadCSV(exportData, 'gigs_data');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Design': return '🎨';
      case 'Programming': return '💻';
      case 'Writing': return '✍️';
      case 'Marketing': return '📈';
      case 'Consulting': return '💼';
      default: return '📋';
    }
  };

  if (isLoading) return <SkeletonTable />;

  return (
    <div className="bg-white rounded-xl shadow-sm border">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="text-lg font-semibold text-gray-900">Gig Management</h3>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search gigs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent w-full sm:w-64 text-sm"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
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
                <span className="hidden sm:inline">Add Gig</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Card View */}
      <div className="block sm:hidden">
        {currentGigs.map((gig) => (
          <div key={gig.id} className="p-4 border-b border-gray-200 hover:bg-gray-50">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
                  <span className="text-lg">{getCategoryIcon(gig.category)}</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 mb-1">{gig.title}</div>
                  <div className="text-xs text-gray-500 mb-1">by {gig.seller}</div>
                  <div className="text-xs text-gray-500">{gig.category}</div>
                </div>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(gig.status)}`}>
                {gig.status}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex space-x-4 text-xs text-gray-600">
                <span className="flex items-center">
                  <DollarSign className="w-3 h-3 mr-1" />
                  ${gig.price}
                </span>
                <span className="flex items-center">
                  <User className="w-3 h-3 mr-1" />
                  {gig.orders} orders
                </span>
                <span>⭐ {gig.rating}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="text-blue-600 hover:text-blue-900 flex items-center text-xs">
                <Eye className="w-4 h-4 mr-1" />
                View
              </button>
              <button className="text-teal-600 hover:text-teal-900 flex items-center text-xs">
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </button>
              <button className="text-red-600 hover:text-red-900 flex items-center text-xs">
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gig</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentGigs.map((gig) => (
              <tr key={gig.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
                      <span className="text-lg">{getCategoryIcon(gig.category)}</span>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900 max-w-xs truncate">{gig.title}</div>
                      <div className="text-sm text-gray-500">ID: {gig.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{gig.seller}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                    {gig.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">${gig.price}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(gig.status)}`}>
                    {gig.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{gig.orders} orders</div>
                  <div className="text-sm text-gray-500">⭐ {gig.rating} rating</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="w-4 h-4" />
                    </button>
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
          Showing {startIndex + 1} to {Math.min(startIndex + gigsPerPage, filteredGigs.length)} of {filteredGigs.length} gigs
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




const PolicyUpdatePanel = ({ isLoading }) => {
  const [activeSection, setActiveSection] = useState('update');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [policyContent, setPolicyContent] = useState('');

  const policyCategories = [
    { value: 'privacy', label: 'Privacy Policy' },
    { value: 'terms', label: 'Terms of Service' },
    { value: 'usage', label: 'Usage Guidelines' },
    { value: 'data', label: 'Data Protection' },
    { value: 'content', label: 'Content Moderation' },
    { value: 'safety', label: 'Safety Guidelines' },
    { value: 'conduct', label: 'Code of Conduct' },
    { value: 'refund', label: 'Refund Policy' }
  ];

  const existingPolicies = [
    { id: 1, category: 'Privacy Policy', lastUpdated: '2024-01-15', status: 'Active' },
    { id: 2, category: 'Terms of Service', lastUpdated: '2024-01-10', status: 'Active' },
    { id: 3, category: 'Usage Guidelines', lastUpdated: '2024-01-05', status: 'Draft' },
    { id: 4, category: 'Data Protection', lastUpdated: '2024-01-03', status: 'Active' }
  ];

  const handleSubmit = () => {
    if (!selectedCategory || !policyContent.trim()) {
      alert('Please select a category and enter policy content');
      return;
    }
    // Handle form submission here
    console.log('Policy Update:', { category: selectedCategory, content: policyContent });
    alert('Policy updated successfully!');
    // Reset form
    setSelectedCategory('');
    setPolicyContent('');
  };

  if (isLoading) return <SkeletonTable />;

  return (
    <div className="space-y-6">
      {/* Policy Management Navigation */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Chatbot Policy Management</h3>
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveSection('update')}
            className={`flex-1 py-2 px-3 sm:px-4 rounded-md text-sm font-medium transition-colors ${
              activeSection === 'update'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Update Policy
          </button>
          <button
            onClick={() => setActiveSection('manage')}
            className={`flex-1 py-2 px-3 sm:px-4 rounded-md text-sm font-medium transition-colors ${
              activeSection === 'manage'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Manage Policies
          </button>
        </div>
      </div>

      {/* Update Policy Section */}
      {activeSection === 'update' && (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Update Chatbot Policy</h4>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Policy Category</label>
              <select
                value={selectedCategory}
                
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-jet-stream-50 text-slate-900"
                required
              >
                {/* <option value="">Select a policy category</option> */}
                {policyCategories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Policy Content</label>
              <textarea
                value={policyContent}
                onChange={(e) => setPolicyContent(e.target.value)}
                placeholder="Enter the policy content here..."
                rows={12}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-vertical text-slate-900"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Characters: {policyContent.length}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium"
              >
                Update Policy
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('');
                  setPolicyContent('');
                }}
                className="flex-1 bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Clear Form
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Policies Section */}
      {activeSection === 'manage' && (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
          <h4 className="text-md font-semibold text-gray-900 mb-4">Existing Policies</h4>
          <div className="space-y-3">
            {existingPolicies.map((policy) => (
              <div key={policy.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h5 className="text-sm font-semibold text-gray-900">{policy.category}</h5>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      policy.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {policy.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Last updated: {policy.lastUpdated}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-teal-600 hover:text-teal-700 text-sm font-medium px-3 py-1 rounded hover:bg-teal-50 transition-colors">
                    Edit
                  </button>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium px-3 py-1 rounded hover:bg-blue-50 transition-colors">
                    Preview
                  </button>
                  <button className="text-red-600 hover:text-red-700 text-sm font-medium px-3 py-1 rounded hover:bg-red-50 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            ))}
            
            {existingPolicies.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No policies found. Create your first policy using the Update Policy tab.</p>
              </div>
            )}
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
        return <GigTable isLoading={isLoading} />;
      case 'transactions':
        return <TransactionTable isLoading={isLoading} />;
      case 'analytics':
        return <AnalyticsCharts isLoading={isLoading} />;
      case 'settings':
        return <PolicyUpdatePanel isLoading={isLoading} />;
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