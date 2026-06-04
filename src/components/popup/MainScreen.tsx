import type { Theme, Tokens } from "../shared/tokens";
import { cardStyle, ENTRY_H, ENTRY_GAP, listHeight } from "../shared/tokens";
import { Globe, LockI, Unlock, Clock, Gear } from "../shared/icons";
import type { GetLockStateResponse, LockedSiteSummary } from "@/messages";
import type { Schedule } from "../../pages/popupPages/popup";

type LedState = { label: string; type: "neutral" | "amber" | "red" };

type Props = {
  theme:        Theme;
  tk:           Tokens;
  activeHost:   string;
  userId:       string;
  lockState:    GetLockStateResponse | null;
  lockedSites:  LockedSiteSummary[];
  schedules:    Schedule[];
  status:       string;
  onToggleLock: () => void;
  onGoSchedule: () => void;
};

export const MainScreen = ({
  theme, tk, activeHost, userId, lockState, lockedSites, schedules, status,
  onToggleLock, onGoSchedule,
}: Props) => {
  const dk = theme === "dark";

  const ls: LedState = (() => {
    if (!lockState?.isLocked) return { label: "UNLOCKED",    type: "neutral" };
    if (lockState.isUnlocked) return { label: "TEMP·UNLOCK", type: "amber"   };
    return                           { label: "LOCKED",      type: "red"     };
  })();

  const ledStyle =
    ls.type === "red"   ? { background: tk.accent,    boxShadow: dk ? `0 0 6px ${tk.accent}88` : "none" } :
    ls.type === "amber" ? { background: tk.amber,     boxShadow: dk ? `0 0 6px ${tk.amber}88`  : "none" } :
                          { background: tk.ledNeutral };

  const ledColor       = ls.type === "red" ? tk.accent : ls.type === "amber" ? tk.amber : tk.textMuted;
  const protectedListH = listHeight(lockedSites.length);
  const activeSchedules = schedules.filter(s => s.active);

  return (
    <div className="flex flex-col">

      {/* Nav tabs */}
      <div className="flex" style={{ gap: 4, marginBottom: 14 }}>
        <button
          className="flex items-center rounded font-mono font-bold uppercase cursor-pointer"
          style={{
            fontSize: 8, letterSpacing: "0.14em", padding: "5px 10px", gap: 5, borderRadius: 4,
            background: tk.accentDim, border: `1px solid ${tk.accentBorder}`, color: tk.accent,
          }}
        >
          <LockI c={tk.accent} /> Sites
        </button>
        <button
          onClick={onGoSchedule}
          className="flex items-center rounded font-mono font-bold uppercase cursor-pointer transition-all"
          style={{
            fontSize: 8, letterSpacing: "0.14em", padding: "5px 10px", gap: 5, borderRadius: 4,
            background: "transparent", border: `1px solid ${tk.border}`, color: tk.textMuted,
          }}
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

      {/* Active site card */}
      <div
        className="relative rounded-lg overflow-hidden"
        style={{ ...cardStyle(tk), padding: 12, borderRadius: 7, marginBottom: 8 }}
      >
        <div
          className="absolute top-0 left-0 bottom-0"
          style={{
            width: 2,
            background: ls.type === "red" ? tk.accent : tk.border,
            opacity: ls.type === "red" ? (dk ? 0.5 : 0.4) : 1,
          }}
        />
        <span
          className="font-mono uppercase block"
          style={{ fontSize: 7, letterSpacing: "0.2em", color: tk.textMuted, marginBottom: 9 }}
        >
          Active site
        </span>
        {/* hostname row */}
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
            <span
              className="font-mono uppercase"
              style={{ fontSize: 8, letterSpacing: "0.12em", color: ledColor }}
            >
              {ls.label}
            </span>
          </div>
          <button
            onClick={onToggleLock}
            className="flex items-center rounded font-mono font-bold uppercase cursor-pointer transition-all"
            style={{
              fontSize: 7, letterSpacing: "0.12em", padding: "5px 10px", gap: 4, borderRadius: 3,
              background:  lockState?.isLocked ? tk.accentDim  : "transparent",
              border:     `1px solid ${lockState?.isLocked ? tk.accentBorder : tk.border}`,
              color:       lockState?.isLocked ? tk.accent      : tk.textMuted,
            }}
          >
            {lockState?.isLocked
              ? <><Unlock c={tk.accent}  /> Remove</>
              : <><LockI  c={tk.textMuted}/> Lock</>
            }
          </button>
        </div>
      </div>

      {/* Protected sites card */}
      <div
        className="relative rounded-lg overflow-hidden"
        style={{ ...cardStyle(tk), padding: 12, borderRadius: 7, marginBottom: 8 }}
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
        <div
          className="flex flex-col overflow-y-auto"
          style={{
            gap: ENTRY_GAP, height: protectedListH,
            scrollbarWidth: "thin", scrollbarColor: `${tk.border} transparent`,
          }}
        >
          {lockedSites.length === 0 ? (
            <p
              className="font-mono text-center"
              style={{ fontSize: 9, color: tk.textDim, padding: "8px 0", letterSpacing: "0.08em" }}
            >
              // no protected sites
            </p>
          ) : lockedSites.map(site => (
            <div
              key={site.host}
              className="flex items-center justify-between flex-shrink-0 rounded"
              style={{
                height: ENTRY_H, padding: "0 9px",
                background: tk.surfaceDeep, border: `1px solid ${tk.border}`, borderRadius: 4,
              }}
            >
              <span className="font-mono" style={{ fontSize: 10, letterSpacing: "0.02em", color: tk.textSub }}>
                {site.host}
              </span>
              <span
                className="font-mono uppercase rounded"
                style={{
                  fontSize: 7, letterSpacing: "0.1em", padding: "2px 6px",
                  color: tk.accent, background: tk.tagBg, border: `1px solid ${tk.accentBorder}`, borderRadius: 2,
                }}
              >
                locked
              </span>
            </div>
          ))}
        </div>
      </div>

      {status && (
        <p
          className="font-mono text-center"
          style={{ fontSize: 9, letterSpacing: "0.06em", color: tk.textMuted, marginBottom: 8 }}
        >
          {status}
        </p>
      )}

      {/* Account bar */}
      <div
        className="relative flex items-center rounded-lg overflow-hidden"
        style={{ ...cardStyle(tk), padding: "9px 10px", gap: 9, borderRadius: 7 }}
      >
        <div className="absolute top-0 left-0 bottom-0" style={{ width: 2, background: tk.border }} />
        <div
          className="flex items-center justify-center rounded-full flex-shrink-0 font-mono font-bold uppercase"
          style={{
            width: 26, height: 26, fontSize: 9,
            background: tk.accentDim, border: `1px solid ${tk.accentBorder}`, color: tk.accent,
          }}
        >
          {userId ? userId.slice(0, 2) : "AK"}
        </div>
        <span className="font-mono flex-1 truncate" style={{ fontSize: 10, letterSpacing: "0.04em", color: tk.textSub }}>
          {userId || "user"}
        </span>
        <button
          onClick={() => chrome.runtime.openOptionsPage?.()}
          aria-label="Open settings"
          className="flex items-center justify-center flex-shrink-0 rounded cursor-pointer transition-all"
          style={{
            width: 26, height: 26, background: "transparent",
            border: `1px solid ${tk.border}`, color: tk.textMuted, borderRadius: 4,
          }}
        >
          <Gear c={tk.textMuted} />
        </button>
      </div>
    </div>
  );
};
