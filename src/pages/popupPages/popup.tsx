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

import { SetupScreen } from "../../components/popup/SetupScreen";
import { MainScreen } from "../../components/popup/MainScreen";
import { ScheduleScreen } from "../../components/popup/ScheduleScreen";

export type UserProfile = {
  userId: string;
};

export type Screen = "main" | "schedule";

export type Repeat =
  | "never"
  | "daily"
  | "weekdays"
  | "weekends"
  | "custom";

export type Schedule = {
  id: string;
  host: string;
  startTime: string;
  endTime: string;
  repeat: Repeat;
  days: number[];
  active: boolean;
};

const sendMessage = <T,>(message: unknown): Promise<T> =>
  new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, (response) => {
      const error = chrome.runtime.lastError;

      if (error) {
        reject(error);
        return;
      }

      resolve(response as T);
    });
  });

function Popup() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [screen, setScreen] = useState<Screen>("main");

  const [activeHost, setActiveHost] = useState("");
  const [activeUrl, setActiveUrl] = useState("");

  const [isRegistered, setIsRegistered] = useState(false);
  const [userId, setUserId] = useState("");

  const [status, setStatus] = useState("");

  const [lockState, setLockState] =
    useState<GetLockStateResponse | null>(null);

  const [lockedSites, setLockedSites] =
    useState<LockedSiteSummary[]>([]);

  const [schedules, setSchedules] =
    useState<Schedule[]>([]);

  const [schHost, setSchHost] = useState("");
  const [schStart, setSchStart] = useState("09:00");
  const [schEnd, setSchEnd] = useState("17:00");

  const [schRepeat, setSchRepeat] =
    useState<Repeat>("daily");

  const [schDays, setSchDays] =
    useState<number[]>([1, 2, 3, 4, 5]);

  const [schStatus, setSchStatus] =
    useState("");

  const tk = T[theme];
  const dk = theme === "dark";

  const loadActiveTab = () => {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      (tabs) => {
        const url = tabs[0]?.url ?? "";
        const host = url ? new URL(url).hostname : "";

        setActiveUrl(url);
        setActiveHost(host);
        setSchHost(host);
      }
    );
  };

  const loadUserProfile = () => {
    chrome.storage.local.get(
      "authkey_user",
      (result) => {
        const profile =
          result.authkey_user as
            | UserProfile
            | undefined;

        if (profile?.userId) {
          setIsRegistered(true);
          setUserId(profile.userId);
        } else {
          setIsRegistered(false);
        }
      }
    );
  };

  const loadTheme = () => {
    chrome.storage.local.get(
      "authkey_theme",
      (result) => {
        if (
          result.authkey_theme === "light"
        ) {
          setTheme("light");
        }
      }
    );
  };

  const loadSchedules = () => {
    chrome.storage.local.get(
      "authkey_schedules",
      (result) => {
        if (
          Array.isArray(
            result.authkey_schedules
          )
        ) {
          setSchedules(
            result.authkey_schedules
          );
        }
      }
    );
  };

  const saveSchedules = (
    next: Schedule[]
  ) => {
    setSchedules(next);

    chrome.storage.local.set({
      authkey_schedules: next,
    });
  };

  const toggleTheme = () => {
    const next: Theme =
      dk ? "light" : "dark";

    setTheme(next);

    chrome.storage.local.set({
      authkey_theme: next,
    });
  };

  const refreshLockState =
    useCallback(async () => {
      if (!activeHost) return;

      const response =
        await sendMessage<GetLockStateResponse>({
          type:
            MESSAGE_TYPES.GET_LOCK_STATE,
          host: activeHost,
          url: activeUrl,
        });

      setLockState(response);
    }, [activeHost, activeUrl]);

  const refreshLockedSites =
    useCallback(async () => {
      const response =
        await sendMessage<GetLockedSitesResponse>({
          type:
            MESSAGE_TYPES.GET_LOCKED_SITES,
        });

      setLockedSites(
        response.sites.filter(
          (site) => site.isLocked
        )
      );
    }, []);

  useEffect(() => {
    loadActiveTab();
    loadUserProfile();
    loadTheme();
    loadSchedules();
  }, []);

  useEffect(() => {
    void refreshLockState();
    void refreshLockedSites();
  }, [
    refreshLockState,
    refreshLockedSites,
  ]);

  const handleRegister = async () => {
    setStatus("");

    if (!userId.trim()) {
      setStatus("// username required");
      return;
    }

    const result =
      await registerUser(
        userId.trim()
      );

    setStatus(result.message);

    if (result.success) {
      setIsRegistered(true);
    }
  };

  const handleToggleLock = async () => {
    if (!activeHost) return;

    await sendMessage({
      type:
        MESSAGE_TYPES.SET_LOCK_STATE,
      host: activeHost,
      url: activeUrl,
      isLocked: !lockState?.isLocked,
    });

    await refreshLockState();
    await refreshLockedSites();
  };

  const handleRepeatChange = (
    repeat: Repeat
  ) => {
    setSchRepeat(repeat);

    if (repeat === "daily")
      setSchDays([
        0, 1, 2, 3, 4, 5, 6,
      ]);

    if (repeat === "weekdays")
      setSchDays([1, 2, 3, 4, 5]);

    if (repeat === "weekends")
      setSchDays([0, 6]);

    if (repeat === "never")
      setSchDays([]);
  };

  const toggleDay = (
    day: number
  ) => {
    setSchDays((prev) =>
      prev.includes(day)
        ? prev.filter(
            (d) => d !== day
          )
        : [...prev, day]
    );

    setSchRepeat("custom");
  };

  const handleCreateSchedule = () => {
    setSchStatus("");

    if (!schHost.trim()) {
      setSchStatus("// host required");
      return;
    }

    if (!schStart || !schEnd) {
      setSchStatus(
        "// set both times"
      );
      return;
    }

    if (schStart >= schEnd) {
      setSchStatus(
        "// end must be after start"
      );
      return;
    }

    saveSchedules([
      ...schedules,
      {
        id: `sch_${Date.now()}`,
        host: schHost.trim(),
        startTime: schStart,
        endTime: schEnd,
        repeat: schRepeat,
        days: schDays,
        active: true,
      },
    ]);

    setSchStatus(
      "// schedule created"
    );
  };

  return (
    <div
      style={{
        width: 320,
        background: tk.bg,
        color: tk.text,
        fontFamily:
          "'Space Grotesk', sans-serif",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between"
        style={{
          padding: "16px 18px 14px",
        }}
      >
        <div
          className="flex items-center font-mono font-bold"
          style={{
            fontSize: 15,
            gap: 5,
          }}
        >
          AuthKey

          <span
            className="rounded-full"
            style={{
              width: 7,
              height: 7,
              background: tk.accent,
            }}
          />
        </div>

        <button
          onClick={toggleTheme}
          className="flex items-center justify-center"
          style={{
            width: 24,
            height: 24,
            color: tk.textMuted,
          }}
        >
          {dk ? <Sun /> : <Moon />}
        </button>
      </div>

      <div style={{ padding: "0 18px 14px" }}>
        {!isRegistered ? (
          <SetupScreen
            theme={theme}
            tk={tk}
            userId={userId}
            status={status}
            onUserIdChange={setUserId}
            onRegister={handleRegister}
          />
        ) : screen === "main" ? (
          <MainScreen
            theme={theme}
            tk={tk}
            activeHost={activeHost}
            userId={userId}
            lockState={lockState}
            lockedSites={lockedSites}
            schedules={schedules}
            status={status}
            onToggleLock={
              handleToggleLock
            }
            onGoSchedule={() =>
              setScreen("schedule")
            }
          />
        ) : (
          <ScheduleScreen
            theme={theme}
            tk={tk}
            schedules={schedules}
            schHost={schHost}
            schStart={schStart}
            schEnd={schEnd}
            schRepeat={schRepeat}
            schDays={schDays}
            schStatus={schStatus}
            onBack={() =>
              setScreen("main")
            }
            onSchHostChange={
              setSchHost
            }
            onSchStartChange={
              setSchStart
            }
            onSchEndChange={
              setSchEnd
            }
            onRepeatChange={
              handleRepeatChange
            }
            onToggleDay={toggleDay}
            onCreateSchedule={
              handleCreateSchedule
            }
            onDeleteSchedule={(
              id
            ) =>
              saveSchedules(
                schedules.filter(
                  (s) => s.id !== id
                )
              )
            }
            onToggleSchedule={(
              id
            ) =>
              saveSchedules(
                schedules.map((s) =>
                  s.id === id
                    ? {
                        ...s,
                        active:
                          !s.active,
                      }
                    : s
                )
              )
            }
          />
        )}
      </div>
    </div>
  );
}

createRoot(
  document.getElementById("root")!
).render(<Popup />);

export default Popup;