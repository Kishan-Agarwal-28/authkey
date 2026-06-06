import { BackIcon, PlusIcon, TrashIcon, ClockIcon } from "../shared/icons";
import type { Schedule, Repeat } from "./types";
import { DAYS_SHORT } from "./types";

type Props = {
  schedules:        Schedule[];
  schHost:          string;
  schStart:         string;
  schEnd:           string;
  schRepeat:        Repeat;
  schDays:          number[];
  schStatus:        string;
  onBack:           () => void;
  onHostChange:     (v: string) => void;
  onStartChange:    (v: string) => void;
  onEndChange:      (v: string) => void;
  onRepeatChange:   (r: Repeat) => void;
  onToggleDay:      (d: number) => void;
  onCreate:         () => void;
  onToggleSchedule: (id: string) => void;
  onDeleteSchedule: (id: string) => void;
};

export const ScheduleScreen = ({
  schedules, schHost, schStart, schEnd, schRepeat, schDays, schStatus,
  onBack, onHostChange, onStartChange, onEndChange,
  onRepeatChange, onToggleDay, onCreate, onToggleSchedule, onDeleteSchedule,
}: Props) => {
  const pillClass = (on: boolean) =>
    on
      ? "bg-ak-accent-dim border border-ak-accent-border text-ak-accent"
      : "bg-transparent border border-ak-border text-text-muted";

  return (
    <div className="flex flex-col gap-2">

      {/* ── Back row ── */}
      <div className="flex items-center gap-2 mb-0.5">
        <button
          onClick={onBack}
          aria-label="Back"
          className="flex items-center justify-center w-6 h-6 rounded border border-ak-border text-text-muted bg-transparent cursor-pointer transition-all"
        >
          <BackIcon color="currentColor" />
        </button>
        <span className="font-mono uppercase text-[10px] tracking-[0.14em] text-text-muted">
          Schedule Lock
        </span>
      </div>

      {/* ── Create form card ── */}
      <div className="relative rounded-lg overflow-hidden p-3 bg-ak-surface border border-ak-border">
        <div className="absolute top-0 left-0 bottom-0 w-0.5 opacity-50 bg-green" />

        <span className="font-mono uppercase block text-[7px] tracking-[0.2em] text-text-muted mb-[9px]">
          New schedule
        </span>

        {/* Website */}
        <div className="mb-2">
          <label className="font-mono uppercase block text-[8px] tracking-[0.16em] text-text-muted mb-[5px]">
            Website
          </label>
          <input
            className="w-full rounded-[5px] font-mono outline-none transition-colors text-[11px] tracking-[0.03em] px-[11px] py-[9px] bg-input-bg border border-ak-border text-text-sub"
            placeholder="e.g. twitter.com"
            value={schHost}
            onChange={e => onHostChange(e.target.value)}
          />
        </div>

        {/* Start / End times */}
        <div className="flex gap-2 mb-2">
          {([["Start", schStart, onStartChange], ["End", schEnd, onEndChange]] as [string, string, (v: string) => void][])
            .map(([lbl, val, fn]) => (
              <div key={lbl} className="flex flex-col flex-1">
                <label className="font-mono uppercase block text-[8px] tracking-[0.16em] text-text-muted mb-[5px]">
                  {lbl}
                </label>
                <input
                  type="time"
                  value={val}
                  onChange={e => fn(e.target.value)}
                  className="w-full rounded-[5px] font-mono outline-none text-[11px] px-[10px] py-2 bg-input-bg border border-ak-border text-text-sub"
                />
              </div>
            ))
          }
        </div>

        {/* Repeat pills */}
        <div className="mb-1.5">
          <label className="font-mono uppercase block text-[8px] tracking-[0.16em] text-text-muted mb-[5px]">
            Repeat
          </label>
          <div className="flex flex-wrap gap-1">
            {(["never", "daily", "weekdays", "weekends", "custom"] as Repeat[]).map(r => (
              <button
                key={r}
                onClick={() => onRepeatChange(r)}
                className={`font-mono font-bold uppercase rounded cursor-pointer transition-all text-[8px] tracking-[0.1em] px-[9px] py-[5px] ${pillClass(schRepeat === r)}`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Day toggles */}
        <div className="mb-[10px]">
          <label className="font-mono uppercase block text-[8px] tracking-[0.16em] text-text-muted mb-[5px]">
            Days
          </label>
          <div className="flex gap-1">
            {DAYS_SHORT.map((d, i) => (
              <button
                key={i}
                onClick={() => onToggleDay(i)}
                className={`flex items-center justify-center font-mono font-bold uppercase cursor-pointer transition-all text-[8px] tracking-[0.04em] w-[30px] h-[26px] rounded ${pillClass(schDays.includes(i))}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onCreate}
          className="relative w-full flex items-center justify-center gap-[7px] rounded-[5px] font-mono font-bold uppercase overflow-hidden cursor-pointer transition-all text-[9px] tracking-[0.14em] p-[10px] bg-btn-bg border border-btn-border text-text"
        >
          <span className="absolute top-0 left-0 bottom-0 w-0.5 bg-ak-accent" />
          <PlusIcon color="currentColor" /> Create Schedule
        </button>

        {schStatus && (
          <p className="font-mono text-center text-[9px] tracking-[0.06em] text-text-muted mt-2">
            {schStatus}
          </p>
        )}
      </div>

      {/* ── Active schedules list ── */}
      {schedules.length > 0 && (
        <div className="relative rounded-lg overflow-hidden p-3 bg-ak-surface border border-ak-border">
          <div className="absolute top-0 left-0 bottom-0 w-0.5 bg-border" />
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono uppercase text-[7px] tracking-[0.2em] text-text-muted">Active schedules</span>
            <span className="font-mono text-[7px] tracking-[0.12em] text-text-dim">{schedules.length}</span>
          </div>
          <div
            className="flex flex-col overflow-y-auto gap-1"
            style={{ maxHeight: 120, scrollbarWidth: "thin", scrollbarColor: "var(--c-border) transparent" }}
          >
            {schedules.map(s => (
              <div key={s.id} className="flex items-center gap-2 rounded px-[10px] py-2 bg-ak-surface-deep border border-ak-border">
                <div className="flex-1 min-w-0">
                  <div className="font-mono truncate text-[10px] mb-0.5 text-text-sub">{s.host}</div>
                  <div className="flex items-center gap-1 font-mono text-[8px] tracking-[0.04em] text-text-muted">
                    <ClockIcon color="currentColor" /> {s.startTime} → {s.endTime} · {s.repeat}
                  </div>
                </div>

                {/* Toggle switch */}
                <div
                  role="button"
                  aria-label="Toggle schedule"
                  onClick={() => onToggleSchedule(s.id)}
                  className="relative flex-shrink-0 rounded-full cursor-pointer transition-all w-[28px] h-[16px]"
                  style={{
                    border:     `1px solid ${s.active ? "var(--c-green-border)" : "var(--c-border)"}`,
                    background:  s.active ? "var(--c-green)" : "transparent",
                  }}
                >
                  <div
                    className="absolute rounded-full transition-all w-[10px] h-[10px] top-[2px]"
                    style={{ left: s.active ? 14 : 2, background: s.active ? "#fff" : "var(--c-text-muted)" }}
                  />
                </div>

                {/* Delete */}
                <button
                  onClick={() => onDeleteSchedule(s.id)}
                  aria-label="Delete schedule"
                  className="flex items-center justify-center flex-shrink-0 w-5 h-5 rounded bg-transparent border border-ak-border text-text-muted cursor-pointer transition-all"
                >
                  <TrashIcon color="currentColor" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};