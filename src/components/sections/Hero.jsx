import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { gsap } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { couple, hero, wedding, photos } from "../../data/wedding";

export default function Hero() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const imageWrapRef = useRef(null);
  const overlayRef = useRef(null);
  const eyebrowRef = useRef(null);
  const namesRef = useRef(null);
  const subtitleRef = useRef(null);
  const dateRef = useRef(null);
  const scrollHintRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(
          [imageWrapRef.current, overlayRef.current, eyebrowRef.current, namesRef.current, subtitleRef.current, dateRef.current, scrollHintRef.current],
          { opacity: 1, clipPath: "inset(0% 0 0 0)", x: 0, y: 0, scale: 1 }
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.set(imageWrapRef.current, { clipPath: "inset(100% 0 0 0)" })
        .set(namesRef.current.children, { y: 40, opacity: 0 })
        .set([eyebrowRef.current, subtitleRef.current], { opacity: 0, y: 14 })
        .set(dateRef.current, { opacity: 0, y: 10 })
        .set(scrollHintRef.current, { opacity: 0 })
        .to(imageWrapRef.current, { clipPath: "inset(0% 0 0 0)", duration: 1.6, ease: "power4.inOut" }, 0.1)
        .to(overlayRef.current, { opacity: 1, duration: 1.2 }, 0.2)
        .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.9 }, 1.0)
        .to(namesRef.current.children, { y: 0, opacity: 1, duration: 1, stagger: 0.15 }, 1.2)
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.9 }, 1.6)
        .to(dateRef.current, { opacity: 1, y: 0, duration: 1 }, 2.1)
        .to(scrollHintRef.current, { opacity: 1, duration: 0.8 }, 2.6);

      gsap.to(imageRef.current, {
        scale: 1.12,
        duration: 18,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex h-[100svh] min-h-[640px] w-full items-end justify-center overflow-hidden bg-espresso"
    >
      <div ref={imageWrapRef} className="absolute inset-0">
        <img
          ref={imageRef}
          src={photos.heroPrimary.src}
          alt={photos.heroPrimary.alt}
          className="h-full w-full object-cover object-[68%_22%]"
          fetchPriority="high"
        />
      </div>

      <div
        ref={overlayRef}
        className="absolute inset-0 opacity-0 bg-gradient-to-b from-espresso/35 via-espresso/15 to-espresso/85"
        aria-hidden="true"
      />
      <div className="absolute inset-0 grain" aria-hidden="true" />

      <div className="relative z-10 mx-auto mb-16 flex max-w-xl flex-col items-center border border-ivory/25 bg-espresso/55 px-8 py-9 text-center text-ivory shadow-[0_30px_80px_-35px_rgba(0,0,0,0.65)] backdrop-blur-[3px] sm:mb-20 sm:px-16 sm:py-12">
        <span ref={eyebrowRef} className="font-body text-[11px] sm:text-sm tracking-[0.35em] uppercase text-champagne">
          {hero.eyebrow}
        </span>

        <h1
          ref={namesRef}
          className="mt-5 font-display text-4xl sm:text-6xl md:text-7xl leading-[1.05] italic"
        >
          <span className="block">{couple.groom}</span>
          <span className="my-1 block font-script text-2xl sm:text-3xl not-italic text-rose">&amp;</span>
          <span className="block">{couple.bride}</span>
        </h1>

        <p ref={subtitleRef} className="mt-5 font-serif text-lg sm:text-xl italic text-champagne">
          {hero.subtitle}
        </p>

        <div ref={dateRef} className="mt-6 flex flex-col items-center gap-3">
          <div className="ornament text-sand w-full max-w-[220px]" aria-hidden="true" />
          <p className="font-body text-xs sm:text-sm tracking-[0.3em] uppercase text-ivory">
            {wedding.dateLabelShort}
          </p>
        </div>
      </div>

      <div
        ref={scrollHintRef}
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-ivory/80"
      >
        <span className="font-body text-[10px] tracking-[0.3em] uppercase">{hero.scrollHint}</span>
        <ChevronDown size={18} className={reducedMotion ? "" : "animate-bounce"} />
      </div>
    </section>
  );
}
