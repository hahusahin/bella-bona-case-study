import type { StatsSection } from "@/types/sanity";

interface StatsProps {
  data: StatsSection;
}

export function Stats({ data }: StatsProps) {
  if (!data?.items?.length) return null;

  return (
    <section className="bg-white py-12 md:py-16 border-b border-gray-100" aria-label="Key statistics">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          {data.items.map((item, i) => (
            <div
              key={item._key}
              className={`reveal py-8 sm:py-4 text-center ${i > 0 ? "sm:pl-12" : ""} ${i < data.items.length - 1 ? "sm:pr-12" : ""}`}
            >
              <p className="text-4xl md:text-5xl font-semibold text-text-primary leading-none mb-3">
                {item.value}
              </p>
              <p className="text-base text-separator">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
