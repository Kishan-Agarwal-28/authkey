import type { Theme } from "./tokens";

export const ShieldFP = ({ theme }: { theme: Theme }) => {
  const d = theme === "dark";
  return (
    <svg width="52" height="52" viewBox="0 0 72 72" fill="none">
      <path
        d="M36 6L10 16v20c0 17 11.2 32.8 26 36 14.8-3.2 26-19 26-36V16L36 6z"
        stroke={d ? "#3a3a46" : "#c8c6c0"} strokeWidth="1.5" strokeLinejoin="round"
      />
      <path
        d="M36 12L16 20v16c0 13.4 8.8 25.8 20 28.4C47.2 61.8 56 49.4 56 36V20L36 12z"
        fill={d ? "#111114" : "#e8e7e2"} stroke={d ? "#2a2a32" : "#d4d2cc"} strokeWidth="1"
      />
      <path d="M36 28c-4.42 0-8 3.58-8 8"  stroke={d ? "#5a5868" : "#b0aeb0"} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M36 32c-2.21 0-4 1.79-4 4"  stroke={d ? "#6a6878" : "#a0a0a0"} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M36 28c4.42 0 8 3.58 8 8"   stroke={d ? "#5a5868" : "#b0aeb0"} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M36 32c2.21 0 4 1.79 4 4"   stroke={d ? "#6a6878" : "#a0a0a0"} strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="36" y1="36" x2="36" y2="46" stroke={d ? "#5a5868" : "#b0aeb0"} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M31 41c0 2.76 2.24 5 5 5s5-2.24 5-5" stroke={d ? "#646278" : "#b0aeb0"} strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="36" cy="36" r="1.8" fill={d ? "#7a7888" : "#a8a8a8"}/>
    </svg>
  );
};
