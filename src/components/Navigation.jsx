import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "../data/wedding";
import { useActiveSection } from "../hooks/useActiveSection";

const sectionIds = navLinks.map((link) => link.id);

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const activeId = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const scrollToSection = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const barClasses = scrolled || open
    ? "bg-ivory/95 backdrop-blur-sm shadow-[0_1px_0_rgba(56,43,37,0.08)]"
    : "bg-transparent";

  const textTone = scrolled || open ? "text-espresso" : "text-ivory";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${barClasses}`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8 py-4" aria-label="Primary">
        <a
          href="#home"
          onClick={scrollToSection("home")}
          className={`font-display text-xl tracking-wide italic ${textTone}`}
        >
          A &amp; M
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={scrollToSection(link.id)}
                className={`font-body text-sm tracking-wide transition-colors duration-300 relative pb-1 ${textTone} ${
                  activeId === link.id ? "opacity-100" : "opacity-80 hover:opacity-100"
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-0 -bottom-0.5 h-px bg-terracotta transition-all duration-300 ${
                    activeId === link.id ? "w-full" : "w-0"
                  }`}
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#details"
          onClick={scrollToSection("details")}
          className={`hidden md:inline-flex items-center border px-5 py-2 font-body text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
            scrolled
              ? "border-espresso text-espresso hover:bg-espresso hover:text-ivory"
              : "border-ivory text-ivory hover:bg-ivory hover:text-espresso"
          }`}
        >
          Wedding Details
        </a>

        <button
          type="button"
          className={`md:hidden ${textTone}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      <div
        className={`md:hidden grid transition-[grid-template-rows] duration-400 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden bg-ivory/98 backdrop-blur-sm">
          <ul className="flex flex-col items-center gap-6 py-8">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={scrollToSection(link.id)}
                  className={`font-display text-2xl text-espresso ${
                    activeId === link.id ? "text-terracotta" : ""
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#details"
                onClick={scrollToSection("details")}
                className="mt-2 inline-flex items-center border border-espresso px-6 py-2 font-body text-xs tracking-[0.2em] uppercase text-espresso"
              >
                Wedding Details
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
