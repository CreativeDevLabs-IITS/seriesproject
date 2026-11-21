import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import { useReducedMotion } from "../hooks/useReducedMotion";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], input, textarea, select, [data-cursor-hover]";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );
  const [hovering, setHovering] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const mql = window.matchMedia("(pointer: fine)");
    const onChange = (e) => setEnabled(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add("custom-cursor-active");

    const dotSpeed = reducedMotion ? 0 : 0.1;
    const ringSpeed = reducedMotion ? 0 : 0.45;
    const setDotX = gsap.quickTo(dotRef.current, "x", { duration: dotSpeed, ease: "power3" });
    const setDotY = gsap.quickTo(dotRef.current, "y", { duration: dotSpeed, ease: "power3" });
    const setRingX = gsap.quickTo(ringRef.current, "x", { duration: ringSpeed, ease: "power3" });
    const setRingY = gsap.quickTo(ringRef.current, "y", { duration: ringSpeed, ease: "power3" });

    const onMove = (e) => {
      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);
    };

    const onOver = (e) => {
      if (e.target.closest?.(INTERACTIVE_SELECTOR)) setHovering(true);
    };
    const onOut = (e) => {
      if (e.target.closest?.(INTERACTIVE_SELECTOR)) setHovering(false);
    };
    const onLeaveWindow = () => {
      gsap.to([dotRef.current, ringRef.current], { opacity: 0, duration: 0.2 });
    };
    const onEnterWindow = () => {
      gsap.to([dotRef.current, ringRef.current], { opacity: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
    };
  }, [enabled, reducedMotion]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className={`pointer-events-none fixed left-0 top-0 z-[200] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-terracotta transition-opacity duration-200 ${
          hovering ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-[200] -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,background-color,border-color] duration-300 ease-out ${
          hovering
            ? "h-14 w-14 border-terracotta bg-terracotta/10"
            : "h-8 w-8 border-terracotta/60 bg-transparent"
        }`}
        aria-hidden="true"
      />
    </>
  );
}
