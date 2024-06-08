import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import EqulizerLoader from "../../components/Loaders/EqulizerLoader";
import ArtistInfo from "./ArtistInfo";
import { IArtistDataTypes } from "../../types/types";
import { AnimatePresence } from "framer-motion";
import Divider from "../../components/Divider/Divider";
import YoutubeSection from "./YoutubeSection";
import MainLayout from "../../components/Layouts/MainLayout";
import ReleasesSection from "../../components/ReleasesSection/ReleasesSection.tsx";
import { IconDisc } from "@tabler/icons-react";

const Artist = () => {
  const params = useParams().artistId;

  const { isError, isLoading, data } = useQuery<IArtistDataTypes>({
    queryKey: ["artistData", params],
    queryFn: async () => {
      const response = await axios.get(`/artist/${params}`);
      return response.data;
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isError) {
    return <div>error</div>;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && !data ? (
          <EqulizerLoader key="Loader" />
        ) : (
          <>
            <MainLayout param={params}>
              <div className="artist_name">
                <h2> {data!.artist_name}</h2>
              </div>
              <Divider />
              <ArtistInfo
                wiki_info={data!.wiki_info}
                wiki_image={data!.wiki_image}
                country={data!.country}
                country_code={data!.country_code}
                begin_date_year={data!.begin_date_year}
                end_date_year={data!.end_date_year}
                tags={data!.tags}
              />
              <Divider />
              <YoutubeSection youtube_clips={data!.youtube_clips} />
              {data?.albums ? (
                <ReleasesSection
                  releases={data.albums}
                  title="Albumy studyjne"
                  icon={<IconDisc size={34} />}
                />
              ) : null}
              {data?.extended_plays ? (
                <ReleasesSection
                  releases={data.extended_plays}
                  title="EP-ki"
                  icon={<IconDisc size={34} />}
                />
              ) : null}
              {data?.compilations ? (
                <ReleasesSection
                  releases={data.compilations}
                  title="Kompilacje"
                  icon={<IconDisc size={34} />}
                />
              ) : null}
            </MainLayout>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Artist;
