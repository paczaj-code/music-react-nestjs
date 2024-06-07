import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";
import Youtube from "./pages/Youtube";
import Artist from "./pages/Artist/Artist";
import Error from "./pages/Error";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useContext, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import { ArtistListTypes, HomePageDataTypes } from "./utils/types";
import { AppContext } from "./context/AppContext";
import Header from "./components/Header/Header";

function App() {
  const [filteredArtistList, setFilteredArtistList] = useState<
    ArtistListTypes[] | undefined
  >(undefined);

  const { setArtistLists, artistFilter, setDbStatistics } =
    useContext(AppContext);

  const query = useQuery<HomePageDataTypes>({
    queryKey: ["homepageData"],
    queryFn: async () => {
      const response = await axios.get("/init-data");
      return response.data;
    },
    refetchOnWindowFocus: false,
  });

  // console.log(query && query.data.db_statistics);

  useEffect(() => {
    if (query.data) {
      setArtistLists(query.data.artistsList);
      setDbStatistics(query.data.dbStatistics);
    }
  }, [query.data, setArtistLists, setDbStatistics]);

  useEffect(() => {
    if (artistFilter && artistFilter?.length >= 2) {
      setFilteredArtistList(
        query.data?.artistsList &&
          query.data.artistsList.filter((el) =>
            el.name.toLowerCase().includes(artistFilter.toLowerCase()),
          ),
      );
    } else {
      setFilteredArtistList(query.data?.artistsList);
    }
  }, [artistFilter, query.data?.artistsList]);

  return (
    <>
      <div className="app_wrapper">
        <Header />
        {query.isLoading ? (
          <span>loading</span>
        ) : (
          <Sidebar
            artistsList={
              filteredArtistList ? filteredArtistList : query.data!.artistsList
            }
          />
        )}
        <div className="content_wrapper">
          <div className="content">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/youtube" element={<Youtube />} />
              <Route path="/artist/:artistId" element={<Artist />} />
              <Route path="/error" element={<Error />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

//TODO kolory dla dark/light mode
//TODO strona główna
// ToDo strona youtube
