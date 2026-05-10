import Link from "next/link";
import type { FooterData } from "@/types/sanity";

interface FooterProps {
  data: FooterData;
}

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  google: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
      <path d="M12 11h8.5c.1.6.2 1.2.2 2 0 5.1-3.4 8.7-8.7 8.7C5.8 21.7 1 16.9 1 11S5.8.3 12 .3c2.8 0 5.1 1 6.9 2.6l-2.8 2.8C15 4.6 13.6 4 12 4 8.1 4 5 7.1 5 11s3.1 7 7 7c3.1 0 5.5-1.8 6.4-4.5H12v-2.5z" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  ),
};

function NavColumn({ title, links }: { title: string; links: FooterData["quickLinks"] }) {
  if (!links?.length) return null;
  return (
    <div>
      <h3 className="font-semibold text-white text-sm mb-3">{title}</h3>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link._key}>
            <Link
              href={link.href}
              target={link.isExternal ? "_blank" : undefined}
              rel={link.isExternal ? "noopener noreferrer" : undefined}
              className="text-white/75 text-sm hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer({ data }: FooterProps) {
  return (
    <footer className="bg-green-900 text-white">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact + social */}
          <div>
            <h3 className="font-semibold text-white text-sm mb-3">Folge uns!</h3>
            <a
              href="mailto:fragen@bellabona.com"
              className="flex items-center gap-2 text-white/75 text-sm hover:text-white transition-colors mb-4"
            >
              {SOCIAL_ICONS.email}
              fragen@bellabona.com
            </a>
            {data.socialLinks?.length > 0 && (
              <div className="flex gap-3 flex-wrap">
                {data.socialLinks.map((link) => (
                  <a
                    key={link._key}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="text-white/75 hover:text-white transition-colors"
                  >
                    <span className="text-sm">{link.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          <NavColumn title="Schnellzugriffe" links={data.quickLinks} />
          <NavColumn title="Entdecken" links={data.exploreLinks} />
          <NavColumn title="Unsere Richtlinien" links={data.policyLinks} />
        </div>
      </div>

      {/* BELLABONA wordmark */}
      <div className="overflow-hidden">
        <p
          className="text-lime-200 font-black text-[18vw] leading-none tracking-tight select-none"
          aria-hidden="true"
        >
          BELLABONA
        </p>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-white/10 mx-4 sm:mx-8">
        <p className="text-center text-white/60 text-sm py-4">
          {data.copyrightText}
        </p>
      </div>
    </footer>
  );
}
