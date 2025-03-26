"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import BuddhaLogo from '@/components/BuddhaLogo';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { Button } from '@/components/ui/button';
import Link from "next/link";
import { GithubIcon } from 'lucide-react';
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const HeroSection = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      const html = document.documentElement;
      setIsDarkMode(html.classList.contains('dark'));
    };

    checkDarkMode();

    const observer = new MutationObserver(() => {
      checkDarkMode();
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  const words = [
    { text: "The" },
    { text: "Lord" },
    { text: "Buddha" },
    { text: "Club" },
  ];

  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-16">
      <AnimatedBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-10 sm:py-14">
        <div className="flex flex-col items-center justify-center space-y-5 max-w-4xl mx-auto text-center">
          {/* Smaller 3D model container */}
          <BackgroundGradient className="rounded-[22px] max-w-sm p-3 sm:p-5 bg-white dark:bg-gray-900">
            <motion.div 
              className="w-48 h-48 sm:w-56 sm:h-56 relative"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Suspense fallback={null}>
                <Canvas
                  camera={{ position: [0, 0, 10], fov: 60 }}
                  style={{ width: '100%', height: '100%' }}
                >
                  {isDarkMode ? (
                    <>
                      <ambientLight intensity={0.8} color="#a78bfa" />
                      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#818cf8" />
                      <directionalLight position={[-5, -5, -5]} intensity={1.2} color="#c084fc" />
                    </>
                  ) : (
                    <>
                      <ambientLight intensity={0.5} color="#ffffff" />
                      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#4f46e5" />
                      <directionalLight position={[-5, -5, -5]} intensity={0.8} color="#7c3aed" />
                      <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffffff" />
                    </>
                  )}

                  <Center>
                    <BuddhaLogo scale={[2.2, 2.2, 2.2]} />
                  </Center>

                  <OrbitControls enablePan={false} enableZoom={false} />
                </Canvas>
              </Suspense>
            </motion.div>
          </BackgroundGradient>
          
          {/* Smaller font sizes */}
          <TypewriterEffect words={words} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold" />
          
          {/* Compact text area */}
          <div className="max-w-2xl mx-auto">
            <TextGenerateEffect 
              words="A community of developers dedicated to creating impactful open-source projects and fostering collaborative learning." 
              className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed" 
            />
          </div>
          
          {/* Buttons with reduced vertical spacing */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 mt-4 w-full sm:w-auto justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button 
              asChild 
              size="default" 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
            >
              <Link href="/join">Join Our Community</Link>
            </Button>
            <Button 
              variant="outline" 
              size="default" 
              asChild
              className="group border-indigo-500 dark:border-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-all duration-300 w-full sm:w-auto"
            >
              <Link 
                href="https://github.com/The-Lord-Buddha-Club" 
                target="_blank"
                className="flex items-center justify-center space-x-2"
              >
                <GithubIcon className="h-4 w-4 text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300" />
                <span className="text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300">Visit GitHub</span>
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;