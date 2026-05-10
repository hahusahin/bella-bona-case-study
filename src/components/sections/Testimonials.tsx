import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import type { TestimonialsSection } from "@/types/sanity";

interface TestimonialsProps {
  data: TestimonialsSection;
}

export function Testimonials({ data }: TestimonialsProps) {
  if (!data?.items?.length) return null;

  return (
    <section className="bg-lime-200 py-16 md:py-24" aria-label="Customer testimonials">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-4xl font-semibold text-text-primary mb-12 text-center">
          {data.heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.items.map((item) => {
            const avatarUrl = item.avatar?.asset
              ? urlFor(item.avatar).width(80).height(80).fit("crop").url()
              : null;

            return (
              <blockquote
                key={item._key}
                className="reveal bg-white rounded-2xl p-8 flex flex-col gap-6"
              >
                <p className="text-text-primary leading-relaxed flex-1">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="flex items-center gap-3">
                  {avatarUrl && (
                    <Image
                      src={avatarUrl}
                      alt={item.author}
                      width={40}
                      height={40}
                      className="rounded-full object-cover w-10 h-10"
                    />
                  )}
                  <div>
                    <cite className="not-italic font-semibold text-sm text-text-primary">
                      {item.author}
                    </cite>
                    {item.company && (
                      <p className="text-xs text-separator">{item.company}</p>
                    )}
                  </div>
                </footer>
              </blockquote>
            );
          })}
        </div>
      </div>
    </section>
  );
}
