import { useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { registerUser } from "@/webAuthn";
import {
  MESSAGE_TYPES,
  type GetLockStateResponse,
  type GetLockedSitesResponse,
  type LockedSiteSummary,
} from "@/messages";
import "@/index.css";

/* ═══════════════════════════════════════
   TYPES
═══════════════════════════════════════ */
type UserProfile = { userId: string };
type Theme  = "dark" | "light";
type Screen = "main" | "schedule";
type Repeat = "never" | "daily" | "weekdays" | "weekends" | "custom";
type Schedule = {
  id: string; host: string; startTime: string; endTime: string;
  repeat: Repeat; days: number[]; active: boolean;
};

const DAYS_SHORT  = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const ENTRY_H     = 32;   // px — one protected-site row height
const ENTRY_GAP   = 4;    // px — gap between rows
const MAX_VISIBLE = 3;

function listHeight(count: number): number {
  const n = Math.min(Math.max(count, 1), MAX_VISIBLE);
  return n * ENTRY_H + Math.max(n - 1, 0) * ENTRY_GAP;
}

/* ═══════════════════════════════════════
   TOKENS  — plain string values (no as const)
═══════════════════════════════════════ */
type Tokens = {
  bg: string; surface: string; surfaceDeep: string;
  border: string; borderStrong: string;
  text: string; textSub: string; textMuted: string; textDim: string;
  accent: string; accentDim: string; accentBorder: string;
  amber: string; amberDim: string;
  green: string; greenDim: string; greenBorder: string;
  grid: string; inputBg: string; btnBg: string; btnBorder: string;
  ledNeutral: string; tagBg: string; iconColor: string; siteIcoBg: string;
};

const T: Record<Theme, Tokens> = {
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

/* ═══════════════════════════════════════
   SHIELD SVG
═══════════════════════════════════════ */
const ShieldFP = ({ theme }: { theme: Theme }) => {
  const d = theme === "dark";
  return (
    <svg width="52" height="52" viewBox="0 0 72 72" fill="none">
      <path d="M36 6L10 16v20c0 17 11.2 32.8 26 36 14.8-3.2 26-19 26-36V16L36 6z"
        stroke={d?"#3a3a46":"#c8c6c0"} strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M36 12L16 20v16c0 13.4 8.8 25.8 20 28.4C47.2 61.8 56 49.4 56 36V20L36 12z"
        fill={d?"#111114":"#e8e7e2"} stroke={d?"#2a2a32":"#d4d2cc"} strokeWidth="1"/>
      <path d="M36 28c-4.42 0-8 3.58-8 8" stroke={d?"#5a5868":"#b0aeb0"} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M36 32c-2.21 0-4 1.79-4 4"  stroke={d?"#6a6878":"#a0a0a0"} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M36 28c4.42 0 8 3.58 8 8"   stroke={d?"#5a5868":"#b0aeb0"} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M36 32c2.21 0 4 1.79 4 4"   stroke={d?"#6a6878":"#a0a0a0"} strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="36" y1="36" x2="36" y2="46" stroke={d?"#5a5868":"#b0aeb0"} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M31 41c0 2.76 2.24 5 5 5s5-2.24 5-5" stroke={d?"#646278":"#b0aeb0"} strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="36" cy="36" r="1.8" fill={d?"#7a7888":"#a8a8a8"}/>
    </svg>
  );
};

/* ═══════════════════════════════════════
   ICONS
═══════════════════════════════════════ */
const Sun    = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
const Moon   = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;
const Globe  = ({c}:{c:string}) => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.75" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const LockI  = ({c}:{c:string}) => <svg width="8"  height="8"  viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const Unlock = ({c}:{c:string}) => <svg width="8"  height="8"  viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>;
const Shield = ({c}:{c:string}) => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"   strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const Gear   = ({c}:{c:string}) => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.75" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
const Clock  = ({c}:{c:string}) => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.75" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const Trash  = ({c}:{c:string}) => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.75" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>;
const Back   = ({c}:{c:string}) => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"   strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>;
const Plus   = ({c}:{c:string}) => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;

/* ═══════════════════════════════════════
   MESSAGE BUS
═══════════════════════════════════════ */
const sendMessage = <T,>(message: unknown): Promise<T> =>
  new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, (response) => {
      const error = chrome.runtime.lastError;
      if (error) { reject(error); return; }
      resolve(response as T);
    });
  });

/* ═══════════════════════════════════════
   POPUP
═══════════════════════════════════════ */
function Popup() {
  const [theme, setTheme]               = useState<Theme>("dark");
  const [screen, setScreen]             = useState<Screen>("main");
  const [activeHost, setActiveHost]     = useState<string>("");
  const [activeUrl, setActiveUrl]       = useState<string>("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [userId, setUserId]             = useState<string>("");
  const [status, setStatus]             = useState<string>("");
  const [lockState, setLockState]       = useState<GetLockStateResponse | null>(null);
  const [lockedSites, setLockedSites]   = useState<LockedSiteSummary[]>([]);
  const [schedules, setSchedules]       = useState<Schedule[]>([]);
  const [schHost, setSchHost]           = useState("");
  const [schStart, setSchStart]         = useState("09:00");
  const [schEnd, setSchEnd]             = useState("17:00");
  const [schRepeat, setSchRepeat]       = useState<Repeat>("daily");
  const [schDays, setSchDays]           = useState<number[]>([1,2,3,4,5]);
  const [schStatus, setSchStatus]       = useState("");

  const tk = T[theme];
  const dk = theme === "dark";

  /* ── chrome loaders ── */
  const loadActiveTab = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0]?.url ?? "";
      const host = url ? new URL(url).hostname : "";
      setActiveUrl(url); setActiveHost(host); setSchHost(host);
    });
  };
  const loadUserProfile = () => {
    chrome.storage.local.get("authkey_user", (result) => {
      const profile = result.authkey_user as UserProfile | undefined;
      if (profile?.userId) { setIsRegistered(true); setUserId(profile.userId); }
      else setIsRegistered(false);
    });
  };
  const loadTheme = () => {
    chrome.storage.local.get("authkey_theme", (r) => {
      if (r.authkey_theme === "light") setTheme("light");
    });
  };
  const loadSchedules = () => {
    chrome.storage.local.get("authkey_schedules", (r) => {
      if (Array.isArray(r.authkey_schedules)) setSchedules(r.authkey_schedules);
    });
  };
  const saveSchedules = (next: Schedule[]) => {
    setSchedules(next);
    chrome.storage.local.set({ authkey_schedules: next });
  };
  const toggleTheme = () => {
    const next: Theme = dk ? "light" : "dark";
    setTheme(next);
    chrome.storage.local.set({ authkey_theme: next });
  };

  /* ── lock state ── */
  const refreshLockState = useCallback(async () => {
    if (!activeHost) return;
    const r = await sendMessage<GetLockStateResponse>({ type: MESSAGE_TYPES.GET_LOCK_STATE, host: activeHost, url: activeUrl });
    setLockState(r);
  }, [activeHost, activeUrl]);
  const refreshLockedSites = useCallback(async () => {
    const r = await sendMessage<GetLockedSitesResponse>({ type: MESSAGE_TYPES.GET_LOCKED_SITES });
    setLockedSites(r.sites.filter(s => s.isLocked));
  }, []);

  useEffect(() => { loadActiveTab(); loadUserProfile(); loadTheme(); loadSchedules(); }, []);
  useEffect(() => { void refreshLockState(); void refreshLockedSites(); }, [refreshLockState, refreshLockedSites]);

  /* ── handlers ── */
  const handleRegister = async () => {
    setStatus("");
    if (!userId.trim()) { setStatus("// username required"); return; }
    const r = await registerUser(userId.trim());
    setStatus(r.message);
    if (r.success) setIsRegistered(true);
  };
  const handleToggleLock = async () => {
    if (!activeHost) { setStatus("// no active tab"); return; }
    const next = !lockState?.isLocked;
    await sendMessage({ type: MESSAGE_TYPES.SET_LOCK_STATE, host: activeHost, url: activeUrl, isLocked: next });
    await refreshLockState(); await refreshLockedSites();
  };
  const handleRepeatChange = (r: Repeat) => {
    setSchRepeat(r);
    if (r === "daily")    setSchDays([0,1,2,3,4,5,6]);
    if (r === "weekdays") setSchDays([1,2,3,4,5]);
    if (r === "weekends") setSchDays([0,6]);
    if (r === "never")    setSchDays([]);
  };
  const toggleDay = (d: number) => {
    setSchDays(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);
    setSchRepeat("custom");
  };
  const handleCreateSchedule = () => {
    setSchStatus("");
    if (!schHost.trim())      { setSchStatus("// host required"); return; }
    if (!schStart || !schEnd) { setSchStatus("// set both times"); return; }
    if (schStart >= schEnd)   { setSchStatus("// end must be after start"); return; }
    saveSchedules([...schedules, {
      id: `sch_${Date.now()}`, host: schHost.trim(),
      startTime: schStart, endTime: schEnd,
      repeat: schRepeat, days: schDays, active: true,
    }]);
    setSchStatus("// schedule created");
    setSchHost(activeHost);
  };
  const deleteSchedule = (id: string) => saveSchedules(schedules.filter(s => s.id !== id));
  const toggleSchedule = (id: string) => saveSchedules(schedules.map(s => s.id === id ? { ...s, active: !s.active } : s));

  /* ── derived ── */
  const ls = (() => {
    if (!lockState?.isLocked) return { label: "UNLOCKED",    type: "neutral" } as const;
    if (lockState.isUnlocked) return { label: "TEMP·UNLOCK", type: "amber"   } as const;
    return                           { label: "LOCKED",      type: "red"     } as const;
  })();
  const ledStyle = ls.type === "red"
    ? { background: tk.accent,    boxShadow: dk ? `0 0 6px ${tk.accent}88` : "none" }
    : ls.type === "amber"
    ? { background: tk.amber,     boxShadow: dk ? `0 0 6px ${tk.amber}88`  : "none" }
    : { background: tk.ledNeutral };
  const ledColor       = ls.type === "red" ? tk.accent : ls.type === "amber" ? tk.amber : tk.textMuted;
  const protectedListH = listHeight(lockedSites.length);
  const activeSchedules = schedules.filter(s => s.active);

  /* ── shared inline style builders ── */
  const cardStyle   = { background: tk.surface, border: `1px solid ${tk.border}` };
  const inputStyle  = { background: tk.inputBg, border: `1px solid ${tk.border}`, color: tk.textSub };
  const pillStyle   = (on: boolean) => ({
    background:  on ? tk.accentDim : "transparent",
    border:      `1px solid ${on ? tk.accentBorder : tk.border}`,
    color:       on ? tk.accent    : tk.textMuted,
  });

  /* ════════════════════════════════════
     RENDER
  ════════════════════════════════════ */
  return (
    <div
      className="relative overflow-hidden"
      style={{ width: 320, background: tk.bg, color: tk.text, fontFamily: "'Space Grotesk',sans-serif" }}
    >
      {/* fonts + minimal resets only — no layout CSS here */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');
        html,body,#root{width:320px;overflow:hidden;margin:0;padding:0;}
        *{box-sizing:border-box;margin:0;padding:0;}
        input[type="time"]::-webkit-calendar-picker-indicator{opacity:0.4;filter:${dk?"invert(1)":"none"};}
      `}</style>

      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(${tk.grid} 1px,transparent 1px),linear-gradient(90deg,${tk.grid} 1px,transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* ── Body — padding matches original 16px 18px 14px ── */}
      <div className="relative z-10 flex flex-col" style={{ padding: "16px 18px 14px" }}>

        {/* ════ HEADER ════ */}
        <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
          <div
            className="flex items-center font-mono font-bold"
            style={{ fontSize: 15, gap: 5, color: tk.text }}
          >
            AuthKey
            <span
              className="rounded-full flex-shrink-0"
              style={{
                width: 7, height: 7,
                background: tk.accent,
                boxShadow: dk ? `0 0 8px ${tk.accent}88` : "none",
              }}
            />
          </div>
          <div className="flex items-center" style={{ gap: 5 }}>
            <span
              className="font-mono rounded"
              style={{ fontSize: 8, letterSpacing: "0.12em", padding: "2px 6px", border: `1px solid ${tk.border}`, color: tk.textMuted }}
            >
              v1.0
            </span>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex items-center justify-center rounded transition-all cursor-pointer"
              style={{ width: 24, height: 24, border: `1px solid ${tk.border}`, color: tk.textMuted, background: "transparent" }}
            >
              {dk ? <Sun/> : <Moon/>}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="relative" style={{ marginBottom: 16 }}>
          <div style={{ height: 1, background: tk.border }} />
          <div className="absolute top-0 left-0" style={{ height: 1, width: 28, background: tk.accent }} />
        </div>

        {/* ════ SETUP SCREEN ════ */}
        {!isRegistered ? (
          <div className="flex flex-col items-center">

            {/* Shield + rings */}
            <div
              className="relative flex items-center justify-center rounded-full flex-shrink-0"
              style={{ width: 96, height: 96, background: tk.surface, border: `1px solid ${tk.border}`, marginBottom: 18 }}
            >
              <div className="absolute rounded-full pointer-events-none"
                style={{ inset: -10, border: `1px solid ${tk.border}`, opacity: 0.6 }} />
              <div className="absolute rounded-full pointer-events-none"
                style={{ inset: -20, border: `1px solid ${tk.border}`, opacity: 0.3 }} />
              <ShieldFP theme={theme} />
            </div>

            <span
              className="font-mono uppercase"
              style={{ fontSize: 8, letterSpacing: "0.2em", color: tk.accent, opacity: 0.8, marginBottom: 7 }}
            >
              WebAuthn · Biometric
            </span>
            <h2
              className="font-sans font-semibold text-center"
              style={{ fontSize: 17, lineHeight: 1.25, letterSpacing: "-0.03em", color: tk.text, marginBottom: 4 }}
            >
              Set up AuthKey
            </h2>
            <p
              className="font-mono uppercase"
              style={{ fontSize: 8, letterSpacing: "0.14em", color: tk.textMuted, marginBottom: 22 }}
            >
              secure your browsing
            </p>

            {/* Form */}
            <div className="w-full flex flex-col" style={{ gap: 10 }}>
              <div>
                <label
                  className="font-mono uppercase block"
                  style={{ fontSize: 8, letterSpacing: "0.16em", color: tk.textMuted, marginBottom: 5 }}
                >
                  Username
                </label>
                <input
                  type="text"
                  placeholder="e.g. john_doe"
                  value={userId}
                  onChange={e => setUserId(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleRegister()}
                  className="w-full rounded outline-none transition-colors font-mono"
                  style={{ ...inputStyle, fontSize: 11, letterSpacing: "0.03em", padding: "9px 11px", borderRadius: 5 }}
                />
              </div>
              <button
                onClick={handleRegister}
                className="relative w-full flex items-center justify-center rounded font-mono font-bold uppercase overflow-hidden cursor-pointer transition-all"
                style={{ fontSize: 9, letterSpacing: "0.14em", gap: 7, padding: 10, background: tk.btnBg, border: `1px solid ${tk.btnBorder}`, color: tk.text, borderRadius: 5 }}
              >
                <span className="absolute top-0 left-0 bottom-0" style={{ width: 2, background: tk.accent }} />
                <Shield c={tk.text} /> Register AuthKey
              </button>
            </div>

            {status && (
              <p className="font-mono text-center" style={{ fontSize: 9, letterSpacing: "0.06em", color: tk.textMuted, marginTop: 8 }}>
                {status}
              </p>
            )}
          </div>

        ) : screen === "main" ? (
          /* ════ MAIN SCREEN ════ */
          <div className="flex flex-col">

            {/* Nav tabs — gap:4px, mb:14px */}
            <div className="flex" style={{ gap: 4, marginBottom: 14 }}>
              <button
                className="flex items-center rounded font-mono font-bold uppercase cursor-pointer"
                style={{ fontSize: 8, letterSpacing: "0.14em", padding: "5px 10px", gap: 5, borderRadius: 4, background: tk.accentDim, border: `1px solid ${tk.accentBorder}`, color: tk.accent }}
              >
                <LockI c={tk.accent} /> Sites
              </button>
              <button
                onClick={() => setScreen("schedule")}
                className="flex items-center rounded font-mono font-bold uppercase cursor-pointer transition-all"
                style={{ fontSize: 8, letterSpacing: "0.14em", padding: "5px 10px", gap: 5, borderRadius: 4, background: "transparent", border: `1px solid ${tk.border}`, color: tk.textMuted }}
              >
                <Clock c={tk.textMuted} /> Schedule
                {activeSchedules.length > 0 && (
                  <span
                    className="font-mono font-bold rounded"
                    style={{ fontSize: 7, padding: "1px 4px", background: tk.accent, color: "#fff", borderRadius: 2 }}
                  >
                    {activeSchedules.length}
                  </span>
                )}
              </button>
            </div>

            {/* Active site card — mb:8px */}
            <div
              className="relative rounded-lg overflow-hidden"
              style={{ ...cardStyle, padding: 12, borderRadius: 7, marginBottom: 8 }}
            >
              <div
                className="absolute top-0 left-0 bottom-0"
                style={{ width: 2, background: ls.type === "red" ? tk.accent : tk.border, opacity: ls.type === "red" ? (dk ? 0.5 : 0.4) : 1 }}
              />
              <span className="font-mono uppercase block" style={{ fontSize: 7, letterSpacing: "0.2em", color: tk.textMuted, marginBottom: 9 }}>
                Active site
              </span>
              {/* hostname row — gap:8px, mb:9px */}
              <div className="flex items-center" style={{ gap: 8, marginBottom: 9 }}>
                <div
                  className="flex items-center justify-center flex-shrink-0 rounded"
                  style={{ width: 26, height: 26, background: tk.siteIcoBg, border: `1px solid ${tk.border}`, borderRadius: 4 }}
                >
                  <Globe c={tk.iconColor} />
                </div>
                <span
                  className="font-mono flex-1 truncate"
                  style={{ fontSize: 11, letterSpacing: "0.02em", color: activeHost ? tk.textSub : tk.textMuted }}
                >
                  {activeHost || "no active tab"}
                </span>
              </div>
              {/* status row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center" style={{ gap: 6 }}>
                  <div className="rounded-full flex-shrink-0" style={{ width: 5, height: 5, ...ledStyle }} />
                  <span className="font-mono uppercase" style={{ fontSize: 8, letterSpacing: "0.12em", color: ledColor }}>
                    {ls.label}
                  </span>
                </div>
                <button
                  onClick={handleToggleLock}
                  className="flex items-center rounded font-mono font-bold uppercase cursor-pointer transition-all"
                  style={{
                    fontSize: 7, letterSpacing: "0.12em", padding: "5px 10px", gap: 4, borderRadius: 3,
                    background:   lockState?.isLocked ? tk.accentDim  : "transparent",
                    border:      `1px solid ${lockState?.isLocked ? tk.accentBorder : tk.border}`,
                    color:        lockState?.isLocked ? tk.accent      : tk.textMuted,
                  }}
                >
                  {lockState?.isLocked
                    ? <><Unlock c={tk.accent}/> Remove</>
                    : <><LockI  c={tk.textMuted}/> Lock</>
                  }
                </button>
              </div>
            </div>

            {/* Protected sites card — mb:8px */}
            <div
              className="relative rounded-lg overflow-hidden"
              style={{ ...cardStyle, padding: 12, borderRadius: 7, marginBottom: 8 }}
            >
              <div className="absolute top-0 left-0 bottom-0" style={{ width: 2, background: tk.border }} />
              <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
                <span className="font-mono uppercase" style={{ fontSize: 7, letterSpacing: "0.2em", color: tk.textMuted }}>
                  Protected
                </span>
                <span className="font-mono" style={{ fontSize: 7, letterSpacing: "0.12em", color: tk.textDim }}>
                  {lockedSites.length} site{lockedSites.length !== 1 ? "s" : ""}
                </span>
              </div>
              {/* List — exact height from listHeight(), scrolls after 3 */}
              <div
                className="flex flex-col overflow-y-auto"
                style={{
                  gap: ENTRY_GAP, height: protectedListH,
                  scrollbarWidth: "thin", scrollbarColor: `${tk.border} transparent`,
                }}
              >
                {lockedSites.length === 0 ? (
                  <p className="font-mono text-center" style={{ fontSize: 9, color: tk.textDim, padding: "8px 0", letterSpacing: "0.08em" }}>
                    // no protected sites
                  </p>
                ) : lockedSites.map(site => (
                  <div
                    key={site.host}
                    className="flex items-center justify-between flex-shrink-0 rounded"
                    style={{ height: ENTRY_H, padding: "0 9px", background: tk.surfaceDeep, border: `1px solid ${tk.border}`, borderRadius: 4 }}
                  >
                    <span className="font-mono" style={{ fontSize: 10, letterSpacing: "0.02em", color: tk.textSub }}>
                      {site.host}
                    </span>
                    <span
                      className="font-mono uppercase rounded"
                      style={{ fontSize: 7, letterSpacing: "0.1em", padding: "2px 6px", color: tk.accent, background: tk.tagBg, border: `1px solid ${tk.accentBorder}`, borderRadius: 2 }}
                    >
                      locked
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {status && (
              <p className="font-mono text-center" style={{ fontSize: 9, letterSpacing: "0.06em", color: tk.textMuted, marginBottom: 8 }}>
                {status}
              </p>
            )}

            {/* Account bar */}
            <div
              className="relative flex items-center rounded-lg overflow-hidden"
              style={{ ...cardStyle, padding: "9px 10px", gap: 9, borderRadius: 7 }}
            >
              <div className="absolute top-0 left-0 bottom-0" style={{ width: 2, background: tk.border }} />
              <div
                className="flex items-center justify-center rounded-full flex-shrink-0 font-mono font-bold uppercase"
                style={{ width: 26, height: 26, fontSize: 9, background: tk.accentDim, border: `1px solid ${tk.accentBorder}`, color: tk.accent }}
              >
                {userId ? userId.slice(0,2) : "AK"}
              </div>
              <span className="font-mono flex-1 truncate" style={{ fontSize: 10, letterSpacing: "0.04em", color: tk.textSub }}>
                {userId || "user"}
              </span>
              <button
                onClick={() => chrome.runtime.openOptionsPage?.()}
                aria-label="Open settings"
                className="flex items-center justify-center flex-shrink-0 rounded cursor-pointer transition-all"
                style={{ width: 26, height: 26, background: "transparent", border: `1px solid ${tk.border}`, color: tk.textMuted, borderRadius: 4 }}
              >
                <Gear c={tk.textMuted} />
              </button>
            </div>
          </div>

        ) : (
          /* ════ SCHEDULE SCREEN ════ */
          <div className="flex flex-col" style={{ gap: 8 }}>

            {/* Back row */}
            <div className="flex items-center" style={{ gap: 8, marginBottom: 2 }}>
              <button
                onClick={() => { setScreen("main"); setSchStatus(""); }}
                aria-label="Back"
                className="flex items-center justify-center rounded cursor-pointer transition-all"
                style={{ width: 24, height: 24, background: "transparent", border: `1px solid ${tk.border}`, color: tk.textMuted, borderRadius: 4 }}
              >
                <Back c={tk.textMuted} />
              </button>
              <span
                className="font-mono uppercase"
                style={{ fontSize: 10, letterSpacing: "0.14em", color: tk.textMuted }}
              >
                Schedule Lock
              </span>
            </div>

            {/* Create form card */}
            <div
              className="relative rounded-lg overflow-hidden"
              style={{ ...cardStyle, padding: 12, borderRadius: 7 }}
            >
              <div
                className="absolute top-0 left-0 bottom-0"
                style={{ width: 2, background: tk.green, opacity: dk ? 0.5 : 0.4 }}
              />
              <span className="font-mono uppercase block" style={{ fontSize: 7, letterSpacing: "0.2em", color: tk.textMuted, marginBottom: 9 }}>
                New schedule
              </span>

              {/* Website */}
              <div style={{ marginBottom: 8 }}>
                <label className="font-mono uppercase block" style={{ fontSize: 8, letterSpacing: "0.16em", color: tk.textMuted, marginBottom: 5 }}>
                  Website
                </label>
                <input
                  className="w-full rounded font-mono outline-none transition-colors"
                  placeholder="e.g. twitter.com"
                  value={schHost}
                  onChange={e => setSchHost(e.target.value)}
                  style={{ ...inputStyle, fontSize: 11, letterSpacing: "0.03em", padding: "9px 11px", borderRadius: 5 }}
                />
              </div>

              {/* Times */}
              <div className="flex" style={{ gap: 8, marginBottom: 8 }}>
                {([["Start", schStart, setSchStart], ["End", schEnd, setSchEnd]] as [string, string, (v:string)=>void][]).map(([lbl, val, fn]) => (
                  <div key={lbl} className="flex flex-col flex-1">
                    <label className="font-mono uppercase block" style={{ fontSize: 8, letterSpacing: "0.16em", color: tk.textMuted, marginBottom: 5 }}>
                      {lbl}
                    </label>
                    <input
                      type="time"
                      value={val}
                      onChange={e => fn(e.target.value)}
                      className="w-full rounded font-mono outline-none"
                      style={{ ...inputStyle, fontSize: 11, padding: "8px 10px", borderRadius: 5 }}
                    />
                  </div>
                ))}
              </div>

              {/* Repeat */}
              <div style={{ marginBottom: 6 }}>
                <label className="font-mono uppercase block" style={{ fontSize: 8, letterSpacing: "0.16em", color: tk.textMuted, marginBottom: 5 }}>
                  Repeat
                </label>
                <div className="flex flex-wrap" style={{ gap: 4 }}>
                  {(["never","daily","weekdays","weekends","custom"] as Repeat[]).map(r => (
                    <button
                      key={r}
                      onClick={() => handleRepeatChange(r)}
                      className="font-mono font-bold uppercase rounded cursor-pointer transition-all"
                      style={{ fontSize: 8, letterSpacing: "0.1em", padding: "5px 9px", borderRadius: 3, ...pillStyle(schRepeat === r) }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Days */}
              <div style={{ marginBottom: 10 }}>
                <label className="font-mono uppercase block" style={{ fontSize: 8, letterSpacing: "0.16em", color: tk.textMuted, marginBottom: 5 }}>
                  Days
                </label>
                <div className="flex" style={{ gap: 4 }}>
                  {DAYS_SHORT.map((d, i) => (
                    <button
                      key={i}
                      onClick={() => toggleDay(i)}
                      className="flex items-center justify-center font-mono font-bold uppercase rounded cursor-pointer transition-all"
                      style={{ width: 30, height: 26, fontSize: 8, letterSpacing: "0.04em", borderRadius: 3, ...pillStyle(schDays.includes(i)) }}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={handleCreateSchedule}
                className="relative w-full flex items-center justify-center rounded font-mono font-bold uppercase overflow-hidden cursor-pointer transition-all"
                style={{ fontSize: 9, letterSpacing: "0.14em", gap: 7, padding: 10, background: tk.btnBg, border: `1px solid ${tk.btnBorder}`, color: tk.text, borderRadius: 5 }}
              >
                <span className="absolute top-0 left-0 bottom-0" style={{ width: 2, background: tk.accent }} />
                <Plus c={tk.text} /> Create Schedule
              </button>

              {schStatus && (
                <p className="font-mono text-center" style={{ fontSize: 9, letterSpacing: "0.06em", color: tk.textMuted, marginTop: 8 }}>
                  {schStatus}
                </p>
              )}
            </div>

            {/* Active schedules list */}
            {schedules.length > 0 && (
              <div
                className="relative rounded-lg overflow-hidden"
                style={{ ...cardStyle, padding: 12, borderRadius: 7 }}
              >
                <div className="absolute top-0 left-0 bottom-0" style={{ width: 2, background: tk.border }} />
                <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
                  <span className="font-mono uppercase" style={{ fontSize: 7, letterSpacing: "0.2em", color: tk.textMuted }}>
                    Active schedules
                  </span>
                  <span className="font-mono" style={{ fontSize: 7, letterSpacing: "0.12em", color: tk.textDim }}>
                    {schedules.length}
                  </span>
                </div>
                <div
                  className="flex flex-col overflow-y-auto"
                  style={{ gap: 4, maxHeight: 120, scrollbarWidth: "thin", scrollbarColor: `${tk.border} transparent` }}
                >
                  {schedules.map(s => (
                    <div
                      key={s.id}
                      className="flex items-center rounded transition-colors"
                      style={{ gap: 8, padding: "8px 10px", background: tk.surfaceDeep, border: `1px solid ${tk.border}`, borderRadius: 5 }}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-mono truncate" style={{ fontSize: 10, color: tk.textSub, marginBottom: 2 }}>
                          {s.host}
                        </div>
                        <div className="font-mono" style={{ fontSize: 8, color: tk.textMuted, letterSpacing: "0.04em" }}>
                          {s.startTime} → {s.endTime} · {s.repeat}
                        </div>
                      </div>
                      {/* Toggle switch */}
                      <div
                        role="button"
                        aria-label="Toggle schedule"
                        onClick={() => toggleSchedule(s.id)}
                        className="relative flex-shrink-0 rounded-full cursor-pointer transition-all"
                        style={{
                          width: 28, height: 16, borderRadius: 8,
                          border: `1px solid ${s.active ? tk.greenBorder : tk.border}`,
                          background: s.active ? tk.green : "transparent",
                        }}
                      >
                        <div
                          className="absolute rounded-full transition-all"
                          style={{
                            top: 2, width: 10, height: 10, borderRadius: "50%",
                            left: s.active ? 14 : 2,
                            background: s.active ? "#fff" : tk.textMuted,
                          }}
                        />
                      </div>
                      <button
                        onClick={() => deleteSchedule(s.id)}
                        aria-label="Delete"
                        className="flex items-center justify-center flex-shrink-0 rounded cursor-pointer transition-all"
                        style={{ width: 20, height: 20, background: "transparent", border: `1px solid ${tk.border}`, color: tk.textMuted, borderRadius: 3 }}
                      >
                        <Trash c={tk.textMuted} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<Popup />);
export default Popup;
