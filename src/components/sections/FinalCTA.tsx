import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import type { CtaSection } from "@/types/sanity";

interface FinalCTAProps {
  data: CtaSection;
}

export function FinalCTA({ data }: FinalCTAProps) {
  if (!data) return null;

  const imageUrl = data.image?.asset
    ? urlFor(data.image).width(600).height(400).fit("crop").url()
    : null;

  return (
    <section className="pb-12 md:pb-16" aria-label="Support and resources">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-lime-50 rounded-3xl px-8 py-10 md:px-12 md:py-14">

          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-green-900 leading-tight mb-4">
              {data.headline}
            </h2>
            {data.description && (
              <p className="text-text-primary text-base leading-relaxed mb-8 max-w-md">
                {data.description}
              </p>
            )}
            <Link
              href={data.ctaHref}
              className="inline-flex items-center px-6 py-3 rounded-full bg-green-900 text-white font-medium text-sm hover:bg-green-800 transition-colors"
            >
              {data.ctaLabel}
            </Link>
          </div>

          {imageUrl && (
            <div className="flex-1 flex justify-end">
              <div className="relative w-full max-w-sm h-56 md:h-72 rounded-2xl overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={data.image?.alt ?? "Bella&Bona meals"}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
