// Real client words only (hard rule: never invent testimonials). Each entry is a
// verbatim Facebook recommendation from the Saltwater Studio page
// (facebook.com/profile.php?id=61590875267901), pulled 2026-10-02. No edits, no
// paraphrase — if a quote needs cleaning up to look good, it doesn't ship.
// No Review/AggregateRating schema on purpose: Google ignores self-serving
// review markup, so these are plain content.

export interface Testimonial {
  quote: string;
  name: string;
  /** Where the words came from, shown with the quote — provenance is the point. */
  source: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "I highly recommend Saltwater Studio! They did an excellent job setting up our website and were instrumental in helping us get our business listed and found on Google. Beyond just the initial setup, they also help us run our Facebook and website, ensuring we stay actively posting. Their expertise has been a huge help to our business, and I am very happy with the results.",
    name: "Beach House Moving",
    source: "Facebook recommendation",
  },
  {
    quote:
      "Everything Travis is extremely professional always goes above and beyond and making setting up a website simple and easy highly recommended",
    name: "Zach Packard",
    source: "Facebook recommendation",
  },
];
