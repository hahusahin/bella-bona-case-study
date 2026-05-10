import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import type { CtaSection } from "@/types/sanity";

interface FinalCTAProps {
  data: CtaSection;
}

export function FinalCTA({ data }: FinalCTAProps) {
  if (!data) return null;

  const personImageUrl = data.contactPersonImage?.asset
    ? urlFor(data.contactPersonImage).width(120).height(120).fit("crop").url()
    : null;

  return (
    <section className="bg-lime-50 py-16 md:py-24" aria-label="Contact and call to action">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

          {/* Left — green card with contact info */}
          <div className="bg-green-900 rounded-3xl p-8 md:p-12 flex flex-col lg:w-[42%]">
            <h2 className="text-3xl md:text-4xl font-semibold text-lime-200 leading-tight mb-4">
              {data.headline}
            </h2>
            {data.subheadline && (
              <p className="text-white/80 text-base leading-relaxed mb-8">
                {data.subheadline}
              </p>
            )}

            {/* Contact person */}
            {(personImageUrl || data.contactPersonName) && (
              <div className="mt-auto flex items-center gap-4">
                {personImageUrl && (
                  <Image
                    src={personImageUrl}
                    alt={data.contactPersonName ?? "Contact person"}
                    width={56}
                    height={56}
                    className="rounded-full object-cover w-14 h-14 shrink-0"
                  />
                )}
                {data.contactPersonName && (
                  <div>
                    <p className="font-semibold text-white text-sm">{data.contactPersonName}</p>
                    {data.contactPersonTitle && (
                      <p className="text-white/70 text-xs mt-0.5">{data.contactPersonTitle}</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right — CTA / booking */}
          <div className="flex-1 bg-white rounded-3xl p-8 md:p-12 flex flex-col justify-center">
            <h3 className="text-xl md:text-2xl font-semibold text-text-primary mb-3">
              Schedule a free appointment
            </h3>
            <p className="text-separator text-base mb-8 leading-relaxed">
              Pick a time that works for you and we&apos;ll walk you through how Bella&amp;Bona works for your team.
            </p>
            <Link
              href={data.ctaHref ?? "#contact"}
              className="self-start inline-flex items-center px-8 py-4 rounded-full bg-green-900 text-white font-medium text-base hover:bg-green-800 transition-colors"
            >
              {data.ctaLabel}
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
