import { useContext, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IReleaseDetails } from "../../types/types.ts";
import ImageNoAvailable from "./ImageNoAvailable";
import ImageLoading from "./ImageLoading";
import { AppContext } from "../../context/AppContext";
import "react-lazy-load-image-component/src/effects/blur.css";

const AlbumImage = ({
  release,
  withTitle = true,
}: {
  release: IReleaseDetails;
  withTitle?: boolean;
  size?: "small" | "large";
}) => {
  const { setReleaseId, setIsModalVisible, setModalType } =
    useContext(AppContext);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isImageError, setIsImageError] = useState(false);

  const onReleaseClick = (id: number) => {
    setIsModalVisible(true);
    setModalType("release");
    setReleaseId(id);
  };

  return (
    <div className="release_wrapper" onClick={() => onReleaseClick(release.id)}>
      {!isImageLoaded && !isImageError && release.front_small ? (
        <ImageLoading isImageLoaded={isImageLoaded} />
      ) : null}
      {isImageError && !isImageLoaded ? <ImageNoAvailable /> : null}
      {release.front_small ? (
        <LazyLoadImage
          wrapperClassName={`release_image_wrapper ${
            isImageError ? "error" : ""
          }`}
          src={release.front_small}
          alt={release.name}
          effect="blur"
          onLoad={() => setIsImageLoaded(true)}
          onError={() => setIsImageError(true)}
        />
      ) : (
        <ImageNoAvailable />
      )}
      {withTitle ? (
        <div className="release_info_wrapper">
          <p className="release_year">{release.first_release_date}</p>
          <p className="release_title">{release.name}</p>
        </div>
      ) : null}
    </div>
  );
};

export default AlbumImage;
