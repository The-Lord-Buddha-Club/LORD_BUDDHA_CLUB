import HeroSection from "@/components/hero-section";
import { FeaturedProjects } from "@/components/featured-projects";
import { LatestBlogs } from "@/components/latest-blogs";
import 'tailwindcss/tailwind.css';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-16">
      <HeroSection />
      <FeaturedProjects />
      <LatestBlogs />
    </div>
  );
}