import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Users, Brain } from 'lucide-react';






// Electric Border Component (simplified version)
const ElectricBorder = ({ children, color = "#7df9ff", speed = 1, chaos = 0.3, thickness = 1 }) => {
  return (
    <div className="relative">
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: `linear-gradient(45deg, ${color}40, transparent, ${color}40)`,
          padding: `${thickness}px`,
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 2 / speed,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="w-full h-full bg-jet-stream-900 rounded-2xl">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

// Floating Elements Component
const FloatingElements = ({ count = 6 }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: count }, (_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-orange-400 rounded-full opacity-60"
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.5, 0.8, 1],
          opacity: [0.6, 1, 0.3, 0.6]
        }}
        transition={{
          duration: 8 + i * 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.8
        }}
        style={{
          left: `${15 + (i * 12) % 70}%`,
          top: `${20 + (i * 15) % 60}%`,
        }}
      />
    ))}
  </div>
);

// Progress Ring Component
const ProgressRing = ({ progress, size = 120 }) => {
  const radius = (size - 8) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(113, 159, 154, 0.2)"
          strokeWidth="3"
          fill="transparent"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth="3"
          fill="transparent"
          strokeLinecap="round"
          style={{
            strokeDasharray,
            strokeDashoffset
          }}
          animate={{
            strokeDashoffset: [circumference, strokeDashoffset]
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut"
          }}
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7df9ff" />
            <stop offset="50%" stopColor="#ff7d4d" />
            <stop offset="100%" stopColor="#719f9a" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-8 h-8 text-cyan-400" />
        </motion.div>
      </div>
    </div>
  );
};

// Loading Text Animation
const LoadingText = ({ texts, currentIndex }) => {
  return (
    <div className="h-8 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-lg font-medium text-jet-stream-200 text-center"
        >
          {texts[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Feature Icons Animation
const FeatureIcons = () => {
  const features = [
    { icon: Brain, color: "#7df9ff", delay: 0 },
    { icon: Users, color: "#ff7d4d", delay: 0.5 },
    { icon: Zap, color: "#7dff7d", delay: 1 },
    { icon: Sparkles, color: "#ff7dff", delay: 1.5 }
  ];

  return (
    <div className="flex justify-center space-x-6 mb-8">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ 
            opacity: [0, 1, 0.7, 1], 
            scale: [0, 1.2, 0.9, 1],
            rotate: [-180, 0, 360, 0]
          }}
          transition={{
            duration: 2,
            delay: feature.delay,
            repeat: Infinity,
            repeatDelay: 4
          }}
          className="relative"
        >
          <motion.div
            className="w-12 h-12 rounded-full border-2 flex items-center justify-center"
            style={{ 
              borderColor: `${feature.color}60`,
              backgroundColor: `${feature.color}10`
            }}
            whileHover={{ scale: 1.1 }}
          >
            <feature.icon 
              className="w-6 h-6" 
              style={{ color: feature.color }}
            />
          </motion.div>
          
          {/* Pulse effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2"
            style={{ borderColor: feature.color }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0, 1]
            }}
            transition={{
              duration: 2,
              delay: feature.delay + 0.5,
              repeat: Infinity,
              repeatDelay: 4
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

// Main Loading Component
const SkillsAmigoLoader = ({ 
  isVisible = true, 
  duration = 3000,
  onComplete = () => {},
  customTexts = [
    "Connecting seekers with providers...",
    "Syncing AI availability...",
    "Preparing your experience...",
    "Almost ready..."
  ]
}) => {
  const [progress, setProgress] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const interval = 50; // Update every 50ms
    const increment = (100 * interval) / duration;
    const textChangeInterval = duration / customTexts.length;

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(progressTimer);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 500);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    const textTimer = setInterval(() => {
      setCurrentTextIndex(prev => 
        prev < customTexts.length - 1 ? prev + 1 : prev
      );
    }, textChangeInterval);

    return () => {
      clearInterval(progressTimer);
      clearInterval(textTimer);
    };
  }, [isVisible, duration, customTexts.length, onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #141919 0%, #1f2c2d 50%, #111111 100%)',
          '--color-jet-stream-50': '#f3f8f8',
          '--color-jet-stream-100': '#e1ecea',
          '--color-jet-stream-200': '#bbd3d0',
          '--color-jet-stream-300': '#9fc1bd',
          '--color-jet-stream-400': '#719f9a',
          '--color-jet-stream-500': '#558581',
          '--color-jet-stream-600': '#4a706e',
          '--color-jet-stream-700': '#405e5e',
          '--color-jet-stream-800': '#3a5050',
          '--color-jet-stream-900': '#344545',
          '--color-jet-stream-950': '#1f2c2d',
          '--color-jet-stream-975': '#141919',
          '--color-jet-stream-1000': '#111111',
        }}
      >
        {/* Background Effects */}
        <FloatingElements count={8} />
        
        {/* Ambient Background Glow */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(125, 249, 255, 0.1), transparent 70%)',
              filter: 'blur(80px)'
            }}
          />
          <div 
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(255, 125, 77, 0.1), transparent 70%)',
              filter: 'blur(60px)'
            }}
          />
        </div>

        {/* Main Loading Content */}
        <motion.div 
          className="relative z-10 text-center max-w-md mx-auto px-8"
          animate={isComplete ? { scale: 1.05, y: -10 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Logo/Brand */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <motion.h1 
              className="text-3xl font-bold mb-2"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              style={{ 
                background: 'linear-gradient(90deg, #f3f8f8, #719f9a, #bbd3d0, #f3f8f8)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              SkillsAmigo
            </motion.h1>
          </motion.div>

          {/* Feature Icons */}
          <FeatureIcons />

          {/* Progress Ring */}
          <motion.div 
            className="mb-8 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <ElectricBorder color="#7df9ff" speed={1.5} thickness={2}>
              <div className="p-6 flex items-center justify-center">
                <ProgressRing progress={progress} size={120} />
              </div>
            </ElectricBorder>
          </motion.div>

          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-4 pt-25 text-jet-stream-200"
          >
            <LoadingText texts={customTexts} currentIndex={currentTextIndex} />
          </motion.div>

          {/* Progress Percentage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-2xl font-bold text-jet-stream-200 pt-20"
          >
            {Math.round(progress)}%
          </motion.div>

          {/* Completion Message */}
          <AnimatePresence>
            {isComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4"
              >
                <div className="flex items-center justify-center text-green-400">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                  </motion.div>
                  <span className="font-semibold">Ready!</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Demo Component


export default SkillsAmigoLoader;