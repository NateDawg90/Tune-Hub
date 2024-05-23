// /models/Album.ts
import { Song } from "./Song";

export interface Album {
  id: string;
  name: string;
  artwork: string;
  year: number;
  artistId: string;
  songs: Song[];
}
