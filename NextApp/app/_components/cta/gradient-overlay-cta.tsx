"use client"

import { Button } from "../ui/button";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Users, MapPin, Coins } from "lucide-react";
import { useRef } from "react";
import React from "react";

const GradientOverlayCta = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="py-32 bg-jet-stream-350 relative overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-99"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4f0325f-5958-42aa-a841-f191ceb5b1cc/generated_videos/indian-urban-cityscape-at-golden-hour-wi-7b6adbdf-20250816125159.mp4?" type="video/mp4" />
      </video>
      
      {/* Video Overlay */}
      <div className="absolute inset-0 video-overlay" />
      
      <div className="container mx-auto relative z-10">
        <motion.div 
          style={{ y, opacity }}
          className="relative h-[620px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-jet-stream-900/60 via-jet-stream-800/40 to-jet-stream-700/60 pattern-grid"
        >
          {/* Modern Geometric Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-20 h-20 border-2 border-jet-stream-400/20"
                initial={{ 
                  x: Math.random() * 100 + "%", 
                  y: Math.random() * 100 + "%",
                  rotate: 0 
                }}
                animate={{ 
                  rotate: 360,
                  x: [null, Math.random() * 100 + "%"],
                  y: [null, Math.random() * 100 + "%"]
                }}
                transition={{ 
                  duration: 20 + i * 5, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              />
            ))}
            
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-2 h-2 bg-jet-stream-400"
                initial={{ 
                  x: Math.random() * 100 + "%", 
                  y: Math.random() * 100 + "%",
                  scale: 0
                }}
                animate={{ 
                  scale: [0, 1, 0],
                  x: [null, Math.random() * 100 + "%"],
                  y: [null, Math.random() * 100 + "%"]
                }}
                transition={{ 
                  duration: 8 + i * 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
            ))}
          </div>

          <div className="relative z-10 flex flex-col gap-12 p-4 text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-jet-stream-50 text-5xl lg:text-6xl font-bold font-display leading-tight">
                Ready to Transform Your Skills into{" "}
                <span className="gradient-text">
                  Opportunities?
                </span>
              </h2>
            </motion.div>
            
            <motion.p 
              className="text-jet-stream-200 text-xl lg:text-2xl font-body max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Join thousands of Indians already earning and learning in their local communities
            </motion.p>

            {/* Social Proof Stats */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 text-jet-stream-300">
                  <Users className="w-6 h-6" />
                  <span className="text-3xl font-bold font-display">50,000+</span>
                </div>
                <span className="text-jet-stream-200 font-body">Active Users</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 text-jet-stream-300">
                  <MapPin className="w-6 h-6" />
                  <span className="text-3xl font-bold font-display">500+</span>
                </div>
                <span className="text-jet-stream-200 font-body">Cities Covered</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 text-jet-stream-300">
                  <Coins className="w-6 h-6" />
                  <span className="text-3xl font-bold font-display">₹2Cr+</span>
                </div>
                <span className="text-jet-stream-200 font-body">Earned by Community</span>
              </div>
            </motion.div>

            <motion.div 
              className="flex flex-col justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-jet-stream-500 to-jet-stream-400 hover:from-jet-stream-600 hover:to-jet-stream-500 text-jet-stream-50 font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-jet-stream-400/25 transition-all duration-300 group font-body border-0"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-jet-stream-300 text-jet-stream-500 hover:bg-jet-stream-300 hover:text-jet-stream-950 font-semibold px-8 py-4 text-lg transition-all duration-300 font-body"
                >
                  Explore Skills Near You
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export { GradientOverlayCta };