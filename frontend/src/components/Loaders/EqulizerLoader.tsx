import { motion } from 'framer-motion';

const EqulizerLoader = () => {
  return (
    <>
      <motion.div
        initial={{
          opacity: 0.95,
        }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
        exit={{ opacity: 0.9, transition: { duration: 0.3 } }}
        className="equalizer"
      >
        <span className="bar bar-1"></span>
        <span className="bar bar-2"></span>
        <span className="bar bar-3"></span>
      </motion.div>
    </>
  );
};

export default EqulizerLoader;
