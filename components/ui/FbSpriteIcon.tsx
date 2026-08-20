import React from "react";

export type FbSpriteName =
  | "friends"
  | "groups"
  | "saved"
  | "memories"
  | "video"
  | "events"
  | "feeds"
  | "marketplace"
  | "pages"
  | "gaming"
  | "fundraisers"
  | "custom";

interface FbSpriteIconProps {
  name?: FbSpriteName;
  position?: string;
  size?: number;
  width?: number;
  height?: number;
  className?: string;
  src?: string;
}

// Preset standard 36x36 offsets for Facebook sprite sheet
const SPRITE_POSITIONS: Record<Exclude<FbSpriteName, "custom">, string> = {
  friends: "0 0",
  groups: "0 -37px",
  saved: "0 -74px",
  video: "0 -111px",
  marketplace: "0 -148px",
  memories: "0 -185px",
  events: "0 -222px",
  feeds: "0 -259px",
  pages: "0 -296px",
  gaming: "0 -333px",
  fundraisers: "0 -370px",
};

export function FbSpriteIcon({
  name = "memories",
  position,
  size = 36,
  width,
  height,
  className = "",
  src = "/icons.webp",
}: FbSpriteIconProps) {
  const w = width || size;
  const h = height || size;
  const pos = position || (name !== "custom" ? SPRITE_POSITIONS[name] : "0 0") || "0 0";

  return (
    <i
      data-visualcompletion="css-img"
      className={`inline-block shrink-0 ${className}`}
      style={{
        backgroundImage: `url('${src}')`,
        backgroundPosition: pos,
        backgroundSize: "auto",
        width: `${w}px`,
        height: `${h}px`,
        backgroundRepeat: "no-repeat",
        display: "inline-block",
      }}
    />
  );
}
