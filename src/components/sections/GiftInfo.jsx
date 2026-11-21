import { useEffect, useRef } from "react";
import { Banknote, Gift, Wallet } from "lucide-react";
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
      <div className="mx-auto max-w-3xl">
        <div data-reveal>
          <SectionHeading eyebrow="With Love" title={gift.heading} description={gift.message} />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div data-reveal className="flex flex-col gap-4 border border-taupe/30 bg-ivory px-8 py-9">
            <div className="flex items-center gap-3 text-terracotta">
              <Banknote size={22} strokeWidth={1.25} />
              <h3 className="font-display text-xl text-espresso">Bank Transfer</h3>
            </div>
            <dl className="space-y-2 font-body text-sm text-mocha">
              <div className="flex justify-between gap-4">
                <dt className="text-espresso/70">Bank</dt>
                <dd>{gift.bankTransfer.bank}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-espresso/70">Account Name</dt>
                <dd>{gift.bankTransfer.accountName}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-espresso/70">Account No.</dt>
                <dd>{gift.bankTransfer.accountNumber}</dd>
              </div>
            </dl>
          </div>

          <div data-reveal className="flex flex-col gap-4 border border-taupe/30 bg-ivory px-8 py-9">
            <div className="flex items-center gap-3 text-terracotta">
              <Wallet size={22} strokeWidth={1.25} />
              <h3 className="font-display text-xl text-espresso">Digital Wallets</h3>
            </div>
            <dl className="space-y-3 font-body text-sm text-mocha">
              {gift.digitalWallets.map((wallet) => (
                <div key={wallet.provider} className="flex justify-between gap-4">
                  <dt className="text-espresso/70">{wallet.provider}</dt>
                  <dd className="text-right">
                    {wallet.name}
                    <br />
                    {wallet.number}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div data-reveal className="mt-10 flex items-center justify-center gap-3 text-mocha">
          <Gift size={18} />
          <p className="font-body text-sm italic">
            Account details above are placeholders — to be finalized by the couple.
          </p>
        </div>
      </div>
    </section>
  );
}
