import { motion } from "framer-motion";
import React, { useContext, useEffect } from "react";
import Modal from "../Modal/Modal.tsx";
import { useScrollLock } from "usehooks-ts";
import { AppContext } from "../../context/AppContext.tsx";

const MainLayout = ({
  children,
  param,
}: {
  children: React.ReactNode;
  param?: string;
}) => {
  const { isModalVisible } = useContext(AppContext);

  const { lock, unlock } = useScrollLock({
    autoLock: false,
    lockTarget: "body",
  });
  useEffect(() => {
    isModalVisible ? lock() : unlock();
  }, [isModalVisible]);
  return (
    <>
      <motion.div
        initial={{
          opacity: 0.3,
          y: -7,
        }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 150,
        }}
        key={param ? param : null}
      >
        {children}
      </motion.div>
      <Modal />
    </>
  );
};

export default MainLayout;
