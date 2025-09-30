

'use client'
import React, { useState, useEffect, FormEvent } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import Link from "next/link";


import {
  Home,
  Plus,
  Calendar,
  Settings,
  Coins,
  HelpCircle,
  Menu,
  X,
  User,
  LogOut,
  TrendingUp,
  Trophy,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Upload,
  Gift,
  ClipboardCheck,
  Briefcase,
  BookOpen,
  Factory
} from 'lucide-react';
import { log } from 'console';
import { devNull } from 'os';



// Skeleton Loader Component
const SkeletonLoader = ({ className = "", type = "text" }) => {
  if (type === "card") {
    return (
      <div className={`bg-white rounded-2xl shadow-md p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-slate-200 rounded mb-3"></div>
          <div className="h-8 bg-slate-200 rounded mb-4"></div>
          <div className="h-3 bg-slate-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (type === "chart") {
    return (
      <div className={`bg-white rounded-2xl shadow-md p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-slate-200 rounded mb-4"></div>
          <div className="h-32 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`animate-pulse bg-slate-200 rounded ${className}`}></div>
  );
};

// Header Component with Home Button
const Header = ({ user, onLogout, onHome }) => {
  const { data: session } = useSession();
  return (
    <header className="bg-jet-stream-50 shadow-md border-b border-slate-200 w-full fixed top-0 left-0 right-0 z-30"
      style={{ borderBottomColor: '#e1ecea' }}>
      <div className="px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 ml-16 lg:ml-0">
            <a href="/">
              <button
                className="flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: '#f3f8f8', color: '#344545' }}
              >
                <Home className="w-5 h-5" />
                <span className="font-semibold hidden sm:block">Home</span>
              </button></a>
            <div className="flex items-center space-x-1">
              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #344545 0%, #558581 100%)' }}>
                <User className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xs sm:text-xl font-bold" style={{ color: '#344545' }}>
                  <span className='hidden sm:inline'>Welcome,</span> {session && session.user?.name}!
                </h1>
                <p className="text-xs sm:text-sm hidden sm:block" style={{ color: '#719f9a' }}>
                  Ready to manage your gigs?
                </p>
              </div>
            </div>
          </div>

          <div className='flex items-center gap-4'>

            <div className="hidden sm:flex items-center gap-0 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 64 64"
                className="animate-none"
              >
                {/* Outer bright coin ring */}
                <circle cx="32" cy="32" r="20" fill="#FFEB3B" />
                {/* Inner ring for depth */}
                <circle cx="32" cy="32" r="16" fill="#FBC02D" />
                {/* Even smaller inner circle for layering */}
                <circle cx="32" cy="32" r="16" fill="#FFF176" />

                {/* Rupee symbol */}
                <text
                  x="32"
                  y="42"
                  textAnchor="middle"
                  fontSize="26"
                  fontWeight="bold"
                  fill="#F57F17"
                  fontFamily="Arial, sans-serif"
                  stroke="#F57F17"
                  strokeWidth="0.5"
                  paintOrder="stroke"
                >
                  ₹
                </text>
              </svg>
              <span className="font-semibold text-yellow-700 text-lg">{session?.user?.balance ?? 0}</span>
            </div>

            <button
              onClick={() => signOut({ callbackUrl: "/" })}

              className="flex items-center space-x-2 px-3 py-2 rounded-xl transition-colors duration-200 hover:scale-105"
              style={{ backgroundColor: '#f3f8f8', color: '#405e5e' }}
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm hidden sm:block">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};



// Sidebar Component with new sections
const Sidebar = ({ activeSection, setActiveSection, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'overview', icon: Home, label: 'Overview' },
    { id: 'post-gig', icon: Plus, label: 'Post Gig' },
    { id: 'my-gigs', icon: Briefcase, label: 'My Gigs' },
    { id: 'my-bookings', icon: BookOpen, label: 'My Bookings' },
    { id: 'BookedGigs', icon: ClipboardCheck, label: 'BookedGigs' },
    { id: 'profile', icon: Settings, label: 'Profile Settings' },
    { id: 'add-coins', icon: Coins, label: 'Add Coins' },
    { id: 'redeem-coins', icon: Gift, label: 'Redeem Coins' },
    { id: 'help', icon: HelpCircle, label: 'Help / FAQs' },
  ];

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 text-white rounded-xl shadow-lg transition-all duration-200"
        style={{ backgroundColor: '#344545' }}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar with patterns */}
      <aside className={`
        fixed h-full text-white shadow-2xl z-40 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:w-64 w-64
        top-0 lg:top-20
      `} style={{ backgroundColor: '#141919' }}>
        <div className="relative overflow-hidden min-h-screen p-4 pt-20 lg:pt-6">
          {/* Background Pattern */}
          <div className="absolute inset-0  opacity-90">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                radial-gradient(circle at 20px 20px, rgba(159, 193, 189, 0.4) 2px, transparent 0),
                linear-gradient(45deg, transparent 25%, rgba(85, 133, 129, 0.1) 25%, rgba(85, 133, 129, 0.1) 50%, transparent 50%, transparent 75%, rgba(85, 133, 129, 0.1) 75%)
              `,
              backgroundSize: '40px 40px, 60px 60px'
            }} />
          </div>

          <div className="relative z-10">
            <div className="flex items-center space-x-1 mb-8">

              <Image
                src="/skill_logo.svg"
                alt="Logo"
                width={45}
                height={45}
                className="w-12 h-12"
              />
              <h2 className="text-xl font-bold text-jet-stream-100">SkillsAmigo</h2>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsOpen(false);
                    }}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-left
                      ${isActive
                        ? 'text-white shadow-lg'
                        : 'hover:text-white'
                      }
                    `}
                    style={{
                      backgroundColor: isActive ? '#ff6b35' : 'transparent',
                      color: isActive ? 'white' : '#bbd3d0'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.target.style.backgroundColor = '#405e5e';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.target.style.backgroundColor = 'transparent';
                      }
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

// Overview Component with jet-stream colors
const Overview = ({ loading }) => {
  const stats = [
    {
      title: 'Total Spent Coins',
      value: '1,250',
      icon: DollarSign,
      color: 'from-red-500 to-red-600',
      change: '-5.2%'
    },
    {
      title: 'Total Gained Coins',
      value: '2,840',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      change: '+12.3%'
    },
    {
      title: 'Leaderboard Rank',
      value: '#47',
      icon: Trophy,
      color: 'from-orange-500 to-orange-600',
      change: '↑3'
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <SkeletonLoader className="h-8 w-48" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[1, 2, 3].map((i) => (
            <SkeletonLoader key={i} type="card" />
          ))}
        </div>
        <SkeletonLoader type="chart" className="h-64" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#344545' }}>
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title}
              className="bg-white rounded-2xl shadow-md p-4 sm:p-6 hover:scale-105 transition-transform duration-200 relative overflow-hidden">
              {/* Card Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 15px 15px, rgba(85, 133, 129, 0.3) 1px, transparent 0)`,
                  backgroundSize: '30px 30px'
                }} />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <span className={`text-sm font-semibold ${stat.change.startsWith('+') || stat.change.startsWith('↑') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-sm font-medium mb-1" style={{ color: '#719f9a' }}>{stat.title}</h3>
                <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#344545' }}>{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 25%, rgba(85, 133, 129, 0.1) 25%, rgba(85, 133, 129, 0.1) 50%, transparent 50%, transparent 75%, rgba(85, 133, 129, 0.1) 75%),
              radial-gradient(circle at 25px 25px, rgba(159, 193, 189, 0.2) 2px, transparent 0)
            `,
            backgroundSize: '50px 50px, 50px 50px'
          }} />
        </div>

        <div className="relative z-10">
          <h3 className="text-lg sm:text-xl font-semibold mb-4" style={{ color: '#344545' }}>
            Activity Overview
          </h3>
          <div className="h-32 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #f3f8f8 0%, #e1ecea 100%)' }}>
            <p className="text-center text-sm sm:text-base" style={{ color: '#719f9a' }}>
              Chart placeholder - Activity trends would appear here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};



const PostGigForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    minPrice: string;
    maxPrice: string;
    category: string;
    location: string;
    thumbnailFile: File | null;
    thumbnailUrl: string;
  }>({
    title: '',
    description: '',
    minPrice: '',
    maxPrice: '',
    category: '',
    location: '',
    thumbnailFile: null,
    thumbnailUrl: '',
  });

  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append('title', formData.title);
    form.append('description', formData.description);
    form.append('minPrice', formData.minPrice);
    form.append('maxPrice', formData.maxPrice);
    form.append('category', formData.category);
    form.append('location', formData.location);

    // Append thumbnail file or URL
    if (formData.thumbnailFile) {
      form.append('thumbnail', formData.thumbnailFile);
    } else if (formData.thumbnailUrl) {
      form.append('thumbnailUrl', formData.thumbnailUrl);
    }
    console.log("data", formData);

    try {
      const res = await fetch('/api/gigs', {
        method: 'POST',

        body: form,


      });



      const data = await res.json();

      console.log("check data", data)
      if (res.ok) {
        onSubmit(data.gig);
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error('Error posting gig:', err);
    }

    setFormData({
      title: '',
      description: '',
      minPrice: '',
      maxPrice: '',
      category: '',
      location: '',
      thumbnailFile: null,
      thumbnailUrl: '',
    });
    setThumbnailPreview(null);
    setLoading(false);
  };

  return (
    <div className="space-y-6" style={{
      color: 'black'

    }}>
      <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#344545' }}>
        Post New Gig
      </h2>

      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 relative overflow-hidden">
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {/* Gig Title */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#405e5e' }}>
              Gig Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border rounded-xl"
              style={{ borderColor: '#bbd3d0', backgroundColor: '#f3f8f8' }}
              placeholder="Enter gig title..."
              required
            />
          </div>

          {/* Thumbnail Upload / URL */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#405e5e' }}>
              Thumbnail Image
            </label>

            <div className="flex flex-col space-y-4">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="thumbnail-upload"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setThumbnailPreview(reader.result as string);
                    };
                    reader.readAsDataURL(file);

                    setFormData((prev) => ({
                      ...prev,
                      thumbnailFile: file,
                      thumbnailUrl: '',
                    }));
                  }
                }}
              />

              <label
                htmlFor="thumbnail-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 hover:scale-105"
                style={{
                  borderColor: '#bbd3d0',
                  backgroundColor: '#f3f8f8',
                }}
              >
                {thumbnailPreview ? (
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    className="h-full w-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="w-8 h-8 mb-2" style={{ color: '#719f9a' }} />
                    <p className="text-sm" style={{ color: '#719f9a' }}>Click to upload thumbnail</p>
                  </div>
                )}
              </label>

              {/* Image URL Input */}
              <input
                type="text"
                placeholder="Or enter image URL"
                className="border p-2 rounded-md text-sm"
                style={{ borderColor: '#bbd3d0', color: '#405e5e' }}
                value={formData.thumbnailUrl}
                onChange={(e) => {
                  const url = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    thumbnailUrl: url,
                    thumbnailFile: null,
                  }));
                  setThumbnailPreview(url);
                }}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#405e5e' }}>
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border rounded-xl"
              style={{ borderColor: '#bbd3d0', backgroundColor: '#f3f8f8' }}
              placeholder="Describe your gig requirements..."
              required
            />
          </div>

          {/* Min / Max Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#405e5e' }}>
                Minimum Price (Coins)
              </label>
              <input
                type="number"
                value={formData.minPrice}
                onChange={(e) => setFormData({ ...formData, minPrice: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl"
                style={{ borderColor: '#bbd3d0', backgroundColor: '#f3f8f8' }}
                placeholder="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#405e5e' }}>
                Maximum Price (Coins)
              </label>
              <input
                type="number"
                value={formData.maxPrice}
                onChange={(e) => setFormData({ ...formData, maxPrice: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl"
                style={{ borderColor: '#bbd3d0', backgroundColor: '#f3f8f8' }}
                placeholder="0"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#405e5e' }}>
              Category
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="Enter the category"
              className="w-full px-4 py-3 border rounded-xl"
              style={{ borderColor: '#bbd3d0', backgroundColor: '#f3f8f8' }}
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#405e5e' }}>
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Enter the location"
              className="w-full px-4 py-3 border rounded-xl"
              style={{ borderColor: '#bbd3d0', backgroundColor: '#f3f8f8' }}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full text-white py-3 px-6 rounded-xl font-semibold hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg, #344545 0%, #558581 100%)' }}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Posting Gig...</span>
              </div>
            ) : (
              'Post Gig'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
interface Gig {
  gig_id: string; // UUID from DB
  title: string;
  description: string;
  category: string;
  min_price: string;  // DB returns as string (DECIMAL/NUMERIC)
  avg_price: string;
  location: string;
  picture: string | null;
  rating: number | null;
  created_at: string;   // DB field (renamed from gig_created_at)
  updated_at?: string;

  // Seller info
  seller_id: string;
  seller_name: string;
  seller_email: string;
  seller_picture: string | null;

  // Booking info (optional, if joined in query)
  booking_id?: string;
  booking_status?: string | null;
  booking_date?: string | null;
  scheduled_date?: string | null;
  coins_paid?: number | null;

  // Buyer info (optional, if joined)
  buyer_id?: string | null;
  buyer_name?: string | null;
  buyer_email?: string | null;
  buyer_picture?: string | null;

  // Aggregates
  buyer_count?: number; // from COUNT(DISTINCT buyer_id)

  // Optional frontend-only fields (aliases)
  status?: string;     // e.g. availability || "posted"
  minPrice?: number;   // parseFloat(min_price)
  maxPrice?: number;   // parseFloat(avg_price)
  applicants?: number; // alias for buyer_count
  posted?: string;     // formatted created_at
}


// My Gigs Component - Gigs posted by user
// const MyGigs = () => {
//   const [loading, setLoading] = useState(true);
//   const [myGigs, setMyGigs] = useState<Gig[]>([]);
//   const [applicants, setApplicants] = useState({});
//   const { data: session } = useSession();
//    const router =  useRouter();

//   const hanldegigr=(id)=>{
//     if(!id) return
//     router.push(`/gigs/${id}`);}

//   const handleDelete = async (gigId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this gig?");
//     if (!confirmDelete) return;

//     try {
//       const res = await fetch(`/api/gigs/${gigId}`, { method: 'DELETE' });


//       if (!res.ok) {
//         let errorData;
//         try {
//           errorData = await res.json();
//         } catch {
//           errorData = { error: "Failed to delete gig" };
//         }
//         alert(errorData.error || 'Could not delete gig');
//         return;

//       }
//       const data = await res.json();

//       alert('Gig deleted successfully');
//       setMyGigs((prev) => prev.filter((gig) => gig.gig_id !== gigId)); // Remove from list
//     } catch (error) {
//       console.error('Error deleting gig:', error);
//       alert('Something went wrong');
//     }
//   };


//   useEffect(() => {
//     if (!session) return;

//     const fetchGigs = async () => {
//       try {
//         const res = await fetch(`/api/users/gigs`);
//         if (!res.ok) throw new Error("Failed to fetch gigs");
//         const data = await res.json();
//         console.log("what is my gig info", data);

//         setMyGigs(data);
//       } catch (error) {
//         console.error("Error fetching gigs:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchGigs();
//   }, [session]); // run when session becomes available


//   const handleViewApplicants = async (gigId) => {
//     try {
//       const res = await fetch(`/api/gigs/${gigId}/applicants`);
//       if (!res.ok) throw new Error('Failed to fetch applicants');
//       const data = await res.json();
//       setApplicants((prev) => ({ ...prev, [gigId]: data }));
//     } catch (error) {
//       console.error('Error fetching applicants:', error);
//       alert('Failed to load applicants');
//     }
//   };


//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'active':
//         return { bg: '#e1ecea', text: '#344545' };
//       case 'completed':
//         return { bg: '#dcfce7', text: '#166534' };
//       case 'draft':
//         return { bg: '#fef3c7', text: '#92400e' };
//       default:
//         return { bg: '#f1f5f9', text: '#475569' };
//     }
//   };

//   if (loading) {
//     return (
//       <div className="space-y-6">
//         <SkeletonLoader className="h-8 w-48" />
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
//           {[1, 2, 3].map((i) => (
//             <SkeletonLoader key={i} type="card" />
//           ))}
//         </div>
//       </div>
//     );
//   }
 
  

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#344545' }}>
//           My Gigs
//         </h2>
//         <span className="text-sm px-3 py-1 rounded-full" style={{ backgroundColor: '#e1ecea', color: '#344545' }}>
//           {myGigs.length} Gigs Posted
//         </span>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
//         {myGigs.map((gig) => {
//           const statusColors = getStatusColor(gig.status);
//           return (
//             <div key={gig.gig_id}
//               className="bg-white rounded-2xl shadow-md p-4 sm:p-6 hover:scale-105 transition-transform duration-200 relative overflow-hidden">
//               {/* Background Pattern */}
//               <div className="absolute inset-0 opacity-5">
//                 <div className="absolute inset-0" style={{
//                   backgroundImage: `radial-gradient(circle at 15px 15px, rgba(85, 133, 129, 0.3) 1px, transparent 0)`,
//                   backgroundSize: '30px 30px'
//                 }} />
//               </div>

//               <div className="relative z-10">
//                 <div className="flex items-start justify-between mb-4">
//                   <h3 className="text-lg font-semibold flex-1 mr-2" style={{ color: '#344545' }}>
//                     {gig.title}
//                   </h3>
//                   <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 capitalize"
//                     style={{ backgroundColor: statusColors.bg, color: statusColors.text }}>
//                     {gig.status}
//                   </span>
//                 </div>

//                 <p className="text-sm mb-4" style={{ color: '#719f9a' }}>
//                   {gig.description}
//                 </p>

//                 <div className="space-y-2 mb-4">
//                   <p className="text-sm" style={{ color: '#405e5e' }}>
//                     <span className="font-medium">Price:</span> {gig.min_price} - {gig.maxPrice} coins
//                   </p>
//                   <p className="text-sm" style={{ color: '#405e5e' }}>
//                     <span className="font-medium">Applicants:</span> {gig.buyer_count || 0}
//                   </p>
//                   <p className="text-sm" style={{ color: '#405e5e' }}>
//                     <span className="font-medium">Posted:</span> {gig.created_at ? new Date(gig.created_at).toLocaleDateString() : 'N/A'}

//                   </p>
//                 </div>

//                 <div className="flex space-x-3 pt-4 border-t" style={{ borderColor: '#e1ecea' }}>
//                   <button className="text-sm font-medium hover:underline" style={{ color: '#558581' }}
//                   onClick={()=>hanldegigr(gig.gig_id)}
//                   >
                    
//                       View Details
                    
//                   </button>
//                   <button
//                     className="text-sm font-medium hover:underline"
//                     style={{ color: '#db1738ff' }}
//                     onClick={() => handleDelete(gig.gig_id)}

//                   >
//                     Delete
//                   </button>
//                   {(gig.buyer_count ?? 0) > 0 && (
//                     <button
//                       className="text-sm font-medium hover:underline"
//                       style={{ color: '#53e656ff' }}
//                       onClick={() => handleViewApplicants(gig.gig_id)}
//                     >
//                       View Applicants
//                     </button>
//                   )}
//                 </div>
//                 {applicants[gig.gig_id]?.length > 0 && (
//                   <div className="flex overflow-x-auto space-x-4 py-3">
//                     {applicants[gig.gig_id].map((user) => (
//                       <div key={user.user_id} className="flex flex-col items-center min-w-[60px]">
//                         <img
//                           src={user.profile_picture || '/default-profile.png'}
//                           alt={user.name}
//                           className="w-10 h-10 rounded-full object-cover"
//                         />
//                         <span className="text-xs text-center mt-1">{user.name}</span>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };
const MyGigs = () => {
  const [loading, setLoading] = useState(true);
  const [myGigs, setMyGigs] = useState<Gig[]>([]);
  const [applicants, setApplicants] = useState({});
  const [showApplicants, setShowApplicants] = useState({});
  const { data: session } = useSession();
  const router = useRouter();

  const hanldegigr = (id) => {
    if (!id) return;
    router.push(`/gigs/${id}`);
  };

  const handleDelete = async (gigId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this gig?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/gigs/${gigId}`, { method: 'DELETE' });

      if (!res.ok) {
        let errorData;
        try {
          errorData = await res.json();
        } catch {
          errorData = { error: "Failed to delete gig" };
        }
        alert(errorData.error || 'Could not delete gig');
        return;
      }
      
      const data = await res.json();
      alert('Gig deleted successfully');
      setMyGigs((prev) => prev.filter((gig) => gig.gig_id !== gigId));
    } catch (error) {
      console.error('Error deleting gig:', error);
      alert('Something went wrong');
    }
  };

  useEffect(() => {
    if (!session) return;

    const fetchGigs = async () => {
      try {
        const res = await fetch(`/api/users/gigs`);
        if (!res.ok) throw new Error("Failed to fetch gigs");
        const data = await res.json();
        console.log("what is my gig info", data);
        setMyGigs(data);
      } catch (error) {
        console.error("Error fetching gigs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, [session]);

  const handleViewApplicants = async (gigId) => {
    // Toggle visibility
    if (showApplicants[gigId]) {
      setShowApplicants((prev) => ({ ...prev, [gigId]: false }));
      return;
    }

    // If not already loaded, fetch applicants
    if (!applicants[gigId]) {
      try {
        const res = await fetch(`/api/gigs/${gigId}/applicants`);
        if (!res.ok) throw new Error('Failed to fetch applicants');
        const data = await res.json();
        setApplicants((prev) => ({ ...prev, [gigId]: data }));
        setShowApplicants((prev) => ({ ...prev, [gigId]: true }));
      } catch (error) {
        console.error('Error fetching applicants:', error);
        alert('Failed to load applicants');
      }
    } else {
      // Already loaded, just show
      setShowApplicants((prev) => ({ ...prev, [gigId]: true }));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return { bg: '#e1ecea', text: '#344545' };
      case 'completed':
        return { bg: '#dcfce7', text: '#166534' };
      case 'draft':
        return { bg: '#fef3c7', text: '#92400e' };
      default:
        return { bg: '#f1f5f9', text: '#475569' };
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <SkeletonLoader className="h-8 w-48" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {[1, 2, 3].map((i) => (
            <SkeletonLoader key={i} type="card" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#344545' }}>
          My Gigs
        </h2>
        <span className="text-sm px-3 py-1 rounded-full" style={{ backgroundColor: '#e1ecea', color: '#344545' }}>
          {myGigs.length} Gigs Posted
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {myGigs.map((gig) => {
          const statusColors = getStatusColor(gig.status);
          const hasApplicants = (gig.buyer_count ?? 0) > 0;
          const isShowingApplicants = showApplicants[gig.gig_id];
          
          return (
            <div key={gig.gig_id}
              className="bg-white rounded-2xl shadow-md p-4 sm:p-6 hover:scale-105 transition-transform duration-200 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 15px 15px, rgba(85, 133, 129, 0.3) 1px, transparent 0)`,
                  backgroundSize: '30px 30px'
                }} />
              </div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold flex-1 mr-2" style={{ color: '#344545' }}>
                    {gig.title}
                  </h3>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 capitalize"
                    style={{ backgroundColor: statusColors.bg, color: statusColors.text }}>
                    {gig.status}
                  </span>
                </div>

                <p className="text-sm mb-4" style={{ color: '#719f9a' }}>
                  {gig.description}
                </p>

                <div className="space-y-2 mb-4">
                  <p className="text-sm" style={{ color: '#405e5e' }}>
                    <span className="font-medium">Price:</span> {gig.min_price} - {gig.maxPrice} coins
                  </p>
                  <p className="text-sm" style={{ color: '#405e5e' }}>
                    <span className="font-medium">Applicants:</span> {gig.buyer_count || 0}
                  </p>
                  <p className="text-sm" style={{ color: '#405e5e' }}>
                    <span className="font-medium">Posted:</span> {gig.created_at ? new Date(gig.created_at).toLocaleDateString() : 'N/A'}
                  </p>
                </div>

                <div className="flex space-x-3 pt-4 border-t" style={{ borderColor: '#e1ecea' }}>
                  <button className="text-sm font-medium hover:underline" style={{ color: '#558581' }}
                    onClick={() => hanldegigr(gig.gig_id)}>
                    View Details
                  </button>
                  <button
                    className="text-sm font-medium hover:underline"
                    style={{ color: '#db1738ff' }}
                    onClick={() => handleDelete(gig.gig_id)}>
                    Delete
                  </button>
                  {hasApplicants && (
                    <button
                      className="text-sm font-medium hover:underline"
                      style={{ color: '#558581' }}
                      onClick={() => handleViewApplicants(gig.gig_id)}>
                      {isShowingApplicants ? 'Hide Applicants' : 'View Applicants'}
                    </button>
                  )}
                </div>

                {/* Applicants Section */}
                {isShowingApplicants && applicants[gig.gig_id]?.length > 0 && (
                  <div className="mt-4 pt-4 border-t" style={{ borderColor: '#e1ecea' }}>
                    <h4 className="text-sm font-semibold mb-3" style={{ color: '#344545' }}>
                      Applicants ({applicants[gig.gig_id].length})
                    </h4>
                    <div className="flex flex-wrap gap-4">
                      {applicants[gig.gig_id].map((user) => (
                        <div 
                          key={user.user_id} 
                          className="flex flex-col items-center min-w-[70px] p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => router.push(`/profile/${user.user_id}`)}>
                          <img
                            src={user.profile_picture || '/default-profile.png'}
                            alt={user.name}
                            className="w-12 h-12 rounded-full object-cover border-2"
                            style={{ borderColor: '#558581' }}
                          />
                          <span className="text-xs text-center mt-2 font-medium" style={{ color: '#344545' }}>
                            {user.name}
                          </span>
                          {user.booking_status && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full mt-1 capitalize"
                              style={{ 
                                backgroundColor: user.booking_status === 'confirmed' ? '#dcfce7' : '#fef3c7',
                                color: user.booking_status === 'confirmed' ? '#166534' : '#92400e'
                              }}>
                              {user.booking_status}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {isShowingApplicants && applicants[gig.gig_id]?.length === 0 && (
                  <div className="mt-4 pt-4 border-t text-center" style={{ borderColor: '#e1ecea' }}>
                    <p className="text-sm" style={{ color: '#719f9a' }}>No applicants yet</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};





interface Booking {
  booking_id: string;
  title: string;
  client?: string;
  buyer_id?: string;
  coins_paid: number;
  category?: string;
  startDate?: string;
  booking_date?: string;
  status: string;

}



const MyBookings = ({ loading }: { loading: boolean }) => {
  const [myBookings, setMyBookings] = useState<Booking[]>([]);
   

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return { bg: "#fef3c7", text: "#92400e" };
      case "confirmed":
        return { bg: "#dbeafe", text: "#1d4ed8" };
      case "completed":
        return { bg: "#dcfce7", text: "#166534" };
      case "cancelled":
        return { bg: "#fee2e2", text: "#991b1b" };
      default:
        return { bg: "#f1f5f9", text: "#475569" };
    }
  };
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/my-gig-bookings");
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        setMyBookings(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBookings();
  }, []);
  
  const handleUpdateStatus = async (bookingId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/booking/${bookingId}/${newStatus}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to update status");
      const updated = await res.json();

      setMyBookings((prev) =>
        prev.map((b) =>
          b.booking_id === bookingId ? { ...b, status: updated.status } : b
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewReview = (bookingId: string) => {
    alert(`Viewing review for booking ${bookingId}`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold" style={{ color: "#344545" }}>
          My Bookings
        </h2>
        <span
          className="text-sm px-3 py-1 rounded-full"
          style={{ backgroundColor: "#e1ecea", color: "#344545" }}
        >
          {myBookings.length} Active Projects
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {myBookings.map((booking) => {
          const statusColors = getStatusColor(booking.status);

          return (
            <div
              key={booking.booking_id}
              className="bg-white rounded-2xl shadow-md p-4 sm:p-6"
            >
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <h3
                    className="text-lg font-semibold flex-1 mr-2"
                    style={{ color: "#344545" }}
                  >
                    {booking.title ?? "No Title"}
                  </h3>
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium flex-shrink-0"
                    style={{
                      backgroundColor: statusColors.bg,
                      color: statusColors.text,
                    }}
                  >
                    {(booking.status?.replace("-", " ") ?? "")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}

                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-sm" style={{ color: "#405e5e" }}>
                    <span className="font-medium">Client:</span>{" "}
                    {booking.client ?? booking.buyer_id}
                  </p>
                  <p className="text-sm" style={{ color: "#405e5e" }}>
                    <span className="font-medium">Payment:</span>{" "}
                    {booking.coins_paid} coins
                  </p>
                  <p className="text-sm" style={{ color: "#405e5e" }}>
                    <span className="font-medium">Category:</span>{" "}
                    {booking.category ?? "N/A"}
                  </p>
                  <p className="text-sm" style={{ color: "#405e5e" }}>
                    <span className="font-medium">Posted:</span> {booking.booking_date ? new Date(booking.booking_date).toLocaleDateString() : 'N/A'}
                  </p>
                </div>

                <div
                  className="flex space-x-3 pt-4 border-t"
                  style={{ borderColor: "#e1ecea" }}
                >
                  {/* <button
                    className="text-sm font-medium hover:underline"
                    style={{ color: "#558581" }}
                    onClick={()=>hanldegigr(gig.gig_id)}
                    // onClick={() => router.push(`/gig/${gig.gig_id}`)}
                  >
                    View Details
                  </button> */}

                  {/* Pending: Confirm & Cancel */}
                  {booking.status === "pending" && (
                    <>
                      <button
                        className="text-sm font-medium hover:underline"
                        style={{ color: "#16a34a" }}
                        onClick={() =>
                          handleUpdateStatus(booking.booking_id, "confirm")
                        }
                      >
                        Confirm
                      </button>
                      <button
                        className="text-sm font-medium hover:underline"
                        style={{ color: "#dc2626" }}
                        onClick={() =>
                          handleUpdateStatus(booking.booking_id, "cancel")
                        }
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {/* Confirmed: Only Cancel */}
                  {booking.status === "confirmed" && (
                    <button
                      className="text-sm font-medium hover:underline"
                      style={{ color: "#dc2626" }}
                      onClick={() =>
                        handleUpdateStatus(booking.booking_id, "cancel")
                      }
                    >
                      Cancel
                    </button>
                  )}

                  {/* Completed: View Review */}
                  {booking.status === "completed" && (
                    <button
                      className="text-sm font-medium hover:underline"
                      style={{ color: "#16a34a" }}
                      onClick={() => handleViewReview(booking.booking_id)}
                    >
                      View Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};







interface BookedGig {
  booking_id: string;
  gig_id: string;
  seller_id: string;
  seller_name?: string; // Seller's name
  seller_location?: string; // Seller's location
  title: string;
  scheduled_date: string;
  booking_date?: string; // Date when booked
  status: "pending" | "confirmed" | "completed" | "cancelled" | "disputed";
  rating?: number;
  picture?: string;
  category?: string;
  min_price?: number;
  avg_price?: number;
  coins_paid?: number;
  cost?: number;  // Use this for cost if your backend returns it
}
interface ReviewData {
  rating: number;
  review_text: string;
  image?: string;
}


const BookedGigs = () => {
  const [bookedGigs, setBookedGigs] = useState<BookedGig[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [reviewData, setReviewData] = useState<Record<string, any>>({});
  const [submittingReview, setSubmittingReview] = useState(false);
   const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedGig, setSelectedGig] = useState<BookedGig | null>(null);
  const [currentReview, setCurrentReview] = useState<ReviewData>({
    rating: 5,
    review_text: '',
    image: ''
  });

  const getStatusColor = (status: BookedGig["status"]) => {
    switch (status) {
      case "confirmed":
        return { bg: "#dbeafe", text: "#1d4ed8" };
      case "completed":
        return { bg: "#dcfce7", text: "#166534" };
      case "cancelled":
        return { bg: "#fef2f2", text: "#dc2626" };
      default:
        return { bg: "#f1f5f9", text: "#475569" };
    }
  };



  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/user-booked-gigs");
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        setBookedGigs(data);
      } catch (error) {
        console.error("Failed to fetch booked gigs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);



  const handleUpdateStatus = async (bookingId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/booking/${bookingId}/${newStatus}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      console.log("res", res)
      if (!res.ok) throw new Error("Failed to update status");
      const updated = await res.json();

      setBookedGigs((prev) =>
        prev.map((b) =>
          b.booking_id === bookingId ? { ...b, status: updated.status } : b
        )
      );
    } catch (err) {
      console.error(err);
    }
  };
  const handleMarkComplete = (gig: BookedGig) => {
    setSelectedGig(gig);
    setShowReviewModal(true);
    setCurrentReview({
      rating: 5,
      review_text: '',
      image: ''
    });
  };
  const handleSubmitReview = async () => {
    if (!selectedGig) return;
    
    setSubmittingReview(true);
    try {
      // Submit review first
      const reviewRes = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gig_id: selectedGig.gig_id,
          rating: currentReview.rating,
          review_text: currentReview.review_text,
          image: currentReview.image
        })
      });

      if (!reviewRes.ok) throw new Error('Failed to submit review');

      // Then mark as complete
      await handleUpdateStatus(selectedGig.booking_id, 'complete');
      
      // Close modal
      setShowReviewModal(false);
      setSelectedGig(null);
    } catch (error) {
      console.error('Failed to submit review:', error);
    } finally {
      setSubmittingReview(false);
    }
  };

  const closeReviewModal = () => {
    setShowReviewModal(false);
    setSelectedGig(null);
    setCurrentReview({
      rating: 5,
      review_text: '',
      image: ''
    });
  };



  // 🌀 Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-gray-200 rounded"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-40 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }



  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800">Your Booked Gigs</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {bookedGigs.map((gig) => {
          const { bg, text } = getStatusColor(gig.status);

          return (
            <article
              key={gig.booking_id}
              className="border rounded-lg p-5 shadow-sm bg-white space-y-4"
            >
              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900">{gig.title}</h3>

              {/* Image */}
              {/* {gig.picture && (
              <img
                src={gig.picture}
                alt={`${gig.title} image`}
                className="w-full h-44 object-cover rounded"
                loading="lazy"
              />
            )} */}

              {/* Seller Info */}
              <div className="text-gray-700 text-sm space-y-0.5">
                <p>
                  <strong>Seller:</strong> {gig.seller_name}
                </p>
                <p>
                  <strong>Location:</strong> {gig.seller_location}
                </p>
                <p>
                  <strong>Scheduled For:</strong>{" "}
                  {gig.scheduled_date ? new Date(gig.scheduled_date).toLocaleDateString() : "N/A"}
                </p>

                <p>
                  <strong>Booking Date:</strong>{" "}
                  {gig.booking_date ? new Date(gig.booking_date).toLocaleDateString() : "N/A"}
                </p>
                <p>
                  <strong>Category:</strong> {gig.category}
                </p>
              </div>

              {/* Pricing Info */}
              <div className="text-gray-700 text-sm space-y-0.5">
                <p>
                  <strong>Price Range:</strong> {gig.min_price} – {gig.avg_price} coins
                </p>
                <p>
                  <strong>Coins Paid:</strong> {gig.coins_paid}
                </p>
              </div>

              {/* Status & Actions */}
              <div className="flex items-center justify-between">
                <span
                  className="px-3 py-1 text-xs font-semibold rounded-full"
                  style={{ backgroundColor: bg, color: text }}
                >
                  {gig.status ? gig.status.toUpperCase() : "UNKNOWN"}
                </span>

                {gig.status === "confirmed" && (
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleMarkComplete(gig)}
                      className="text-green-600 text-sm hover:underline"
                    >
                      Mark Complete
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(gig.booking_id, 'cancel')}
                      className="text-red-600 text-sm hover:underline"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>


            </article>
          );
        })}
      </div>
      {/* Review Modal */}
      {showReviewModal && selectedGig && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Review: {selectedGig.title}
            </h3>
            
            {/* Rating */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setCurrentReview(prev => ({ ...prev, rating: star }))}
                    className={`text-2xl ${
                      star <= currentReview.rating 
                        ? 'text-yellow-400' 
                        : 'text-gray-300'
                    } hover:text-yellow-400 transition-colors`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* Review Text */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review
              </label>
              <textarea
                value={currentReview.review_text}
                onChange={(e) => setCurrentReview(prev => ({ ...prev, review_text: e.target.value }))}
                placeholder="Share your experience..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white"

              />
            </div>

            {/* Image URL (Optional) */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL (Optional)
              </label>
              <input
                type="url"
                value={currentReview.image}
                onChange={(e) => setCurrentReview(prev => ({ ...prev, image: e.target.value }))}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparenttext-black"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={closeReviewModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                disabled={submittingReview}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmitReview}
                disabled={submittingReview || !currentReview.review_text.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submittingReview ? 'Submitting...' : 'Submit Review & Complete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

};







const roles = ['user', 'seller']; // example roles

interface User {
  name: string;
  phone?: string;
  profile_picture?: string; // URL string
  bio?: string;
  role?: string;
  profile_picture_file?: File | null; // for upload
}

interface ProfileSettingsProps {
  user: User;
  onSave: (user: User) => void;
}


const ProfileSettings: React.FC<ProfileSettingsProps> = ({ user, onSave }) => {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState<User>({
    name: '',
    phone: '',
    profile_picture: '',
    bio: '',
    role: roles[0],
    profile_picture_file: null,
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (session?.user) {
      console.log("Session loaded:", session);
      setFormData({
        name: session.user.name || '',
        phone: (session.user as any)?.phone || '',
        profile_picture: (session.user as any)?.profile_picture || '',
        bio: (session.user as any)?.bio || '',
        role: (session.user as any)?.role || roles[0],
        profile_picture_file: null,
      });
    }
  }, [session]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(`Changed field: ${name}, New value: ${value}`);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("phone", formData.phone || '');
      form.append("bio", formData.bio || '');
      form.append("role", formData.role || '');

      if (formData.profile_picture_file) {
        form.append("profile_picture_file", formData.profile_picture_file);
      }

      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        body: form,
      });

      console.log("check respose", response);

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const result = await response.json();
      console.log("what stor in result", result)
      onSave(result.user);

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profile_picture: reader.result as string,
          profile_picture_file: file,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 text-gray-400">
      <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#344545' }}>
        Profile Settings
      </h2>

      {showSuccess && (
        <div
          className="border px-4 py-3 rounded-xl"
          style={{ backgroundColor: '#dcfce7', borderColor: '#22c55e', color: '#166534' }}
        >
          Profile updated successfully!
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 relative overflow-hidden">
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#405e5e' }}>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl transition-all duration-200"
                style={{ borderColor: '#bbd3d0', backgroundColor: '#f3f8f8' }}
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#405e5e' }}>
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl transition-all duration-200"
                style={{ borderColor: '#bbd3d0', backgroundColor: '#f3f8f8' }}
                placeholder="+1 234 567 8900"
                required
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#405e5e' }}>
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl transition-all duration-200"
                style={{ borderColor: '#bbd3d0', backgroundColor: '#f3f8f8' }}
                required
              >
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Profile Picture Upload */}
            <div >
              <label className="block text-sm font-medium mb-2" style={{ color: '#405e5e' }}>
                Profile Picture
              </label>
              <input
                type="file"
                name="profile_picture"
                accept="image/*"
                id="profile-picture-upload"
                className="hidden"

                onChange={handleImageChange}

              />
              <label
                htmlFor="profile-picture-upload"
                className="flex items-center justify-center w-30 h-30 border-2 border-dashed rounded-full cursor-pointer overflow-hidden transition-all duration-200 hover:scale-105"
                style={{ borderColor: '#bbd3d0', backgroundColor: '#f3f8f8' }}
              >
                {formData.profile_picture ? (
                  <img
                    src={formData.profile_picture}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-sm text-gray-400 block text-center">Click to upload</span>
                )}
              </label>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#405e5e' }}>
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border rounded-xl transition-all duration-200"
              style={{ borderColor: '#bbd3d0', backgroundColor: '#f3f8f8' }}
              placeholder="Tell us a bit about yourself..."
              required
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl text-white font-medium"
              style={{ backgroundColor: '#319795' }}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};




// coines

// const AddCoins = ({ currentBalance, onAddCoins }) => {
//   const [amount, setAmount] = useState('');
//   const [loading, setLoading] = useState(false);

//   const predefinedAmounts = [50, 100, 250, 500, 1000];

//   const handleAddCoins = async (coinAmount) => {
//     setLoading(true);

//     await new Promise(resolve => setTimeout(resolve, 2000));

//     onAddCoins(coinAmount);
//     setAmount('');
//     setLoading(false);
//   };

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#344545' }}>
//         Add Coins
//       </h2>

//       <div className="rounded-2xl p-4 sm:p-6 text-white relative overflow-hidden"
//         style={{ background: 'linear-gradient(135deg, #344545 0%, #558581 100%)' }}>
//         {/* Background Pattern */}
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute inset-0" style={{
//             backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.3) 2px, transparent 0)`,
//             backgroundSize: '50px 50px'
//           }} />
//         </div>

//         <div className="relative z-10">
//           <h3 className="text-lg font-semibold mb-2">Current Balance</h3>
//           <p className="text-3xl sm:text-4xl font-bold">{currentBalance} Coins</p>
//         </div>
//       </div>

//       <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 relative overflow-hidden">
//         {/* Background Pattern */}
//         <div className="absolute inset-0 opacity-5">
//           <div className="absolute inset-0" style={{
//             backgroundImage: `radial-gradient(circle at 20px 20px, rgba(85, 133, 129, 0.3) 1px, transparent 0)`,
//             backgroundSize: '40px 40px'
//           }} />
//         </div>

//         <div className="relative z-10">
//           <h3 className="text-xl font-semibold mb-6" style={{ color: '#344545' }}>Quick Add</h3>
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
//             {predefinedAmounts.map((coins) => (
//               <button
//                 key={coins}
//                 onClick={() => handleAddCoins(coins)}
//                 disabled={loading}
//                 className="p-3 sm:p-4 rounded-xl text-center font-semibold transition-all duration-200 disabled:opacity-50 text-sm sm:text-base hover:scale-105"
//                 style={{
//                   backgroundColor: '#f3f8f8',
//                   color: '#344545'
//                 }}
//                 onMouseEnter={(e) => {
//                   e.target.style.backgroundColor = '#558581';
//                   e.target.style.color = 'white';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.backgroundColor = '#f3f8f8';
//                   e.target.style.color = '#344545';
//                 }}
//               >
//                 {coins} Coins
//               </button>
//             ))}
//           </div>

//           <div className="border-t pt-6" style={{ borderColor: '#e1ecea' }}>
//             <h3 className="text-lg font-semibold mb-4" style={{ color: '#344545' }}>Custom Amount</h3>
//             <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
//               <input
//                 type="number"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//                 placeholder="Enter amount..."
//                 className="flex-1 px-4 py-3 border rounded-xl transition-all duration-200"
//                 style={{
//                   borderColor: '#bbd3d0',
//                   backgroundColor: '#f3f8f8'
//                 }}
//                 onFocus={(e) => {
//                   e.target.style.borderColor = '#558581';
//                   e.target.style.boxShadow = '0 0 0 3px rgba(85, 133, 129, 0.1)';
//                 }}
//                 onBlur={(e) => {
//                   e.target.style.borderColor = '#bbd3d0';
//                   e.target.style.boxShadow = 'none';
//                 }}
//               />
//               <button
//                 onClick={() => amount && handleAddCoins(parseInt(amount))}
//                 disabled={loading || !amount}
//                 className="text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-200 disabled:opacity-50 whitespace-nowrap"
//                 style={{ backgroundColor: '#ff6b35' }}
//               >
//                 {loading ? (
//                   <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
//                 ) : (
//                   'Add Coins'
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const AddCoins = ({ currentBalance, onAddCoins }) => {
//   const [amount, setAmount] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [history, setHistory] = useState([]); // coin request history

//   const predefinedAmounts = [50, 100, 250, 500, 1000];

//   // ✅ Fetch previous coin requests
//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const res = await fetch("/api/get-coin-status/");
//         const data = await res.json();
//         setHistory(data); // assume API returns [{id, amount, status, created_at}, ...]
//       } catch (err) {
//         console.error("Error fetching coin history:", err);
//       }
//     };

//     fetchHistory();
//   }, []);

//   // ✅ Handle Add Coins
//   const handleAddCoins = async (coinAmount) => {
//     setLoading(true);

//     try {
//       const res = await fetch("/api/add-coin/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials:"include",
//         body: JSON.stringify({ amount: coinAmount }),
//       });

//       if (!res.ok) throw new Error("Failed to add coins");

//       const newRequest = await res.json(); 
 
//       if(newRequest.success==false){
//         alert(newRequest.message);
//         return;
//       }
//       onAddCoins(coinAmount);
//         console.log(newRequest);
        
//       // update history instantly
//       setHistory((prev) => [newRequest, ...prev]);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setAmount("");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Balance Card */}
//       <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: "#344545" }}>
//         Add Coins
//       </h2>
//       <div
//         className="rounded-2xl p-4 sm:p-6 text-white relative overflow-hidden"
//         style={{ background: "linear-gradient(135deg, #344545 0%, #558581 100%)" }}
//       >
//         <div className="absolute inset-0 opacity-10">
//           <div
//             className="absolute inset-0"
//             style={{
//               backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.3) 2px, transparent 0)`,
//               backgroundSize: "50px 50px",
//             }}
//           />
//         </div>
//         <div className="relative z-10">
//           <h3 className="text-lg font-semibold mb-2">Current Balance</h3>
//           <p className="text-3xl sm:text-4xl font-bold">{currentBalance} Coins</p>
//         </div>
//       </div>

//       {/* Quick Add + Custom */}
//       <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 relative overflow-hidden">
//         <div className="absolute inset-0 opacity-5">
//           <div
//             className="absolute inset-0"
//             style={{
//               backgroundImage: `radial-gradient(circle at 20px 20px, rgba(85, 133, 129, 0.3) 1px, transparent 0)`,
//               backgroundSize: "40px 40px",
//             }}
//           />
//         </div>

//         <div className="relative z-10">
//           <h3 className="text-xl font-semibold mb-6" style={{ color: "#344545" }}>
//             Quick Add
//           </h3>

//           {/* Predefined Buttons */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
//             {predefinedAmounts.map((coins) => (
//               <button
//                 key={coins}
//                 onClick={() => handleAddCoins(coins)}
//                 disabled={loading}
//                 className="p-3 sm:p-4 rounded-xl text-center font-semibold transition-all duration-200 disabled:opacity-50 text-sm sm:text-base hover:scale-105"
//                 style={{ backgroundColor: "#f3f8f8", color: "#344545" }}
//                 onMouseEnter={(e) => {
//                   e.target.style.backgroundColor = "#558581";
//                   e.target.style.color = "white";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.backgroundColor = "#f3f8f8";
//                   e.target.style.color = "#344545";
//                 }}
//               >
//                 {coins} Coins
//               </button>
//             ))}
//           </div>

//           {/* Custom Input */}
//           <div className="border-t pt-6" style={{ borderColor: "#e1ecea" }}>
//             <h3 className="text-lg font-semibold mb-4" style={{ color: "#344545" }}>
//               Custom Amount
//             </h3>
//             <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
//               <input
//                 type="number"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//                 placeholder="Enter amount..."
//                 className="flex-1 px-4 py-3 border rounded-xl transition-all duration-200"
//                 style={{
//                   borderColor: "#bbd3d0",
//                   backgroundColor: "#f3f8f8",
//                 }}
//               />
//               <button
//                 onClick={() => amount && handleAddCoins(parseInt(amount))}
//                 disabled={loading || !amount}
//                 className="text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-200 disabled:opacity-50 whitespace-nowrap"
//                 style={{ backgroundColor: "#ff6b35" }}
//               >
//                 {loading ? (
//                   <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
//                 ) : (
//                   "Add Coins"
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ✅ Coin Request History */}
//       <div className="bg-gray-300 rounded-2xl shadow-md p-4 sm:p-6">
//         <h3 className="text-xl font-semibold mb-4" style={{ color: "#344545" }}>
//           Coin Request History
//         </h3>
//         {history.length === 0 ? (
//           <p className="text-gray-500">No requests yet.</p>
//         ) : (
//           <ul className="space-y-3">
//             {history.map((req) => (
//               <li
//                 key={req.id}
//                 className="flex justify-between items-center px-4 py-3 bg-slate-500 rounded-lg"
//               >
//                 <span className="font-medium">{req.amount} Coins</span>
//                 <span
//                   className={`px-3 py-1 rounded-full text-sm font-semibold ${
//                     req.status === "approved"
//                       ? "bg-green-100 text-green-600"
//                       : req.status === "pending"
//                       ? "bg-yellow-100 text-yellow-600"
//                       : "bg-red-100 text-red-600"
//                   }`}
//                 >
//                   {req.status}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };


const AddCoins = ({ currentBalance, onAddCoins }) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]); // coin request history

  const predefinedAmounts = [50, 100, 250, 500, 1000];

  // Format timestamp nicely
  const formatDate = (ts) => {
    if (!ts) return "";
    const date = new Date(ts);
    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ✅ Fetch previous coin requests
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/get-coin-status/", { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch history");
        const data = await res.json();
        console.log("ddd ",data);
        
        // normalize array of requests
        const items = Array.isArray(data.requests)
          ? data.requests
          : Array.isArray(data)
          ? data
          : [];

        const normalized = items.map((item) => ({
          request_id: item.request_id ?? item.id,
          amount: Number(item.amount),
          status: item.status ?? "pending",
          created_at: item.created_at ?? new Date().toISOString(),
        }));
        console.log("gg  ",normalized);
        
        setHistory(normalized);
      } catch (err) {
        console.error("Error fetching coin history:", err);
      }
    };

    fetchHistory();
  }, []);

  // ✅ Handle Add Coins
  const handleAddCoins = async (coinAmount) => {
    setLoading(true);
    try {
      const res = await fetch("/api/add-coin/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ amount: coinAmount }),
      });

      const data = await res.json();

      if (data.success === false) {
        alert(data.message);
        setLoading(false);
        return;
      }

      const newRequest = {
        request_id: data.request.request_id,
        amount: Number(data.request.amount),
        status: data.request.status,
        created_at: data.request.created_at,
      };

      // Update parent balance
      onAddCoins(coinAmount);

      // Update history
      setHistory((prev) => [newRequest, ...prev]);
    } catch (err) {
      console.error(err);
      alert("Something went wrong while adding coins.");
    } finally {
      setAmount("");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Balance Card */}
      <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: "#344545" }}>
        Add Coins
      </h2>
      <div
        className="rounded-2xl p-4 sm:p-6 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #344545 0%, #558581 100%)" }}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.3) 2px, transparent 0)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>
        <div className="relative z-10">
          <h3 className="text-lg font-semibold mb-2">Current Balance</h3>
          <p className="text-3xl sm:text-4xl font-bold">{currentBalance} Coins</p>
        </div>
      </div>

      {/* Quick Add + Custom */}
      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20px 20px, rgba(85,133,129,0.3) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10">
          <h3 className="text-xl font-semibold mb-6" style={{ color: "#344545" }}>
            Quick Add
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
            {predefinedAmounts.map((coins) => (
              <button
                key={coins}
                onClick={() => handleAddCoins(coins)}
                disabled={loading}
                className="p-3 sm:p-4 rounded-xl text-center font-semibold transition-all duration-200 disabled:opacity-50 text-sm sm:text-base hover:scale-105"
                style={{ backgroundColor: "#f3f8f8", color: "#344545" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#558581";
                  e.target.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#f3f8f8";
                  e.target.style.color = "#344545";
                }}
              >
                {coins} Coins
              </button>
            ))}
          </div>

          {/* Custom Input */}
          <div className="border-t pt-6" style={{ borderColor: "#e1ecea" }}>
            <h3 className="text-lg font-semibold mb-4" style={{ color: "#344545" }}>
              Custom Amount
            </h3>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount..."
                className="flex-1 px-4 py-3 border rounded-xl text-black transition-all duration-200"
                style={{ borderColor: "#bbd3d0", backgroundColor: "#f3f8f8" }}
              />
              <button
                onClick={() => amount && handleAddCoins(parseInt(amount))}
                disabled={loading || !amount}
                className="text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-200 disabled:opacity-50 whitespace-nowrap"
                style={{ backgroundColor: "#ff6b35" }}
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                ) : (
                  "Add Coins"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Coin Request History */}
      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
        <h3 className="text-xl font-semibold mb-4" style={{ color: "#344545" }}>
          Coin Request History
        </h3>
        {history.length === 0 ? (
          <p className="text-gray-500">No requests yet.</p>
        ) : (
          <ul className="space-y-3">
            {history.map((req) => (
              <li
                key={req.request_id}
                className="flex justify-between items-center px-4 py-3 bg-white rounded-lg border border-gray-100"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-black">{req.amount} Coins</span>
                  <span className="text-xs text-gray-400">{formatDate(req.created_at)}</span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    req.status === "approved"
                      ? "bg-green-100 text-green-600"
                      : req.status === "pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {req.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};


// Redeem Coins Component with jet-stream colors
const RedeemCoins = ({ currentBalance, onRedeemCoins }) => {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('bank');
  const [loading, setLoading] = useState(false);

  const redeemOptions = [
    { value: 100, label: '100 Coins = $10', rate: 0.10 },
    { value: 500, label: '500 Coins = $50', rate: 0.10 },
    { value: 1000, label: '1000 Coins = $100', rate: 0.10 },
    { value: 2500, label: '2500 Coins = $250', rate: 0.10 }
  ];

  const handleRedeemCoins = async (coinAmount) => {
    if (coinAmount > currentBalance) {
      alert('Insufficient balance!');
      return;
    }

    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    onRedeemCoins(coinAmount);
    setAmount('');
    setLoading(false);
  };

  const calculateCashValue = (coins) => {
    return (coins * 0.10).toFixed(2);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#344545' }}>
        Redeem Coins
      </h2>

      <div className="rounded-2xl p-4 sm:p-6 text-white relative overflow-hidden"
        style={{ backgroundColor: '#ff6b35' }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.3) 2px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="relative z-10">
          <h3 className="text-lg font-semibold mb-2">Available Balance</h3>
          <p className="text-3xl sm:text-4xl font-bold">{currentBalance} Coins</p>
          <p className="opacity-90 mt-2">≈ ${calculateCashValue(currentBalance)} USD</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(45deg, transparent 25%, rgba(85, 133, 129, 0.1) 25%, rgba(85, 133, 129, 0.1) 50%, transparent 50%, transparent 75%, rgba(85, 133, 129, 0.1) 75%)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="relative z-10">
          <h3 className="text-xl font-semibold mb-6" style={{ color: '#344545' }}>Quick Redeem</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
            {redeemOptions.map((option) => (
              // <button
              //   key={option.value}
              //   onClick={() => handleRedeemCoins(option.value)}
              //   disabled={loading || option.value > currentBalance}
              //   className="p-3 sm:p-4 rounded-xl text-center font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base hover:scale-105"
              //   style={{
              //     backgroundColor: '#f3f8f8',
              //     color: '#344545'
              //   }}
              //   onMouseEnter={(e) => {
              //     if (!e.target.disabled) {
              //       e.target.style.backgroundColor = '#ff6b35';
              //       e.target.style.color = 'white';
              //     }
              //   }}
              //   onMouseLeave={(e) => {
              //     if (!e.target.disabled) {
              //       e.target.style.backgroundColor = '#f3f8f8';
              //       e.target.style.color = '#344545';
              //     }
              //   }}
              // >
              //   {option.label}
              // </button>
              <button
                key={option.value}
                onClick={() => handleRedeemCoins(option.value)}
                disabled={loading || option.value > currentBalance}
                className="cursor-pointer hover:bg-[#ff6b35]"
              // className="p-3 sm:p-4 
              // rounded-xl 
              // font-semibold text-sm sm:text-base 
              // bg-[#f3f8f8] text-[#344545] 
              // hover:bg-[#ff6b35] hover:text-white 
              // disabled:opacity-50 disabled:cursor-not-allowed 
              // select-none 
              // transition-transform duration-200 transform hover:scale-105"
              // style={{
              //   backgroundColor: "#f3f8f8",
              //   color: "#344545",
              // }}
              // onMouseEnter={(e) => {
              //   if (!e.currentTarget.disabled) {
              //     e.currentTarget.style.backgroundColor = "#ff6b35";
              //     e.currentTarget.style.color = "white";
              //   }
              // }}
              // onMouseLeave={(e) => {
              //   if (!e.currentTarget.disabled) {
              //     e.currentTarget.style.backgroundColor = "#f3f8f8";
              //     e.currentTarget.style.color = "white";
              //   }
              // }}
              >
                {option.label}
              </button>

            ))}
          </div>

          <div className="border-t pt-6 space-y-4" style={{ borderColor: '#e1ecea' }}>
            <h3 className="text-lg font-semibold" style={{ color: '#344545' }}>Custom Amount</h3>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#405e5e' }}>
                Redemption Method
              </label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl transition-all duration-200"
                style={{
                  borderColor: '#bbd3d0',
                  backgroundColor: '#f3f8f8'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#ff6b35';
                  e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 53, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#bbd3d0';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="bank">Bank Transfer</option>
                <option value="paypal">PayPal</option>
                <option value="crypto">Cryptocurrency</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="flex-1">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter coins to redeem..."
                  max={currentBalance}
                  className="w-full px-4 py-3 border rounded-xl transition-all duration-200"
                  style={{
                    borderColor: '#bbd3d0',
                    backgroundColor: '#f3f8f8'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#ff6b35';
                    e.target.style.boxShadow = '0 0 0 3px rgba(255, 107, 53, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#bbd3d0';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {amount && (
                  <p className="text-sm mt-1" style={{ color: '#719f9a' }}>
                    ≈ ${calculateCashValue(amount)} USD
                  </p>
                )}
              </div>
              <button
                onClick={() => amount && handleRedeemCoins(parseInt(amount))}
                disabled={loading || !amount || parseInt(amount) > currentBalance}
                className="text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-200 disabled:opacity-50 whitespace-nowrap"
                style={{ backgroundColor: '#ff6b35' }}
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                ) : (
                  'Redeem Now'
                )}
              </button>
            </div>

            <div className="rounded-xl p-4" style={{ backgroundColor: '#f3f8f8' }}>
              <h4 className="font-semibold mb-2" style={{ color: '#344545' }}>Redemption Info:</h4>
              <ul className="text-sm space-y-1" style={{ color: '#719f9a' }}>
                <li>• Minimum redemption: 100 coins</li>
                <li>• Rate: 1 coin = $0.10 USD</li>
                <li>• Processing time: 2-5 business days</li>
                <li>• No redemption fees</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Help/FAQs Component with jet-stream colors
const HelpFAQs = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "How do coins work on SkillsAmigo?",
      answer: "Coins are our virtual currency. You can purchase coins to pay for gigs and earn coins by completing work for others. 1 coin = $0.10 USD when redeeming."
    },
    {
      question: "How do I post a gig?",
      answer: "Navigate to the 'Post Gig' section, fill out the form with your requirements, budget range, thumbnail image, and category, then submit."
    },
    {
      question: "What happens if there's a dispute?",
      answer: "We have a dispute resolution system where our team reviews the case and makes fair decisions based on the evidence provided."
    },
    {
      question: "How do I redeem my coins?",
      answer: "Go to the 'Redeem Coins' section and choose your preferred method (Bank Transfer, PayPal, or Crypto). Minimum redemption is 100 coins."
    },
    {
      question: "Is there a fee for using SkillsAmigo?",
      answer: "We charge a small platform fee of 5% on completed transactions to maintain and improve our services. No fees for adding or redeeming coins."
    },
    {
      question: "How long does coin redemption take?",
      answer: "Coin redemptions typically process within 2-5 business days depending on your chosen method."
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#344545' }}>
        Help & FAQs
      </h2>

      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20px 20px, rgba(85, 133, 129, 0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="space-y-4 relative z-10">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-xl" style={{ borderColor: '#e1ecea' }}>
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                className="w-full px-4 sm:px-6 py-4 text-left font-semibold rounded-xl transition-colors duration-200"
                style={{ color: '#344545' }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f3f8f8';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
                aria-expanded={openFAQ === index}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base">{faq.question}</span>
                  <span className="ml-2" style={{ color: '#719f9a' }}>
                    {openFAQ === index ? '−' : '+'}
                  </span>
                </div>
              </button>
              {openFAQ === index && (
                <div className="px-4 sm:px-6 pb-4 text-sm sm:text-base" style={{ color: '#719f9a' }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl p-4 sm:p-6 border relative overflow-hidden"
        style={{ backgroundColor: '#f3f8f8', borderColor: '#bbd3d0' }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(45deg, transparent 25%, rgba(85, 133, 129, 0.2) 25%, rgba(85, 133, 129, 0.2) 50%, transparent 50%, transparent 75%, rgba(85, 133, 129, 0.2) 75%)`,
            backgroundSize: '30px 30px'
          }} />
        </div>

        <div className="relative z-10">
          <h3 className="text-lg font-semibold mb-2" style={{ color: '#344545' }}>Need More Help?</h3>
          <p className="mb-4 text-sm sm:text-base" style={{ color: '#405e5e' }}>
            Can't find what you're looking for? Our support team is here to help!
          </p>
          <button className="text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-200"
            style={{ backgroundColor: '#558581' }}>
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

// Footer Component - Full width with jet-stream colors
const Footer = () => {
  return (
    <footer className="bg-white border-t mt-8 w-full" style={{ borderColor: '#e1ecea' }}>
      <div className="px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <p className="text-xs sm:text-sm text-center sm:text-left" style={{ color: '#719f9a' }}>
            © 2025 SkillsAmigo. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-end space-x-4 sm:space-x-6">
            <a href="#"
              className="text-xs sm:text-sm transition-colors duration-200 hover:underline"
              style={{ color: '#719f9a' }}
              onMouseEnter={(e) => e.target.style.color = '#558581'}
              onMouseLeave={(e) => e.target.style.color = '#719f9a'}>
              Privacy Policy
            </a>
            <a href="#"
              className="text-xs sm:text-sm transition-colors duration-200 hover:underline"
              style={{ color: '#719f9a' }}
              onMouseEnter={(e) => e.target.style.color = '#558581'}
              onMouseLeave={(e) => e.target.style.color = '#719f9a'}>
              Terms of Service
            </a>
            <a href="#"
              className="text-xs sm:text-sm transition-colors duration-200 hover:underline"
              style={{ color: '#719f9a' }}
              onMouseEnter={(e) => e.target.style.color = '#558581'}
              onMouseLeave={(e) => e.target.style.color = '#719f9a'}>
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Dashboard Component
const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Full-stack developer with 5 years of experience',
    phone: '+1 234 567 8900',
    skills: 'React, Node.js, Python, UI/UX Design'
  });
  const { data: session ,status} = useSession();
  const router=useRouter();
  const [coinBalance, setCoinBalance] = useState(session?.user?.balance);

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);


 useEffect(() => {
    if (status === "loading") return;

    if (session?.user && session.user.role == "admin") {
      router.push("/dashboard/admin"); // send non-admins to home
    } 
  }, [ session, router]);
if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-jet-stream-100">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }
  if (!session?.user ) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-red-600 mb-4">❌ Access Denied</h1>
        <p className="text-gray-700 mb-6">
          Please sign in to view this page.
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
  

  const handleLogout = () => {
    alert('Logout functionality would be implemented here');
  };

  const handleHome = () => {
    setActiveSection('overview');
    setSidebarOpen(false);
  };

  const handlePostGig = (gigData) => {
    alert(`Gig "${gigData.title}" posted successfully!`);
  };

  const handleSaveProfile = (profileData) => {
    setUser({
      name: profileData.name,
      email: profileData.email,
      bio: profileData.bio,
      phone: profileData.phone,
      skills: profileData.skills
    });
  };

  const handleAddCoins = (amount) => {
    setCoinBalance(prev => prev + amount);
    alert(`${amount} coins added successfully!`);
  };

  const handleRedeemCoins = (amount) => {
    setCoinBalance(prev => prev - amount);
    const cashValue = (amount * 0.10).toFixed(2);
    alert(`${amount} coins redeemed for ${cashValue} successfully!`);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview loading={loading} />;
      case 'post-gig':
        return <PostGigForm onSubmit={handlePostGig} />;
      case 'my-gigs':
        return <MyGigs loading={loading} />;
      case 'my-bookings':
        return <MyBookings loading={loading} />;
      case 'BookedGigs':
        return <BookedGigs loading={loading} />;
      case 'profile':
        return <ProfileSettings user={user} onSave={handleSaveProfile} />;
      case 'add-coins':
        return <AddCoins currentBalance={coinBalance} onAddCoins={handleAddCoins} />;
      case 'redeem-coins':
        return <RedeemCoins currentBalance={coinBalance} onRedeemCoins={handleRedeemCoins} />;
      case 'help':
        return <HelpFAQs />;
      default:
        return <Overview loading={loading} />;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f3f8f8' }}>
      {/* Fixed Header - Full width */}
      <Header user={user} onLogout={handleLogout} onHome={handleHome} />

      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="lg:ml-64 pt-20 pb-4 min-h-screen flex flex-col">
        <main className="flex-1 p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            {renderActiveSection()}
          </div>
        </main>

        {/* Fixed Footer - Full width */}
        <Footer />
      </div>

      {/* Enhanced Background Pattern */}
      <div className="fixed inset-0 -z-10 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25px 25px, rgba(85, 133, 129, 0.3) 2px, transparent 0),
            linear-gradient(45deg, transparent 25%, rgba(159, 193, 189, 0.1) 25%, rgba(159, 193, 189, 0.1) 50%, transparent 50%, transparent 75%, rgba(159, 193, 189, 0.1) 75%)
          `,
          backgroundSize: '50px 50px, 100px 100px'
        }} />
      </div>
    </div>
  );
};

export default UserDashboard;