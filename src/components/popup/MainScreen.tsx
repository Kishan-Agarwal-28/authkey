import type { Tokens, Theme } from "../shared/tokens";
import type { GetLockStateResponse, LockedSiteSummary } from "@/messages";
import { GlobeIcon, LockIcon, UnlockIcon, GearIcon, ClockIcon } from "../shared/icons";
import { ENTRY_H, ENTRY_GAP, listHeight } from "./types";

type Props = {
  tk:                  Tokens;
  theme:               Theme;
  userId:              string;
  status:              string;
  activeHost:          string;
  lockState:           GetLockStateResponse | null;
  lockedSites:         LockedSiteSummary[];
  activeScheduleCount: number;
  onToggleLock:        () => void;
  onGoToSchedule:      () => void;
};

export const MainScreen = ({
  tk, theme, userId, status, activeHost, lockState,
  lockedSites, activeScheduleCount, onToggleLock, onGoToSchedule,
}: Props) => {
  const dk = theme === "dark";

  const ls = (() => {
    if (!lockState?.isLocked) return { label: "UNLOCKED",    type: "neutral" } as const;
    if (lockState.isUnlocked) return { label: "TEMP·UNLOCK", type: "amber"   } as const;
    return                           { label: "LOCKED",      type: "red"     } as const;
  })();

  const ledStyle =
    ls.type === "red"   ? { background: tk.accent, boxShadow: dk ? `0 0 6px ${tk.accent}88` : "none" } :
    ls.type === "amber" ? { background: tk.amber,  boxShadow: dk ? `0 0 6px ${tk.amber}88`  : "none" } :
                          { background: tk.ledNeutral };

  const ledColor = ls.type === "red" ? tk.accent : ls.type === "amber" ? tk.amber : tk.textMuted;

  const card  = { background: tk.surface, border: `1px solid ${tk.border}` };
  const entry = { background: tk.surfaceDeep, border: `1px solid ${tk.border}` };

  return (
    <div className="flex flex-col">

      {/* ── Nav tabs ── */}
      <div className="flex" style={{ gap: 4, marginBottom: 14 }}>
        {/* Sites — active */}
        <button
          className="flex items-center rounded font-mono font-bold uppercase cursor-pointer"
          style={{
            fontSize: 8, letterSpacing: "0.14em", padding: "5px 10px", gap: 5, borderRadius: 4,
            background: tk.accentDim, border: `1px solid ${tk.accentBorder}`, color: tk.accent,
          }}
        >
          <LockIcon color={tk.accent} /> Sites
        </button>

        {/* Schedule */}
        <button
          onClick={onGoToSchedule}
          className="flex items-center rounded font-mono font-bold uppercase cursor-pointer transition-all"
          style={{
            fontSize: 8, letterSpacing: "0.14em", padding: "5px 10px", gap: 5, borderRadius: 4,
            background: "transparent", border: `1px solid ${tk.border}`, color: tk.textMuted,
          }}
        >
          <ClockIcon color  ={tk.textMuted} /> Schedule
          {activeScheduleCount > 0 && (
            <span className="font-mono font-bold"
              style={{ fontSize: 7, padding: "1px 4px", background: tk.accent, color: "#fff", borderRadius: 2 }}>
              {activeScheduleCount}
            </span>
          )}
        </button>
      </div>

      {/* ── Active site card ── */}
      <div className="relative rounded-lg overflow-hidden"
        style={{ ...card, padding: 12, borderRadius: 7, marginBottom: 8 }}>
        <div className="absolute top-0 left-0 bottom-0"
          style={{ width: 2, background: ls.type === "red" ? tk.accent : tk.border, opacity: ls.type === "red" ? (dk ? 0.5 : 0.4) : 1 }} />

        <span className="font-mono uppercase block"
          style={{ fontSize: 7, letterSpacing: "0.2em", color: tk.textMuted, marginBottom: 9 }}>
          Active site
        </span>

        {/* Hostname row */}
        <div className="flex items-center" style={{ gap: 8, marginBottom: 9 }}>
          <div className="flex items-center justify-center flex-shrink-0 rounded"
            style={{ width: 26, height: 26, background: tk.siteIcoBg, border: `1px solid ${tk.border}`, borderRadius: 4 }}>
            <GlobeIcon color={tk.iconColor} />
          </div>
          <span className="font-mono flex-1 truncate"
            style={{ fontSize: 11, letterSpacing: "0.02em", color: activeHost ? tk.textSub : tk.textMuted }}>
            {activeHost || "no active tab"}
          </span>
        </div>

        {/* Status + toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center" style={{ gap: 6 }}>
            <div className="rounded-full flex-shrink-0" style={{ width: 5, height: 5, ...ledStyle }} />
            <span className="font-mono uppercase" style={{ fontSize: 8, letterSpacing: "0.12em", color: ledColor }}>
              {ls.label}
            </span>
          </div>
          <button
            onClick={onToggleLock}
            className="flex items-center rounded font-mono font-bold uppercase cursor-pointer transition-all"
            style={{
              fontSize: 7, letterSpacing: "0.12em", padding: "5px 10px", gap: 4, borderRadius: 3,
              background: lockState?.isLocked ? tk.accentDim  : "transparent",
              border:    `1px solid ${lockState?.isLocked ? tk.accentBorder : tk.border}`,
              color:      lockState?.isLocked ? tk.accent      : tk.textMuted,
            }}
          >
            {lockState?.isLocked
              ? <><UnlockIcon color={tk.accent} />   Remove</>
              : <><LockIcon   color={tk.textMuted} /> Lock</>
            }
          </button>
        </div>
      </div>

      {/* ── Protected sites card ── */}
      <div className="relative rounded-lg overflow-hidden"
        style={{ ...card, padding: 12, borderRadius: 7, marginBottom: 8 }}>
        <div className="absolute top-0 left-0 bottom-0" style={{ width: 2, background: tk.border }} />

        <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
          <span className="font-mono uppercase" style={{ fontSize: 7, letterSpacing: "0.2em", color: tk.textMuted }}>
            Protected
          </span>
          <span className="font-mono" style={{ fontSize: 7, letterSpacing: "0.12em", color: tk.textDim }}>
            {lockedSites.length} site{lockedSites.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="flex flex-col overflow-y-auto"
          style={{
            gap: ENTRY_GAP,
            height: listHeight(lockedSites.length),
            scrollbarWidth: "thin",
            scrollbarColor: `${tk.border} transparent`,
          }}
        >
          {lockedSites.length === 0 ? (
            <p className="font-mono text-center"
              style={{ fontSize: 9, color: tk.textDim, padding: "8px 0", letterSpacing: "0.08em" }}>
              // no protected sites
            </p>
          ) : lockedSites.map(site => (
            <div key={site.host}
              className="flex items-center justify-between flex-shrink-0 rounded"
              style={{ height: ENTRY_H, padding: "0 9px", borderRadius: 4, ...entry }}>
              <span className="font-mono" style={{ fontSize: 10, letterSpacing: "0.02em", color: tk.textSub }}>
                {site.host}
              </span>
              <span className="font-mono uppercase"
                style={{ fontSize: 7, letterSpacing: "0.1em", padding: "2px 6px", borderRadius: 2, color: tk.accent, background: tk.tagBg, border: `1px solid ${tk.accentBorder}` }}>
                locked
              </span>
            </div>
          ))}
        </div>
      </div>

      {status && (
        <p className="font-mono text-center"
          style={{ fontSize: 9, letterSpacing: "0.06em", color: tk.textMuted, marginBottom: 8 }}>
          {status}
        </p>
      )}

      {/* ── Account bar ── */}
      <div className="relative flex items-center rounded-lg overflow-hidden"
        style={{ ...card, padding: "9px 10px", gap: 9, borderRadius: 7 }}>
        <div className="absolute top-0 left-0 bottom-0" style={{ width: 2, background: tk.border }} />

        <div className="flex items-center justify-center rounded-full flex-shrink-0 font-mono font-bold uppercase"
          style={{ width: 26, height: 26, fontSize: 9, background: tk.accentDim, border: `1px solid ${tk.accentBorder}`, color: tk.accent }}>
          {userId ? userId.slice(0, 2) : "AK"}
        </div>

        <span className="font-mono flex-1 truncate"
          style={{ fontSize: 10, letterSpacing: "0.04em", color: tk.textSub }}>
          {userId || "user"}
        </span>

        <button
          onClick={() => chrome.runtime.openOptionsPage?.()}
          aria-label="Open settings"
          className="flex items-center justify-center flex-shrink-0 rounded cursor-pointer transition-all"
          style={{ width: 26, height: 26, background: "transparent", border: `1px solid ${tk.border}`, color: tk.textMuted, borderRadius: 4 }}>
          <GearIcon color={tk.textMuted} />
        </button>
      </div>
    </div>
  );
};
