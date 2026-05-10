import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import type { HeroSection } from "@/types/sanity";

interface HeroProps {
  data: HeroSection;
}

export function Hero({ data }: HeroProps) {
  const heroImageUrl = data.heroImage?.asset
    ? urlFor(data.heroImage).width(900).height(700).fit("crop").url()
    : null;

  return (
    <section className="bg-white py-4 sm:py-6" aria-label="Hero">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 lg:items-stretch">

          {/* Left card — content */}
          <div className="bg-green-900 rounded-3xl p-8 sm:p-10 lg:p-12 flex flex-col lg:w-[46%]">
            <h1 className="text-lime-200 font-semibold text-4xl sm:text-5xl xl:text-6xl leading-tight">
              {data.headline}
            </h1>

            {data.subheadline && (
              <p className="mt-6 text-white/80 text-base sm:text-lg leading-relaxed">
                {data.subheadline}
              </p>
            )}

            <div className="mt-auto pt-10">
              <Link
                href={data.ctaHref ?? "#contact"}
                className="inline-flex items-center px-7 py-3.5 rounded-full border-2 border-lime-200 text-lime-200 font-medium text-sm hover:bg-lime-200 hover:text-green-900 transition-colors"
              >
                {data.ctaLabel}
              </Link>
            </div>
          </div>

          {/* Right — hero image */}
          {heroImageUrl ? (
            <div className="relative flex-1 min-h-70 sm:min-h-95 lg:min-h-120 rounded-3xl overflow-hidden">
              <Image
                src={heroImageUrl}
                alt={(data.heroImage as { alt?: string })?.alt ?? "Bella&Bona team lunch"}
                fill
                sizes="(max-width: 1024px) 100vw, 54vw"
                className="object-cover object-center"
                preload={true}
                fetchPriority="high"
                loading="eager"
              />
            </div>
          ) : (
            /* Placeholder when no image is set in Sanity yet */
            <div className="flex-1 min-h-70 lg:min-h-120 rounded-3xl bg-cream-100 lg:w-[54%]" />
          )}

        </div>
      </div>
    </section>
  );
}
