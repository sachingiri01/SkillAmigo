


"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Linkedin, Github, Users, Zap, Globe, ArrowRight, Target, Heart, Award, Lightbulb, Rocket, Star } from 'lucide-react';
import React from 'react';
import { Card, CardContent } from '../_components/ui/card';
import { Button } from '../_components/ui/button';
import { NewsletterFooter } from '../_components/footers/newsletter-footer';
import { FullwidthIconNavbar } from '../_components/navbars/fullwidth-icon-navbar';

// 3D Floating Network Nodes
const FloatingNetworkNodes = () => {
  const [scrollY, setScrollY] = useState(0);
    const [nodeParticles, setNodeParticles] = useState({});
const [hasMounted, setHasMounted] = useState(false);
  
 

  useEffect(() => {
    setHasMounted(true); // ✅
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!hasMounted) return; // ✅
    const newParticles = {};
    nodes.forEach((node) => {
      newParticles[node.id] = [...Array(3)].map((_, i) => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${node.delay + i * 0.5}s`,
        duration: `${2 + Math.random() * 2}s`
      }));
    });
    setNodeParticles(newParticles);
  }, []);


  const nodes = [
    { id: 1, x: 20, y: 30, size: 'large', delay: 0, icon: Users },
    { id: 2, x: 70, y: 20, size: 'medium', delay: 1, icon: Zap },
    { id: 3, x: 80, y: 60, size: 'small', delay: 2, icon: Globe },
    { id: 4, x: 30, y: 70, size: 'medium', delay: 0.5, icon: Target },
    { id: 5, x: 60, y: 40, size: 'large', delay: 1.5, icon: Heart },
    { id: 6, x: 15, y: 55, size: 'small', delay: 2.5, icon: Award },
  ];

  const connections = [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 5 },
    { from: 1, to: 4 },
    { from: 4, to: 5 },
    { from: 5, to: 6 },
  ];

  return (
    <div className="relative w-96 h-96 mx-auto perspective-1000">
      <div 
        className="absolute inset-0 transform-style-3d"
        style={{
          transform: `rotateX(15deg) rotateY(${15 + scrollY * 0.05}deg) rotateZ(5deg)`
        }}
      >
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {connections.map((connection, index) => {
            const fromNode = nodes.find(n => n.id === connection.from);
            const toNode = nodes.find(n => n.id === connection.to);
            if (!fromNode || !toNode) return null;
            
            return (
              <line
                key={index}
                x1={`${fromNode.x}%`}
                y1={`${fromNode.y}%`}
                x2={`${toNode.x}%`}
                y2={`${toNode.y}%`}
                stroke="rgba(159, 193, 189, 0.4)"
                strokeWidth="2"
                strokeDasharray="5,5"
                className="animate-pulse"
                style={{
                  animationDelay: `${index * 0.5}s`
                }}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => {
          const Icon = node.icon;
          const sizeClass = {
            small: 'w-12 h-12',
            medium: 'w-16 h-16',
            large: 'w-20 h-20'
          }[node.size];
          
          const iconSize = {
            small: 'w-5 h-5',
            medium: 'w-6 h-6',
            large: 'w-8 h-8'
          }[node.size];

          return (
            <div
              key={node.id}
              className={`absolute ${sizeClass} bg-gradient-to-br from-white/90 to-jet-stream-100/90 backdrop-blur-sm border-2 border-jet-stream-300/50 rounded-full flex items-center justify-center shadow-2xl hover:shadow-jet-stream-400/30 transition-all duration-500 hover:scale-110 cursor-pointer z-20`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: `translate(-50%, -50%) translateZ(${20 + Math.sin(scrollY * 0.01 + node.delay) * 10}px)`,
                animationDelay: `${node.delay}s`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-jet-stream-400/20 to-orange-400/20 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300" />
              <Icon className={`${iconSize} text-jet-stream-600 relative z-10`} />
              
              
             {/* Floating particles around nodes */}
{nodeParticles[node.id]?.map((p, i) => (
  <div
    key={i}
    className="absolute w-1 h-1 bg-jet-stream-600/60 rounded-full animate-ping"
    style={{
      left: p.left,
      top: p.top,
      animationDelay: p.delay,
      animationDuration: p.duration
    }}
  />
))}

            </div>
          );
        })}

        {/* Central hub */}
        <div
          className="absolute w-24 h-24 bg-gradient-to-br from-orange-400/90 to-orange-600/90 backdrop-blur-sm border-3 border-orange-300/60 rounded-full flex items-center justify-center shadow-2xl z-30"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) translateZ(30px) rotateY(${scrollY * 0.1}deg)`
          }}
        >
          <Rocket className="w-10 h-10 text-white animate-bounce" />
          <div className="absolute inset-0 bg-gradient-conic from-orange-400/30 via-transparent to-orange-400/30 rounded-full animate-spin-slow" />
        </div>
      </div>
    </div>
  );
};

// 3D Skill Cards Animation
const SkillCard3D = ({ icon: Icon, title, description, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const cardRef = useRef(null);

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

  return (
    <div
      ref={cardRef}
      className="relative group perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative w-full h-64 transform-style-3d transition-all duration-700 ${
          isHovered ? 'rotateY-12 rotateX-6' : 'rotateY-0 rotateX-0'
        }`}
        style={{
          transform: `rotateY(${isHovered ? 12 : scrollProgress * 5}deg) rotateX(${isHovered ? -6 : scrollProgress * 3}deg) translateZ(${isHovered ? 20 : 0}px)`,
          transitionDelay: `${index * 100}ms`
        }}
      >
        {/* Card Shadow */}
        <div className="absolute inset-0 bg-jet-stream-900/20 blur-xl transform translate-y-4 translate-x-4 opacity-50" />
        
        {/* Main Card */}
        <Card className="relative bg-gradient-to-br from-white/95 to-jet-stream-50/95 border-2 border-jet-stream-200/60 shadow-2xl hover:shadow-jet-stream-400/20 transition-all duration-500 h-full">
          <CardContent className="p-6 h-full flex flex-col justify-between relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-jet-stream-100/50 to-transparent rounded-full -translate-y-10 translate-x-10 opacity-60" />
            
            {/* Icon */}
            <div className="relative mb-4">
              <div className={`w-16 h-16 bg-gradient-to-br from-jet-stream-400/20 to-orange-400/20 rounded-xl flex items-center justify-center transition-all duration-300 ${isHovered ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}`}>
                <Icon className="w-8 h-8 text-jet-stream-600" />
              </div>
              {isHovered && (
                <div className="absolute inset-0 bg-gradient-to-br from-jet-stream-400/30 to-orange-400/30 rounded-xl animate-pulse" />
              )}
            </div>

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-jet-stream-900 mb-3 group-hover:text-jet-stream-700 transition-colors duration-300">
                {title}
              </h3>
              <p className="text-jet-stream-600 leading-relaxed group-hover:text-jet-stream-700 transition-colors duration-300">
                {description}
              </p>
            </div>

            {/* Floating Elements */}
            {isHovered && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-jet-stream-600/60 rounded-full animate-ping"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${20 + i * 15}%`,
                      animationDelay: `${i * 0.2}s`
                    }}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Parallax Background Layers
const ParallaxLayer = ({ children, speed = 0.5, className = "" }) => {
  const [offsetY, setOffsetY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setOffsetY(window.pageYOffset);
    window.addEventListener('scroll', handleScroll, { passive: true });
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
      name: "Aman Kumar",
      role: "“Ctrl+C, Ctrl+Zen – The Chill Code Whisperer.”",
      image: "/am.jpg",
      linkedin: "#",
      github: "#"
    },
    {
      name: "Sachin Giri",
      role: "“Algorithm Alchemist – turning data into predictions like magic.”",
      image: "/sa.jpg",
      linkedin: "#",
      github: "#"
    },
    {
      name: "Ashish Ranjan",
      role: "“Bug Slayer 4040 – powered by coffee and sarcasm.”",
      image: "/as.jpg",
      linkedin: "#",
      github: "#"
    },
    {
      name: "Ajeet Kumar",
      role: "“Future on speed-dial – The Vision Hacker.”",
      image: "/aj.jpg",
      linkedin: "#",
      github: "#"
    }
  ];

  const values = [
    {
      icon: Users,
      title: "Community First",
      description: "Every decision we make prioritizes the needs and growth of local communities across India."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We constantly push boundaries to create cutting-edge solutions for hyperlocal connectivity."
    },
    {
      icon: Heart,
      title: "Trust & Safety",
      description: "Building secure, verified networks where neighbors can connect with complete confidence."
    },
    {
      icon: Star,
      title: "Excellence",
      description: "Delivering exceptional experiences that exceed expectations and drive meaningful impact."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-jet-stream-50 via-white to-jet-stream-100 text-jet-stream-900 overflow-hidden relative">
      <FullwidthIconNavbar />
      
      {/* Enhanced Parallax Background */}
      <div className="fixed inset-0 pointer-events-none">
        <ParallaxLayer speed={0.2}>
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-radial from-jet-stream-200/30 via-jet-stream-100/20 to-transparent rounded-full blur-3xl" />
        </ParallaxLayer>
        <ParallaxLayer speed={0.3}>
          <div className="absolute bottom-40 right-20 w-80 h-80 bg-gradient-radial from-orange-200/30 via-orange-100/20 to-transparent rounded-full blur-3xl" />
        </ParallaxLayer>
        <ParallaxLayer speed={0.1}>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-screen bg-gradient-conic from-jet-stream-100/20 via-transparent to-jet-stream-100/20 opacity-50" />
        </ParallaxLayer>
        
        {/* Floating Geometric Shapes */}
        <ParallaxLayer speed={0.4}>
          <div className="absolute top-1/4 right-1/3 w-8 h-8 bg-jet-stream-300/40 transform rotate-45 animate-pulse" />
          <div className="absolute bottom-1/3 left-1/5 w-6 h-24 bg-gradient-to-t from-jet-stream-300/30 to-transparent transform rotate-12 animate-bounce" />
          <div className="absolute top-2/3 right-1/5 w-12 h-12 border-2 border-jet-stream-300/50 transform rotate-45 animate-spin-slow" />
        </ParallaxLayer>

        {/* Light Grid Background */}
        <div className="absolute inset-0 pattern-grid opacity-90" />
      </div>

      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="text-center z-10 max-w-6xl">
          <h1 className="font-display text-4xl sm:text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-jet-stream-900 via-jet-stream-600 to-orange-600 bg-clip-text text-transparent leading-tight ">
            About SkillAmigo
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-jet-stream-700 mb-6 leading-relaxed ">
            India's pioneering hyperlocal skill-sharing platform connecting communities through technology.
          </p>
          <p className="text-lg sm:text-xl text-jet-stream-600 max-w-3xl mx-auto  delay-200">
            Empowering every society to discover, share, and monetize skills within their neighborhood.
          </p>
        </div>
      </section>

      <SectionSeparator />

      {/* Enhanced Mission & Vision with 3D Network */}
      <section className="py-20 sm:py-32 px-4 relative ">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* 3D Floating Network */}
            <div className="flex justify-center relative order-2 lg:order-1">
              <div className="relative">
                {/* Ambient Glow */}
                <div className="absolute inset-0 bg-gradient-radial from-jet-stream-300/20 via-jet-stream-200/10 to-transparent blur-2xl scale-150" />
                
                {/* Main Network */}
                <FloatingNetworkNodes />
                
                {/* Floating Particles */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-jet-stream-400/60 rounded-full animate-ping"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.3}s`,
                        animationDuration: `${2 + Math.random() * 2}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Mission & Vision */}
            <div className="space-y-12 sm:space-y-16 order-1 lg:order-2">
              <div className="transform hover:scale-105 transition-transform duration-500">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gradient-to-r from-jet-stream-200/60 to-jet-stream-300/60 rounded-xl mr-6 shadow-lg">
                    <Target className="w-8 h-8 text-jet-stream-600" />
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-jet-stream-900">Our Mission</h2>
                </div>
                <p className="text-xl sm:text-2xl text-jet-stream-700 font-medium leading-relaxed mb-6">
                  Empowering hyperlocal communities through technology.
                </p>
                <p className="text-jet-stream-600 text-base sm:text-lg leading-relaxed">
                  We bridge the gap between skill seekers and providers within residential societies, 
                  fostering economic growth and community bonds through innovative digital solutions.
                </p>
              </div>

              <div className="transform hover:scale-105 transition-transform duration-500">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gradient-to-r from-orange-200/60 to-orange-300/60 rounded-xl mr-6 shadow-lg">
                    <Globe className="w-8 h-8 text-orange-600" />
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-jet-stream-900">Our Vision</h2>
                </div>
                <p className="text-xl sm:text-2xl text-orange-700 font-medium leading-relaxed mb-6">
                  A future where every society in India is digitally connected and collaborative.
                </p>
                <p className="text-jet-stream-600 text-base sm:text-lg leading-relaxed">
                  Transforming residential communities into thriving digital ecosystems where 
                  neighbors become partners in growth and success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionSeparator />

      {/* Values Section with 3D Cards */}
      <section className="py-20 sm:py-32 px-4 relative ">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-jet-stream-900 via-jet-stream-600 to-orange-600 bg-clip-text text-transparent">
              Our Values
            </h2>
            <p className="text-xl sm:text-2xl text-jet-stream-600 max-w-3xl mx-auto leading-relaxed">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <SkillCard3D
                key={index}
                icon={value.icon}
                title={value.title}
                description={value.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <SectionSeparator />

      {/* Enhanced Team Section */}
      <section className="py-20 sm:py-32 px-4 relative ">
        <ParallaxLayer speed={0.2}>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-jet-stream-100/30 via-transparent to-jet-stream-200/30 pointer-events-none" />
        </ParallaxLayer>
        
        <div className="max-w-7xl mx-auto relative ">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-jet-stream-900 via-jet-stream-600 to-orange-600 bg-clip-text text-transparent">
              Meet Our Team
            </h2>
            <p className="text-xl sm:text-2xl text-jet-stream-600 max-w-3xl mx-auto leading-relaxed">
              Passionate innovators building the future of hyperlocal communities
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {teamMembers.map((member, index) => (
              <Card
                key={index} 
                className="bg-gradient-to-br from-white/95 to-jet-stream-300/95 border-2 border-jet-stream-200/60 hover:border-jet-stream-900/60 transition-all duration-500 hover:shadow-2xl hover:shadow-jet-stream-400/20 hover:-translate-y-4 hover:rotate-1 group backdrop-blur-sm"
              >
                <CardContent className="p-6 sm:p-8 text-center relative overflow-hidden">
                  {/* Card Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-jet-stream-400/0 via-jet-stream-400/5 to-jet-stream-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative mb-6 sm:mb-8">
                    <div className="w-24 h-24 sm:w-36 sm:h-36 mx-auto rounded-full overflow-hidden bg-jet-stream-100 border-4 border-jet-stream-300/50 group-hover:border-jet-stream-400/80 transition-all duration-500 shadow-xl">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-jet-stream-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse shadow-lg" />
                  </div>
                  
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-jet-stream-900 mb-3 group-hover:text-jet-stream-700 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-jet-stream-600 mb-6 font-medium text-base sm:text-lg">
                    {member.role}
                  </p>
                  
                  <div className="flex justify-center space-x-4 sm:space-x-6">
                    <a 
                      href={member.linkedin}
                      className="p-2 bg-jet-stream-200/50 rounded-full text-jet-stream-600 hover:text-jet-stream-700 hover:bg-jet-stream-300/50 transition-all duration-300 hover:scale-110 transform"
                    >
                      <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                    </a>
                    <a 
                      href={member.github}
                      className="p-2 bg-jet-stream-200/50 rounded-full text-jet-stream-600 hover:text-jet-stream-700 hover:bg-jet-stream-300/50 transition-all duration-300 hover:scale-110 transform"
                    >
                      <Github className="w-5 h-5 sm:w-6 sm:h-6" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Closing Section */}
      <section className="py-20 sm:py-32 px-4 relative overflow-hidden bg-gradient-to-b from-jet-stream-50 to-jet-stream-100">
        <div className="absolute inset-0 bg-gradient-to-br from-jet-stream-100 via-white to-jet-stream-200" />
        <ParallaxLayer speed={0.1}>
          <div className="absolute inset-0 bg-gradient-conic from-orange-100/30 via-transparent to-jet-stream-100/30" />
        </ParallaxLayer>
        
        <div className="relative max-w-5xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold mb-8 sm:mb-12 bg-gradient-to-r from-jet-stream-900 via-jet-stream-700 to-orange-600 bg-clip-text text-transparent leading-tight">
            Together, we're building the future of hyperlocal communities in India.
          </h2>
          
          <p className="text-lg sm:text-xl md:text-2xl text-jet-stream-700 mb-12 sm:mb-16 max-w-4xl mx-auto leading-relaxed">
            Join us in revolutionizing how communities connect, collaborate, and grow together through the power of technology and human connection.
          </p>
          
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 sm:px-16 py-6 sm:py-8 text-lg sm:text-xl font-semibold shadow-2xl hover:shadow-orange-500/30 transition-all duration-500 hover:scale-110 group border-0 rounded-full"
          >
            <Link href="/contact" className="flex items-center">
              Get in Touch
              <ArrowRight className="ml-3 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </section>
      
      <NewsletterFooter />

      {/* Enhanced CSS Styles */}
      <style jsx global>{`
        /* Custom Keyframe Animations */
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(3deg);
          }
        }
        
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Animation Classes */
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 1s ease-out;
        }
        
        .delay-200 {
          animation-delay: 200ms;
        }
        
        /* 3D Utilities */
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        
        .rotateY-12 {
          transform: rotateY(12deg);
        }
        
        .rotateX-6 {
          transform: rotateX(-6deg);
        }
        
        .rotateY-0 {
          transform: rotateY(0deg);
        }
        
        .rotateX-0 {
          transform: rotateX(0deg);
        }
        
        /* Grid Pattern */
        .pattern-grid {
          background-image: 
            linear-gradient(rgba(159, 193, 189, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(159, 193, 189, 0.2) 1px, transparent 1px);
          background-size: 30px 30px;
          animation: grid-move 25s linear infinite;
        }
        
        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(30px, 30px);
          }
        }
        
        /* Gradient Utilities */
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
        
        .bg-gradient-conic {
          background: conic-gradient(var(--tw-gradient-stops));
        }
        
        /* Global Styles */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f3f8f8;
        }

        ::-webkit-scrollbar-thumb {
          background: #9fc1bd;
          border-radius: 4px;
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
          background: #bbd3d0;
          color: #1f2c2d;
        }

        ::-moz-selection {
          background: #bbd3d0;
          color: #1f2c2d;
        }

        /* Mobile Optimizations */
        @media (max-width: 640px) {
          button {
            min-height: 44px;
            min-width: 44px;
          }
          
          .perspective-1000 {
            perspective: 800px;
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
          .animate-spin-slow,
          .animate-fade-in,
          .animate-slide-up,
          .pattern-grid {
            animation: none !important;
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
        }

        /* Performance Optimizations */
        .card-3d {
          contain: layout style paint;
          will-change: transform;
        }
        
        .parallax-element {
          will-change: transform;
          transform: translate3d(0, 0, 0);
        }

        /* Enhanced Button Hover Effects */
        .btn-enhanced {
          position: relative;
          overflow: hidden;
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
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transition: left 0.6s ease;
        }
        
        .btn-enhanced:hover::before {
          left: 100%;
        }
      `}</style>
    </div>
  );
}