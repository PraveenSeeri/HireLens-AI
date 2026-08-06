import { motion } from "framer-motion";

function AnimatedCard({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.03,
        y: -5,
      }}
      className="
        bg-white
        dark:bg-slate-900
        rounded-3xl
        shadow-lg
        dark:shadow-black/40
        border
        border-transparent
        dark:border-slate-800
        p-6
        transition-all
      "
    >
      {children}
    </motion.div>
  );
}

export default AnimatedCard;