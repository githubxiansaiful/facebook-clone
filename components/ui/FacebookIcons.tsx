import React from "react";

interface IconProps {
  size?: number;
  className?: string;
  fill?: string;
}

// 1. Official Facebook Top Navigation Home Icon
export function FbHomeIcon({ size = 24, className, fill = "currentColor" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={fill}
      className={className}
    >
      <path d="M9.464 1.286C10.294.803 11.092.5 12 .5c.908 0 1.707.303 2.537.786.795.462 1.7 1.142 2.815 1.977l2.232 1.675c1.391 1.042 2.359 1.766 2.888 2.826.53 1.059.53 2.268.528 4.006v4.3c0 1.355 0 2.471-.119 3.355-.124.928-.396 1.747-1.052 2.403-.657.657-1.476.928-2.404 1.053-.884.119-2 .119-3.354.119H7.93c-1.354 0-2.471 0-3.355-.119-.928-.125-1.747-.396-2.403-1.053-.656-.656-.928-1.475-1.053-2.403C1 18.541 1 17.425 1 16.07v-4.3c0-1.738-.002-2.947.528-4.006.53-1.06 1.497-1.784 2.888-2.826L6.65 3.263c1.114-.835 2.02-1.515 2.815-1.977zM10.5 13A1.5 1.5 0 0 0 9 14.5V21h6v-6.5a1.5 1.5 0 0 0-1.5-1.5h-3z" />
    </svg>
  );
}

// 2. Official Facebook Top Navigation Watch / Video Icon
export function FbWatchIcon({ size = 24, className, fill = "currentColor" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={fill}
      className={className}
    >
      <path d="M10.996 12.132A1 1 0 0 0 9.5 13v4a1 1 0 0 0 1.496.868l3.5-2a1 1 0 0 0 0-1.736l-3.5-2z" />
      <path d="M12.075 1h-.15C9.632 1 7.81 1 6.38 1.192c-1.472.198-2.674.616-3.623 1.565-.949.95-1.367 2.15-1.565 3.623C1 7.81 1 9.632 1 11.925v.15c0 2.293 0 4.116.192 5.545.198 1.472.616 2.674 1.565 3.623.95.949 2.15 1.367 3.623 1.565C7.81 23 9.632 23 11.925 23h.15c2.293 0 4.116 0 5.545-.192 1.472-.198 2.674-.616 3.623-1.565.949-.95 1.367-2.15 1.565-3.623.192-1.43.192-3.252.192-5.545v-.15c0-2.293 0-4.116-.192-5.545-.198-1.472-.616-2.674-1.565-3.623-.95-.949-2.15-1.367-3.623-1.565C16.19 1 14.368 1 12.075 1zM4.172 4.172c.515-.516 1.224-.83 2.475-.998l.183-.023L8.113 7H3.132c.013-.121.027-.239.042-.353.168-1.25.482-1.96.998-2.475zM10.22 7 8.895 3.023C9.778 3 10.801 3 12 3c.642 0 1.234 0 1.78.004L15.114 7H10.22zm6.253 2h4.507c.02.86.02 1.848.02 3 0 2.385-.002 4.074-.174 5.353-.168 1.25-.482 1.96-.998 2.475-.515.516-1.224.83-2.475.998-1.28.172-2.968.174-5.353.174s-4.074-.002-5.353-.174c-1.25-.168-1.96-.482-2.475-.998-.516-.515-.83-1.224-.998-2.475C3.002 16.073 3 14.385 3 12c0-1.152 0-2.14.02-3h13.454zm.747-2-1.316-3.949c.537.026 1.016.065 1.448.123 1.25.168 1.96.482 2.475.998.516.515.83 1.224.998 2.475.015.114.03.232.042.353H17.22z" />
    </svg>
  );
}

// 3. Official Facebook Top Navigation Marketplace Icon
export function FbMarketplaceIcon({ size = 24, className, fill = "currentColor" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={fill}
      className={className}
    >
      <path d="M3.023 2a1.006 1.006 0 0 0-.917.551.995.995 0 0 0-.094.601l3 19.5a1 1 0 0 0 1.977-.304L6.166 17h13.48a2 2 0 0 0 1.912-2.588L20.046 9.5l1.512-4.912A2 2 0 0 0 19.646 2H3.023zM5.86 15 4.166 4h15.48l-1.511 4.912a2 2 0 0 0 0 1.176L19.646 15H5.86z" />
    </svg>
  );
}

// 4. Official Facebook Top Navigation Groups Icon
export function FbGroupsIcon({ size = 24, className, fill = "currentColor" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={fill}
      className={className}
    >
      <path d="M7 10a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-2V7a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v3H7zm8 0h2v7h-2v-7zm-2-3v10h-2V7h2zm-4 5v5H7v-5h2z" />
      <path d="M14.073 1H9.927c-1.824 0-3.293 0-4.45.155-1.2.162-2.21.507-3.013 1.31-.802.802-1.147 1.813-1.309 3.013C1 6.634 1 8.103 1 9.927v4.146c0 1.824 0 3.293.155 4.45.162 1.2.507 2.21 1.31 3.012.802.803 1.813 1.148 3.013 1.31C6.634 23 8.103 23 9.927 23h4.146c1.824 0 3.293 0 4.45-.155 1.2-.162 2.21-.507 3.012-1.31.803-.802 1.148-1.813 1.31-3.013.155-1.156.155-2.625.155-4.449V9.927c0-1.824 0-3.293-.155-4.45-.162-1.2-.507-2.21-1.31-3.013-.802-.802-1.813-1.147-3.013-1.309C17.366 1 15.897 1 14.073 1zM3.88 3.879c.369-.37.887-.61 1.865-.741C6.751 3.002 8.086 3 10 3h4c1.914 0 3.249.002 4.256.138.978.131 1.496.372 1.865.74.37.37.61.888.742 1.866C20.998 6.751 21 8.086 21 10v4c0 1.914-.002 3.249-.137 4.256-.132.978-.373 1.496-.742 1.865-.369.37-.887.61-1.865.742-1.007.135-2.342.137-4.256.137h-4c-1.914 0-3.249-.002-4.256-.137-.978-.132-1.496-.373-1.865-.742-.37-.369-.61-.887-.741-1.865C3.002 17.249 3 15.914 3 14v-4c0-1.914.002-3.249.138-4.256.131-.978.372-1.496.74-1.865z" />
    </svg>
  );
}

// 5. Official Facebook Top Navigation Gaming Icon
export function FbGamingIcon({ size = 24, className, fill = "currentColor" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={fill}
      className={className}
    >
      <path d="M8 8a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2H9v2a1 1 0 1 1-2 0v-2H5a1 1 0 1 1 0-2h2V9a1 1 0 0 1 1-1zm8 2a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zm-2 4a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z" />
      <path d="M.5 11a7 7 0 0 1 7-7h9a7 7 0 0 1 7 7v2a7 7 0 0 1-7 7h-9a7 7 0 0 1-7-7v-2zm7-5a5 5 0 0 0-5 5v2a5 5 0 0 0 5 5h9a5 5 0 0 0 5-5v-2a5 5 0 0 0-5-5h-9z" />
    </svg>
  );
}

// 6. Official Facebook 9-Dot Menu Grid Icon
export function FbMenuGridIcon({ size = 20, className, fill = "currentColor" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={fill}
      className={className}
    >
      <path d="M18.5 1A1.5 1.5 0 0 0 17 2.5v3A1.5 1.5 0 0 0 18.5 7h3A1.5 1.5 0 0 0 23 5.5v-3A1.5 1.5 0 0 0 21.5 1h-3zm0 8a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 21.5 9h-3zm-16 8A1.5 1.5 0 0 0 1 18.5v3A1.5 1.5 0 0 0 2.5 23h3A1.5 1.5 0 0 0 7 21.5v-3A1.5 1.5 0 0 0 5.5 17h-3zm8 0A1.5 1.5 0 0 0 9 18.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5h-3zm8 0a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5h-3zm-16-8A1.5 1.5 0 0 0 1 10.5v3A1.5 1.5 0 0 0 2.5 15h3A1.5 1.5 0 0 0 7 13.5v-3A1.5 1.5 0 0 0 5.5 9h-3zm0-8A1.5 1.5 0 0 0 1 2.5v3A1.5 1.5 0 0 0 2.5 7h3A1.5 1.5 0 0 0 7 5.5v-3A1.5 1.5 0 0 0 5.5 1h-3zm8 0A1.5 1.5 0 0 0 9 2.5v3A1.5 1.5 0 0 0 10.5 7h3A1.5 1.5 0 0 0 15 5.5v-3A1.5 1.5 0 0 0 13.5 1h-3zm0 8A1.5 1.5 0 0 0 9 10.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 13.5 9h-3z" />
    </svg>
  );
}

// 7. Official Facebook Messenger Icon
export function FbMessengerIcon({ size = 20, className, fill = "currentColor" }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill={fill}
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.5 8a7.5 7.5 0 1 1 4.006 6.638.341.341 0 0 0-.236-.041l-2.193.534A1 1 0 0 1 .87 13.923l.534-2.193a.341.341 0 0 0-.04-.236A7.47 7.47 0 0 1 .5 8zm11.389-.907a.56.56 0 0 0-.79-.78L9.25 7.75 7.294 6.327a1 1 0 0 0-1.386.205L4.111 8.906a.56.56 0 0 0 .791.781L6.75 8.25l1.957 1.423a1 1 0 0 0 1.385-.205l1.797-2.375z"
      />
    </svg>
  );
}

// 8. Official Facebook Notifications Bell Icon
export function FbBellIcon({ size = 20, className, fill = "currentColor" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={fill}
      className={className}
    >
      <path d="M3 9.5a9 9 0 1 1 18 0v2.927c0 1.69.475 3.345 1.37 4.778a1.5 1.5 0 0 1-1.272 2.295h-4.625a4.5 4.5 0 0 1-8.946 0H2.902a1.5 1.5 0 0 1-1.272-2.295A9.01 9.01 0 0 0 3 12.43V9.5zm6.55 10a2.5 2.5 0 0 0 4.9 0h-4.9z" />
    </svg>
  );
}

// 9. Official Facebook Search Icon
export function FbSearchIcon({ size = 16, className, fill = "currentColor" }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill={fill}
      className={className}
    >
      <path d="M10.743 2.257a6 6 0 1 1-8.485 8.486 6 6 0 0 1 8.485-8.486zm-1.06 1.06a4.5 4.5 0 1 0-6.365 6.364 4.5 4.5 0 0 0 6.364-6.363z" />
      <path d="m13.463 15.142-.04-.044-3.574-4.192c-.599-.703.355-1.656 1.058-1.057l4.191 3.574.044.04c.058.059.122.137.182.24.249.425.249.96-.154 1.41l-.057.057c-.45.403-.986.403-1.411.154a1.182 1.182 0 0 1-.24-.182z" />
    </svg>
  );
}

// 10. Official Facebook 3 Dots More Icon
export function FbMoreDotsIcon({ size = 20, className, fill = "currentColor" }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      width={size}
      height={size}
      fill={fill}
      className={className}
    >
      <circle cx="10" cy="10" r="2" />
      <circle cx="16" cy="10" r="2" />
      <circle cx="4" cy="10" r="2" />
    </svg>
  );
}

// 11. Official Facebook Plus Icon
export function FbPlusIcon({ size = 20, className, fill = "currentColor" }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      width={size}
      height={size}
      fill={fill}
      className={className}
    >
      <path d="M10 3.5a1 1 0 0 1 1 1v4.5h4.5a1 1 0 1 1 0 2H11v4.5a1 1 0 1 1-2 0V11H4.5a1 1 0 1 1 0-2H9V4.5a1 1 0 0 1 1-1z" />
    </svg>
  );
}

// 12. Official Facebook Dropdown Chevron Icon
export function FbChevronDownIcon({ size = 12, className, fill = "currentColor" }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill={fill}
      className={className}
    >
      <path d="M4.708 6c-1.114 0-1.672 1.346-.884 2.134l2.939 2.94a1.75 1.75 0 0 0 2.475 0l2.94-2.94c.787-.788.229-2.134-.885-2.134H4.708z" />
    </svg>
  );
}

// 13. Official Facebook Close / Cross Icon
export function FbCloseIcon({ size = 20, className, fill = "currentColor" }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      width={size}
      height={size}
      fill={fill}
      className={className}
    >
      <path d="M15.543 3.043a1 1 0 1 1 1.414 1.414L11.414 10l5.543 5.542a1 1 0 0 1-1.414 1.415L10 11.414l-5.543 5.543a1 1 0 0 1-1.414-1.415L8.586 10 3.043 4.457a1 1 0 1 1 1.414-1.414L10 8.586l5.543-5.543z" />
    </svg>
  );
}

// 14. Official Facebook Back Arrow Icon
export function FbBackArrowIcon({ size = 20, className, fill = "currentColor" }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      width={size}
      height={size}
      fill={fill}
      className={className}
    >
      <path d="M8.043 3.043a1 1 0 1 1 1.414 1.414c-.638.639-1.32 1.32-2.018 2.015-.84.836-1.701 1.696-2.532 2.528H17.25a1 1 0 1 1 0 2H4.912l2.556 2.554.003.003 1.986 1.986a1 1 0 1 1-1.414 1.414l-1.987-1.986a7265.663 7265.663 0 0 1-3.21-3.209 2.495 2.495 0 0 1-.003-3.526C3.87 7.206 4.97 6.11 6.03 5.051a1339 1339 0 0 0 2.013-2.008z" />
    </svg>
  );
}

// 15. Official Facebook Left Sidebar WebP Icons
export const FB_SIDEBAR_ICONS = {
  friends: "https://static.xx.fbcdn.net/rsrc.php/yE/r/f0XMdTi7eQy.webp",
  feeds: "https://static.xx.fbcdn.net/rsrc.php/yX/r/8_VnccIZfRa.webp",
  groups: "https://static.xx.fbcdn.net/rsrc.php/yb/r/DgIQti9Y0Xv.webp",
  saved: "https://static.xx.fbcdn.net/rsrc.php/yK/r/vJ_7BcINBp9.webp",
  memories: "https://static.xx.fbcdn.net/rsrc.php/yI/r/GaPYxMviPKp.webp",
  video: "https://static.xx.fbcdn.net/rsrc.php/yx/r/I_rhPL68mZl.webp",
};
