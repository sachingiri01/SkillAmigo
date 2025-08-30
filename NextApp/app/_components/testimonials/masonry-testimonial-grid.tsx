// "use client";

// import { Star } from "lucide-react";
// import { motion } from "motion/react";
// import { useEffect, useRef } from "react";

// import { cn } from "@/app/lib/utils";

// import { Avatar, AvatarImage } from "../ui/avatar";
// import { Card } from "../ui/card";
// import React from "react";

// interface DataItem {
//   name: string;
//   avatar: string;
//   content: string;
//   skill: string;
//   location: string;
// }

// const DATA: DataItem[] = [
//   {
//     name: "Priya Sharma",
//     avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Priya%20Sharma",
//     content: "Found amazing cooking classes in Bangalore! The home chef I connected with taught me authentic South Indian recipes. Perfect platform for learning local cuisine.",
//     skill: "Cooking Student",
//     location: "Bangalore",
//   },
//   {
//     name: "Rahul Gupta",
//     avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Rahul%20Gupta",
//     content: "Got freelance graphic design gigs in Mumbai through SkillAmigo. The AI matching system connected me with clients who needed exactly my expertise. Game changer!",
//     skill: "Graphic Designer",
//     location: "Mumbai",
//   },
//   {
//     name: "Anita Reddy",
//     avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Anita%20Reddy",
//     content: "Teaching yoga classes in Hyderabad has never been easier. The platform helped me find students in my neighborhood who were genuinely interested in learning.",
//     skill: "Yoga Instructor",
//     location: "Hyderabad",
//   },
//   {
//     name: "Vikram Singh",
//     avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Vikram%20Singh",
//     content: "As a freelance web developer in Delhi, I've found consistent projects through SkillAmigo. The local focus means I can meet clients face-to-face when needed.",
//     skill: "Web Developer",
//     location: "Delhi",
//   },
//   {
//     name: "Meera Krishnan",
//     avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Meera%20Krishnan",
//     content: "Learning classical dance in Chennai was my dream. SkillAmigo connected me with an experienced Bharatanatyam teacher just 2km from my home. Incredible!",
//     skill: "Dance Student",
//     location: "Chennai",
//   },
//   {
//     name: "Arjun Patel",
//     avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Arjun%20Patel",
//     content: "Offering photography services in Pune became so much easier. The credit system and reviews helped me build trust with local clients quickly.",
//     skill: "Photographer",
//     location: "Pune",
//   },
//   {
//     name: "Kavya Nair",
//     avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Kavya%20Nair",
//     content: "Found the perfect tutor for my daughter's math lessons in Kochi. The platform's safety features and verification system gave me complete peace of mind.",
//     skill: "Parent",
//     location: "Kochi",
//   },
//   {
//     name: "Rohit Sharma",
//     avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Rohit%20Sharma",
//     content: "Teaching guitar in Jaipur through SkillAmigo has been amazing. The local community is so supportive, and I love sharing music with fellow Rajasthanis.",
//     skill: "Music Teacher",
//     location: "Jaipur",
//   },
//   {
//     name: "Deepika Iyer",
//     avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Deepika%20Iyer",
//     content: "As a content writer in Kolkata, I've discovered amazing opportunities through this platform. The AI recommendations match my writing style perfectly with client needs.",
//     skill: "Content Writer",
//     location: "Kolkata",
//   },
// ];

// const TestimonialCard = ({ testimonial, index }: { testimonial: DataItem; index: number }) => {
//   const cardRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("animate-fade-in-up");
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     if (cardRef.current) {
//       observer.observe(cardRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <motion.div
//       ref={cardRef}
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: index * 0.1 }}
//       whileHover={{ y: -8, scale: 1.02 }}
//       className="group"
//     >
//       <Card className="bg-jet-stream-900 border-2 border-jet-stream-700 hover:border-jet-stream-400/50 relative overflow-hidden p-6 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-jet-stream-400/20">
//         {/* Modern geometric accent */}
//         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-jet-stream-400 via-jet-stream-500 to-jet-stream-600" />
        
//         {/* Subtle pattern overlay */}
//         <div className="absolute inset-0 pattern-diagonal opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
//         <div className="relative z-10">
//           <div className="mb-4 flex gap-1">
//             {[...Array(5)].map((_, i) => (
//               <Star key={i} className="h-4 w-4 fill-jet-stream-400 text-jet-stream-400" />
//             ))}
//           </div>

//           <div className="text-jet-stream-200 mb-6 text-sm leading-relaxed font-body">
//             <q className="italic">{testimonial.content}</q>
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <Avatar className="ring-jet-stream-400/30 size-12 ring-2 transition-all duration-300 group-hover:ring-jet-stream-400/60 group-hover:scale-110">
//                 <AvatarImage
//                   src={testimonial.avatar}
//                   alt={testimonial.name}
//                 />
//               </Avatar>
//               <div className="text-sm">
//                 <p className="font-semibold font-display text-jet-stream-100">{testimonial.name}</p>
//                 <p className="text-jet-stream-400 text-xs font-body">{testimonial.skill}</p>
//               </div>
//             </div>
//             <div className="text-jet-stream-400 text-xs font-medium font-display px-3 py-1 bg-jet-stream-400/10 border border-jet-stream-400/30">
//               {testimonial.location}
//             </div>
//           </div>
//         </div>
//       </Card>
//     </motion.div>
//   );
// };

// const MasonryTestimonialGrid = () => {
//   return (
//     <section className="bg-jet-stream-975 py-32 relative overflow-hidden">
//       {/* Background Video */}
//       <video
//         className="absolute inset-0 h-full w-full object-cover opacity-60"
//         autoPlay
//         muted
//         loop
//         playsInline
//       >
//         <source src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4f0325f-5958-42aa-a841-f191ceb5b1cc/generated_videos/indian-cooking-class-in-modern-kitchen-w-4a5df039-20250816125057.mp4?" type="video/mp4" />
//       </video>
      
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-jet-stream-975/90" />
      
//       {/* Pattern */}
//       <div className="absolute inset-0 pattern-cross-dots opacity-60" />
      
//       <div className="container mx-auto relative z-10">
//         {/* Title */}
//         <div className="flex flex-col items-center gap-6 px-4 sm:px-8">
//           <motion.h2 
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="font-display mb-2 text-center text-3xl font-bold text-jet-stream-100 lg:text-5xl"
//           >
//             Trusted by skill-sharers{" "}
//             <span className="gradient-text">
//               across India
//             </span>
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="text-jet-stream-400 text-center text-lg max-w-2xl font-body"
//           >
//             Join thousands of Indians who are learning, teaching, and earning through our hyperlocal skill-sharing platform
//           </motion.p>
//         </div>

//         <div className="mt-16 px-4 sm:px-8">
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {DATA.map((testimonial, idx) => (
//               <TestimonialCard
//                 key={idx}
//                 testimonial={testimonial}
//                 index={idx}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export { MasonryTestimonialGrid };


"use client";

import { Star } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";

import { cn } from "../../lib/utils";

import { Avatar, AvatarImage } from "../ui/avatar";
import { Card } from "../ui/card";
import React from "react";

interface DataItem {
  name: string;
  avatar: string;
  content: string;
  skill: string;
  location: string;
}

const DATA: DataItem[] = [
  {
    name: "Priya Sharma",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Priya%20Sharma",
    content: "Found amazing cooking classes in Bangalore! The home chef I connected with taught me authentic South Indian recipes. Perfect platform for learning local cuisine.",
    skill: "Cooking Student",
    location: "Bangalore",
  },
  {
    name: "Rahul Gupta",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Rahul%20Gupta",
    content: "Got freelance graphic design gigs in Mumbai through SkillAmigo. The AI matching system connected me with clients who needed exactly my expertise. Game changer!",
    skill: "Graphic Designer",
    location: "Mumbai",
  },
  {
    name: "Anita Reddy",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Anita%20Reddy",
    content: "Teaching yoga classes in Hyderabad has never been easier. The platform helped me find students in my neighborhood who were genuinely interested in learning.",
    skill: "Yoga Instructor",
    location: "Hyderabad",
  },
  {
    name: "Vikram Singh",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Vikram%20Singh",
    content: "As a freelance web developer in Delhi, I've found consistent projects through SkillAmigo. The local focus means I can meet clients face-to-face when needed.",
    skill: "Web Developer",
    location: "Delhi",
  },
  {
    name: "Meera Krishnan",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Meera%20Krishnan",
    content: "Learning classical dance in Chennai was my dream. SkillAmigo connected me with an experienced Bharatanatyam teacher just 2km from my home. Incredible!",
    skill: "Dance Student",
    location: "Chennai",
  },
  {
    name: "Arjun Patel",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Arjun%20Patel",
    content: "Offering photography services in Pune became so much easier. The credit system and reviews helped me build trust with local clients quickly.",
    skill: "Photographer",
    location: "Pune",
  },
  {
    name: "Kavya Nair",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Kavya%20Nair",
    content: "Found the perfect tutor for my daughter's math lessons in Kochi. The platform's safety features and verification system gave me complete peace of mind.",
    skill: "Parent",
    location: "Kochi",
  },
  {
    name: "Rohit Sharma",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Rohit%20Sharma",
    content: "Teaching guitar in Jaipur through SkillAmigo has been amazing. The local community is so supportive, and I love sharing music with fellow Rajasthanis.",
    skill: "Music Teacher",
    location: "Jaipur",
  },
  {
    name: "Deepika Iyer",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Deepika%20Iyer",
    content: "As a content writer in Kolkata, I've discovered amazing opportunities through this platform. The AI recommendations match my writing style perfectly with client needs.",
    skill: "Content Writer",
    location: "Kolkata",
  },
];

// const TestimonialCard = ({ testimonial, index }: { testimonial: DataItem; index: number }) => {
//   const cardRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("animate-fade-in-up");
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     if (cardRef.current) {
//       observer.observe(cardRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <motion.div
//       ref={cardRef}
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: index * 0.1 }}
//       whileHover={{ y: -4, scale: 1.02 }}
//       className="group"
//     >
//       <Card className="bg-jet-stream-900 border-2 border-jet-stream-700 hover:border-jet-stream-400/50 relative overflow-hidden p-4 sm:p-6 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-jet-stream-400/20 rounded-lg">
//         {/* Modern geometric accent */}
//         <div className="absolute top-0 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-jet-stream-400 via-jet-stream-500 to-jet-stream-600" />
        
//         {/* Unique hexagon pattern overlay */}
//         <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
//           style={{
//             backgroundImage: `
//               radial-gradient(circle at 50% 50%, transparent 2px, jet-stream-400 2px, jet-stream-400 4px, transparent 4px),
//               radial-gradient(circle at 25% 25%, transparent 1px, jet-stream-500 1px, jet-stream-500 2px, transparent 2px),
//               radial-gradient(circle at 75% 75%, transparent 1px, jet-stream-600 1px, jet-stream-600 2px, transparent 2px)
//             `,
//             backgroundSize: '40px 40px, 20px 20px, 30px 30px',
//             backgroundPosition: '0 0, 10px 10px, 20px 20px'
//           }}
//         />
        
//         <div className="relative z-10">
//           <div className="mb-3 sm:mb-4 flex gap-0.5 sm:gap-1">
//             {[...Array(5)].map((_, i) => (
//               <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-jet-stream-400 text-jet-stream-400" />
//             ))}
//           </div>

//           <div className="text-jet-stream-200 mb-4 sm:mb-6 text-xs sm:text-sm leading-relaxed font-body">
//             <q className="italic">{testimonial.content}</q>
//           </div>

//           <div className="flex items-center justify-between gap-2">
//             <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
//               <Avatar className="ring-jet-stream-400/30 size-8 sm:size-10 md:size-12 ring-1 sm:ring-2 transition-all duration-300 group-hover:ring-jet-stream-400/60 group-hover:scale-110 flex-shrink-0">
//                 <AvatarImage
//                   src={testimonial.avatar}
//                   alt={testimonial.name}
//                 />
//               </Avatar>
//               <div className="text-xs sm:text-sm min-w-0 flex-1">
//                 <p className="font-semibold font-display text-jet-stream-100 truncate">{testimonial.name}</p>
//                 <p className="text-jet-stream-400 text-xs font-body truncate">{testimonial.skill}</p>
//               </div>
//             </div>
//             <div className="text-jet-stream-400 text-xs font-medium font-display px-2 sm:px-3 py-1 bg-jet-stream-400/10 border border-jet-stream-400/30 rounded-sm whitespace-nowrap flex-shrink-0">
//               {testimonial.location}
//             </div>
//           </div>
//         </div>
//       </Card>
//     </motion.div>
//   );
// };



const TestimonialCard = ({ testimonial, index }: { testimonial: DataItem; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
    >
      <Card className="bg-jet-stream-900 border-2 border-jet-stream-700 hover:border-jet-stream-400/50 relative overflow-hidden p-6 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-jet-stream-400/20">
        {/* Modern geometric accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-jet-stream-400 via-jet-stream-500 to-jet-stream-600" />
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 pattern-diagonal opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          <div className="mb-4 flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-jet-stream-400 text-jet-stream-400" />
            ))}
          </div>

          <div className="text-jet-stream-200 mb-6 text-sm leading-relaxed font-body">
            <q className="italic">{testimonial.content}</q>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="ring-jet-stream-400/30 size-12 ring-2 transition-all duration-300 group-hover:ring-jet-stream-400/60 group-hover:scale-110">
                <AvatarImage
                  src={testimonial.avatar}
                  alt={testimonial.name}
                />
              </Avatar>
              <div className="text-sm">
                <p className="font-semibold font-display text-jet-stream-100">{testimonial.name}</p>
                <p className="text-jet-stream-400 text-xs font-body">{testimonial.skill}</p>
              </div>
            </div>
            <div className="text-jet-stream-400 text-xs font-medium font-display px-3 py-1 bg-jet-stream-400/10 border border-jet-stream-400/30">
              {testimonial.location}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const MasonryTestimonialGrid = () => {
  return (
    <section className="bg-jet-stream-975 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 relative overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-60"
        autoPlay
        muted
        loop
        playsInline
        poster=""
      >
        <source src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4f0325f-5958-42aa-a841-f191ceb5b1cc/generated_videos/indian-cooking-class-in-modern-kitchen-w-4a5df039-20250816125057.mp4?" type="video/mp4" />
      </video>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-jet-stream-975/90" />
      
      {/* Unique Neural Network Pattern */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="neuralPattern" patternUnits="userSpaceOnUse" width="120" height="120">
              {/* Neural nodes */}
              <circle cx="20" cy="20" r="2" fill="currentColor" className="text-jet-stream-400" opacity="0.6">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="60" cy="40" r="1.5" fill="currentColor" className="text-jet-stream-500" opacity="0.4">
                <animate attributeName="opacity" values="0.2;0.7;0.2" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="100" cy="20" r="2" fill="currentColor" className="text-jet-stream-600" opacity="0.5">
                <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="40" cy="80" r="1.5" fill="currentColor" className="text-jet-stream-400" opacity="0.3">
                <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="80" cy="100" r="2" fill="currentColor" className="text-jet-stream-500" opacity="0.7">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
              </circle>
              
              {/* Neural connections */}
              <path d="M20,20 Q40,30 60,40" stroke="currentColor" className="text-jet-stream-400" strokeWidth="0.5" fill="none" opacity="0.2">
                <animate attributeName="opacity" values="0.1;0.4;0.1" dur="4s" repeatCount="indefinite" />
              </path>
              <path d="M60,40 Q80,30 100,20" stroke="currentColor" className="text-jet-stream-500" strokeWidth="0.5" fill="none" opacity="0.3">
                <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite" />
              </path>
              <path d="M20,20 Q30,50 40,80" stroke="currentColor" className="text-jet-stream-600" strokeWidth="0.5" fill="none" opacity="0.2">
                <animate attributeName="opacity" values="0.1;0.3;0.1" dur="5s" repeatCount="indefinite" />
              </path>
              <path d="M40,80 Q60,90 80,100" stroke="currentColor" className="text-jet-stream-400" strokeWidth="0.5" fill="none" opacity="0.25">
                <animate attributeName="opacity" values="0.1;0.4;0.1" dur="3.5s" repeatCount="indefinite" />
              </path>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neuralPattern)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        {/* Title */}
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display mb-2 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-jet-stream-100 leading-tight"
          >
            Trusted by skill-sharers{" "}
            <span className="gradient-text block sm:inline">
              across India
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-jet-stream-400 text-center text-sm sm:text-base md:text-lg max-w-full sm:max-w-2xl font-body px-4"
          >
            Join thousands of Indians who are learning, teaching, and earning through our hyperlocal skill-sharing platform
          </motion.p>
        </div>

        <div className="mt-8 sm:mt-12 md:mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {DATA.map((testimonial, idx) => (
              <TestimonialCard
                key={idx}
                testimonial={testimonial}
                index={idx}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { MasonryTestimonialGrid };