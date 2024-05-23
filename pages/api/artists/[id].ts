// /pages/api/artists/[id].ts
import { NextApiRequest, NextApiResponse } from "next";
import { Artist } from "../../../models/Artist";

const artists: Artist[] = [
  // Seed data or fetch from external API
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const artist = artists.find((a) => a.id === id);

  if (artist) {
    res.status(200).json(artist);
  } else {
    res.status(404).json({ message: "Artist not found" });
  }
}
