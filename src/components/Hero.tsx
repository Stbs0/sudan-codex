import { Button } from "@/components/ui/button";
import { Pill } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
const variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,

    transition: { staggerChildren: 0.25 },
  },
};
const item = {
  hidden: { opacity: 0, translateY: 50 },
  visible: { opacity: 1, translateY: 0 },
};
export function Hero() {
  const MotionButton = motion(Button);
  const MotionPill = motion(Pill);
  return (
    <motion.section
      className='py-20 text-center'
      initial='hidden'
      animate='visible'>
      <motion.div
        variants={variants}
        className='container mx-auto px-4'>
        <MotionPill
          variants={item}
          className='mx-auto mb-6 h-16 w-16 text-purple-600'
        />
        <motion.h1
          variants={item}
          className='mb-4 text-5xl font-bold text-gray-900 dark:text-gray-400'>
          Welcome to Sudan Codex
        </motion.h1>
        <motion.p
          variants={item}
          className='mb-8 text-xl text-gray-600 dark:text-gray-500'>
          Search through Sudan drug index
        </motion.p>
        <Link
          to={"/drug-list"}
          className=' '>
          <MotionButton
            variants={item}
            size='lg'
            className='bg-purple-600 hover:bg-purple-700'>
            Explore Now
          </MotionButton>
        </Link>
      </motion.div>
    </motion.section>
  );
}
