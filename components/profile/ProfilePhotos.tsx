"use client";

import React from "react";

interface ProfilePhotosProps {
  photos: { id: string; url: string }[];
}

export function ProfilePhotos({ photos }: ProfilePhotosProps) {
  return (
    <div className="bg-white dark:bg-[#242526] rounded-xl shadow-xs border border-zinc-200 dark:border-[#3e4042] p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            Photos
          </h3>
          <p className="text-xs text-zinc-500">{photos.length} photos</p>
        </div>
      </div>

      {photos.length === 0 ? (
        <div className="p-8 text-center text-xs text-zinc-500">
          No photos uploaded yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="h-32 sm:h-36 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.url}
                alt="User upload"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
