"use client";

import React, { useState } from "react";
import { Modal } from "../ui/Modal";
import { PostImageItem } from "../../types";

interface PostMediaGridProps {
  images: PostImageItem[];
}

export function PostMediaGrid({ images }: PostMediaGridProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  if (!images || images.length === 0) return null;

  const count = images.length;

  return (
    <>
      <div className="w-full mt-2 overflow-hidden select-none bg-zinc-100 dark:bg-[#18191a]">
        {count === 1 && (
          <div
            onClick={() => setActiveImage(images[0].url)}
            className="cursor-pointer max-h-[550px] overflow-hidden flex items-center justify-center bg-black/5"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[0].url}
              alt="Post image"
              className="w-full h-auto max-h-[550px] object-cover hover:opacity-95 transition-opacity"
            />
          </div>
        )}

        {count === 2 && (
          <div className="grid grid-cols-2 gap-1 max-h-[420px]">
            {images.map((img) => (
              <div
                key={img.id}
                onClick={() => setActiveImage(img.url)}
                className="cursor-pointer h-72 sm:h-80 overflow-hidden"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt="Post image"
                  className="w-full h-full object-cover hover:scale-102 transition-transform duration-200"
                />
              </div>
            ))}
          </div>
        )}

        {count === 3 && (
          <div className="grid grid-cols-2 gap-1 max-h-[440px]">
            <div
              onClick={() => setActiveImage(images[0].url)}
              className="cursor-pointer h-full max-h-[440px] overflow-hidden"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[0].url}
                alt="Post image"
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-200"
              />
            </div>
            <div className="grid grid-rows-2 gap-1 h-[440px]">
              {images.slice(1, 3).map((img) => (
                <div
                  key={img.id}
                  onClick={() => setActiveImage(img.url)}
                  className="cursor-pointer h-[218px] overflow-hidden"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt="Post image"
                    className="w-full h-full object-cover hover:scale-102 transition-transform duration-200"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {count >= 4 && (
          <div className="grid grid-cols-2 gap-1 max-h-[440px]">
            {images.slice(0, 4).map((img, idx) => {
              const isLast = idx === 3;
              const remaining = count - 4;

              return (
                <div
                  key={img.id}
                  onClick={() => setActiveImage(img.url)}
                  className="relative cursor-pointer h-48 sm:h-52 overflow-hidden group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt="Post image"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-200"
                  />
                  {isLast && remaining > 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-black text-2xl">
                      +{remaining}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Image Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setActiveImage(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activeImage}
            alt="Expanded view"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </>
  );
}
