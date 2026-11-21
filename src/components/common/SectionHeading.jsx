export default function SectionHeading({ eyebrow, title, description, align = "center", className = "" }) {
  const alignment = align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <div className={`flex flex-col ${alignment} gap-4 ${className}`}>
      {eyebrow && (
        <span className="font-body text-xs sm:text-sm tracking-[0.3em] uppercase text-terracotta">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-espresso text-balance">
        {title}
      </h2>
      <div className="ornament text-taupe w-full max-w-[220px]" aria-hidden="true" />
      {description && (
        <p className="font-body text-base sm:text-lg text-mocha max-w-xl text-balance leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
