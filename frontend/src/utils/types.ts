import { Dispatch, SetStateAction } from "react";

/* eslint-disable @typescript-eslint/ban-types */
export interface LoadingTypes {
  application: boolean | null;
  artist: boolean | null;
  release: boolean | null;
}

export interface DBStatistics {
  artists_qty: number;
  releases_qty: number;
  tracks_qty: number;
  youtube_movies_qty: number;
}

export interface ArtistListTypes {
  id: number;
  name: string;
}
export interface HomePageDataTypes {
  dbStatistics: DBStatistics;
  artistsList: ArtistListTypes[];
}

export interface AppContextTypes {
  dbStatistics: DBStatistics | undefined;
  setDbStatistics: Dispatch<SetStateAction<DBStatistics | undefined>>;
  artistFilter: string | undefined;
  setArtistFilter: Dispatch<SetStateAction<string | undefined>>;
  artistList: ArtistListTypes[] | [];
  setArtistLists: Dispatch<SetStateAction<ArtistListTypes[]>>;
  isMobile: boolean;
  isSidebarVisible: boolean;
  setIsSidebarVisible: Dispatch<SetStateAction<boolean>>;

  isModalVisible: boolean;
  modalType: string | undefined;
  setModalType: Function;
  setIsModalVisible: Function;
  yotubeId: string | undefined;
  setYotubeId: Dispatch<SetStateAction<string | undefined>>;
  releaseId: number | undefined;
  setReleaseId: Function;
}
