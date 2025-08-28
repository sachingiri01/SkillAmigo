
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Bot, User, MapPin, Star, Clock, IndianRupee, RefreshCw, Zap, Users, Target } from "lucide-react"
import React from "react"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: string
  isTyping?: boolean
}

interface SkillMatch {
  name: string
  skill: string
  rating: number
  location: string
  price: string
  avatar: string
  verified: boolean
  responseTime: string
}

export default function AISkillMatchDemo() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isRestarting, setIsRestarting] = useState(false)

  const demoFlow = [
    {
      type: "user" as const,
      content: "I need help with digital marketing in Delhi",
      delay: 1200
    },
    {
      type: "ai" as const,
      content: "Hi! I'm your SkillAmigo AI assistant. I've analyzed your request and found several verified digital marketing experts in Delhi. Let me show you the best matches based on your location, budget, and specific requirements.",
      delay: 2500
    },
    {
      type: "ai" as const,
      content: "matches",
      delay: 1800
    },
    {
      type: "ai" as const,
      content: "These professionals are currently available and have excellent track records in Delhi. Would you like me to help you connect with any of them, or would you prefer to see more options?",
      delay: 2000
    }
  ]

  const skillMatches: SkillMatch[] = [
    
    {
      name: "Rahul Gupta",
      skill: "Social Media Specialist • 4+ years",
      rating: 4.8,
      location: "Karol Bagh, Delhi",
      price: "₹975/hour",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      verified: true,
      responseTime: "Usually responds in 15 mins"
    },
    {
      name: "Anita Verma",
      skill: "SEO & Content Marketing • 6+ years",
      rating: 4.7,
      location: "Lajpat Nagar, Delhi",
      price: "₹850/hour",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      verified: true,
      responseTime: "Usually responds in 5 mins"
    }
  ]

  useEffect(() => {
    if (currentStep < demoFlow.length) {
      const currentStepData = demoFlow[currentStep]
      const timer = setTimeout(() => {
        
        if (currentStepData.type === "user") {
          const newMessage: Message = {
            id: `msg-${Date.now()}-${Math.random()}`,
            content: currentStepData.content,
            sender: "user",
            timestamp: new Date().toLocaleTimeString("en-IN", { 
              hour: "2-digit", 
              minute: "2-digit" 
            })
          }
          setMessages(prev => [...prev, newMessage])
        } else {
          setIsTyping(true)
          
          setTimeout(() => {
            setIsTyping(false)
            const newMessage: Message = {
              id: `msg-${Date.now()}-${Math.random()}`,
              content: currentStepData.content,
              sender: "ai",
              timestamp: new Date().toLocaleTimeString("en-IN", { 
                hour: "2-digit", 
                minute: "2-digit" 
              })
            }
            setMessages(prev => [...prev, newMessage])
          }, 1800)
        }
        
        setCurrentStep(prev => prev + 1)
      }, currentStepData.delay)

      return () => clearTimeout(timer)
    }
  }, [currentStep, demoFlow])

  const resetDemo = () => {
    setIsRestarting(true)
    setTimeout(() => {
      setMessages([])
      setIsTyping(false)
      setCurrentStep(0)
      setIsRestarting(false)
    }, 500)
  }

  const Button = ({ children, onClick, variant = "default", size = "default", className = "", ...props }) => {
    const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
    
    const variants = {
      default: "bg-jet-stream-500 hover:bg-jet-stream-400 text-white focus:ring-jet-stream-400",
      outline: "border border-gray-400/40 text-gray-300 hover:bg-gray-400/10 hover:text-white focus:ring-gray-400",
      ghost: "text-gray-300 hover:bg-gray-400/10 hover:text-white focus:ring-gray-400"
    }
    
    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      default: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base"
    }
    
    return (
      <button
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    )
  }

  return (
    <div className="bg-jet-stream-975 py-12 md:py-24 relative overflow-hidden">
      {/* Abstract Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-jet-stream-400/30 to-transparent transform rotate-45 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-jet-stream-500/20 to-transparent transform -rotate-45 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <div className="w-full h-full border border-jet-stream-400/10 transform rotate-45"></div>
          <div className="absolute inset-4 border border-jet-stream-400/5 transform rotate-45"></div>
          <div className="absolute inset-8 border border-jet-stream-400/5 transform rotate-45"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-jet-stream-400/20 text-jet-stream-300 px-6 py-3 text-sm font-medium mb-6 transform skew-x-[-8deg]">
              <Zap className="w-4 h-4" />
              AI-Powered Matching
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Experience Intelligent
              <span className="block bg-gradient-to-r from-jet-stream-300 to-jet-stream-500 bg-clip-text text-transparent">
                Skill Discovery
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-jet-stream-200 max-w-3xl mx-auto leading-relaxed">
              Watch our AI instantly connect you with verified professionals in your area. 
              Smart matching, real results, zero hassle.
            </p>
          </motion.div>
        </div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-jet-stream-900/80 backdrop-blur-sm border border-jet-stream-400/20 overflow-hidden shadow-2xl transform perspective-1000 rotateX-2"
            style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))' }}
          >
            {/* Enhanced Chat Header */}
            <div className="bg-jet-stream-900 border-b border-jet-stream-400/20 p-4 sm:p-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-jet-stream-400/5 via-transparent to-jet-stream-500/10"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-jet-stream-400 to-jet-stream-600 flex items-center justify-center transform skew-x-[-8deg]">
                    <Bot className="w-6 h-6 text-white transform skew-x-[8deg]" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-jet-stream-900 transform skew-x-[-8deg]"></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-lg">SkillAmigo AI</h3>
                  <div className="flex items-center gap-2 text-sm text-jet-stream-200">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 animate-pulse transform skew-x-[-8deg]"></div>
                      <span>Online • Lightning fast responses</span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={resetDemo}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 shrink-0 border-jet-stream-400/40 text-jet-stream-300 hover:bg-jet-stream-400/10"
                  disabled={isRestarting}
                >
                  <RefreshCw className={`w-4 h-4 ${isRestarting ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Reset</span>
                </Button>
              </div>
            </div>

            {/* Enhanced Chat Messages */}
            <div className="h-[500px] sm:h-[600px] overflow-y-auto p-4 sm:p-6 space-y-6 bg-gradient-to-b from-jet-stream-900/50 to-jet-stream-975/80">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`flex gap-3 sm:gap-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.sender === "ai" && (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-jet-stream-400 to-jet-stream-600 flex items-center justify-center flex-shrink-0 shadow-lg transform skew-x-[-8deg]">
                        <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white transform skew-x-[8deg]" />
                      </div>
                    )}
                    
                    <div className={`max-w-[85%] sm:max-w-lg ${message.sender === "user" ? "order-first" : ""}`}>
                      {message.content === "matches" ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6 }}
                          className="space-y-4"
                        >
                          {skillMatches.map((match, matchIndex) => (
                            <motion.div
                              key={matchIndex}
                              initial={{ opacity: 0, x: -30 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: matchIndex * 0.15 }}
                              className="bg-jet-stream-800/90 border border-jet-stream-400/30 p-4 sm:p-5 hover:border-jet-stream-300/60 hover:bg-jet-stream-800 transition-all duration-300 cursor-pointer group relative overflow-hidden"
                              style={{ clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))' }}
                            >
                              {/* Abstract pattern overlay */}
                              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-jet-stream-400/10 to-transparent transform rotate-45 translate-x-10 -translate-y-10 group-hover:from-jet-stream-300/15 transition-colors duration-300"></div>
                              
                              <div className="flex items-start gap-3 sm:gap-4 relative z-10">
                                <div className="relative">
                                  <img
                                    src={match.avatar}
                                    alt={match.name}
                                    className="w-12 h-12 sm:w-14 sm:h-14 object-cover border-2 border-jet-stream-400/40 group-hover:border-jet-stream-300/60 transition-all duration-300"
                                    style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
                                  />
                                  {match.verified && (
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 flex items-center justify-center transform skew-x-[-8deg]">
                                      <svg className="w-3 h-3 text-white transform skew-x-[8deg]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                      </svg>
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                    <h4 className="font-semibold text-white text-base group-hover:text-jet-stream-300 transition-colors">
                                      {match.name}
                                    </h4>
                                    <div className="flex items-center gap-1 text-sm">
                                      <Star className="w-4 h-4 fill-jet-stream-400 text-jet-stream-400" />
                                      <span className="text-jet-stream-400 font-medium">{match.rating}</span>
                                      <span className="text-jet-stream-300 text-xs ml-1">(150+ reviews)</span>
                                    </div>
                                  </div>
                                  <p className="text-sm text-jet-stream-200 mb-3 font-medium">{match.skill}</p>
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-jet-stream-300">
                                      <MapPin className="w-4 h-4 flex-shrink-0" />
                                      <span className="truncate">{match.location}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                      <span className="text-jet-stream-300">{match.responseTime}</span>
                                      <div className="flex items-center gap-1 text-jet-stream-400 font-semibold">
                                        <IndianRupee className="w-4 h-4" />
                                        <span>{match.price.replace("₹", "")}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-4 pt-4 border-t border-jet-stream-400/20">
                                <div className="flex gap-2">
                                  <Button size="sm" className="flex-1 bg-jet-stream-500 hover:bg-jet-stream-400 text-white">
                                    Connect Now
                                  </Button>
                                  <Button variant="outline" size="sm" className="px-4 border-jet-stream-400/40 text-jet-stream-300 hover:bg-jet-stream-400/10">
                                    View Profile
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      ) : (
                        <div
                          className={`px-4 py-3 sm:px-5 sm:py-4 relative overflow-hidden ${
                            message.sender === "user"
                              ? "bg-gradient-to-br from-jet-stream-500 to-jet-stream-600 text-white ml-auto shadow-lg"
                              : "bg-jet-stream-800/90 text-white border border-jet-stream-400/30 shadow-lg"
                          }`}
                          style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}
                        >
                          {message.sender === "user" && (
                            <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 transform rotate-45 translate-x-8 -translate-y-8"></div>
                          )}
                          <p className="text-sm sm:text-base leading-relaxed relative z-10">{message.content}</p>
                          <div className="flex items-center gap-2 mt-3 text-xs opacity-70 relative z-10">
                            <Clock className="w-3 h-3" />
                            <span>{message.timestamp}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {message.sender === "user" && (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-jet-stream-700 flex items-center justify-center flex-shrink-0 transform skew-x-[-8deg]">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-white transform skew-x-[8deg]" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Enhanced Typing Indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex gap-4"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-jet-stream-400 to-jet-stream-600 flex items-center justify-center transform skew-x-[-8deg]">
                      <Bot className="w-5 h-5 text-white transform skew-x-[8deg]" />
                    </div>
                    <div className="bg-jet-stream-800/90 border border-jet-stream-400/30 px-5 py-4 shadow-lg"
                         style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}>
                      <div className="flex gap-1.5">
                        {[0, 0.2, 0.4].map((delay, i) => (
                          <motion.div
                            key={i}
                            className="w-2.5 h-2.5 bg-jet-stream-300 transform skew-x-[-8deg]"
                            animate={{ scale: [1, 1.4, 1] }}
                            transition={{ duration: 1.2, repeat: Infinity, delay }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Enhanced Chat Input */}
            <div className="border-t border-jet-stream-400/20 p-4 sm:p-6 bg-jet-stream-900/80 backdrop-blur">
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <div className="bg-jet-stream-800/90 border border-jet-stream-400/30 px-4 py-3 sm:px-5 sm:py-4"
                       style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}>
                    <p className="text-sm sm:text-base text-jet-stream-300">
                      This is a live demo - Experience the real AI magic!
                    </p>
                  </div>
                </div>
                <Button 
                  className="bg-gradient-to-r from-jet-stream-500 to-jet-stream-600 hover:from-jet-stream-400 hover:to-jet-stream-500 text-white px-4 sm:px-6 py-3 sm:py-4 font-semibold shadow-lg transform hover:scale-105 transition-all duration-200 skew-x-[-8deg]"
                >
                  <div className="transform skew-x-[8deg] flex items-center">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    <span className="hidden sm:inline">Try SkillMatch AI</span>
                    <span className="sm:hidden">Try AI</span>
                  </div>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-12 sm:mt-20"
          >
            {[
              { icon: Zap, value: "2.1s", label: "Avg Response", color: "text-jet-stream-400" },
              { icon: Target, value: "99.2%", label: "Match Accuracy", color: "text-green-400" },
              { icon: Users, value: "75k+", label: "Happy Connections", color: "text-blue-400" },
              { icon: Star, value: "4.9/5", label: "User Rating", color: "text-yellow-400" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-jet-stream-900/50 border border-jet-stream-400/20 p-6 sm:p-8 backdrop-blur-sm hover:bg-jet-stream-800/50 transition-all duration-300 relative overflow-hidden group"
                style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))' }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-jet-stream-400/5 to-transparent transform rotate-45 translate-x-12 -translate-y-12 group-hover:from-jet-stream-400/10 transition-colors duration-300"></div>
                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-4 relative z-10`} />
                <div className="text-2xl sm:text-3xl font-bold text-white mb-2 relative z-10">{stat.value}</div>
                <div className="text-jet-stream-300 text-sm sm:text-base font-medium relative z-10">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12 sm:mt-16"
          >
            <div className="bg-gradient-to-r from-jet-stream-400/10 via-jet-stream-500/5 to-jet-stream-400/10 border border-jet-stream-400/20 p-8 sm:p-12 relative overflow-hidden"
                 style={{ clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-jet-stream-400/5 to-transparent transform rotate-45"></div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 relative z-10">
                Ready to Experience AI-Powered Skill Matching?
              </h3>
              <p className="text-jet-stream-200 text-lg mb-8 max-w-2xl mx-auto relative z-10">
                Join thousands of users who found their perfect professional matches in seconds.
              </p>
              <Button className="bg-gradient-to-r from-jet-stream-500 to-jet-stream-600 hover:from-jet-stream-400 hover:to-jet-stream-500 text-white px-8 py-4 text-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300 skew-x-[-8deg] relative z-10">
                <div className="transform skew-x-[8deg] flex items-center">
                  Get Started Free
                  <Zap className="w-5 h-5 ml-2" />
                </div>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}