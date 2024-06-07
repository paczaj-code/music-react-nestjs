export interface IReleaseTypes {
  name: string;
  id: number;
  front_small: string;
  front_big: string;
  first_release_date: string;
}

export interface IDatabaseInfo {
  artists_qty: string;
  releases_qty: string;
  tracks_qty: string;
  youtube_movies_qty: string;
}

export interface IYoutubeData {
  youtube_id: string;
  small_image_url: string;
  title: string;
}

export interface IArtistBaseData {
  artist_name: string;
  artist_type: string;
  country: string;
  country_code: string;
  begin_date_year: number;
  end_date_year: number;
  wiki_info: string | null;
  wiki_image: string | null;
  tags: string[];
}

export interface IArtistDataTypes extends IArtistBaseData {
  youtube_clips: IYoutubeData[];
  albums: IReleaseTypes[];
  extended_plays: IReleaseTypes[];
  compilations: IReleaseTypes[];
}

export interface ITrack {
  id: number;
  name: string;
  position: number;
  time_sec: string;
}
export interface IReleaseTypes {
  name: string;
  id: number;
  front_small: string;
  front_big: string;
  first_release_date: string;
  artist?: string;
  release_type?: string;
  release_year?: number;
  total_time?: string;
}

export interface IReleaseDetails extends IReleaseTypes {
  tracks?: ITrack[];
}
