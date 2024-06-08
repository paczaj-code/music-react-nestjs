import MainLayout from "../components/Layouts/MainLayout";
import Divider from "../components/Divider/Divider.tsx";
// import { IDatabaseInfo } from "../types/types.ts";
import { useContext } from "react";
import { AppContext } from "../context/AppContext.tsx";
import {
  IconBrandYoutubeFilled,
  IconDisc,
  IconMusic,
  IconUsersGroup,
} from "@tabler/icons-react";

const Homepage = () => {
  const { dbStatistics } = useContext(AppContext);
  return (
    <MainLayout>
      <div className="homepage_top">
        <div id="wrap">
          <div id="album">
            <div id="cover">
              <div id="print"></div>
            </div>
            <div id="vinyl">
              <div id="print"></div>
            </div>
          </div>
        </div>
        <div className="homepage_top-text">
          <h4 className="quotation">
            "Bóg raczy wiedzieć, w jaki sposób ludzie zachowywali zdrowie
            psychiczne przed rockandrollem."
          </h4>
          <Divider />
          <h6 className="quotation_author">
            Dennis Lehane, <span>"Wypijmy, nim zacznie się wojna"</span>
          </h6>
        </div>
      </div>
      <Divider />
      <br />
      <h4>Produkt uboczny zabawy bazą danych</h4>

      <div className="database_infos">
        <div className="database_infos-artists">
          <div className="icon">
            <IconUsersGroup />
          </div>
          <div className="database_infos-text">
            <h3>Wykonawców</h3>
            <h2>{dbStatistics && dbStatistics.artists_qty}</h2>
          </div>
        </div>

        <div className="database_infos-releases">
          <div className="icon">
            <IconDisc />
          </div>
          <div className="database_infos-text">
            <h3>Albumów</h3>
            <h2>{dbStatistics && dbStatistics.releases_qty}</h2>
          </div>
        </div>

        <div className="database_infos-youtube">
          <div className="icon">
            <IconBrandYoutubeFilled />
          </div>
          <div className="database_infos-text">
            <h3>Klipów YT</h3>
            <h2>{dbStatistics && dbStatistics.youtube_movies_qty}</h2>
          </div>
        </div>

        <div className="database_infos-tracks">
          <div className="icon">
            <IconMusic />
          </div>
          <div className="database_infos-text">
            <div className="database_infos-text">
              <h3>Utworów</h3>
              <h2>{dbStatistics && dbStatistics.tracks_qty}</h2>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Homepage;
