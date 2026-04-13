'use client';
import { motion } from 'motion/react';
import Image from 'next/image';

const PROFILE_PIC_SIZE = 400;
const ABOUT_CONTENT = `Highly analytical and results-oriented professional with extensive experience in optimization and network modelling, strategy development, and data analysis. Demonstrated ability to define and implement innovative processes and solutions, collaborate with diverse stakeholders, and manage complex analytical models. Passionate about developing data-driven solutions to support climate change mitigation and adaptation strategies.`;

export const AboutSection = () => {
  return (
    <section className="dark:bg-sky-50 rounded-2xl mx-4 p-6 sm:p-12">
      <motion.div
        className="flex flex-col md:flex-row flex-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col items-center sm:items-baseline sm:flex-col md:flex-col flex-4 gap-2">
          <Image
            src="/profile.jpeg"
            alt="Profile picture of Kathleen Miller"
            width={PROFILE_PIC_SIZE}
            height={PROFILE_PIC_SIZE}
            loading="eager"
            className="w-42 h-42 sm:w-62 sm:h-62 md:w-30 md:h-30 lg:w-62 lg:h-62 rounded-full"
          />
          <div className="flex flex-col text-wrap justify-center items-center">
            <h1 className="text-3xl font-bold">Kathleen Miller</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 items-center">
              Passionate about science and nature-based solutions
            </p>
          </div>
        </div>
        <div className="flex md:flex-col flex-12 gap-2 pt-2">
          <h2 className="text-2xl font-bold">About Me</h2>
          <p className="text-lg/8 text-gray-800 dark:text-gray-400 mt-4">
            {ABOUT_CONTENT}
          </p>
        </div>
      </motion.div>
    </section>
  );
};
