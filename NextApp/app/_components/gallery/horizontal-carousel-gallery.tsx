// "use client";

// import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
// import { useEffect, useState } from "react";
// import { motion, useScroll, useTransform } from "motion/react";

// import { Button } from "../ui/button";
// import type { CarouselApi } from "../ui/carousel";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
// } from "../ui/carousel";
// import React from "react";

// export interface CommunityStoryItem {
//   id: string;
//   name: string;
//   skill: string;
//   story: string;
//   location: string;
//   image: string;
// }

// export interface CommunityStoriesCarouselProps {
//   title?: string;
//   description?: string;
//   items?: CommunityStoryItem[];
// }

// const communityStories = [
//   {
//     id: "priya-mumbai",
//     name: "Priya Sharma",
//     skill: "Digital Marketing Specialist",
//     story: "SkillAmigo helped me transition from housewife to earning ₹50,000 monthly through freelance digital marketing. The platform connected me with amazing clients!",
//     location: "Mumbai, India",
//     image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4f0325f-5958-42aa-a841-f191ceb5b1cc/generated_images/high-quality-professional-photograph-of--b0f02b1c-20250816124254.jpg?",
//   },
//   {
//     id: "arjun-bangalore",
//     name: "Arjun Patel",
//     skill: "Web Developer",
//     story: "Started as a college dropout, now building websites for startups across India. SkillAmigo's community taught me everything I needed to know.",
//     location: "Bangalore, India",
//     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: "meera-delhi",
//     name: "Meera Gupta",
//     skill: "Graphic Designer",
//     story: "From struggling artist to successful freelancer earning ₹80,000 per month. The AI matching system found me clients I never would have met otherwise.",
//     location: "Delhi, India",
//     image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4f0325f-5958-42aa-a841-f191ceb5b1cc/generated_images/professional-portrait-of-indian-woman-te-53af8113-20250816124313.jpg?",
//   },
//   {
//     id: "rohit-pune",
//     name: "Rohit Kumar",
//     skill: "Content Writer",
//     story: "SkillAmigo's skill-sharing feature helped me learn video editing from a mentor in Chennai. Now I offer both writing and video services to my clients.",
//     location: "Pune, India",
//     image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     id: "kavya-hyderabad",
//     name: "Kavya Reddy",
//     skill: "UI/UX Designer",
//     story: "The community support on SkillAmigo is incredible. Senior designers mentored me, and now I'm leading design projects for major Indian e-commerce brands.",
//     location: "Hyderabad, India",
//     image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4f0325f-5958-42aa-a841-f191ceb5b1cc/generated_images/indian-chef-in-modern-kitchen-teaching-c-6613e175-20250816124339.jpg?",
//   },
// ];

// const CommunityStoriesCarousel = ({
//   title = "Stories from Our Community",
//   description = "Real people, real skills, real impact across India",
//   items = communityStories,
// }: CommunityStoriesCarouselProps) => {
//   const [carouselApi, setCarouselApi] = useState<CarouselApi>();
//   const [canScrollPrev, setCanScrollPrev] = useState(false);
//   const [canScrollNext, setCanScrollNext] = useState(false);
//   const [currentSlide, setCurrentSlide] = useState(0);
  
//   const { scrollY } = useScroll();
//   const backgroundY = useTransform(scrollY, [0, 500], [0, -150]);

//   useEffect(() => {
//     if (!carouselApi) {
//       return;
//     }
//     const updateSelection = () => {
//       setCanScrollPrev(carouselApi.canScrollPrev());
//       setCanScrollNext(carouselApi.canScrollNext());
//       setCurrentSlide(carouselApi.selectedScrollSnap());
//     };
//     updateSelection();
//     carouselApi.on("select", updateSelection);
//     return () => {
//       carouselApi.off("select", updateSelection);
//     };
//   }, [carouselApi]);

//   return (
//     <section className="bg-jet-stream-100 py-32 relative overflow-hidden">
//       {/* Background Video */}
//       <video
//         className="absolute inset-0 h-full w-full object-cover opacity-60"
//         autoPlay
//         muted
//         loop
//         playsInline
//       >
//         <source src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4f0325f-5958-42aa-a841-f191ceb5b1cc/generated_videos/professional-modern-indian-skill-sharing-3f625571-20250816125027.mp4?" type="video/mp4" />
//       </video>
      
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-jet-stream-100/85" />
      
//       {/* Modern background elements */}
//       <motion.div
//         style={{ y: backgroundY }}
//         className="absolute inset-0 pointer-events-none opacity-30"
//       >
//         <div className="absolute top-20 left-10 w-64 h-2 bg-gradient-to-r from-jet-stream-400 via-jet-stream-500 to-jet-stream-600" />
//         <div className="absolute bottom-40 right-20 w-48 h-2 bg-gradient-to-l from-jet-stream-600 via-jet-stream-500 to-jet-stream-400" />
//       </motion.div>

//       <div className="container mx-auto relative z-10">
//         <div className="mb-8 flex items-end justify-between md:mb-14 lg:mb-16">
//           <motion.div 
//             className="flex flex-col gap-4"
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-3xl font-display font-bold md:text-4xl lg:text-5xl text-jet-stream-950">
//               Stories from Our{" "}
//               <span className="gradient-text">
//                 Community
//               </span>
//             </h2>
//             <p className="max-w-lg text-jet-stream-700 font-body">{description}</p>
//           </motion.div>
//           <div className="hidden shrink-0 gap-2 md:flex">
//             <Button
//               size="icon"
//               variant="outline"
//               onClick={() => {
//                 carouselApi?.scrollPrev();
//               }}
//               disabled={!canScrollPrev}
//               className="border-2 border-jet-stream-400/30 hover:bg-jet-stream-400/10 hover:border-jet-stream-400 transition-all duration-200"
//             >
//               <ArrowLeft className="size-5 text-jet-stream-600" />
//             </Button>
//             <Button
//               size="icon"
//               variant="outline"
//               onClick={() => {
//                 carouselApi?.scrollNext();
//               }}
//               disabled={!canScrollNext}
//               className="border-2 border-jet-stream-400/30 hover:bg-jet-stream-400/10 hover:border-jet-stream-400 transition-all duration-200"
//             >
//               <ArrowRight className="size-5 text-jet-stream-600" />
//             </Button>
//           </div>
//         </div>
//       </div>
      
//       <div className="w-full">
//         <Carousel
//           setApi={setCarouselApi}
//           opts={{
//             breakpoints: {
//               "(max-width: 768px)": {
//                 dragFree: true,
//               },
//             },
//           }}
//         >
//           <CarouselContent className="ml-0 2xl:mr-[max(0rem,calc(50vw-700px))] 2xl:ml-[max(8rem,calc(50vw-700px))]">
//             {items.map((item, index) => (
//               <CarouselItem
//                 key={item.id}
//                 className="max-w-[320px] pl-[20px] lg:max-w-[360px]"
//               >
//                 <motion.div 
//                   className="group cursor-pointer"
//                   initial={{ opacity: 0, x: 100 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   transition={{ 
//                     duration: 0.5,
//                     delay: index * 0.1,
//                     ease: "easeOut"
//                   }}
//                   viewport={{ once: true }}
//                   whileHover={{ y: -8, scale: 1.02 }}
//                 >
//                   <div className="group relative h-full min-h-[27rem] max-w-full overflow-hidden bg-jet-stream-50 border-2 border-jet-stream-300 hover:border-jet-stream-400/50 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-jet-stream-400/20">
//                     {/* Modern accent line */}
//                     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-jet-stream-400 via-jet-stream-500 to-jet-stream-600" />
                    
//                     {/* User Photo */}
//                     <div className="relative p-6 pb-4">
//                       <div className="w-16 h-16 overflow-hidden border-2 border-jet-stream-400/30 group-hover:border-jet-stream-400 transition-all duration-300 group-hover:scale-110">
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                     </div>

//                     {/* Quote Icon */}
//                     <div className="absolute top-6 right-6">
//                       <Quote className="size-6 text-jet-stream-400/40 group-hover:text-jet-stream-600 transition-colors duration-300" />
//                     </div>

//                     {/* Content */}
//                     <div className="px-6 pb-6 flex flex-col h-[calc(100%-5rem)]">
//                       {/* Name and Skill */}
//                       <div className="mb-4">
//                         <h3 className="text-xl font-display font-bold text-jet-stream-950 mb-1">
//                           {item.name}
//                         </h3>
//                         <p className="text-jet-stream-600 font-body text-sm font-semibold">
//                           {item.skill}
//                         </p>
//                       </div>

//                       {/* Success Story Quote */}
//                       <div className="flex-1 mb-4">
//                         <p className="text-jet-stream-700 font-body leading-relaxed italic">
//                           "{item.story}"
//                         </p>
//                       </div>

//                       {/* Location */}
//                       <div className="mt-auto pt-4 border-t border-jet-stream-300">
//                         <p className="text-jet-stream-600 font-body text-sm flex items-center gap-2">
//                           <span className="w-2 h-2 bg-jet-stream-500"></span>
//                           {item.location}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//         </Carousel>
        
//         {/* Carousel Navigation Dots */}
//         <div className="mt-8 flex justify-center gap-2">
//           {items.map((_, index) => (
//             <motion.button
//               key={index}
//               className={`h-1 transition-all duration-300 ${
//                 currentSlide === index 
//                   ? "w-8 bg-jet-stream-600" 
//                   : "w-4 bg-jet-stream-400 hover:bg-jet-stream-500"
//               }`}
//               onClick={() => carouselApi?.scrollTo(index)}
//               aria-label={`Go to slide ${index + 1}`}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export { CommunityStoriesCarousel as HorizontalCarouselGallery };


"use client";

import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import { Button } from "../ui/button";
import type { CarouselApi } from "../ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import React from "react";

export interface CommunityStoryItem {
  id: string;
  name: string;
  skill: string;
  story: string;
  location: string;
  image: string;
}

export interface CommunityStoriesCarouselProps {
  title?: string;
  description?: string;
  items?: CommunityStoryItem[];
}

const communityStories = [
  {
    id: "priya-mumbai",
    name: "Priya Sharma",
    skill: "Digital Marketing Specialist",
    story: "SkillAmigo helped me transition from housewife to earning ₹50,000 monthly through freelance digital marketing. The platform connected me with amazing clients!",
    location: "Mumbai, Maharashtra",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4f0325f-5958-42aa-a841-f191ceb5b1cc/generated_images/high-quality-professional-photograph-of--b0f02b1c-20250816124254.jpg?",
  },
  {
    id: "arjun-bangalore",
    name: "Arjun Patel",
    skill: "Full Stack Developer",
    story: "Started as a college dropout, now building websites for startups across India. SkillAmigo's community taught me everything I needed to know about modern web development.",
    location: "Bangalore, Karnataka",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "meera-delhi",
    name: "Meera Gupta",
    skill: "Graphic Designer",
    story: "From struggling artist to successful freelancer earning ₹80,000 per month. The AI matching system found me clients I never would have met otherwise.",
    location: "New Delhi",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4f0325f-5958-42aa-a841-f191ceb5b1cc/generated_images/professional-portrait-of-indian-woman-te-53af8113-20250816124313.jpg?",
  },
  {
    id: "rohit-pune",
    name: "Rohit Kumar",
    skill: "Content Creator",
    story: "SkillAmigo's skill-sharing feature helped me learn video editing from a mentor in Chennai. Now I offer both writing and video services to my clients.",
    location: "Pune, Maharashtra",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "kavya-hyderabad",
    name: "Kavya Reddy",
    skill: "UI/UX Designer",
    story: "The community support on SkillAmigo is incredible. Senior designers mentored me, and now I'm leading design projects for major Indian e-commerce brands.",
    location: "Hyderabad, Telangana",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4f0325f-5958-42aa-a841-f191ceb5b1cc/generated_images/indian-chef-in-modern-kitchen-teaching-c-6613e175-20250816124339.jpg?",
  },
  {
    id: "amit-jaipur",
    name: "Amit Singh",
    skill: "Digital Marketing Consultant",
    story: "Through SkillAmigo, I transformed my traditional business into a digital powerhouse. Now helping other small businesses in Rajasthan go online and reach new customers.",
    location: "Jaipur, Rajasthan",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "sneha-chennai",
    name: "Sneha Iyer",
    skill: "Data Analyst",
    story: "Being a working mother, SkillAmigo gave me the flexibility to work remotely while building my data science career. The mentorship program was life-changing.",
    location: "Chennai, Tamil Nadu",
    image: "https://images.unsplash.com/photo-1494790108755-2616c4e96019?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "raj-ahmedabad",
    name: "Raj Mehta",
    skill: "Mobile App Developer",
    story: "From a textile worker to creating apps used by millions. SkillAmigo's coding bootcamp and peer learning helped me master React Native and Flutter.",
    location: "Ahmedabad, Gujarat",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "ananya-kolkata",
    name: "Ananya Das",
    skill: "Social Media Manager",
    story: "Started managing social media for local businesses in Kolkata, now handling campaigns for national brands. SkillAmigo connected me with the right opportunities.",
    location: "Kolkata, West Bengal",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "vikram-lucknow",
    name: "Vikram Tiwari",
    skill: "Video Editor & Animator",
    story: "From editing wedding videos to creating content for YouTube channels with millions of subscribers. The skill-sharing community taught me advanced motion graphics.",
    location: "Lucknow, Uttar Pradesh",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "divya-bhopal",
    name: "Divya Sharma",
    skill: "E-commerce Specialist",
    story: "Helped my family's handicraft business reach customers worldwide through online marketplaces. SkillAmigo taught me everything about digital commerce and logistics.",
    location: "Bhopal, Madhya Pradesh",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "kiran-kochi",
    name: "Kiran Nair",
    skill: "Cybersecurity Consultant",
    story: "Transitioned from IT support to cybersecurity expert. The advanced courses and practical projects on SkillAmigo helped me land consulting roles with major corporations.",
    location: "Kochi, Kerala",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const CommunityStoriesCarousel = ({
  title = "Stories from Our Community",
  description = "Real people, real skills, real impact across India",
  items = communityStories,
}: CommunityStoriesCarouselProps) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, -150]);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section className="bg-jet-stream-100 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 relative overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-60"
        autoPlay
        muted
        loop
        playsInline
        poster=""
      >
        <source src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/e4f0325f-5958-42aa-a841-f191ceb5b1cc/generated_videos/professional-modern-indian-skill-sharing-3f625571-20250816125027.mp4?" type="video/mp4" />
      </video>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-jet-stream-100/85" />
      
      {/* Modern background elements */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none opacity-30"
      >
        <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-32 sm:w-48 md:w-64 h-1 sm:h-2 bg-gradient-to-r from-jet-stream-400 via-jet-stream-500 to-jet-stream-600" />
        <div className="absolute bottom-20 sm:bottom-40 right-4 sm:right-20 w-24 sm:w-36 md:w-48 h-1 sm:h-2 bg-gradient-to-l from-jet-stream-600 via-jet-stream-500 to-jet-stream-400" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <div className="mb-6 sm:mb-8 md:mb-12 lg:mb-16 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-6">
          <motion.div 
            className="flex flex-col gap-3 sm:gap-4 max-w-full sm:max-w-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-jet-stream-950 leading-tight">
              Stories from Our{" "}
              <span className="gradient-text block sm:inline">
                Community
              </span>
            </h2>
            <p className="text-sm sm:text-base text-jet-stream-700 font-body leading-relaxed">{description}</p>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden sm:flex shrink-0 gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="border-2 border-jet-stream-400/30 hover:bg-jet-stream-400/10 hover:border-jet-stream-400 transition-all duration-200 size-10 sm:size-12"
            >
              <ArrowLeft className="size-4 sm:size-5 text-jet-stream-600" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="border-2 border-jet-stream-400/30 hover:bg-jet-stream-400/10 hover:border-jet-stream-400 transition-all duration-200 size-10 sm:size-12"
            >
              <ArrowRight className="size-4 sm:size-5 text-jet-stream-600" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="ml-0 px-4 sm:px-6 lg:px-8 2xl:mr-[max(0rem,calc(50vw-700px))] 2xl:ml-[max(8rem,calc(50vw-700px))]">
            {items.map((item, index) => (
              <CarouselItem
                key={item.id}
                className="basis-[280px] sm:basis-[320px] lg:basis-[360px] pl-3 sm:pl-4 md:pl-5"
              >
                <motion.div 
                  className="group cursor-pointer h-full"
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  <div className="group relative h-full min-h-[400px] sm:min-h-[420px] md:min-h-[27rem] max-w-full overflow-hidden bg-jet-stream-50 border-2 border-jet-stream-300 hover:border-jet-stream-400/50 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-jet-stream-400/20 rounded-lg">
                    {/* Modern accent line */}
                    <div className="absolute top-0 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-jet-stream-400 via-jet-stream-500 to-jet-stream-600" />
                    
                    {/* User Photo */}
                    <div className="relative p-4 sm:p-6 pb-3 sm:pb-4">
                      <div className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 overflow-hidden rounded-full border-2 border-jet-stream-400/30 group-hover:border-jet-stream-400 transition-all duration-300 group-hover:scale-110">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Quote Icon */}
                    <div className="absolute top-4 sm:top-6 right-4 sm:right-6">
                      <Quote className="size-5 sm:size-6 text-jet-stream-400/40 group-hover:text-jet-stream-600 transition-colors duration-300" />
                    </div>

                    {/* Content */}
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6 flex flex-col h-[calc(100%-4rem)] sm:h-[calc(100%-5rem)]">
                      {/* Name and Skill */}
                      <div className="mb-3 sm:mb-4">
                        <h3 className="text-lg sm:text-xl font-display font-bold text-jet-stream-950 mb-1 leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-jet-stream-600 font-body text-xs sm:text-sm font-semibold">
                          {item.skill}
                        </p>
                      </div>

                      {/* Success Story Quote */}
                      <div className="flex-1 mb-3 sm:mb-4">
                        <p className="text-jet-stream-700 font-body text-sm sm:text-base leading-relaxed italic line-clamp-4 sm:line-clamp-none">
                          "{item.story}"
                        </p>
                      </div>

                      {/* Location */}
                      <div className="mt-auto pt-3 sm:pt-4 border-t border-jet-stream-300">
                        <p className="text-jet-stream-600 font-body text-xs sm:text-sm flex items-center gap-2 pb-4">
                          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-jet-stream-500 rounded-full"></span>
                          {item.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        
        {/* Carousel Navigation Dots */}
        <div className="mt-6 sm:mt-8 flex justify-center gap-1.5 sm:gap-2 px-4">
          {items.map((_, index) => (
            <motion.button
              key={index}
              className={`h-0.5 sm:h-1 transition-all duration-300 rounded-full ${
                currentSlide === index 
                  ? "w-6 sm:w-8 bg-jet-stream-600" 
                  : "w-3 sm:w-4 bg-jet-stream-400 hover:bg-jet-stream-500"
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            />
          ))}
        </div>
        
        {/* Mobile Navigation Buttons */}
        <div className="flex sm:hidden justify-center gap-2 mt-4 px-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              carouselApi?.scrollPrev();
            }}
            disabled={!canScrollPrev}
            className="border-2 border-jet-stream-400/30 hover:bg-jet-stream-400/10 hover:border-jet-stream-400 transition-all duration-200 text-xs"
          >
            <ArrowLeft className="size-3 mr-1" />
            Previous
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              carouselApi?.scrollNext();
            }}
            disabled={!canScrollNext}
            className="border-2 border-jet-stream-400/30 hover:bg-jet-stream-400/10 hover:border-jet-stream-400 transition-all duration-200 text-xs"
          >
            Next
            <ArrowRight className="size-3 ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export { CommunityStoriesCarousel as HorizontalCarouselGallery };