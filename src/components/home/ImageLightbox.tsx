"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageLightboxProps {
  images: { src: string; alt: string }[];
  className?: string;
}

export function ImageLightbox({ images, className = "" }: ImageLightboxProps) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const next = useCallback(() => setIdx((i) => (i + 1) % images.length), [images.length]);
  const prev = useCallback(() => setIdx((i) => (i - 1 + images.length) % images.length), [images.length]);

  if (!images.length) return null;

  return (
    <>
      <div className={`grid grid-cols-2 gap-3 ${className}`}>
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => { setIdx(i); setOpen(true); }}
            className="rounded-xl overflow-hidden border border-slate-200 bg-white cursor-pointer hover:opacity-90 transition-opacity text-left"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={700}
              height={420}
              className="w-full h-auto object-cover"
            />
          </button>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
          >
            <X size={24} />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}

          <div
            className="max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[idx].src}
              alt={images[idx].alt}
              width={1200}
              height={800}
              className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg"
              priority
            />
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/60 text-white text-sm">
            {idx + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}