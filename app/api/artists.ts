// pages/api/artists.ts
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db();

  switch (req.method) {
    case "GET":
      const artists = await db.collection("artists").find({}).toArray();
      res.status(200).json(artists);
      break;
    case "POST":
      const artist = req.body;
      await db.collection("artists").insertOne(artist);
      res.status(201).json(artist);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
