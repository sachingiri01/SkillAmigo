

"use client"

import { motion } from "motion/react";
import { Button } from "../ui/button";
import { ChevronRight, Play, Users, MapPin } from "lucide-react";
import React from "react";

const FullScreenBackgroundHero = () => {
  return (
    <section className="relative h-svh max-h-[1400px] w-full overflow-hidden bg-jet-stream-1000">
      {/* Video Background - More faded */}
      <video
        className="absolute inset-0 h-full w-full object-cover z-10 opacity-80"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Enhanced Multi-layer Gradient Overlays */}
      <div className="absolute inset-0 bg-jet-stream-1000/60 z-20"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-jet-stream-1000/90 via-jet-stream-900/40 to-jet-stream-1000/30 z-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-jet-stream-1000/50 via-transparent to-jet-stream-1000/30 z-20"></div>
      
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 pattern-dots opacity-90 z-20"></div>
      
      {/* Floating Elements for Visual Interest */}
      {/* <div className="absolute top-20 right-20 w-32 h-32 bg-jet-stream-300/10 rounded-full blur-xl animate-pulse z-25" style={{ animationDuration: '4s' }}></div>
      <div className="absolute bottom-32 left-16 w-24 h-24 bg-saffron/10 rounded-full blur-xl animate-pulse z-25" style={{ animationDuration: '6s', animationDelay: '2s' }}></div> */}
      
      <div className="container relative z-30 h-full w-full max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-full w-full flex-col justify-center items-start pt-5">
          {/* Stats Bar */}
          <motion.div 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-6 mb-8 text-jet-stream-200 text-sm font-medium"
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-saffron" />
              <span>50K+ Active Users</span>
            </div>
            <div className="w-px h-4 bg-jet-stream-400/30"></div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-saffron" />
              <span>100+ Cities</span>
            </div>
          </motion.div>

          <div className="flex max-w-[65rem] flex-col gap-6">
            <motion.h1 
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight"
              style={{ textShadow: '4px 4px 16px rgba(0,0,0,0.9)' }}
            >
              Connect. Learn. Earn.
              <br />
              <span className="bg-gradient-to-r from-jet-stream-200 via-jet-stream-400 to-saffron bg-clip-text  animate-pulse">
                Locally.
              </span>
            </motion.h1>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-body text-jet-stream-100 max-w-[48rem] text-lg sm:text-xl md:text-2xl mt-8 leading-relaxed font-medium"
            style={{ textShadow: '3px 3px 12px rgba(0,0,0,0.9)' }}
          >
            India's premier hyperlocal skill-sharing platform connecting communities through knowledge and opportunity. 
            <span className="text-jet-stream-200/80 block mt-2 text-base sm:text-lg">
              Discover talents in your neighborhood and monetize your skills locally.
            </span>
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-md"
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-saffron via-saffron to-orange-500 hover:from-saffron/90 hover:via-saffron/90 hover:to-orange-500/90 text-white font-body font-bold px-8 py-6 text-lg shadow-2xl transition-all duration-300 hover:shadow-[0_20px_40px_rgba(230,126,34,0.3)] hover:scale-105 border-0 group"
            >
              <a href="#" className="flex items-center gap-2">
                Start Sharing Skills
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </Button>
            <Button
              variant="outline"
              asChild
              size="lg"
              className="border-2 border-jet-stream-300/50 bg-white/5 backdrop-blur-lg text-white hover:bg-white/10 hover:border-jet-stream-200/70 font-body font-semibold px-8 py-6 text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            >
              <a href="#" className="flex items-center gap-2">
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                Watch Demo
              </a>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 flex flex-wrap items-center gap-8 text-jet-stream-300/70 text-sm"
          >
            <div className="flex items-center gap-3">
              {/* <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-saffron to-orange-500 border-2 border-white/20"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-jet-stream-300 to-jet-stream-400 border-2 border-white/20"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white/20"></div>
              </div> */}
              <span className="font-medium">Trusted by thousands</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-jet-stream-400/30"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Live matching available</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade for seamless transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-jet-stream-1000 to-transparent z-20"></div>
    </section>
  );
};

export { FullScreenBackgroundHero };