import React from "react";
import { IReleaseTypes } from "../../types/types.ts";
import AlbumImage from "../AlbumImage/AlbumImage";
import Section from "../Section/Section.tsx";

const ReleasesSection = ({
  releases,
  title,
  icon,
}: {
  releases: IReleaseTypes[];
  title?: string;
  icon?: React.ReactNode;
}) => {
  return (
    <Section title={title} titleIcon={icon} className="section_releases">
      {releases &&
        releases.map((release) => (
          <AlbumImage release={release} key={release.id}></AlbumImage>
        ))}
    </Section>
  );
};

export default ReleasesSection;
