import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { couple, invitation, wedding } from "../../data/wedding";
import FloralOrnament from "../common/FloralOrnament";

export default function Invitation() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = cardRef.current.querySelectorAll("[data-reveal]");
      if (reducedMotion) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }
      gsap.set(targets, { opacity: 0, y: 28 });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="invitation"
      ref={sectionRef}
      className="relative bg-champagne/60 px-5 py-24 sm:py-32"
    >
      <div
        ref={cardRef}
        className="relative mx-auto max-w-2xl border border-taupe/40 bg-ivory px-6 py-14 text-center shadow-[0_20px_60px_-25px_rgba(56,43,37,0.35)] sm:px-16 sm:py-20"
      >
        <span className="pointer-events-none absolute inset-3 border border-taupe/25 sm:inset-5" aria-hidden="true" />

        <FloralOrnament className="absolute -left-3 -top-3 h-16 w-16 text-mocha sm:h-20 sm:w-20" />
        <FloralOrnament className="absolute -right-3 -top-3 h-16 w-16 text-mocha sm:h-20 sm:w-20" flip />
        <FloralOrnament className="absolute -bottom-3 -left-3 h-16 w-16 rotate-180 text-mocha sm:h-20 sm:w-20" flip />
        <FloralOrnament className="absolute -bottom-3 -right-3 h-16 w-16 rotate-180 text-mocha sm:h-20 sm:w-20" />

        <p data-reveal className="font-serif text-xl italic leading-relaxed text-mocha sm:text-2xl">
          {invitation.intro}
        </p>

        <div data-reveal className="ornament my-8 text-taupe" aria-hidden="true" />

        <h2 data-reveal className="font-display text-4xl tracking-wide text-espresso sm:text-5xl">
          {couple.fullNames}
        </h2>

        <p data-reveal className="mx-auto mt-8 max-w-md font-body text-base leading-relaxed text-mocha sm:text-lg">
          {invitation.body}
        </p>

        <div data-reveal className="mt-10 inline-flex flex-col items-center gap-2 border-t border-b border-taupe/40 px-10 py-4">
          <span className="font-body text-xs uppercase tracking-[0.35em] text-terracotta">
            Save the Date
          </span>
          <span className="font-display text-2xl text-espresso sm:text-3xl">
            {wedding.dateLabelLong}
          </span>
        </div>
      </div>
    </section>
  );
}
