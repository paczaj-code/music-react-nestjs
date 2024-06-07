import { IconBrandYoutubeFilled } from "@tabler/icons-react";
import Divider from "../../components/Divider/Divider";
import { IYoutubeData } from "../../types/types";
import Image from "../../components/Image/Image";
import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

interface IYoutubeSection {
  youtube_clips: IYoutubeData[];
}

const YoutubeSectionElement: React.FC<IYoutubeData> = ({
  small_image_url,
  title,
  youtube_id,
}) => {
  const { isMobile, setYotubeId, setIsModalVisible, setModalType } =
    useContext(AppContext);
  const onYoutubeClick = (id: string) => {
    setIsModalVisible(true);
    setModalType("youtube");
    setYotubeId(id);
  };

  return (
    <div style={{ width: isMobile ? 250 : 350 }}>
      <div
        className="youtube_image_wrapper"
        onClick={() => {
          onYoutubeClick(youtube_id);
        }}
      >
        <Image
          src={small_image_url}
          aspect_ratio="wide"
          alt={youtube_id}
          width={350}
          className="youtube_image"
        />
      </div>
      <p>{title}</p>
    </div>
  );
};

const YoutubeSection: React.FC<IYoutubeSection> = ({ youtube_clips }) => {
  return (
    <section className="youtube_section">
      <div className="section_title">
        <IconBrandYoutubeFilled />
        <h4>Youtube</h4>
      </div>
      <Divider />
      <div className="youtube_elements">
        {youtube_clips.map((clip) => (
          <YoutubeSectionElement
            key={clip.youtube_id}
            small_image_url={clip.small_image_url}
            title={clip.title}
            youtube_id={clip.youtube_id}
          />
        ))}
      </div>
    </section>
  );
};

export default YoutubeSection;
