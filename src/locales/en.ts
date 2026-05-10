const en = {
  nav: {
    links: {
      employers: "For Employers",
      employees: "For Employees",
      about: "About Us",
      blog: "Blog",
    },
    cta: "Book Free Test Lunch",
  },
  hero: {
    cta: "Start Order",
  },
  socialProof: {
    heading: "Loved by {count}+ customers",
  },
  stats: {
    satisfaction: { value: "9/10", label: "Employee satisfaction" },
    attendance: { value: "30–40%", label: "More teams in the office" },
    delivered: { value: "1.2 MM", label: "Meals delivered in Munich & Berlin" },
  },
  cta: {
    primary: "Book Free Test Lunch",
    secondary: "Download Menu",
  },
  footer: {
    quickLinks: "Quick Links",
    explore: "Explore",
    policies: "Our Policies",
    followUs: "Follow Us",
    copyright: "Bella&Bona Copyright © 2025. Made with love.",
  },
} as const;

export default en;

// DeepWriteable converts all readonly/literal types to mutable strings,
// so de.ts can satisfy Messages with different translated values.
type DeepWriteable<T> = T extends readonly unknown[]
  ? Array<DeepWriteable<T[number]>>
  : T extends object
  ? { -readonly [K in keyof T]: DeepWriteable<T[K]> }
  : T extends string
  ? string
  : T;

export type Messages = DeepWriteable<typeof en>;
