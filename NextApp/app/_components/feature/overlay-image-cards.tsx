// "use client";

// import {
//   Brain,
//   Shield,
//   Users,
// } from "lucide-react";
// import React from "react";
// import { motion } from "motion/react";

// import { Card, CardContent } from "../ui/card";

// const skillAmigoFeatures = [
//   {
//     id: 1,
//     icon: Brain,
//     title: "AI Skill Matching",
//     description:
//       "Advanced algorithms connect you with the perfect local skills in seconds, ensuring precise matches.",
//     href: "#",
//     image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4f0325f-5958-42aa-a841-f191ceb5b1cc/generated_images/high-quality-professional-photograph-of--b0f02b1c-20250816124254.jpg?",
//   },
//   {
//     id: 2,
//     icon: Shield,
//     title: "Secure Local Gigs",
//     description:
//       "Protected transactions and verified profiles ensure safe, reliable local connections with trust.",
//     href: "#",
//     image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4f0325f-5958-42aa-a841-f191ceb5b1cc/generated_images/professional-portrait-of-indian-woman-te-53af8113-20250816124313.jpg?",
//   },
//   {
//     id: 3,
//     icon: Users,
//     title: "Community Verified",
//     description:
//       "Real reviews from local community members build trust and quality assurance across the platform.",
//     href: "#",
//     image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4f0325f-5958-42aa-a841-f191ceb5b1cc/generated_images/indian-chef-in-modern-kitchen-teaching-c-6613e175-20250816124339.jpg?",
//   },
// ];

// const OverlayImageCards = () => {
//   return (
//     <section className="bg-jet-stream-50 py-32 relative overflow-hidden">
//       {/* Background Video */}
//       <video
//         className="absolute inset-0 h-full w-full object-cover opacity-30"
//         autoPlay
//         muted
//         loop
//         playsInline
//       >
//         <source src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4f0325f-5958-42aa-a841-f191ceb5b1cc/generated_videos/modern-indian-tech-workspace-with-profes-b426b05b-20250816125132.mp4?" type="video/mp4" />
//       </video>
      
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-jet-stream-50/90" />
      
//       {/* Pattern */}
//       <div className="absolute inset-0 pattern-grid opacity-20" />
      
//       <div className="container mx-auto relative z-10">
//         <div className="relative">
//           <header className="mb-15 max-w-2xl">
//             <h1 className="mb-8 text-5xl font-bold tracking-tighter font-display lg:text-7xl text-jet-stream-950">
//               Connect with Local Skills on{" "}
//               <span className="gradient-text">
//                 SkillAmigo
//               </span>
//             </h1>
//             <p className="text-lg leading-relaxed tracking-tight font-body text-jet-stream-700 md:text-xl">
//               The hyperlocal platform that instantly connects you with verified skilled professionals in your neighborhood—from home repairs to tutoring and everything in between.
//             </p>
//           </header>
//         </div>

//         <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//           {skillAmigoFeatures.map((feature, index) => {
//             const Icon = feature.icon;
//             return (
//               <motion.div
//                 key={feature.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.2 }}
//                 viewport={{ once: true }}
//                 className="block"
//               >
//                 <Card className="group relative border-2 border-jet-stream-300 bg-jet-stream-50 shadow-lg transition-all duration-500 ease-in-out hover:shadow-2xl hover:shadow-jet-stream-400/20 hover:border-jet-stream-400 hover:-translate-y-2">
//                   {/* High-quality image background */}
//                   <div className="absolute inset-0 overflow-hidden">
//                     <img 
//                       src={feature.image} 
//                       alt={feature.title}
//                       className="w-full h-full object-cover opacity-5 group-hover:opacity-10 transition-opacity duration-500"
//                     />
//                   </div>
                  
//                   <CardContent className="relative z-10 flex h-full flex-col justify-between p-8">
//                     <div className="flex size-16 items-center justify-center border-2 border-jet-stream-600 bg-gradient-to-br from-jet-stream-500 to-jet-stream-400 transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-3">
//                       <Icon
//                         size={32}
//                         className="text-jet-stream-50"
//                       />
//                     </div>

//                     <h3 className="mt-6 text-2xl leading-tight font-bold tracking-tight font-display text-jet-stream-950 lg:text-3xl">
//                       {feature.title}
//                     </h3>

//                     <p className="mt-4 text-base leading-relaxed font-body text-jet-stream-700">
//                       {feature.description}
//                     </p>

//                     {/* Modern accent element */}
//                     <div className="absolute top-8 right-8 w-12 h-1 bg-gradient-to-r from-jet-stream-400 to-jet-stream-500 opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:w-16">
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export { OverlayImageCards };

"use client";

import {
  Brain,
  Shield,
  Users,
} from "lucide-react";
import React from "react";
import { motion } from "motion/react";

import { Card, CardContent } from "../ui/card";

const skillAmigoFeatures = [
  {
    id: 1,
    icon: Brain,
    title: "AI Skill Matching",
    description:
      "Advanced algorithms connect you with the perfect local skills in seconds, ensuring precise matches.",
    href: "#",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4f0325f-5958-42aa-a841-f191ceb5b1cc/generated_images/high-quality-professional-photograph-of--b0f02b1c-20250816124254.jpg?",
  },
  {
    id: 2,
    icon: Shield,
    title: "Secure Local Gigs",
    description:
      "Protected transactions and verified profiles ensure safe, reliable local connections with trust.",
    href: "#",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4f0325f-5958-42aa-a841-f191ceb5b1cc/generated_images/professional-portrait-of-indian-woman-te-53af8113-20250816124313.jpg?",
  },
  {
    id: 3,
    icon: Users,
    title: "Community Verified",
    description:
      "Real reviews from local community members build trust and quality assurance across the platform.",
    href: "#",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4f0325f-5958-42aa-a841-f191ceb5b1cc/generated_images/indian-chef-in-modern-kitchen-teaching-c-6613e175-20250816124339.jpg?",
  },
];

const OverlayImageCards = () => {
  return (
    <section className="bg-jet-stream-50 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 relative overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-30"
        autoPlay
        muted
        loop
        playsInline
        poster="" // Add a poster image if available
      >
        <source src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4f0325f-5958-42aa-a841-f191ceb5b1cc/generated_videos/modern-indian-tech-workspace-with-profes-b426b05b-20250816125132.mp4?" type="video/mp4" />
      </video>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-jet-stream-50/90" />
      
      {/* Pattern */}
      <div className="absolute inset-0 pattern-grid opacity-20" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <div className="relative">
          <header className="mb-8 sm:mb-10 md:mb-12 lg:mb-15 max-w-full sm:max-w-3xl lg:max-w-4xl text-center sm:text-left">
            <h1 className="mb-4 sm:mb-6 md:mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter font-display text-jet-stream-950 leading-tight">
              Connect with Local Skills on{" "}
              <span className="gradient-text block sm:inline">
                SkillAmigo
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed tracking-tight font-body text-jet-stream-700 max-w-none sm:max-w-2xl">
              The hyperlocal platform that instantly connects you with verified skilled professionals in your neighborhood—from home repairs to tutoring and everything in between.
            </p>
          </header>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {skillAmigoFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="block w-full"
              >
                <Card className="group relative border-2 border-jet-stream-300 bg-jet-stream-50 shadow-lg transition-all duration-500 ease-in-out hover:shadow-2xl hover:shadow-jet-stream-400/20 hover:border-jet-stream-400 hover:-translate-y-1 sm:hover:-translate-y-2 h-full">
                  {/* High-quality image background */}
                  <div className="absolute inset-0 overflow-hidden rounded-lg">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                      loading="lazy"
                    />
                  </div>
                  
                  <CardContent className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-6 md:p-8 min-h-[280px] sm:min-h-[320px]">
                    <div className="flex size-12 sm:size-14 md:size-16 items-center justify-center border-2 border-jet-stream-600 bg-gradient-to-br from-jet-stream-500 to-jet-stream-400 transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-3 rounded-sm">
                      <Icon
                        size={24}
                        className="sm:size-7 md:size-8 text-jet-stream-50"
                      />
                    </div>

                    <h3 className="mt-4 sm:mt-6 text-xl sm:text-2xl lg:text-2xl xl:text-3xl leading-tight font-bold tracking-tight font-display text-jet-stream-950">
                      {feature.title}
                    </h3>

                    <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed font-body text-jet-stream-700 flex-grow">
                      {feature.description}
                    </p>

                    {/* Modern accent element */}
                    <div className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 w-8 sm:w-10 md:w-12 h-0.5 sm:h-1 bg-gradient-to-r from-jet-stream-400 to-jet-stream-500 opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:w-10 sm:group-hover:w-12 md:group-hover:w-16">
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { OverlayImageCards };