import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from './constants';

export interface IArtistData {
  id: number;
  artist_name: string;
  country: string;
  country_code: string;
  artist_type: string;
  begin_date_year: number | null;
  end_date_year: number | null;
  wikipedia_suffix: string;
  wiki_info?: string | null;
  wiki_image?: string | null;
}
// TODO porządki i interfaces

const ARTIST_QUERY = `
SELECT artist.id,
       artist.name AS artist_name,
       country.name AS country,
       country.iso_3 AS country_code,
       artist_type.name AS artist_type,
       artist.begin_date_year,
       artist.end_date_year,
       artist.wikipedia_suffix,
       array_agg(tag.name) as tags,

    (SELECT json_agg(albums)
     FROM
         (SELECT *
          FROM select_release_by_type_and_artist_id($1, 1)) as albums) as albums,

    (SELECT json_agg(extended_plays)
     FROM
         (SELECT *
          FROM select_release_by_type_and_artist_id($1, 3)) as extended_plays) as extended_plays,

    (SELECT json_agg(compilations)
     FROM
         (SELECT *
          FROM select_release_by_type_and_artist_id($1, 4)) as compilations) as compilations,
    
          (SELECT json_agg(youtube_clips)
    FROM
        (SELECT youtube_id, small_image_url, title
        FROM youtube WHERE artist_id=$1) as youtube_clips) as youtube_clips      
FROM artist
INNER JOIN country ON artist.country_id = country.id
INNER JOIN artist_type ON artist.artist_type_id=artist_type.id
LEFT JOIN artist_tag ON artist_tag.artist_id = artist.id
LEFT JOIN tag ON tag.id = artist_tag.tag_id
WHERE artist.id=$1
GROUP BY country.name,
         country.iso_3,
         artist.id,
         artist_type.name
`;

// export const releaseQuery: string = `
// SELECT release.id, release.name as release_name, artist.name as artist, cover.front_big,
// (extract(year from release.first_release_date)::INTEGER) as release_year,
// (SELECT convert_milisecond_to_minutes(SUM(track.length))) as total_time
// FROm release
// INNER JOIN track ON track.release_id=release.id
// INNER JOIN artist ON release.artist_id = artist.id
// LEFT JOIN cover ON cover.release_id=release.id
// WHERE release.id=$1
// GROUP BY release.id, release.name, artist.name,cover.front_big`;

const tracks = `
SELECT
  release.id,
  release.name,
  release_type.name as release_type,
  artist.name as artist,
  cover.front_big,
  cover.front_small,
  (
    extract(
      year
      from
        release.first_release_date
    )::INTEGER
  ) as release_year,

  (
    SELECT
      convert_milisecond_to_minutes (SUM(track.length))
  ) as total_time,
  (
    SELECT
      json_agg(y) as tracks
    FROM
      (
        SELECT
          track.id,
          track.name,
          track.position,
          (
            SELECT
              convert_milisecond_to_minutes (track.length)
          ) as time_sec
        FROM
          track
          JOIN release ON release.id = track.release_id
        WHERE
          release.id = $1
        ORDER BY
          track.position
      ) y
  )
FROM
  release
  INNER JOIN track ON track.release_id = release.id
  INNER JOIN artist ON release.artist_id = artist.id
  LEFT JOIN cover ON cover.release_id = release.id
  JOIN release_type ON release.release_type_id=release_type.id
WHERE
  release.id = $1
GROUP BY
  release.id,
  release_type.name,
  release.name,
  artist.name,
  cover.front_big,
  cover.front_small

`;

@Injectable()
export class AppService {
  constructor(@Inject(PG_CONNECTION) private conn: any) {}
  async getRandomYT(qty: number) {
    const artists = await this.conn.query(
      `
            Select
          youtube.youtube_id,
          youtube.small_image_url,
          youtube.title,
          artist.name,
          array_agg(DISTINCT tag.name) as genres
        from
          youtube
          JOIN artist on artist.id = youtube.artist_id
          JOIN artist_tag ON artist.id = artist_tag.artist_id
          JOIN tag ON artist_tag.tag_id = tag.id
        group by
        artist.name,
          youtube.youtube_id,
          youtube.small_image_url,
          youtube.title
        order by
          random()
        limit
          $1
    `,
      [qty],
    );
    return artists.rows;
  }

  public async getInitData() {
    const artistsList = await this.conn.query(`
    with SELECT_NAMES AS
        (SELECT artist.id,
                artist.name,
                CASE
                    WHEN strpos(artist.name, 'The ')=1 THEN substring(artist.name, 5)
                    ELSE artist.name
                END AS sort_names
         FROM artist
         GROUP BY artist.id,
                  artist.name
         ORDER BY sort_names)
    SELECT id,
           name
    FROM SELECT_NAMES
    ORDER BY LOWER(sort_names);
    `);

    const dbStatistics = await this.conn.query(`  SELECT 
    (SELECT COUNT(id) FROM artist) AS artists_qty,
    (SELECT COUNT(id) FROM release) AS releases_qty,
    (SELECT COUNT(id) FROM track) AS tracks_qty,
    (SELECT COUNT(id) FROM youtube) AS youtube_movies_qty
    `);

    return {
      artistsList: artistsList.rows,
      dbStatistics: dbStatistics.rows[0],
    };
  }

  public async getArtistData(id: number): Promise<IArtistData> {
    const artist = await this.conn.query(ARTIST_QUERY, [id]);
    if (!artist.rows.length)
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);

    return artist.rows[0];
  }

  public async getReleaseData(id: number) {
    const release = await this.conn.query(tracks, [id]);
    if (!release.rows.length)
      throw new HttpException('Relese not found', HttpStatus.NOT_FOUND);
    return release.rows[0];
  }
}
