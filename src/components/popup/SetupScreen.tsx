import type { Tokens, Theme } from "../shared/tokens";
import { ShieldFP } from "../shared/ShieldFP";
import { ShieldIcon } from "../shared/icons";

type Props = {
  tk:             Tokens;
  theme:          Theme;
  userId:         string;
  status:         string;
  onUserIdChange: (v: string) => void;
  onRegister:     () => void;
};

export const SetupScreen = ({ tk, theme, userId, status, onUserIdChange, onRegister }: Props) => (
  <div className="flex flex-col items-center">

    {/* Shield + decorative rings */}
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

    <span className="font-mono uppercase" style={{ fontSize: 8, letterSpacing: "0.2em", color: tk.accent, opacity: 0.8, marginBottom: 7 }}>
      WebAuthn · Biometric
    </span>

    <h2 className="font-sans font-semibold text-center"
      style={{ fontSize: 17, lineHeight: 1.25, letterSpacing: "-0.03em", color: tk.text, marginBottom: 4 }}>
      Set up AuthKey
    </h2>

    <p className="font-mono uppercase"
      style={{ fontSize: 8, letterSpacing: "0.14em", color: tk.textMuted, marginBottom: 22 }}>
      secure your browsing
    </p>

    {/* Form */}
    <div className="w-full flex flex-col" style={{ gap: 10 }}>
      <div>
        <label className="font-mono uppercase block"
          style={{ fontSize: 8, letterSpacing: "0.16em", color: tk.textMuted, marginBottom: 5 }}>
          Username
        </label>
        <input
          type="text"
          placeholder="e.g. john_doe"
          value={userId}
          onChange={e => onUserIdChange(e.target.value)}
          onKeyDown={e => e.key === "Enter" && onRegister()}
          className="w-full rounded outline-none transition-colors font-mono"
          style={{
            background: tk.inputBg, border: `1px solid ${tk.border}`, color: tk.textSub,
            fontSize: 11, letterSpacing: "0.03em", padding: "9px 11px", borderRadius: 5,
          }}
        />
      </div>

      <button
        onClick={onRegister}
        className="relative w-full flex items-center justify-center rounded font-mono font-bold uppercase overflow-hidden cursor-pointer transition-all"
        style={{
          fontSize: 9, letterSpacing: "0.14em", gap: 7, padding: 10,
          background: tk.btnBg, border: `1px solid ${tk.btnBorder}`, color: tk.text, borderRadius: 5,
        }}
      >
        <span className="absolute top-0 left-0 bottom-0" style={{ width: 2, background: tk.accent }} />
        <ShieldIcon color={tk.text} /> Register AuthKey
      </button>
    </div>

    {status && (
      <p className="font-mono text-center"
        style={{ fontSize: 9, letterSpacing: "0.06em", color: tk.textMuted, marginTop: 8 }}>
        {status}
      </p>
    )}
  </div>
);
