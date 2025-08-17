"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

import { Linkedin, Github, Users, Zap, Globe, ArrowRight, Home, Building, Trees } from 'lucide-react';
import React from 'react';
import { Card,CardContent } from '../_components/ui/card';
import { Button } from '../_components/ui/button';

// 3D Isometric City Component
const IsometricCityscape = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-80 h-80 mx-auto perspective-1000">
      <div 
        className="absolute inset-0 transform-style-3d animate-spin-slow"
        style={{
          transform: `rotateX(60deg) rotateY(${scrollY * 0.1}deg) rotateZ(45deg)`
        }}
      >
        {/* Base Platform */}
        <div className="absolute w-60 h-60 bg-gradient-to-br from-jet-stream-400/30 to-jet-stream-600/50 transform translate-x-10 translate-y-10 shadow-2xl border border-jet-stream-400/20" />
        
        {/* Houses */}
        <div className="absolute w-12 h-12 bg-gradient-to-t from-jet-stream-600 to-jet-stream-400 transform translate-x-16 translate-y-16 -translate-z-6 shadow-lg">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-b-6 border-l-transparent border-r-transparent border-b-jet-stream-300" />
          <Home className="w-8 h-8 text-white/80 absolute top-1 left-1" />
        </div>
        
        <div className="absolute w-10 h-16 bg-gradient-to-t from-jet-stream-700 to-jet-stream-500 transform translate-x-32 translate-y-20 -translate-z-8 shadow-lg">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-5 border-r-5 border-b-6 border-l-transparent border-r-transparent border-b-jet-stream-300" />
          <Building className="w-6 h-6 text-white/70 absolute top-2 left-1" />
        </div>
        
        <div className="absolute w-8 h-8 bg-gradient-to-t from-jet-stream-800 to-jet-stream-600 transform translate-x-40 translate-y-32 -translate-z-4 shadow-lg">
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-jet-stream-400" />
        </div>
        
        {/* Market Stalls */}
        <div className="absolute w-16 h-8 bg-gradient-to-b from-orange-500 to-orange-600 transform translate-x-20 translate-y-28 -translate-z-3 shadow-lg">
          <div className="absolute inset-1 bg-orange-400/30 text-xs text-white/80 flex items-center justify-center">Market</div>
        </div>
        
        {/* Trees */}
        <div className="absolute transform translate-x-12 translate-y-24 -translate-z-2">
          <div className="w-3 h-8 bg-gradient-to-t from-green-800 to-green-600 shadow-lg" />
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <Trees className="w-6 h-6 text-green-400" />
          </div>
        </div>
        
        <div className="absolute transform translate-x-44 translate-y-16 -translate-z-2">
          <div className="w-2 h-6 bg-gradient-to-t from-green-900 to-green-700 shadow-lg" />
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Trees className="w-5 h-5 text-green-500" />
          </div>
        </div>
        
        {/* Community Center */}
        <div className="absolute w-20 h-14 bg-gradient-to-t from-jet-stream-500 to-jet-stream-300 transform translate-x-28 translate-y-36 -translate-z-10 shadow-xl">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-10 border-r-10 border-b-8 border-l-transparent border-r-transparent border-b-jet-stream-200" />
          <div className="absolute inset-2 bg-jet-stream-400/30 text-xs text-white flex items-center justify-center font-bold">Community</div>
          <Users className="w-6 h-6 text-white/90 absolute bottom-1 right-1" />
        </div>
        
        {/* Roads */}
        <div className="absolute w-48 h-2 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 transform translate-x-16 translate-y-44 shadow-inner" />
        <div className="absolute w-2 h-36 bg-gradient-to-b from-gray-600 via-gray-500 to-gray-600 transform translate-x-36 translate-y-20 shadow-inner" />
      </div>
    </div>
  );
};

// Parallax Background Layers
const ParallaxLayer = ({ children, speed = 0.5, className = "" }) => {
  const [offsetY, setOffsetY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setOffsetY(window.pageYOffset);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={className}
      style={{ transform: `translateY(${offsetY * speed}px)` }}
    >
      {children}
    </div>
  );
};

// Animated Section Separator
const SectionSeparator = () => {
  const [isVisible, setIsVisible] = useState(false);
  const separatorRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (separatorRef.current) observer.observe(separatorRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={separatorRef} className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className={`h-px bg-gradient-to-r from-transparent via-jet-stream-400 to-transparent transition-all duration-2000 ${
            isVisible ? 'w-full opacity-100' : 'w-0 opacity-0'
          }`}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className={`w-4 h-4 bg-jet-stream-400 rounded-full transition-all duration-1000 delay-1000 ${
            isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
        />
      </div>
    </div>
  );
};

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Arjun Sharma",
      role: "Co-Founder & CEO",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4f0325f-5958-42aa-a841-f191ceb5b1cc/generated_images/professional-headshot-portrait-of-a-youn-ff470b8d-20250817071754.jpg",
      linkedin: "#",
      github: "#"
    },
    {
      name: "Priya Patel",
      role: "Co-Founder & CTO",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4f0325f-5958-42aa-a841-f191ceb5b1cc/generated_images/professional-headshot-portrait-of-a-youn-6970b91c-20250817071802.jpg",
      linkedin: "#",
      github: "#"
    },
    {
      name: "Rohit Gupta",
      role: "Lead Developer",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4f0325f-5958-42aa-a841-f191ceb5b1cc/generated_images/professional-headshot-portrait-of-a-youn-bd40209f-20250817071810.jpg",
      linkedin: "#",
      github: "#"
    },
    {
      name: "Sneha Reddy",
      role: "Head of Design",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/original/project-uploads/e4f0325f-5958-42aa-a841-f191ceb5b1cc/generated_images/professional-headshot-portrait-of-a-youn-a200b400-20250817071818.jpg",
      linkedin: "#",
      github: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-jet-stream-1000 via-jet-stream-900 to-jet-stream-1000 text-white overflow-hidden relative">
      {/* Enhanced Parallax Background */}
      <div className="fixed inset-0 pointer-events-none">
        <ParallaxLayer speed={0.2}>
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-radial from-jet-stream-400/10 via-jet-stream-400/5 to-transparent rounded-full blur-3xl" />
        </ParallaxLayer>
        <ParallaxLayer speed={0.3}>
          <div className="absolute bottom-40 right-20 w-80 h-80 bg-gradient-radial from-orange-500/10 via-orange-500/5 to-transparent rounded-full blur-3xl" />
        </ParallaxLayer>
        <ParallaxLayer speed={0.1}>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-screen bg-gradient-conic from-jet-stream-400/5 via-transparent to-jet-stream-400/5 opacity-30" />
        </ParallaxLayer>
        
        {/* Floating Geometric Shapes */}
        <ParallaxLayer speed={0.4}>
          <div className="absolute top-1/4 right-1/3 w-8 h-8 bg-jet-stream-400/30 transform rotate-45 animate-pulse" />
          <div className="absolute bottom-1/3 left-1/5 w-6 h-24 bg-gradient-to-t from-jet-stream-400/20 to-transparent transform rotate-12 animate-bounce" />
          <div className="absolute top-2/3 right-1/5 w-12 h-12 border-2 border-jet-stream-400/40 transform rotate-45 animate-spin-slow" />
        </ParallaxLayer>
      </div>

      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="text-center z-10 max-w-6xl">
          <h1 className="font-display text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-jet-stream-300 to-jet-stream-400 bg-clip-text text-transparent leading-tight animate-fade-in">
            About SkillAmigo
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 mb-6 leading-relaxed animate-slide-up">
            India's pioneering hyperlocal skill-sharing platform connecting communities through technology.
          </p>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto animate-slide-up delay-200">
            Empowering every society to discover, share, and monetize skills within their neighborhood.
          </p>
        </div>
      </section>

      <SectionSeparator />

      {/* Enhanced Mission & Vision with 3D Cityscape */}
      <section className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* 3D Isometric Cityscape */}
            <div className="flex justify-center relative">
              <div className="relative">
                {/* Ambient Glow */}
                <div className="absolute inset-0 bg-gradient-radial from-jet-stream-400/20 via-jet-stream-400/10 to-transparent blur-2xl scale-150" />
                
                {/* Main Cityscape */}
                <IsometricCityscape />
                
                {/* Floating Particles */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-jet-stream-400/60 rounded-full animate-float"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: `${3 + Math.random() * 2}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Mission & Vision */}
            <div className="space-y-16">
              <div className="transform hover:scale-105 transition-transform duration-500">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gradient-to-r from-jet-stream-400/20 to-jet-stream-600/20 rounded-xl mr-6">
                    <Zap className="w-8 h-8 text-jet-stream-400" />
                  </div>
                  <h2 className="font-display text-4xl font-bold text-white">Our Mission</h2>
                </div>
                <p className="text-2xl text-jet-stream-300 font-medium leading-relaxed mb-6">
                  Empowering hyperlocal communities through technology.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed">
                  We bridge the gap between skill seekers and providers within residential societies, 
                  fostering economic growth and community bonds through innovative digital solutions.
                </p>
              </div>

              <div className="transform hover:scale-105 transition-transform duration-500">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-xl mr-6">
                    <Globe className="w-8 h-8 text-orange-400" />
                  </div>
                  <h2 className="font-display text-4xl font-bold text-white">Our Vision</h2>
                </div>
                <p className="text-2xl text-orange-300 font-medium leading-relaxed mb-6">
                  A future where every society in India is digitally connected and collaborative.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Transforming residential communities into thriving digital ecosystems where 
                  neighbors become partners in growth and success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionSeparator />

      {/* Enhanced Team Section */}
      <section className="py-32 px-4 relative">
        <ParallaxLayer speed={0.2}>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-jet-stream-900/50 via-transparent to-jet-stream-800/50 pointer-events-none" />
        </ParallaxLayer>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20">
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-jet-stream-300 to-orange-400 bg-clip-text text-transparent">
              Meet Our Team
            </h2>
            <p className="text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Passionate innovators building the future of hyperlocal communities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {teamMembers.map((member, index) => (
              <Card
                key={index} 
                className="bg-gradient-to-br from-jet-stream-900/80 to-jet-stream-800/80 border-jet-stream-700/50 hover:border-jet-stream-400/80 transition-all duration-500 hover:shadow-2xl hover:shadow-jet-stream-400/30 hover:-translate-y-4 hover:rotate-1 group backdrop-blur-sm"
              >
                <CardContent className="p-8 text-center relative overflow-hidden">
                  {/* Card Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-jet-stream-400/0 via-jet-stream-400/5 to-jet-stream-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative mb-8">
                    <div className="w-36 h-36 mx-auto rounded-full overflow-hidden bg-jet-stream-800 border-4 border-jet-stream-600/50 group-hover:border-jet-stream-400/80 transition-all duration-500 shadow-xl">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-r from-jet-stream-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse shadow-lg" />
                  </div>
                  
                  <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-jet-stream-300 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-jet-stream-400 mb-6 font-medium text-lg">
                    {member.role}
                  </p>
                  
                  <div className="flex justify-center space-x-6">
                    <a 
                      href={member.linkedin}
                      className="p-2 bg-jet-stream-800/50 rounded-full text-gray-400 hover:text-jet-stream-400 hover:bg-jet-stream-700/50 transition-all duration-300 hover:scale-110 transform"
                    >
                      <Linkedin className="w-6 h-6" />
                    </a>
                    <a 
                      href={member.github}
                      className="p-2 bg-jet-stream-800/50 rounded-full text-gray-400 hover:text-jet-stream-400 hover:bg-jet-stream-700/50 transition-all duration-300 hover:scale-110 transform"
                    >
                      <Github className="w-6 h-6" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Closing Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-jet-stream-900 via-jet-stream-800 to-jet-stream-1000" />
        <ParallaxLayer speed={0.1}>
          <div className="absolute inset-0 bg-gradient-conic from-orange-500/10 via-transparent to-jet-stream-400/10" />
        </ParallaxLayer>
        
        <div className="relative max-w-5xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-white via-jet-stream-300 to-orange-400 bg-clip-text text-transparent leading-tight">
            Together, we're building the future of hyperlocal communities in India.
          </h2>
          
          <p className="text-2xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed">
            Join us in revolutionizing how communities connect, collaborate, and grow together through the power of technology and human connection.
          </p>
          
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-16 py-8 text-xl font-semibold shadow-2xl hover:shadow-orange-500/30 transition-all duration-500 hover:scale-110 group border-0 rounded-full"
          >
            <Link href="/contact" className="flex items-center">
              Get in Touch
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}