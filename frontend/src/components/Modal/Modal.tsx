import { useContext } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { AppContext } from "../../context/AppContext.tsx";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { IReleaseDetails } from "../../types/types.ts";
import axios from "axios";
import ReleaseModal from "./ReleaseModal.tsx";
import Backdrop from "../Backdrop/Backdrop.tsx";

const Modal = () => {
  const opts: YouTubeProps["opts"] = {
    playerVars: {
      autoplay: 1,
    },
  };

  const {
    setYotubeId,
    releaseId,
    isModalVisible,
    setIsModalVisible,
    yotubeId,
    modalType,
    setModalType,
    setReleaseId,
  } = useContext(AppContext);

  const { data } = useQuery<IReleaseDetails>({
    queryKey: ["artistData", releaseId],
    queryFn: async () => {
      const response = await axios.get(`/release/${releaseId}`);
      return response.data;
    },
    enabled: Boolean(releaseId),

    retry: 1,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {/*<AnimatePresence>*/}
      {/*  {isModalVisible && (*/}

      {/*  )}*/}
      {/*</AnimatePresence>*/}
      <AnimatePresence>
        {isModalVisible && (
          <div className={`modal_container ${modalType}`}>
            <motion.div
              className={`modal`}
              initial={{
                opacity: 0,
                top: -105,
              }}
              animate={{
                opacity: 1,
                top: 10,
              }}
              exit={{
                opacity: 0,
                top: -500,
                transition: { duration: 0.25 },
              }}
              transition={{ duration: 1, type: "spring", bounce: 0.2 }}
            >
              {modalType === "youtube" ? (
                <YouTube
                  videoId={yotubeId}
                  opts={opts}
                  loading="lazy"
                  onEnd={() => setIsModalVisible(false)}
                />
              ) : null}

              {modalType === "release" ? <ReleaseModal release={data} /> : null}
            </motion.div>
            <Backdrop
              onClick={() => {
                setIsModalVisible(false);
                setYotubeId(undefined);
                setModalType(undefined);
                setReleaseId(undefined);
              }}
              type="modal"
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Modal;
