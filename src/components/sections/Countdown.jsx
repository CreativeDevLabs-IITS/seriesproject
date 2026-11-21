import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useCountdown } from "../../hooks/useCountdown";
import { wedding, couple } from "../../data/wedding";

const units = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

function pad(value) {
  return String(value).padStart(2, "0");
}

export default function Countdown() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const time = useCountdown(wedding.dateTimeISO);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = sectionRef.current.querySelectorAll("[data-reveal]");
      if (reducedMotion) {
        gsap.set(targets, { opacity: 1, y: 0, scale: 1 });
        return;
      }
      gsap.set(targets, { opacity: 0, y: 24, scale: 0.94 });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        stagger: 0.1,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="countdown"
      ref={sectionRef}
      className="relative overflow-hidden bg-espresso px-5 py-24 text-ivory sm:py-32"
    >
      <div className="absolute inset-0 grain" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl text-center">
        <span data-reveal className="font-body text-xs tracking-[0.35em] uppercase text-rose">
          {wedding.dateLabelShort}
        </span>
        <h2 data-reveal className="mt-4 font-display text-4xl italic sm:text-5xl md:text-6xl">
          Counting Down to Forever
        </h2>
        <div data-reveal className="ornament mx-auto mt-6 w-full max-w-[220px] text-sand" aria-hidden="true" />

        {time.done ? (
          <p data-reveal className="mt-14 font-serif text-2xl italic text-champagne sm:text-3xl">
            {couple.fullNames} are married — thank you for celebrating with us!
          </p>
        ) : (
          <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-10">
            {units.map((unit) => (
              <div
                key={unit.key}
                data-reveal
                className="flex flex-col items-center gap-3 border border-ivory/15 px-4 py-8 sm:px-6"
              >
                <span className="font-display text-5xl tabular-nums sm:text-6xl">
                  {pad(time[unit.key])}
                </span>
                <span className="font-body text-xs uppercase tracking-[0.3em] text-sand">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
