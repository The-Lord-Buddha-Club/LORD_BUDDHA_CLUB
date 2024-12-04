"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MissionCard } from "@/components/about/mission-card";
import { ValuesCard } from "@/components/about/values-card";
import { CommunityCard } from "@/components/about/community-card";
import { FoundersCard } from "@/components/about/founders-card";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 pt-20">
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 dark:from-primary dark:to-purple-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About The Lord Buddha Club
        </motion.h1>

        <motion.p
          className="text-center text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Discover our mission, values, and the community that drives us forward in our journey of innovation and enlightenment.
        </motion.p>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid gap-8 md:grid-cols-2"
        >
          <motion.div variants={fadeInUp}>
            <MissionCard />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <ValuesCard />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <FoundersCard />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <CommunityCard />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

