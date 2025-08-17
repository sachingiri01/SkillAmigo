// "use client"

// import { motion, useMotionValue, useTransform, useMotionValueEvent } from "motion/react"
// import { Badge } from "../ui/badge"
// import { Card, CardContent } from "../ui/card"
// import { Progress } from "../ui/progress"
// import { Crown, Star, TrendingUp, Coins, Gift, Users, Zap, Award } from "lucide-react"
// import { useEffect, useState } from "react"
// import React from "react"

// interface LeaderboardUser {
//   rank: number
//   name: string
//   avatar: string
//   skills: string[]
//   credits: number
//   level: string
//   trend: "up" | "down" | "stable"
// }

// const leaderboardData: LeaderboardUser[] = [
//   {
//     rank: 1,
//     name: "Priya Sharma",
//     avatar: "/api/placeholder/40/40",
//     skills: ["Digital Marketing", "Content Writing"],
//     credits: 2840,
//     level: "Skill Master",
//     trend: "up"
//   },
//   {
//     rank: 2,
//     name: "Arjun Patel",
//     avatar: "/api/placeholder/40/40",
//     skills: ["Web Development", "UI/UX Design"],
//     credits: 2650,
//     level: "Community Champion",
//     trend: "up"
//   },
//   {
//     rank: 3,
//     name: "Sneha Reddy",
//     avatar: "/api/placeholder/40/40",
//     skills: ["Photography", "Video Editing"],
//     credits: 2420,
//     level: "Creative Pro",
//     trend: "stable"
//   },
//   {
//     rank: 4,
//     name: "Rohit Kumar",
//     avatar: "/api/placeholder/40/40",
//     skills: ["Fitness Training", "Nutrition"],
//     credits: 2180,
//     level: "Wellness Expert",
//     trend: "up"
//   },
//   {
//     rank: 5,
//     name: "Kavya Singh",
//     avatar: "/api/placeholder/40/40",
//     skills: ["Language Teaching", "Translation"],
//     credits: 1950,
//     level: "Rising Star",
//     trend: "up"
//   },
//   {
//     rank: 6,
//     name: "Vikram Gupta",
//     avatar: "/api/placeholder/40/40",
//     skills: ["Financial Planning", "Investment"],
//     credits: 1830,
//     level: "Money Mentor",
//     trend: "down"
//   },
//   {
//     rank: 7,
//     name: "Ananya Joshi",
//     avatar: "/api/placeholder/40/40",
//     skills: ["Music Production", "Sound Design"],
//     credits: 1720,
//     level: "Audio Artist",
//     trend: "up"
//   },
//   {
//     rank: 8,
//     name: "Rajesh Mehta",
//     avatar: "/api/placeholder/40/40",
//     skills: ["Business Consulting", "Strategy"],
//     credits: 1650,
//     level: "Strategy Sage",
//     trend: "stable"
//   },
//   {
//     rank: 9,
//     name: "Deepika Agarwal",
//     avatar: "/api/placeholder/40/40",
//     skills: ["Fashion Design", "Styling"],
//     credits: 1580,
//     level: "Style Guru",
//     trend: "up"
//   },
//   {
//     rank: 10,
//     name: "Manish Verma",
//     avatar: "/api/placeholder/40/40",
//     skills: ["Home Repair", "Maintenance"],
//     credits: 1520,
//     level: "Fix-It Pro",
//     trend: "down"
//   }
// ]

// const creditFeatures = [
//   {
//     icon: Zap,
//     title: "Earn Credits",
//     description: "Share your skills and earn 50-950 credits per session based on complexity and duration.",
//     color: "text-saffron"
//   },
//   {
//     icon: Coins,
//     title: "Spend Wisely",
//     description: "Book services from other skill-sharers. Rates start from 100 credits per hour.",
//     color: "text-jet-stream-300"
//   },
//   {
//     icon: Gift,
//     title: "Bonus System",
//     description: "Complete your profile, get verified, and earn bonus credits. First session free!",
//     color: "text-accent"
//   },
//   {
//     icon: Users,
//     title: "Referral Rewards",
//     description: "Invite friends and earn 950 credits for each successful referral who completes a session.",
//     color: "text-jet-stream-400"
//   }
// ]

// function getRankIcon(rank: number) {
//   switch (rank) {
//     case 1:
//       return <Crown className="w-4 h-4 text-saffron" />
//     case 2:
//       return <Award className="w-4 h-4 text-jet-stream-300" />
//     case 3:
//       return <Star className="w-4 h-4 text-accent" />
//     default:
//       return <span className="text-sm font-medium text-gray-300">#{rank}</span>
//   }
// }

// function getLevelBadgeColor(level: string) {
//   switch (level) {
//     case "Skill Master":
//       return "bg-saffron/20 text-saffron border-saffron/30"
//     case "Community Champion":
//       return "bg-accent/20 text-accent border-accent/30"
//     case "Creative Pro":
//       return "bg-purple-500/20 text-purple-400 border-purple-500/30"
//     case "Rising Star":
//       return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
//     default:
//       return "bg-jet-stream-400/20 text-jet-stream-300 border-jet-stream-400/30"
//   }
// }

// function getTrendIcon(trend: string) {
//   switch (trend) {
//     case "up":
//       return <TrendingUp className="w-3 h-3 text-green-400" />
//     case "down":
//       return <TrendingUp className="w-3 h-3 text-red-400 rotate-180" />
//     default:
//       return null
//   }
// }

// export default function LeaderboardCredits() {
//   const [visibleItems, setVisibleItems] = useState(5)
//   const scrollY = useMotionValue(0)
//   const opacity = useTransform(scrollY, [0, 300], [0, 1])
//   const scale = useTransform(scrollY, [0, 300], [0.8, 1])

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setVisibleItems(prev => prev < 10 ? prev + 1 : 10)
//     }, 950)

//     return () => clearInterval(timer)
//   }, [])

//   useMotionValueEvent(scrollY, "change", (latest) => {
//     if (typeof window !== "undefined") {
//       scrollY.set(window.scrollY)
//     }
//   })

//   return (
//     <section className="bg-jet-stream-950 py-20 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-6 lg:px-8">
//         <motion.div
//           style={{ opacity, scale }}
//           className="text-center mb-16"
//         >
//           <h2 className="font-[var(--font-display)] text-4xl lg:text-5xl font-bold text-white mb-6">
//             Community Leaders & SkillCredits
//           </h2>
//           <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//             Discover our top skill-sharers and learn how our credit system rewards community participation
//           </p>
//         </motion.div>

//         <div className="grid lg:grid-cols-2 gap-12">
//           {/* Leaderboard Section */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//             className="space-y-6"
//           >
//             <div className="flex items-center gap-3 mb-8">
//               <Crown className="w-8 h-8 text-saffron" />
//               <h3 className="font-[var(--font-display)] text-3xl font-bold text-white">
//                 Community Leaders
//               </h3>
//             </div>

//             <div className="space-y-4">
//               {leaderboardData.slice(0, visibleItems).map((user, index) => (
//                 <motion.div
//                   key={user.rank}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                 >
//                   <Card className="bg-jet-stream-900 border-jet-stream-400/20 hover:border-jet-stream-400/40 transition-all duration-300 group hover:shadow-lg hover:shadow-saffron/10">
//                     <CardContent className="p-4">
//                       <div className="flex items-center gap-4">
//                         <div className="flex items-center justify-center w-10 h-10 rounded-sm bg-jet-stream-950 border border-jet-stream-400/30">
//                           {getRankIcon(user.rank)}
//                         </div>

//                         <div className="w-10 h-10 rounded-sm overflow-hidden bg-jet-stream-950 border border-jet-stream-400/30 flex-shrink-0">
//                           <div className="w-full h-full bg-gradient-to-br from-saffron/20 to-accent/20" />
//                         </div>

//                         <div className="flex-1 min-w-0">
//                           <div className="flex items-center gap-2 mb-1">
//                             <h4 className="font-[var(--font-display)] font-semibold text-white truncate">
//                               {user.name}
//                             </h4>
//                             {getTrendIcon(user.trend)}
//                           </div>
                          
//                           <div className="flex flex-wrap gap-1 mb-2">
//                             {user.skills.slice(0, 2).map((skill, skillIndex) => (
//                               <Badge
//                                 key={skillIndex}
//                                 variant="outline"
//                                 className="text-xs px-2 py-0 bg-jet-stream-950/50 text-gray-300 border-jet-stream-400/30"
//                               >
//                                 {skill}
//                               </Badge>
//                             ))}
//                           </div>

//                           <Badge className={`text-xs px-2 py-1 ${getLevelBadgeColor(user.level)}`}>
//                             {user.level}
//                           </Badge>
//                         </div>

//                         <div className="text-right flex-shrink-0">
//                           <div className="flex items-center gap-1 text-saffron font-bold">
//                             <Coins className="w-4 h-4" />
//                             <span className="font-[var(--font-display)]">
//                               {user.credits.toLocaleString()}
//                             </span>
//                           </div>
//                           <div className="text-xs text-gray-400 mt-1">credits</div>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               ))}
//             </div>

//             {visibleItems < 10 && (
//               <motion.div
//                 animate={{ opacity: [0.5, 1, 0.5] }}
//                 transition={{ repeat: Infinity, duration: 2 }}
//                 className="text-center py-4"
//               >
//                 <div className="text-sm text-gray-400">Loading more leaders...</div>
//                 <Progress value={(visibleItems / 10) * 100} className="w-32 mx-auto mt-2" />
//               </motion.div>
//             )}
//           </motion.div>

//           {/* Credits System Section */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//             className="space-y-6"
//           >
//             <div className="flex items-center gap-3 mb-8">
//               <Coins className="w-8 h-8 text-accent" />
//               <h3 className="font-[var(--font-display)] text-3xl font-bold text-white">
//                 SkillCredits System
//               </h3>
//             </div>

//             <Card className="bg-jet-stream-900 border-jet-stream-400/20 p-6 mb-8">
//               <CardContent className="p-0">
//                 <div className="text-center mb-6">
//                   <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-saffron/20 border-2 border-saffron/30 mb-4">
//                     <Coins className="w-8 h-8 text-saffron" />
//                   </div>
//                   <h4 className="font-[var(--font-display)] text-xl font-bold text-white mb-2">
//                     Your Credit Balance
//                   </h4>
//                   <div className="text-3xl font-bold text-saffron font-[var(--font-display)]">
//                     1,250 Credits
//                   </div>
//                 </div>

//                 <div className="space-y-3">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-300">This Month's Earnings</span>
//                     <span className="text-green-400 font-semibold">+420 credits</span>
//                   </div>
//                   <Progress value={68} className="h-2" />
//                   <div className="text-xs text-gray-400 text-center">
//                     580 more credits to reach Skill Master level
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <div className="grid gap-6">
//               {creditFeatures.map((feature, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   viewport={{ once: true }}
//                 >
//                   <Card className="bg-jet-stream-900 border-jet-stream-400/20 hover:border-jet-stream-400/40 transition-all duration-300 group hover:shadow-lg hover:shadow-accent/10">
//                     <CardContent className="p-6">
//                       <div className="flex items-start gap-4">
//                         <div className="flex-shrink-0">
//                           <div className="w-12 h-12 rounded-sm bg-jet-stream-950 border border-jet-stream-400/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                             <feature.icon className={`w-6 h-6 ${feature.color}`} />
//                           </div>
//                         </div>
//                         <div className="flex-1">
//                           <h4 className="font-[var(--font-display)] text-lg font-semibold text-white mb-2">
//                             {feature.title}
//                           </h4>
//                           <p className="text-gray-300 text-sm leading-relaxed">
//                             {feature.description}
//                           </p>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               ))}
//             </div>

//             <Card className="bg-gradient-to-r from-saffron/10 to-accent/10 border-saffron/20 p-6">
//               <CardContent className="p-0 text-center">
//                 <Star className="w-8 h-8 text-saffron mx-auto mb-3" />
//                 <h4 className="font-[var(--font-display)] text-lg font-bold text-white mb-2">
//                   Pro Tip
//                 </h4>
//                 <p className="text-gray-300 text-sm">
//                   Complete your first 5 skill-sharing sessions to unlock premium features and earn a 500 credit bonus!
//                 </p>
//               </CardContent>
//             </Card>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   )
// }


"use client"

import { motion, useMotionValue, useTransform, useMotionValueEvent, useScroll } from "motion/react"
import { Badge } from "../ui/badge"
import { Card, CardContent } from "../ui/card"
import { Progress } from "../ui/progress"
import { Crown, Star, TrendingUp, Coins, Gift, Users, Zap, Award, Sparkles, Trophy, Target } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import React from "react"

interface LeaderboardUser {
  rank: number
  name: string
  avatar: string
  skills: string[]
  credits: number
  level: string
  trend: "up" | "down" | "stable"
  completedSessions: number
  rating: number
}

const leaderboardData: LeaderboardUser[] = [
  {
    rank: 1,
    name: "Priya Sharma",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Priya%20Sharma",
    skills: ["Digital Marketing", "Content Writing"],
    credits: 2840,
    level: "Skill Master",
    trend: "up",
    completedSessions: 147,
    rating: 4.9
  },
  {
    rank: 2,
    name: "Arjun Patel",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Arjun%20Patel",
    skills: ["Web Development", "UI/UX Design"],
    credits: 2650,
    level: "Community Champion",
    trend: "up",
    completedSessions: 132,
    rating: 4.8
  },
  {
    rank: 3,
    name: "Sneha Reddy",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Sneha%20Reddy",
    skills: ["Photography", "Video Editing"],
    credits: 2420,
    level: "Creative Pro",
    trend: "stable",
    completedSessions: 98,
    rating: 4.9
  },
  {
    rank: 4,
    name: "Rohit Kumar",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Rohit%20Kumar",
    skills: ["Fitness Training", "Nutrition"],
    credits: 2180,
    level: "Wellness Expert",
    trend: "up",
    completedSessions: 85,
    rating: 4.7
  },
  {
    rank: 5,
    name: "Kavya Singh",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Kavya%20Singh",
    skills: ["Language Teaching", "Translation"],
    credits: 1950,
    level: "Rising Star",
    trend: "up",
    completedSessions: 76,
    rating: 4.8
  },
  {
    rank: 6,
    name: "Vikram Gupta",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Vikram%20Gupta",
    skills: ["Financial Planning", "Investment"],
    credits: 1830,
    level: "Money Mentor",
    trend: "down",
    completedSessions: 64,
    rating: 4.6
  },
  {
    rank: 7,
    name: "Ananya Joshi",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Ananya%20Joshi",
    skills: ["Music Production", "Sound Design"],
    credits: 1720,
    level: "Audio Artist",
    trend: "up",
    completedSessions: 58,
    rating: 4.8
  }
  
]

const creditFeatures = [
  {
    icon: Zap,
    title: "Earn Credits",
    description: "Share your skills and earn 50-950 credits per session based on complexity and duration.",
    color: "text-jet-stream-300",
    bgGradient: "from-jet-stream-300/20 via-jet-stream-300/10 to-transparent"
  },
  {
    icon: Coins,
    title: "Spend Wisely",
    description: "Book services from other skill-sharers. Rates start from 100 credits per hour.",
    color: "text-jet-stream-300",
    bgGradient: "from-jet-stream-300/20 via-jet-stream-300/10 to-transparent"
  },
  {
    icon: Gift,
    title: "Bonus System",
    description: "Complete your profile, get verified, and earn bonus credits. First session free!",
    color: "text-accent",
    bgGradient: "from-accent/20 via-accent/10 to-transparent"
  },
  {
    icon: Users,
    title: "Referral Rewards",
    description: "Invite friends and earn 950 credits for each successful referral who completes a session.",
    color: "text-jet-stream-400",
    bgGradient: "from-jet-stream-400/20 via-jet-stream-400/10 to-transparent"
  }
]

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Crown className="w-4 sm:w-5 h-4 sm:h-5 text-jet-stream-300 drop-shadow-lg" />
    case 2:
      return <Award className="w-4 sm:w-5 h-4 sm:h-5 text-jet-stream-300 drop-shadow-lg" />
    case 3:
      return <Star className="w-4 sm:w-5 h-4 sm:h-5 text-accent drop-shadow-lg" />
    default:
      return <span className="text-sm font-bold text-gray-300">#{rank}</span>
  }
}

function getLevelBadgeColor(level: string) {
  switch (level) {
    case "Skill Master":
      return "bg-accent/20 text-accent border-accent/40 shadow-accent/20 shadow-md"
    case "Community Champion":
      return "bg-accent/20 text-accent border-accent/40 shadow-accent/20 shadow-md"
    case "Creative Pro":
      return "bg-purple-500/20 text-purple-400 border-purple-500/40 shadow-purple-500/20 shadow-md"
    case "Rising Star":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/40 shadow-yellow-500/20 shadow-md"
    default:
      return "bg-jet-stream-400/20 text-jet-stream-300 border-jet-stream-400/40 shadow-jet-stream-400/20 shadow-md"
  }
}

function getTrendIcon(trend: string) {
  switch (trend) {
    case "up":
      return <TrendingUp className="w-3 h-3 text-green-400 drop-shadow-sm" />
    case "down":
      return <TrendingUp className="w-3 h-3 text-red-400 rotate-180 drop-shadow-sm" />
    default:
      return null
  }
}

export default function LeaderboardCredits() {
  const [visibleItems, setVisibleItems] = useState(3)
  const [currentBalance, setCurrentBalance] = useState(0)
  const [monthlyEarnings, setMonthlyEarnings] = useState(0)
  const { scrollYProgress } = useScroll()
  const sectionRef = useRef<HTMLDivElement>(null)
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleItems(prev => prev < 8 ? prev + 1 : 8)
    }, 300)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const balanceTimer = setInterval(() => {
      setCurrentBalance(prev => prev < 1250 ? prev + 25 : 1250)
    }, 50)

    const earningsTimer = setInterval(() => {
      setMonthlyEarnings(prev => prev < 420 ? prev + 8 : 420)
    }, 40)

    return () => {
      clearInterval(balanceTimer)
      clearInterval(earningsTimer)
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="bg-jet-stream-950 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 overflow-hidden relative"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0"
        >
          {/* Floating geometric shapes */}
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity },
              opacity: { duration: 3, repeat: Infinity }
            }}
            className="absolute top-20 right-10 w-32 h-32 border border-saffron/20 rounded-full"
          />
          <motion.div
            animate={{ 
              rotate: -360,
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ 
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              y: { duration: 6, repeat: Infinity },
              opacity: { duration: 4, repeat: Infinity }
            }}
            className="absolute bottom-40 left-20 w-24 h-24 border border-saffron/20 transform rotate-45"
          />
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/4 w-48 h-48 bg-gradient-to-br from-jet-stream-400/10 to-transparent rounded-full blur-xl"
          />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <Trophy className="w-6 sm:w-8 h-6 sm:h-8 text-saffron" />
            {/* <Sparkles className="w-4 sm:w-6 h-4 sm:h-6 text-accent" /> */}
          </motion.div>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Community Leaders &{" "}
            <span className="bg-gradient-to-r from-saffron via-accent to-jet-stream-300 bg-clip-text text-transparent">
              SkillCredits
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover our top skill-sharers and learn how our credit system rewards community participation
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Leaderboard Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-6"
          >
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative"
              >
                <Crown className="w-6 sm:w-8 h-6 sm:h-8 text-saffron drop-shadow-lg" />
                <motion.div
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute -inset-1 bg-saffron/20 rounded-full blur-sm"
                />
              </motion.div>
              <h3 className="font-[var(--font-display)] text-2xl sm:text-3xl font-bold text-white">
                Community Leaders
              </h3>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {leaderboardData.slice(0, visibleItems).map((user, index) => (
                <motion.div
                  key={user.rank}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    delay: index * 0.15,
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className={`relative ${user.rank <= 3 ? 'z-10' : 'z-0'}`}
                >
                  <Card className={`
                    bg-gradient-to-r from-jet-stream-900 via-jet-stream-900/95 to-jet-stream-900/90 
                    border-2 transition-all duration-500 group cursor-pointer overflow-hidden
                    ${user.rank === 1 ? 'border-saffron/40 hover:border-saffron/60 hover:shadow-2xl hover:shadow-saffron/20' : 
                      user.rank === 2 ? 'border-jet-stream-300/40 hover:border-jet-stream-300/60 hover:shadow-xl hover:shadow-jet-stream-300/20' :
                      user.rank === 3 ? 'border-accent/40 hover:border-accent/60 hover:shadow-xl hover:shadow-accent/20' :
                      'border-jet-stream-400/20 hover:border-jet-stream-400/40 hover:shadow-lg hover:shadow-jet-stream-400/10'}
                  `}>
                    {/* Rank indicator line */}
                    <div className={`absolute top-0 left-0 w-full h-1 ${
                      user.rank === 1 ? 'bg-gradient-to-r from-saffron to-saffron/60' :
                      user.rank === 2 ? 'bg-gradient-to-r from-jet-stream-300 to-jet-stream-300/60' :
                      user.rank === 3 ? 'bg-gradient-to-r from-accent to-accent/60' :
                      'bg-gradient-to-r from-jet-stream-400 to-jet-stream-400/60'
                    }`} />

                    <CardContent className="p-3 sm:p-4">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <motion.div 
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-jet-stream-950 border-2 border-jet-stream-400/30 group-hover:border-jet-stream-400/60 transition-all duration-300"
                        >
                          {getRankIcon(user.rank)}
                        </motion.div>

                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg overflow-hidden bg-jet-stream-950 border-2 border-jet-stream-400/30 group-hover:border-jet-stream-400/60 transition-all duration-300 flex-shrink-0"
                        >
                          <img 
                            src={user.avatar} 
                            alt={user.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </motion.div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-[var(--font-display)] font-semibold text-white text-sm sm:text-base truncate">
                              {user.name}
                            </h4>
                            <motion.div
                              animate={{ scale: user.trend === 'up' ? [1, 1.2, 1] : 1 }}
                              transition={{ duration: 1, repeat: user.trend === 'up' ? Infinity : 0 }}
                            >
                              {getTrendIcon(user.trend)}
                            </motion.div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mb-2">
                            {user.skills.slice(0, 2).map((skill, skillIndex) => (
                              <Badge
                                key={skillIndex}
                                variant="outline"
                                className="text-xs px-2 py-0 bg-jet-stream-950/50 text-gray-300 border-jet-stream-400/30 hover:border-jet-stream-400/60 transition-colors duration-950"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>

                          <Badge className={`text-xs px-2 py-1 ${getLevelBadgeColor(user.level)}`}>
                            {user.level}
                          </Badge>

                          <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                            <span>{user.completedSessions} sessions</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span>{user.rating}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-1 text-saffron font-bold"
                          >
                            <motion.div
                              animate={{ rotate: [0, 15, -15, 0] }}
                              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            >
                              <Coins className="w-4 h-4" />
                            </motion.div>
                            <span className="font-[var(--font-display)] text-sm sm:text-base">
                              {user.credits.toLocaleString()}
                            </span>
                          </motion.div>
                          <div className="text-xs text-gray-400 mt-1">credits</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {visibleItems < 8 && (
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-center py-4"
              >
                <div className="text-sm text-gray-400 mb-2">Loading more leaders...</div>
                <Progress 
                  value={(visibleItems / 8) * 100} 
                  className="w-32 mx-auto h-2"
                />
              </motion.div>
            )}
          </motion.div>

          {/* Credits System Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-6"
          >
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <Coins className="w-6 sm:w-8 h-6 sm:h-8 text-accent drop-shadow-lg" />
                <motion.div
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -inset-2 bg-accent/20 rounded-full blur-md"
                />
              </motion.div>
              <h3 className="font-[var(--font-display)] text-2xl sm:text-3xl font-bold text-white">
                SkillCredits System
              </h3>
            </div>

            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-gradient-to-br from-jet-stream-900 via-jet-stream-900/95 to-jet-stream-800/90 border-2 border-jet-stream-400/20 hover:border-saffron/40 p-4 sm:p-6 mb-6 sm:mb-8 transition-all duration-500 hover:shadow-2xl hover:shadow-saffron/20 relative overflow-hidden">
                {/* Animated background glow */}
                <motion.div
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-br from-saffron/5 via-transparent to-accent/5"
                />
                
                <CardContent className="p-0 relative z-10">
                  <div className="text-center mb-4 sm:mb-6">
                    <motion.div
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity }
                      }}
                      className="inline-flex items-center justify-center w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-gradient-to-br from-saffron/20 via-saffron/30 to-saffron/20 border-2 border-saffron/40 mb-3 sm:mb-4 shadow-lg shadow-saffron/30"
                    >
                      <Coins className="w-6 sm:w-8 h-6 sm:h-8 text-saffron" />
                    </motion.div>
                    <h4 className="font-[var(--font-display)] text-lg sm:text-xl font-bold text-white mb-2">
                      Your Credit Balance
                    </h4>
                    <motion.div 
                      className="text-2xl sm:text-3xl font-bold text-saffron font-[var(--font-display)]"
                      animate={{ scale: currentBalance === 1250 ? [1, 1.05, 1] : 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {currentBalance.toLocaleString()} Credits
                    </motion.div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">This Month's Earnings</span>
                      <motion.span 
                        className="text-green-400 font-semibold"
                        animate={{ opacity: monthlyEarnings === 420 ? [1, 0.7, 1] : 1 }}
                        transition={{ duration: 1, repeat: monthlyEarnings === 420 ? Infinity : 0 }}
                      >
                        +{monthlyEarnings} credits
                      </motion.span>
                    </div>
                    <Progress value={68} className="h-2 bg-jet-stream-800" />
                    <div className="text-xs text-gray-400 text-center">
                      580 more credits to reach Skill Master level
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid gap-4 sm:gap-6">
              {creditFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group"
                >
                  <Card className="bg-gradient-to-r from-jet-stream-900 via-jet-stream-900/95 to-jet-stream-900/90 border-2 border-jet-stream-400/20 hover:border-jet-stream-400/40 transition-all duration-500 hover:shadow-xl hover:shadow-accent/10 relative overflow-hidden">
                    {/* Animated gradient background */}
                    <motion.div
                      animate={{ opacity: [0, 0.5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                      className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient}`}
                    />
                    
                    <CardContent className="p-4 sm:p-6 relative z-10">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <motion.div
                          whileHover={{ scale: 1.15, rotate: 10 }}
                          transition={{ type: "spring", stiffness: 400 }}
                          className="flex-shrink-0"
                        >
                          <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-jet-stream-950 border-2 border-jet-stream-400/30 flex items-center justify-center group-hover:border-jet-stream-400/60 transition-all duration-300 shadow-lg">
                            <feature.icon className={`w-5 sm:w-6 h-5 sm:h-6 ${feature.color}`} />
                          </div>
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-[var(--font-display)] text-base sm:text-lg font-semibold text-white mb-2">
                            {feature.title}
                          </h4>
                          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-gradient-to-r from-saffron/10 via-accent/10 to-jet-stream-400/10 border-2 border-saffron/30 p-4 sm:p-6 relative overflow-hidden hover:shadow-xl hover:shadow-saffron/20 transition-all duration-500">
                <motion.div
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3] 
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-2 right-2"
                >
                  <Sparkles className="w-4 sm:w-6 h-4 sm:h-6 text-accent/60" />
                </motion.div>
                
                <CardContent className="p-0 text-center relative z-10">
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Star className="w-6 sm:w-8 h-6 sm:h-8 text-saffron mx-auto mb-3" />
                  </motion.div>
                  <h4 className="font-[var(--font-display)] text-base sm:text-lg font-bold text-white mb-2">
                    Pro Tip
                  </h4>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                    Complete your first 5 skill-sharing sessions to unlock premium features and earn a 500 credit bonus!
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Additional Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {[
            { icon: Users, label: "Active Members", value: "12.5K+", color: "text-accent" },
            { icon: Target, label: "Skills Shared", value: "850+", color: "text-saffron" },
            { icon: Zap, label: "Sessions Completed", value: "25.3K+", color: "text-jet-stream-300" },
            { icon: Trophy, label: "Success Rate", value: "96%", color: "text-green-400" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-gradient-to-br from-jet-stream-900/80 to-jet-stream-800/60 border-2 border-jet-stream-400/20 hover:border-jet-stream-400/40 p-4 sm:p-6 text-center group transition-all duration-500 hover:shadow-lg hover:shadow-jet-stream-400/20">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  className="mb-3"
                >
                  <stat.icon className={`w-6 sm:w-8 h-6 sm:h-8 ${stat.color} mx-auto`} />
                </motion.div>
                <div className={`text-xl sm:text-2xl font-bold ${stat.color} font-[var(--font-display)] mb-1`}>
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-400 font-medium">
                  {stat.label}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}