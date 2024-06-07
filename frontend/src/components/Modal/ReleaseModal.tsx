import { IReleaseDetails } from "../../types/types.ts";

import ImageNoAvailable from "../AlbumImage/ImageNoAvailable.tsx";
import Divider from "../Divider/Divider.tsx";
import { Track } from "./Track.tsx";
import AlbumImage from "../AlbumImage/AlbumImage.tsx";
// import React from "react";

const ReleaseModal = ({
  release,
}: {
  release: IReleaseDetails | undefined;
}) => {
  return (
    // <>
    <div className="">
      <div className="modal_content">
        <div className="modal_content-top">
          <div className="modal_content-image">
            {release && release.front_big ? (
              // <img src={release.front_big} alt={release.name} />
              <AlbumImage withTitle={false} release={release}></AlbumImage>
            ) : (
              <ImageNoAvailable />
            )}
          </div>
          <div className="modal_content-info">
            <h2>{release?.name}</h2>
            <h4>{release?.artist}</h4>
            <p>{release?.release_year}</p>
          </div>
        </div>
        <Divider />
        <div className="tracks_wrapper">
          {release?.tracks?.map((track) => (
            <Track key={track.id} track={track} />
          ))}
        </div>
      </div>
    </div>

    // </>
  );
};

export default ReleaseModal;
