// MusicPlayerContext.tsx
'use client';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

import { Song } from '@/app/(models)/Song';
interface MusicPlayerContextProps {
  currentSong?: Song;
  isPlaying: boolean;
  playSong: (song: Song) => void;
  pauseSong: () => void;
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

  const playSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const pauseSong = () => {
    setIsPlaying(false);
  };

  return (
    <MusicPlayerContext.Provider
      value={{ currentSong, isPlaying, playSong, pauseSong }}
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
