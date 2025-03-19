import HeroSection from "@/components/hero-section";
import { FeaturedProjects } from "@/components/featured-projects";
import { LatestBlogs } from "@/components/latest-blogs";
import 'tailwindcss/tailwind.css';
import { AnimatedTerminal } from "@/components/ui/animated-terminal";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-16">
      <HeroSection />
      <AnimatedTerminal
  quotes={[
    { text: "$ Expectations leads to nothing.", className: "text-emerald-400" },
    { text: "$ Make the change you want to see.", className: "text-blue-400" },
    { text: "✓ Others will join if interested." },
  ]}
  className="border-neutral-700 shadow-2xl"
/>
<FeaturedProjects/>
      <LatestBlogs />
    </div>
  );
}