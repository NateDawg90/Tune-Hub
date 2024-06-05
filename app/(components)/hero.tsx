export const Hero = () => {
  return (
    <div className="relative mb-5">
      <div className="absolute inset-0 flex items-center justify-center text-white z-10 text-sm md:text-xl  max-w-72 md:max-w-2xl mx-auto text-center">
        Welcome to Tunehub! This is the best place for fans to
        discover new artists and their music. Try clicking an album,
        or search for your favorite albums or artists below.
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
