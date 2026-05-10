import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import type { LogoBarSection } from "@/types/sanity";

interface SocialProofProps {
  data: LogoBarSection;
}

export function SocialProof({ data }: SocialProofProps) {
  return (
    <section
      className="bg-white border-t border-b border-gray-100 py-6"
      aria-label="Social proof"
    >
      <div className="flex justify-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
          {/* Heading — left anchor of the row */}
          <p className="reveal shrink-0 text-4xl text-text-primary">
            {data.heading}
          </p>

          {/* Vertical divider — hidden when items wrap on small screens */}
          <div
            className="hidden sm:block w-px h-5 bg-gray-200 shrink-0"
            aria-hidden
          />

          {/* Logos — fill remaining space */}
          {data.logos?.length > 0 && (
            <div className="reveal flex flex-wrap items-center gap-x-8 gap-y-3">
              {data.logos.map((item) => {
                const logoUrl = item.logo?.asset
                  ? urlFor(item.logo).height(36).url()
                  : null;

                return (
                  <div
                    key={item._key}
                    className="flex items-center grayscale opacity-50 hover:opacity-80 hover:grayscale-0 transition"
                  >
                    {logoUrl ? (
                      <Image
                        src={logoUrl}
                        alt={(item.logo as { alt?: string })?.alt ?? item.name}
                        width={100}
                        height={36}
                        className="object-contain h-6 w-auto"
                      />
                    ) : (
                      <span className="text-separator font-semibold text-sm">
                        {item.name}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
