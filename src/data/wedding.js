// Central, editable content for the wedding website.
// Update the values below — components read from this file only.

export const couple = {
  groom: "Aaron",
  bride: "Mary Ann",
  fullNames: "Aaron & Mary Ann",
  hashtag: "#AaronAndMaryAnn2027",
};

export const wedding = {
  // ISO date-time with explicit UTC+8 (Asia/Manila) offset.
  dateTimeISO: "2027-01-09T14:00:00+08:00",
  timezone: "Asia/Manila",
  dateLabelLong: "Saturday, January 9, 2027",
  dateLabelShort: "January 09, 2027",
};

export const hero = {
  eyebrow: "Together With Their Families",
  subtitle: "Are Getting Married",
  scrollHint: "Scroll",
};

export const invitation = {
  intro:
    "With hearts full of love and gratitude, we joyfully invite you to celebrate the beginning of our forever.",
  body:
    "Together with their families, request the pleasure of your company as they exchange vows and begin their journey as one.",
};

export const story = {
  heading: "A Love Written in Time",
  paragraphs: [
    "Every love story is beautiful, but ours is our favorite. Through every moment, every smile, and every journey, we found our way to each other. Now, we're ready to begin our forever.",
  ],
};

// Venue details are placeholders — replace with confirmed information.
export const ceremony = {
  label: "The Ceremony",
  venue: "Saint Joseph Parish Church, Matalom",
  address: "Matalom, Leyte, Philippines",
  time: "2:00 PM",
  date: wedding.dateLabelLong,
  mapsUrl: "https://maps.google.com/?q=Saint+Joseph+Parish+Church+Matalom+Leyte",
};

export const reception = {
  label: "The Reception",
  venue: "SJPC Multipurpose Gym",
  address: "Matalom, Leyte, Philippines",
  time: "5:00 PM",
  date: wedding.dateLabelLong,
  mapsUrl: "https://maps.google.com/?q=SJPC+Multipurpose+Gym+Matalom+Leyte",
};

export const dressCode = {
  heading: "Dress to Celebrate",
  intro:
    "We invite our guests to celebrate with us in elegant attire inspired by our warm, earthy wedding palette.",
  palette: [
    { name: "Champagne", hex: "#E8DCCB" },
    { name: "Beige", hex: "#E3D5C0" },
    { name: "Taupe", hex: "#A89580" },
    { name: "Mocha", hex: "#806653" },
    { name: "Terracotta", hex: "#B87962" },
    { name: "Dusty Rose", hex: "#C9A49B" },
    { name: "Ivory", hex: "#F8F3EA" },
  ],
  guidance: [
    {
      title: "Principal Sponsors",
      // Placeholder — confirm formal attire expectations with the couple.
      description:
        "Formal attire in the colors above. [Specific attire guidance to be confirmed by the couple.]",
    },
    {
      title: "Guests",
      description:
        "Semi-formal attire in champagne, beige, taupe, mocha, terracotta, dusty rose, or ivory tones.",
    },
  ],
};

export const gift = {
  heading: "Your Presence Is Our Greatest Gift",
  message:
    "Having you celebrate with us is the greatest gift we could ask for. Should you wish to bless us with something more, a monetary gift would be warmly appreciated.",
};

export const closing = {
  message: "Two hearts. One love. One beautiful beginning.",
  line: "We can't wait to celebrate with you!",
};

export const music = {
  enabled: false, // flips true automatically once a track is present
  src: "/assets/audio/wedding-theme.mp3",
  title: "Our Song",
};

export const photos = {
  heroPrimary: {
    src: "/assets/photos/couple-golden-hour.webp",
    alt: "Aaron and Mary Ann standing together in a golden field at sunrise, holding a bouquet",
  },
  storyPrimary: {
    src: "/assets/photos/couple-floral-bench.webp",
    alt: "Aaron standing behind Mary Ann seated on a wooden bench beneath a floral arch",
  },
  closingPrimary: {
    src: "/assets/photos/couple-golden-hour.webp",
    alt: "Aaron and Mary Ann together at golden hour",
  },
};

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "invitation", label: "Invitation" },
  { id: "story", label: "Our Story" },
  { id: "details", label: "Details" },
  { id: "dress-code", label: "Dress Code" },
  { id: "gifts", label: "Gifts" },
];
