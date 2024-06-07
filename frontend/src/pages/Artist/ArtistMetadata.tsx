import {
  IconCalendarStar,
  IconTags,
  IconWorldHeart,
} from '@tabler/icons-react';
import { IArtistBaseData } from '../../types/types';

const ArtistMetadataElement = ({
  children,
  icon,
  label,
  children_classes,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  label: string;
  children_classes?: string;
}) => {
  return (
    <li className="artists_metadata_item_wrapper">
      <div className="artists_metadata_item-icon">{icon}</div>
      <div className="artists_metadata_element">
        <div className="artists_metadata_element-label">{label}</div>
        <div
          className={`artists_metadata_element-children ${children_classes}`}
        >
          {children}
        </div>
      </div>
    </li>
  );
};

const ArtistMetadata: React.FC<Partial<IArtistBaseData>> = ({
  country,
  country_code,
  tags,
  begin_date_year,
  end_date_year,
}) => {
  const iconSize = 40;
  return (
    <ul>
      <ArtistMetadataElement
        icon={<IconWorldHeart size={iconSize} />}
        label="Kraj"
        children_classes="country"
      >
        <span>{country}</span>
        <img
          height={32}
          width={32}
          alt="country flag"
          src={`https://flagsapi.com/${country_code}/shiny/32.png`}
        />
      </ArtistMetadataElement>
      <ArtistMetadataElement
        icon={<IconCalendarStar size={iconSize} />}
        label="Lata działalności"
      >
        <span>
          {begin_date_year} - {end_date_year ? end_date_year : 'do teraz'}
        </span>
      </ArtistMetadataElement>
      <ArtistMetadataElement
        icon={<IconTags size={iconSize} />}
        label="Gatunki"
        children_classes="tags"
      >
        {tags &&
          tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
      </ArtistMetadataElement>
    </ul>
  );
};

export default ArtistMetadata;
