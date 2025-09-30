







'use client'
import { useState,useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import {
  Briefcase, 
  Star, 
  MapPin, 
  Calendar, 
  Phone, 
  Mail, 
  Globe, 
  Award, 
  Users, 
  TrendingUp,
  Camera,
  Heart,
  MessageSquare,
  Clock,
  DollarSign,
  Eye,
  CheckCircle,
  Trophy,
  Target,
  BookOpen,
  Zap,
  Palette,
  Coffee
} from 'lucide-react';
import { FullwidthIconNavbar } from '../../_components/navbars/fullwidth-icon-navbar';
import { NewsletterFooter } from '../../_components/footers/newsletter-footer';
import { useParams } from "next/navigation";

// Enhanced Loading Component
const LoadingProfile = () => (
  <div className="min-h-screen bg-gradient-to-br from-jet-stream-50 via-orange-50 to-jet-stream-100 relative overflow-hidden">
    {/* Animated background patterns */}
    <div className="absolute inset-0">
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="loadingGrad1" cx="20%" cy="30%">
            <stop offset="0%" stopColor="rgba(113, 159, 154, 0.4)" />
            <stop offset="100%" stopColor="rgba(85, 133, 129, 0.1)" />
          </radialGradient>
          <radialGradient id="loadingGrad2" cx="80%" cy="70%">
            <stop offset="0%" stopColor="rgba(255, 165, 0, 0.3)" />
            <stop offset="100%" stopColor="rgba(255, 140, 0, 0.05)" />
          </radialGradient>
        </defs>
        
        {/* Animated flowing shapes */}
        <path 
          d="M0,200 Q200,100 400,250 T800,300 Q1000,200 1200,350 L1200,0 L0,0 Z" 
          fill="url(#loadingGrad1)"
          className="animate-pulse"
        />
        <path 
          d="M0,600 Q300,400 600,550 T1200,500 L1200,800 L0,800 Z" 
          fill="url(#loadingGrad2)"
          className="animate-pulse"
          style={{ animationDelay: '0.5s' }}
        />
        
        {/* Animated circles */}
        <circle cx="300" cy="200" r="80" fill="url(#loadingGrad1)" className="animate-ping" opacity="0.3" />
        <circle cx="900" cy="400" r="60" fill="url(#loadingGrad2)" className="animate-ping" opacity="0.4" style={{ animationDelay: '1s' }} />
      </svg>
    </div>

    {/* Main loading content */}
    <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6">
      <div className="text-center max-w-md w-full">
        {/* Animated profile placeholder */}
        <div className="relative mx-auto mb-8 w-32 h-32 sm:w-40 sm:h-40">
          {/* Rotating rings */}
          <div className="absolute inset-0 rounded-full border-4 border-orange-200 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-4 border-jet-stream-200 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
          <div className="absolute inset-4 rounded-full border-4 border-orange-300 animate-ping opacity-50"></div>
          
          {/* Central icon */}
          <div className="absolute inset-6 bg-gradient-to-br from-orange-400 to-jet-stream-600 rounded-full flex items-center justify-center shadow-xl">
            <Camera className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-pulse" />
          </div>
          
          {/* Floating elements */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full animate-bounce shadow-lg"></div>
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-jet-stream-500 to-jet-stream-600 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {/* Loading text animation */}
        <div className="space-y-4 mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-jet-stream-900 animate-pulse">
            Loading Profile
          </h2>
          <p className="text-jet-stream-600 text-base sm:text-lg animate-pulse">
            Crafting your creative experience...
          </p>
        </div>

        {/* Animated progress indicators */}
        <div className="space-y-4">
          {/* Main progress bar */}
          <div className="h-2 bg-jet-stream-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-orange-400 to-jet-stream-500 rounded-full animate-pulse"></div>
          </div>
          
          {/* Content placeholders */}
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-3 animate-pulse">
                <div className="w-4 h-4 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full animate-ping" style={{ animationDelay: `${i * 0.3}s` }}></div>
                <div className={`h-3 bg-gradient-to-r from-jet-stream-200 to-jet-stream-300 rounded-full animate-pulse ${
                  i === 1 ? 'w-32' : i === 2 ? 'w-24' : 'w-28'
                }`} style={{ animationDelay: `${i * 0.2}s` }}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 left-4 opacity-30">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-300 to-orange-400 transform rotate-45 animate-bounce"></div>
        </div>
        <div className="absolute top-1/3 right-8 opacity-20">
          <div className="w-6 h-6 bg-gradient-to-br from-jet-stream-300 to-jet-stream-400 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute bottom-1/4 left-8 opacity-25">
          <div className="w-4 h-8 bg-gradient-to-br from-orange-400 to-jet-stream-400 rounded-xl animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
);

// Contact & Details Component - Enhanced Mobile Responsive
const ContactDetails = ({ user }) => (
  <section className="relative py-8 sm:py-12 lg:py-16 bg-jet-stream-900">
    {/* Crystalline Background Pattern */}
    <div className="absolute inset-0">
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="crystal1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(113, 159, 154, 0.3)" />
            <stop offset="100%" stopColor="rgba(159, 193, 189, 0.1)" />
          </linearGradient>
          <linearGradient id="crystal2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 165, 0, 0.2)" />
            <stop offset="100%" stopColor="rgba(255, 140, 0, 0.05)" />
          </linearGradient>
        </defs>
        
        {/* Crystalline triangular shapes */}
        <polygon points="100,50 200,150 50,200" fill="url(#crystal1)" />
        <polygon points="800,100 900,50 950,180" fill="url(#crystal2)" />
        <polygon points="300,300 450,250 400,400" fill="url(#crystal1)" opacity="0.8" />
        <polygon points="600,350 750,300 700,450" fill="url(#crystal2)" opacity="0.6" />
        
        {/* Hexagonal patterns */}
        <path d="M150,300 L200,320 L200,360 L150,380 L100,360 L100,320 Z" fill="rgba(113, 159, 154, 0.1)" />
        <path d="M850,150 L900,170 L900,210 L850,230 L800,210 L800,170 Z" fill="rgba(255, 165, 0, 0.1)" />
      </svg>
      
      {/* Sharp diamond grid - Hidden on mobile for cleaner look */}
      <div className="absolute top-10 right-4 sm:right-10 opacity-20 hidden sm:block">
        <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 sm:gap-3">
          {[...Array(24)].map((_, i) => (
            <div 
              key={i} 
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 transform rotate-45 ${
                i % 6 === 0 ? 'bg-orange-400' : 'bg-jet-stream-300'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
    
    {/* Triangular pattern background */}
    <div className="absolute inset-0 overflow-hidden opacity-15">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
        <pattern id="trianglePattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <polygon points="20,5 35,30 5,30" fill="currentColor" className="text-jet-stream-100" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#trianglePattern)" />
      </svg>
    </div>
    
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Contact Information */}
        <div className="relative order-2 lg:order-1">
          <div className="absolute -top-2 sm:-top-3 -left-2 sm:-left-3 w-full h-full bg-gradient-to-br from-jet-stream-200 to-jet-stream-300 rounded-2xl sm:rounded-3xl transform rotate-1"></div>
          <div className="relative bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border-2 border-jet-stream-200 shadow-xl">
            <h3 className="text-xl sm:text-2xl font-serif text-jet-stream-900 mb-4 sm:mb-6 flex items-center">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-orange-500 transform rotate-45 mr-2 sm:mr-3"></div>
              Contact Information
            </h3>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center p-3 sm:p-4 bg-gradient-to-r from-jet-stream-50 to-orange-50 rounded-xl border border-jet-stream-100">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-jet-stream-500 to-jet-stream-600 rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                  <Mail className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-jet-stream-500 uppercase tracking-wider font-medium">Email</p>
                  <p className="text-sm sm:text-base text-jet-stream-800 font-medium truncate">{user.email}</p>
                </div>
              </div>
              
              {user.phone && (
                <div className="flex items-center p-3 sm:p-4 bg-gradient-to-r from-jet-stream-50 to-orange-50 rounded-xl border border-jet-stream-100">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                    <Phone className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-jet-stream-500 uppercase tracking-wider font-medium">Phone</p>
                    <p className="text-sm sm:text-base text-jet-stream-800 font-medium">{user.phone}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Bio & Achievements */}
        <div className="relative order-1 lg:order-2">
          <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 w-full h-full bg-gradient-to-br from-orange-200 to-orange-300 rounded-2xl sm:rounded-3xl transform -rotate-1"></div>
          <div className="relative bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border-2 border-orange-200 shadow-xl">
            <h3 className="text-xl sm:text-2xl font-serif text-jet-stream-900 mb-4 sm:mb-6 flex items-center">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-jet-stream-500 rounded-full mr-2 sm:mr-3"></div>
              About Me
            </h3>
            
            {user.bio ? (
              <p className="text-sm sm:text-base text-jet-stream-700 leading-relaxed mb-4 sm:mb-6">{user.bio}</p>
            ) : (
              <p className="text-sm sm:text-base text-jet-stream-500 italic mb-4 sm:mb-6">No bio available yet.</p>
            )}
            
            {/* Achievement badges */}
            <div className="flex flex-wrap gap-2">
              {user.is_verified && (
                <span className="px-2 sm:px-3 py-1 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs sm:text-sm rounded-full font-medium">
                  ✓ Verified
                </span>
              )}
              <span className="px-2 sm:px-3 py-1 bg-gradient-to-r from-jet-stream-400 to-jet-stream-500 text-white text-xs sm:text-sm rounded-full font-medium">
                Top Rated
              </span>
              <span className="px-2 sm:px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs sm:text-sm rounded-full font-medium">
                Pro Seller
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Reviews & Testimonials Component - Mobile Responsive
const ReviewsSection = ({ reviews }) => (
  <section className="relative py-12 sm:py-16 lg:py-20 bg-jet-stream-900">
    {/* Circuit-like pattern */}
    <div className="absolute inset-0 overflow-hidden opacity-10">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600">
        <path d="M50,100 L150,100 L150,200 L250,200 L250,150 L350,150" 
              stroke="rgba(255, 165, 0, 0.6)" strokeWidth="2" fill="none" />
        <path d="M500,300 L600,300 L600,400 L700,400" 
              stroke="rgba(113, 159, 154, 0.6)" strokeWidth="2" fill="none" />
        <circle cx="150" cy="100" r="5" fill="rgba(255, 165, 0, 0.4)" />
        <circle cx="250" cy="200" r="4" fill="rgba(113, 159, 154, 0.4)" />
        <circle cx="600" cy="300" r="6" fill="rgba(255, 165, 0, 0.4)" />
      </svg>
    </div>
    
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white mb-4">Client Reviews</h2>
        <p className="text-jet-stream-200 text-base sm:text-lg">What people are saying about my work</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
        {reviews.map((review, index) => (
          <div key={index} className="relative group">
            <div className={`absolute inset-0 bg-gradient-to-br ${
              index % 3 === 0 ? 'from-orange-400 to-orange-600' :
              index % 3 === 1 ? 'from-jet-stream-400 to-jet-stream-600' :
              'from-yellow-400 to-yellow-600'
            } rounded-xl sm:rounded-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-300 opacity-20`}></div>
            
            <div className="relative bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-jet-stream-200 shadow-xl">
              {/* Stars */}
              <div className="flex items-center mb-3 sm:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
              
              <p className="text-sm sm:text-base text-jet-stream-700 mb-3 sm:mb-4 leading-relaxed">"{review.comment}"</p>
              
              <div className="flex items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-jet-stream-400 to-jet-stream-600 rounded-full flex items-center justify-center text-white font-bold mr-3 flex-shrink-0">
                  {review.client_name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm sm:text-base font-medium text-jet-stream-900 truncate">{review.client_name}</p>
                  <p className="text-xs sm:text-sm text-jet-stream-500 truncate">{review.project}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Hero Banner Component - Mobile Optimized
const HeroBanner = ({ user }) => (
  <section className="relative min-h-[70vh] sm:min-h-[80vh] overflow-hidden bg-gradient-to-tr from-jet-stream-50 via-orange-50 to-jet-stream-100 pt-23 sm:pt-7">
    {/* Organic flowing background */}
    <div className="absolute inset-0">
      <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="organic1" cx="20%" cy="30%">
            <stop offset="0%" stopColor="rgba(113, 159, 154, 0.4)" />
            <stop offset="100%" stopColor="rgba(85, 133, 129, 0.1)" />
          </radialGradient>
          <radialGradient id="organic2" cx="80%" cy="70%">
            <stop offset="0%" stopColor="rgba(255, 165, 0, 0.3)" />
            <stop offset="100%" stopColor="rgba(255, 140, 0, 0.05)" />
          </radialGradient>
          <radialGradient id="organic3" cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgba(159, 193, 189, 0.2)" />
            <stop offset="100%" stopColor="rgba(187, 211, 208, 0.05)" />
          </radialGradient>
        </defs>
        
        {/* Flowing organic shapes */}
        <path d="M0,200 Q200,100 400,250 T800,300 Q1000,200 1200,350 L1200,0 L0,0 Z" fill="url(#organic1)" />
        <path d="M0,600 Q300,400 600,550 T1200,500 L1200,800 L0,800 Z" fill="url(#organic2)" />
        <ellipse cx="300" cy="400" rx="200" ry="150" fill="url(#organic3)" transform="rotate(-20 300 400)" />
        <ellipse cx="900" cy="200" rx="150" ry="100" fill="url(#organic1)" transform="rotate(15 900 200)" />
      </svg>
    </div>
    
    {/* Floating paper-like elements - Hidden on small screens */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
      <div className="absolute top-20 right-20 w-16 h-16 bg-white/40 backdrop-blur-sm rounded-2xl transform rotate-12 shadow-lg opacity-60"></div>
      <div className="absolute bottom-32 left-16 w-12 h-20 bg-orange-100/50 backdrop-blur-sm rounded-xl transform -rotate-6 shadow-md opacity-70"></div>
      <div className="absolute top-1/3 left-1/4 w-8 h-8 bg-jet-stream-200/40 backdrop-blur-sm rounded-full shadow-sm opacity-50"></div>
    </div>
    
    <div className="relative z-10 flex items-center min-h-[70vh] sm:min-h-[80vh] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Magazine-style text section */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="relative">
              {/* Large typographic element - Hidden on mobile */}
              <div className="absolute -top-6 sm:-top-8 -left-2 sm:-left-4 text-6xl sm:text-8xl md:text-9xl font-black text-orange-200/30 leading-none select-none hidden sm:block">
                {user.name?.charAt(0) || 'U'}
              </div>
              
              <div className="relative z-10 space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-1.5 sm:w-2 h-12 sm:h-16 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
                  <div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-jet-stream-900 leading-tight">
                      {user.name}
                    </h1>
                    <p className="text-lg sm:text-xl text-jet-stream-600 font-medium mt-2">
                      Creative {user.role} & Visual Storyteller
                    </p>
                  </div>
                </div>
                
                {user.bio && (
                  <div className="bg-white/60 backdrop-blur-sm p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/40 shadow-lg max-w-full lg:max-w-lg">
                    <p className="text-jet-stream-800 text-sm sm:text-base lg:text-lg leading-relaxed font-medium">
                      {user.bio.substring(0, 150)}...
                    </p>
                    <div className="flex items-center mt-3 sm:mt-4 text-orange-600">
                      <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      <span className="text-xs sm:text-sm font-medium">Read full story</span>
                    </div>
                  </div>
                )}
                
                {/* Achievement highlights */}
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
                  <div className="flex items-center bg-gradient-to-r from-orange-400 to-orange-500 text-white px-3 sm:px-4 py-2 rounded-full shadow-lg">
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" />
                    <span className="font-semibold text-xs sm:text-sm">{user.merit_credits} Merit Points</span>
                  </div>
                  
                  {user.is_verified && (
                    <div className="flex items-center bg-gradient-to-r from-jet-stream-500 to-jet-stream-600 text-white px-3 sm:px-4 py-2 rounded-full shadow-lg">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" />
                      <span className="font-semibold text-xs sm:text-sm hidden sm:inline">Verified Professional</span>
                      <span className="font-semibold text-xs sm:text-sm sm:hidden">Verified</span>
                    </div>
                  )}
                  
                  <div className="flex items-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-3 sm:px-4 py-2 rounded-full shadow-lg">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 fill-current" />
                    <span className="font-semibold text-xs sm:text-sm">0 Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Artistic profile image section */}
          <div className="lg:col-span-5 relative order-first lg:order-last">
            <div className="relative mx-auto max-w-xs sm:max-w-md">
              {/* Artistic frame elements */}
              <div className="absolute -inset-6 sm:-inset-8 rounded-full">
                <svg viewBox="0 0 200 200" className="w-full h-full animate-pulse">
                  <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255, 165, 0, 0.2)" strokeWidth="1" strokeDasharray="5,5" />
                  <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(113, 159, 154, 0.3)" strokeWidth="2" strokeDasharray="3,7" />
                </svg>
              </div>
              
              {/* Main profile image */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-jet-stream-300 rounded-full transform rotate-6 opacity-40"></div>
                <div className="absolute inset-3 sm:inset-4 bg-gradient-to-tr from-jet-stream-200 to-orange-200 rounded-full transform -rotate-3 opacity-50"></div>
                
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 sm:border-8 border-white shadow-2xl">
                  {user.profile_picture ? (
                    <Image 
                      src={user.profile_picture} 
                      alt={user.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-jet-stream-400 to-jet-stream-600 flex items-center justify-center text-white text-4xl sm:text-6xl font-bold">
                      {user.name?.charAt(0) || 'U'}
                    </div>
                  )}
                </div>
                
                {/* Floating status elements */}
                <div className="absolute -top-3 sm:-top-4 -right-3 sm:-right-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full p-2.5 sm:p-4 shadow-xl border-2 sm:border-4 border-white">
                  <Camera className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
                </div>
                
                <div className="absolute -bottom-3 sm:-bottom-4 -left-3 sm:-left-4 bg-gradient-to-br from-jet-stream-500 to-jet-stream-600 rounded-full p-2 sm:p-3 shadow-xl border-2 sm:border-4 border-white">
                  <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-white fill-current" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Organic wave transition */}
    <div className="absolute bottom-0 left-0 w-full">
      <svg viewBox="0 0 1200 100" className="w-full h-12 sm:h-20 fill-jet-stream-100">
        <path d="M0,60 Q150,20 300,40 T600,35 Q750,30 900,45 T1200,40 L1200,100 L0,100 Z" />
      </svg>
    </div>
  </section>
);

// Skills & Expertise Showcase - Mobile Responsive
// const SkillsShowcase = ({ user }) => {
//   const skills = [
//     { name: 'Photography', level: 95, icon: Camera, color: 'orange' },
//     { name: 'Creative Direction', level: 90, icon: Palette, color: 'jet-stream' },
//     { name: 'Client Relations', level: 88, icon: Users, color: 'orange' },
//     { name: 'Post-Processing', level: 92, icon: Zap, color: 'jet-stream' }
//   ];

//   return (
//     <section className="relative py-12 sm:py-16 lg:py-20 bg-white">
//       {/* Organic scattered dots */}
//       <div className="absolute inset-0 overflow-hidden opacity-20">
//         <div className="absolute top-10 left-4 sm:left-10 w-2 h-2 sm:w-3 sm:h-3 bg-orange-400 rounded-full"></div>
//         <div className="absolute top-32 right-8 sm:right-20 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-jet-stream-400 rounded-full"></div>
//         <div className="absolute bottom-40 left-1/4 w-3 h-3 sm:w-4 sm:h-4 bg-orange-300 rounded-full"></div>
//         <div className="absolute bottom-20 right-1/3 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-jet-stream-300 rounded-full"></div>
//         <div className="absolute top-1/2 left-1/2 w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full"></div>
//       </div>
      
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
//           {/* Skills content */}
//           <div className="space-y-6 sm:space-y-8">
//             <div className="space-y-3 sm:space-y-4">
//               <div className="flex items-center space-x-3 justify-center lg:justify-start">
//                 <div className="w-8 sm:w-12 h-0.5 sm:h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
//                 <Coffee className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
//               </div>
//               <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-jet-stream-900 text-center lg:text-left">
//                 Skills & 
//                 <span className="block text-orange-600">Expertise</span>
//               </h2>
//               <p className="text-lg sm:text-xl text-jet-stream-600 leading-relaxed text-center lg:text-left">
//                 Years of dedication have shaped these core competencies that define my creative approach.
//               </p>
//             </div>
            
//             <div className="space-y-4 sm:space-y-6">
//               {skills.map((skill, index) => (
//                 <div key={index} className="group">
//                   <div className="flex items-center justify-between mb-2 sm:mb-3">
//                     <div className="flex items-center space-x-2 sm:space-x-3">
//                       <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br ${
//                         skill.color === 'orange' 
//                           ? 'from-orange-400 to-orange-600' 
//                           : 'from-jet-stream-400 to-jet-stream-600'
//                       } rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
//                         <skill.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                       </div>
//                       <span className="font-semibold text-jet-stream-900 text-base sm:text-lg">{skill.name}</span>
//                     </div>
//                     <span className="text-jet-stream-600 font-medium text-sm sm:text-base">{skill.level}%</span>
//                   </div>
                  
//                   <div className="h-2.5 sm:h-3 bg-jet-stream-100 rounded-full overflow-hidden">
//                     <div 
//                       className={`h-full bg-gradient-to-r ${
//                         skill.color === 'orange' 
//                           ? 'from-orange-400 to-orange-600' 
//                           : 'from-jet-stream-400 to-jet-stream-600'
//                       } rounded-full transition-all duration-1000 ease-out shadow-sm`}
//                       style={{ width: `${skill.level}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           {/* Contact card */}
//           <div className="relative">
//             <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-br from-orange-200 to-jet-stream-200 rounded-2xl sm:rounded-[3rem] transform rotate-2 opacity-30"></div>
//             <div className="relative bg-white p-6 sm:p-8 rounded-2xl sm:rounded-[3rem] border-2 border-jet-stream-200 shadow-2xl">
//               <div className="text-center mb-6 sm:mb-8">
//                 <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl sm:rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
//                   <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
//                 </div>
//                 <h3 className="text-xl sm:text-2xl font-bold text-jet-stream-900 mb-2">Let's Connect</h3>
//                 <p className="text-jet-stream-600 text-sm sm:text-base">Ready to bring your vision to life?</p>
//               </div>
              
//               <div className="space-y-3 sm:space-y-4">
//                 <div className="flex items-center p-3 sm:p-4 bg-gradient-to-r from-orange-50 to-jet-stream-50 rounded-xl sm:rounded-2xl border border-orange-100 hover:shadow-md transition-shadow">
//                   <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4 shadow-sm flex-shrink-0">
//                     <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//                   </div>
//                   <div className="min-w-0 flex-1">
//                     <p className="text-xs text-jet-stream-500 uppercase tracking-wider font-bold">Email</p>
//                     <p className="text-jet-stream-800 font-medium text-sm sm:text-base truncate">{user.email}</p>
//                   </div>
//                 </div>
                
//                 {user.phone && (
//                   <div className="flex items-center p-3 sm:p-4 bg-gradient-to-r from-jet-stream-50 to-orange-50 rounded-xl sm:rounded-2xl border border-jet-stream-100 hover:shadow-md transition-shadow">
//                     <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-jet-stream-500 to-jet-stream-600 rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4 shadow-sm flex-shrink-0">
//                       <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//                     </div>
//                     <div className="min-w-0 flex-1">
//                       <p className="text-xs text-jet-stream-500 uppercase tracking-wider font-bold">Phone</p>
//                       <p className="text-jet-stream-800 font-medium text-sm sm:text-base">{user.phone}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
              
//               <button className="w-full mt-4 sm:mt-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 text-sm sm:text-base">
//                 Start a Conversation
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

const UserProfileShowcase = ({ user }) => {
  // Sample user data - replace with actual user props
  const userData = {
    name: user?.name || "Alexandra Chen",
    email: user?.email || "alex@creative.studio", 
    phone: user?.phone || "+1 (555) 123-4567",
  
    memberSince: user?.memberSince || "loading",
    merits: user?.merit_credits || 0,
    credits: user?.credits || 0,
    activeGigs: user?.activeGigs || 0,
    totalBookings: user?.totalBookings || 0,
    rating: user?.rating || 0
  };

  const stats = [
    { 
      label: 'Member Since', 
      value: userData.memberSince, 
      icon: Clock, 
      color: 'orange',
      suffix: ''
    },
    { 
      label: 'Merit Points', 
      value: userData.merits.toLocaleString(), 
      icon: Award, 
      color: 'jet-stream',
      suffix: ''
    },
    
    { 
      label: 'Active Gigs', 
      value: userData.activeGigs, 
      icon: Briefcase, 
      color: 'jet-stream',
      suffix: ''
    },
    { 
      label: 'Total Bookings', 
      value: userData.totalBookings, 
      icon: Calendar, 
      color: 'orange',
      suffix: ''
    }
  ];

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-white">
      {/* Enhanced organic patterns */}
      <div className="absolute inset-0 overflow-hidden opacity-15">
        {/* Scattered organic dots */}
        <div className="absolute top-10 left-4 sm:left-10 w-2 h-2 sm:w-3 sm:h-3 bg-orange-400 rounded-full"></div>
        <div className="absolute top-32 right-8 sm:right-20 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-jet-stream-400 rounded-full"></div>
        <div className="absolute bottom-40 left-1/4 w-3 h-3 sm:w-4 sm:h-4 bg-orange-300 rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-jet-stream-300 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full"></div>
        
        {/* Bohemian wavy lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent transform -rotate-12"></div>
        <div className="absolute bottom-1/4 right-0 w-full h-px bg-gradient-to-r from-transparent via-jet-stream-300 to-transparent transform rotate-12"></div>
        
        {/* Additional scattered elements */}
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-orange-400 rounded-full"></div>
        <div className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-jet-stream-400 rounded-full"></div>
        <div className="absolute top-3/4 left-3/4 w-2 h-2 bg-orange-300 rounded-full opacity-60"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Profile stats content */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center space-x-3 justify-center lg:justify-start">
                <div className="w-8 sm:w-12 h-0.5 sm:h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
                <Coffee className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                <div className="w-4 sm:w-6 h-0.5 sm:h-1 bg-gradient-to-r from-jet-stream-400 to-jet-stream-600 rounded-full"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-jet-stream-900 text-center lg:text-left">
                Creative 
                <span className="block text-orange-600">Profile</span>
              </h2>
              <p className="text-lg sm:text-xl text-jet-stream-600 leading-relaxed text-center lg:text-left">
                Showcasing achievements, experience, and professional milestones.
              </p>
            </div>
            
            {/* User intro card */}
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-100 to-jet-stream-100 rounded-2xl transform -rotate-1 opacity-50"></div>
              <div className="relative bg-white p-4 sm:p-6 rounded-2xl border-2 border-orange-200 shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-jet-stream-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                    <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-jet-stream-900">{userData.name}</h3>
                    <div className="flex items-center space-x-2 text-jet-stream-600">
                      {/* <MapPin className="w-4 h-4" />
                      <span className="text-sm sm:text-base">{userData.location}</span> */}
                      <div className="flex items-center ml-4">
                        <Star className="w-4 h-4 text-orange-500 fill-current" />
                        <span className="text-sm font-medium ml-1">{userData.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stats grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-br from-orange-100 to-jet-stream-100 rounded-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <div className="relative bg-white p-4 rounded-xl border border-jet-stream-200 shadow-sm group-hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br ${
                        stat.color === 'orange' 
                          ? 'from-orange-400 to-orange-600' 
                          : 'from-jet-stream-400 to-jet-stream-600'
                      } rounded-lg flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                        <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-jet-stream-500 uppercase tracking-wider font-bold">{stat.label}</p>
                        <p className="text-lg sm:text-xl font-black text-jet-stream-900">
                          {stat.value}{stat.suffix}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Enhanced contact card */}
          <div className="relative">
            <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-br from-orange-200 to-jet-stream-200 rounded-2xl sm:rounded-[3rem] transform rotate-2 opacity-30"></div>
            <div className="absolute -inset-2 sm:-inset-3 bg-gradient-to-br from-jet-stream-200 to-orange-200 rounded-2xl sm:rounded-[3rem] transform -rotate-1 opacity-20"></div>
            <div className="relative bg-white p-6 sm:p-8 rounded-2xl sm:rounded-[3rem] border-2 border-jet-stream-200 shadow-2xl">
              {/* Decorative pattern inside card */}
              <div className="absolute top-4 right-4 opacity-10">
                <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                <div className="w-2 h-2 bg-jet-stream-400 rounded-full mt-2 ml-4"></div>
              </div>
              
              <div className="text-center mb-6 sm:mb-8">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl sm:rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-jet-stream-900 mb-2">Let's Connect</h3>
                <p className="text-jet-stream-600 text-sm sm:text-base">Ready to bring your vision to life?</p>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center p-3 sm:p-4 bg-gradient-to-r from-orange-50 to-jet-stream-50 rounded-xl sm:rounded-2xl border border-orange-100 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4 shadow-sm flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-jet-stream-500 uppercase tracking-wider font-bold">Email</p>
                    <p className="text-jet-stream-800 font-medium text-sm sm:text-base truncate">{userData.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 sm:p-4 bg-gradient-to-r from-jet-stream-50 to-orange-50 rounded-xl sm:rounded-2xl border border-jet-stream-100 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-jet-stream-500 to-jet-stream-600 rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4 shadow-sm flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-jet-stream-500 uppercase tracking-wider font-bold">Phone</p>
                    <p className="text-jet-stream-800 font-medium text-sm sm:text-base">{userData.phone}</p>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-4 sm:mt-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 text-sm sm:text-base relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-700 opacity-0 hover:opacity-100 transition-opacity"></div>
                <span className="relative">Start a Conversation</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Portfolio Masonry Layout - Mobile Responsive
const PortfolioMasonry = ({ gigs }) => {
  const router = useRouter();
  return(
    <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-jet-stream-50 via-orange-25 to-jet-stream-100">
      {/* Flowing background shapes */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 600">
          <path d="M0,100 Q250,50 500,120 T1000,80 L1000,0 L0,0 Z" fill="rgba(113, 159, 154, 0.1)" />
          <path d="M0,500 Q300,400 600,480 T1000,450 L1000,600 L0,600 Z" fill="rgba(255, 165, 0, 0.1)" />
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 rounded-full mr-3 sm:mr-4"></div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-jet-stream-900">Portfolio</h2>
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-jet-stream-500 rounded-full ml-3 sm:ml-4"></div>
          </div>
          <p className="text-lg sm:text-xl text-jet-stream-600 max-w-2xl mx-auto px-4">
            A curated selection of projects that showcase creativity, technical excellence, and storytelling mastery.
          </p>
        </div>
        
        {/* Responsive grid - mobile single column, tablet 2 columns, desktop 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {gigs.map((gig, index) => (
            <div key={index} className="group relative">
              <div className={`absolute -inset-1.5 sm:-inset-2 bg-gradient-to-br ${
                index % 3 === 0 ? 'from-orange-200 to-orange-300' :
                index % 3 === 1 ? 'from-jet-stream-200 to-jet-stream-300' :
                'from-yellow-200 to-yellow-300'
              } rounded-2xl sm:rounded-3xl transform rotate-1 group-hover:rotate-0 transition-transform duration-300 opacity-40`}></div>
              
              <div className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300 border-2 border-white">
                {/* Image */}
                <div className="relative overflow-hidden h-48 sm:h-56 md:h-64">
                  <Image 
                    src={gig.picture} 
                    alt={gig.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Overlay elements */}
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full shadow-sm">
                    <span className="text-xs sm:text-sm font-semibold text-jet-stream-700">${gig.min_price}+</span>
                  </div>
                  
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 flex items-center space-x-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-white text-xs sm:text-sm font-medium bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                      {gig.category}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-4 sm:p-6">
                  <h3 className="font-bold text-jet-stream-900 text-base sm:text-lg mb-2 sm:mb-3 leading-tight line-clamp-2">
                    {gig.title}
                  </h3>
                  <p className="text-jet-stream-600 text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                    {gig.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-yellow-600">
                      <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current mr-1" />
                      <span className="text-xs sm:text-sm font-semibold">{gig.rating}</span>
                      <span className="text-jet-stream-400 text-xs sm:text-sm ml-1">({gig.reviews})</span>
                    </div>
                    <button
                      className="flex items-center text-jet-stream-500 text-xs sm:text-sm hover:text-jet-stream-700 transition-colors"
                      onClick={() => router.push(`/gigs/${gig.gig_id}`)}
                    >
                      <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
                      <span>View</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* View all button */}
        <div className="text-center mt-8 sm:mt-12">
          <button 
            className="inline-flex items-center bg-gradient-to-r from-jet-stream-500 to-jet-stream-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 text-sm sm:text-base"
            onClick={() => router.push(`/skills`)}
          >
            <Target className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Explore Other Gigs
          </button>
        </div>
      </div>
    </section>
  );
};

// Statistics & Achievements - Mobile Responsive
const StatsSection = ({ user }) => {
  const stats = [
    { label: 'Projects Completed', value: '150+', icon: Target, color: 'orange' },
    { label: 'Happy Clients', value: '120+', icon: Users, color: 'jet-stream' },
    { label: 'Years Experience', value: '8+', icon: Calendar, color: 'orange' },
    { label: 'Awards Won', value: '12', icon: Trophy, color: 'jet-stream' }
  ];

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-jet-stream-900 overflow-hidden">
      {/* Organic flowing shapes */}
      <div className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="statsGrad1" cx="30%" cy="30%">
              <stop offset="0%" stopColor="rgba(255, 165, 0, 0.1)" />
              <stop offset="100%" stopColor="rgba(255, 140, 0, 0.02)" />
            </radialGradient>
            <radialGradient id="statsGrad2" cx="70%" cy="70%">
              <stop offset="0%" stopColor="rgba(113, 159, 154, 0.1)" />
              <stop offset="100%" stopColor="rgba(159, 193, 189, 0.02)" />
            </radialGradient>
          </defs>
          
          <ellipse cx="200" cy="100" rx="150" ry="80" fill="url(#statsGrad1)" transform="rotate(-20 200 100)" />
          <ellipse cx="1000" cy="300" rx="180" ry="100" fill="url(#statsGrad2)" transform="rotate(15 1000 300)" />
          <path d="M0,200 Q300,100 600,180 T1200,150" stroke="rgba(255, 165, 0, 0.1)" strokeWidth="2" fill="none" />
        </svg>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6">
            Numbers Tell
            <span className="block text-orange-400">The Story</span>
          </h2>
          <p className="text-lg sm:text-xl text-jet-stream-200 max-w-2xl mx-auto px-4">
            Every milestone represents countless hours of dedication and passion for the craft.
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="group text-center">
              <div className="relative inline-block mb-4 sm:mb-6">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br ${
                  stat.color === 'orange' 
                    ? 'from-orange-400 to-orange-600' 
                    : 'from-jet-stream-400 to-jet-stream-600'
                } rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300 border-2 sm:border-4 border-white/10`}>
                  <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                </div>
                
                {/* Floating ring */}
                <div className="absolute inset-0 rounded-full border-1 sm:border-2 border-white/20 scale-125 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="space-y-1 sm:space-y-2">
                <div className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black ${
                  stat.color === 'orange' ? 'text-orange-400' : 'text-jet-stream-300'
                }`}>
                  {stat.value}
                </div>
                <p className="text-white text-sm sm:text-base lg:text-lg font-medium px-2">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main Profile Page Component
export default function UserProfilePage() {
  const reviews = [
    {
      rating: 5,
      comment: "Sarah exceeded all our expectations! Her attention to detail and ability to capture candid moments made our wedding photos absolutely perfect. We couldn't be happier!",
      client_name: "Emily Rodriguez",
      project: "Wedding Photography"
    },
    {
      rating: 5,
      comment: "Professional, creative, and so easy to work with. The engagement photos turned out amazing and we use them everywhere!",
      client_name: "Michael Chen",
      project: "Engagement Session"
    },
    {
      rating: 4,
      comment: "Great experience working with Sarah for our corporate event. She was discreet and captured all the important moments beautifully.",
      client_name: "David Thompson",
      project: "Corporate Event"
    }
  ];
  
  const { id } = useParams(); // userId from URL

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    if (!id) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/profile/${id}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Failed to fetch profile");
        } else {
          setUser(data.user || null);
          setGigs(data.gigs || []);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Internal Server Error");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) return <LoadingProfile />;
  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-white text-2xl">!</span>
        </div>
        <p className="text-red-600 text-lg font-medium">{error}</p>
      </div>
    </div>
  );
  if (!user) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-16 h-16 bg-gray-400 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-white text-2xl">?</span>
        </div>
        <p className="text-gray-600 text-lg font-medium">No user found</p>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen">
      <FullwidthIconNavbar />
      <HeroBanner user={user} />
      <ContactDetails user={user} />
      <UserProfileShowcase user={user} />
      <PortfolioMasonry gigs={gigs} />
      <StatsSection user={user} />
      <ReviewsSection reviews={reviews} />
      <NewsletterFooter />
    </main>
  );
}