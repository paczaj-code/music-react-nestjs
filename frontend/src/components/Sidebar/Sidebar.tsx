import { ArtistList } from "./ArtistList/ArtistList";
import { HomePageDataTypes } from "../../utils/types";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import Backdrop from "../Backdrop/Backdrop";

const Sidebar: React.FC<Pick<HomePageDataTypes, "artistsList">> = ({
  artistsList,
}) => {
  const { isSidebarVisible, setIsSidebarVisible } = useContext(AppContext);

  return (
    <>
      {isSidebarVisible ? (
        <Backdrop type="sidebar" onClick={() => setIsSidebarVisible(false)} />
      ) : null}
      <div className={`sidebar_wrapper ${isSidebarVisible ? "visible" : ""}`}>
        <ArtistList artislList={artistsList} />
      </div>
    </>
  );
};

export default Sidebar;

// TODO style dla light
