import { IArtistBaseData } from "../../types/types";
import parse from "html-react-parser";
import ArtistMetadata from "./ArtistMetadata";
import useElementDimensions from "../../hooks/useElementDimensions";
import React, { useState } from "react";
import Divider from "../../components/Divider/Divider";
import Button from "../../components/Button/Button";
import {
  IconArrowBigDownLinesFilled,
  IconArrowBigUpLinesFilled,
} from "@tabler/icons-react";

const ArtistInfo: React.FC<Partial<IArtistBaseData>> = ({
  wiki_info,
  wiki_image,
  country,
  country_code,
  begin_date_year,
  end_date_year,
  tags,
}) => {
  const [isShowMore, setShowMore] = useState<boolean>(false);

  const { dimensions: metadataDimensions, ref: metadataRef } =
    useElementDimensions();

  const { dimensions: wikiInfoDimensions, ref: wikiInfoRef } =
    useElementDimensions();
  const { height: wikiInfoHeight } = wikiInfoDimensions ?? {};
  const { height: metadataHeight } = metadataDimensions ?? {};

  // const maxHeight = isShowMore ? wikiInfoHeight : metadataHeight;
  return (
    <>
      <section className="artist_info_wrapper">
        <div
          className="artist_info"
          style={{
            maxHeight: isShowMore ? wikiInfoHeight : metadataHeight,
          }}
        >
          <div className="artists_metadata" ref={metadataRef}>
            <ArtistMetadata
              country={country}
              country_code={country_code}
              begin_date_year={begin_date_year}
              end_date_year={end_date_year}
              tags={tags}
            />
          </div>

          <div className="artists_wiki_info" ref={wikiInfoRef}>
            <figure className="wiki_image_wrapper">
              {wiki_image && parse(wiki_image)}
            </figure>
            <div className="wiki_info_wrapper">
              {wiki_info && parse(wiki_info)}
            </div>
            <Divider />
          </div>
        </div>
        <div className="artist_info_buttons">
          <Button
            className="artist_info_button button"
            onClick={() => setShowMore(!isShowMore)}
            style={{
              visibility:
                wikiInfoHeight! + 10 >= metadataHeight! ? "visible" : "hidden",
            }}
          >
            {isShowMore ? (
              <IconArrowBigUpLinesFilled size={19} />
            ) : (
              <IconArrowBigDownLinesFilled size={19} />
            )}
            {isShowMore ? "Mniej" : "Więcej"}
          </Button>
        </div>
      </section>
    </>
  );
};

export default ArtistInfo;
