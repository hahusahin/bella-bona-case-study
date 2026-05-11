import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import type { FeaturesSection } from "@/types/sanity";

interface FeaturesProps {
  data: FeaturesSection;
}

function CheckIcon() {
  return (
    <div
      className="shrink-0 w-5 h-5 rounded-full bg-green-900 flex items-center justify-center mt-0.5"
      aria-hidden
    >
      <svg
        className="w-3 h-3 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );
}

export function Features({ data }: FeaturesProps) {
  if (!data) return null;

  const appImageUrl = data.appImage?.asset
    ? urlFor(data.appImage).width(500).url()
    : null;

  const hasStatCards = (data.statCards?.length ?? 0) > 0;
  const hasFeatureItems = (data.featureItems?.length ?? 0) > 0;

  return (
    <section
      className="bg-white py-16 md:py-24"
      aria-label="Features and benefits"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {data.sectionTitle && (
          <h2 className="reveal mx-auto text-2xl md:text-4xl font-semibold text-text-primary text-center mb-10 max-w-3xl">
            {data.sectionTitle}
          </h2>
        )}

        {hasStatCards && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {data.statCards!.map((card, i) => (
              <div
                key={card._key}
                className="reveal bg-green-900 rounded-2xl p-6 md:p-8 text-white"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <p className="text-4xl md:text-5xl font-semibold text-lime-200 leading-none mb-2">
                  {card.value}
                </p>
                <p className="font-semibold text-base mb-3">{card.label}</p>
                {card.description && (
                  <p className="text-white/70 text-sm leading-relaxed">
                    {card.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {(hasFeatureItems || appImageUrl) && (
          <div className="flex flex-col md:flex-row gap-10 md:gap-8 items-stretch">
            {appImageUrl && (
              <div className="reveal flex-1 flex justify-center md:justify-start">
                <div className="relative w-56 md:w-72 lg:w-150">
                  <Image
                    src={appImageUrl}
                    alt={data.appImage?.alt ?? "Bella&Bona app"}
                    width={288}
                    height={460}
                    className="object-contain w-full h-auto"
                  />
                </div>
              </div>
            )}

            {hasFeatureItems && (
              <div className="reveal flex-1 bg-stone-50 rounded-3xl p-8 md:p-10">
                <ul className="flex flex-col gap-6">
                  {data.featureItems!.map((item) => (
                    <li key={item._key} className="flex items-start gap-4">
                      <CheckIcon />
                      <div>
                        <p className="font-semibold text-text-primary text-base leading-snug mb-1">
                          {item.title}
                        </p>
                        {item.description && (
                          <p className="text-text-primary/70 text-sm leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
