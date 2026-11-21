import { useEffect, useRef, useState } from "react";
import { Music, Pause } from "lucide-react";
import { music } from "../../data/wedding";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(music.enabled);

  useEffect(() => {
    if (!music.enabled || !audioRef.current) return;
    const audio = audioRef.current;
    const handleError = () => setAvailable(false);
    audio.addEventListener("error", handleError);
    return () => audio.removeEventListener("error", handleError);
  }, []);

  if (!available) return null;

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => setAvailable(false));
      setPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <audio ref={audioRef} src={music.src} loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pause ${music.title}` : `Play ${music.title}`}
        aria-pressed={playing}
        className="group flex h-12 w-12 items-center justify-center rounded-full border border-taupe/40 bg-ivory/90 text-mocha shadow-md backdrop-blur-sm transition-all duration-300 hover:bg-terracotta hover:text-ivory"
      >
        {playing ? (
          <Pause size={18} className={playing ? "animate-pulse" : ""} />
        ) : (
          <Music size={18} />
        )}
      </button>
    </div>
  );
}
