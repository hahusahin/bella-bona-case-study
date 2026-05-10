import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import type { FooterData } from "@/types/sanity";

interface FooterProps {
  data: FooterData;
}

function NavColumn({
  title,
  links,
}: {
  title?: string;
  links: FooterData["quickLinks"];
}) {
  if (!links?.length) return null;
  return (
    <div>
      {title && (
        <h3 className="font-semibold text-white text-sm mb-3">{title}</h3>
      )}
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link._key}>
            <Link
              href={link.href}
              target={link.isExternal ? "_blank" : undefined}
              rel={link.isExternal ? "noopener noreferrer" : undefined}
              className="text-white/75 text-sm hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer({ data }: FooterProps) {
  return (
    <footer className="bg-green-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            {data.followTitle && (
              <h3 className="font-semibold text-white text-sm mb-3">
                {data.followTitle}
              </h3>
            )}
            {data.followDescription && (
              <p className="text-white/75 text-sm mb-3">
                {data.followDescription}
              </p>
            )}
            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className="text-white/75 text-sm hover:text-white transition-colors block mb-4"
              >
                {data.email}
              </a>
            )}
            {(data.socialLinks?.length ?? 0) > 0 && (
              <div className="flex gap-3 flex-wrap">
                {data.socialLinks!.map((link) => {
                  const iconUrl = link.icon?.asset
                    ? urlFor(link.icon).width(40).height(40).url()
                    : null;
                  return (
                    <a
                      key={link._key}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="opacity-75 hover:opacity-100 transition-opacity"
                    >
                      {iconUrl ? (
                        <Image
                          src={iconUrl}
                          alt={link.label}
                          width={20}
                          height={20}
                          className="w-5 h-5 object-contain"
                        />
                      ) : (
                        <span className="text-sm">{link.label}</span>
                      )}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          <NavColumn title={data.quickLinksTitle} links={data.quickLinks} />
          <NavColumn title={data.exploreLinksTitle} links={data.exploreLinks} />
          <NavColumn title={data.policyLinksTitle} links={data.policyLinks} />
        </div>
      </div>

      <div className="overflow-hidden flex justify-center">
        {data.wordmarkImage?.asset ? (
          <Image
            src={urlFor(data.wordmarkImage).url()}
            alt=""
            aria-hidden
            width={1500}
            height={250}
            className="h-17.5 md:h-65.75 w-auto max-w-none"
            unoptimized
          />
        ) : (
          <p
            className="text-lime-200 font-black text-[18vw] leading-none tracking-tight select-none"
            aria-hidden
          >
            BELLABONA
          </p>
        )}
      </div>

      <div className="border-t border-white/10 mx-4 sm:mx-8">
        <p className="text-center text-white/60 text-sm py-4">
          {data.copyrightText}
        </p>
      </div>
    </footer>
  );
}
