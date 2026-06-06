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

import { T, type Theme } from "../../components/shared/tokens";
import { Sun, Moon } from "../../components/shared/icons";
import { SetupScreen }    from "../../components/popup/SetupScreen";
import { MainScreen }     from "../../components/popup/MainScreen";
import { ScheduleScreen } from "../../components/popup/ScheduleScreen";
import type { Screen, Repeat, Schedule } from "../../components/popup/types";

/* ── message helper ── */
const sendMessage = <T,>(msg: unknown): Promise<T> =>
  new Promise((resolve, reject) =>
    chrome.runtime.sendMessage(msg, (res) => {
      if (chrome.runtime.lastError) { reject(chrome.runtime.lastError); return; }
      resolve(res as T);
    })
  );

/* ════════════════════════════════════════════════════
   POPUP
════════════════════════════════════════════════════ */
function Popup() {
  /* ── theme ── */
  const [theme, setTheme] = useState<Theme>("dark");
  const tk = T[theme];
  const dk = theme === "dark";

  /* ── navigation ── */
  const [screen, setScreen] = useState<Screen>("main");

  /* ── auth ── */
  const [isRegistered, setIsRegistered] = useState(false);
  const [userId,       setUserId]       = useState("");
  const [status,       setStatus]       = useState("");

  /* ── tab / lock ── */
  const [activeHost,  setActiveHost]  = useState("");
  const [activeUrl,   setActiveUrl]   = useState("");
  const [lockState,   setLockState]   = useState<GetLockStateResponse | null>(null);
  const [lockedSites, setLockedSites] = useState<LockedSiteSummary[]>([]);

  /* ── schedule form ── */
  const [schedules,  setSchedules]  = useState<Schedule[]>([]);
  const [schHost,    setSchHost]    = useState("");
  const [schStart,   setSchStart]   = useState("09:00");
  const [schEnd,     setSchEnd]     = useState("17:00");
  const [schRepeat,  setSchRepeat]  = useState<Repeat>("daily");
  const [schDays,    setSchDays]    = useState<number[]>([1, 2, 3, 4, 5]);
  const [schStatus,  setSchStatus]  = useState("");

  /* ════ loaders ════ */
  const loadActiveTab = () =>
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url  = tabs[0]?.url ?? "";
      const host = url ? new URL(url).hostname : "";
      setActiveUrl(url); setActiveHost(host); setSchHost(host);
    });

  const loadUserProfile = () =>
    chrome.storage.local.get("authkey_user", (r) => {
      const p = r.authkey_user as { userId?: string } | undefined;
      if (p?.userId) { setIsRegistered(true); setUserId(p.userId); }
      else setIsRegistered(false);
    });

  const loadTheme = () =>
    chrome.storage.local.get("authkey_theme", (r) => {
      if (r.authkey_theme === "light") setTheme("light");
    });

  const loadSchedules = () =>
    chrome.storage.local.get("authkey_schedules", (r) => {
      if (Array.isArray(r.authkey_schedules)) setSchedules(r.authkey_schedules);
    });

  useEffect(() => {
    loadActiveTab(); loadUserProfile(); loadTheme(); loadSchedules();
  }, []);

  /* ════ lock state ════ */
  const refreshLockState = useCallback(async () => {
    if (!activeHost) return;
    const r = await sendMessage<GetLockStateResponse>({ type: MESSAGE_TYPES.GET_LOCK_STATE, host: activeHost, url: activeUrl });
    setLockState(r);
  }, [activeHost, activeUrl]);

  const refreshLockedSites = useCallback(async () => {
    const r = await sendMessage<GetLockedSitesResponse>({ type: MESSAGE_TYPES.GET_LOCKED_SITES });
    setLockedSites(r.sites.filter(s => s.isLocked));
  }, []);

  useEffect(() => { void refreshLockState(); void refreshLockedSites(); }, [refreshLockState, refreshLockedSites]);

  /* ════ handlers ════ */
  const handleRegister = async () => {
    setStatus("");
    if (!userId.trim()) { setStatus("// username required"); return; }
    const r = await registerUser(userId.trim());
    setStatus(r.message);
    if (r.success) setIsRegistered(true);
  };

  const handleToggleLock = async () => {
    if (!activeHost) { setStatus("// no active tab"); return; }
    await sendMessage({ type: MESSAGE_TYPES.SET_LOCK_STATE, host: activeHost, url: activeUrl, isLocked: !lockState?.isLocked });
    await refreshLockState(); await refreshLockedSites();
  };

  const handleRepeatChange = (r: Repeat) => {
    setSchRepeat(r);
    if (r === "daily")    setSchDays([0, 1, 2, 3, 4, 5, 6]);
    if (r === "weekdays") setSchDays([1, 2, 3, 4, 5]);
    if (r === "weekends") setSchDays([0, 6]);
    if (r === "never")    setSchDays([]);
  };

  const handleToggleDay = (d: number) => {
    setSchDays(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);
    setSchRepeat("custom");
  };

  const saveSchedules = (next: Schedule[]) => {
    setSchedules(next);
    chrome.storage.local.set({ authkey_schedules: next });
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

  const toggleTheme = () => {
    const next: Theme = dk ? "light" : "dark";
    setTheme(next);
    chrome.storage.local.set({ authkey_theme: next });
  };

  /* ════ render ════ */
  return (
    <div
      className="relative overflow-hidden"
      style={{ width: 320, background: tk.bg, color: tk.text, fontFamily: "'Space Grotesk', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');
        html, body, #root { width: 320px; overflow: hidden; margin: 0; padding: 0; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input[type="time"]::-webkit-calendar-picker-indicator {
          opacity: 0.4;
          filter: ${dk ? "invert(1)" : "none"};
        }
      `}</style>

      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{
        backgroundImage: `linear-gradient(${tk.grid} 1px, transparent 1px), linear-gradient(90deg, ${tk.grid} 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col" style={{ padding: "16px 18px 14px" }}>

        {/* ── Header ── */}
        <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
          <div className="flex items-center font-mono font-bold" style={{ fontSize: 15, gap: 5, color: tk.text }}>
            AuthKey
            <span className="rounded-full flex-shrink-0" style={{
              width: 7, height: 7,
              background: tk.accent,
              boxShadow: dk ? `0 0 8px ${tk.accent}88` : "none",
            }} />
          </div>
          <div className="flex items-center" style={{ gap: 5 }}>
            <span className="font-mono rounded"
              style={{ fontSize: 8, letterSpacing: "0.12em", padding: "2px 6px", border: `1px solid ${tk.border}`, color: tk.textMuted }}>
              v1.0
            </span>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex items-center justify-center rounded transition-all cursor-pointer"
              style={{ width: 24, height: 24, border: `1px solid ${tk.border}`, color: tk.textMuted, background: "transparent" }}
            >
              {dk ? <Sun /> : <Moon />}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="relative" style={{ marginBottom: 16 }}>
          <div style={{ height: 1, background: tk.border }} />
          <div className="absolute top-0 left-0" style={{ height: 1, width: 28, background: tk.accent }} />
        </div>

        {/* ── Screens ── */}
        {!isRegistered ? (
          <SetupScreen
            tk={tk}
            theme={theme}
            userId={userId}
            status={status}
            onUserIdChange={setUserId}
            onRegister={handleRegister}
          />
        ) : screen === "main" ? (
          <MainScreen
            tk={tk}
            theme={theme}
            userId={userId}
            status={status}
            activeHost={activeHost}
            lockState={lockState}
            lockedSites={lockedSites}
            activeScheduleCount={schedules.filter(s => s.active).length}
            onToggleLock={handleToggleLock}
            onGoToSchedule={() => setScreen("schedule")}
          />
        ) : (
          <ScheduleScreen
            tk={tk}
            schedules={schedules}
            schHost={schHost}
            schStart={schStart}
            schEnd={schEnd}
            schRepeat={schRepeat}
            schDays={schDays}
            schStatus={schStatus}
            onBack={() => { setScreen("main"); setSchStatus(""); }}
            onHostChange={setSchHost}
            onStartChange={setSchStart}
            onEndChange={setSchEnd}
            onRepeatChange={handleRepeatChange}
            onToggleDay={handleToggleDay}
            onCreate={handleCreateSchedule}
            onToggleSchedule={id => saveSchedules(schedules.map(s => s.id === id ? { ...s, active: !s.active } : s))}
            onDeleteSchedule={id => saveSchedules(schedules.filter(s => s.id !== id))}
          />
        )}
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<Popup />);
export default Popup;