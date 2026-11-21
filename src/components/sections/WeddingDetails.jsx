import { useEffect, useRef } from "react";
import { Calendar, Clock, Landmark, MapPin, PartyPopper } from "lucide-react";
import { gsap } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { ceremony, reception } from "../../data/wedding";
import SectionHeading from "../common/SectionHeading";

const cards = [
  { ...ceremony, icon: Landmark },
  { ...reception, icon: PartyPopper },
];

export default function WeddingDetails() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = sectionRef.current.querySelectorAll("[data-reveal]");
      if (reducedMotion) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }
      gsap.set(targets, { opacity: 0, y: 30 });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="details" ref={sectionRef} className="relative bg-sand/30 px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div data-reveal>
          <SectionHeading
            eyebrow="Save the Date"
            title="The Celebration"
            description="Every detail is a token of this new beginning — here is where, and when, we'll say our vows."
          />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2">
          {cards.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                data-reveal
                className="flex flex-col items-center gap-5 border border-taupe/30 bg-ivory px-8 py-12 text-center shadow-[0_20px_50px_-30px_rgba(56,43,37,0.35)]"
              >
                <Icon className="text-terracotta" size={30} strokeWidth={1.25} />
                <span className="font-body text-xs uppercase tracking-[0.3em] text-terracotta">
                  {item.label}
                </span>
                <h3 className="font-display text-2xl text-espresso sm:text-3xl">{item.venue}</h3>
                <p className="max-w-xs font-body text-sm leading-relaxed text-mocha">
                  {item.address}
                </p>

                <div className="ornament w-full max-w-[160px] text-taupe" aria-hidden="true" />

                <div className="flex flex-col items-center gap-2 font-body text-sm text-espresso">
                  <span className="flex items-center gap-2">
                    <Calendar size={16} className="text-mocha" />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={16} className="text-mocha" />
                    {item.time}
                  </span>
                </div>

                <a
                  href={item.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 border border-espresso px-5 py-2 font-body text-xs uppercase tracking-[0.2em] text-espresso transition-colors duration-300 hover:bg-espresso hover:text-ivory"
                >
                  <MapPin size={14} />
                  View on Map
                </a>
              </div>
            );
          })}
        </div>

        <p data-reveal className="mt-10 text-center font-body text-xs italic text-mocha">
          Venue details are subject to final confirmation by the couple.
        </p>
      </div>
    </section>
  );
}
