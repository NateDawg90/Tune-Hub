// /components/Home.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Artist } from "@/models/Artist";

const Home = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchArtists = async () => {
      const res = await axios.get("/api/artists");
      setArtists(res.data);
    };
    fetchArtists();
  }, []);

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to Tunehub</h1>
        {/* Add your animation here */}
      </div>
      <input
        type="text"
        placeholder="Search artists..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="artist-list">
        {filteredArtists.slice(0, 20).map((artist) => (
          <Link href={`/artist/${artist.id}`} key={artist.id}>
            <a>
              <div className="artist-card">
                <img src={artist.photo} alt={artist.name} />
                <h3>{artist.name}</h3>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
