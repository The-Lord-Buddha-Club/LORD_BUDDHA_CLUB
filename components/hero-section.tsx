"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import BuddhaLogo from '@/components/BuddhaLogo';
import { AnimatedBackground } from '@/components/ui/animated-background';
import {AnimatedText} from '@/components/ui/animated-text';
import {Button} from '@/components/ui/button';
import Link from "next/link";
import { GithubIcon } from 'lucide-react';

export default function HeroSection() {
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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-12 sm:py-24">
        <div className="flex flex-col items-center justify-center space-y-8 max-w-5xl mx-auto text-center">
          <motion.div 
            className="w-96 h-96 sm:w-[32rem] sm:h-[32rem] md:w-[40rem] md:h-[40rem] mb-6 relative"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Suspense fallback={null}>
              <Canvas
                camera={{ position: [0, 0, 10], fov: 60 }}
                style={{ width: '100%', height: '100%' }}
              >
                <ambientLight 
                  intensity={isDarkMode ? 1 : 0.5} 
                  color="#ffffff"
                />
                <directionalLight 
                  position={[5, 5, 5]} 
                  intensity={isDarkMode ? 1.5 : 1} 
                  color="#ffffff"
                />
                <directionalLight 
                  position={[-5, -5, -5]} 
                  intensity={isDarkMode ? 1.5 : 1} 
                  color="#ffffff"
                />

                <Center>
                  <BuddhaLogo scale={[4, 4, 4]} />
                </Center>

                <OrbitControls enablePan={false} enableZoom={true} />
              </Canvas>
            </Suspense>
          </motion.div>
          
          <AnimatedText
            text="The Lord Buddha Club"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight"
            wordClassName="bg-gradient-to-r from-yellow-600 via-pink-600 to-purple-600 bg-clip-text text-transparent inline-block"
            charClassName="hover:text-white transition-colors duration-300 cursor-default"
          />
          
          <AnimatedText
            text="A community of developers dedicated to creating impactful open-source projects and fostering collaborative learning."
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            wordClassName="hover:text-purple-500 transition-colors duration-300 cursor-default"
          />
          
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
            >
              <Link href="/join">Join Our Community</Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild
              className="group hover:border-purple-500 transition-all duration-300 w-full sm:w-auto"
            >
              <Link 
                href="https://github.com/The-Lord-Buddha-Club" 
                target="_blank"
                className="flex items-center justify-center space-x-2"
              >
                <GithubIcon className="h-5 w-5 group-hover:text-purple-500" />
                <span>Visit GitHub</span>
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

