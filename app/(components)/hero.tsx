export const Hero = () => {
  return (
    <video
      className="w-full"
      preload="none"
      autoPlay
      playsInline
      loop
      muted
    >
      <source src="/video/hero.mp4" type="video/mp4" />
      <track
        src="/path/to/captions.vtt"
        kind="subtitles"
        srcLang="en"
        label="English"
      />
      Your browser does not support the video tag.
    </video>
  );
};
