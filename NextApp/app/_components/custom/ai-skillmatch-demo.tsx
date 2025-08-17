"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
// import { Button } from "@/ui/button"
import { MessageCircle, Bot, User, MapPin, Star, Clock, IndianRupee } from "lucide-react"
import { Button } from "../ui/button"
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
}

export default function AISkillMatchDemo() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const demoFlow = [
    {
      type: "user" as const,
      content: "I need help with digital marketing in Delhi",
      delay: 1000
    },
    {
      type: "ai" as const,
      content: "Hi! I'm your SkillAmigo AI assistant. I found several digital marketing experts in Delhi for you. Let me show you the best matches based on your location and requirements.",
      delay: 2000
    },
    {
      type: "ai" as const,
      content: "matches",
      delay: 1500
    }
  ]

  const skillMatches: SkillMatch[] = [
    {
      name: "Priya Sharma",
      skill: "Digital Marketing Expert",
      rating: 4.9,
      location: "Connaught Place, Delhi",
      price: "₹1,200/hour",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b372?w=40&h=40&fit=crop&crop=face"
    },
    {
      name: "Rahul Gupta",
      skill: "Social Media Specialist",
      rating: 4.8,
      location: "Karol Bagh, Delhi",
      price: "₹900/hour",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
    },
    {
      name: "Anita Verma",
      skill: "SEO & Content Marketing",
      rating: 4.7,
      location: "Lajpat Nagar, Delhi",
      price: "₹800/hour",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
    }
  ]

  useEffect(() => {
    if (currentStep < demoFlow.length) {
      const currentStepData = demoFlow[currentStep]
      const timer = setTimeout(() => {
        
        if (currentStepData.type === "user") {
          const newMessage: Message = {
            id: `msg-${Date.now()}`,
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
              id: `msg-${Date.now()}`,
              content: currentStepData.content,
              sender: "ai",
              timestamp: new Date().toLocaleTimeString("en-IN", { 
                hour: "2-digit", 
                minute: "2-digit" 
              })
            }
            setMessages(prev => [...prev, newMessage])
          }, 1500)
        }
        
        setCurrentStep(prev => prev + 1)
      }, currentStepData.delay)

      return () => clearTimeout(timer)
    }
  }, [currentStep, demoFlow])

  const resetDemo = () => {
    setMessages([])
    setIsTyping(false)
    setCurrentStep(0)
  }

  return (
    
    <div className="bg-jet-stream-950 py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Experience AI-Powered
              <span className="text-saffron block">Skill Matching</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See how our intelligent AI connects you with the perfect professionals 
              in your neighborhood, instantly.
            </p>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-jet-stream-900 rounded-lg border border-jet-stream-400/20 overflow-hidden shadow-2xl"
          >
            {/* Chat Header */}
            <div className="bg-jet-stream-900 border-b border-jet-stream-400/20 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-saffron rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white">SkillAmigo AI</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Online • Ready to help</span>
                  </div>
                </div>
                <div className="ml-auto">
                  <Button
                    onClick={resetDemo}
                    variant="outline"
                    size="sm"
                    className="text-xs border-jet-stream-400/40 text-gray-300 hover:bg-jet-stream-400/10"
                  >
                    Reset Demo
                  </Button>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4 bg-jet-stream-900">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.sender === "ai" && (
                      <div className="w-8 h-8 bg-saffron rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    
                    <div className={`max-w-md ${message.sender === "user" ? "order-first" : ""}`}>
                      {message.content === "matches" ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                          className="space-y-3"
                        >
                          {skillMatches.map((match, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: index * 0.2 }}
                              className="bg-jet-stream-950 border border-jet-stream-400/20 rounded-lg p-4 hover:border-saffron/30 transition-colors cursor-pointer group"
                            >
                              <div className="flex items-start gap-3">
                                <img
                                  src={match.avatar}
                                  alt={match.name}
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between mb-1">
                                    <h4 className="font-medium text-white text-sm group-hover:text-saffron transition-colors">
                                      {match.name}
                                    </h4>
                                    <div className="flex items-center gap-1 text-xs text-saffron">
                                      <Star className="w-3 h-3 fill-current" />
                                      <span>{match.rating}</span>
                                    </div>
                                  </div>
                                  <p className="text-xs text-gray-300 mb-2">{match.skill}</p>
                                  <div className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-1 text-gray-400">
                                      <MapPin className="w-3 h-3" />
                                      <span>{match.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-saffron font-medium">
                                      <IndianRupee className="w-3 h-3" />
                                      <span>{match.price.replace("₹", "")}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      ) : (
                        <div
                          className={`rounded-lg px-4 py-3 ${
                            message.sender === "user"
                              ? "bg-saffron text-white ml-auto"
                              : "bg-jet-stream-950 text-white border border-jet-stream-400/20"
                          }`}
                        >
                          <p className="text-sm font-body leading-relaxed">{message.content}</p>
                          <div className="flex items-center gap-1 mt-2 text-xs opacity-70">
                            <Clock className="w-3 h-3" />
                            <span>{message.timestamp}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {message.sender === "user" && (
                      <div className="w-8 h-8 bg-jet-stream-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 bg-saffron rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-jet-stream-950 border border-jet-stream-400/20 rounded-lg px-4 py-3">
                      <div className="flex gap-1">
                        <motion.div
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-gray-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Chat Input (Disabled for Demo) */}
            <div className="border-t border-jet-stream-400/20 p-4 bg-jet-stream-900">
              <div className="flex gap-3 items-center">
                <div className="flex-1">
                  <div className="bg-jet-stream-950 border border-jet-stream-400/20 rounded-lg px-4 py-3">
                    <p className="text-sm text-gray-500 font-body">
                      This is a demo - try the real AI assistant!
                    </p>
                  </div>
                </div>
                <Button 
                  className="bg-saffron hover:bg-saffron/90 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-saffron/25"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Try SkillMatch AI
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Demo Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            <div className="text-center">
              <div className="text-2xl font-display font-bold text-saffron mb-2">3.2s</div>
              <div className="text-gray-300 text-sm">Average Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-display font-bold text-saffron mb-2">98%</div>
              <div className="text-gray-300 text-sm">Match Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-display font-bold text-saffron mb-2">50k+</div>
              <div className="text-gray-300 text-sm">Successful Connections</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}