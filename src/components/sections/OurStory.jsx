import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { story, photos } from "../../data/wedding";

export default function OurStory() {
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const textTargets = textRef.current.querySelectorAll("[data-reveal]");

      if (reducedMotion) {
        gsap.set(imageWrapRef.current, { clipPath: "inset(0% 0 0% 0)" });
        gsap.set(textTargets, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(imageWrapRef.current, { clipPath: "inset(0% 0 100% 0)" });
      gsap.to(imageWrapRef.current, {
        clipPath: "inset(0% 0 0% 0)",
        duration: 1.4,
        ease: "power4.inOut",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      gsap.to(imageRef.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.set(textTargets, { opacity: 0, y: 26 });
      gsap.to(textTargets, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="story" ref={sectionRef} className="relative overflow-hidden bg-ivory py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-y-12 px-5 sm:px-8 md:grid-cols-12 md:gap-x-6">
        <div
          ref={imageWrapRef}
          className="relative order-1 col-span-1 h-[60vh] min-h-[380px] overflow-hidden md:order-1 md:col-span-7 md:col-start-1 md:row-start-1 md:h-[640px]"
        >
          <img
            ref={imageRef}
            src={photos.storyPrimary.src}
            alt={photos.storyPrimary.alt}
            loading="lazy"
            className="h-[118%] w-full object-cover object-top"
          />
          <div className="pointer-events-none absolute inset-0 border border-ivory/40" aria-hidden="true" />
        </div>

        <div
          ref={textRef}
          className="relative order-2 col-span-1 flex flex-col items-start gap-6 md:col-span-5 md:col-start-7 md:row-start-1 md:-ml-16 md:bg-ivory md:p-12 md:shadow-[0_30px_70px_-35px_rgba(56,43,37,0.4)]"
        >
          <span data-reveal className="font-body text-xs tracking-[0.35em] uppercase text-terracotta">
            Our Story
          </span>
          <h2 data-reveal className="font-display text-4xl leading-tight text-espresso sm:text-5xl">
            {story.heading}
          </h2>
          <div data-reveal className="h-px w-16 bg-taupe" aria-hidden="true" />
          {story.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              data-reveal
              className="font-body text-base leading-relaxed text-mocha sm:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
