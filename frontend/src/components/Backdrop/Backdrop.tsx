import React from "react";
import { motion } from "framer-motion";

interface BackdropTypes extends React.HTMLAttributes<HTMLDivElement> {
  type?: "modal" | "sidebar";
  onClick?: () => void;
  className?: string;
}
const Backdrop: React.FC<BackdropTypes> = ({ onClick, className, type }) => {
  return (
    <motion.div
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, type: "spring" }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className={`backdrop ${className ? className : ""} backdrop-${type}`}
      onClick={onClick}
    ></motion.div>
  );
};

export default Backdrop;
