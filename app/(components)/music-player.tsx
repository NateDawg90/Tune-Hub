// MusicPlayer.tsx
'use client';
import { useMusicPlayer } from '@/store/music-player-context';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Song } from '../(models)/Song';
import { PauseIcon, PlayIcon } from './icons';
import VolUp from 'icon/volume-high-solid.svg';
import VolDown from 'icon/volume-off-solid.svg';

const MusicPlayer = () => {
  const [songData, setSongData] = useState<Song>();
  const {
    currentSong,
    isPlaying,
    pauseSong,
    playSong,
    resumeSong,
    volume,
    setVolume,
  } = useMusicPlayer();

  useEffect(() => {
    if (currentSong) {
      const fetchSong = async () => {
        try {
          const response = await axios.get(
            `/api/songs/${currentSong._id}`
          );
          console.log('response', response);
          setSongData(response.data);
        } catch (err) {
          console.error('Error fetching song:', err);
        }
      };

      fetchSong();
    }
  }, [currentSong]);

  if (!currentSong) {
    return null;
  }

  const handleVolumeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVolume(Number(event.target.value));
  };

  const truncatedSongName =
    currentSong.name.length > 30
      ? currentSong.name.substring(0, 30) + '...'
      : currentSong.name;

  const handlePlayPauseClick = () => {
    if (isPlaying) {
      pauseSong();
    } else if (currentSong.previewUrl) {
      resumeSong();
    } else {
      playSong(currentSong);
    }
  };
  return (
    <div className="fixed bottom-0 w-full bg-jet-500 text-silver p-4 shadow-md flex items-center justify-between">
      <div className="flex items-center">
        <button
          onClick={handlePlayPauseClick}
          className="focus:outline-none"
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        <div className="ml-4">
          <p className="text-sm">{`Now Playing: ${truncatedSongName} by ${songData?.album.artist.name}`}</p>
        </div>
      </div>
      <div className="flex items-center">
        <VolDown className=" h-6 volume-icon" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="mx-2 w-32 h-2 bg-gray-700 rounded-full appearance-none slider-thumb"
        />
        <VolUp className=" h-6 volume-icon" />
      </div>
    </div>
  );
};

export default MusicPlayer;
