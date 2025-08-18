'use client'
import { FullwidthIconNavbar } from "./_components/navbars/fullwidth-icon-navbar";
import { FullScreenBackgroundHero } from "./_components/heros/full-screen-background-hero";
import { OverlayImageCards } from "./_components/feature/overlay-image-cards";
import { HorizontalCarouselGallery } from "./_components/gallery/horizontal-carousel-gallery";
import { MasonryTestimonialGrid } from "./_components/testimonials/masonry-testimonial-grid";
import AISkillMatchDemo from "./_components/custom/ai-skillmatch-demo";
import LeaderboardCredits from "./_components/custom/leaderboard-credits";
// import { GradientOverlayCta } from "@/components/cta/gradient-overlay-cta";
import { NewsletterFooter } from "./_components/footers/newsletter-footer";
import { GradientOverlayCta } from "./_components/cta/gradient-overlay-cta";

export default function HomePage() {
  return (
    <main>
      <FullwidthIconNavbar />
      <FullScreenBackgroundHero />
      <OverlayImageCards />
      <HorizontalCarouselGallery />
      <MasonryTestimonialGrid />
      <AISkillMatchDemo />
      <LeaderboardCredits />
      <GradientOverlayCta />
      <NewsletterFooter />
    </main>
  );
}