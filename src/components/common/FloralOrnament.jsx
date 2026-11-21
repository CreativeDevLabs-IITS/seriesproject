export default function FloralOrnament({ className = "", flip = false }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={`${className} ${flip ? "-scale-x-100" : ""}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 6c20 4 34 10 44 22 8 10 12 22 12 36"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M14 14c14 2 24 8 30 18"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />
      <circle cx="18" cy="12" r="3" fill="currentColor" opacity="0.7" />
      <circle cx="34" cy="22" r="2.2" fill="currentColor" opacity="0.55" />
      <circle cx="46" cy="34" r="2.6" fill="currentColor" opacity="0.6" />
      <circle cx="58" cy="50" r="2" fill="currentColor" opacity="0.4" />
      <path
        d="M24 10c3 4 3 8 0 12"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M40 26c3 4 3 7 0 11"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}
