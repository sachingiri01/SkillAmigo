


'use client';

import React, { useRef ,useState,useEffect} from 'react';
import ElectricBorder from './_components/ElectricBorder';
import Squares from './_components/grid';
import DotGrid from './_components/dotgrid';
import Lightning from './_components/Lightining';
import SkillsAmigoLoader from './_components/laoder';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  HelpCircle,
  ChevronDown,
  User, 
  Brain, 
  Search, 
  Coins, 
  CheckCircle, 
  Users, 
  Shield,
  Sparkles,
  ArrowRight,
  Star,
  Zap,
  Lightbulb,
  Target,
  Rocket,
  Globe,
  TrendingUp,
  Heart,
  MessageCircle
} from 'lucide-react';
import { FullwidthIconNavbar } from '../_components/navbars/fullwidth-icon-navbar';
import Link from "next/link";
import { NewsletterFooter } from '../_components/footers/newsletter-footer';
const adminEmail = 'skillamigo.official@gmail.com';
// Optimized floating elements
const FloatingElements = ({ count = 4 }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: count }, (_, i) => (
      <motion.div
        key={i}
        className="absolute w-3 h-3 bg-orange-300 rounded-full opacity-40"
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 8 + i * 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          left: `${20 + (i * 15) % 60}%`,
          top: `${20 + (i * 20) % 60}%`,
        }}
      />
    ))}
  </div>
);

// Stats Section Component
const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });


  const stats = [
    { number: "10K+", label: "Active Providers", icon: Users },
    { number: "50K+", label: "Services Completed", icon: CheckCircle },
    { number: "98%", label: "Satisfaction Rate", icon: Star },
    { number: "24/7", label: "AI Support", icon: Brain }
  ];

  return (
    




   <section ref={ref} className="py-24 px-8 relative overflow-hidden bg-jet-stream-50">
      <FloatingElements count={3} />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-jet-stream-800 to-jet-stream-600 bg-clip-text text-transparent">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-jet-stream-600">Real numbers from our thriving community</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <motion.div 
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-jet-stream-100 border-2 border-jet-stream-200 mb-4 shadow-lg"
                whileHover={{ scale: 1.1, borderColor: "var(--color-jet-stream-400)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <stat.icon className="w-8 h-8 text-jet-stream-600" />
              </motion.div>
              <div className="text-3xl font-bold text-jet-stream-800 mb-2">{stat.number}</div>
              <div className="text-jet-stream-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// AI Features Section with DotGrid
const AISection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Brain,
      title: "Smart Matching",
      description: "AI analyzes preferences and suggests perfect provider-seeker matches"
    },
    {
      icon: Target,
      title: "Intelligent Pricing",
      description: "Dynamic pricing recommendations based on market data and demand"
    },
    {
      icon: MessageCircle,
      title: "Real-time Assistant",
      description: "24/7 AI chat support guiding users through every step"
    }
  ];

  return (
    <section ref={ref} className="py-24 px-8 relative overflow-hidden bg-jet-stream-1000">
      {/* DotGrid Background */}
      <div className="absolute inset-0 opacity-60">
        <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
          <DotGrid
            dotSize={7}
            gap={15}
            baseColor="#719f9a"
            activeColor="#ff5819"
            proximity={150}
            shockRadius={200}
            shockStrength={5}
            resistance={800}
            returnDuration={1.5}
          />
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 mb-4">
            <Lightbulb className="w-6 h-6 text-orange-400" />
            <span className="text-orange-500 font-semibold">AI Powered</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-jet-stream-200">
            Intelligence at Every Step
          </h2>
          <p className="text-xl text-jet-stream-100 max-w-3xl mx-auto">
            Our AI doesn't just connect people—it understands needs, predicts preferences, and creates magical experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              {/* <ElectricBorder
                color="#7df9ff"
                speed={1}
                chaos={0.3}
                thickness={1}
                style={{ borderRadius: 16 }}
              > */}
                <motion.div 
                  className="p-8 text-center bg-jet-stream-400/80 backdrop-blur-sm opacity-90"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/30 mb-6"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="w-8 h-8 text-cyan-400" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-jet-stream-900 mb-4">{feature.title}</h3>
                  <p className="text-jet-stream-900 leading-relaxed">{feature.description}</p>
                </motion.div>
              {/* </ElectricBorder> */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};



const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "What is SkillsAmigo and who can use it?",
      answer: "A platform connecting service seekers with providers — anyone can join."
    },
    {
      question: "How does the coin-based payment system work?",
      answer: "Buy coins → book services → confirm → coins released to seller."
    },
    {
      question: "What are merit credits and why are they important?",
      answer: "They track seller reliability — earned for success, lost for failures."
    },
    {
      question: "How do sellers collaborate on big projects?",
      answer: "Multiple sellers team up under one booking (e.g., weddings, events)."
    },
    {
      question: "How does AI help me on the platform?",
      answer: "AI syncs availability, suggests services, helps negotiate, and guides you."
    },
    {
      question: "What happens if something goes wrong with a service?",
      answer: "Payments stay in escrow → disputes handled via reviews & resolution tools."
    },
    {
      question: "Is my money safe?",
      answer: "Yes — coins are secured in escrow until service delivery is confirmed."
    },
    {
      question: "How do I start?",
      answer: "Register → set up profile → post or book services."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section ref={ref} className="py-24 px-8 relative overflow-hidden bg-gradient-to-br from-jet-stream-100 to-jet-stream-200">
      
      <FloatingElements count={10}/>
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 mb-4">
            <HelpCircle className="w-6 h-6 text-pink-600" />
            <span className="text-pink-600 font-semibold">FAQ</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-jet-stream-800">
            Frequently Asked Questions
          </h2>
          <p className="text-jet-stream-600 text-lg max-w-2xl mx-auto">
            Get quick answers to common questions about SkillsAmigo
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl border border-jet-stream-300/50 shadow-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-white/40 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-jet-stream-800 pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openFAQ === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-jet-stream-600" />
                </motion.div>
              </button>
              
              <motion.div
                initial={false}
                animate={{ 
                  height: openFAQ === index ? "auto" : 0,
                  opacity: openFAQ === index ? 1 : 0 
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5">
                  <div className="h-px bg-gradient-to-r from-jet-stream-300/50 to-transparent mb-4"></div>
                  <p className="text-jet-stream-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-jet-stream-600 mb-6">
            Still have questions? We're here to help!
          </p>
          <Link
                  href={`mailto:${adminEmail}`}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-300 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Contact Support
          </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};



// Success Stories Preview
const StoriesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stories = [
    {
      name: "Sarah",
      role: "Wedding Planner",
      story: "Coordinated 50+ weddings using SkillsAmigo's multi-seller collaboration features.",
      avatar: "🌸"
    },
    {
      name: "Marcus",
      role: "Photographer",
      story: "AI scheduling helped me book 3x more sessions without scheduling conflicts.",
      avatar: "📸"
    },
    {
      name: "Luna",
      role: "Yoga Instructor",
      story: "Merit system built trust with students, growing my classes from 5 to 50 people.",
      avatar: "🧘‍♀️"
    }
  ];

  return (
    <section ref={ref} className="py-24 px-8 relative overflow-hidden bg-gradient-to-br from-jet-stream-100 to-jet-stream-200">
      <FloatingElements count={5} />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 mb-4">
            <Heart className="w-6 h-6 text-pink-600" />
            <span className="text-pink-600 font-semibold">Success Stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-jet-stream-800">
            Real People, Real Impact
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-jet-stream-300/50 shadow-lg"
              whileHover={{ scale: 1.03, y: -5 }}
            >
              <div className="text-4xl mb-4">{story.avatar}</div>
              <h3 className="text-xl font-bold text-jet-stream-800 mb-1">{story.name}</h3>
              <p className="text-jet-stream-600 text-sm mb-4">{story.role}</p>
              <p className="text-jet-stream-700 leading-relaxed">"{story.story}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowPage = () => {
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  
  // Reduced transform ranges for better performance
  const backgroundY = useTransform(scrollYProgress, [0, 0.3], ['0%', '15%']);
  const textY = useTransform(scrollYProgress, [0, 0.3], ['0%', '30%']);

  const steps = [
    {
      id: 1,
      icon: User,
      title: "Seller Registration & Profile Setup",
      description: "Service providers create detailed profiles and post their offerings with rich descriptions, pricing, and availability windows.",
      color: "#7df9ff",
      details: "Set up your digital storefront with photos, skills, experience, and service packages."
    },
    {
      id: 2,
      icon: Brain,
      title: "AI Availability Sync",
      description: "Our intelligent system automatically syncs seller calendars and keeps availability updated in real-time across all platforms.",
      color: "#ff7d7d",
      details: "Never miss a booking - AI handles your schedule seamlessly."
    },
    {
      id: 3,
      icon: Search,
      title: "Smart Discovery & Matching",
      description: "Buyers browse services while AI algorithms suggest perfect matches based on needs, location, budget, and timing preferences.",
      color: "#7dff7d",
      details: "Personalized recommendations that save time and improve outcomes."
    },
    {
      id: 4,
      icon: Coins,
      title: "Coin Purchase & Booking",
      description: "Secure coin-based payment system with AI-guided purchase flow and instant service booking confirmation.",
      color: "#ff7dff",
      details: "Transparent pricing with real currency conversion and secure transactions."
    },
    {
      id: 5,
      icon: CheckCircle,
      title: "Service Delivery & Merit System",
      description: "Sellers deliver services, buyers confirm completion, coins transfer automatically, and merit credits update profiles.",
      color: "#ffff7d",
      details: "Build reputation through successful deliveries and quality service."
    },
    {
      id: 6,
      icon: Users,
      title: "Multi-Seller Collaboration",
      description: "Complex projects like weddings bring together multiple service providers in coordinated packages.",
      color: "#7dffff",
      details: "Seamlessly manage team projects with shared timelines and communication."
    },
    {
      id: 7,
      icon: Shield,
      title: "AI-Powered Protection",
      description: "Advanced fraud detection, automated negotiation assistance, and dispute resolution through community reviews.",
      color: "#ff9f7d",
      details: "Trust and safety built into every interaction."
    }
  ];
const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial page load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (

<>
      <SkillsAmigoLoader
        isVisible={isLoading}
        duration={3000}
        onComplete={() => setIsLoading(false)}
        customTexts={[
          "Connecting seekers with providers...",
          "Syncing AI availability...",
          "Loading your experience...",
          "Almost ready..."
        ]}
      />

    {!isLoading && (<div className="min-h-screen bg-jet-stream-975 text-jet-stream-50 overflow-x-hidden" style={{
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
    }}>

{/* <Lightning
    hue={360}
    xOffset={0.1}
    speed={1.2}
    intensity={1.7}
    size={1.2}
  /> */}

      <FullwidthIconNavbar />


      {/* Hero Section with Full Background */}
<section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-jet-stream-1000">
  {/* Full background Squares component */}
  <div className="absolute inset-0 z-0">
    <Squares 
      speed={0.5} 
      squareSize={40}
      direction='diagonal' 
      borderColor='#719f9a'
      hoverFillColor='#ff7d4d'
    />

    {/* <Lightning
    hue={360}
    xOffset={0.1}
    speed={1.2}
    intensity={1.7}
    size={1.2}
  /> */}
  </div>
  
  {/* Subtle Bohemian Elements */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
    {/* Minimal Floating Shapes */}
    <motion.div
      className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full opacity-10"
      style={{
        background: 'radial-gradient(circle, rgba(113, 159, 154, 0.4), transparent 60%)',
        filter: 'blur(40px)'
      }}
      animate={{
        x: [0, 30, 0],
        y: [0, -20, 0],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    
    <motion.div
      className="absolute bottom-1/3 left-1/5 w-24 h-24 rounded-full opacity-8"
      style={{
        background: 'radial-gradient(circle, rgba(255, 125, 77, 0.3), transparent 50%)',
        filter: 'blur(30px)'
      }}
      animate={{
        x: [0, -20, 0],
        y: [0, 25, 0],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    
    {/* Subtle Particles */}
    {Array.from({ length: 10 }, (_, i) => (
      <motion.div
        key={i}
        className="absolute w-3 h-3 rounded-full opacity-40"
        style={{
          background: i % 2 === 0 ? '#ff7d4d' : '#ff7d4d',
          left: `${25 + (i * 15) % 50}%`,
          top: `${30 + (i * 20) % 40}%`,
        }}
        animate={{
          y: [0, -60, 0],
          opacity: [0, 0.4, 0],
        }}
        transition={{
          duration: 4+ i * 1,
          repeat: Infinity,
          delay: i * 2,
          ease: "easeOut"
        }}
      />
    ))}
  </div>
  
  {/* Main Content */}
  <motion.div
    className="text-center z-10 px-8 relative max-w-6xl mx-auto"
    style={{ y: textY }}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mb-8"
    >
      <motion.h1 
        className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
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
          color: 'transparent',
          textShadow: '0 0 20px rgba(113,159,154,0.2)'
        }}
      >
        How SkillsAmigo Works
      </motion.h1>
      
      <motion.p 
        className="text-lg md:text-xl lg:text-2xl text-jet-stream-200 max-w-4xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Your trusted space to connect seekers and providers in a 
        <span className="text-jet-stream-300 font-medium"> vibrant digital ecosystem </span>
        powered by intelligent AI.
      </motion.p>
    </motion.div>
    
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-jet-stream-300"
    >
      {[
        { icon: Sparkles, text: "AI Intelligence" },
        { icon: Globe, text: "Global Community" },
        { icon: TrendingUp, text: "Growing Fast" }
      ].map((item, index) => (
        <motion.div
          key={item.text}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-jet-stream-400/30"
          style={{
            background: 'rgba(113, 159, 154, 0.1)',
          }}
          whileHover={{ 
            scale: 1.02,
            backgroundColor: 'rgba(113, 159, 154, 0.15)',
            borderColor: 'rgba(113, 159, 154, 0.5)'
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div
            animate={{ 
              rotate: index === 0 ? [0, 360] : 0,
            }}
            transition={{
              rotate: { duration: 4, repeat: Infinity, ease: "linear" }
            }}
          >
            <item.icon className="w-4 h-4 text-jet-stream-300" />
          </motion.div>
          <span className="text-sm font-medium">{item.text}</span>
        </motion.div>
      ))}
    </motion.div>
  </motion.div>

  {/* Minimal Glassmorphism Scroll Indicator */}
  <motion.div
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
    animate={{ y: [0, 10, 0] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
  >
    <motion.div 
      className="w-6 h-10 border-2 border-jet-stream-300 rounded-full flex justify-center relative overflow-hidden"
      style={{
        background: 'rgba(113, 159, 154, 0.05)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
      }}
      whileHover={{ 
        scale: 1.05,
        borderColor: '#9fc1bd'
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.div
        className="w-1 h-3 bg-jet-stream-300 rounded-full mt-2"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.div>
  </motion.div>
</section>
     
      <StatsSection />

      {/* Steps Section - Optimized */}
      <section className="py-1 px-8 relative bg-jet-stream-1000 pb-20 pt-20">
        


        
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-jet-stream-100">
              The Journey Unfolds
            </h2>
            <p className="text-xl text-jet-stream-400">Step by step, we make connections seamless</p>
          </motion.div>

          <div className="space-y-20">
            {steps.map((step, index) => (
              <StepCard key={step.id} step={step} index={index} />
            ))}
          </div>
        {/* </motion.div> */}
      </section>

      {/* AI Features Section */}
      <AISection />

      {/* Success Stories Section */}
      <FAQSection/>

      {/* CTA Section */}
      <section className="py-24 px-8 relative overflow-hidden bg-gradient-to-br from-jet-stream-800 to-jet-stream-900">
        
        <div className="absolute inset-0 z-0">
    

    <Lightning
    hue={190}
    xOffset={0.1}
    speed={1.2}
    intensity={1.7}
    size={1.2}
  />
  </div>
  
        <motion.div 
          className="max-w-4xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-jet-stream-100 to-jet-stream-300 bg-clip-text text-transparent"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Ready to Explore?
          </motion.h2>
          
          <p className="text-lg md:text-xl text-jet-stream-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of creators, professionals, and dreamers building amazing things together on SkillsAmigo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            
            
            <motion.button
              className="group relative px-10 py-4 border-2 border-jet-stream-300 rounded-full text-jet-stream-200 font-semibold text-lg overflow-hidden backdrop-blur-sm"
              whileHover={{ scale: 1.05, borderColor: "var(--color-jet-stream-200)", color: "var(--color-jet-stream-100)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="relative z-10 flex items-center">
                Find Services
                <Search className="w-5 h-5 ml-2" />
              </span>
            </motion.button>
          </div>
          
          <div className="flex items-center justify-center space-x-6 text-jet-stream-300">
            {Array.from({ length: 5 }, (_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              >
                <Star className="w-5 h-5 fill-current" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      <NewsletterFooter/>
    </div>
     )}
    </>
  );
};




// Optimized Step Card Component
const StepCard = ({ step, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.2, delay: index * 0.1 }}
      className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
    >
      <div className="flex-1 w-full">
        <ElectricBorder
          color={step.color}
          speed={1}
          chaos={0.5}
          thickness={2}
          style={{ borderRadius: 24 }}
        >
          <motion.div 
            className="p-6 md:p-8 hover-element"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center mb-6">
              <motion.div 
                className="p-3 rounded-full mr-4 flex-shrink-0"
                style={{ backgroundColor: `${step.color}20` }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.2 }}
              >
                <step.icon className="w-6 h-6 md:w-8 md:h-8" style={{ color: step.color }} />
              </motion.div>
              <div className="min-w-0 flex-1">
                <span className="text-xs md:text-sm font-semibold text-jet-stream-400 block">
                  Step {step.id}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-jet-stream-100 leading-tight">
                  {step.title}
                </h3>
              </div>
            </div>
            
            <p className="text-jet-stream-300 text-base md:text-lg mb-4 leading-relaxed">
              {step.description}
            </p>
            
            <div className="flex items-center text-jet-stream-400 text-sm">
              <ArrowRight className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>{step.details}</span>
            </div>
          </motion.div>
        </ElectricBorder>
      </div>

      <motion.div 
        className="flex-1 flex justify-center"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div 
          className="w-48 h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center relative overflow-hidden"
          style={{ 
            background: `radial-gradient(circle, ${step.color}15, transparent 70%)`,
            border: `2px solid ${step.color}30`
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 border-2 border-dashed rounded-full opacity-20"
            style={{ borderColor: step.color }}
          />
          <step.icon 
            className="w-16 h-16 md:w-20 md:h-20 z-10" 
            style={{ color: step.color }} 
          />
        </div>
      </motion.div>
    </motion.div>
  );
};
export default HowPage;

