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
    {
      text: "The",
    },
    {
      text: "Lord",
    },
    {
      text: "Buddha",
    },
    {
      text: "Club",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-24 md:pt-32">
      <AnimatedBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-24 sm:py-32 mt-16">
        <div className="flex flex-col items-center justify-center space-y-8 max-w-5xl mx-auto text-center">
          <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-gray-900">
            <motion.div 
              className="w-64 h-64 sm:w-80 sm:h-80 relative"
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
                    <BuddhaLogo scale={[2.5, 2.5, 2.5]} />
                  </Center>

                  <OrbitControls enablePan={false} enableZoom={false} />
                </Canvas>
              </Suspense>
            </motion.div>
          </BackgroundGradient>
          
          <TypewriterEffect words={words} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold" />
          
          <div className="max-w-2xl mx-auto">
            <TextGenerateEffect words="A community of developers dedicated to creating impactful open-source projects and fostering collaborative learning. Join us in our journey of enlightened coding and spiritual growth through technology." className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed" />
          </div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
            >
              <Link href="/join">Join Our Community</Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild
              className="group border-indigo-500 dark:border-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-all duration-300 w-full sm:w-auto"
            >
              <Link 
                href="https://github.com/The-Lord-Buddha-Club" 
                target="_blank"
                className="flex items-center justify-center space-x-2"
              >
                <GithubIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300" />
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

