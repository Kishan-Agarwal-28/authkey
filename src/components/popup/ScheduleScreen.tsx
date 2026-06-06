import type { Tokens } from "../shared/tokens";
import { BackIcon, PlusIcon, TrashIcon, ClockIcon } from "../shared/icons";
import type { Schedule, Repeat } from "./types";
import { DAYS_SHORT } from "./types";

type Props = {
  tk:           Tokens;
  schedules:    Schedule[];
  schHost:      string;
  schStart:     string;
  schEnd:       string;
  schRepeat:    Repeat;
  schDays:      number[];
  schStatus:    string;
  onBack:            () => void;
  onHostChange:      (v: string) => void;
  onStartChange:     (v: string) => void;
  onEndChange:       (v: string) => void;
  onRepeatChange:    (r: Repeat) => void;
  onToggleDay:       (d: number) => void;
  onCreate:          () => void;
  onToggleSchedule:  (id: string) => void;
  onDeleteSchedule:  (id: string) => void;
};

export const ScheduleScreen = ({
  tk, schedules, schHost, schStart, schEnd, schRepeat, schDays, schStatus,
  onBack, onHostChange, onStartChange, onEndChange,
  onRepeatChange, onToggleDay, onCreate, onToggleSchedule, onDeleteSchedule,
}: Props) => {
  const card  = { background: tk.surface,     border: `1px solid ${tk.border}` };
  const entry = { background: tk.surfaceDeep, border: `1px solid ${tk.border}` };
  const input = { background: tk.inputBg,     border: `1px solid ${tk.border}`, color: tk.textSub };

  const pill = (on: boolean) => ({
    background:  on ? tk.accentDim   : "transparent",
    border:     `1px solid ${on ? tk.accentBorder : tk.border}`,
    color:       on ? tk.accent      : tk.textMuted,
  });

  return (
    <div className="flex flex-col" style={{ gap: 8 }}>

      {/* ── Back row ── */}
      <div className="flex items-center" style={{ gap: 8, marginBottom: 2 }}>
        <button
          onClick={onBack}
          aria-label="Back"
          className="flex items-center justify-center rounded cursor-pointer transition-all"
          style={{ width: 24, height: 24, background: "transparent", border: `1px solid ${tk.border}`, color: tk.textMuted, borderRadius: 4 }}>
          <BackIcon color={tk.textMuted} />
        </button>
        <span className="font-mono uppercase"
          style={{ fontSize: 10, letterSpacing: "0.14em", color: tk.textMuted }}>
          Schedule Lock
        </span>
      </div>

      {/* ── Create form card ── */}
      <div className="relative rounded-lg overflow-hidden" style={{ ...card, padding: 12, borderRadius: 7 }}>
        <div className="absolute top-0 left-0 bottom-0" style={{ width: 2, background: tk.green, opacity: 0.5 }} />

        <span className="font-mono uppercase block"
          style={{ fontSize: 7, letterSpacing: "0.2em", color: tk.textMuted, marginBottom: 9 }}>
          New schedule
        </span>

        {/* Website */}
        <div style={{ marginBottom: 8 }}>
          <label className="font-mono uppercase block"
            style={{ fontSize: 8, letterSpacing: "0.16em", color: tk.textMuted, marginBottom: 5 }}>
            Website
          </label>
          <input
            className="w-full rounded font-mono outline-none transition-colors"
            placeholder="e.g. twitter.com"
            value={schHost}
            onChange={e => onHostChange(e.target.value)}
            style={{ ...input, fontSize: 11, letterSpacing: "0.03em", padding: "9px 11px", borderRadius: 5 }}
          />
        </div>

        {/* Start / End times */}
        <div className="flex" style={{ gap: 8, marginBottom: 8 }}>
          {([["Start", schStart, onStartChange], ["End", schEnd, onEndChange]] as [string, string, (v: string) => void][])
            .map(([lbl, val, fn]) => (
              <div key={lbl} className="flex flex-col flex-1">
                <label className="font-mono uppercase block"
                  style={{ fontSize: 8, letterSpacing: "0.16em", color: tk.textMuted, marginBottom: 5 }}>
                  {lbl}
                </label>
                <input
                  type="time"
                  value={val}
                  onChange={e => fn(e.target.value)}
                  className="w-full rounded font-mono outline-none"
                  style={{ ...input, fontSize: 11, padding: "8px 10px", borderRadius: 5 }}
                />
              </div>
            ))
          }
        </div>

        {/* Repeat pills */}
        <div style={{ marginBottom: 6 }}>
          <label className="font-mono uppercase block"
            style={{ fontSize: 8, letterSpacing: "0.16em", color: tk.textMuted, marginBottom: 5 }}>
            Repeat
          </label>
          <div className="flex flex-wrap" style={{ gap: 4 }}>
            {(["never", "daily", "weekdays", "weekends", "custom"] as Repeat[]).map(r => (
              <button
                key={r}
                onClick={() => onRepeatChange(r)}
                className="font-mono font-bold uppercase rounded cursor-pointer transition-all"
                style={{ fontSize: 8, letterSpacing: "0.1em", padding: "5px 9px", borderRadius: 3, ...pill(schRepeat === r) }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Day toggles */}
        <div style={{ marginBottom: 10 }}>
          <label className="font-mono uppercase block"
            style={{ fontSize: 8, letterSpacing: "0.16em", color: tk.textMuted, marginBottom: 5 }}>
            Days
          </label>
          <div className="flex" style={{ gap: 4 }}>
            {DAYS_SHORT.map((d, i) => (
              <button
                key={i}
                onClick={() => onToggleDay(i)}
                className="flex items-center justify-center font-mono font-bold uppercase rounded cursor-pointer transition-all"
                style={{ width: 30, height: 26, fontSize: 8, letterSpacing: "0.04em", borderRadius: 3, ...pill(schDays.includes(i)) }}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onCreate}
          className="relative w-full flex items-center justify-center rounded font-mono font-bold uppercase overflow-hidden cursor-pointer transition-all"
          style={{
            fontSize: 9, letterSpacing: "0.14em", gap: 7, padding: 10,
            background: tk.btnBg, border: `1px solid ${tk.btnBorder}`, color: tk.text, borderRadius: 5,
          }}
        >
          <span className="absolute top-0 left-0 bottom-0" style={{ width: 2, background: tk.accent }} />
          <PlusIcon color={tk.text} /> Create Schedule
        </button>

        {schStatus && (
          <p className="font-mono text-center"
            style={{ fontSize: 9, letterSpacing: "0.06em", color: tk.textMuted, marginTop: 8 }}>
            {schStatus}
          </p>
        )}
      </div>

      {/* ── Active schedules list ── */}
      {schedules.length > 0 && (
        <div className="relative rounded-lg overflow-hidden" style={{ ...card, padding: 12, borderRadius: 7 }}>
          <div className="absolute top-0 left-0 bottom-0" style={{ width: 2, background: tk.border }} />

          <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
            <span className="font-mono uppercase" style={{ fontSize: 7, letterSpacing: "0.2em", color: tk.textMuted }}>
              Active schedules
            </span>
            <span className="font-mono" style={{ fontSize: 7, letterSpacing: "0.12em", color: tk.textDim }}>
              {schedules.length}
            </span>
          </div>

          <div className="flex flex-col overflow-y-auto"
            style={{ gap: 4, maxHeight: 120, scrollbarWidth: "thin", scrollbarColor: `${tk.border} transparent` }}>
            {schedules.map(s => (
              <div key={s.id}
                className="flex items-center rounded"
                style={{ gap: 8, padding: "8px 10px", borderRadius: 5, ...entry }}>
                <div className="flex-1 min-w-0">
                  <div className="font-mono truncate"
                    style={{ fontSize: 10, color: tk.textSub, marginBottom: 2 }}>
                    {s.host}
                  </div>
                  <div className="flex items-center font-mono" style={{ fontSize: 8, color: tk.textMuted, letterSpacing: "0.04em", gap: 4 }}>
                    <ClockIcon color={tk.textMuted} /> {s.startTime} → {s.endTime} · {s.repeat}
                  </div>
                </div>

                {/* Toggle switch */}
                <div
                  role="button"
                  aria-label="Toggle schedule"
                  onClick={() => onToggleSchedule(s.id)}
                  className="relative flex-shrink-0 rounded-full cursor-pointer transition-all"
                  style={{
                    width: 28, height: 16, borderRadius: 8,
                    border:      `1px solid ${s.active ? tk.greenBorder : tk.border}`,
                    background:   s.active ? tk.green : "transparent",
                  }}
                >
                  <div className="absolute rounded-full transition-all"
                    style={{ top: 2, width: 10, height: 10, borderRadius: "50%", left: s.active ? 14 : 2, background: s.active ? "#fff" : tk.textMuted }} />
                </div>

                {/* Delete */}
                <button
                  onClick={() => onDeleteSchedule(s.id)}
                  aria-label="Delete schedule"
                  className="flex items-center justify-center flex-shrink-0 rounded cursor-pointer transition-all"
                  style={{ width: 20, height: 20, background: "transparent", border: `1px solid ${tk.border}`, color: tk.textMuted, borderRadius: 3 }}>
                  <TrashIcon color={tk.textMuted} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};