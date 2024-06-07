import React, { useState } from "react";
import { AppContextTypes, ArtistListTypes, DBStatistics } from "../utils/types";
import { useMediaQuery } from "usehooks-ts";

export const AppContext = React.createContext<AppContextTypes>({
  dbStatistics: undefined,
  setDbStatistics: () => {},
  artistFilter: undefined,
  setArtistFilter: () => {},
  artistList: [],
  setArtistLists: () => {},
  isSidebarVisible: false,
  setIsSidebarVisible: () => {},
  isMobile: false,
  isModalVisible: false,
  setIsModalVisible: () => {},
  yotubeId: undefined,
  setYotubeId: () => {},
  releaseId: undefined,
  setReleaseId: () => {},
  modalType: undefined,
  setModalType: () => {},
});

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [dbStatistics, setDbStatistics] = useState<DBStatistics | undefined>(
    undefined,
  );
  const [artistList, setArtistLists] = useState<ArtistListTypes[]>([]);
  const [artistFilter, setArtistFilter] = useState<string | undefined>(
    undefined,
  );
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [yotubeId, setYotubeId] = useState<string | undefined>(undefined);
  const [releaseId, setReleaseId] = useState(undefined);
  const [modalType, setModalType] = useState(undefined);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const initContextValue: AppContextTypes = {
    dbStatistics,
    setDbStatistics,
    artistList,
    artistFilter,
    setArtistFilter,
    setArtistLists,
    isSidebarVisible,
    setIsSidebarVisible,
    isMobile,
    isModalVisible,
    setIsModalVisible,
    yotubeId,
    setYotubeId,
    releaseId,
    setReleaseId,
    modalType,
    setModalType,
  };
  return (
    <AppContext.Provider value={initContextValue}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContextProvider;
