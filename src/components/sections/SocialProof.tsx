import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import type { LogoBarSection } from "@/types/sanity";

interface SocialProofProps {
  data: LogoBarSection;
}

export function SocialProof({ data }: SocialProofProps) {
  return (
    <section className="bg-white py-12 md:py-16" aria-label="Social proof">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-text-primary mb-8">
          {data.heading}
        </h2>

        {data.logos?.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {data.logos.map((item) => {
              const logoUrl = item.logo?.asset
                ? urlFor(item.logo).height(48).url()
                : null;

              return (
                <div key={item._key} className="flex items-center justify-center h-10 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition">
                  {logoUrl ? (
                    <Image
                      src={logoUrl}
                      alt={(item.logo as { alt?: string })?.alt ?? item.name}
                      width={120}
                      height={40}
                      className="object-contain h-8 w-auto"
                    />
                  ) : (
                    <span className="text-separator font-semibold text-lg">{item.name}</span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
