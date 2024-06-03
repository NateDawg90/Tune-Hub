// MusicPlayer.tsx
'use client';
import { useMusicPlayer } from '@/store/music-player-context';
import Song from './song';

const MusicPlayer = () => {
  const { currentSong, isPlaying, pauseSong, playSong } =
    useMusicPlayer();

  if (!currentSong) {
    return null;
  }
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 text-white">
      <Song
        song={currentSong}
        isPlaying={isPlaying}
        onPlay={playSong}
        onPause={pauseSong}
      />
    </div>
  );
};

export default MusicPlayer;
