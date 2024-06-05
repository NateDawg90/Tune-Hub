export const Hero = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-black opacity-75">
        Welcome to Tunehub!
      </div>
      <video
        className="w-full bg-black opacity-75"
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
    </div>
  );
};
