import { couple, wedding } from "../data/wedding";

export default function Footer() {
  return (
    <footer className="bg-espresso px-5 py-10 text-center text-ivory/70">
      <p className="font-display text-lg italic tracking-wide text-ivory">{couple.fullNames}</p>
      <p className="mt-2 font-body text-xs tracking-[0.3em] uppercase">{wedding.dateLabelShort}</p>
      <div className="ornament mx-auto my-5 w-full max-w-[160px] text-ivory/30" aria-hidden="true" />
      <p className="font-body text-[11px] text-ivory/50">
        Made with love for our family and friends.
      </p>
    </footer>
  );
}
