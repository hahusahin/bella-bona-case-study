import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import type { FeaturesSection } from "@/types/sanity";

interface FeaturesProps {
  data: FeaturesSection;
}

const CheckIcon = () => (
  <svg className="shrink-0 w-5 h-5 text-green-900 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export function Features({ data }: FeaturesProps) {
  if (!data) return null;

  const appImageUrl = data.appImage?.asset
    ? urlFor(data.appImage).width(500).url()
    : null;

  const hasStatCards = (data.statCards?.length ?? 0) > 0;
  const hasFeatureList = (data.featureList?.length ?? 0) > 0;

  return (
    <section className="bg-white py-16 md:py-24" aria-label="Features and benefits">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        {data.sectionTitle && (
          <h2 className="text-2xl md:text-4xl font-semibold text-text-primary mb-10 max-w-2xl">
            {data.sectionTitle}
          </h2>
        )}

        {/* Three green stat cards */}
        {hasStatCards && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {data.statCards!.map((card) => (
              <div key={card._key} className="bg-green-900 rounded-2xl p-6 md:p-8 text-white">
                <p className="text-4xl md:text-5xl font-semibold text-lime-200 leading-none mb-2">
                  {card.value}
                </p>
                <p className="font-semibold text-base mb-3">{card.label}</p>
                {card.description && (
                  <p className="text-white/70 text-sm leading-relaxed">{card.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Feature list + app image */}
        {(hasFeatureList || appImageUrl) && (
          <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
            {/* Bullet list + CTA */}
            {hasFeatureList && (
              <div className="flex-1">
                <ul className="flex flex-col gap-4">
                  {data.featureList!.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckIcon />
                      <span className="text-text-primary text-base leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                {data.ctaLabel && data.ctaHref && (
                  <Link
                    href={data.ctaHref}
                    className="mt-8 inline-flex items-center px-7 py-3.5 rounded-full bg-green-900 text-white font-medium text-sm hover:bg-green-800 transition-colors"
                  >
                    {data.ctaLabel}
                  </Link>
                )}
              </div>
            )}

            {/* App / phone mockup */}
            {appImageUrl && (
              <div className="flex-1 flex justify-center md:justify-end">
                <div className="relative w-64 md:w-80">
                  <Image
                    src={appImageUrl}
                    alt={(data.appImage as { alt?: string })?.alt ?? "Bella&Bona app"}
                    width={320}
                    height={560}
                    className="object-contain w-full h-auto"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
