import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import type { MealsSection } from "@/types/sanity";

interface MealsProps {
  data: MealsSection;
}

export function Meals({ data }: MealsProps) {
  if (!data) return null;

  return (
    <section className="bg-lime-200 py-12 md:py-16" aria-label="Meal options">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading + CTA row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          {data.sectionTitle && (
            <h2 className="text-2xl md:text-4xl font-semibold text-text-primary max-w-xl leading-snug">
              {data.sectionTitle}
            </h2>
          )}
          {data.downloadHref && (
            <Link
              href={data.downloadHref}
              className="self-start sm:self-auto shrink-0 inline-flex items-center px-6 py-3 rounded-full bg-green-900 text-white text-sm font-medium hover:bg-green-800 transition-colors"
            >
              {data.downloadLabel ?? "Download the menu"}
            </Link>
          )}
        </div>

        {/* Meal cards — horizontal scroll on mobile, grid on desktop */}
        {data.meals && data.meals.length > 0 && (
          <div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 lg:grid-cols-4 md:overflow-visible md:pb-0 snap-x snap-mandatory md:snap-none">
            {data.meals.map((meal) => {
              const imgUrl = meal.image?.asset
                ? urlFor(meal.image).width(300).height(300).fit("crop").url()
                : null;

              return (
                <div
                  key={meal._key}
                  className="flex-none w-48 sm:w-56 md:w-auto snap-start bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                  {/* Circular image */}
                  <div className="p-4 pb-0">
                    <div className="relative w-full aspect-square rounded-full overflow-hidden bg-cream-100">
                      {imgUrl ? (
                        <Image
                          src={imgUrl}
                          alt={(meal.image as { alt?: string })?.alt ?? meal.name}
                          fill
                          sizes="(max-width: 768px) 192px, 280px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-cream-200" />
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    {meal.tag && (
                      <p className="text-xs text-separator mb-1">{meal.tag}</p>
                    )}
                    <p className="text-sm font-semibold text-text-primary leading-tight line-clamp-2">
                      {meal.name}
                    </p>
                    {meal.rating && (
                      <div className="flex items-center gap-1 mt-2">
                        <svg className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20" aria-hidden>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-xs text-separator">{meal.rating}</span>
                        {meal.reviewCount && (
                          <span className="text-xs text-separator">({meal.reviewCount})</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
