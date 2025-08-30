


// "use client"

// import { motion, useMotionValue, useTransform, useMotionValueEvent, useScroll } from "motion/react"
// import { Badge } from "../ui/badge"
// import { Card, CardContent } from "../ui/card"
// import { Progress } from "../ui/progress"
// import { Crown, Star, TrendingUp, Coins, Gift, Users, Zap, Award, Sparkles, Trophy, Target } from "lucide-react"
// import { useEffect, useState, useRef } from "react"
// import React from "react"

// interface LeaderboardUser {
//   rank: number
//   name: string
//   avatar: string
//   skills: string[]
//   credits: number
//   level: string
//   trend: "up" | "down" | "stable"
//   completedSessions: number
//   rating: number
// }

// const leaderboardData: LeaderboardUser[] = [
//   {
//     rank: 1,
//     name: "Priya Sharma",
//     avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Priya%20Sharma",
//     skills: ["Digital Marketing", "Content Writing"],
//     credits: 2840,
//     level: "Skill Master",
//     trend: "up",
//     completedSessions: 147,
//     rating: 4.9
//   },
//   {
//     rank: 2,
//     name: "Arjun Patel",
//     avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Arjun%20Patel",
//     skills: ["Web Development", "UI/UX Design"],
//     credits: 2650,
//     level: "Community Champion",
//     trend: "up",
//     completedSessions: 132,
//     rating: 4.8
//   },
//   {
//     rank: 3,
//     name: "Sneha Reddy",
//     avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Sneha%20Reddy",
//     skills: ["Photography", "Video Editing"],
//     credits: 2420,
//     level: "Creative Pro",
//     trend: "stable",
//     completedSessions: 98,
//     rating: 4.9
//   },
//   {
//     rank: 4,
//     name: "Rohit Kumar",
//     avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Rohit%20Kumar",
//     skills: ["Fitness Training", "Nutrition"],
//     credits: 2180,
//     level: "Wellness Expert",
//     trend: "up",
//     completedSessions: 85,
//     rating: 4.7
//   },
//   {
//     rank: 5,
//     name: "Kavya Singh",
//     avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Kavya%20Singh",
//     skills: ["Language Teaching", "Translation"],
//     credits: 1950,
//     level: "Rising Star",
//     trend: "up",
//     completedSessions: 76,
//     rating: 4.8
//   },
//   {
//     rank: 6,
//     name: "Vikram Gupta",
//     avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Vikram%20Gupta",
//     skills: ["Financial Planning", "Investment"],
//     credits: 1830,
//     level: "Money Mentor",
//     trend: "down",
//     completedSessions: 64,
//     rating: 4.6
//   },
//   {
//     rank: 7,
//     name: "Ananya Joshi",
//     avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Ananya%20Joshi",
//     skills: ["Music Production", "Sound Design"],
//     credits: 1720,
//     level: "Audio Artist",
//     trend: "up",
//     completedSessions: 58,
//     rating: 4.8
//   }
  
// ]

// const creditFeatures = [
//   {
//     icon: Zap,
//     title: "Earn Credits",
//     description: "Share your skills and earn 50-950 credits per session based on complexity and duration.",
//     color: "text-jet-stream-300",
//     bgGradient: "from-jet-stream-300/20 via-jet-stream-300/10 to-transparent"
//   },
//   {
//     icon: Coins,
//     title: "Spend Wisely",
//     description: "Book services from other skill-sharers. Rates start from 100 credits per hour.",
//     color: "text-jet-stream-300",
//     bgGradient: "from-jet-stream-300/20 via-jet-stream-300/10 to-transparent"
//   },
//   {
//     icon: Gift,
//     title: "Bonus System",
//     description: "Complete your profile, get verified, and earn bonus credits. First session free!",
//     color: "text-accent",
//     bgGradient: "from-accent/20 via-accent/10 to-transparent"
//   },
//   {
//     icon: Users,
//     title: "Referral Rewards",
//     description: "Invite friends and earn 950 credits for each successful referral who completes a session.",
//     color: "text-jet-stream-400",
//     bgGradient: "from-jet-stream-400/20 via-jet-stream-400/10 to-transparent"
//   }
// ]

// function getRankIcon(rank: number) {
//   switch (rank) {
//     case 1:
//       return <Crown className="w-4 sm:w-5 h-4 sm:h-5 text-jet-stream-300 drop-shadow-lg" />
//     case 2:
//       return <Award className="w-4 sm:w-5 h-4 sm:h-5 text-jet-stream-300 drop-shadow-lg" />
//     case 3:
//       return <Star className="w-4 sm:w-5 h-4 sm:h-5 text-accent drop-shadow-lg" />
//     default:
//       return <span className="text-sm font-bold text-gray-300">#{rank}</span>
//   }
// }

// function getLevelBadgeColor(level: string) {
//   switch (level) {
//     case "Skill Master":
//       return "bg-accent/20 text-accent border-accent/40 shadow-accent/20 shadow-md"
//     case "Community Champion":
//       return "bg-accent/20 text-accent border-accent/40 shadow-accent/20 shadow-md"
//     case "Creative Pro":
//       return "bg-purple-500/20 text-purple-400 border-purple-500/40 shadow-purple-500/20 shadow-md"
//     case "Rising Star":
//       return "bg-yellow-500/20 text-yellow-400 border-yellow-500/40 shadow-yellow-500/20 shadow-md"
//     default:
//       return "bg-jet-stream-400/20 text-jet-stream-300 border-jet-stream-400/40 shadow-jet-stream-400/20 shadow-md"
//   }
// }

// function getTrendIcon(trend: string) {
//   switch (trend) {
//     case "up":
//       return <TrendingUp className="w-3 h-3 text-green-400 drop-shadow-sm" />
//     case "down":
//       return <TrendingUp className="w-3 h-3 text-red-400 rotate-180 drop-shadow-sm" />
//     default:
//       return null
//   }
// }

// export default function LeaderboardCredits() {
//   const [visibleItems, setVisibleItems] = useState(3)
//   const [currentBalance, setCurrentBalance] = useState(0)
//   const [monthlyEarnings, setMonthlyEarnings] = useState(0)
//   const { scrollYProgress } = useScroll()
//   const sectionRef = useRef<HTMLDivElement>(null)
  
//   const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
//   const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setVisibleItems(prev => prev < 8 ? prev + 1 : 8)
//     }, 300)

//     return () => clearInterval(timer)
//   }, [])

//   useEffect(() => {
//     const balanceTimer = setInterval(() => {
//       setCurrentBalance(prev => prev < 1250 ? prev + 25 : 1250)
//     }, 50)

//     const earningsTimer = setInterval(() => {
//       setMonthlyEarnings(prev => prev < 420 ? prev + 8 : 420)
//     }, 40)

//     return () => {
//       clearInterval(balanceTimer)
//       clearInterval(earningsTimer)
//     }
//   }, [])

//   return (
//     <section 
//       ref={sectionRef}
//       className="bg-jet-stream-950 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 overflow-hidden relative"
//     >
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <motion.div
//           style={{ y: backgroundY }}
//           className="absolute inset-0"
//         >
//           {/* Floating geometric shapes */}
//           <motion.div
//             animate={{ 
//               rotate: 360,
//               scale: [1, 1.1, 1],
//               opacity: [0.3, 0.6, 0.3]
//             }}
//             transition={{ 
//               rotate: { duration: 20, repeat: Infinity, ease: "linear" },
//               scale: { duration: 4, repeat: Infinity },
//               opacity: { duration: 3, repeat: Infinity }
//             }}
//             className="absolute top-20 right-10 w-32 h-32 border border-saffron/20 rounded-full"
//           />
//           <motion.div
//             animate={{ 
//               rotate: -360,
//               y: [0, -20, 0],
//               opacity: [0.2, 0.5, 0.2]
//             }}
//             transition={{ 
//               rotate: { duration: 25, repeat: Infinity, ease: "linear" },
//               y: { duration: 6, repeat: Infinity },
//               opacity: { duration: 4, repeat: Infinity }
//             }}
//             className="absolute bottom-40 left-20 w-24 h-24 border border-saffron/20 transform rotate-45"
//           />
//           <motion.div
//             animate={{ 
//               scale: [1, 1.2, 1],
//               opacity: [0.1, 0.3, 0.1]
//             }}
//             transition={{ 
//               duration: 5, 
//               repeat: Infinity,
//               ease: "easeInOut"
//             }}
//             className="absolute top-1/2 left-1/4 w-48 h-48 bg-gradient-to-br from-jet-stream-400/10 to-transparent rounded-full blur-xl"
//           />
//         </motion.div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="text-center mb-10 sm:mb-12 md:mb-16"
//         >
//           <motion.div
//             animate={{ rotate: [0, 5, -5, 0] }}
//             transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
//             className="inline-flex items-center gap-2 mb-4"
//           >
//             <Trophy className="w-6 sm:w-8 h-6 sm:h-8 text-saffron" />
//             {/* <Sparkles className="w-4 sm:w-6 h-4 sm:h-6 text-accent" /> */}
//           </motion.div>
//           <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
//             Community Leaders &{" "}
//             <span className="bg-gradient-to-r from-saffron via-accent to-jet-stream-300 bg-clip-text text-transparent">
//               SkillCredits
//             </span>
//           </h2>
//           <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
//             Discover our top skill-sharers and learn how our credit system rewards community participation
//           </p>
//         </motion.div>

//         <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
//           {/* Leaderboard Section */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//             className="space-y-4 sm:space-y-6"
//           >
//             <div className="flex items-center gap-3 mb-6 sm:mb-8">
//               <motion.div
//                 animate={{ scale: [1, 1.1, 1] }}
//                 transition={{ duration: 2, repeat: Infinity }}
//                 className="relative"
//               >
//                 <Crown className="w-6 sm:w-8 h-6 sm:h-8 text-saffron drop-shadow-lg" />
//                 <motion.div
//                   animate={{ opacity: [0, 1, 0] }}
//                   transition={{ duration: 1.5, repeat: Infinity }}
//                   className="absolute -inset-1 bg-saffron/20 rounded-full blur-sm"
//                 />
//               </motion.div>
//               <h3 className="font-[var(--font-display)] text-2xl sm:text-3xl font-bold text-white">
//                 Community Leaders
//               </h3>
//             </div>

//             <div className="space-y-3 sm:space-y-4">
//               {leaderboardData.slice(0, visibleItems).map((user, index) => (
//                 <motion.div
//                   key={user.rank}
//                   initial={{ opacity: 0, y: 20, scale: 0.95 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   transition={{ 
//                     delay: index * 0.15,
//                     duration: 0.6,
//                     type: "spring",
//                     stiffness: 100
//                   }}
//                   whileHover={{ y: -4, scale: 1.02 }}
//                   className={`relative ${user.rank <= 3 ? 'z-10' : 'z-0'}`}
//                 >
//                   <Card className={`
//                     bg-gradient-to-r from-jet-stream-900 via-jet-stream-900/95 to-jet-stream-900/90 
//                     border-2 transition-all duration-500 group cursor-pointer overflow-hidden
//                     ${user.rank === 1 ? 'border-saffron/40 hover:border-saffron/60 hover:shadow-2xl hover:shadow-saffron/20' : 
//                       user.rank === 2 ? 'border-jet-stream-300/40 hover:border-jet-stream-300/60 hover:shadow-xl hover:shadow-jet-stream-300/20' :
//                       user.rank === 3 ? 'border-accent/40 hover:border-accent/60 hover:shadow-xl hover:shadow-accent/20' :
//                       'border-jet-stream-400/20 hover:border-jet-stream-400/40 hover:shadow-lg hover:shadow-jet-stream-400/10'}
//                   `}>
//                     {/* Rank indicator line */}
//                     <div className={`absolute top-0 left-0 w-full h-1 ${
//                       user.rank === 1 ? 'bg-gradient-to-r from-saffron to-saffron/60' :
//                       user.rank === 2 ? 'bg-gradient-to-r from-jet-stream-300 to-jet-stream-300/60' :
//                       user.rank === 3 ? 'bg-gradient-to-r from-accent to-accent/60' :
//                       'bg-gradient-to-r from-jet-stream-400 to-jet-stream-400/60'
//                     }`} />

//                     <CardContent className="p-3 sm:p-4">
//                       <div className="flex items-center gap-3 sm:gap-4">
//                         <motion.div 
//                           whileHover={{ scale: 1.1, rotate: 5 }}
//                           className="flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-jet-stream-950 border-2 border-jet-stream-400/30 group-hover:border-jet-stream-400/60 transition-all duration-300"
//                         >
//                           {getRankIcon(user.rank)}
//                         </motion.div>

//                         <motion.div 
//                           whileHover={{ scale: 1.05 }}
//                           className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg overflow-hidden bg-jet-stream-950 border-2 border-jet-stream-400/30 group-hover:border-jet-stream-400/60 transition-all duration-300 flex-shrink-0"
//                         >
//                           <img 
//                             src={user.avatar} 
//                             alt={user.name}
//                             className="w-full h-full object-cover"
//                             loading="lazy"
//                           />
//                         </motion.div>

//                         <div className="flex-1 min-w-0">
//                           <div className="flex items-center gap-2 mb-1">
//                             <h4 className="font-[var(--font-display)] font-semibold text-white text-sm sm:text-base truncate">
//                               {user.name}
//                             </h4>
//                             <motion.div
//                               animate={{ scale: user.trend === 'up' ? [1, 1.2, 1] : 1 }}
//                               transition={{ duration: 1, repeat: user.trend === 'up' ? Infinity : 0 }}
//                             >
//                               {getTrendIcon(user.trend)}
//                             </motion.div>
//                           </div>
                          
//                           <div className="flex flex-wrap gap-1 mb-2">
//                             {user.skills.slice(0, 2).map((skill, skillIndex) => (
//                               <Badge
//                                 key={skillIndex}
//                                 variant="outline"
//                                 className="text-xs px-2 py-0 bg-jet-stream-950/50 text-gray-300 border-jet-stream-400/30 hover:border-jet-stream-400/60 transition-colors duration-950"
//                               >
//                                 {skill}
//                               </Badge>
//                             ))}
//                           </div>

//                           <Badge className={`text-xs px-2 py-1 ${getLevelBadgeColor(user.level)}`}>
//                             {user.level}
//                           </Badge>

//                           <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
//                             <span>{user.completedSessions} sessions</span>
//                             <div className="flex items-center gap-1">
//                               <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
//                               <span>{user.rating}</span>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="text-right flex-shrink-0">
//                           <motion.div 
//                             whileHover={{ scale: 1.05 }}
//                             className="flex items-center gap-1 text-saffron font-bold"
//                           >
//                             <motion.div
//                               animate={{ rotate: [0, 15, -15, 0] }}
//                               transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
//                             >
//                               <Coins className="w-4 h-4" />
//                             </motion.div>
//                             <span className="font-[var(--font-display)] text-sm sm:text-base">
//                               {user.credits.toLocaleString()}
//                             </span>
//                           </motion.div>
//                           <div className="text-xs text-gray-400 mt-1">credits</div>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               ))}
//             </div>

//             {visibleItems < 8 && (
//               <motion.div
//                 animate={{ opacity: [0.5, 1, 0.5] }}
//                 transition={{ repeat: Infinity, duration: 2 }}
//                 className="text-center py-4"
//               >
//                 <div className="text-sm text-gray-400 mb-2">Loading more leaders...</div>
//                 <Progress 
//                   value={(visibleItems / 8) * 100} 
//                   className="w-32 mx-auto h-2"
//                 />
//               </motion.div>
//             )}
//           </motion.div>

//           {/* Credits System Section */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//             className="space-y-4 sm:space-y-6"
//           >
//             <div className="flex items-center gap-3 mb-6 sm:mb-8">
//               <motion.div
//                 animate={{ 
//                   rotate: [0, 10, -10, 0],
//                   scale: [1, 1.1, 1]
//                 }}
//                 transition={{ 
//                   duration: 3, 
//                   repeat: Infinity,
//                   ease: "easeInOut"
//                 }}
//                 className="relative"
//               >
//                 <Coins className="w-6 sm:w-8 h-6 sm:h-8 text-accent drop-shadow-lg" />
//                 <motion.div
//                   animate={{ opacity: [0, 0.5, 0] }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                   className="absolute -inset-2 bg-accent/20 rounded-full blur-md"
//                 />
//               </motion.div>
//               <h3 className="font-[var(--font-display)] text-2xl sm:text-3xl font-bold text-white">
//                 SkillCredits System
//               </h3>
//             </div>

//             <motion.div
//               whileHover={{ scale: 1.02, y: -4 }}
//               transition={{ type: "spring", stiffness: 300 }}
//             >
//               <Card className="bg-gradient-to-br from-jet-stream-900 via-jet-stream-900/95 to-jet-stream-800/90 border-2 border-jet-stream-400/20 hover:border-saffron/40 p-4 sm:p-6 mb-6 sm:mb-8 transition-all duration-500 hover:shadow-2xl hover:shadow-saffron/20 relative overflow-hidden">
//                 {/* Animated background glow */}
//                 <motion.div
//                   animate={{ opacity: [0.1, 0.3, 0.1] }}
//                   transition={{ duration: 4, repeat: Infinity }}
//                   className="absolute inset-0 bg-gradient-to-br from-saffron/5 via-transparent to-accent/5"
//                 />
                
//                 <CardContent className="p-0 relative z-10">
//                   <div className="text-center mb-4 sm:mb-6">
//                     <motion.div
//                       animate={{ 
//                         rotate: [0, 360],
//                         scale: [1, 1.1, 1]
//                       }}
//                       transition={{ 
//                         rotate: { duration: 8, repeat: Infinity, ease: "linear" },
//                         scale: { duration: 2, repeat: Infinity }
//                       }}
//                       className="inline-flex items-center justify-center w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-gradient-to-br from-saffron/20 via-saffron/30 to-saffron/20 border-2 border-saffron/40 mb-3 sm:mb-4 shadow-lg shadow-saffron/30"
//                     >
//                       <Coins className="w-6 sm:w-8 h-6 sm:h-8 text-saffron" />
//                     </motion.div>
//                     <h4 className="font-[var(--font-display)] text-lg sm:text-xl font-bold text-white mb-2">
//                       Your Credit Balance
//                     </h4>
//                     <motion.div 
//                       className="text-2xl sm:text-3xl font-bold text-saffron font-[var(--font-display)]"
//                       animate={{ scale: currentBalance === 1250 ? [1, 1.05, 1] : 1 }}
//                       transition={{ duration: 0.5 }}
//                     >
//                       {currentBalance.toLocaleString()} Credits
//                     </motion.div>
//                   </div>

//                   <div className="space-y-3">
//                     <div className="flex justify-between text-sm">
//                       <span className="text-gray-300">This Month's Earnings</span>
//                       <motion.span 
//                         className="text-green-400 font-semibold"
//                         animate={{ opacity: monthlyEarnings === 420 ? [1, 0.7, 1] : 1 }}
//                         transition={{ duration: 1, repeat: monthlyEarnings === 420 ? Infinity : 0 }}
//                       >
//                         +{monthlyEarnings} credits
//                       </motion.span>
//                     </div>
//                     <Progress value={68} className="h-2 bg-jet-stream-800" />
//                     <div className="text-xs text-gray-400 text-center">
//                       580 more credits to reach Skill Master level
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>

//             <div className="grid gap-4 sm:gap-6">
//               {creditFeatures.map((feature, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1, duration: 0.6 }}
//                   viewport={{ once: true }}
//                   whileHover={{ y: -4, scale: 1.02 }}
//                   className="group"
//                 >
//                   <Card className="bg-gradient-to-r from-jet-stream-900 via-jet-stream-900/95 to-jet-stream-900/90 border-2 border-jet-stream-400/20 hover:border-jet-stream-400/40 transition-all duration-500 hover:shadow-xl hover:shadow-accent/10 relative overflow-hidden">
//                     {/* Animated gradient background */}
//                     <motion.div
//                       animate={{ opacity: [0, 0.5, 0] }}
//                       transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
//                       className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient}`}
//                     />
                    
//                     <CardContent className="p-4 sm:p-6 relative z-10">
//                       <div className="flex items-start gap-3 sm:gap-4">
//                         <motion.div
//                           whileHover={{ scale: 1.15, rotate: 10 }}
//                           transition={{ type: "spring", stiffness: 400 }}
//                           className="flex-shrink-0"
//                         >
//                           <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-jet-stream-950 border-2 border-jet-stream-400/30 flex items-center justify-center group-hover:border-jet-stream-400/60 transition-all duration-300 shadow-lg">
//                             <feature.icon className={`w-5 sm:w-6 h-5 sm:h-6 ${feature.color}`} />
//                           </div>
//                         </motion.div>
//                         <div className="flex-1 min-w-0">
//                           <h4 className="font-[var(--font-display)] text-base sm:text-lg font-semibold text-white mb-2">
//                             {feature.title}
//                           </h4>
//                           <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
//                             {feature.description}
//                           </p>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               ))}
//             </div>

//             <motion.div
//               whileHover={{ scale: 1.02, y: -2 }}
//               transition={{ type: "spring", stiffness: 300 }}
//             >
//               <Card className="bg-gradient-to-r from-saffron/10 via-accent/10 to-jet-stream-400/10 border-2 border-saffron/30 p-4 sm:p-6 relative overflow-hidden hover:shadow-xl hover:shadow-saffron/20 transition-all duration-500">
//                 <motion.div
//                   animate={{ 
//                     scale: [1, 1.5, 1],
//                     opacity: [0.3, 0.6, 0.3] 
//                   }}
//                   transition={{ duration: 3, repeat: Infinity }}
//                   className="absolute top-2 right-2"
//                 >
//                   <Sparkles className="w-4 sm:w-6 h-4 sm:h-6 text-accent/60" />
//                 </motion.div>
                
//                 <CardContent className="p-0 text-center relative z-10">
//                   <motion.div
//                     animate={{ rotate: [0, 15, -15, 0] }}
//                     transition={{ duration: 4, repeat: Infinity }}
//                   >
//                     <Star className="w-6 sm:w-8 h-6 sm:h-8 text-saffron mx-auto mb-3" />
//                   </motion.div>
//                   <h4 className="font-[var(--font-display)] text-base sm:text-lg font-bold text-white mb-2">
//                     Pro Tip
//                   </h4>
//                   <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
//                     Complete your first 5 skill-sharing sessions to unlock premium features and earn a 500 credit bonus!
//                   </p>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           </motion.div>
//         </div>

//         {/* Additional Stats Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.3 }}
//           viewport={{ once: true }}
//           className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
//         >
//           {[
//             { icon: Users, label: "Active Members", value: "12.5K+", color: "text-accent" },
//             { icon: Target, label: "Skills Shared", value: "850+", color: "text-saffron" },
//             { icon: Zap, label: "Sessions Completed", value: "25.3K+", color: "text-jet-stream-300" },
//             { icon: Trophy, label: "Success Rate", value: "96%", color: "text-green-400" }
//           ].map((stat, index) => (
//             <motion.div
//               key={index}
//               whileHover={{ y: -4, scale: 1.05 }}
//               transition={{ type: "spring", stiffness: 300 }}
//             >
//               <Card className="bg-gradient-to-br from-jet-stream-900/80 to-jet-stream-800/60 border-2 border-jet-stream-400/20 hover:border-jet-stream-400/40 p-4 sm:p-6 text-center group transition-all duration-500 hover:shadow-lg hover:shadow-jet-stream-400/20">
//                 <motion.div
//                   animate={{ scale: [1, 1.1, 1] }}
//                   transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
//                   className="mb-3"
//                 >
//                   <stat.icon className={`w-6 sm:w-8 h-6 sm:h-8 ${stat.color} mx-auto`} />
//                 </motion.div>
//                 <div className={`text-xl sm:text-2xl font-bold ${stat.color} font-[var(--font-display)] mb-1`}>
//                   {stat.value}
//                 </div>
//                 <div className="text-xs sm:text-sm text-gray-400 font-medium">
//                   {stat.label}
//                 </div>
//               </Card>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   )

// }








"use client"

import { motion } from "motion/react"
import { Badge } from "../ui/badge"
import { Card, CardContent } from "../ui/card"
import { Progress } from "../ui/progress"
import { Crown, Star, TrendingUp, Coins, Gift, Users, Zap, Award, Trophy, Target } from "lucide-react"
import { useEffect, useState } from "react"
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
    pattern: "circles"
  },
  {
    icon: Coins,
    title: "Spend Wisely",
    description: "Book services from other skill-sharers. Rates start from 100 credits per hour.",
    pattern: "diamonds"
  },
  {
    icon: Gift,
    title: "Bonus System",
    description: "Complete your profile, get verified, and earn bonus credits. First session free!",
    pattern: "waves"
  },
  {
    icon: Users,
    title: "Referral Rewards",
    description: "Invite friends and earn 950 credits for each successful referral who completes a session.",
    pattern: "dots"
  }
]

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Crown className="w-4 sm:w-5 h-4 sm:h-5 text-orange-400" />
    case 2:
      return <Award className="w-4 sm:w-5 h-4 sm:h-5 text-slate-300" />
    case 3:
      return <Star className="w-4 sm:w-5 h-4 sm:h-5 text-amber-600" />
    default:
      return <span className="text-sm font-bold text-slate-500">#{rank}</span>
  }
}

function getLevelBadgeColor(level: string) {
  switch (level) {
    case "Skill Master":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "Community Champion":
      return "bg-slate-100 text-slate-700 border-slate-200"
    case "Creative Pro":
      return "bg-purple-100 text-purple-700 border-purple-200"
    case "Rising Star":
      return "bg-yellow-100 text-yellow-700 border-yellow-200"
    default:
      return "bg-slate-100 text-slate-600 border-slate-200"
  }
}

function getTrendIcon(trend: string) {
  switch (trend) {
    case "up":
      return <TrendingUp className="w-3 h-3 text-green-500" />
    case "down":
      return <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />
    default:
      return null
  }
}

function PatternSVG({ pattern, className }: { pattern: string, className?: string }) {
  const patterns = {
    circles: (
      <svg className={className} viewBox="0 0 100 100" fill="none">
        <defs>
          <pattern id="circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.1"/>
            <circle cx="5" cy="15" r="1" fill="currentColor" opacity="0.05"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#circles)"/>
      </svg>
    ),
    diamonds: (
      <svg className={className} viewBox="0 0 100 100" fill="none">
        <defs>
          <pattern id="diamonds" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
            <path d="M7.5 0L15 7.5L7.5 15L0 7.5Z" fill="currentColor" opacity="0.08"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#diamonds)"/>
      </svg>
    ),
    waves: (
      <svg className={className} viewBox="0 0 100 100" fill="none">
        <defs>
          <pattern id="waves" x="0" y="0" width="30" height="8" patternUnits="userSpaceOnUse">
            <path d="M0 4Q7.5 0 15 4T30 4" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.1"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#waves)"/>
      </svg>
    ),
    dots: (
      <svg className={className} viewBox="0 0 100 100" fill="none">
        <defs>
          <pattern id="dots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="6" cy="6" r="0.5" fill="currentColor" opacity="0.15"/>
            <circle cx="2" cy="2" r="0.3" fill="currentColor" opacity="0.08"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#dots)"/>
      </svg>
    )
  }

  return patterns[pattern] || null
}

export default function LeaderboardCredits() {
  const [currentBalance, setCurrentBalance] = useState(0)
  const [monthlyEarnings, setMonthlyEarnings] = useState(0)

  useEffect(() => {
    const balanceTimer = setTimeout(() => setCurrentBalance(1250), 500)
    const earningsTimer = setTimeout(() => setMonthlyEarnings(420), 800)
    
    return () => {
      clearTimeout(balanceTimer)
      clearTimeout(earningsTimer)
    }
  }, [])

  return (
    <section className="bg-slate-50 py-16 lg:py-24 relative overflow-hidden">
      {/* Bohemian Pattern Background */}
      <div className="absolute inset-0">
        <PatternSVG pattern="circles" className="absolute top-0 left-0 w-full h-full text-slate-400 opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100/50 via-transparent to-slate-200/30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Trophy className="w-6 sm:w-8 h-6 sm:h-8 text-orange-500" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-6 leading-tight">
            Community Leaders &{" "}
            <span className="text-orange-500">
              SkillCredits
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto">
            Discover our top skill-sharers and learn how our credit system rewards community participation
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Leaderboard Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-8">
              <Crown className="w-6 sm:w-8 h-6 sm:h-8 text-orange-500" />
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-800">
                Community Leaders
              </h3>
            </div>

            <div className="space-y-4">
              {leaderboardData.map((user, index) => (
                <motion.div
                  key={user.rank}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -2 }}
                  className="group"
                >
                  <Card className={`
                    relative overflow-hidden border transition-all duration-300
                    ${user.rank === 1 ? 'bg-gradient-to-r from-orange-50 to-slate-50 border-orange-200 hover:border-orange-300' : 
                      user.rank === 2 ? 'bg-gradient-to-r from-slate-100 to-slate-50 border-slate-200 hover:border-slate-300' :
                      user.rank === 3 ? 'bg-gradient-to-r from-amber-50 to-slate-50 border-amber-200 hover:border-amber-300' :
                      'bg-white border-slate-200 hover:border-slate-300'}
                    hover:shadow-lg
                  `}>
                    {/* Subtle pattern overlay */}
                    <div className="absolute inset-0 opacity-20">
                      <PatternSVG 
                        pattern={user.rank <= 3 ? "diamonds" : "dots"} 
                        className="w-full h-full text-slate-400" 
                      />
                    </div>

                    {/* Rank accent line */}
                    <div className={`absolute top-0 left-0 w-full h-0.5 ${
                      user.rank === 1 ? 'bg-gradient-to-r from-orange-400 to-orange-300' :
                      user.rank === 2 ? 'bg-gradient-to-r from-slate-400 to-slate-300' :
                      user.rank === 3 ? 'bg-gradient-to-r from-amber-500 to-amber-400' :
                      'bg-gradient-to-r from-slate-300 to-slate-200'
                    }`} />

                    <CardContent className="p-4 sm:p-5 relative z-10">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white border-2 border-slate-200 shadow-sm">
                          {getRankIcon(user.rank)}
                        </div>

                        <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full overflow-hidden bg-white border-2 border-slate-200 shadow-sm">
                          <img 
                            src={user.avatar} 
                            alt={user.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-serif font-semibold text-slate-800 text-sm sm:text-base truncate">
                              {user.name}
                            </h4>
                            {getTrendIcon(user.trend)}
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mb-2">
                            {user.skills.slice(0, 2).map((skill, skillIndex) => (
                              <Badge
                                key={skillIndex}
                                variant="outline"
                                className="text-xs px-2 py-0.5 bg-white/70 text-slate-600 border-slate-300"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>

                          <Badge className={`text-xs px-2 py-1 ${getLevelBadgeColor(user.level)}`}>
                            {user.level}
                          </Badge>

                          <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                            <span>{user.completedSessions} sessions</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span>{user.rating}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="flex items-center gap-1 text-orange-600 font-bold">
                            <Coins className="w-4 h-4" />
                            <span className="font-serif text-sm sm:text-base">
                              {user.credits.toLocaleString()}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 mt-1">credits</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Credits System Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-8">
              <Coins className="w-6 sm:w-8 h-6 sm:h-8 text-orange-500" />
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-800">
                SkillCredits System
              </h3>
            </div>
</motion.div>
            {/* Balance Card */}
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-gradient-to-br from-white to-slate-50 border-2 border-orange-200 p-6 mb-8 relative overflow-hidden shadow-lg">
                {/* Pattern background */}
                <div className="absolute inset-0 opacity-30">
                  <PatternSVG pattern="waves" className="w-full h-full text-orange-400" />
                </div>
                
                <CardContent className="p-0 relative z-10">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-100 to-orange-50 border-2 border-orange-200 mb-4">
                      <Coins className="w-8 h-8 text-orange-500" />
                    </div>
                    <h4 className="font-serif text-xl font-bold text-slate-800 mb-2">
                      Your Credit Balance
                    </h4>
                    <motion.div 
                      className="text-3xl font-bold text-orange-600 font-serif"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    >
                      {currentBalance.toLocaleString()} Credits
                    </motion.div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">This Month's Earnings</span>
                      <span className="text-green-600 font-semibold">
                        +{monthlyEarnings} credits
                      </span>
                    </div>
                    <Progress value={68} className="h-2 bg-slate-200" />
                    <div className="text-xs text-slate-500 text-center">
                      580 more credits to reach Skill Master level
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Credit Features */}
            <div className="grid gap-4">
              {creditFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -2 }}
                >
                  <Card className="bg-white border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-md relative overflow-hidden">
                    {/* Subtle pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <PatternSVG pattern={feature.pattern} className="w-full h-full text-slate-300" />
                    </div>
                    
                    <CardContent className="p-4 sm:p-5 relative z-10">
                      <div className="flex items-start gap-4">
                        <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center">
                          <feature.icon className="w-5 sm:w-6 h-5 sm:h-6 text-slate-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-serif text-base sm:text-lg font-semibold text-slate-800 mb-2">
                            {feature.title}
                          </h4>
                          <p className="text-slate-600 text-sm leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                
              ))}
            </div>

            {/* Pro Tip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -2 }}
            >
              <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 p-5 sm:p-6 relative overflow-hidden shadow-md">
                <div className="absolute inset-0 opacity-30">
                  <PatternSVG pattern="circles" className="w-full h-full text-orange-300" />
                </div>
                
                <CardContent className="p-0 text-center relative z-10">
                  <Star className="w-6 sm:w-8 h-6 sm:h-8 text-orange-500 mx-auto mb-3" />
                  <h4 className="font-serif text-lg font-bold text-slate-800 mb-2">
                    Pro Tip
                  </h4>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Complete your first 5 skill-sharing sessions to unlock premium features and earn a 500 credit bonus!
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {[
            { icon: Users, label: "Active Members", value: "12.5K+", accent: "orange" },
            { icon: Target, label: "Skills Shared", value: "850+", accent: "slate" },
            { icon: Zap, label: "Sessions Completed", value: "25.3K+", accent: "slate" },
            { icon: Trophy, label: "Success Rate", value: "96%", accent: "green" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -3, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-white border border-slate-200 hover:border-slate-300 p-4 sm:p-6 text-center transition-all duration-300 hover:shadow-md relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <PatternSVG pattern="dots" className="w-full h-full text-slate-300" />
                </div>
                
                <div className="relative z-10">
                  <div className="mb-3">
                    <stat.icon className={`w-6 sm:w-8 h-6 sm:h-8 mx-auto ${
                      stat.accent === 'orange' ? 'text-orange-500' :
                      stat.accent === 'green' ? 'text-green-500' :
                      'text-slate-500'
                    }`} />
                  </div>
                  <div className={`text-xl sm:text-2xl font-bold font-serif mb-1 ${
                    stat.accent === 'orange' ? 'text-orange-600' :
                    stat.accent === 'green' ? 'text-green-600' :
                    'text-slate-700'
                  }`}>
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 font-medium">
                    {stat.label}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>
    
  )
}