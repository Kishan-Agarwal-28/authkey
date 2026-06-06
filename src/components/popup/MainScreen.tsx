import type { DynamicTokens } from "../shared/tokens";
import type { GetLockStateResponse, LockedSiteSummary } from "@/messages";
import { GlobeIcon, LockIcon, UnlockIcon, GearIcon, ClockIcon } from "../shared/icons";
import { ENTRY_H, ENTRY_GAP, listHeight } from "./types";

type Props = {
  dyn:                 DynamicTokens;
  dk:                  boolean;
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
  dyn, dk, userId, status, activeHost, lockState,
  lockedSites, activeScheduleCount, onToggleLock, onGoToSchedule,
}: Props) => {
  const ls = (() => {
    if (!lockState?.isLocked) return { label: "UNLOCKED",    type: "neutral" } as const;
    if (lockState.isUnlocked) return { label: "TEMP·UNLOCK", type: "amber"   } as const;
    return                           { label: "LOCKED",      type: "red"     } as const;
  })();

  const ledStyle =
    ls.type === "red"   ? { background: `var(--c-accent)`, boxShadow: dk ? `0 0 6px ${dyn.accentHex}88` : "none" } :
    ls.type === "amber" ? { background: `var(--c-amber)`,  boxShadow: dk ? `0 0 6px ${dyn.amberHex}88`  : "none" } :
                          { background: `var(--c-led-neutral)` };

  const ledColorClass =
    ls.type === "red"   ? "text-ak-accent" :
    ls.type === "amber" ? "text-amber"  : "text-text-muted";

  return (
    <div className="flex flex-col">

      {/* ── Nav tabs ── */}
      <div className="flex gap-1 mb-[14px]">
        <button className="flex items-center gap-[5px] rounded font-mono font-bold uppercase cursor-pointer text-[8px] tracking-[0.14em] px-[10px] py-[5px] bg-ak-accent-dim border border-ak-accent-border text-ak-accent">
          <LockIcon color="currentColor" /> Sites
        </button>
        <button
          onClick={onGoToSchedule}
          className="flex items-center gap-[5px] rounded font-mono font-bold uppercase cursor-pointer transition-all text-[8px] tracking-[0.14em] px-[10px] py-[5px] bg-transparent border border-border text-text-muted"
        >
          <ClockIcon color="currentColor" /> Schedule
          {activeScheduleCount > 0 && (
            <span className="font-mono font-bold text-[7px] px-1 py-px rounded-sm bg-ak-accent text-white">
              {activeScheduleCount}
            </span>
          )}
        </button>
      </div>

      {/* ── Active site card ── */}
      <div className="relative rounded-lg overflow-hidden p-3 mb-2 bg-surface border border-border">
        <div
          className="absolute top-0 left-0 bottom-0 w-0.5"
          style={{
            background: ls.type === "red" ? `var(--c-accent)` : `var(--c-border)`,
            opacity: ls.type === "red" ? (dk ? 0.5 : 0.4) : 1,
          }}
        />
        <span className="font-mono uppercase block text-[7px] tracking-[0.2em] text-text-muted mb-[9px]">
          Active site
        </span>
        <div className="flex items-center gap-2 mb-[9px]">
          <div className="flex items-center justify-center flex-shrink-0 rounded w-[26px] h-[26px] bg-site-ico-bg border border-border">
            <GlobeIcon color="currentColor" className="text-icon" />
          </div>
          <span className={`font-mono flex-1 truncate text-[11px] tracking-[0.02em] ${activeHost ? "text-text-sub" : "text-text-muted"}`}>
            {activeHost || "no active tab"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="rounded-full flex-shrink-0 w-[5px] h-[5px]" style={ledStyle} />
            <span className={`font-mono uppercase text-[8px] tracking-[0.12em] ${ledColorClass}`}>
              {ls.label}
            </span>
          </div>
          <button
            onClick={onToggleLock}
            className={`flex items-center gap-1 rounded font-mono font-bold uppercase cursor-pointer transition-all text-[7px] tracking-[0.12em] px-[10px] py-[5px] ${
              lockState?.isLocked
                ? "bg-ak-accent-dim border border-ak-accent-border text-ak-accent"
                : "bg-transparent border border-border text-text-muted"
            }`}
          >
            {lockState?.isLocked
              ? <><UnlockIcon color="currentColor" /> Remove</>
              : <><LockIcon   color="currentColor" /> Lock</>
            }
          </button>
        </div>
      </div>

      {/* ── Protected sites card ── */}
      <div className="relative rounded-lg overflow-hidden p-3 mb-2 bg-surface border border-border">
        <div className="absolute top-0 left-0 bottom-0 w-0.5 bg-border" />
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono uppercase text-[7px] tracking-[0.2em] text-text-muted">Protected</span>
          <span className="font-mono text-[7px] tracking-[0.12em] text-text-dim">
            {lockedSites.length} site{lockedSites.length !== 1 ? "s" : ""}
          </span>
        </div>
        <div
          className="flex flex-col overflow-y-auto"
          style={{
            gap: ENTRY_GAP,
            height: listHeight(lockedSites.length),
            scrollbarWidth: "thin",
            scrollbarColor: "var(--c-border) transparent",
          }}
        >
          {lockedSites.length === 0 ? (
            <p className="font-mono text-center text-[9px] tracking-[0.08em] py-2 text-text-dim">
              // no protected sites
            </p>
          ) : lockedSites.map(site => (
            <div
              key={site.host}
              className="flex items-center justify-between flex-shrink-0 rounded px-[9px] bg-surface-deep border border-border"
              style={{ height: ENTRY_H }}
            >
              <span className="font-mono text-[10px] tracking-[0.02em] text-text-sub">{site.host}</span>
              <span className="font-mono uppercase text-[7px] tracking-[0.1em] px-1.5 py-0.5 rounded-sm text-ak-accent bg-tag-bg border border-ak-accent-border">
                locked
              </span>
            </div>
          ))}
        </div>
      </div>

      {status && (
        <p className="font-mono text-center text-[9px] tracking-[0.06em] text-text-muted mb-2">{status}</p>
      )}

      {/* ── Account bar ── */}
      <div className="relative flex items-center gap-[9px] rounded-lg overflow-hidden px-[10px] py-[9px] bg-surface border border-border">
        <div className="absolute top-0 left-0 bottom-0 w-0.5 bg-border" />
        <div className="flex items-center justify-center rounded-full flex-shrink-0 w-[26px] h-[26px] font-mono font-bold uppercase text-[9px] bg-ak-accent-dim border border-ak-accent-border text-ak-accent">
          {userId ? userId.slice(0, 2) : "AK"}
        </div>
        <span className="font-mono flex-1 truncate text-[10px] tracking-[0.04em] text-text-sub">
          {userId || "user"}
        </span>
        <button
          onClick={() => chrome.runtime.openOptionsPage?.()}
          aria-label="Open settings"
          className="flex items-center justify-center flex-shrink-0 w-[26px] h-[26px] rounded bg-transparent border border-border text-text-muted cursor-pointer transition-all"
        >
          <GearIcon color="currentColor" />
        </button>
      </div>
    </div>
  );
};