import { ITrack } from "../../types/types.ts";

export const Track = ({ track }: { track: ITrack }) => {
  return (
    <div className="track_wrapper">
      <div className="track_wrapper-position">{track.position}.</div>
      <div className="track_wrapper-name">{track.name}</div>
      <div className="track_wrapper-time">{track.time_sec}</div>
    </div>
  );
};
