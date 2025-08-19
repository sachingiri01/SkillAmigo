// "use client"

// import React, { useEffect, useRef, useState } from 'react';
// import { Button } from '../_components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '../_components/ui/card';
// import { Badge } from '../_components/ui/badge';
// import { Progress } from '../_components/ui/progress';
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../_components/ui/accordion';
// import { 
//   Search, 
//   CreditCard, 
//   Star, 
//   Users, 
//   Shield, 
//   MessageSquare, 
//   PlayCircle, 
//   CheckCircle, 
//   ArrowRight, 
//   Coins, 
//   Award, 
//   Camera, 
//   Wrench, 
//   Heart, 
//   Gift, 
//   Bot, 
//   AlertTriangle,
//   ChevronLeft,
//   ChevronRight,
//   Zap,
//   TrendingUp,
//   UserCheck,
//   Calendar,
//   MapPin,
//   Clock,
//   Sparkles,
//   Hexagon,
//   Triangle,
//   Square,
//   Cpu,
//   Network,
//   Layers,
//   Globe
// } from 'lucide-react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { FullwidthIconNavbar } from '../_components/navbars/fullwidth-icon-navbar';

// if (typeof window !== 'undefined') {
//   gsap.registerPlugin(ScrollTrigger);
// }

// // Complex Animated Background Grid
// const AnimatedDotGrid: React.FC<{ className?: string }> = ({ className = '' }) => {
//   return (
//     <div className={`absolute inset-0 ${className}`}>
//       <div 
//         className="w-full h-full opacity-30"
//         style={{
//           backgroundImage: `
//             radial-gradient(circle at 25% 25%, var(--color-jet-stream-400) 1.5px, transparent 1.5px),
//             radial-gradient(circle at 75% 25%, #E67E22 0.8px, transparent 0.8px),
//             radial-gradient(circle at 25% 75%, rgba(113, 159, 154, 0.6) 1px, transparent 1px),
//             radial-gradient(circle at 75% 75%, rgba(230, 126, 34, 0.4) 1.2px, transparent 1.2px)
//           `,
//           backgroundSize: '60px 60px, 90px 90px, 45px 45px, 75px 75px',
//           backgroundPosition: '0 0, 30px 0, 15px 30px, 45px 45px',
//           animation: 'float 8s ease-in-out infinite'
//         }}
//       />
//       <div 
//         className="absolute inset-0 opacity-20"
//         style={{
//           background: 'linear-gradient(45deg, transparent 40%, rgba(113, 159, 154, 0.1) 50%, transparent 60%)',
//           transform: 'rotate(-45deg) scale(2)',
//           animation: 'float-delay 12s ease-in-out infinite'
//         }}
//       />
//     </div>
//   );
// };

// // Geometric Pattern Background
// const GeometricPattern: React.FC<{ className?: string }> = ({ className = '' }) => {
//   return (
//     <div className={`absolute inset-0 ${className}`}>
//       <svg className="w-full h-full opacity-10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
//         <defs>
//           <pattern id="hex-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
//             <polygon 
//               points="20,5 35,15 35,25 20,35 5,25 5,15" 
//               fill="none" 
//               stroke="currentColor" 
//               strokeWidth="0.5"
//               className="text-jet-stream-400"
//             />
//           </pattern>
//           <pattern id="triangle-pattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
//             <polygon 
//               points="15,5 25,20 5,20" 
//               fill="none" 
//               stroke="currentColor" 
//               strokeWidth="0.3"
//               className="text-orange-500"
//             />
//           </pattern>
//         </defs>
//         <rect width="100%" height="100%" fill="url(#hex-pattern)" />
//         <rect width="100%" height="100%" fill="url(#triangle-pattern)" opacity="0.6" />
//       </svg>
//     </div>
//   );
// };

// // 3D Floating Abstract Elements
// const FloatingAbstracts: React.FC = () => {
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (containerRef.current) {
//       const elements = containerRef.current.querySelectorAll('.floating-element');
//       elements.forEach((el, index) => {
//         gsap.set(el, {
//           x: Math.random() * window.innerWidth,
//           y: Math.random() * window.innerHeight,
//           rotation: Math.random() * 360,
//           scale: 0.5 + Math.random() * 0.8
//         });

//         gsap.to(el, {
//           x: `+=${(Math.random() - 0.5) * 400}`,
//           y: `+=${(Math.random() - 0.5) * 300}`,
//           rotation: `+=${(Math.random() - 0.5) * 720}`,
//           duration: 20 + Math.random() * 20,
//           ease: 'none',
//           repeat: -1,
//           yoyo: true
//         });
//       });
//     }
//   }, []);

//   return (
//     <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
//       {[...Array(12)].map((_, i) => {
//         const shapes = [Hexagon, Triangle, Square, Cpu, Network, Layers, Globe];
//         const Shape = shapes[i % shapes.length];
//         return (
//           <div
//             key={i}
//             className="floating-element absolute opacity-20"
//             style={{
//               color: i % 2 === 0 ? 'var(--color-jet-stream-400)' : '#E67E22',
//               filter: `blur(${Math.random() * 2}px)`
//             }}
//           >
//             <Shape size={20 + Math.random() * 40} />
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// // Enhanced Pixel Transition Card with 3D effects
// const EnhancedPixelCard: React.FC<{
//   icon: React.ReactNode;
//   title: string;
//   description: string;
//   delay?: number;
//   accent?: 'teal' | 'orange' | 'mixed';
// }> = ({ icon, title, description, delay = 0, accent = 'mixed' }) => {
//   const cardRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (cardRef.current) {
//       gsap.fromTo(cardRef.current, 
//         { 
//           opacity: 0, 
//           y: 100,
//           scale: 0.8,
//           rotationX: -15,
//           transformOrigin: 'center bottom'
//         },
//         { 
//           opacity: 1, 
//           y: 0,
//           scale: 1,
//           rotationX: 0,
//           duration: 1.2,
//           delay: delay,
//           ease: 'back.out(1.7)',
//           scrollTrigger: {
//             trigger: cardRef.current,
//             start: 'top 80%',
//             toggleActions: 'play none none reverse'
//           }
//         }
//       );

//       // Add hover 3D tilt effect
//       const handleMouseMove = (e: MouseEvent) => {
//         const card = cardRef.current;
//         if (!card) return;
        
//         const rect = card.getBoundingClientRect();
//         const x = (e.clientX - rect.left) / rect.width;
//         const y = (e.clientY - rect.top) / rect.height;
        
//         gsap.to(card, {
//           rotationX: (y - 0.5) * 20,
//           rotationY: (x - 0.5) * -20,
//           duration: 0.3,
//           ease: 'power2.out'
//         });
//       };

//       const handleMouseLeave = () => {
//         gsap.to(cardRef.current, {
//           rotationX: 0,
//           rotationY: 0,
//           duration: 0.5,
//           ease: 'power2.out'
//         });
//       };

//       cardRef.current?.addEventListener('mousemove', handleMouseMove);
//       cardRef.current?.addEventListener('mouseleave', handleMouseLeave);

//       return () => {
//         cardRef.current?.removeEventListener('mousemove', handleMouseMove);
//         cardRef.current?.removeEventListener('mouseleave', handleMouseLeave);
//       };
//     }
//   }, [delay]);

//   const getGradient = () => {
//     switch (accent) {
//       case 'teal': return 'from-jet-stream-300 via-jet-stream-400 to-jet-stream-500';
//       case 'orange': return 'from-orange-400 via-orange-500 to-red-500';
//       default: return 'from-jet-stream-400 via-orange-400 to-jet-stream-500';
//     }
//   };

//   return (
//     <div className="perspective-1000">
//       <Card 
//         ref={cardRef} 
//         className="relative bg-gradient-to-br from-jet-stream-950/90 via-jet-stream-900/80 to-jet-stream-800/70 border-jet-stream-600/50 hover:border-jet-stream-400 transition-all duration-500 group overflow-hidden transform-style-3d animate-pulse-glow"
//         style={{ transformStyle: 'preserve-3d' }}
//       >
//         {/* Background pattern overlay */}
//         <div className="absolute inset-0 opacity-20">
//           <GeometricPattern />
//         </div>
        
//         {/* Animated gradient overlay */}
//         <div 
//           className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500"
//           style={{
//             background: `linear-gradient(135deg, transparent, ${accent === 'teal' ? 'rgba(113, 159, 154, 0.3)' : 'rgba(230, 126, 34, 0.3)'}, transparent)`
//           }}
//         />

//         <CardHeader className="relative z-10 text-center pb-4">
//           <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br ${getGradient()} flex items-center justify-center text-white group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-orange-500/30`}>
//             {icon}
//           </div>
//           <CardTitle className="text-xl font-display text-white group-hover:text-jet-stream-200 transition-colors duration-300">
//             {title}
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="relative z-10">
//           <p className="text-gray-300 text-center leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
//             {description}
//           </p>
//         </CardContent>

//         {/* 3D depth indicator */}
//         <div 
//           className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//           style={{ transform: 'translateZ(-1px)' }}
//         />
//       </Card>
//     </div>
//   );
// };

// // Enhanced Step Card with complex patterns
// const Enhanced3DStepCard: React.FC<{
//   number: string;
//   title: string;
//   description: string;
//   icon: React.ReactNode;
//   example?: string;
//   side: 'left' | 'right';
//   theme: 'light' | 'dark';
// }> = ({ number, title, description, icon, example, side, theme }) => {
//   const cardRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (cardRef.current) {
//       gsap.fromTo(cardRef.current,
//         { 
//           opacity: 0, 
//           x: side === 'left' ? -150 : 150,
//           rotateY: side === 'left' ? -25 : 25,
//           scale: 0.9
//         },
//         { 
//           opacity: 1, 
//           x: 0,
//           rotateY: 0,
//           scale: 1,
//           duration: 1.5,
//           ease: 'power3.out',
//           scrollTrigger: {
//             trigger: cardRef.current,
//             start: 'top 75%',
//             toggleActions: 'play none none reverse'
//           }
//         }
//       );
//     }
//   }, [side]);

//   const themeClasses = theme === 'light' 
//     ? 'bg-gradient-to-br from-white/95 via-gray-50/90 to-jet-stream-100/80 border-gray-200 text-jet-stream-900'
//     : 'bg-gradient-to-br from-jet-stream-900/95 via-jet-stream-800/90 to-jet-stream-950/80 border-jet-stream-600 text-white';

//   return (
//     <div ref={cardRef} className={`flex items-center gap-12 ${side === 'right' ? 'flex-row-reverse' : ''}`}>
//       <div className="flex-1 perspective-1000">
//         <Card className={`${themeClasses} hover:border-jet-stream-400 transition-all duration-500 transform-style-3d relative overflow-hidden group`}>
//           {/* Complex background patterns */}
//           <div className="absolute inset-0">
//             <AnimatedDotGrid className="opacity-20" />
//             <div 
//               className="absolute inset-0 opacity-10"
//               style={{
//                 background: `conic-gradient(from 45deg, transparent, ${theme === 'light' ? 'rgba(113, 159, 154, 0.3)' : 'rgba(230, 126, 34, 0.3)'}, transparent)`
//               }}
//             />
//           </div>

//           <CardContent className="relative z-10 p-8">
//             <div className="flex items-start gap-6">
//               <div className="w-16 h-16 rounded-full bg-gradient-to-br from-jet-stream-400 to-orange-500 flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-lg shadow-orange-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
//                 {number}
//               </div>
//               <div className="flex-1">
//                 <h3 className={`text-2xl font-display font-bold mb-3 ${theme === 'light' ? 'text-jet-stream-900' : 'text-white'} group-hover:text-orange-500 transition-colors duration-300`}>
//                   {title}
//                 </h3>
//                 <p className={`leading-relaxed mb-4 text-lg ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
//                   {description}
//                 </p>
//                 {example && (
//                   <div className={`rounded-xl p-4 border-l-4 border-orange-500 relative overflow-hidden ${theme === 'light' ? 'bg-orange-50' : 'bg-jet-stream-800/50'}`}>
//                     <div className="absolute inset-0 opacity-20">
//                       <GeometricPattern />
//                     </div>
//                     <p className={`text-sm italic relative z-10 ${theme === 'light' ? 'text-orange-800' : 'text-orange-300'}`}>
//                       "{example}"
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </CardContent>

//           {/* Floating accent elements */}
//           <div className="absolute top-4 right-4 opacity-30 group-hover:opacity-60 transition-opacity duration-500">
//             <Sparkles className={`w-6 h-6 ${theme === 'light' ? 'text-orange-500' : 'text-jet-stream-400'} animate-float`} />
//           </div>
//         </Card>
//       </div>
      
//       {/* Enhanced floating icon */}
//       <div className="relative">
//         <div className="w-24 h-24 rounded-full bg-gradient-to-br from-jet-stream-400 via-orange-500 to-jet-stream-600 flex items-center justify-center text-white shrink-0 shadow-2xl shadow-orange-500/40 animate-float">
//           {icon}
//         </div>
//         <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent animate-pulse-glow" />
//       </div>
//     </div>
//   );
// };

// interface ProgressRingProps {
//   value: number;
//   label: string;
//   color: string;
// }

// const ProgressRing: React.FC<ProgressRingProps> = ({ value, label, color }) => {
//   const ringRef = useRef<SVGCircleElement>(null);

//   useEffect(() => {
//     if (ringRef.current) {
//       const circumference = 2 * Math.PI * 45;
//       const offset = circumference - (value / 100) * circumference;
      
//       gsap.fromTo(ringRef.current,
//         { strokeDashoffset: circumference },
//         { 
//           strokeDashoffset: offset,
//           duration: 2,
//           ease: 'power2.out',
//           scrollTrigger: {
//             trigger: ringRef.current,
//             start: 'top 80%',
//             toggleActions: 'play none none reverse'
//           }
//         }
//       );
//     }
//   }, [value]);

//   const circumference = 2 * Math.PI * 45;

//   return (
//     <div className="flex flex-col items-center">
//       <div className="relative w-24 h-24">
//         <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
//           <circle
//             cx="50"
//             cy="50"
//             r="45"
//             stroke="currentColor"
//             strokeWidth="8"
//             fill="transparent"
//             className="text-jet-stream-800"
//           />
//           <circle
//             ref={ringRef}
//             cx="50"
//             cy="50"
//             r="45"
//             stroke={color}
//             strokeWidth="8"
//             fill="transparent"
//             strokeDasharray={circumference}
//             strokeDashoffset={circumference}
//             strokeLinecap="round"
//           />
//         </svg>
//         <div className="absolute inset-0 flex items-center justify-center">
//           <span className="text-lg font-bold text-white">{value}%</span>
//         </div>
//       </div>
//       <p className="text-sm text-gray-300 mt-2 text-center">{label}</p>
//     </div>
//   );
// };

// interface CarouselProps {
//   children: React.ReactNode[];
// }

// const Carousel: React.FC<CarouselProps> = ({ children }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const carouselRef = useRef<HTMLDivElement>(null);

//   const next = () => {
//     setCurrentIndex((prev) => (prev + 1) % children.length);
//   };

//   const prev = () => {
//     setCurrentIndex((prev) => (prev - 1 + children.length) % children.length);
//   };

//   useEffect(() => {
//     if (carouselRef.current) {
//       gsap.to(carouselRef.current, {
//         x: -currentIndex * 100 + '%',
//         duration: 0.5,
//         ease: 'power2.out'
//       });
//     }
//   }, [currentIndex]);

//   return (
//     <div className="relative overflow-hidden rounded-lg">
//       <div 
//         ref={carouselRef}
//         className="flex"
//         style={{ width: `${children.length * 100}%` }}
//       >
//         {children.map((child, index) => (
//           <div key={index} className="flex-shrink-0 w-full">
//             {child}
//           </div>
//         ))}
//       </div>
//       <Button
//         variant="outline"
//         size="icon"
//         className="absolute left-4 top-1/2 -translate-y-1/2 bg-jet-stream-900/80 border-jet-stream-600 hover:bg-jet-stream-800"
//         onClick={prev}
//       >
//         <ChevronLeft className="w-4 h-4" />
//       </Button>
//       <Button
//         variant="outline"
//         size="icon"
//         className="absolute right-4 top-1/2 -translate-y-1/2 bg-jet-stream-900/80 border-jet-stream-600 hover:bg-jet-stream-800"
//         onClick={next}
//       >
//         <ChevronRight className="w-4 h-4" />
//       </Button>
//     </div>
//   );
// };

// export default function HowSkillsAmigoWorks() {
//   const heroRef = useRef<HTMLDivElement>(null);
//   const flowRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     // Hero animations with 3D effects
//     if (heroRef.current) {
//       const tl = gsap.timeline();
//       tl.fromTo('.hero-title', 
//         { opacity: 0, y: 80, rotationX: 15 },
//         { opacity: 1, y: 0, rotationX: 0, duration: 1.5, ease: 'power3.out' }
//       )
//       .fromTo('.hero-buttons', 
//         { opacity: 0, y: 50, scale: 0.9 },
//         { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'back.out(1.7)' },
//         '-=0.8'
//       );
//     }

//     // Complex flow animations
//     if (flowRef.current) {
//       const steps = flowRef.current.querySelectorAll('.flow-step');
//       steps.forEach((step, index) => {
//         gsap.fromTo(step,
//           { opacity: 0, scale: 0.7, rotationY: 45 },
//           { 
//             opacity: 1, 
//             scale: 1,
//             rotationY: 0,
//             duration: 0.8,
//             delay: index * 0.3,
//             ease: 'back.out(1.7)',
//             scrollTrigger: {
//               trigger: step,
//               start: 'top 80%',
//               toggleActions: 'play none none reverse'
//             }
//           }
//         );
//       });
//     }
//   }, []);

//   const faqData = [
//     {
//       question: "How does the AI matching system work?",
//       answer: "Our AI analyzes your requirements, location, budget, and preferences to match you with the most suitable service providers. It considers factors like expertise, ratings, availability, and past performance to ensure the best possible matches."
//     },
//     {
//       question: "What are SkillsAmigo Coins and how do they work?",
//       answer: "Coins are our secure payment system that holds funds until service completion. When you book a service, coins are held in escrow and only released to the provider after successful delivery and your approval. This protects both parties and ensures quality service."
//     },
//     {
//       question: "How are disputes handled?",
//       answer: "Our dispute resolution system includes automated mediation, expert human reviewers, and a comprehensive evidence review process. Most disputes are resolved within 48 hours, with full refunds or re-work guaranteed for legitimate claims."
//     },
//     {
//       question: "What is the Merit Credits system?",
//       answer: "Merit Credits are earned through excellent service delivery, positive reviews, and platform engagement. They unlock benefits like priority placement, reduced fees, exclusive opportunities, and enhanced trust badges that attract more customers."
//     },
//     {
//       question: "How does collaboration work for big projects?",
//       answer: "Big projects can involve multiple specialists working together. Our collaboration tools include shared project timelines, team communication channels, milestone tracking, and coordinated payments. Perfect for events, renovations, or complex services."
//     },
//     {
//       question: "Is the platform safe for payments?",
//       answer: "Yes, we use bank-grade encryption, secure escrow systems, fraud detection AI, and are compliant with all Indian payment regulations. Your money is protected at every step of the transaction process."
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-jet-stream-950 via-jet-stream-900 to-jet-stream-975 text-white relative overflow-hidden">
//       {/* Include the existing header */}
//       <FullwidthIconNavbar />

//       {/* Floating abstract elements */}
//       <FloatingAbstracts />

//       {/* Hero Section with Complex Backgrounds */}
//       <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
//         <AnimatedDotGrid />
//         <GeometricPattern />
        
//         {/* Multi-layered gradient overlay */}
//         <div className="absolute inset-0 bg-gradient-to-br from-jet-stream-950/95 via-transparent to-jet-stream-900/80" />
//         <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-orange-900/10 to-transparent" />
        
//         <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
//           <h1 className="hero-title text-5xl md:text-7xl lg:text-9xl font-display font-bold mb-12 leading-tight perspective-1000">
//             AI‑guided bookings,{' '}
//             <span className="gradient-text block lg:inline">trusted payments</span>,{' '}
//             <span className="block lg:inline text-white">effortless collaboration</span>
//           </h1>
          
//           <div className="hero-buttons flex flex-col sm:flex-row gap-6 justify-center items-center mt-16">
//             <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-10 py-6 text-xl shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 hover:scale-105 transition-all duration-300">
//               Start as Buyer
//               <ArrowRight className="ml-3 w-6 h-6" />
//             </Button>
//             <Button size="lg" variant="outline" className="border-2 border-jet-stream-400 text-jet-stream-300 hover:bg-jet-stream-400 hover:text-white px-10 py-6 text-xl backdrop-blur-sm bg-white/5 hover:scale-105 transition-all duration-300">
//               Start as Seller
//               <UserCheck className="ml-3 w-6 h-6" />
//             </Button>
//             <Button size="lg" variant="ghost" className="text-jet-stream-300 hover:text-orange-500 px-10 py-6 text-xl backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300">
//               <PlayCircle className="mr-3 w-6 h-6" />
//               Watch 60s Tour
//             </Button>
//           </div>
//         </div>

//         {/* Animated particles */}
//         <div className="absolute inset-0 pointer-events-none">
//           {[...Array(20)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute w-1 h-1 bg-jet-stream-400 rounded-full opacity-60 animate-float"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 animationDelay: `${Math.random() * 3}s`
//               }}
//             />
//           ))}
//         </div>
//       </section>

//       {/* Enhanced Overview Tiles Section */}
//       <section className="py-32 px-6 relative">
//         <GeometricPattern className="opacity-5" />
        
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-20">
//             <h2 className="text-5xl md:text-6xl font-display font-bold mb-8">
//               Four Pillars of <span className="gradient-text">SkillsAmigo</span>
//             </h2>
//             <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
//               Our platform is built on four core principles that ensure seamless, secure, and successful skill-sharing experiences
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
//             <EnhancedPixelCard
//               icon={<Search className="w-10 h-10" />}
//               title="Discover"
//               description="AI-powered matching connects you with the perfect service providers based on your exact needs, location, and budget"
//               delay={0}
//               accent="teal"
//             />
//             <EnhancedPixelCard
//               icon={<Coins className="w-10 h-10" />}
//               title="Book & Pay with Coins"
//               description="Secure escrow system holds payments until service completion, protecting both buyers and sellers"
//               delay={0.2}
//               accent="orange"
//             />
//             <EnhancedPixelCard
//               icon={<Star className="w-10 h-10" />}
//               title="Deliver & Review"
//               description="Quality assurance through milestone tracking, reviews, and our comprehensive rating system"
//               delay={0.4}
//               accent="mixed"
//             />
//             <EnhancedPixelCard
//               icon={<Users className="w-10 h-10" />}
//               title="Collaborate"
//               description="Seamless teamwork tools for complex projects requiring multiple specialists working together"
//               delay={0.6}
//               accent="teal"
//             />
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Buyer Journey Section */}
//       <section className="py-32 px-6 bg-gradient-to-br from-white/5 via-transparent to-jet-stream-800/20 relative">
//         <AnimatedDotGrid className="opacity-10" />
        
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-20">
//             <h2 className="text-5xl md:text-6xl font-display font-bold mb-8">
//               Buyer Journey: <span className="gradient-text">From Problem to Solution</span>
//             </h2>
//             <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
//               Follow Sarah's journey as she deals with a plumbing emergency and discovers how SkillsAmigo makes finding help effortless
//             </p>
//           </div>

//           <div className="space-y-24">
//             <Enhanced3DStepCard
//               number="1"
//               title="Emergency Strikes"
//               description="Sarah's kitchen pipe bursts at 7 PM on a Sunday. She opens SkillsAmigo and describes her urgent plumbing emergency with natural language processing understanding her needs instantly."
//               icon={<Wrench className="w-8 h-8" />}
//               example="My kitchen pipe burst, water everywhere! Need emergency plumber ASAP near Koramangala, Bangalore"
//               side="left"
//               theme="dark"
//             />
            
//             <Enhanced3DStepCard
//               number="2"
//               title="AI Finds Perfect Matches"
//               description="Our advanced AI instantly analyzes Sarah's location, urgency, and requirements to find verified emergency plumbers available now, considering traffic, ratings, and specializations."
//               icon={<Bot className="w-8 h-8" />}
//               example="AI found 3 emergency plumbers within 2km, all with 4.8+ ratings and available for immediate service"
//               side="right"
//               theme="light"
//             />
            
//             <Enhanced3DStepCard
//               number="3"
//               title="Smart Booking & Payment"
//               description="Sarah reviews detailed profiles, checks real-time availability, and books with Rajesh (4.9 rating, 200+ jobs). Payment is securely held in escrow with automatic release conditions."
//               icon={<Calendar className="w-8 h-8" />}
//               example="Rajesh can arrive in 25 minutes. Emergency rate: ₹800 inspection + materials. Payment secured with SkillsAmigo Coins."
//               side="left"
//               theme="dark"
//             />
            
//             <Enhanced3DStepCard
//               number="4"
//               title="Live Tracking & Updates"
//               description="Sarah tracks Rajesh's location in real-time via GPS integration and receives proactive updates throughout the service via in-app messaging and notifications."
//               icon={<MapPin className="w-8 h-8" />}
//               example="'Rajesh is 5 minutes away' → 'Service started' → 'Issue diagnosed: burst joint, replacing now' → 'Fixed! Testing water pressure'"
//               side="right"
//               theme="light"
//             />
            
//             <Enhanced3DStepCard
//               number="5"
//               title="Quality Completion & Review"
//               description="Service completed successfully with photo verification. Payment automatically released after Sarah confirms satisfaction. Both parties leave detailed reviews with photo evidence."
//               icon={<CheckCircle className="w-8 h-8" />}
//               example="Pipe fixed in 45 minutes, no mess left behind. Sarah gives 5 stars and tip. Rajesh earns Merit Credits for excellent emergency service."
//               side="left"
//               theme="dark"
//             />
//           </div>
//         </div>
//       </section>

//       {/* Seller Journey Section */}
//       <section className="py-20 px-6">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
//               Seller Journey: <span className="gradient-text">Building Your Business</span>
//             </h2>
//             <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//               Meet Priya, a freelance photographer who transformed her passion into a thriving business using SkillsAmigo
//             </p>
//           </div>

//           <div className="space-y-16">
//             <Enhanced3DStepCard
//               number="1"
//               title="Profile Creation & Verification"
//               description="Priya creates her photography profile, uploads portfolio, gets verified through document and skill assessment."
//               icon={<Camera className="w-6 h-6" />}
//               example="Portfolio verified: 50+ photos, certificates uploaded, video call skill assessment passed with 95% score"
//               side="left"
//               theme="dark"
//             />
            
//             <Enhanced3DStepCard
//               number="2"
//               title="AI-Powered Job Matching"
//               description="SkillsAmigo's AI analyzes Priya's skills, availability, and location to suggest relevant photography gigs automatically."
//               icon={<Zap className="w-6 h-6" />}
//               example="New match: Wedding photography needed in HSR Layout next weekend. Client budget: ₹25,000. Match score: 96%"
//               side="right"
//               theme="light"
//             />
            
//             <Enhanced3DStepCard
//               number="3"
//               title="Smart Proposal & Negotiation"
//               description="AI Assistant helps Priya craft compelling proposals and negotiate terms while maintaining fair pricing for her skill level."
//               icon={<MessageSquare className="w-6 h-6" />}
//               example="AI suggests: 'Include engagement shoot package for ₹30,000 total. Emphasize your specialization in candid moments.'"
//               side="left"
//               theme="dark"
//             />
            
//             <Enhanced3DStepCard
//               number="4"
//               title="Secure Project Management"
//               description="Project milestones set with payment checkpoints. Client deposits 50% upfront, remainder held in escrow until delivery."
//               icon={<Shield className="w-6 h-6" />}
//               example="Milestone 1: ₹15,000 on booking confirmation. Milestone 2: ₹15,000 on photo delivery (7 days post-wedding)"
//               side="right"
//               theme="light"
//             />
            
//             <Enhanced3DStepCard
//               number="5"
//               title="Merit Credits & Growth"
//               description="Excellent service earns Merit Credits, unlocking priority placement, lower fees, and exclusive high-value opportunities."
//               icon={<TrendingUp className="w-6 h-6" />}
//               example="5-star review earned 50 Merit Credits. Unlocked: 'Premium Photographer' badge, 10% fee reduction, priority for ₹50,000+ weddings"
//               side="left"
//               theme="dark"
//             />
//           </div>
//         </div>
//       </section>

//       {/* Coins & Payments Flow Section */}
//       <section ref={flowRef} className="py-20 px-6 bg-jet-stream-900/30">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
//               <span className="gradient-text">Transparent Payment Flow</span>
//             </h2>
//             <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//               SkillsAmigo Coins ensure secure, transparent payments that protect both buyers and sellers at every step
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8 mb-12">
//             <Card className="flow-step bg-jet-stream-900/50 border-jet-stream-700">
//               <CardContent className="p-6 text-center">
//                 <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-jet-stream-400 to-orange-500 flex items-center justify-center">
//                   <CreditCard className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="text-xl font-display font-semibold mb-3">Buyer Loads Coins</h3>
//                 <p className="text-gray-300">Secure payment methods convert money into SkillsAmigo Coins at 1:1 ratio</p>
//               </CardContent>
//             </Card>

//             <Card className="flow-step bg-jet-stream-900/50 border-jet-stream-700">
//               <CardContent className="p-6 text-center">
//                 <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-jet-stream-400 to-orange-500 flex items-center justify-center">
//                   <Shield className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="text-xl font-display font-semibold mb-3">Escrow Protection</h3>
//                 <p className="text-gray-300">Coins held securely until service milestones are met and approved</p>
//               </CardContent>
//             </Card>

//             <Card className="flow-step bg-jet-stream-900/50 border-jet-stream-700">
//               <CardContent className="p-6 text-center">
//                 <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-jet-stream-400 to-orange-500 flex items-center justify-center">
//                   <CheckCircle className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="text-xl font-display font-semibold mb-3">Automatic Release</h3>
//                 <p className="text-gray-300">Coins released to seller upon successful completion and buyer approval</p>
//               </CardContent>
//             </Card>
//           </div>

//           <div className="bg-jet-stream-900/50 rounded-lg p-8 border border-jet-stream-700">
//             <h3 className="text-2xl font-display font-semibold mb-6 text-center">Payment Security Features</h3>
//             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//               <div className="text-center">
//                 <Shield className="w-8 h-8 mx-auto mb-3 text-jet-stream-400" />
//                 <h4 className="font-semibold mb-2">Bank-Grade Encryption</h4>
//                 <p className="text-sm text-gray-300">256-bit SSL encryption protects all transactions</p>
//               </div>
//               <div className="text-center">
//                 <AlertTriangle className="w-8 h-8 mx-auto mb-3 text-jet-stream-400" />
//                 <h4 className="font-semibold mb-2">Fraud Detection</h4>
//                 <p className="text-sm text-gray-300">AI monitors suspicious activities 24/7</p>
//               </div>
//               <div className="text-center">
//                 <Clock className="w-8 h-8 mx-auto mb-3 text-jet-stream-400" />
//                 <h4 className="font-semibold mb-2">Instant Refunds</h4>
//                 <p className="text-sm text-gray-300">Automated refunds for cancelled services</p>
//               </div>
//               <div className="text-center">
//                 <Award className="w-8 h-8 mx-auto mb-3 text-jet-stream-400" />
//                 <h4 className="font-semibold mb-2">RBI Compliant</h4>
//                 <p className="text-sm text-gray-300">Fully compliant with Indian regulations</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Merit Credits & Trust System */}
//       <section className="py-20 px-6">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
//               Merit Credits & <span className="gradient-text">Trust System</span>
//             </h2>
//             <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//               Earn credits for excellent service and unlock exclusive benefits in our gamified trust ecosystem
//             </p>
//           </div>

//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <h3 className="text-2xl font-display font-semibold mb-6">Trust Tier Progression</h3>
//               <div className="space-y-6">
//                 <div className="flex items-center gap-4">
//                   <Badge variant="outline" className="border-gray-600 text-gray-400">Newcomer</Badge>
//                   <span className="text-gray-300">0-100 credits</span>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <Badge variant="outline" className="border-jet-stream-400 text-jet-stream-400">Trusted</Badge>
//                   <span className="text-gray-300">101-500 credits</span>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <Badge variant="outline" className="border-orange-500 text-orange-500">Expert</Badge>
//                   <span className="text-gray-300">501-1000 credits</span>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black">Master</Badge>
//                   <span className="text-gray-300">1000+ credits</span>
//                 </div>
//               </div>

//               <div className="mt-8 p-6 bg-jet-stream-900/50 rounded-lg border border-jet-stream-700">
//                 <h4 className="text-lg font-semibold mb-4">How to Earn Merit Credits</h4>
//                 <ul className="space-y-2 text-gray-300">
//                   <li className="flex items-center gap-2">
//                     <Star className="w-4 h-4 text-orange-500" />
//                     <span>5-star reviews: +10 credits</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <Clock className="w-4 h-4 text-orange-500" />
//                     <span>On-time completion: +5 credits</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <Users className="w-4 h-4 text-orange-500" />
//                     <span>Repeat customers: +15 credits</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <Gift className="w-4 h-4 text-orange-500" />
//                     <span>Going above & beyond: +25 credits</span>
//                   </li>
//                 </ul>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-8">
//               <ProgressRing value={85} label="Service Quality" color="#E67E22" />
//               <ProgressRing value={92} label="Reliability" color="#719f9a" />
//               <ProgressRing value={78} label="Communication" color="#E67E22" />
//               <ProgressRing value={95} label="Customer Satisfaction" color="#719f9a" />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Collaboration Section */}
//       <section className="py-20 px-6 bg-jet-stream-900/30">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
//               Collaboration on <span className="gradient-text">Big Projects</span>
//             </h2>
//             <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//               See how multiple specialists seamlessly work together on complex projects like weddings
//             </p>
//           </div>

//           <Carousel>
//             <Card className="bg-jet-stream-900/50 border-jet-stream-700 m-4">
//               <CardContent className="p-8">
//                 <div className="flex items-start gap-6">
//                   <div className="w-16 h-16 rounded-full bg-gradient-to-br from-jet-stream-400 to-orange-500 flex items-center justify-center shrink-0">
//                     <Heart className="w-8 h-8 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-2xl font-display font-semibold mb-4">Wedding Dream Team</h3>
//                     <p className="text-gray-300 mb-6">
//                       Anita's dream wedding required coordination between photographer, caterer, decorator, mehendi artist, and DJ. 
//                       SkillsAmigo's collaboration tools made it seamless.
//                     </p>
//                     <div className="grid grid-cols-2 gap-4 text-sm">
//                       <div>
//                         <strong className="text-white">Team Members:</strong>
//                         <ul className="text-gray-300 mt-1">
//                           <li>• Priya (Photographer)</li>
//                           <li>• Ravi (Caterer)</li>
//                           <li>• Sunita (Decorator)</li>
//                         </ul>
//                       </div>
//                       <div>
//                         <strong className="text-white">Results:</strong>
//                         <ul className="text-gray-300 mt-1">
//                           <li>• 100% on-time delivery</li>
//                           <li>• 5-star average rating</li>
//                           <li>• ₹2.5L project completed flawlessly</li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-jet-stream-900/50 border-jet-stream-700 m-4">
//               <CardContent className="p-8">
//                 <div className="flex items-start gap-6">
//                   <div className="w-16 h-16 rounded-full bg-gradient-to-br from-jet-stream-400 to-orange-500 flex items-center justify-center shrink-0">
//                     <Users className="w-8 h-8 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-2xl font-display font-semibold mb-4">Collaboration Tools</h3>
//                     <p className="text-gray-300 mb-6">
//                       Shared timelines, group chats, milestone tracking, and coordinated payments ensure perfect synchronization.
//                     </p>
//                     <div className="space-y-4">
//                       <div className="flex items-center gap-3">
//                         <Calendar className="w-5 h-5 text-jet-stream-400" />
//                         <span>Shared project timeline with dependencies</span>
//                       </div>
//                       <div className="flex items-center gap-3">
//                         <MessageSquare className="w-5 h-5 text-jet-stream-400" />
//                         <span>Team communication channels</span>
//                       </div>
//                       <div className="flex items-center gap-3">
//                         <CheckCircle className="w-5 h-5 text-jet-stream-400" />
//                         <span>Milestone-based payment distribution</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-jet-stream-900/50 border-jet-stream-700 m-4">
//               <CardContent className="p-8">
//                 <div className="flex items-start gap-6">
//                   <div className="w-16 h-16 rounded-full bg-gradient-to-br from-jet-stream-400 to-orange-500 flex items-center justify-center shrink-0">
//                     <Award className="w-8 h-8 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-2xl font-display font-semibold mb-4">Team Success Metrics</h3>
//                     <p className="text-gray-300 mb-6">
//                       Track team performance with shared ratings, bonus distributions, and collective achievement rewards.
//                     </p>
//                     <div className="grid grid-cols-3 gap-4 text-center">
//                       <div>
//                         <div className="text-2xl font-bold text-orange-500">4.9</div>
//                         <div className="text-sm text-gray-300">Avg Team Rating</div>
//                       </div>
//                       <div>
//                         <div className="text-2xl font-bold text-jet-stream-400">₹25k</div>
//                         <div className="text-sm text-gray-300">Team Bonus Pool</div>
//                       </div>
//                       <div>
//                         <div className="text-2xl font-bold text-orange-500">98%</div>
//                         <div className="text-sm text-gray-300">Success Rate</div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </Carousel>
//         </div>
//       </section>

//       {/* AI Negotiation & Assistant */}
//       <section className="py-20 px-6">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
//               AI Negotiation & <span className="gradient-text">Smart Assistant</span>
//             </h2>
//             <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//               Our AI helps both buyers and sellers negotiate fair prices and terms while maintaining win-win outcomes
//             </p>
//           </div>

//           <div className="grid lg:grid-cols-2 gap-12 items-start">
//             <div>
//               <h3 className="text-2xl font-display font-semibold mb-6">How AI Negotiation Works</h3>
//               <div className="space-y-6">
//                 <Card className="bg-jet-stream-900/50 border-jet-stream-700">
//                   <CardContent className="p-6">
//                     <div className="flex items-start gap-4">
//                       <Bot className="w-8 h-8 text-jet-stream-400 shrink-0 mt-1" />
//                       <div>
//                         <h4 className="font-semibold mb-2">Market Rate Analysis</h4>
//                         <p className="text-gray-300 text-sm">AI analyzes thousands of similar projects to suggest fair pricing that benefits both parties</p>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card className="bg-jet-stream-900/50 border-jet-stream-700">
//                   <CardContent className="p-6">
//                     <div className="flex items-start gap-4">
//                       <MessageSquare className="w-8 h-8 text-jet-stream-400 shrink-0 mt-1" />
//                       <div>
//                         <h4 className="font-semibold mb-2">Smart Proposal Writing</h4>
//                         <p className="text-gray-300 text-sm">AI helps craft compelling proposals that highlight value while staying competitive</p>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card className="bg-jet-stream-900/50 border-jet-stream-700">
//                   <CardContent className="p-6">
//                     <div className="flex items-start gap-4">
//                       <Shield className="w-8 h-8 text-jet-stream-400 shrink-0 mt-1" />
//                       <div>
//                         <h4 className="font-semibold mb-2">Win-Win Optimization</h4>
//                         <p className="text-gray-300 text-sm">Suggests terms that maximize satisfaction for both buyer and seller based on historical data</p>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             </div>

//             <div>
//               <Card className="bg-jet-stream-900/80 border-jet-stream-600">
//                 <CardHeader className="border-b border-jet-stream-700">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-full bg-gradient-to-br from-jet-stream-400 to-orange-500 flex items-center justify-center">
//                       <Bot className="w-5 h-5 text-white" />
//                     </div>
//                     <div>
//                       <CardTitle className="text-lg">SkillsAmigo Assistant</CardTitle>
//                       <p className="text-sm text-gray-400">Online • Ready to help</p>
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="p-6">
//                   <div className="space-y-4 max-h-96 overflow-y-auto">
//                     <div className="flex gap-3">
//                       <div className="w-8 h-8 rounded-full bg-gradient-to-br from-jet-stream-400 to-orange-500 flex items-center justify-center shrink-0">
//                         <Bot className="w-4 h-4 text-white" />
//                       </div>
//                       <div className="bg-jet-stream-800 rounded-lg p-3 max-w-xs">
//                         <p className="text-sm">I see you're looking for a wedding photographer. Based on your requirements and budget of ₹30,000, I found 5 excellent matches.</p>
//                       </div>
//                     </div>

//                     <div className="flex gap-3 justify-end">
//                       <div className="bg-orange-500 rounded-lg p-3 max-w-xs">
//                         <p className="text-sm">That's great! Can you help me negotiate with the top photographer?</p>
//                       </div>
//                       <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center shrink-0">
//                         <span className="text-xs font-bold">You</span>
//                       </div>
//                     </div>

//                     <div className="flex gap-3">
//                       <div className="w-8 h-8 rounded-full bg-gradient-to-br from-jet-stream-400 to-orange-500 flex items-center justify-center shrink-0">
//                         <Bot className="w-4 h-4 text-white" />
//                       </div>
//                       <div className="bg-jet-stream-800 rounded-lg p-3 max-w-xs">
//                         <p className="text-sm">Absolutely! Priya typically charges ₹35,000, but I can help you create a package. How about adding an engagement shoot for ₹32,000 total? That's great value and she's likely to accept.</p>
//                       </div>
//                     </div>

//                     <div className="flex gap-3 justify-end">
//                       <div className="bg-orange-500 rounded-lg p-3 max-w-xs">
//                         <p className="text-sm">Perfect! Please send that proposal.</p>
//                       </div>
//                       <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center shrink-0">
//                         <span className="text-xs font-bold">You</span>
//                       </div>
//                     </div>

//                     <div className="flex gap-3">
//                       <div className="w-8 h-8 rounded-full bg-gradient-to-br from-jet-stream-400 to-orange-500 flex items-center justify-center shrink-0">
//                         <Bot className="w-4 h-4 text-white" />
//                       </div>
//                       <div className="bg-jet-stream-800 rounded-lg p-3 max-w-xs">
//                         <p className="text-sm">Proposal sent! Priya has a 90% acceptance rate for AI-optimized proposals. You should hear back within 2 hours.</p>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Fraud Detection & Disputes */}
//       <section className="py-20 px-6 bg-jet-stream-900/30">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
//               <span className="gradient-text">Fraud Detection</span> & Disputes
//             </h2>
//             <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//               Advanced AI protection and fair dispute resolution ensure a safe, trustworthy platform for everyone
//             </p>
//           </div>

//           <div className="grid lg:grid-cols-2 gap-12">
//             <div>
//               <h3 className="text-2xl font-display font-semibold mb-6">24/7 AI Protection</h3>
//               <div className="space-y-4">
//                 <Card className="bg-jet-stream-900/50 border-jet-stream-700">
//                   <CardContent className="p-6">
//                     <div className="flex items-center gap-4">
//                       <Shield className="w-8 h-8 text-red-400" />
//                       <div>
//                         <h4 className="font-semibold">Fake Profile Detection</h4>
//                         <p className="text-sm text-gray-300">AI scans for suspicious patterns, fake photos, and inconsistent information</p>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card className="bg-jet-stream-900/50 border-jet-stream-700">
//                   <CardContent className="p-6">
//                     <div className="flex items-center gap-4">
//                       <AlertTriangle className="w-8 h-8 text-yellow-400" />
//                       <div>
//                         <h4 className="font-semibold">Payment Fraud Prevention</h4>
//                         <p className="text-sm text-gray-300">Real-time transaction monitoring blocks suspicious payment activities</p>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card className="bg-jet-stream-900/50 border-jet-stream-700">
//                   <CardContent className="p-6">
//                     <div className="flex items-center gap-4">
//                       <Bot className="w-8 h-8 text-blue-400" />
//                       <div>
//                         <h4 className="font-semibold">Behavioral Analysis</h4>
//                         <p className="text-sm text-gray-300">ML models detect unusual user behavior patterns and flag potential risks</p>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             </div>

//             <div>
//               <h3 className="text-2xl font-display font-semibold mb-6">Fair Dispute Resolution</h3>
//               <div className="space-y-6">
//                 <div className="flex items-start gap-4">
//                   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-jet-stream-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
//                     1
//                   </div>
//                   <div>
//                     <h4 className="font-semibold mb-1">Automated Mediation</h4>
//                     <p className="text-sm text-gray-300">AI reviews evidence and suggests fair resolutions for common disputes</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-4">
//                   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-jet-stream-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
//                     2
//                   </div>
//                   <div>
//                     <h4 className="font-semibold mb-1">Expert Review</h4>
//                     <p className="text-sm text-gray-300">Human experts step in for complex cases requiring judgment calls</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-4">
//                   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-jet-stream-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
//                     3
//                   </div>
//                   <div>
//                     <h4 className="font-semibold mb-1">Fair Resolution</h4>
//                     <p className="text-sm text-gray-300">Quick resolution with compensation, re-work, or refunds as appropriate</p>
//                   </div>
//                 </div>

//                 <div className="bg-jet-stream-800/50 rounded-lg p-4 border-l-4 border-green-500">
//                   <div className="flex items-center gap-2 mb-2">
//                     <CheckCircle className="w-5 h-5 text-green-500" />
//                     <span className="font-semibold">Resolution Success Rate</span>
//                   </div>
//                   <div className="grid grid-cols-2 gap-4 text-sm">
//                     <div>
//                       <span className="text-2xl font-bold text-green-500">94%</span>
//                       <p className="text-gray-300">Cases resolved fairly</p>
//                     </div>
//                     <div>
//                       <span className="text-2xl font-bold text-green-500">48h</span>
//                       <p className="text-gray-300">Average resolution time</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FAQs Section */}
//       <section className="py-20 px-6">
//         <div className="max-w-4xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
//               Frequently Asked <span className="gradient-text">Questions</span>
//             </h2>
//             <p className="text-xl text-gray-300">
//               Everything you need to know about how SkillsAmigo works
//             </p>
//           </div>

//           <Accordion type="single" collapsible className="space-y-4">
//             {faqData.map((faq, index) => (
//               <AccordionItem 
//                 key={index} 
//                 value={`item-${index}`}
//                 className="bg-jet-stream-900/50 border-jet-stream-700 rounded-lg px-6"
//               >
//                 <AccordionTrigger className="text-left text-white hover:text-jet-stream-300">
//                   {faq.question}
//                 </AccordionTrigger>
//                 <AccordionContent className="text-gray-300 pb-4">
//                   {faq.answer}
//                 </AccordionContent>
//               </AccordionItem>
//             ))}
//           </Accordion>
//         </div>
//       </section>

//       {/* Final CTA Section with Complex Visuals */}
//       <section className="py-32 px-6 bg-gradient-to-br from-jet-stream-900 via-jet-stream-800 to-orange-900/20 relative overflow-hidden">
//         <FloatingAbstracts />
//         <GeometricPattern className="opacity-10" />
        
//         <div className="max-w-5xl mx-auto text-center relative z-10">
//           <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">
//             Ready to Experience the <span className="gradient-text">Future of Skill-Sharing</span>?
//           </h2>
//           <p className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
//             Join thousands of satisfied users who have transformed their businesses and solved their problems with SkillsAmigo's revolutionary platform
//           </p>
          
//           <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
//             <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-12 py-6 text-xl shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 hover:scale-110 transition-all duration-300">
//               Start Your Journey
//               <ArrowRight className="ml-3 w-6 h-6" />
//             </Button>
//             <Button size="lg" variant="outline" className="border-2 border-jet-stream-400 text-jet-stream-300 hover:bg-jet-stream-400 hover:text-white px-12 py-6 text-xl backdrop-blur-sm bg-white/10 hover:scale-110 transition-all duration-300">
//               <PlayCircle className="mr-3 w-6 h-6" />
//               Watch Success Stories
//             </Button>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
//             <div className="p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:scale-105 transition-all duration-300">
//               <div className="text-4xl font-bold text-orange-500 mb-3">50,000+</div>
//               <p className="text-gray-300 text-lg">Active Users</p>
//             </div>
//             <div className="p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:scale-105 transition-all duration-300">
//               <div className="text-4xl font-bold text-jet-stream-400 mb-3">₹10Cr+</div>
//               <p className="text-gray-300 text-lg">Transactions Completed</p>
//             </div>
//             <div className="p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:scale-105 transition-all duration-300">
//               <div className="text-4xl font-bold text-orange-500 mb-3">4.8/5</div>
//               <p className="text-gray-300 text-lg">Average Rating</p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// "use client"
// import { NewsletterFooter } from '../_components/footers/newsletter-footer';
// import { FullwidthIconNavbar } from '../_components/navbars/fullwidth-icon-navbar';
// import React, { useEffect, useRef, useState } from 'react';
// import { Button } from '../_components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '../_components/ui/card';
// import { Badge } from '../_components/ui/badge';
// import { Progress } from '../_components/ui/progress';
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../_components/ui/accordion';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { 
//   Search, 
//   CreditCard, 
//   Star, 
//   Users, 
//   Shield, 
//   MessageSquare, 
//   PlayCircle, 
//   CheckCircle, 
//   ArrowRight, 
//   Coins, 
//   Award, 
//   Camera, 
//   Wrench, 
//   Heart, 
//   Gift, 
//   Bot, 
//   AlertTriangle,
//   ChevronLeft,
//   ChevronRight,
//   Zap,
//   TrendingUp,
//   UserCheck,
//   Calendar,
//   MapPin,
//   Clock,
//   Sparkles,
//   Hexagon,
//   Triangle,
//   Square,
//   Cpu,
//   Network,
//   Layers,
//   Globe,
//   Menu,
//   X
// } from 'lucide-react';


// // PixelTransition Component
// const PixelTransition = ({
//   firstContent,
//   secondContent,
//   gridSize = 7,
//   pixelColor = '#719f9a',
//   animationStepDuration = 0.3,
//   className = '',
//   style = {},
//   aspectRatio = '100%',
// }) => {
//   const containerRef = useRef(null);
//   const pixelGridRef = useRef(null);
//   const activeRef = useRef(null);
//   const delayedCallRef = useRef(null);
//   const [isActive, setIsActive] = useState(false);
  
//   const isTouchDevice = typeof window !== 'undefined' && (
//     'ontouchstart' in window ||
//     navigator.maxTouchPoints > 0 ||
//     window.matchMedia('(pointer: coarse)').matches
//   );

//   useEffect(() => {
//     const pixelGridEl = pixelGridRef.current;
//     if (!pixelGridEl) return;
    
//     pixelGridEl.innerHTML = '';
//     for (let row = 0; row < gridSize; row++) {
//       for (let col = 0; col < gridSize; col++) {
//         const pixel = document.createElement('div');
//         pixel.classList.add('pixelated-image-card__pixel');
//         pixel.classList.add('absolute', 'hidden');
//         pixel.style.backgroundColor = pixelColor;
//         const size = 100 / gridSize;
//         pixel.style.width = `${size}%`;
//         pixel.style.height = `${size}%`;
//         pixel.style.left = `${col * size}%`;
//         pixel.style.top = `${row * size}%`;
//         pixelGridEl.appendChild(pixel);
//       }
//     }
//   }, [gridSize, pixelColor]);

//   const animatePixels = (activate) => {
//     setIsActive(activate);
//     const pixelGridEl = pixelGridRef.current;
//     const activeEl = activeRef.current;
//     if (!pixelGridEl || !activeEl) return;

//     const pixels = pixelGridEl.querySelectorAll('.pixelated-image-card__pixel');
//     if (!pixels.length) return;

//     // Clear existing animations
//     pixels.forEach(pixel => pixel.style.display = 'none');

//     const totalPixels = pixels.length;
//     const staggerDuration = animationStepDuration / totalPixels;

//     // Show pixels with random stagger
//     pixels.forEach((pixel, index) => {
//       setTimeout(() => {
//         pixel.style.display = 'block';
//       }, Math.random() * animationStepDuration * 1000);
//     });

//     // Toggle content after animation
//     setTimeout(() => {
//       activeEl.style.display = activate ? 'block' : 'none';
//       activeEl.style.pointerEvents = activate ? 'none' : '';
//     }, animationStepDuration * 1000);

//     // Hide pixels after content change
//     setTimeout(() => {
//       pixels.forEach((pixel, index) => {
//         setTimeout(() => {
//           pixel.style.display = 'none';
//         }, Math.random() * animationStepDuration * 1000);
//       });
//     }, animationStepDuration * 1000);
//   };

//   const handleMouseEnter = () => {
//     if (!isActive) animatePixels(true);
//   };

//   const handleMouseLeave = () => {
//     if (isActive) animatePixels(false);
//   };

//   const handleClick = () => {
//     animatePixels(!isActive);
//   };

//   return (
//     <div
//       ref={containerRef}
//       className={`
//         ${className}
//         bg-gradient-to-br from-jet-stream-800 to-jet-stream-900
//         text-white
//         rounded-2xl
//         border-2
//         border-jet-stream-600
//         hover:border-jet-stream-400
//         w-full max-w-sm
//         relative
//         overflow-hidden
//         transition-all duration-300
//         shadow-lg shadow-jet-stream-900/50
//       `}
//       style={style}
//       onMouseEnter={!isTouchDevice ? handleMouseEnter : undefined}
//       onMouseLeave={!isTouchDevice ? handleMouseLeave : undefined}
//       onClick={isTouchDevice ? handleClick : undefined}
//     >
//       <div style={{ paddingTop: aspectRatio }} />
//       <div className="absolute inset-0 w-full h-full p-6 flex flex-col justify-center">
//         {firstContent}
//       </div>
//       <div
//         ref={activeRef}
//         className="absolute inset-0 w-full h-full z-[2] p-6 flex flex-col justify-center"
//         style={{ display: 'none' }}
//       >
//         {secondContent}
//       </div>
//       <div
//         ref={pixelGridRef}
//         className="absolute inset-0 w-full h-full pointer-events-none z-[3]"
//       />
//     </div>
//   );
// };

// // DotGrid Component (Simplified version)
// const DotGrid = ({ className = "", dotSize = 10, gap = 15, baseColor = "#719f9a", activeColor = "#719f9a" }) => {
//   const canvasRef = useRef(null);
//   const dotsRef = useRef([]);
//   const mouseRef = useRef({ x: 0, y: 0 });

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     const rect = canvas.getBoundingClientRect();
    
//     // Set canvas size
//     canvas.width = rect.width;
//     canvas.height = rect.height;

//     // Create dots grid
//     const cols = Math.floor(canvas.width / (dotSize + gap));
//     const rows = Math.floor(canvas.height / (dotSize + gap));
    
//     const dots = [];
//     for (let y = 0; y < rows; y++) {
//       for (let x = 0; x < cols; x++) {
//         dots.push({
//           x: x * (dotSize + gap) + dotSize / 2,
//           y: y * (dotSize + gap) + dotSize / 2,
//           originalX: x * (dotSize + gap) + dotSize / 2,
//           originalY: y * (dotSize + gap) + dotSize / 2
//         });
//       }
//     }
//     dotsRef.current = dots;

//     let animationId;
//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
      
//       dots.forEach(dot => {
//         const distance = Math.sqrt(
//           Math.pow(dot.x - mouseRef.current.x, 2) + 
//           Math.pow(dot.y - mouseRef.current.y, 2)
//         );
        
//         const maxDistance = 100;
//         const opacity = distance < maxDistance ? 1 - (distance / maxDistance) : 0.3;
        
//         // Animate dot position back to original
//         dot.x += (dot.originalX - dot.x) * 0.1;
//         dot.y += (dot.originalY - dot.y) * 0.1;
        
//         ctx.fillStyle = distance < maxDistance ? activeColor : baseColor;
//         ctx.globalAlpha = opacity;
//         ctx.beginPath();
//         ctx.arc(dot.x, dot.y, dotSize / 2, 0, Math.PI * 2);
//         ctx.fill();
//       });
      
//       animationId = requestAnimationFrame(animate);
//     };

//     const handleMouseMove = (e) => {
//       const rect = canvas.getBoundingClientRect();
//       mouseRef.current = {
//         x: e.clientX - rect.left,
//         y: e.clientY - rect.top
//       };
      
//       // Add repulsion effect
//       dots.forEach(dot => {
//         const distance = Math.sqrt(
//           Math.pow(dot.originalX - mouseRef.current.x, 2) + 
//           Math.pow(dot.originalY - mouseRef.current.y, 2)
//         );
        
//         if (distance < 80) {
//           const angle = Math.atan2(dot.originalY - mouseRef.current.y, dot.originalX - mouseRef.current.x);
//           const force = (80 - distance) * 0.5;
//           dot.x = dot.originalX + Math.cos(angle) * force;
//           dot.y = dot.originalY + Math.sin(angle) * force;
//         }
//       });
//     };

//     canvas.addEventListener('mousemove', handleMouseMove);
//     animate();

//     return () => {
//       canvas.removeEventListener('mousemove', handleMouseMove);
//       cancelAnimationFrame(animationId);
//     };
//   }, [dotSize, gap, baseColor, activeColor]);

//   return (
//     <canvas 
//       ref={canvasRef} 
//       className={`w-full h-full ${className}`}
//       style={{ background: 'transparent' }}
//     />
//   );
// };

// // Enhanced Navigation Component


// // Enhanced Floating Elements
// const FloatingElements = () => {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     if (typeof window !== 'undefined' && window.gsap && containerRef.current) {
//       const elements = containerRef.current.querySelectorAll('.floating-element');
      
//       elements.forEach((el, index) => {
//         // Initial random positioning
//         window.gsap.set(el, {
//           x: Math.random() * window.innerWidth,
//           y: Math.random() * window.innerHeight,
//           rotation: Math.random() * 360,
//           scale: 0.3 + Math.random() * 0.7
//         });

//         // Floating animation
//         window.gsap.to(el, {
//           x: `+=${(Math.random() - 0.5) * 300}`,
//           y: `+=${(Math.random() - 0.5) * 200}`,
//           rotation: `+=${(Math.random() - 0.5) * 360}`,
//           duration: 15 + Math.random() * 10,
//           ease: 'none',
//           repeat: -1,
//           yoyo: true,
//           delay: index * 0.5
//         });
//       });
//     }
//   }, []);

//   const shapes = [Hexagon, Triangle, Square, Cpu, Network, Layers, Globe, Sparkles];

//   return (
//     <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
//       {[...Array(15)].map((_, i) => {
//         const Shape = shapes[i % shapes.length];
//         return (
//           <div
//             key={i}
//             className="floating-element absolute opacity-10"
//             style={{
//               color: i % 2 === 0 ? '#719f9a' : '#9fc1bd',
//               filter: `blur(${Math.random() * 1.5}px)`
//             }}
//           >
//             <Shape size={15 + Math.random() * 25} />
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// // Enhanced Feature Card
// const EnhancedFeatureCard = ({ icon, title, description, delay = 0, className = "" }) => {
//   const cardRef = useRef(null);

//   useEffect(() => {
//     if (typeof window !== 'undefined' && window.gsap && cardRef.current) {
//       window.gsap.fromTo(cardRef.current,
//         { 
//           opacity: 0, 
//           y: 60,
//           scale: 0.9,
//           rotationX: -10
//         },
//         { 
//           opacity: 1, 
//           y: 0,
//           scale: 1,
//           rotationX: 0,
//           duration: 1,
//           delay: delay,
//           ease: 'power3.out',
//           scrollTrigger: {
//             trigger: cardRef.current,
//             start: 'top 80%',
//             toggleActions: 'play none none reverse'
//           }
//         }
//       );
//     }
//   }, [delay]);

//   return (
//     <div ref={cardRef} className={`transform transition-all duration-300 hover:scale-105 ${className}`}>
//       <PixelTransition
//         firstContent={
//           <div className="text-center">
//             <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-jet-stream-400 to-jet-stream-600 flex items-center justify-center text-white shadow-lg">
//               {icon}
//             </div>
//             <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
//             <p className="text-jet-stream-200 text-sm leading-relaxed">{description}</p>
//           </div>
//         }
//         secondContent={
//           <div className="text-center">
//             <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-jet-stream-300 to-jet-stream-500 flex items-center justify-center text-white shadow-xl transform rotate-6">
//               {icon}
//             </div>
//             <h3 className="text-xl font-bold text-jet-stream-100 mb-2">{title}</h3>
//             <p className="text-jet-stream-100 leading-relaxed font-medium">{description}</p>
//             <Button 
//               size="sm" 
//               className="mt-4 bg-gradient-to-r from-jet-stream-500 to-jet-stream-600 hover:from-jet-stream-400 hover:to-jet-stream-500 text-white"
//             >
//               Learn More
//             </Button>
//           </div>
//         }
//         aspectRatio="100%"
//         gridSize={8}
//         pixelColor="#719f9a"
//       />
//     </div>
//   );
// };

// // Enhanced Step Component
// const EnhancedStepCard = ({ number, title, description, icon, side, delay = 0 }) => {
//   const cardRef = useRef(null);

//   useEffect(() => {
//     if (typeof window !== 'undefined' && window.gsap && cardRef.current) {
//       window.gsap.fromTo(cardRef.current,
//         { 
//           opacity: 0, 
//           x: side === 'left' ? -100 : 100,
//           rotateY: side === 'left' ? -15 : 15
//         },
//         { 
//           opacity: 1, 
//           x: 0,
//           rotateY: 0,
//           duration: 1.2,
//           delay: delay,
//           ease: 'power3.out',
//           scrollTrigger: {
//             trigger: cardRef.current,
//             start: 'top 75%',
//             toggleActions: 'play none none reverse'
//           }
//         }
//       );
//     }
//   }, [side, delay]);

//   return (
//     <div ref={cardRef} className={`flex flex-col lg:flex-row items-center gap-8 ${side === 'right' ? 'lg:flex-row-reverse' : ''}`}>
//       <div className="flex-1 w-full">
//         <Card className="bg-gradient-to-br from-jet-stream-50 to-jet-stream-100 border-jet-stream-300 hover:border-jet-stream-400 transition-all duration-300 hover:shadow-xl hover:shadow-jet-stream-400/20">
//           <CardContent className="p-6 lg:p-8">
//             <div className="flex items-start gap-4">
//               <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-jet-stream-500 to-jet-stream-600 flex items-center justify-center text-white font-bold text-lg lg:text-xl shrink-0 shadow-lg">
//                 {number}
//               </div>
//               <div className="flex-1">
//                 <h3 className="text-xl lg:text-2xl font-bold text-jet-stream-900 mb-3">{title}</h3>
//                 <p className="text-jet-stream-700 leading-relaxed lg:text-lg">{description}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
      
//       <div className="relative">
//         <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-jet-stream-400 to-jet-stream-600 flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform duration-300">
//           {icon}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main Component
// export default function EnhancedSkillsAmigoPage() {
//   const heroRef = useRef(null);

//   useEffect(() => {
//     if (typeof window !== 'undefined' && window.gsap && heroRef.current) {
//       const tl = window.gsap.timeline();
      
//       tl.fromTo('.hero-title', 
//         { opacity: 0, y: 100, scale: 0.9 },
//         { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: 'power3.out' }
//       )
//       .fromTo('.hero-subtitle', 
//         { opacity: 0, y: 50 },
//         { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
//         '-=0.8'
//       )
//       .fromTo('.hero-buttons', 
//         { opacity: 0, y: 30, scale: 0.9 },
//         { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'back.out(1.7)' },
//         '-=0.5'
//       );
//     }
//   }, []);

//   const faqData = [
//     {
//       question: "How does the AI matching system work?",
//       answer: "Our AI analyzes your requirements, location, budget, and preferences to match you with the most suitable service providers. It considers factors like expertise, ratings, availability, and past performance to ensure the best possible matches."
//     },
//     {
//       question: "What are SkillsAmigo Coins and how do they work?",
//       answer: "Coins are our secure payment system that holds funds until service completion. When you book a service, coins are held in escrow and only released to the provider after successful delivery and your approval. This protects both parties and ensures quality service."
//     },
//     {
//       question: "How are disputes handled?",
//       answer: "Our dispute resolution system includes automated mediation, expert human reviewers, and a comprehensive evidence review process. Most disputes are resolved within 48 hours, with full refunds or re-work guaranteed for legitimate claims."
//     },
//     {
//       question: "What is the Merit Credits system?",
//       answer: "Merit Credits are earned through excellent service delivery, positive reviews, and platform engagement. They unlock benefits like priority placement, reduced fees, exclusive opportunities, and enhanced trust badges that attract more customers."
//     },
//     {
//       question: "How does collaboration work for big projects?",
//       answer: "Big projects can involve multiple specialists working together. Our collaboration tools include shared project timelines, team communication channels, milestone tracking, and coordinated payments. Perfect for events, renovations, or complex services."
//     },
//     {
//       question: "Is the platform safe for payments?",
//       answer: "Yes, we use bank-grade encryption, secure escrow systems, fraud detection AI, and are compliant with all Indian payment regulations. Your money is protected at every step of the transaction process."
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-jet-stream-950 via-jet-stream-900 to-jet-stream-975 text-white relative overflow-hidden">
//       <FloatingElements />
//       <FullwidthIconNavbar  />

//       {/* Hero Section */}
//       <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8">
//         <div className="absolute inset-0 opacity-30">
//           <DotGrid 
//             dotSize={8} 
//             gap={20} 
//             baseColor="#719f9a" 
//             activeColor="#9fc1bd" 
//           />
//         </div>
        
//         <div className="relative z-10 text-center max-w-6xl mx-auto">
//           <h1 className="hero-title text-4xl sm:text-6xl lg:text-8xl font-bold mb-8 leading-tight">
//             AI‑guided bookings,{' '}
//             <span className="bg-gradient-to-r from-jet-stream-300 to-jet-stream-500 bg-clip-text text-transparent">
//               trusted payments
//             </span>
//             <br className="hidden sm:block" />
//             <span className="text-jet-stream-100">effortless collaboration</span>
//           </h1>
          
//           <p className="hero-subtitle text-lg sm:text-xl lg:text-2xl text-jet-stream-200 mb-12 max-w-4xl mx-auto leading-relaxed">
//             Experience the future of skill-sharing with our revolutionary platform that connects buyers and sellers through intelligent matching, secure payments, and seamless collaboration tools.
//           </p>
          
//           <div className="hero-buttons flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
//             <Button size="lg" className="bg-gradient-to-r from-jet-stream-500 to-jet-stream-600 hover:from-jet-stream-400 hover:to-jet-stream-500 text-white font-semibold px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl shadow-xl hover:scale-105 transition-all duration-300">
//               Start as Buyer
//               <ArrowRight className="ml-3 w-5 h-5 sm:w-6 sm:h-6" />
//             </Button>
//             <Button size="lg" variant="outline" className="border-2 border-jet-stream-400 text-jet-stream-300 hover:bg-jet-stream-400 hover:text-white px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl backdrop-blur-sm bg-white/5 hover:scale-105 transition-all duration-300">
//               Start as Seller
//               <UserCheck className="ml-3 w-5 h-5 sm:w-6 sm:h-6" />
//             </Button>
//             <Button size="lg" variant="ghost" className="text-jet-stream-300 hover:text-jet-stream-100 px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300">
//               <PlayCircle className="mr-3 w-5 h-5 sm:w-6 sm:h-6" />
//               Watch Demo
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16 lg:mb-20">
//             <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">
//               Four Pillars of <span className="bg-gradient-to-r from-jet-stream-300 to-jet-stream-500 bg-clip-text text-transparent">SkillsAmigo</span>
//             </h2>
//             <p className="text-lg sm:text-xl lg:text-2xl text-jet-stream-200 max-w-4xl mx-auto leading-relaxed">
//               Our platform is built on four core principles that ensure seamless, secure, and successful skill-sharing experiences
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
//             <EnhancedFeatureCard
//               icon={<Search className="w-8 h-8" />}
//               title="Discover"
//               description="AI-powered matching connects you with perfect service providers based on your exact needs, location, and budget"
//               delay={0}
//             />
//             <EnhancedFeatureCard
//               icon={<Coins className="w-8 h-8" />}
//               title="Book & Pay"
//               description="Secure escrow system holds payments until service completion, protecting both buyers and sellers"
//               delay={0.2}
//             />
//             <EnhancedFeatureCard
//               icon={<Star className="w-8 h-8" />}
//               title="Deliver & Review"
//               description="Quality assurance through milestone tracking, reviews, and comprehensive rating system"
//               delay={0.4}
//             />
//             <EnhancedFeatureCard
//               icon={<Users className="w-8 h-8" />}
//               title="Collaborate"
//               description="Seamless teamwork tools for complex projects requiring multiple specialists working together"
//               delay={0.6}
//             />
//           </div>
//         </div>
//       </section>

//       {/* Journey Section */}
//       <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-jet-stream-100/5 via-transparent to-jet-stream-200/5">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-16 lg:mb-20">
//             <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">
//               Your Journey: <span className="bg-gradient-to-r from-jet-stream-300 to-jet-stream-500 bg-clip-text text-transparent">From Problem to Solution</span>
//             </h2>
//             <p className="text-lg sm:text-xl lg:text-2xl text-jet-stream-200 max-w-4xl mx-auto leading-relaxed">
//               Follow Sarah's journey as she deals with a plumbing emergency and discovers how SkillsAmigo makes finding help effortless
//             </p>
//           </div>

//           <div className="space-y-16 sm:space-y-20 lg:space-y-24">
//             <EnhancedStepCard
//               number="1"
//               title="Emergency Strikes"
//               description="Sarah's kitchen pipe bursts at 7 PM on a Sunday. She opens SkillsAmigo and describes her urgent plumbing emergency with natural language processing understanding her needs instantly."
//               icon={<Wrench className="w-6 h-6 lg:w-8 lg:h-8" />}
//               side="left"
//               delay={0}
//             />
            
//             <EnhancedStepCard
//               number="2"
//               title="AI Finds Perfect Matches"
//               description="Our advanced AI instantly analyzes Sarah's location, urgency, and requirements to find verified emergency plumbers available now, considering traffic, ratings, and specializations."
//               icon={<Bot className="w-6 h-6 lg:w-8 lg:h-8" />}
//               side="right"
//               delay={0.2}
//             />
            
//             <EnhancedStepCard
//               number="3"
//               title="Smart Booking & Payment"
//               description="Sarah reviews detailed profiles, checks real-time availability, and books with Rajesh (4.9 rating, 200+ jobs). Payment is securely held in escrow with automatic release conditions."
//               icon={<Calendar className="w-6 h-6 lg:w-8 lg:h-8" />}
//               side="left"
//               delay={0.4}
//             />
            
//             <EnhancedStepCard
//               number="4"
//               title="Live Tracking & Updates"
//               description="Sarah tracks Rajesh's location in real-time via GPS integration and receives proactive updates throughout the service via in-app messaging and notifications."
//               icon={<MapPin className="w-6 h-6 lg:w-8 lg:h-8" />}
//               side="right"
//               delay={0.6}
//             />
            
//             <EnhancedStepCard
//               number="5"
//               title="Quality Completion & Review"
//               description="Service completed successfully with photo verification. Payment automatically released after Sarah confirms satisfaction. Both parties leave detailed reviews with photo evidence."
//               icon={<CheckCircle className="w-6 h-6 lg:w-8 lg:h-8" />}
//               side="left"
//               delay={0.8}
//             />
//           </div>
//         </div>
//       </section>

//       {/* Seller Journey Section */}
//       <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-16 lg:mb-20">
//             <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">
//               Seller Journey: <span className="bg-gradient-to-r from-jet-stream-300 to-jet-stream-500 bg-clip-text text-transparent">Building Your Business</span>
//             </h2>
//             <p className="text-lg sm:text-xl lg:text-2xl text-jet-stream-200 max-w-3xl mx-auto leading-relaxed">
//               Meet Priya, a freelance photographer who transformed her passion into a thriving business using SkillsAmigo
//             </p>
//           </div>

//           <div className="space-y-16 sm:space-y-20 lg:space-y-24">
//             <EnhancedStepCard
//               number="1"
//               title="Profile Creation & Verification"
//               description="Priya creates her photography profile, uploads portfolio, gets verified through document and skill assessment with our comprehensive verification system."
//               icon={<Camera className="w-6 h-6 lg:w-8 lg:h-8" />}
//               side="left"
//               delay={0}
//             />
            
//             <EnhancedStepCard
//               number="2"
//               title="AI-Powered Job Matching"
//               description="SkillsAmigo's AI analyzes Priya's skills, availability, and location to suggest relevant photography gigs automatically with high match accuracy."
//               icon={<Zap className="w-6 h-6 lg:w-8 lg:h-8" />}
//               side="right"
//               delay={0.2}
//             />
            
//             <EnhancedStepCard
//               number="3"
//               title="Smart Proposal & Negotiation"
//               description="AI Assistant helps Priya craft compelling proposals and negotiate terms while maintaining fair pricing for her skill level and market position."
//               icon={<MessageSquare className="w-6 h-6 lg:w-8 lg:h-8" />}
//               side="left"
//               delay={0.4}
//             />
            
//             <EnhancedStepCard
//               number="4"
//               title="Secure Project Management"
//               description="Project milestones set with payment checkpoints. Client deposits upfront, remainder held in escrow until delivery with automated release conditions."
//               icon={<Shield className="w-6 h-6 lg:w-8 lg:h-8" />}
//               side="right"
//               delay={0.6}
//             />
            
//             <EnhancedStepCard
//               number="5"
//               title="Merit Credits & Growth"
//               description="Excellent service earns Merit Credits, unlocking priority placement, lower fees, and exclusive high-value opportunities in our gamified ecosystem."
//               icon={<TrendingUp className="w-6 h-6 lg:w-8 lg:h-8" />}
//               side="left"
//               delay={0.8}
//             />
//           </div>
//         </div>
//       </section>

//       {/* Payment Flow Section */}
//       <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-jet-stream-900/30 via-transparent to-jet-stream-800/20">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-16 lg:mb-20">
//             <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">
//               <span className="bg-gradient-to-r from-jet-stream-300 to-jet-stream-500 bg-clip-text text-transparent">Secure Payment Flow</span>
//             </h2>
//             <p className="text-lg sm:text-xl lg:text-2xl text-jet-stream-200 max-w-3xl mx-auto leading-relaxed">
//               SkillsAmigo Coins ensure secure, transparent payments that protect both buyers and sellers at every step
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 lg:mb-16">
//             <Card className="bg-gradient-to-br from-jet-stream-800/50 to-jet-stream-900/50 border-jet-stream-600 hover:border-jet-stream-400 transition-all duration-300 hover:scale-105">
//               <CardContent className="p-6 sm:p-8 text-center">
//                 <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-jet-stream-400 to-jet-stream-600 flex items-center justify-center shadow-lg">
//                   <CreditCard className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
//                 </div>
//                 <h3 className="text-xl lg:text-2xl font-bold mb-3 text-white">Load Coins</h3>
//                 <p className="text-jet-stream-200 leading-relaxed">Secure payment methods convert money into SkillsAmigo Coins at 1:1 ratio with instant processing</p>
//               </CardContent>
//             </Card>

//             <Card className="bg-gradient-to-br from-jet-stream-800/50 to-jet-stream-900/50 border-jet-stream-600 hover:border-jet-stream-400 transition-all duration-300 hover:scale-105">
//               <CardContent className="p-6 sm:p-8 text-center">
//                 <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-jet-stream-400 to-jet-stream-600 flex items-center justify-center shadow-lg">
//                   <Shield className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
//                 </div>
//                 <h3 className="text-xl lg:text-2xl font-bold mb-3 text-white">Escrow Protection</h3>
//                 <p className="text-jet-stream-200 leading-relaxed">Coins held securely until service milestones are met and approved by both parties</p>
//               </CardContent>
//             </Card>

//             <Card className="bg-gradient-to-br from-jet-stream-800/50 to-jet-stream-900/50 border-jet-stream-600 hover:border-jet-stream-400 transition-all duration-300 hover:scale-105">
//               <CardContent className="p-6 sm:p-8 text-center">
//                 <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-jet-stream-400 to-jet-stream-600 flex items-center justify-center shadow-lg">
//                   <CheckCircle className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
//                 </div>
//                 <h3 className="text-xl lg:text-2xl font-bold mb-3 text-white">Auto Release</h3>
//                 <p className="text-jet-stream-200 leading-relaxed">Coins released to seller upon successful completion and buyer approval automatically</p>
//               </CardContent>
//             </Card>
//           </div>

//           <div className="bg-gradient-to-br from-jet-stream-800/30 to-jet-stream-900/30 rounded-2xl p-6 sm:p-8 lg:p-12 border border-jet-stream-700 backdrop-blur-sm">
//             <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 text-center text-white">Payment Security Features</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
//               <div className="text-center">
//                 <Shield className="w-10 h-10 lg:w-12 lg:h-12 mx-auto mb-4 text-jet-stream-400" />
//                 <h4 className="font-bold mb-2 text-white text-lg">Bank-Grade Encryption</h4>
//                 <p className="text-sm sm:text-base text-jet-stream-200">256-bit SSL encryption protects all transactions</p>
//               </div>
//               <div className="text-center">
//                 <AlertTriangle className="w-10 h-10 lg:w-12 lg:h-12 mx-auto mb-4 text-jet-stream-400" />
//                 <h4 className="font-bold mb-2 text-white text-lg">Fraud Detection</h4>
//                 <p className="text-sm sm:text-base text-jet-stream-200">AI monitors suspicious activities 24/7</p>
//               </div>
//               <div className="text-center">
//                 <Clock className="w-10 h-10 lg:w-12 lg:h-12 mx-auto mb-4 text-jet-stream-400" />
//                 <h4 className="font-bold mb-2 text-white text-lg">Instant Refunds</h4>
//                 <p className="text-sm sm:text-base text-jet-stream-200">Automated refunds for cancelled services</p>
//               </div>
//               <div className="text-center">
//                 <Award className="w-10 h-10 lg:w-12 lg:h-12 mx-auto mb-4 text-jet-stream-400" />
//                 <h4 className="font-bold mb-2 text-white text-lg">RBI Compliant</h4>
//                 <p className="text-sm sm:text-base text-jet-stream-200">Fully compliant with Indian regulations</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Collaboration Section */}
//       <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-16 lg:mb-20">
//             <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">
//               <span className="bg-gradient-to-r from-jet-stream-300 to-jet-stream-500 bg-clip-text text-transparent">Team Collaboration</span> on Big Projects
//             </h2>
//             <p className="text-lg sm:text-xl lg:text-2xl text-jet-stream-200 max-w-3xl mx-auto leading-relaxed">
//               See how multiple specialists seamlessly work together on complex projects like weddings, events, and renovations
//             </p>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
//             <div>
//               <Card className="bg-gradient-to-br from-jet-stream-800/50 to-jet-stream-900/50 border-jet-stream-600 hover:border-jet-stream-400 transition-all duration-300">
//                 <CardContent className="p-6 sm:p-8">
//                   <div className="flex items-start gap-6">
//                     <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-jet-stream-400 to-jet-stream-600 flex items-center justify-center shrink-0 shadow-lg">
//                       <Heart className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
//                     </div>
//                     <div>
//                       <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-white">Wedding Dream Team</h3>
//                       <p className="text-jet-stream-200 mb-6 leading-relaxed">
//                         Anita's dream wedding required coordination between photographer, caterer, decorator, mehendi artist, and DJ. 
//                         SkillsAmigo's collaboration tools made it seamless.
//                       </p>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
//                         <div>
//                           <strong className="text-white block mb-2">Team Members:</strong>
//                           <ul className="text-jet-stream-200 space-y-1">
//                             <li>• Priya (Photographer)</li>
//                             <li>• Ravi (Caterer)</li>
//                             <li>• Sunita (Decorator)</li>
//                             <li>• Maya (Mehendi Artist)</li>
//                             <li>• DJ Rohit (Music)</li>
//                           </ul>
//                         </div>
//                         <div>
//                           <strong className="text-white block mb-2">Results:</strong>
//                           <ul className="text-jet-stream-200 space-y-1">
//                             <li>• 100% on-time delivery</li>
//                             <li>• 5-star average rating</li>
//                             <li>• ₹2.5L project completed flawlessly</li>
//                             <li>• Zero coordination issues</li>
//                           </ul>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             <div className="space-y-6">
//               <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">Collaboration Tools</h3>
              
//               <div className="space-y-4">
//                 <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-jet-stream-800/30 to-jet-stream-700/30 rounded-lg border border-jet-stream-600">
//                   <Calendar className="w-8 h-8 text-jet-stream-400 shrink-0" />
//                   <div>
//                     <h4 className="font-bold text-white">Shared Timeline</h4>
//                     <p className="text-jet-stream-200 text-sm">Project timeline with dependencies and milestones</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-jet-stream-800/30 to-jet-stream-700/30 rounded-lg border border-jet-stream-600">
//                   <MessageSquare className="w-8 h-8 text-jet-stream-400 shrink-0" />
//                   <div>
//                     <h4 className="font-bold text-white">Team Chat</h4>
//                     <p className="text-jet-stream-200 text-sm">Real-time communication channels for coordination</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-jet-stream-800/30 to-jet-stream-700/30 rounded-lg border border-jet-stream-600">
//                   <Coins className="w-8 h-8 text-jet-stream-400 shrink-0" />
//                   <div>
//                     <h4 className="font-bold text-white">Split Payments</h4>
//                     <p className="text-jet-stream-200 text-sm">Milestone-based payment distribution to team members</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-jet-stream-800/30 to-jet-stream-700/30 rounded-lg border border-jet-stream-600">
//                   <CheckCircle className="w-8 h-8 text-jet-stream-400 shrink-0" />
//                   <div>
//                     <h4 className="font-bold text-white">Progress Tracking</h4>
//                     <p className="text-jet-stream-200 text-sm">Real-time updates on individual and team progress</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gradient-to-br from-jet-stream-600/20 to-jet-stream-800/20 rounded-lg p-6 border border-jet-stream-500">
//                 <div className="grid grid-cols-3 gap-4 text-center">
//                   <div>
//                     <div className="text-3xl font-bold text-jet-stream-300">4.9</div>
//                     <div className="text-sm text-jet-stream-200">Avg Team Rating</div>
//                   </div>
//                   <div>
//                     <div className="text-3xl font-bold text-jet-stream-400">₹25k</div>
//                     <div className="text-sm text-jet-stream-200">Team Bonus Pool</div>
//                   </div>
//                   <div>
//                     <div className="text-3xl font-bold text-jet-stream-300">98%</div>
//                     <div className="text-sm text-jet-stream-200">Success Rate</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-jet-stream-900/20 via-transparent to-jet-stream-800/10">
//         <div className="max-w-4xl mx-auto">
//           <div className="text-center mb-16 lg:mb-20">
//             <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">
//               Frequently Asked <span className="bg-gradient-to-r from-jet-stream-300 to-jet-stream-500 bg-clip-text text-transparent">Questions</span>
//             </h2>
//             <p className="text-lg sm:text-xl lg:text-2xl text-jet-stream-200">
//               Everything you need to know about how SkillsAmigo works
//             </p>
//           </div>

//           <Accordion type="single" collapsible className="space-y-4">
//             {faqData.map((faq, index) => (
//               <AccordionItem 
//                 key={index} 
//                 value={`item-${index}`}
//                 className="bg-gradient-to-br from-jet-stream-800/30 to-jet-stream-900/30 border-jet-stream-600 rounded-lg px-6 backdrop-blur-sm hover:border-jet-stream-400 transition-all duration-300"
//               >
//                 <AccordionTrigger className="text-left text-white hover:text-jet-stream-200 text-lg font-semibold py-6">
//                   {faq.question}
//                 </AccordionTrigger>
//                 <AccordionContent className="text-jet-stream-200 pb-6 leading-relaxed">
//                   {faq.answer}
//                 </AccordionContent>
//               </AccordionItem>
//             ))}
//           </Accordion>
//         </div>
//       </section>

//       {/* Final CTA Section */}
//       <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-jet-stream-900 via-jet-stream-800 to-jet-stream-700/20 relative overflow-hidden">
//         <div className="absolute inset-0 opacity-20">
//           <DotGrid 
//             dotSize={6} 
//             gap={25} 
//             baseColor="#719f9a" 
//             activeColor="#9fc1bd" 
//           />
//         </div>
        
//         <div className="max-w-5xl mx-auto text-center relative z-10">
//           <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-8">
//             Ready to Experience the <span className="bg-gradient-to-r from-jet-stream-300 to-jet-stream-500 bg-clip-text text-transparent">Future</span>?
//           </h2>
//           <p className="text-lg sm:text-xl lg:text-2xl text-jet-stream-200 mb-12 max-w-3xl mx-auto leading-relaxed">
//             Join thousands of satisfied users who have transformed their businesses and solved their problems with SkillsAmigo's revolutionary platform
//           </p>
          
//           <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16">
//             <Button size="lg" className="bg-gradient-to-r from-jet-stream-500 to-jet-stream-600 hover:from-jet-stream-400 hover:to-jet-stream-500 text-white font-bold px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl shadow-2xl hover:scale-110 transition-all duration-300">
//               Start Your Journey
//               <ArrowRight className="ml-3 w-5 h-5 sm:w-6 sm:h-6" />
//             </Button>
//             <Button size="lg" variant="outline" className="border-2 border-jet-stream-400 text-jet-stream-300 hover:bg-jet-stream-400 hover:text-white px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl backdrop-blur-sm bg-white/10 hover:scale-110 transition-all duration-300">
//               <PlayCircle className="mr-3 w-5 h-5 sm:w-6 sm:h-6" />
//               Watch Success Stories
//             </Button>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
//             <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:scale-105 transition-all duration-300">
//               <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-jet-stream-400 mb-3">50,000+</div>
//               <p className="text-jet-stream-200 text-base sm:text-lg lg:text-xl">Active Users</p>
//             </div>
//             <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:scale-105 transition-all duration-300">
//               <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-jet-stream-500 mb-3">₹10Cr+</div>
//               <p className="text-jet-stream-200 text-base sm:text-lg lg:text-xl">Transactions Completed</p>
//             </div>
//             <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:scale-105 transition-all duration-300 sm:col-span-2 lg:col-span-1">
//               <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-jet-stream-400 mb-3">4.8/5</div>
//               <p className="text-jet-stream-200 text-base sm:text-lg lg:text-xl">Average Rating</p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }


"use client"

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '../_components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../_components/ui/card';
import { Badge } from '../_components/ui/badge';
import { Progress } from '../_components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../_components/ui/accordion';
import { 
  Search, 
  CreditCard, 
  Star, 
  Users, 
  Shield, 
  MessageSquare, 
  PlayCircle, 
  CheckCircle, 
  ArrowRight, 
  Coins, 
  Award, 
  Camera, 
  Wrench, 
  Heart, 
  Bot, 
  AlertTriangle,
  Zap,
  TrendingUp,
  UserCheck,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  Hexagon,
  Triangle,
  Square,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

// Enhanced 3D Floating Background Elements
const Floating3DElements = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll('.floating-3d-element');
    
    elements.forEach((el, index) => {
      // Set initial 3D transforms
      const animation = el.animate([
        {
          transform: `translate3d(${Math.random() * window.innerWidth}px, ${Math.random() * window.innerHeight}px, ${Math.random() * 200 - 100}px) 
                     rotateX(${Math.random() * 360}deg) rotateY(${Math.random() * 360}deg) rotateZ(${Math.random() * 360}deg) 
                     scale(${0.3 + Math.random() * 0.7})`,
          opacity: 0.1 + Math.random() * 0.3
        },
        {
          transform: `translate3d(${Math.random() * window.innerWidth}px, ${Math.random() * window.innerHeight}px, ${Math.random() * 200 - 100}px) 
                     rotateX(${Math.random() * 360}deg) rotateY(${Math.random() * 360}deg) rotateZ(${Math.random() * 360}deg) 
                     scale(${0.3 + Math.random() * 0.7})`,
          opacity: 0.1 + Math.random() * 0.3
        }
      ], {
        duration: (20 + Math.random() * 15) * 1000,
        iterations: Infinity,
        direction: 'alternate',
        delay: index * 200
      });
    });
  }, []);

  const shapes = [Hexagon, Triangle, Square, Sparkles, Star, Zap];

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0" style={{ perspective: '1000px' }}>
      {[...Array(20)].map((_, i) => {
        const Shape = shapes[i % shapes.length];
        return (
          <div
            key={i}
            className="floating-3d-element absolute"
            style={{
              color: i % 3 === 0 ? '#9fc1bd' : i % 3 === 1 ? '#719f9a' : '#547d77',
              transformStyle: 'preserve-3d'
            }}
          >
            <Shape size={15 + Math.random() * 30} />
          </div>
        );
      })}
    </div>
  );
};

// Enhanced Interactive Dot Grid with parallax scrolling
const Interactive3DDotGrid = ({ className = "", dotSize = 8, gap = 20 }) => {
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create 3D dots grid
    const cols = Math.floor(canvas.width / (dotSize + gap));
    const rows = Math.floor(canvas.height / (dotSize + gap));
    
    const dots = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        dots.push({
          x: x * (dotSize + gap) + dotSize / 2,
          y: y * (dotSize + gap) + dotSize / 2,
          originalX: x * (dotSize + gap) + dotSize / 2,
          originalY: y * (dotSize + gap) + dotSize / 2,
          z: 0,
          originalZ: 0,
          size: dotSize / 2,
          opacity: 0.3,
          color: '#9fc1bd'
        });
      }
    }
    dotsRef.current = dots;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      dots.forEach((dot, index) => {
        const distance = Math.sqrt(
          Math.pow(dot.originalX - mouseRef.current.x, 2) + 
          Math.pow(dot.originalY - mouseRef.current.y, 2)
        );
        
        const maxDistance = 120;
        const influence = Math.max(0, 1 - (distance / maxDistance));
        
        // 3D wave effect with parallax
        const wave = Math.sin((Date.now() * 0.001) + (index * 0.1)) * 20;
        const scrollOffset = window.pageYOffset * 0.1;
        
        // Smooth transitions with parallax
        dot.x += (dot.originalX - dot.x + (influence * 20 * Math.cos(Date.now() * 0.003))) * 0.1;
        dot.y += (dot.originalY - dot.y + (influence * 20 * Math.sin(Date.now() * 0.003)) + scrollOffset) * 0.1;
        dot.z += (wave * influence - dot.z) * 0.1;
        
        // Calculate 3D projection
        const scale = 1 + (dot.z * 0.01);
        const projectedSize = dot.size * scale;
        const alpha = dot.opacity + (influence * 0.7);
        
        // Jet-stream color palette
        const r = Math.round(159 + (influence * 68)); 
        const g = Math.round(193 + (influence * 44));
        const b = Math.round(189 + (influence * 47));
        
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, projectedSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow effect for influenced dots
        if (influence > 0.3) {
          ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.5)`;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, projectedSize * 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    animate();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dotSize, gap]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`w-full h-full ${className}`}
      style={{ background: 'transparent' }}
    />
  );
};

// Scroll-triggered morphing shapes animation
const MorphingShape = ({ children, className = '' }) => {
  const shapeRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.transform = 'scale(1) rotate(0deg)';
            entry.target.style.opacity = '1';
          } else {
            entry.target.style.transform = 'scale(0.8) rotate(-10deg)';
            entry.target.style.opacity = '0.7';
          }
        });
      },
      { threshold: 0.3, rootMargin: '-50px' }
    );

    if (shapeRef.current) {
      observer.observe(shapeRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={shapeRef}
      className={`transition-all duration-1000 ease-out transform ${className}`}
    >
      {children}
    </div>
  );
};

// Enhanced Feature Card with morphing background
const EnhancedFeatureCard = ({ icon, title, description, delay = 0 }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.transform = 'translateY(0) scale(1)';
              entry.target.style.opacity = '1';
            }, delay);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="transform translate-y-20 opacity-0 transition-all duration-1000 ease-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className={`h-full bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 hover:border-slate-300 transition-all duration-500 hover:shadow-2xl group cursor-pointer overflow-hidden relative ${isHovered ? 'scale-105' : ''}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100/50 to-slate-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardContent className="p-6 relative z-10">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-slate-700 shadow-lg transition-all duration-500 ${isHovered ? 'rotate-12 scale-110' : ''}`}>
            {icon}
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2 text-center">{title}</h3>
          <p className="text-slate-700 text-sm leading-relaxed text-center">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
};

// Enhanced Step Card with staggered animations
const EnhancedStepCard = ({ number, title, description, icon, side, delay = 0, theme = 'light' }) => {
  const cardRef = useRef(null);
  const iconRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const isLight = theme === 'light';
  const bgClass = isLight 
    ? 'bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 hover:border-slate-300' 
    : 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-600 hover:border-slate-500';
  
  const textClass = isLight ? 'text-slate-900' : 'text-slate-100';
  const descClass = isLight ? 'text-slate-700' : 'text-slate-200';

  return (
    <div className={`flex flex-col lg:flex-row items-center gap-8 ${side === 'right' ? 'lg:flex-row-reverse' : ''}`}>
      <div className="flex-1 w-full">
        <Card 
          ref={cardRef}
          className={`${bgClass} transition-all duration-700 hover:shadow-xl transform ${isVisible ? 'translate-x-0 opacity-100' : side === 'left' ? '-translate-x-20 opacity-0' : 'translate-x-20 opacity-0'} group`}
        >
          <CardContent className="p-6 lg:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center text-white font-bold text-lg lg:text-xl shrink-0 shadow-lg group-hover:shadow-slate-400/50 transition-all duration-500">
                {number}
              </div>
              <div className="flex-1">
                <h3 className={`text-xl lg:text-2xl font-bold ${textClass} mb-3 group-hover:text-slate-600 transition-colors duration-300`}>
                  {title}
                </h3>
                <p className={`${descClass} leading-relaxed lg:text-lg`}>
                  {description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div 
        ref={iconRef} 
        className={`relative transition-all duration-1000 ${isVisible ? 'scale-100 rotate-0 opacity-100' : 'scale-0 rotate-180 opacity-0'}`}
        style={{ transitionDelay: `${delay + 300}ms` }}
      >
        <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 animate-pulse">
          {icon}
        </div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-60" />
      </div>
    </div>
  );
};

// Enhanced Navigation with scroll effects
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-slate-50/95 backdrop-blur-xl border-b border-slate-200/50 shadow-lg' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-600 to-slate-500 bg-clip-text text-transparent">
              SkillsAmigo
            </h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-slate-700 hover:text-slate-500 transition-colors duration-300 font-medium">Features</a>
            <a href="#" className="text-slate-700 hover:text-slate-500 transition-colors duration-300 font-medium">How it Works</a>
            <a href="#" className="text-slate-700 hover:text-slate-500 transition-colors duration-300 font-medium">Pricing</a>
            <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100">
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white">
              Get Started
            </Button>
          </div>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-slate-50/95 backdrop-blur-xl border-t border-slate-200/50">
          <div className="px-4 py-4 space-y-4">
            <a href="#" className="block text-slate-700 hover:text-slate-500 transition-colors duration-300 font-medium">Features</a>
            <a href="#" className="block text-slate-700 hover:text-slate-500 transition-colors duration-300 font-medium">How it Works</a>
            <a href="#" className="block text-slate-700 hover:text-slate-500 transition-colors duration-300 font-medium">Pricing</a>
            <div className="pt-4 space-y-2">
              <Button variant="outline" className="w-full border-slate-300 text-slate-700 hover:bg-slate-100">
                Sign In
              </Button>
              <Button className="w-full bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// Main Component
export default function EnhancedSkillsAmigoPage() {
  const heroRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const faqData = [
    {
      question: "How does the AI matching system work?",
      answer: "Our AI analyzes your requirements, location, budget, and preferences to match you with the most suitable service providers. It considers factors like expertise, ratings, availability, and past performance to ensure the best possible matches."
    },
    {
      question: "What are SkillsAmigo Coins and how do they work?",
      answer: "Coins are our secure payment system that holds funds until service completion. When you book a service, coins are held in escrow and only released to the provider after successful delivery and your approval. This protects both parties and ensures quality service."
    },
    {
      question: "How are disputes handled?",
      answer: "Our dispute resolution system includes automated mediation, expert human reviewers, and a comprehensive evidence review process. Most disputes are resolved within 48 hours, with full refunds or re-work guaranteed for legitimate claims."
    },
    {
      question: "What is the Merit Credits system?",
      answer: "Merit Credits are earned through excellent service delivery, positive reviews, and platform engagement. They unlock benefits like priority placement, reduced fees, exclusive opportunities, and enhanced trust badges that attract more customers."
    },
    {
      question: "How does collaboration work for big projects?",
      answer: "Big projects can involve multiple specialists working together. Our collaboration tools include shared project timelines, team communication channels, milestone tracking, and coordinated payments. Perfect for events, renovations, or complex services."
    },
    {
      question: "Is the platform safe for payments?",
      answer: "Yes, we use bank-grade encryption, secure escrow systems, fraud detection AI, and are compliant with all Indian payment regulations. Your money is protected at every step of the transaction process."
    }
  ];

  if (!mounted) {
    return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 text-slate-900 relative overflow-hidden">
      <Floating3DElements />
      <Navigation />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-40">
          <Interactive3DDotGrid dotSize={6} gap={25} />
        </div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <MorphingShape>
            <h1 className="hero-title text-4xl sm:text-6xl lg:text-8xl font-bold mb-8 leading-tight">
              AI‑guided bookings,{' '}
              <span className="bg-gradient-to-r from-slate-600 to-slate-500 bg-clip-text text-transparent">
                trusted payments
              </span>
              <br className="hidden sm:block" />
              <span className="text-slate-800">effortless collaboration</span>
            </h1>
          </MorphingShape>
          
          <p className="hero-subtitle text-lg sm:text-xl lg:text-2xl text-slate-700 mb-12 max-w-4xl mx-auto leading-relaxed opacity-0 animate-[fadeInUp_1s_ease-out_0.5s_forwards]">
            Experience the future of skill-sharing with our revolutionary platform that connects buyers and sellers through intelligent matching, secure payments, and seamless collaboration tools.
          </p>
          
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center opacity-0 animate-[fadeInUp_1s_ease-out_1s_forwards]">
            <Button size="lg" className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-semibold px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl shadow-xl hover:scale-105 transition-all duration-300">
              Start as Buyer
              <ArrowRight className="ml-3 w-5 h-5 sm:w-6 sm:h-6" />
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-slate-400 text-slate-700 hover:bg-slate-100 hover:text-slate-800 px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl backdrop-blur-sm bg-white/50 hover:scale-105 transition-all duration-300">
              Start as Seller
              <UserCheck className="ml-3 w-5 h-5 sm:w-6 sm:h-6" />
            </Button>
            <Button size="lg" variant="ghost" className="text-slate-600 hover:text-slate-800 px-8 sm:px-10 py-4 sm:py-6 text-lg sm:text-xl backdrop-blur-sm bg-white/30 hover:bg-white/50 transition-all duration-300">
              <PlayCircle className="mr-3 w-5 h-5 sm:w-6 sm:h-6" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-br from-slate-100/50 to-slate-200/30">
        <div className="max-w-7xl mx-auto">
          <MorphingShape>
            <div className="text-center mb-16 lg:mb-20">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-slate-900">
                Four Pillars of <span className="bg-gradient-to-r from-slate-600 to-slate-500 bg-clip-text text-transparent">SkillsAmigo</span>
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-700 max-w-4xl mx-auto leading-relaxed">
                Our platform is built on four core principles that ensure seamless, secure, and successful skill-sharing experiences
              </p>
            </div>
          </MorphingShape>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            <EnhancedFeatureCard
              icon={<Search className="w-8 h-8" />}
              title="Discover"
              description="AI-powered matching connects you with perfect service providers based on your exact needs, location, and budget"
              delay={0}
            />
            <EnhancedFeatureCard
              icon={<Coins className="w-8 h-8" />}
              title="Book & Pay"
              description="Secure escrow system holds payments until service completion, protecting both buyers and sellers"
              delay={200}
            />
            <EnhancedFeatureCard
              icon={<Star className="w-8 h-8" />}
              title="Deliver & Review"
              description="Quality assurance through milestone tracking, reviews, and comprehensive rating system"
              delay={400}
            />
            <EnhancedFeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Collaborate"
              description="Seamless teamwork tools for complex projects requiring multiple specialists working together"
              delay={600}
            />
          </div>
        </div>
      </section>

      {/* Buyer Journey Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white/60 to-slate-100/40">
        <div className="max-w-6xl mx-auto">
          <MorphingShape>
            <div className="text-center mb-16 lg:mb-20">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-slate-900">
                Buyer Journey: <span className="bg-gradient-to-r from-slate-600 to-slate-500 bg-clip-text text-transparent">From Problem to Solution</span>
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-700 max-w-4xl mx-auto leading-relaxed">
                Follow Sarah's journey as she deals with a plumbing emergency and discovers how SkillsAmigo makes finding help effortless
              </p>
            </div>
          </MorphingShape>

          <div className="space-y-16 sm:space-y-20 lg:space-y-24">
            <EnhancedStepCard
              number="4"
              title="Live Tracking & Updates"
              description="Sarah tracks Rajesh's location in real-time via GPS integration and receives proactive updates throughout the service via in-app messaging and notifications."
              icon={<MapPin className="w-6 h-6 lg:w-8 lg:h-8" />}
              side="right"
              delay={600}
              theme="light"
            />
            
            <EnhancedStepCard
              number="5"
              title="Quality Completion & Review"
              description="Service completed successfully with photo verification. Payment automatically released after Sarah confirms satisfaction. Both parties leave detailed reviews with photo evidence."
              icon={<CheckCircle className="w-6 h-6 lg:w-8 lg:h-8" />}
              side="left"
              delay={800}
              theme="light"
            />
          </div>
        </div>
      </section>

      {/* Seller Journey Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-800 to-slate-900 text-slate-100">
        <div className="max-w-6xl mx-auto">
          <MorphingShape>
            <div className="text-center mb-16 lg:mb-20">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-slate-100">
                Seller Journey: <span className="bg-gradient-to-r from-slate-300 to-slate-200 bg-clip-text text-transparent">Building Your Business</span>
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-200 max-w-3xl mx-auto leading-relaxed">
                Meet Priya, a freelance photographer who transformed her passion into a thriving business using SkillsAmigo
              </p>
            </div>
          </MorphingShape>

          <div className="space-y-16 sm:space-y-20 lg:space-y-24">
            <EnhancedStepCard
              number="1"
              title="Profile Creation & Verification"
              description="Priya creates her photography profile, uploads portfolio, gets verified through document and skill assessment with our comprehensive verification system."
              icon={<Camera className="w-6 h-6 lg:w-8 lg:h-8" />}
              side="left"
              delay={0}
              theme="dark"
            />
            
            <EnhancedStepCard
              number="2"
              title="AI-Powered Job Matching"
              description="SkillsAmigo's AI analyzes Priya's skills, availability, and location to suggest relevant photography gigs automatically with high match accuracy."
              icon={<Zap className="w-6 h-6 lg:w-8 lg:h-8" />}
              side="right"
              delay={200}
              theme="dark"
            />
            
            <EnhancedStepCard
              number="3"
              title="Smart Proposal & Negotiation"
              description="AI Assistant helps Priya craft compelling proposals and negotiate terms while maintaining fair pricing for her skill level and market position."
              icon={<MessageSquare className="w-6 h-6 lg:w-8 lg:h-8" />}
              side="left"
              delay={400}
              theme="dark"
            />
            
            <EnhancedStepCard
              number="4"
              title="Secure Project Management"
              description="Project milestones set with payment checkpoints. Client deposits upfront, remainder held in escrow until delivery with automated release conditions."
              icon={<Shield className="w-6 h-6 lg:w-8 lg:h-8" />}
              side="right"
              delay={600}
              theme="dark"
            />
            
            <EnhancedStepCard
              number="5"
              title="Merit Credits & Growth"
              description="Excellent service earns Merit Credits, unlocking priority placement, lower fees, and exclusive high-value opportunities in our gamified ecosystem."
              icon={<TrendingUp className="w-6 h-6 lg:w-8 lg:h-8" />}
              side="left"
              delay={800}
              theme="dark"
            />
          </div>
        </div>
      </section>

      {/* Payment Flow Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-100/80 to-white/60">
        <div className="max-w-6xl mx-auto">
          <MorphingShape>
            <div className="text-center mb-16 lg:mb-20">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-slate-900">
                <span className="bg-gradient-to-r from-slate-600 to-slate-500 bg-clip-text text-transparent">Secure Payment Flow</span>
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
                SkillsAmigo Coins ensure secure, transparent payments that protect both buyers and sellers at every step
              </p>
            </div>
          </MorphingShape>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 lg:mb-16">
            <MorphingShape>
              <Card className="bg-gradient-to-br from-white/80 to-slate-50/60 border-slate-200 hover:border-slate-300 transition-all duration-500 hover:scale-105 backdrop-blur-sm h-full">
                <CardContent className="p-6 sm:p-8 text-center">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center shadow-lg shadow-slate-300/40">
                    <CreditCard className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold mb-3 text-slate-900">Load Coins</h3>
                  <p className="text-slate-700 leading-relaxed">Secure payment methods convert money into SkillsAmigo Coins at 1:1 ratio with instant processing</p>
                </CardContent>
              </Card>
            </MorphingShape>

            <MorphingShape>
              <Card className="bg-gradient-to-br from-white/80 to-slate-50/60 border-slate-200 hover:border-slate-300 transition-all duration-500 hover:scale-105 backdrop-blur-sm h-full">
                <CardContent className="p-6 sm:p-8 text-center">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center shadow-lg shadow-slate-300/40">
                    <Shield className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold mb-3 text-slate-900">Escrow Protection</h3>
                  <p className="text-slate-700 leading-relaxed">Coins held securely until service milestones are met and approved by both parties</p>
                </CardContent>
              </Card>
            </MorphingShape>

            <MorphingShape>
              <Card className="bg-gradient-to-br from-white/80 to-slate-50/60 border-slate-200 hover:border-slate-300 transition-all duration-500 hover:scale-105 backdrop-blur-sm h-full">
                <CardContent className="p-6 sm:p-8 text-center">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center shadow-lg shadow-slate-300/40">
                    <CheckCircle className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold mb-3 text-slate-900">Auto Release</h3>
                  <p className="text-slate-700 leading-relaxed">Coins released to seller upon successful completion and buyer approval automatically</p>
                </CardContent>
              </Card>
            </MorphingShape>
          </div>

          <MorphingShape>
            <div className="bg-gradient-to-br from-white/60 to-slate-100/40 rounded-2xl p-6 sm:p-8 lg:p-12 border border-slate-200 backdrop-blur-sm">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 text-center text-slate-900">Payment Security Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                <div className="text-center">
                  <Shield className="w-10 h-10 lg:w-12 lg:h-12 mx-auto mb-4 text-slate-500" />
                  <h4 className="font-bold mb-2 text-slate-900 text-lg">Bank-Grade Encryption</h4>
                  <p className="text-sm sm:text-base text-slate-700">256-bit SSL encryption protects all transactions</p>
                </div>
                <div className="text-center">
                  <AlertTriangle className="w-10 h-10 lg:w-12 lg:h-12 mx-auto mb-4 text-slate-500" />
                  <h4 className="font-bold mb-2 text-slate-900 text-lg">Fraud Detection</h4>
                  <p className="text-sm sm:text-base text-slate-700">AI monitors suspicious activities 24/7</p>
                </div>
                <div className="text-center">
                  <Clock className="w-10 h-10 lg:w-12 lg:h-12 mx-auto mb-4 text-slate-500" />
                  <h4 className="font-bold mb-2 text-slate-900 text-lg">Instant Refunds</h4>
                  <p className="text-sm sm:text-base text-slate-700">Automated refunds for cancelled services</p>
                </div>
                <div className="text-center">
                  <Award className="w-10 h-10 lg:w-12 lg:h-12 mx-auto mb-4 text-slate-500" />
                  <h4 className="font-bold mb-2 text-slate-900 text-lg">RBI Compliant</h4>
                  <p className="text-sm sm:text-base text-slate-700">Fully compliant with Indian regulations</p>
                </div>
              </div>
            </div>
          </MorphingShape>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-200/40 to-slate-100/60">
        <div className="max-w-6xl mx-auto">
          <MorphingShape>
            <div className="text-center mb-16 lg:mb-20">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-slate-900">
                <span className="bg-gradient-to-r from-slate-600 to-slate-500 bg-clip-text text-transparent">Team Collaboration</span> on Big Projects
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
                See how multiple specialists seamlessly work together on complex projects like weddings, events, and renovations
              </p>
            </div>
          </MorphingShape>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <MorphingShape>
              <Card className="bg-gradient-to-br from-white/70 to-slate-100/50 border-slate-200 hover:border-slate-300 transition-all duration-500 backdrop-blur-sm h-full">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center shrink-0 shadow-lg shadow-slate-300/40">
                      <Heart className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-slate-900">Wedding Dream Team</h3>
                      <p className="text-slate-700 mb-6 leading-relaxed">
                        Anita's dream wedding required coordination between photographer, caterer, decorator, mehendi artist, and DJ. 
                        SkillsAmigo's collaboration tools made it seamless.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong className="text-slate-900 block mb-2">Team Members:</strong>
                          <ul className="text-slate-700 space-y-1">
                            <li>• Priya (Photographer)</li>
                            <li>• Ravi (Caterer)</li>
                            <li>• Sunita (Decorator)</li>
                            <li>• Maya (Mehendi Artist)</li>
                            <li>• DJ Rohit (Music)</li>
                          </ul>
                        </div>
                        <div>
                          <strong className="text-slate-900 block mb-2">Results:</strong>
                          <ul className="text-slate-700 space-y-1">
                            <li>• 100% on-time delivery</li>
                            <li>• 5-star average rating</li>
                            <li>• ₹2.5L project completed flawlessly</li>
                            <li>• Zero coordination issues</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </MorphingShape>

            <MorphingShape>
              <div className="space-y-6">
                <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-6">Collaboration Tools</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-white/60 to-slate-100/40 rounded-lg border border-slate-200 backdrop-blur-sm">
                    <Calendar className="w-8 h-8 text-slate-500 shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-900">Shared Timeline</h4>
                      <p className="text-slate-700 text-sm">Project timeline with dependencies and milestones</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-white/60 to-slate-100/40 rounded-lg border border-slate-200 backdrop-blur-sm">
                    <MessageSquare className="w-8 h-8 text-slate-500 shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-900">Team Chat</h4>
                      <p className="text-slate-700 text-sm">Real-time communication channels for coordination</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-white/60 to-slate-100/40 rounded-lg border border-slate-200 backdrop-blur-sm">
                    <Coins className="w-8 h-8 text-slate-500 shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-900">Split Payments</h4>
                      <p className="text-slate-700 text-sm">Milestone-based payment distribution to team members</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-white/60 to-slate-100/40 rounded-lg border border-slate-200 backdrop-blur-sm">
                    <CheckCircle className="w-8 h-8 text-slate-500 shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-900">Progress Tracking</h4>
                      <p className="text-slate-700 text-sm">Real-time updates on individual and team progress</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-slate-300/20 to-slate-400/20 rounded-lg p-6 border border-slate-300 backdrop-blur-sm">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-3xl font-bold text-slate-600">4.9</div>
                      <div className="text-sm text-slate-700">Avg Team Rating</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-slate-600">₹25k</div>
                      <div className="text-sm text-slate-700">Team Bonus Pool</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-slate-600">98%</div>
                      <div className="text-sm text-slate-700">Success Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </MorphingShape>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white/80 to-slate-100/60">
        <div className="max-w-4xl mx-auto">
          <MorphingShape>
            <div className="text-center mb-16 lg:mb-20">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-slate-900">
                Frequently Asked <span className="bg-gradient-to-r from-slate-600 to-slate-500 bg-clip-text text-transparent">Questions</span>
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-700">
                Everything you need to know about how SkillsAmigo works
              </p>
            </div>
          </MorphingShape>

          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((faq, index) => (
              <MorphingShape key={index}>
                <AccordionItem 
                  value={`item-${index}`}
                  className="bg-gradient-to-br from-white/70 to-slate-50/50 border-slate-200 rounded-lg px-6 backdrop-blur-sm hover:border-slate-300 transition-all duration-300"
                >
                  <AccordionTrigger className="text-left text-slate-900 hover:text-slate-700 text-lg font-semibold py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-700 pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </MorphingShape>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-200/60 to-slate-300/40 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Interactive3DDotGrid dotSize={8} gap={30} />
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <MorphingShape>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-8 text-slate-900">
              Ready to Experience the <span className="bg-gradient-to-r from-slate-600 to-slate-500 bg-clip-text text-transparent">Future</span>?
            </h2>
          </MorphingShape>
          
          <MorphingShape>
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-700 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied users who have transformed their businesses and solved their problems with SkillsAmigo's revolutionary platform
            </p>
          </MorphingShape>
          
          <MorphingShape>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16">
              <Button size="lg" className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-bold px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl shadow-2xl hover:scale-110 transition-all duration-300">
                Start Your Journey
                <ArrowRight className="ml-3 w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-slate-500 text-slate-700 hover:bg-slate-100 hover:text-slate-800 px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl backdrop-blur-sm bg-white/50 hover:scale-110 transition-all duration-300">
                <PlayCircle className="mr-3 w-5 h-5 sm:w-6 sm:h-6" />
                Watch Success Stories
              </Button>
            </div>
          </MorphingShape>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            <MorphingShape>
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/60 to-slate-100/40 backdrop-blur-sm border border-slate-200 hover:scale-105 transition-all duration-300">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-600 mb-3">50,000+</div>
                <p className="text-slate-700 text-base sm:text-lg lg:text-xl">Active Users</p>
              </div>
            </MorphingShape>
            
            <MorphingShape>
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/60 to-slate-100/40 backdrop-blur-sm border border-slate-200 hover:scale-105 transition-all duration-300">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-600 mb-3">₹10Cr+</div>
                <p className="text-slate-700 text-base sm:text-lg lg:text-xl">Transactions Completed</p>
              </div>
            </MorphingShape>
            
            <MorphingShape>
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/60 to-slate-100/40 backdrop-blur-sm border border-slate-200 hover:scale-105 transition-all duration-300 sm:col-span-2 lg:col-span-1">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-600 mb-3">4.8/5</div>
                <p className="text-slate-700 text-base sm:text-lg lg:text-xl">Average Rating</p>
              </div>
            </MorphingShape>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-800 to-slate-900 text-slate-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <MorphingShape>
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">SkillsAmigo</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Revolutionizing skill-sharing with AI-powered matching, secure payments, and seamless collaboration tools.
                </p>
                <div className="flex space-x-4">
                  <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                    LinkedIn
                  </Button>
                  <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                    Twitter
                  </Button>
                </div>
              </div>
            </MorphingShape>
            
            <MorphingShape>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Platform</h4>
                <ul className="space-y-3 text-slate-300">
                  <li><a href="#" className="hover:text-slate-100 transition-colors duration-300">How it Works</a></li>
                  <li><a href="#" className="hover:text-slate-100 transition-colors duration-300">Features</a></li>
                  <li><a href="#" className="hover:text-slate-100 transition-colors duration-300">Pricing</a></li>
                  <li><a href="#" className="hover:text-slate-100 transition-colors duration-300">Success Stories</a></li>
                </ul>
              </div>
            </MorphingShape>
            
            <MorphingShape>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
                <ul className="space-y-3 text-slate-300">
                  <li><a href="#" className="hover:text-slate-100 transition-colors duration-300">Help Center</a></li>
                  <li><a href="#" className="hover:text-slate-100 transition-colors duration-300">Contact Us</a></li>
                  <li><a href="#" className="hover:text-slate-100 transition-colors duration-300">Safety</a></li>
                  <li><a href="#" className="hover:text-slate-100 transition-colors duration-300">Community Guidelines</a></li>
                </ul>
              </div>
            </MorphingShape>
            
            <MorphingShape>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
                <ul className="space-y-3 text-slate-300">
                  <li><a href="#" className="hover:text-slate-100 transition-colors duration-300">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-slate-100 transition-colors duration-300">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-slate-100 transition-colors duration-300">Cookie Policy</a></li>
                  <li><a href="#" className="hover:text-slate-100 transition-colors duration-300">Compliance</a></li>
                </ul>
              </div>
            </MorphingShape>
          </div>
          
          <MorphingShape>
            <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-400 text-sm mb-4 md:mb-0">
                © 2024 SkillsAmigo. All rights reserved.
              </p>
              <div className="flex items-center space-x-6">
                <Badge variant="outline" className="border-slate-600 text-slate-300">
                  RBI Compliant
                </Badge>
                <Badge variant="outline" className="border-slate-600 text-slate-300">
                  ISO 27001
                </Badge>
                <Badge variant="outline" className="border-slate-600 text-slate-300">
                  GDPR Ready
                </Badge>
              </div>
            </div>
          </MorphingShape>
        </div>
      </footer>
    </div>
  );
}

