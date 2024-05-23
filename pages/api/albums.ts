// /pages/api/albums.ts
import { NextApiRequest, NextApiResponse } from "next";
import { Album } from "../../models/Album";

const albums: Album[] = [
  // Seed data or fetch from external API
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { artistId } = req.query;
    const artistAlbums = albums.filter((a) => a.artistId === artistId);
    res.status(200).json(artistAlbums);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
