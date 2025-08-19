
"use client";

import { useState, useEffect, useRef } from "react";
import Link from 'next/link';
import { Search, Filter, Star, MapPin, Clock, MessageCircle, Calendar, Badge, Zap, Users, TrendingUp, Award } from "lucide-react";
import React from "react";
import { Button } from "../_components/ui/button";
import { Card } from "../_components/ui/card";
import { Input } from "../_components/ui/input";
import { Badge as BadgeComponent } from "../_components/ui/badge";
import { FullwidthIconNavbar } from "../_components/navbars/fullwidth-icon-navbar";
import { NewsletterFooter } from "../_components/footers/newsletter-footer";

// Smooth Floating Elements with better performance
const FloatingElement = ({ children, delay = 0, duration = 4 }) => (
  <div 
    className="animate-float opacity-50"
    style={{ 
      animationDelay: `${delay}s`, 
      animationDuration: `${duration}s`,
      animationTimingFunction: 'ease-in-out',
      animationIterationCount: 'infinite',
      animationDirection: 'alternate'
    }}
  >
    {children}
  </div>
);

// Enhanced Parallax Background Elements with smoother transitions
const ParallaxSphere = ({ size, color, speed, initialPosition, opacity = 0.3 }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed ${size} ${color} rounded-full blur-3xl pointer-events-none transition-all duration-1000 ease-out will-change-transform`}
      style={{
        ...initialPosition,
        opacity: opacity,
        transform: `translate3d(0, ${scrollY * speed}px, 0) scale(${1 + Math.sin(scrollY * 0.005) * 0.1})`
      }}
    />
  );
};

// Enhanced 3D Wireframe Elements with improved visibility
const WireframeElement = ({ index, scrollY }) => {
  const angle = (index * 45) + (scrollY * 0.04);
  const baseOpacity = 0.6 + Math.sin(scrollY * 0.004 + index) * 0.3;
  
  return (
    <div
      className="absolute w-20 h-20 border-2 border-jet-stream-400/70 transform pointer-events-none transition-all duration-500 ease-out will-change-transform"
      style={{
        left: `${45 + Math.cos(angle * Math.PI / 180) * 25}%`,
        top: `${15 + Math.sin(angle * Math.PI / 180) * 15 + index * 120}px`,
        transform: `translate3d(0, 0, 0) rotate(${angle}deg) rotateY(${scrollY * 0.025}deg) rotateX(${Math.sin(scrollY * 0.01) * 12}deg)`,
        opacity: Math.max(0.4, Math.min(0.8, baseOpacity)),
        borderRadius: '8px',
        borderColor: `rgba(159, 193, 189, 0.7)`,
        boxShadow: '0 0 20px rgba(159, 193, 189, 0.3)'
      }}
    />
  );
};



// Enhanced GigCard with jet-stream colors and removed elements
const GigCard = ({ gig, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 80);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  useEffect(() => {
    const handleScroll = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tiltX = (scrollProgress - 0.5) * 6;
  const tiltY = Math.sin(scrollProgress * Math.PI) * 3;

  return (
    <Card
      ref={cardRef}
      className={`bg-gradient-to-br from-white/95 to-jet-stream-50/95 backdrop-blur-sm border border-jet-stream-200/60 overflow-hidden group hover:shadow-2xl hover:shadow-jet-stream-500/15 transition-all duration-700 ease-out hover:-translate-y-3 hover:scale-[1.02] will-change-transform ${
        isVisible ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-6 rotate-1'
      }`}
      style={{
        transitionDelay: isVisible ? `${index * 60}ms` : '0ms',
        transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) ${isVisible ? 'translateY(0)' : 'translateY(24px)'}`
      }}
    >
      {/* Enhanced Card Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-jet-stream-400/5 via-transparent to-orange-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-600 ease-out" />
      
      <div className="relative overflow-hidden">
        <img
          src={gig.image}
          alt={gig.title}
          className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Enhanced Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-jet-stream-900/50 via-jet-stream-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600 ease-out" />
        
        {/* Smoother Floating Animation on Hover */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <FloatingElement key={i} delay={i * 0.4} duration={3}>
              <div
                className="absolute w-1 h-1 bg-jet-stream-400/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${20 + i * 20}%`,
                }}
              />
            </FloatingElement>
          ))}
        </div>
      </div>

      <div className="p-4 sm:p-6 relative bg-white/95">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="relative">
              <img
                src={gig.providerPhoto}
                alt={gig.provider}
                className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 border-jet-stream-300/50 group-hover:border-jet-stream-500/70 transition-colors duration-500"
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-jet-stream-500 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div>
              <p className="font-semibold text-sm sm:text-base text-jet-stream-900 group-hover:text-jet-stream-700 transition-colors duration-300">{gig.provider}</p>
              <div className="flex items-center space-x-1 text-xs text-jet-stream-600">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>{gig.rating}</span>
                <span>({gig.reviews})</span>
              </div>
            </div>
          </div>
          {gig.isVerified && (
            <BadgeComponent className="bg-jet-stream-100 text-jet-stream-700 border-jet-stream-300/50 hover:bg-jet-stream-200 transition-colors duration-300 text-xs">
              <Badge className="w-3 h-3 mr-1" />
              <span className="hidden sm:inline">Verified</span>
              <span className="sm:hidden">✓</span>
            </BadgeComponent>
          )}
        </div>

        <h3 className="text-base sm:text-lg font-semibold text-jet-stream-900 mb-2 sm:mb-3 line-clamp-2 group-hover:text-jet-stream-700 transition-colors duration-300">{gig.title}</h3>
        <p className="text-jet-stream-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3 group-hover:text-jet-stream-700 transition-colors duration-300">{gig.description}</p>

        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          {gig.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-1 sm:px-3 bg-gradient-to-r from-jet-stream-100 to-jet-stream-200 text-jet-stream-700 border border-jet-stream-300/50 rounded-full hover:from-jet-stream-200 hover:to-jet-stream-300 transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mb-3 sm:mb-4 text-xs sm:text-sm text-jet-stream-600">
          <div className="flex items-center space-x-1">
            <MapPin className="w-3 h-3 text-jet-stream-500" />
            <span>{gig.distance}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3 text-jet-stream-500" />
            <span className="truncate">{gig.availability}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-jet-stream-900 to-jet-stream-700 bg-clip-text text-transparent">{gig.price}</p>
            <p className="text-xs text-jet-stream-500">{gig.priceType}</p>
          </div>
          <div className="flex space-x-1.5 sm:space-x-2">
            <Button size="sm" variant="outline" className="border-jet-stream-300 text-jet-stream-600 hover:bg-jet-stream-50 hover:border-jet-stream-500 transition-all duration-300 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2">
              <MessageCircle className="w-3 h-3 sm:mr-1" />
              <span className="hidden sm:inline">Chat</span>
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white transition-all duration-300 hover:scale-105 shadow-lg text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2">
              <Calendar className="w-3 h-3 sm:mr-1" />
              <span className="hidden sm:inline">Book</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Extended mock data with more variety
const mockGigs = [
  {
    id: 1,
    title: "Professional Website Development & Design",
    description: "I create modern, responsive websites using React, Next.js, and Tailwind CSS. Perfect for small businesses and startups looking to establish their online presence.",
    provider: "Rahul Sharma",
    providerPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    price: "₹5,000",
    priceType: "per project",
    rating: 4.9,
    reviews: 127,
    distance: "2.3 km",
    availability: "Available now",
    tags: ["React", "Web Design", "Frontend"],
    isVerified: true
  },
  {
    id: 2,
    title: "Home-cooked North Indian Meals",
    description: "Authentic North Indian cuisine made with fresh ingredients. Specializing in Dal Makhani, Butter Chicken, and fresh rotis. Perfect for busy professionals.",
    provider: "Priya Gupta",
    providerPhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    price: "₹150",
    priceType: "per meal",
    rating: 4.8,
    reviews: 89,
    distance: "1.1 km",
    availability: "Mon-Fri 6-8 PM",
    tags: ["Cooking", "North Indian", "Home Food"],
    isVerified: true
  },
  {
    id: 3,
    title: "IELTS & English Speaking Coaching",
    description: "Certified IELTS trainer with 8+ years experience. Helped 200+ students achieve band 7+. One-on-one sessions and group classes available.",
    provider: "Anjali Mehta",
    providerPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
    price: "₹800",
    priceType: "per hour",
    rating: 4.9,
    reviews: 234,
    distance: "3.7 km",
    availability: "Evenings & Weekends",
    tags: ["IELTS", "English", "Teaching"],
    isVerified: true
  },
  {
    id: 4,
    title: "Bike & Scooter Repair Service",
    description: "Mobile motorcycle repair service. I come to your location with all tools. Specializing in Royal Enfield, Hero, and Honda bikes. Quick and reliable service.",
    provider: "Vikram Singh",
    providerPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    price: "₹300",
    priceType: "service charge",
    rating: 4.7,
    reviews: 156,
    distance: "4.2 km",
    availability: "9 AM - 6 PM",
    tags: ["Bike Repair", "Mobile Service", "Mechanical"],
    isVerified: false
  },
  {
    id: 5,
    title: "Bharatanatyam Dance Classes",
    description: "Traditional Bharatanatyam lessons for all ages. Certified from Kalakshetra Foundation. Teaching classical dance with proper technique and cultural context.",
    provider: "Lakshmi Iyer",
    providerPhoto: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop",
    price: "₹1,200",
    priceType: "per month",
    rating: 4.9,
    reviews: 78,
    distance: "2.8 km",
    availability: "Tue, Thu, Sat",
    tags: ["Dance", "Bharatanatyam", "Classical"],
    isVerified: true
  },
  {
    id: 6,
    title: "Solar Panel Installation & Maintenance",
    description: "Professional solar panel installation and maintenance services. Certified electrician with 10 years experience. Complete rooftop solar solutions.",
    provider: "Amit Patel",
    providerPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop",
    price: "₹15,000",
    priceType: "per installation",
    rating: 4.8,
    reviews: 92,
    distance: "5.1 km",
    availability: "Mon-Sat 8-6",
    tags: ["Solar", "Electrical", "Installation"],
    isVerified: true
  },
  {
    id: 7,
    title: "Guitar Lessons for Beginners",
    description: "Learn acoustic and electric guitar from basics. 15 years of teaching experience. Individual and group sessions available. All genres covered.",
    provider: "Arjun Kumar",
    providerPhoto: "https://images.unsplash.com/photo-1507038772120-7fff76f79d79?w=100&h=100&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
    price: "₹600",
    priceType: "per hour",
    rating: 4.7,
    reviews: 143,
    distance: "1.9 km",
    availability: "After 5 PM",
    tags: ["Music", "Guitar", "Teaching"],
    isVerified: true
  },
  {
    id: 8,
    title: "Professional Photography Services",
    description: "Portrait, event, and product photography. High-quality images with quick turnaround. Professional editing included. Perfect for social media and business needs.",
    provider: "Meera Joshi",
    providerPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1554048612-b6a482b22bb0?w=400&h=300&fit=crop",
    price: "₹2,500",
    priceType: "per session",
    rating: 4.9,
    reviews: 201,
    distance: "3.2 km",
    availability: "Weekends",
    tags: ["Photography", "Portraits", "Events"],
    isVerified: true
  },
  {
    id: 9,
    title: "Yoga & Meditation Classes",
    description: "Hatha and Vinyasa yoga classes for all levels. Certified instructor with 12 years experience. Focus on breathing techniques and mindfulness practices.",
    provider: "Sunita Rao",
    providerPhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68e71?w=400&h=300&fit=crop",
    price: "₹1,000",
    priceType: "per month",
    rating: 4.8,
    reviews: 167,
    distance: "1.5 km",
    availability: "Morning 6-8 AM",
    tags: ["Yoga", "Meditation", "Wellness"],
    isVerified: true
  },
  {
    id: 10,
    title: "Home Tutoring - Mathematics",
    description: "Expert math tutor for grades 6-12 and competitive exams. Strong focus on concept building and problem-solving techniques. Proven track record.",
    provider: "Dr. Rajesh Gupta",
    providerPhoto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?w=400&h=300&fit=crop",
    price: "₹500",
    priceType: "per hour",
    rating: 4.9,
    reviews: 298,
    distance: "2.1 km",
    availability: "Evenings 4-8 PM",
    tags: ["Mathematics", "Tutoring", "Education"],
    isVerified: true
  },
  {
    id: 11,
    title: "Car Detailing & Cleaning Service",
    description: "Complete car detailing service at your doorstep. Interior and exterior cleaning, waxing, and protection. Eco-friendly products used.",
    provider: "Karan Singh",
    providerPhoto: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop",
    price: "₹800",
    priceType: "per car",
    rating: 4.6,
    reviews: 124,
    distance: "6.3 km",
    availability: "10 AM - 5 PM",
    tags: ["Car Care", "Detailing", "Mobile Service"],
    isVerified: false
  },
  {
    id: 12,
    title: "Interior Design Consultation",
    description: "Transform your space with professional interior design advice. Specializing in modern and traditional Indian aesthetics. Budget-friendly solutions.",
    provider: "Neha Kapoor",
    providerPhoto: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    price: "₹1,500",
    priceType: "per consultation",
    rating: 4.8,
    reviews: 87,
    distance: "4.7 km",
    availability: "By appointment",
    tags: ["Interior Design", "Consultation", "Home Decor"],
    isVerified: true
  }
];

const categories = [
  { id: "all", name: "All", icon: TrendingUp },
  { id: "tech", name: "Tech & Digital", icon: Zap },
  { id: "food", name: "Food & Cooking", icon: Users },
  { id: "education", name: "Education", icon: Award },
  { id: "home", name: "Home Services", icon: Users },
  { id: "fitness", name: "Health & Fitness", icon: TrendingUp },
  { id: "creative", name: "Creative & Arts", icon: Award }
];

export default function FindSkillsFeed() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredGigs, setFilteredGigs] = useState(mockGigs);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let filtered = mockGigs;

    if (searchTerm) {
      filtered = filtered.filter(gig =>
        gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gig.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gig.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredGigs(filtered);
  }, [searchTerm, selectedCategory]);

  // Split gigs into chunks for section separators
  const gigChunks = [];
  const chunkSize = 6;
  for (let i = 0; i < filteredGigs.length; i += chunkSize) {
    gigChunks.push(filteredGigs.slice(i, i + chunkSize));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-jet-stream-50 via-white to-jet-stream-100 relative overflow-hidden">
      <FullwidthIconNavbar />

      {/* Enhanced Parallax Background with smoother animations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Enhanced Gradient Spheres */}
        <ParallaxSphere 
          size="w-48 sm:w-64 h-48 sm:h-64" 
          color="bg-gradient-radial from-jet-stream-600/10 to-transparent" 
          speed={-0.12} 
          initialPosition={{ top: '30%', right: '25%' }}
          opacity={0.2}
        />

        {/* Enhanced 3D Wireframe Elements with better visibility */}
        {[...Array(8)].map((_, i) => (
          <WireframeElement key={i} index={i} scrollY={scrollY} />
        ))}

        {/* Light Grid Pattern Background */}
        <div className="absolute inset-0 pattern-grid opacity-51" />
        
        {/* Enhanced Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-15">
          <div 
            className="w-full h-full bg-gradient-to-b from-transparent via-jet-stream-200/30 to-transparent will-change-transform"
            style={{
              backgroundImage: `
                linear-gradient(rgba(159, 193, 189, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(159, 193, 189, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              transform: `translate3d(0, ${scrollY * 0.05}px, 0)`
            }}
          />
        </div>
      </div>

      {/* Enhanced Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-20">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold mb-6 sm:mb-8 bg-gradient-to-r from-jet-stream-900 via-jet-stream-700 to-orange-600 bg-clip-text text-transparent leading-tight">
              Discover Local <span className="text-orange-500">Skills</span>
            </h1>
            <p className="text-lg sm:text-xl text-jet-stream-600 mb-10 sm:mb-16 max-w-3xl mx-auto leading-relaxed px-4">
              Find trusted professionals and talented individuals in your neighborhood. From tech help to home cooking, discover skills that matter.
            </p>

            {/* Enhanced Search Bar */}
            <div className="max-w-4xl mx-auto relative mb-10 sm:mb-16 px-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-jet-stream-400/15 via-orange-400/15 to-jet-stream-400/15 rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
                <div className="relative bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl border-2 border-jet-stream-200 group-hover:border-jet-stream-400/60 transition-colors duration-500 shadow-lg">
                  <Search className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 text-jet-stream-500 w-5 h-5 sm:w-6 sm:h-6" />
                  <Input
                    placeholder="Search for skills, services, or people..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 sm:pl-16 pr-12 sm:pr-16 py-4 sm:py-6 text-base sm:text-lg bg-transparent border-0 text-jet-stream-900 placeholder-jet-stream-500 focus:ring-2 focus:ring-jet-stream-400/50 rounded-xl sm:rounded-2xl"
                  />
                  <Filter className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 text-jet-stream-500 w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
            </div>

            {/* Enhanced Category Filters */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-16 px-4">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`${
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/25"
                        : "border-jet-stream-300 text-jet-stream-700 hover:bg-jet-stream-50 hover:border-jet-stream-400 bg-white/90"
                    } transition-all duration-500 ease-out px-3 sm:px-6 py-2 sm:py-3 hover:scale-105 hover:-translate-y-0.5 font-medium text-sm sm:text-base will-change-transform`}
                  >
                    <Icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">{category.name}</span>
                    <span className="sm:hidden">{category.name.split(' ')[0]}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Gigs Feed */}
      <section className="pb-20 sm:pb-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {gigChunks.map((chunk, chunkIndex) => (
            <div key={chunkIndex} className="mb-16 sm:mb-20">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-16 sm:mb-20">
                {chunk.map((gig, index) => (
                  <GigCard 
                    key={gig.id} 
                    gig={gig} 
                    index={chunkIndex * chunkSize + index} 
                  />
                ))}
              </div>
              
              
            </div>
          ))}

          {filteredGigs.length === 0 && (
            <div className="text-center py-20 sm:py-40 px-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-radial from-jet-stream-300/10 to-transparent blur-3xl" />
                <div className="relative bg-white/95 backdrop-blur-sm border border-jet-stream-200 rounded-2xl sm:rounded-3xl p-8 sm:p-16 max-w-lg mx-auto shadow-xl">
                  <div className="text-jet-stream-600 text-lg sm:text-xl mb-6 sm:mb-8">No skills found matching your search</div>
                  <Button 
                    onClick={() => setSearchTerm("")} 
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 px-6 sm:px-10 py-3 sm:py-4 hover:scale-105 transition-all duration-500 shadow-lg text-sm sm:text-base"
                  >
                    Clear Search
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <NewsletterFooter />

      {/* Integrated CSS Styles */}
      <style jsx global>{`
        /* Custom Keyframe Animations */
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.05);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Animation Classes */
        .animate-float {
          animation: float 2s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.4s ease-out;
        }
        
        /* Utility Classes */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
        
        .will-change-transform {
          will-change: transform;
        }
        
        .backdrop-blur-sm {
          backdrop-filter: blur(4px);
        }
        
        .backdrop-blur-xl {
          backdrop-filter: blur(24px);
        }

        /* Global Styles */
        html {
          scroll-behavior: smooth;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #f3f8f8;
        }

        ::-webkit-scrollbar-thumb {
          background: #9fc1bd;
          border-radius: 3px;
          transition: background 0.2s ease;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #719f9a;
        }

        /* Focus Styles */
        *:focus-visible {
          outline: 2px solid #558581;
          outline-offset: 2px;
          border-radius: 4px;
        }

        /* Selection Styles */
        ::selection {
          background: #9fc1bd;
          color: #1f2c2d;
        }

        ::-moz-selection {
          background: #9fc1bd;
          color: #1f2c2d;
        }

        /* Improved Mobile Touch Targets */
        @media (max-width: 640px) {
          button {
            min-height: 44px;
            min-width: 44px;
          }
          
          .touch-target {
            min-height: 44px;
            min-width: 44px;
          }
        }

        /* Reduce Motion for Accessibility */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
          
          .animate-float,
          .animate-pulse-glow,
          .animate-shimmer,
          .transition-all,
          .transition-opacity,
          .transition-transform,
          .transition-colors {
            animation: none !important;
            transition: none !important;
          }
        }

        /* High Contrast Mode Support */
        @media (prefers-contrast: high) {
          .border-jet-stream-200 {
            border-color: #405e5e;
            border-width: 2px;
          }
          
          .text-jet-stream-600 {
            color: #1f2c2d;
            font-weight: 600;
          }
          
          .bg-gradient-to-r {
            background: #558581 !important;
            color: white !important;
          }
        }

        /* Dark Mode Adjustments */
        @media (prefers-color-scheme: dark) {
          .bg-white\/95 {
            background-color: rgba(255, 255, 255, 0.98);
          }
          
          .bg-gradient-to-br {
            background: linear-gradient(135deg, #f3f8f8 0%, #ffffff 50%, #e1ecea 100%);
          }
        }

        /* Performance Optimizations */
        .card-container {
          contain: layout style paint;
        }
        
        .parallax-element {
          contain: layout style paint;
          transform: translate3d(0, 0, 0);
        }

        /* Print Styles */
        @media print {
          .no-print {
            display: none !important;
          }
          
          .print-friendly {
            background: white !important;
            color: black !important;
            box-shadow: none !important;
          }
        }

        /* Loading States */
        .loading-shimmer {
          background: linear-gradient(
            90deg,
            rgba(159, 193, 189, 0.1) 0%,
            rgba(159, 193, 189, 0.3) 50%,
            rgba(159, 193, 189, 0.1) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1s infinite;
        }

        /* Grid Pattern Utility */
        .pattern-grid {
          background-image: 
            linear-gradient(rgba(159, 193, 189, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(159, 193, 189, 0.4) 1px, transparent 1px);
          background-size: 24px 24px;
          animation: grid-move 20s linear infinite;
        }
        
        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(24px, 24px);
          }
        }
        .btn-enhanced {
          position: relative;
          overflow: hidden;
          transform: translateZ(0);
        }
        
        .btn-enhanced::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: left 0.5s;
        }
        
        .btn-enhanced:hover::before {
          left: 100%;
        }

        /* Card Hover Effects */
        .card-hover {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .card-hover:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(85, 133, 129, 0.15);
        }

        /* Responsive Typography */
        @media (max-width: 480px) {
          .responsive-text {
            font-size: clamp(0.875rem, 2.5vw, 1rem);
          }
          
          .responsive-heading {
            font-size: clamp(1.5rem, 8vw, 2.5rem);
          }
        }

        /* Error and Success States */
        .error-state {
          background: linear-gradient(135deg, #fee2e2, #fecaca);
          border: 1px solid #f87171;
          color: #991b1b;
        }
        
        .success-state {
          background: linear-gradient(135deg, #d1fae5, #a7f3d0);
          border: 1px solid #34d399;
          color: #065f46;
        }
      `}</style>
    </div>
  );}
