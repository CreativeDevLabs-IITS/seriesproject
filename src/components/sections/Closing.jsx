import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { couple, wedding, closing, photos } from "../../data/wedding";

export default function Closing() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = contentRef.current.querySelectorAll("[data-reveal]");
      if (reducedMotion) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }
      gsap.set(targets, { opacity: 0, y: 24 });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      });

      gsap.fromTo(
        imageRef.current,
        { scale: 1.15 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="closing"
      ref={sectionRef}
      className="relative flex min-h-[90vh] items-end justify-center overflow-hidden bg-espresso px-5 pb-20 pt-28 sm:pb-28"
    >
      <img
        ref={imageRef}
        src={photos.closingPrimary.src}
        alt={photos.closingPrimary.alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-[center_68%] opacity-70 sm:object-[center_72%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/35 via-40% to-espresso/10" aria-hidden="true" />
      <div className="absolute inset-0 grain" aria-hidden="true" />

      <div
        ref={contentRef}
        className="relative z-10 flex max-w-2xl flex-col items-center border border-ivory/25 bg-espresso/60 px-8 py-10 text-center text-ivory shadow-[0_30px_80px_-35px_rgba(0,0,0,0.65)] backdrop-blur-[3px] sm:px-14 sm:py-12"
      >
        <p data-reveal className="font-serif text-xl italic leading-relaxed text-champagne sm:text-2xl">
          {closing.message}
        </p>

        <div data-reveal className="ornament my-6 w-full max-w-[200px] text-sand" aria-hidden="true" />

        <h2 data-reveal className="font-display text-3xl italic sm:text-4xl md:text-5xl">
          {couple.fullNames}
        </h2>

        <p data-reveal className="mt-4 font-body text-xs tracking-[0.3em] uppercase text-sand sm:text-sm">
          {wedding.dateLabelShort}
        </p>

        <p data-reveal className="mt-8 font-body text-[11px] tracking-[0.25em] uppercase text-ivory/90 sm:text-sm">
          {closing.line}
        </p>
      </div>
    </section>
  );
}
