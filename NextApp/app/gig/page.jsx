
'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, MapPin, Clock, DollarSign, MessageCircle, Calendar, Phone, Mail, Globe } from 'lucide-react';
import { FullwidthIconNavbar } from '../_components/navbars/fullwidth-icon-navbar';
import { NewsletterFooter } from '../_components/footers/newsletter-footer';

// Individual Components
const Hero = ({ title, picture }) => (
  <section className="relative min-h-[70vh] overflow-hidden mt-11">
    {/* Abstract Bohemian Background Pattern */}
    <div className="absolute inset-0 bg-gradient-to-br from-jet-stream-100 via-jet-stream-200 to-jet-stream-300">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="blob1" cx="30%" cy="40%">
            <stop offset="0%" stopColor="rgba(113, 159, 154, 0.4)" />
            <stop offset="100%" stopColor="rgba(85, 133, 129, 0.1)" />
          </radialGradient>
          <radialGradient id="blob2" cx="70%" cy="60%">
            <stop offset="0%" stopColor="rgba(159, 193, 189, 0.3)" />
            <stop offset="100%" stopColor="rgba(74, 112, 110, 0.1)" />
          </radialGradient>
        </defs>
        <ellipse cx="200" cy="150" rx="180" ry="120" fill="url(#blob1)" transform="rotate(-15 200 150)" />
        <ellipse cx="600" cy="300" rx="220" ry="160" fill="url(#blob2)" transform="rotate(25 600 300)" />
        <path d="M100,400 Q300,200 500,380 T800,300" stroke="rgba(64, 94, 94, 0.2)" strokeWidth="2" fill="none" />
        <circle cx="150" cy="500" r="3" fill="rgba(255, 165, 0, 0.4)" />
        <circle cx="650" cy="100" r="4" fill="rgba(255, 140, 0, 0.3)" />
        <circle cx="400" cy="450" r="2" fill="rgba(255, 165, 0, 0.5)" />
      </svg>
    </div>
    
    {/* Dot Grid Pattern */}
    <div className="absolute top-20 right-20 opacity-20">
      <div className="grid grid-cols-8 gap-2">
        {[...Array(64)].map((_, i) => (
          <div key={i} className="w-1 h-1 bg-jet-stream-600 rounded-full"></div>
        ))}
      </div>
    </div>
    
    {/* Content Overlay with Gig Thumbnail */}
    <div className="relative z-10 flex items-center justify-center min-h-[70vh] px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Title Section */}
          <div className="text-center lg:text-left">
            <div className="inline-block p-8 rounded-3xl bg-white/20 backdrop-blur-sm border border-jet-stream-200/30">
              <h1 className="text-4xl md:text-5xl font-bold text-jet-stream-900 mb-4 leading-tight">
                <span className="bg-gradient-to-r from-jet-stream-700 to-jet-stream-500 bg-clip-text text-transparent">
                  {title}
                </span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto lg:mx-0 rounded-full"></div>
            </div>
          </div>
          
          {/* Gig Thumbnail */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-orange-300 rounded-3xl transform rotate-3 opacity-30"></div>
            <div className="relative">
              {picture && (
                <div className="relative h-80 rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                  <Image 
                    src={picture} 
                    alt={title}
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Flowing Wave Divider */}
    <div className="absolute bottom-0 left-0 w-full">
      <svg viewBox="0 0 1200 120" className="w-full h-16 fill-white">
        <path d="M0,60 C300,100 500,20 600,60 C700,100 900,20 1200,60 L1200,120 L0,120 Z" />
      </svg>
    </div>
  </section>
);

const GigInfo = ({ title, description, category }) => (
  <section className="relative py-16 bg-white">
    {/* Geometric Pattern Overlay */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute top-10 left-10 w-32 h-32 border-2 border-jet-stream-300 rounded-full transform rotate-12"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-jet-stream-200 transform rotate-45 rounded-lg"></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 border-4 border-jet-stream-400 transform rotate-45"></div>
    </div>
    
    <div className="max-w-6xl mx-auto px-6 relative z-10">
      <div className="grid lg:grid-cols-3 gap-12 items-start">
        {/* Description Section */}
        <div className="lg:col-span-2">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-jet-stream-300 to-jet-stream-500 rounded-full opacity-60"></div>
            <h2 className="text-3xl font-serif text-jet-stream-900 mb-6">About This Gig</h2>
            <div className="prose prose-lg text-jet-stream-700 leading-relaxed">
              <p className="text-lg whitespace-pre-line">{description}</p>
            </div>
          </div>
        </div>
        
        {/* Category Section */}
        <div className="lg:col-span-1">
          <div className="relative">
            {/* Abstract Shape Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-jet-stream-100 to-jet-stream-200 rounded-3xl transform rotate-2"></div>
            <div className="relative bg-white p-8 rounded-3xl border border-jet-stream-200 shadow-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-jet-stream-400 to-jet-stream-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-jet-stream-900 mb-2">Category</h3>
                <span className="inline-block px-6 py-2 bg-gradient-to-r from-jet-stream-400 to-jet-stream-600 text-white rounded-full text-lg font-medium">
                  {category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Pricing = ({ minPrice, avgPrice, availability }) => {
  const timeSlots = availability ? Object.entries(availability) : [];
  
  return (
    <section className="relative py-16 bg-gradient-to-br from-jet-stream-50 to-jet-stream-100">
      {/* Sharp Geometric Patterns */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute top-10 right-20 opacity-10">
          <div className="grid grid-cols-10 gap-1">
            {[...Array(100)].map((_, i) => (
              <div key={i} className={`w-1 h-1 ${i % 7 === 0 ? 'bg-orange-400' : 'bg-jet-stream-400'}`}></div>
            ))}
          </div>
        </div>
        
        {/* Organic Background Shapes */}
        <svg className="absolute -top-20 -right-20 w-80 h-80 opacity-10" viewBox="0 0 200 200">
          <path d="M100,20 C140,20 180,40 180,80 C180,120 160,160 120,180 C80,180 40,160 20,120 C20,80 40,40 80,20 C85,20 95,20 100,20 Z" fill="currentColor" className="text-jet-stream-600" />
        </svg>
        <svg className="absolute -bottom-10 -left-10 w-60 h-60 opacity-10" viewBox="0 0 200 200">
          <path d="M50,30 Q90,10 130,30 Q170,50 170,90 Q170,130 150,170 Q110,190 70,170 Q30,150 30,110 Q30,70 50,30" fill="currentColor" className="text-jet-stream-500" />
        </svg>
        
        {/* Orange Accent Elements */}
        <div className="absolute top-1/3 left-10 w-2 h-2 bg-orange-500 transform rotate-45"></div>
        <div className="absolute bottom-1/4 right-16 w-3 h-3 bg-orange-400 rounded-full"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Pricing Block */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-jet-stream-400 to-jet-stream-700 rounded-3xl transform -rotate-1"></div>
            <div className="relative bg-white p-8 rounded-3xl border-2 border-jet-stream-300 shadow-xl">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <DollarSign className="w-12 h-12 text-jet-stream-600" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full"></div>
                  </div>
                </div>
                <h3 className="text-2xl font-serif text-jet-stream-900 mb-6">Pricing</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-jet-stream-200">
                    <span className="text-jet-stream-700 font-medium">Starting from</span>
                    <span className="text-3xl font-bold text-jet-stream-600">${minPrice}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-jet-stream-700 font-medium">Average price</span>
                    <span className="text-2xl font-semibold text-jet-stream-500">${avgPrice}</span>
                  </div>
                </div>
                {/* Orange accent line */}
                <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto mt-4 rounded-full"></div>
              </div>
            </div>
          </div>
          
          {/* Availability Timeline */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-jet-stream-200 to-jet-stream-400 rounded-3xl transform rotate-1"></div>
            <div className="relative bg-white p-8 rounded-3xl border-2 border-jet-stream-300 shadow-xl">
              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <Calendar className="w-12 h-12 text-jet-stream-600" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full"></div>
                  </div>
                </div>
                <h3 className="text-2xl font-serif text-jet-stream-900">Availability</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.length > 0 ? timeSlots.map(([day, times], index) => (
                  <div key={index} className="bg-jet-stream-50 p-3 rounded-xl border border-jet-stream-200 relative">
                    {index === 0 && <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full"></div>}
                    <div className="text-sm font-semibold text-jet-stream-800 capitalize mb-1">{day}</div>
                    <div className="text-xs text-jet-stream-600">{Array.isArray(times) ? times.join(', ') : times}</div>
                  </div>
                )) : (
                  <div className="col-span-2 text-center text-jet-stream-600">
                    <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>Contact for availability</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


const SellerInfo = ({ seller }) => (
  <section className="relative py-16 bg-white">
    {/* Sharp Grid Pattern */}
    <div className="absolute top-10 left-10 opacity-5">
      <div className="grid grid-cols-6 gap-1">
        {[...Array(36)].map((_, i) => (
          <div key={i} className="w-2 h-2 bg-jet-stream-400"></div>
        ))}
      </div>
    </div>
    
    {/* Floating Elements with Orange Accents */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 right-10 w-4 h-4 bg-orange-400 rounded-full animate-pulse"></div>
      <div className="absolute top-40 left-20 w-6 h-6 bg-jet-stream-400 rounded-full opacity-60"></div>
      <div className="absolute bottom-32 right-1/4 w-3 h-3 bg-orange-500 rounded-full"></div>
      
      {/* Sharp Angular Patterns */}
      <div className="absolute bottom-20 left-10 w-8 h-8 border-2 border-jet-stream-300 transform rotate-45"></div>
      <div className="absolute top-32 right-1/3 w-6 h-6 bg-jet-stream-200 transform rotate-12"></div>
    </div>
    
    <div className="max-w-5xl mx-auto px-6 relative z-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif text-jet-stream-900">Meet Your Service Provider</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto mt-4 rounded-full"></div>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Section */}
        <div className="lg:col-span-1 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-jet-stream-100 to-jet-stream-200 rounded-[2rem] transform rotate-2"></div>
          <div className="relative bg-white p-8 rounded-[2rem] border border-jet-stream-200 shadow-lg">
            <div className="text-center">
              {/* Profile Picture */}
              <div className="relative w-24 h-24 mx-auto mb-4">
                {seller.profile_picture ? (
                  <Image 
                    src={seller.profile_picture} 
                    alt={seller.name}
                    fill
                    className="rounded-full object-cover border-4 border-jet-stream-200"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gradient-to-br from-jet-stream-500 to-jet-stream-700 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {seller.name?.charAt(0) || 'U'}
                  </div>
                )}
                {/* Verification Badge */}
                {seller.is_verified && (
                  <div className="absolute -top-1 -right-1 w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center border-2 border-white">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-semibold text-jet-stream-900 mb-1">{seller.name}</h3>
              <p className="text-jet-stream-600 text-sm mb-3 capitalize">{seller.role}</p>
              
              {/* Merit Credits */}
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center bg-gradient-to-r from-orange-100 to-orange-200 px-4 py-2 rounded-full">
                  <Star className="w-4 h-4 text-orange-500 mr-2" />
                  <span className="text-orange-700 font-medium">{seller.merit_credits} Credits</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bio & Details Section */}
        <div className="lg:col-span-2 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-jet-stream-200 to-jet-stream-300 rounded-[2rem] transform -rotate-1"></div>
          <div className="relative bg-white p-8 rounded-[2rem] border border-jet-stream-200 shadow-lg h-full">
            <div className="h-full flex flex-col">
              <h4 className="text-lg font-semibold text-jet-stream-900 mb-4 flex items-center">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                About the Provider
              </h4>
              
              {seller.bio ? (
                <p className="text-jet-stream-700 leading-relaxed mb-6 flex-grow">
                  {seller.bio}
                </p>
              ) : (
                <p className="text-jet-stream-500 italic mb-6 flex-grow">
                  This provider hasn't added a bio yet, but their work speaks for itself!
                </p>
              )}
              
              {/* Contact Information */}
              <div className="space-y-3">
                {seller.phone && (
                  <div className="flex items-center p-3 bg-jet-stream-50 rounded-xl border border-jet-stream-100">
                    <div className="w-10 h-10 bg-gradient-to-br from-jet-stream-400 to-jet-stream-600 rounded-full flex items-center justify-center mr-3">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-jet-stream-500 uppercase tracking-wider">Phone</p>
                      <p className="text-jet-stream-700 font-medium">{seller.phone}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center p-3 bg-jet-stream-50 rounded-xl border border-jet-stream-100">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mr-3">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-jet-stream-500 uppercase tracking-wider">Email</p>
                    <p className="text-jet-stream-700 font-medium">{seller.email}</p>
                  </div>
                </div>
                
                {/* Member Since */}
                <div className="flex items-center p-3 bg-gradient-to-r from-jet-stream-50 to-orange-50 rounded-xl border border-jet-stream-100">
                  <div className="w-10 h-10 bg-gradient-to-br from-jet-stream-600 to-jet-stream-700 rounded-full flex items-center justify-center mr-3">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-jet-stream-500 uppercase tracking-wider">Member Since</p>
                    <p className="text-jet-stream-700 font-medium">
                      {new Date(seller.created_at).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Rating = ({ rating }) => {
  const stars = Math.floor(rating || 0);
  const hasHalfStar = (rating || 0) % 1 >= 0.5;
  
  return (
    <section className="relative py-16 bg-gradient-to-r from-jet-stream-100 via-jet-stream-50 to-jet-stream-200">
      {/* Radial Pattern Background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 400">
          <defs>
            <radialGradient id="ratingGradient" cx="50%" cy="50%">
              <stop offset="0%" stopColor="rgba(85, 133, 129, 0.8)" />
              <stop offset="50%" stopColor="rgba(113, 159, 154, 0.4)" />
              <stop offset="100%" stopColor="rgba(187, 211, 208, 0.1)" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="200" r="150" fill="url(#ratingGradient)" />
          <circle cx="200" cy="200" r="100" fill="none" stroke="rgba(64, 94, 94, 0.2)" strokeWidth="1" />
          <circle cx="200" cy="200" r="50" fill="none" stroke="rgba(64, 94, 94, 0.2)" strokeWidth="1" />
        </svg>
      </div>
      
      <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-br from-jet-stream-200 to-jet-stream-400 rounded-3xl transform rotate-3 opacity-30"></div>
          <div className="relative bg-white/80 backdrop-blur-sm p-12 rounded-3xl border-2 border-jet-stream-300 shadow-xl">
            <h2 className="text-2xl font-serif text-jet-stream-900 mb-6">Customer Rating</h2>
            <div className="text-6xl font-bold text-jet-stream-600 mb-4">{rating?.toFixed(1) || 'N/A'}</div>
            <div className="flex justify-center items-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-8 h-8 ${
                    i < stars
                      ? 'text-yellow-400 fill-yellow-400'
                      : i === stars && hasHalfStar
                      ? 'text-yellow-400 fill-yellow-400 opacity-50'
                      : 'text-jet-stream-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-jet-stream-700 text-lg">
              {rating ? 'Highly rated by customers' : 'No ratings yet'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTA = () => (
  <section className="relative py-20 bg-jet-stream-900 overflow-hidden">
    {/* Abstract Pattern Background with Orange Accents */}
    <div className="absolute inset-0">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="ctaGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(113, 159, 154, 0.1)" />
            <stop offset="100%" stopColor="rgba(159, 193, 189, 0.05)" />
          </linearGradient>
          <linearGradient id="ctaGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(74, 112, 110, 0.1)" />
            <stop offset="100%" stopColor="rgba(64, 94, 94, 0.05)" />
          </linearGradient>
        </defs>
        
        {/* Abstract flowing shapes */}
        <path d="M0,200 Q300,50 600,150 T1200,100 L1200,400 L0,400 Z" fill="url(#ctaGradient1)" />
        <path d="M0,300 Q400,150 800,250 T1200,200 L1200,400 L0,400 Z" fill="url(#ctaGradient2)" />
        
        {/* Sharp geometric elements with orange */}
        <polygon points="200,80 240,100 200,120 160,100" fill="rgba(255, 165, 0, 0.1)" />
        <rect x="800" y="60" width="40" height="40" fill="rgba(159, 193, 189, 0.1)" transform="rotate(45 820 80)" />
        <circle cx="1000" cy="120" r="25" fill="rgba(255, 140, 0, 0.08)" />
        <rect x="150" y="300" width="30" height="30" fill="rgba(113, 159, 154, 0.08)" transform="rotate(30 165 315)" />
      </svg>
      
      {/* Dot grid pattern */}
      <div className="absolute bottom-20 right-20 opacity-10">
        <div className="grid grid-cols-6 gap-2">
          {[...Array(36)].map((_, i) => (
            <div key={i} className={`w-1 h-1 rounded-full ${i % 5 === 0 ? 'bg-orange-400' : 'bg-jet-stream-400'}`}></div>
          ))}
        </div>
      </div>
    </div>
    
    <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
      <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">
        Ready to Get Started?
      </h2>
      <p className="text-xl text-jet-stream-200 mb-12 max-w-2xl mx-auto">
        Connect with this talented service provider and bring your vision to life.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center justify-center">
            <MessageCircle className="w-6 h-6 mr-2" />
            Contact Seller
          </div>
        </button>
        
        <button className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-lg font-semibold rounded-2xl border-2 border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105">
          <div className="flex items-center justify-center">
            <Calendar className="w-6 h-6 mr-2" />
            Book Now
          </div>
          <div className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full"></div>
        </button>
      </div>
    </div>
  </section>
);

// Main Page Component
export default function GigDetailPage() {
  // Dummy data for demonstration - will work without routing
  const gig = {
    title: "Professional Wedding Photography",
    description: "Capture your special day with stunning, timeless photographs that tell your unique love story. With over 8 years of experience in wedding photography, I specialize in candid moments, artistic portraits, and breathtaking venue shots.\n\nMy approach combines photojournalistic storytelling with creative artistry, ensuring every precious moment is beautifully preserved. From intimate ceremonies to grand celebrations, I'll work closely with you to understand your vision and deliver images that exceed your expectations.",
    category: "Photography & Videography",
    min_price: 800,
    avg_price: 1200,
    availability: {
      "saturday": ["9:00 AM - 11:00 PM"],
      "sunday": ["10:00 AM - 8:00 PM"],
      "friday": ["2:00 PM - 11:00 PM"]
    },
    rating: 4.8,
    picture: "/api/placeholder/800/600"
  };

  // Dummy seller data based on users table structure
  const seller = {
    user_id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    name: "Sarah Johnson",
    email: "sarah.johnson@photography.com",
    phone: "+1 (555) 123-4567",
    profile_picture: "/api/placeholder/150/150",
    bio: "Passionate wedding photographer with 8+ years of experience capturing love stories. I believe every couple deserves to have their special moments preserved in the most beautiful way possible. My style blends candid photojournalism with artistic portraiture to create timeless images that will be treasured for generations.",
    merit_credits: 4850,
    is_verified: true,
    role: "photographer",
    created_at: "2019-03-15T10:30:00Z",
    updated_at: "2024-12-01T14:20:00Z"
  };

  return (
    <main className="min-h-screen">
      <FullwidthIconNavbar />
      <Hero title={gig.title} picture={gig.picture} />
      <GigInfo 
        title={gig.title} 
        description={gig.description} 
        category={gig.category} 
      />
      <Pricing 
        minPrice={gig.min_price} 
        avgPrice={gig.avg_price} 
        availability={gig.availability} 
      />
      <SellerInfo seller={seller} />
      <Rating rating={gig.rating} />
      <CTA />
       <NewsletterFooter />
    </main>
  );
}