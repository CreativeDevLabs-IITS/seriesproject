import { useEffect, useRef } from "react";
import { Gift } from "lucide-react";
import { gsap } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { gift } from "../../data/wedding";
import SectionHeading from "../common/SectionHeading";

export default function GiftInfo() {
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
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="gifts" ref={sectionRef} className="relative bg-champagne/40 px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <div data-reveal className="flex justify-center">
          <Gift className="text-terracotta" size={32} strokeWidth={1.25} />
        </div>
        <div data-reveal className="mt-6">
          <SectionHeading eyebrow="With Love" title={gift.heading} description={gift.message} />
        </div>
      </div>
    </section>
  );
}
