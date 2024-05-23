// /pages/api/songs.ts
import { NextApiRequest, NextApiResponse } from "next";
import { Song } from "../../models/Song";

const songs: Song[] = [
  // Seed data or fetch from external API
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { albumId } = req.query;
    const albumSongs = songs.filter((s) => s.albumId === albumId);
    res.status(200).json(albumSongs);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
