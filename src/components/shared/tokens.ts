export type Theme = "dark" | "light";

export type Tokens = {
  bg: string; surface: string; surfaceDeep: string;
  border: string; borderStrong: string;
  text: string; textSub: string; textMuted: string; textDim: string;
  accent: string; accentDim: string; accentBorder: string;
  amber: string; amberDim: string;
  green: string; greenDim: string; greenBorder: string;
  grid: string; inputBg: string; btnBg: string; btnBorder: string;
  ledNeutral: string; tagBg: string; iconColor: string; siteIcoBg: string;
};

export const T: Record<Theme, Tokens> = {
  dark: {
    bg: "#0d0d10", surface: "#111116", surfaceDeep: "#0a0a0e",
    border: "#1e1e24", borderStrong: "#2a2a32",
    text: "#f0eeeb", textSub: "#d0cec8", textMuted: "#7a7888", textDim: "#52505c",
    accent: "#ff5555", accentDim: "#2a0f0f", accentBorder: "#ff555540",
    amber: "#f5a623", amberDim: "#2a1a00",
    green: "#3ecf60", greenDim: "#0d2016", greenBorder: "#3ecf6050",
    grid: "#ffffff07", inputBg: "#0e0e12", btnBg: "#1c1c22", btnBorder: "#2e2e38",
    ledNeutral: "#3a3a46", tagBg: "#2a0f0f", iconColor: "#5a5868", siteIcoBg: "#111114",
  },
  light: {
    bg: "#f6f5f1", surface: "#eeede8", surfaceDeep: "#e6e5e0",
    border: "#dddbd4", borderStrong: "#cac8c2",
    text: "#18181a", textSub: "#2e2c30", textMuted: "#5c5a60", textDim: "#8a8880",
    accent: "#d63030", accentDim: "#faeaea", accentBorder: "#d6303040",
    amber: "#c47e00", amberDim: "#c47e0018",
    green: "#1e9e40", greenDim: "#eaf7ee", greenBorder: "#1e9e4040",
    grid: "#00000008", inputBg: "#eae9e4", btnBg: "#e8e7e2", btnBorder: "#cac8c2",
    ledNeutral: "#c8c6c0", tagBg: "#faeaea", iconColor: "#a0a09a", siteIcoBg: "#e4e3de",
  },
};

export const ENTRY_H     = 32;  // px — one protected-site row height
export const ENTRY_GAP   = 4;   // px — gap between rows
export const MAX_VISIBLE = 3;

export function listHeight(count: number): number {
  const n = Math.min(Math.max(count, 1), MAX_VISIBLE);
  return n * ENTRY_H + Math.max(n - 1, 0) * ENTRY_GAP;
}

/** Shared inline style builders that depend on theme tokens */
export const cardStyle   = (tk: Tokens) => ({ background: tk.surface, border: `1px solid ${tk.border}` });
export const inputStyle  = (tk: Tokens) => ({ background: tk.inputBg, border: `1px solid ${tk.border}`, color: tk.textSub });
export const pillStyle   = (tk: Tokens, on: boolean) => ({
  background: on ? tk.accentDim  : "transparent",
  border:     `1px solid ${on ? tk.accentBorder : tk.border}`,
  color:      on ? tk.accent     : tk.textMuted,
});
