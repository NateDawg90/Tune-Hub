// scripts/seed.ts
import clientPromise from "@/lib/mongodb";

async function seed() {
  const client = await clientPromise;
  const db = client.db();

  const artists = [
    {
      name: "Artist 1",
      photo: "url_to_photo",
      genre: "Genre",
      followers: 1000,
    },
    // Add more artists
  ];

  await db.collection("artists").insertMany(artists);
  console.log("Database seeded!");
  process.exit(0);
}

seed();
