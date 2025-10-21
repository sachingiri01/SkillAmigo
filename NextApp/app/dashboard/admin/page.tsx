




'use client'
import React, { useState, useEffect } from 'react';
import { Clock,DollarSign,Menu, X, Bell, User, LogOut, Settings as SettingsIcon, BarChart3, Users, Briefcase, Coins, FileText, ChevronDown, Home, Eye, Check, XCircle, Filter, Calendar, Download, Edit, Trash2, Plus, Search,ArrowUp } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";



  

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
                <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 transition-colors"
                onClick={() => signOut({ callbackUrl: "/" })}>
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
    { id: 'analytics', label: 'Requests', icon: BarChart3 },
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
    { id: 'analytics', label: 'Coin Requests', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:top-20 lg:bottom-0">
      <div className="flex-1 flex flex-col bg-gradient-to-b from-teal-600 to-cyan-700  shadow-lg">
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
interface OverviewData {
  totalUsers: number;
  usersChange: number;
  totalGigs: number;
  gigsChange: number;
  coins: number;
  coinsChange: number;
  revenue: number;
  revenueChange: number;
  
}


interface OverData {

  topEarners: { username: string; coins: number }[];
  recentUsers: { username: string; created_at: string }[];
}


const OverviewCards = ({ isLoading }) => {
  
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(isLoading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/overview_das");
        const json = await res.json()
        setData(json);
      } catch (err) {
        console.error("Fetch overview error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  
  const cards = data
  ? [
      {
        title: "Total Users",
        value: data?.totalUsers?.toLocaleString(),
        change: `${data?.usersChange?.toFixed(1)}%`,
        icon: Users,
        color: "from-blue-500 to-blue-600",
      },
      {
        title: "Total Gigs Posted",
        value: data?.totalGigs?.toLocaleString(),
        change: `${data?.gigsChange?.toFixed(1)}%`,
        icon: Briefcase,
        color: "from-green-500 to-green-600",
      },
      {
        title: "Coins in Circulation",
        value: data?.coins?.toLocaleString(),
        change: `${data?.coinsChange?.toFixed(1)}%`,
        icon: Coins,
        color: "from-yellow-500 to-yellow-600",
      },
      {
        title: "Total Revenue",
        value: `$${data?.revenue?.toLocaleString()}`,
        change: `${data?.revenueChange?.toFixed(1)}%`,
        icon: BarChart3,
        color: "from-purple-500 to-purple-600",
      },
    ]
  : [];

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



interface UserData {
  user_id: string;
  username: string;
  email: string;
  coins: number;
  status: string;
  joinDate: string;
}
// User Table Component
const UserTable = ({ isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [users, setUsers] = useState<UserData[]>([]);
 const [loading, setLoading] = useState(isLoading);

const router = useRouter();

const handleDelete = async (userId: string) => {
  if (!confirm("Are you sure you want to delete this user?")) return;

  try {
    const res = await fetch(`/api/deleteuser?id=${userId}`, { method: "DELETE" });
    const json = await res.json();

    if (!res.ok) throw new Error(json.error || "Delete failed");

    // Update local state to remove the user
    setUsers((prev) => prev.filter((user) => user.user_id !== userId));
    alert("User deleted successfully");
  } catch (err) {
    console.error("Delete error:", err);
    alert("Failed to delete user");
  }
};

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/fetchuser");
        const data: UserData[] = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
if (loading) return <SkeletonTable />;
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  const handleExport = () => {
    const exportData = filteredUsers.map(user => ({
      ID: user.user_id,
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
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent w-full sm:w-64 text-sm text-slate-900"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleExport}
                className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                <Download className="w-4 h-4 text-slate-800" />
                <span className='text-slate-900'>Export</span>
              </button>
              
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Card View */}
      <div className="block sm:hidden">
        {currentUsers.map((user) => (
          <div key={user.user_id} className="p-4 border-b border-gray-200 hover:bg-gray-50">
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
                <button className="text-teal-600 hover:text-teal-900"
                onClick={() => router.push(`/profile/${user.user_id}`)}>
                    <span>View</span>
                </button>
                <button className="text-red-600 hover:text-red-900"
                onClick={() => handleDelete(user.user_id)}>
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
              <tr key={user.user_id} className="hover:bg-gray-50">
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
                    <button className="text-teal-600 hover:text-teal-900"
                    onClick={() => router.push(`/profile/${user.user_id}`)}>
                      <span>View</span>
                    </button>
                    <button className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(user.user_id)}>
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
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 text-slate-800"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 text-slate-800"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};




interface Gig {
  id: string;
  title: string;
  seller: string;
  category: string;
  price: number;
  status: string;
  rating: number;
  createdDate: string;
}
// gig management
const GigTable = ({ isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const gigsPerPage = 10;
const [gigs, setGigs] = useState<Gig[]>([]);
const [loading, setLoading] = useState(true);

const router = useRouter();

const handleDelete = async (gigId: string) => {
  if (!confirm("Are you sure you want to delete this gig?")) return;

  try {
    const res = await fetch(`/api/gigs?id=${gigId}`, { method: "DELETE" });
    const data = await res.json();

    if (res.ok) {
      alert(data.message);
      fetchGigs(); // refresh gigs list
    } else {
      alert(data.error);
    }
  } catch (err) {
    console.error(err);
    alert("Failed to delete gig");
  }
};


  const fetchGigs = async () => {
    try {
      const res = await fetch("/api/getgig"); // your API endpoint
      const data = await res.json();
      setGigs(data);
    } catch (err) {
      console.error("Failed to fetch gigs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGigs();
  }, []);

  if (loading) return <div>Loading...</div>;

  const filteredGigs = gigs.filter(gig => {
    const matchesSearch = gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gig.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gig.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
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
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent w-full sm:w-64 text-sm text-slate-900"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handleExport}
                className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm text-slate-900"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
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
               
                <span>⭐ {gig.rating}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="text-blue-600 hover:text-blue-900 flex items-center text-xs"
              onClick={() => router.push(`/gigs/${gig.id}`)}>
                <Eye className="w-4 h-4 mr-1" />
                View
              </button>
              
              <button className="text-red-600 hover:text-red-900 flex items-center text-xs"
              onClick={() => handleDelete(gig.id)}>
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

                  <div className="text-sm text-gray-500">⭐ {gig.rating} rating</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900"
                    onClick={() => router.push(`/gigs/${gig.id}`)}>
                      <Eye className="w-4 h-4" />
                    </button>
                    
                    <button className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(gig.id)}>
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
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 text-slate-800"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 text-slate-800"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};







interface Transaction {
  id: string;
  user: string;
  seller: string | null;   // seller may be null if not applicable
  amount: number;
  type: "purchase" | "refund" | "withdrawal" | "earning" | "commission";
  date: string; // ISO date string
}
interface TransactionOverview {
  total_transactions: number;
  coins_purchased: number;
  coins_withdrawn: number;
}

// Transaction Component
const TransactionTable = ({ isLoading }) => {
  // const transactions = [
  //   { id: 'TXN001', user: 'john_doe', amount: 500, type: 'Credit', date: '2025-08-22', seller: 'Gig completion bonus' },
  //   { id: 'TXN002', user: 'sarah_smith', amount: 250, type: 'Debit', date: '2025-08-21', seller: 'Service fee' },
  //   { id: 'TXN003', user: 'mike_jones', amount: 1000, type: 'Credit', date: '2025-08-20', seller: 'Coin purchase' },
  //   { id: 'TXN004', user: 'emily_davis', amount: 750, type: 'Debit', date: '2025-08-19', seller: 'Withdrawal' },
  //   { id: 'TXN005', user: 'alex_wilson', amount: 300, type: 'Credit', date: '2025-08-18', seller: 'Referral bonus' },
  // ];
    const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [overview, setOverview] = useState<TransactionOverview | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [txRes, overviewRes] = await Promise.all([
        fetch("/api/transactions").then(res => res.json()),
        fetch("/api/transactions/overview").then(res => res.json())
      ]);

      if (txRes.success) setTransactions(txRes.transactions);
      if (overviewRes.success) setOverview(overviewRes.overview);
    };

    fetchData();
  }, []);

  const handleExportTransactions = () => {
    const exportData = transactions.map(transaction => ({
      'Transaction ID': transaction.id,
      User: transaction.user,
      Amount: transaction.amount,
      Type: transaction.type,
      Date: transaction.date,
    }));
    downloadCSV(exportData, 'transactions_data');
  };

  const handleExportOverview = () => {
    if (!overview) return;

  const overviewData = [
    {
      "Total Transactions": overview.total_transactions,
      "Coins Purchased": overview.coins_purchased,
      "Coins Withdrawn": overview.coins_withdrawn,
    },
  ];
    downloadCSV(overviewData, 'transaction_overview');
  };
  const getBadgeClasses = (type: string) => {
  switch (type) {
    case "purchase":
    case "earning":
      return "bg-green-100 text-green-800"; // positive inflow
    case "refund":
      return "bg-yellow-100 text-yellow-800"; // neutral-ish
    case "withdrawal":
    case "commission":
      return "bg-red-100 text-red-800"; // money going out
    default:
      return "bg-gray-100 text-gray-800"; // fallback
  }
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
            <p className="text-2xl font-bold text-gray-900">{overview?.total_transactions}</p>
            {/* <p className="text-sm text-green-600 mt-1">+5.2% from last week</p> */}
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Coins Purchased</h3>
            <p className="text-2xl font-bold text-gray-900">{overview?.coins_purchased}</p>
            {/* <p className="text-sm text-green-600 mt-1">+12.8% from last week</p> */}
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Coins Withdrawn</h3>
            <p className="text-2xl font-bold text-gray-900">{overview?.coins_withdrawn}</p>
            {/* <p className="text-sm text-red-600 mt-1">+2.1% from last week</p> */}
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            <div className="flex flex-wrap gap-2">
              {/* <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button> */}
              {/* <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">Date Range</span>
                <span className="sm:hidden">Date</span>
              </button> */}
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
                  <div className="text-sm font-medium text-gray-900">{transaction.seller}</div>
                  <div className="text-sm text-gray-600">{transaction.user}</div>
                  
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <div className="text-sm font-medium text-gray-900">{transaction.amount} coins</div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getBadgeClasses(transaction.type)}`}>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seller</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.seller}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.amount} coins</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getBadgeClasses(transaction.type)}`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// const CoinRequestsManagement = ({ isLoading }) => {
//   const [requests, setRequests] = useState([
//     {
//       id: 1,
//       user: {
//         name: 'Alice Johnson',
//         email: 'alice@example.com',
//         avatar: 'AJ'
//       },
//       amount: 500,
//       reason: 'Completed website design project for local business',
//       requestDate: '2024-01-15',
//       status: 'pending'
//     },
//     {
//       id: 2,
//       user: {
//         name: 'Bob Smith',
//         email: 'bob@example.com',
//         avatar: 'BS'
//       },
//       amount: 250,
//       reason: 'Writing articles for company blog',
//       requestDate: '2024-01-14',
//       status: 'pending'
//     },
//     {
//       id: 3,
//       user: {
//         name: 'Carol Davis',
//         email: 'carol@example.com',
//         avatar: 'CD'
//       },
//       amount: 1000,
//       reason: 'Mobile app development - milestone completion',
//       requestDate: '2024-01-13',
//       status: 'approved'
//     },
//     {
//       id: 4,
//       user: {
//         name: 'David Wilson',
//         email: 'david@example.com',
//         avatar: 'DW'
//       },
//       amount: 150,
//       reason: 'Social media marketing campaign',
//       requestDate: '2024-01-12',
//       status: 'rejected'
//     },
//     {
//       id: 5,
//       user: {
//         name: 'Emma Brown',
//         email: 'emma@example.com',
//         avatar: 'EB'
//       },
//       amount: 750,
//       reason: 'Logo design and branding package',
//       requestDate: '2024-01-11',
//       status: 'pending'
//     }
//   ]);

//   const [filter, setFilter] = useState('all');

//   const handleApprove = (requestId) => {
//     setRequests(prevRequests =>
//       prevRequests.map(request =>
//         request.id === requestId
//           ? { ...request, status: 'approved' }
//           : request
//       )
//     );
//   };

//   const handleReject = (requestId) => {
//     setRequests(prevRequests =>
//       prevRequests.map(request =>
//         request.id === requestId
//           ? { ...request, status: 'rejected' }
//           : request
//       )
//     );
//   };

//   const filteredRequests = requests.filter(request => {
//     if (filter === 'all') return true;
//     return request.status === filter;
//   });

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
//       case 'approved': return 'bg-green-100 text-green-800 border-green-200';
//       case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
//       default: return 'bg-gray-100 text-gray-800 border-gray-200';
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'pending': return <Clock className="w-3 h-3 sm:w-4 sm:h-4" />;
//       case 'approved': return <Check className="w-3 h-3 sm:w-4 sm:h-4" />;
//       case 'rejected': return <X className="w-3 h-3 sm:w-4 sm:h-4" />;
//       default: return <Clock className="w-3 h-3 sm:w-4 sm:h-4" />;
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="space-y-4 p-4 sm:p-0">
//         {[...Array(3)].map((_, i) => (
//           <div key={i} className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border animate-pulse">
//             <div className="flex items-center space-x-3 sm:space-x-4 mb-4">
//               <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full"></div>
//               <div className="flex-1">
//                 <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
//                 <div className="h-2 sm:h-3 bg-gray-200 rounded w-1/3"></div>
//               </div>
//             </div>
//             <div className="h-3 sm:h-4 bg-gray-200 rounded w-full mb-2"></div>
//             <div className="h-3 sm:h-4 bg-gray-200 rounded w-2/3"></div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   const pendingCount = requests.filter(r => r.status === 'pending').length;
//   const totalCoins = filteredRequests.reduce((sum, request) => sum + request.amount, 0);

//   return (
//     <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
//       {/* Header */}
//       <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
//         <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Coin Requests</h2>
//             <p className="text-sm sm:text-base text-gray-600 mt-1">
//               {pendingCount} pending request{pendingCount !== 1 ? 's' : ''} awaiting review
//             </p>
//           </div>
//           <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
//             <Coins className="w-3 h-3 sm:w-4 sm:h-4" />
//             <span>Total: {totalCoins.toLocaleString()} coins</span>
//           </div>
//         </div>
//       </div>

//       {/* Filter Tabs */}
//       <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border">
//         <div className="grid grid-cols-2 sm:flex gap-2">
//           <button
//             onClick={() => setFilter('all')}
//             className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
//               filter === 'all'
//                 ? 'bg-teal-600 text-white'
//                 : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//             }`}
//           >
//             <span className="block sm:hidden">All</span>
//             <span className="hidden sm:block">All Requests</span>
//             <span className="ml-1">({requests.length})</span>
//           </button>
//           <button
//             onClick={() => setFilter('pending')}
//             className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
//               filter === 'pending'
//                 ? 'bg-teal-600 text-white'
//                 : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//             }`}
//           >
//             <span className="block sm:hidden">Pending</span>
//             <span className="hidden sm:block">Pending</span>
//             <span className="ml-1">({requests.filter(r => r.status === 'pending').length})</span>
//           </button>
//           <button
//             onClick={() => setFilter('approved')}
//             className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
//               filter === 'approved'
//                 ? 'bg-teal-600 text-white'
//                 : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//             }`}
//           >
//             <span className="block sm:hidden">Approved</span>
//             <span className="hidden sm:block">Approved</span>
//             <span className="ml-1">({requests.filter(r => r.status === 'approved').length})</span>
//           </button>
//           <button
//             onClick={() => setFilter('rejected')}
//             className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
//               filter === 'rejected'
//                 ? 'bg-teal-600 text-white'
//                 : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//             }`}
//           >
//             <span className="block sm:hidden">Rejected</span>
//             <span className="hidden sm:block">Rejected</span>
//             <span className="ml-1">({requests.filter(r => r.status === 'rejected').length})</span>
//           </button>
//         </div>
//       </div>

//       {/* Request Cards */}
//       <div className="space-y-3 sm:space-y-4">
//         {filteredRequests.length === 0 ? (
//           <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border text-center">
//             <Coins className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
//             <p className="text-sm sm:text-base text-gray-500">No requests found for the selected filter.</p>
//           </div>
//         ) : (
//           filteredRequests.map((request) => (
//             <div key={request.id} className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
//               <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-start sm:justify-between mb-4">
//                 <div className="flex items-center space-x-3 sm:space-x-4">
//                   <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base">
//                     {request.user.avatar}
//                   </div>
//                   <div className="min-w-0 flex-1">
//                     <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{request.user.name}</h3>
//                     <p className="text-xs sm:text-sm text-gray-600 truncate">{request.user.email}</p>
//                   </div>
//                 </div>
//                 <div className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border flex items-center space-x-1 self-start ${getStatusColor(request.status)}`}>
//                   {getStatusIcon(request.status)}
//                   <span className="capitalize">{request.status}</span>
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-4 text-xs sm:text-sm text-gray-600 mb-3">
//                   <div className="flex items-center space-x-1">
//                     <Coins className="w-3 h-3 sm:w-4 sm:h-4" />
//                     <span className="font-semibold text-gray-900 text-sm sm:text-base">{request.amount.toLocaleString()} coins</span>
//                   </div>
//                   <div className="flex items-center space-x-1">
//                     <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
//                     <span>{new Date(request.requestDate).toLocaleDateString()}</span>
//                   </div>
//                 </div>
//                 <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{request.reason}</p>
//               </div>

//               {request.status === 'pending' && (
//                 <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3">
//                   <button
//                     onClick={() => handleApprove(request.id)}
//                     className="flex items-center justify-center space-x-2 px-4 py-2.5 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
//                   >
//                     <Check className="w-4 h-4" />
//                     <span>Approve</span>
//                   </button>
//                   <button
//                     onClick={() => handleReject(request.id)}
//                     className="flex items-center justify-center space-x-2 px-4 py-2.5 sm:py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
//                   >
//                     <X className="w-4 h-4" />
//                     <span>Reject</span>
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };



const CoinRequestsManagement = ({ isLoading: initialLoading }) => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loadingRequests, setLoadingRequests] = useState(initialLoading);

  // Fetch requests
  const fetchRequests = async () => {
    try {
      setLoadingRequests(true);
      const res = await fetch("/api/get-coin-update-admin", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setRequests(data.requests || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingRequests(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Approve / Cancel
  const updateStatus = async (requestId, status) => {
    // Map "rejected" to "cancelled"
    const dbStatus = status === "rejected" ? "cancelled" : status;

    // Optimistic update
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: dbStatus } : r))
    );

    try {
      const res = await fetch("/api/update-coin-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ requestId, status }),
      });
      const result = await res.json();
      alert(result?.message);
    } catch (err) {
      console.error(err);
      fetchRequests(); // revert on failure
    }
  };

  const handleApprove = (id) => updateStatus(id, "approved");
  const handleCancel = (id) => updateStatus(id, "rejected"); // still send "rejected" to API, will be mapped in backend

  const filteredRequests = requests.filter((r) =>
    filter === "all" ? true : r.status === filter
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "approved": return "bg-green-100 text-green-800 border-green-200";
      case "cancelled": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending": return <Clock className="w-3 h-3 sm:w-4 sm:h-4" />;
      case "approved": return <Check className="w-3 h-3 sm:w-4 sm:h-4" />;
      case "cancelled": return <X className="w-3 h-3 sm:w-4 sm:h-4" />;
      default: return <Clock className="w-3 h-3 sm:w-4 sm:h-4" />;
    }
  };

  if (loadingRequests) return <p>Loading coin requests...</p>;

  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const totalCoins = filteredRequests.reduce((sum, r) => sum + Number(r.amount), 0);

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
      {/* Header */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Coin Requests</h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            {pendingCount} pending request{pendingCount !== 1 ? "s" : ""} awaiting review
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
          <Coins className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>Total: {totalCoins.toLocaleString()} coins</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border grid grid-cols-2 sm:flex gap-2">
        {["all", "pending", "approved", "cancelled"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
              filter === f ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <span className="capitalize">{f === "all" ? "All Requests" : f}</span>
            <span className="ml-1">({f === "all" ? requests.length : requests.filter((r) => r.status === f).length})</span>
          </button>
        ))}
      </div>

      {/* Request Cards */}
      <div className="space-y-3 sm:space-y-4">
        {filteredRequests.length === 0 ? (
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border text-center">
            <Coins className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
            <p className="text-sm sm:text-base text-gray-500">No requests found for the selected filter.</p>
          </div>
        ) : (
          filteredRequests.map((request) => (
            <div key={request.id} className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-start sm:justify-between mb-4">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base">
                    {request.user.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{request.user.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">{request.user.email}</p>
                  </div>
                </div>
                <div className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border flex items-center space-x-1 self-start ${getStatusColor(request.status)}`}>
                  {getStatusIcon(request.status)}
                  <span className="capitalize">{request.status}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-4 text-xs sm:text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <Coins className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">{Number(request.amount).toLocaleString()} coins</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{new Date(request.requestDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{request.reason}</p>
              </div>

              {request.status === "pending" && (
                <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3">
                  <button
                    onClick={() => handleApprove(request.id)}
                    className="flex items-center justify-center space-x-2 px-4 py-2.5 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    <Check className="w-4 h-4" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => handleCancel(request.id)}
                    className="flex items-center justify-center space-x-2 px-4 py-2.5 sm:py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};



const PolicyUpdatePanel = ({ isLoading }) => {
  const [activeSection, setActiveSection] = useState('update');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [policyContent, setPolicyContent] = useState('');

  const policyCategories = [
  { doc_id: "policy_1", source: "manual", doc_type: "user_policy", label: "User Policy" },
  { doc_id: "policy_2", source: "manual", doc_type: "content_policy", label: "Content Policy" },
  { doc_id: "policy_3", source: "manual", doc_type: "security_policy", label: "Security Policy" },
  { doc_id: "policy_4", source: "manual", doc_type: "ip_policy", label: "IP Policy" },
  { doc_id: "policy_5", source: "manual", doc_type: "privacy_policy", label: "Privacy Policy" },
  { doc_id: "policy_6", source: "manual", doc_type: "pricing_policy", label: "Pricing Policy" },
  { doc_id: "policy_7", source: "manual", doc_type: "payment_policy", label: "Payment Policy" },
  { doc_id: "policy_8", source: "manual", doc_type: "refund_policy", label: "Refund Policy" },
  { doc_id: "policy_9", source: "manual", doc_type: "verification_policy", label: "Verification Policy" },
  { doc_id: "policy_10", source: "manual", doc_type: "review_policy", label: "Review Policy" },
  { doc_id: "policy_11", source: "manual", doc_type: "promotion_policy", label: "Promotion Policy" },
  { doc_id: "policy_12", source: "manual", doc_type: "content_policy", label: "Content Policy" },
  { doc_id: "policy_13", source: "manual", doc_type: "dispute_policy", label: "Dispute Policy" },
  { doc_id: "policy_14", source: "manual", doc_type: "account_policy", label: "Account Policy" },
  { doc_id: "policy_15", source: "manual", doc_type: "security_policy", label: "Security Policy" }
];


  const existingPolicies = [
    { id: 1, category: 'Privacy Policy', lastUpdated: '2024-01-15', status: 'Active' },
    { id: 2, category: 'Terms of Service', lastUpdated: '2024-01-10', status: 'Active' },
    { id: 3, category: 'Usage Guidelines', lastUpdated: '2024-01-05', status: 'Draft' },
    { id: 4, category: 'Data Protection', lastUpdated: '2024-01-03', status: 'Active' }
  ];

  const handleSubmit = async () => {
  if (!selectedCategory || !policyContent.trim()) {
    alert('Please select a category and enter policy content');
    return;
  }

  // Find the selected category object
  const selectedPolicy = policyCategories.find(
    (p) => p.label === selectedCategory
  );

  if (!selectedPolicy) {
    alert('Invalid policy category selected');
    return;
  }

  const payload = {
    doc_id: selectedPolicy.doc_id,
    source: selectedPolicy.source,
    doc_type: selectedPolicy.doc_type,
    context: policyContent.trim()
  };

  try {
    const response = await fetch('http://127.0.0.1:8000/update-policy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    alert(data.message || 'Policy updated successfully!');

    // Reset form
    setSelectedCategory('');
    setPolicyContent('');
  } catch (error) {
    console.error('Error updating policy:', error);
    alert('Failed to update policy. Please try again.');
  }
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
                <option value="">Select a policy category</option>
                {policyCategories.map((category) => (
                  <option key={category.doc_id} value={category.label}>
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
const { data: session, status } = useSession();
  const router = useRouter();



  
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
      analytics: 'Coins Requests',
      settings: 'Settings',
    };
    return titles[page] || 'Dashboard';
  };

const [overviewData, setOverviewData] = useState<OverData | null>(null);

// ✅ Fetch overview when page loads
useEffect(() => {
  const getOverview = async () => {
    try {
      const res = await fetch("/api/overview_res");
      const json: OverData = await res.json();
      setOverviewData(json); // ✅ update the same state you render from
    } catch (error) {
      console.error("Error fetching overview:", error);
    } finally {
      setIsLoading(false);
    }
  };
  getOverview();
}, []);


if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-jet-stream-100">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 text-lg">Checking access...</p>
        </div>
      </div>
    );
  }
if (!session?.user || session.user.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-red-600 mb-4">❌ Access Denied</h1>
        <p className="text-gray-700 mb-6">
          Please sign in as <strong>Admin</strong> to view this page.
        </p>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go to Home
        </button>
      </div>
    );
  }

const renderPageContent = () => {
  switch (activePage) {
    case "overview":
      return (
        <div className="space-y-6">
          <OverviewCards isLoading={isLoading} />

          {!isLoading && overviewData && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Earners */}
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Top Earners
                </h3>
                <div className="space-y-3">
                  {overviewData?.topEarners?.map((user, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-bold text-teal-600">
                          #{index + 1}
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {user.username}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {user.coins} coins
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Registered Users
                </h3>
                <div className="space-y-3">
                  {overviewData?.recentUsers?.map((user, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-sm text-gray-900">{user.username}</span>
                      <span className="text-xs text-gray-500">
                        {user.created_at?new Date(user.created_at).toLocaleDateString():"N/A"}
                      </span>
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
        return <CoinRequestsManagement isLoading={isLoading} />;
      case 'settings':
        return <PolicyUpdatePanel isLoading={isLoading} />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Full Width Header */}
      <Header
        currentPage={getPageTitle(activePage)}
        userProfile={userProfile}
      />

      <div className="flex flex-1">
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