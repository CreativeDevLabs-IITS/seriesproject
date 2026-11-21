import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { dressCode } from "../../data/wedding";
import SectionHeading from "../common/SectionHeading";

export default function DressCode() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = sectionRef.current.querySelectorAll("[data-reveal]");
      if (reducedMotion) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }
      gsap.set(targets, { opacity: 0, y: 26 });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="dress-code" ref={sectionRef} className="relative bg-ivory px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <div data-reveal>
          <SectionHeading
            eyebrow="Attire"
            title={dressCode.heading}
            description={dressCode.intro}
          />
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-6 sm:gap-8">
          {dressCode.palette.map((color) => (
            <div key={color.hex} data-reveal className="flex flex-col items-center gap-3">
              <span
                className="h-14 w-14 rounded-full border border-espresso/10 shadow-[0_8px_20px_-10px_rgba(56,43,37,0.5)] transition-transform duration-300 hover:scale-110 sm:h-16 sm:w-16"
                style={{ backgroundColor: color.hex }}
                aria-hidden="true"
              />
              <span className="font-body text-[11px] uppercase tracking-[0.15em] text-mocha">
                {color.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {dressCode.guidance.map((item) => (
            <div
              key={item.title}
              data-reveal
              className="border border-taupe/30 bg-champagne/30 px-8 py-8 text-center"
            >
              <h3 className="font-display text-xl text-espresso sm:text-2xl">{item.title}</h3>
              <div className="ornament my-4 text-taupe" aria-hidden="true" />
              <p className="font-body text-sm leading-relaxed text-mocha">{item.description}</p>
            </div>
          ))}
        </div>

        <p data-reveal className="mt-10 text-center font-body text-sm italic text-terracotta">
          {dressCode.exclusions}
        </p>
      </div>
    </section>
  );
}
