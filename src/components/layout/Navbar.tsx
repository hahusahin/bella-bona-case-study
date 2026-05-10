"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { urlFor } from "@/lib/sanity/image";
import type { NavbarData } from "@/types/sanity";

interface NavbarProps {
  data: NavbarData;
}

export function Navbar({ data }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const pathname = usePathname();

  const currentLocale = pathname.startsWith("/de") ? "de" : "en";
  const logoUrl = data.logo?.asset ? urlFor(data.logo).url() : null;
  const hasMore = (data.moreLinks?.length ?? 0) > 0;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-6"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="shrink-0">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={data.logoText ?? "Bella&Bona"}
              width={178}
              height={32}
              style={{ height: "2rem", width: "auto" }}
            />
          ) : (
            <span className="font-black text-xl tracking-tight text-green-900 uppercase">
              {data.logoText}
            </span>
          )}
        </Link>

        {/* Desktop — main links + More dropdown */}
        <ul className="hidden md:flex items-center gap-6">
          {data.links?.map((link) => (
            <li key={link._key}>
              <Link
                href={link.href}
                target={link.isExternal ? "_blank" : undefined}
                rel={link.isExternal ? "noopener noreferrer" : undefined}
                className="text-sm text-text-primary hover:text-green-900 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}

          {hasMore && (
            <li className="relative">
              <button
                type="button"
                className="flex items-center gap-1 text-sm text-text-primary hover:text-green-900 transition-colors"
                onClick={() => setMoreOpen((v) => !v)}
                aria-expanded={moreOpen}
              >
                {data.moreLabel ?? "More"}
                <svg
                  className={`w-4 h-4 transition-transform ${moreOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {moreOpen && (
                <ul className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-10">
                  {data.moreLinks!.map((link) => (
                    <li key={link._key}>
                      <Link
                        href={link.href}
                        target={link.isExternal ? "_blank" : undefined}
                        rel={link.isExternal ? "noopener noreferrer" : undefined}
                        className="block px-4 py-2 text-sm text-text-primary hover:bg-cream-100 transition-colors"
                        onClick={() => setMoreOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )}
        </ul>

        {/* Desktop — right side */}
        <div className="hidden md:flex items-center gap-5 ml-auto">
          {data.downloadMenuHref && (
            <Link
              href={data.downloadMenuHref}
              className="text-sm text-text-primary underline underline-offset-2 hover:text-green-900 transition-colors"
            >
              {data.downloadMenuLabel ?? "Download menu"}
            </Link>
          )}

          <Link
            href={data.ctaHref}
            className="px-5 py-2.5 rounded-full bg-green-900 text-white text-sm font-medium hover:bg-green-800 transition-colors whitespace-nowrap"
          >
            {data.ctaLabel}
          </Link>

          {/* Language switcher — segmented control */}
          <div className="flex items-center bg-gray-100 rounded-xl p-1 shrink-0" role="group" aria-label="Language">
            {(["en", "de"] as const).map((locale) => {
              const href = locale === "en" ? "/" : "/de/";
              const label = locale === "en" ? "EN" : "DE";
              const isActive = currentLocale === locale;
              return (
                <Link
                  key={locale}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-white text-text-primary shadow-sm"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden ml-auto p-2 text-text-primary"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-6">
          <ul className="flex flex-col gap-4 pt-4">
            {data.links?.map((link) => (
              <li key={link._key}>
                <Link
                  href={link.href}
                  target={link.isExternal ? "_blank" : undefined}
                  rel={link.isExternal ? "noopener noreferrer" : undefined}
                  className="block text-base text-text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {data.moreLinks?.map((link) => (
              <li key={link._key}>
                <Link
                  href={link.href}
                  target={link.isExternal ? "_blank" : undefined}
                  rel={link.isExternal ? "noopener noreferrer" : undefined}
                  className="block text-base text-text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {data.downloadMenuHref && (
              <li>
                <Link
                  href={data.downloadMenuHref}
                  className="block text-base text-text-primary underline"
                  onClick={() => setMobileOpen(false)}
                >
                  {data.downloadMenuLabel ?? "Download menu"}
                </Link>
              </li>
            )}
          </ul>

          <Link
            href={data.ctaHref}
            className="mt-6 block w-full text-center px-5 py-3 rounded-full bg-green-900 text-white text-sm font-medium"
            onClick={() => setMobileOpen(false)}
          >
            {data.ctaLabel}
          </Link>

          <div className="mt-4 flex justify-center">
            <div className="flex items-center bg-gray-100 rounded-xl p-1" role="group" aria-label="Language">
              {(["en", "de"] as const).map((locale) => {
                const href = locale === "en" ? "/" : "/de/";
                const label = locale === "en" ? "EN" : "DE";
                const isActive = currentLocale === locale;
                return (
                  <Link
                    key={locale}
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-white text-text-primary shadow-sm"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
