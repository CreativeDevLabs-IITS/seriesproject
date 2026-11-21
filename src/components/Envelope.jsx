import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { couple, wedding } from "../data/wedding";
import FloralOrnament from "./common/FloralOrnament";

export default function Envelope({ onOpen }) {
  const overlayRef = useRef(null);
  const envelopeRef = useRef(null);
  const flapRef = useRef(null);
  const letterRef = useRef(null);
  const sealRef = useRef(null);
  const promptRef = useRef(null);
  const [opening, setOpening] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(envelopeRef.current, { opacity: 1, scale: 1 });
        return;
      }
      gsap.fromTo(
        envelopeRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power3.out" }
      );
      gsap.fromTo(
        promptRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: "power2.out" }
      );
    });
    return () => ctx.revert();
  }, [reducedMotion]);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);

    if (reducedMotion) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.4,
        onComplete: onOpen,
      });
      return;
    }

    const tl = gsap.timeline({ onComplete: onOpen });

    tl.to(promptRef.current, { opacity: 0, duration: 0.3 }, 0)
      .to(flapRef.current, { rotateX: -180, duration: 0.9, ease: "power2.inOut" }, 0.1)
      .to(sealRef.current, { opacity: 0, scale: 0.6, duration: 0.4 }, 0.1)
      .fromTo(
        letterRef.current,
        { y: 24, opacity: 0, scale: 0.96 },
        { y: -36, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
        0.55
      )
      .to(
        overlayRef.current,
        { opacity: 0, duration: 0.7, ease: "power2.inOut" },
        1.35
      );
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ivory px-6"
    >
      <div className="absolute inset-0 grain" aria-hidden="true" />

      <div
        ref={envelopeRef}
        className="relative w-full max-w-[22rem] opacity-0"
        style={{ perspective: "1400px" }}
      >
        <FloralOrnament className="absolute -left-10 -top-10 h-20 w-20 text-mocha/70 sm:-left-16 sm:-top-14 sm:h-28 sm:w-28" />
        <FloralOrnament className="absolute -right-10 -bottom-10 h-20 w-20 rotate-180 text-mocha/70 sm:-right-16 sm:-bottom-14 sm:h-28 sm:w-28" flip />

        <div className="relative aspect-[4/3] w-full">
          <div className="absolute inset-0 border border-taupe/50 bg-champagne shadow-[0_30px_70px_-30px_rgba(56,43,37,0.45)]" />

          <div
            ref={letterRef}
            className="absolute inset-x-5 bottom-4 top-7 flex flex-col items-center justify-center gap-2 border border-taupe/40 bg-ivory px-4 py-6 opacity-0"
            style={{ zIndex: 1 }}
          >
            <span className="font-script text-4xl text-terracotta">{couple.fullNames}</span>
            <p className="font-body text-[10px] uppercase tracking-[0.35em] text-mocha">
              You're Invited
            </p>
            <p className="font-body text-[10px] uppercase tracking-[0.25em] text-taupe">
              {wedding.dateLabelShort}
            </p>
          </div>

          <div
            ref={flapRef}
            className="absolute inset-x-0 top-0 h-1/2 bg-sand"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              transformOrigin: "top center",
              transformStyle: "preserve-3d",
              zIndex: 2,
            }}
          />

          <div
            ref={sealRef}
            className="absolute left-1/2 top-[38%] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-espresso/30 bg-ivory font-display text-sm italic text-espresso shadow-sm"
            style={{ zIndex: 3 }}
          >
            A&amp;M
          </div>
        </div>
      </div>

      <div ref={promptRef} className="relative mt-12 flex flex-col items-center gap-5 opacity-0">
        <p className="font-serif text-lg italic text-mocha sm:text-xl">
          {couple.fullNames} request your presence
        </p>
        <button
          type="button"
          onClick={handleOpen}
          className="inline-flex items-center gap-3 border border-espresso px-8 py-3 font-body text-xs uppercase tracking-[0.3em] text-espresso transition-colors duration-300 hover:bg-espresso hover:text-ivory"
        >
          Open Invitation
        </button>
        <button
          type="button"
          onClick={handleOpen}
          className="font-body text-[11px] uppercase tracking-[0.2em] text-taupe underline underline-offset-4 transition-colors hover:text-espresso"
        >
          Skip intro
        </button>
      </div>
    </div>
  );
}
