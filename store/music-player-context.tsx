// MusicPlayerContext.tsx
'use client';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
} from 'react';

import { Song } from '@/app/(models)/Song';
interface MusicPlayerContextProps {
  currentSong?: Song;
  isPlaying: boolean;
  playSong: (song: Song) => void;
  pauseSong: () => void;
  resumeSong: () => void;
  volume: number;
  setVolume: (volume: number) => void;
}

const MusicPlayerContext = createContext<
  MusicPlayerContextProps | undefined
>(undefined);

export const MusicPlayerProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [currentSong, setCurrentSong] = useState<Song>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.75); // Volume range from 0.0 to 1.0
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playSong = (song: Song) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setCurrentSong(song);
    setIsPlaying(true);
    audioRef.current = new Audio(song.previewUrl);
    audioRef.current.volume = volume;
    audioRef.current.play();
  };

  const pauseSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resumeSong = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const setVolume = (volume: number) => {
    setVolumeState(volume);
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        volume,
        playSong,
        pauseSong,
        resumeSong,
        setVolume,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};
export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error(
      'useMusicPlayer must be used within a MusicPlayerProvider'
    );
  }
  return context;
};
