"use client";

import { useState } from "react";
import { PortableText } from "@portabletext/react";
import type { FaqSection } from "@/types/sanity";

interface FAQProps {
  data: FaqSection;
}

function FaqItem({ question, answer }: { question: string; answer: FaqSection["items"][0]["answer"] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-separator/20">
      <button
        type="button"
        className="w-full flex justify-between items-start gap-4 py-5 text-left"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-base font-medium text-text-dark">{question}</span>
        <svg
          className={`shrink-0 w-5 h-5 text-green-900 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && answer && (
        <div className="pb-5 text-sm text-separator leading-relaxed prose prose-sm max-w-none">
          <PortableText value={answer} />
        </div>
      )}
    </div>
  );
}

export function FAQ({ data }: FAQProps) {
  if (!data?.items?.length) return null;

  return (
    <section className="bg-white py-16 md:py-24" aria-label="Frequently asked questions">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {data.heading && (
          <h2 className="text-2xl md:text-4xl font-semibold text-text-dark mb-10">
            {data.heading}
          </h2>
        )}

        <div>
          {data.items.map((item) => (
            <FaqItem key={item._key} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
