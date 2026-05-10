import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import type { StepsSection } from "@/types/sanity";

interface StepsProps {
  data: StepsSection;
}

export function Steps({ data }: StepsProps) {
  if (!data) return null;

  return (
    <section className="bg-cream-200 py-16 md:py-24" aria-label="How it works">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-4xl font-semibold text-text-primary mb-12 max-w-2xl">
          {data.heading}
        </h2>

        <div className="flex flex-col gap-12">
          {data.steps?.map((step, i) => {
            const imgUrl = step.image?.asset
              ? urlFor(step.image).width(700).height(450).fit("crop").url()
              : null;

            return (
              <div
                key={step._key}
                className={`reveal flex flex-col md:flex-row gap-8 items-center ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Step text */}
                <div className="flex-1">
                  <span className="inline-block text-sm font-semibold text-green-900 bg-lime-200 rounded-full px-3 py-1 mb-4">
                    {step.number ?? `0${i + 1}`}
                  </span>
                  <h3 className="text-xl md:text-2xl font-semibold text-text-primary mb-3">
                    {step.title}
                  </h3>
                  {step.description && (
                    <p className="text-separator leading-relaxed">{step.description}</p>
                  )}
                </div>

                {/* Step image */}
                {imgUrl && (
                  <div className="flex-1 relative aspect-[4/3] rounded-2xl overflow-hidden w-full">
                    <Image
                      src={imgUrl}
                      alt={step.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {data.ctaLabel && (
          <div className="mt-12 flex justify-center">
            <Link
              href={data.ctaHref ?? "#contact"}
              className="inline-flex items-center px-8 py-4 rounded-full bg-green-900 text-white font-medium text-base hover:bg-green-800 transition-colors"
            >
              {data.ctaLabel}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
