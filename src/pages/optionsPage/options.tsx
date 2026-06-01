import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,

} from "@/components/ui/dialog";
import { ThemeProvider, useTheme } from "@/components/ui/theme-provider";
import {

  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  ReferenceLine,
} from "recharts";
import {
  Lock,
  Unlock,
  Shield,
  Globe,
  Settings,
  Trash2,
  Plus,
  Eye,
  EyeOff,
  BarChart3,
  Timer,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Calendar,
  Clock,
  TrendingUp,
  Award,
  Share2,
  Target,
  Flame,
  Trophy,
  Activity,
  Bell,
  Zap,
  ChevronDown,
  ChevronUp,
  Repeat,
  Search,
  X,
  Check,
  Tag,
} from "lucide-react";

import { createRoot } from "react-dom/client";
import { Card } from "@/components/ui/card";
import { ModeToggle } from "@/components/ui/mode-toggle";
import "@/index.css";

// Mock data for demonstration
const mockLockedSites = [
  {
    id: 1,
    url: "facebook.com",
    icon: "🔵",
    isLocked: true,
    category: "Social Media",
    unlockCount: 45,
    avgLockDuration: 120,
  },
  {
    id: 2,
    url: "youtube.com",
    icon: "🔴",
    isLocked: true,
    category: "Entertainment",
    unlockCount: 67,
    avgLockDuration: 85,
  },
  {
    id: 3,
    url: "twitter.com",
    icon: "🐦",
    isLocked: false,
    category: "Social Media",
    unlockCount: 32,
    avgLockDuration: 95,
  },
  {
    id: 4,
    url: "instagram.com",
    icon: "📷",
    isLocked: true,
    category: "Social Media",
    unlockCount: 53,
    avgLockDuration: 110,
  },
  {
    id: 5,
    url: "reddit.com",
    icon: "🟠",
    isLocked: true,
    category: "Discussion",
    unlockCount: 28,
    avgLockDuration: 150,
  },
  {
    id: 6,
    url: "tiktok.com",
    icon: "🎵",
    isLocked: false,
    category: "Entertainment",
    unlockCount: 71,
    avgLockDuration: 65,
  },
  {
    id: 7,
    url: "github.com",
    icon: "🐙",
    isLocked: true,
    category: "Development",
    unlockCount: 12,
    avgLockDuration: 200,
  },
  {
    id: 8,
    url: "stackoverflow.com",
    icon: "📚",
    isLocked: false,
    category: "Development",
    unlockCount: 8,
    avgLockDuration: 180,
  },
  {
    id: 9,
    url: "linkedin.com",
    icon: "💼",
    isLocked: true,
    category: "Professional",
    unlockCount: 15,
    avgLockDuration: 90,
  },
  {
    id: 10,
    url: "discord.com",
    icon: "🎮",
    isLocked: false,
    category: "Communication",
    unlockCount: 38,
    avgLockDuration: 120,
  },
  {
    id: 11,
    url: "twitch.tv",
    icon: "🟣",
    isLocked: true,
    category: "Entertainment",
    unlockCount: 42,
    avgLockDuration: 75,
  },
  {
    id: 12,
    url: "netflix.com",
    icon: "🔴",
    isLocked: false,
    category: "Entertainment",
    unlockCount: 25,
    avgLockDuration: 160,
  },
];

// Mock analytics data
const weeklyUnlockData = [
  { day: "Mon", unlocks: 12, hour: 0 },
  { day: "Tue", unlocks: 8, hour: 0 },
  { day: "Wed", unlocks: 15, hour: 0 },
  { day: "Thu", unlocks: 6, hour: 0 },
  { day: "Fri", unlocks: 20, hour: 0 },
  { day: "Sat", unlocks: 18, hour: 0 },
  { day: "Sun", unlocks: 10, hour: 0 },
];

const hourlyUnlockData = [
  { hour: "6AM", unlocks: 2 },
  { hour: "9AM", unlocks: 8 },
  { hour: "12PM", unlocks: 15 },
  { hour: "3PM", unlocks: 12 },
  { hour: "6PM", unlocks: 18 },
  { hour: "9PM", unlocks: 10 },
  { hour: "12AM", unlocks: 3 },
];

const categoryData = [
  { name: "Communication", value: 38, color: "#8B5CF6" }, // Purple (Innermost)
  { name: "Professional", value: 15, color: "#F59E0B" }, // Yellow
  { name: "Development", value: 20, color: "#10B981" }, // Green
  { name: "Entertainment", value: 98, color: "#EF4444" }, // Red
  { name: "Social Media", value: 130, color: "#3B82F6" }, // Blue (Outermost)
];

// Number Ticker Component
const NumberTicker = ({ value, className = "" }) => {
  return (
    <div
      className={`font-sans text-2xl sm:text-4xl font-bold text-black dark:text-white tracking-tight ${className}`}
    >
      {value.toString().padStart(2, "0")}
    </div>
  );
};




// Login Component
const LoginScreen = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 2000);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center p-4 bg-[#F5F5F5] dark:bg-[#0F0F0F] transition-colors">
      <div className="max-w-md w-full">
        <Card className="p-8 text-center bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] rounded-2xl shadow-sm">
          <div className="mb-6">
            <div className="p-4 rounded-full bg-black dark:bg-white dark:bg-[#1A1A1A] inline-block mb-4">
              <Shield className="w-8 h-8 text-white dark:text-black dark:text-white" />
            </div>
            <h1 className="text-3xl font-bold text-black dark:text-white mb-2 tracking-tight">AuthKey</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              A simple extension to manage your privacy
            </p>
          </div>

          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A] flex items-center justify-center">
              <Lock className="w-16 h-16 text-black dark:text-white" />
            </div>
            <h2 className="text-xl font-semibold text-black dark:text-white mb-2">
              Set up your passcode to use AuthKey
            </h2>
          </div>

          <Button
            onClick={handleRegister}
            disabled={isLoading}
            className="w-full py-3 bg-black dark:bg-white dark:bg-[#1A1A1A] hover:bg-gray-900 dark:hover:bg-gray-100 dark:hover:bg-[#2A2A2A] dark:bg-[#252525] text-white dark:text-black dark:text-white font-medium rounded-xl transition-all"
          >
            {isLoading ? "Setting up..." : "Set up passcode"}
          </Button>
        </Card>
      </div>
    </div>
  );
};

// Confirmation Modal Component
const ConfirmationModal = ({ isOpen, onClose, onConfirm, siteName }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] text-black dark:text-white max-w-md rounded-2xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-500 font-semibold">
            <AlertTriangle className="w-5 h-5" />
            Confirm Removal
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Are you sure you want to remove{" "}
            <span className="font-semibold text-black dark:text-white">{siteName}</span> from
            your managed sites? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 border-gray-300 dark:border-[#333] bg-white dark:bg-[#1A1A1A] hover:bg-gray-50 dark:hover:bg-[#252525] dark:bg-[#1F1F1F] dark:hover:bg-[#252525] text-black dark:text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white dark:text-black dark:text-white dark:bg-red-700 dark:hover:bg-red-800"
          >
            Remove Site
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface Site {
  id: number;
  url: string;
  icon: string;
  isLocked: boolean;
  category: string;
  unlockCount: number;
  avgLockDuration: number;
}

interface Schedule {
  id: number;
  name: string;
  sites: string[];
  startTime: string;
  endTime: string;
  repeat: string;
  customDays: string[];
  isActive: boolean;
  canModify: boolean;
}

// Day options for scheduling
const DAYS_OF_WEEK = [
  { id: "mon", label: "Mon", full: "Monday" },
  { id: "tue", label: "Tue", full: "Tuesday" },
  { id: "wed", label: "Wed", full: "Wednesday" },
  { id: "thu", label: "Thu", full: "Thursday" },
  { id: "fri", label: "Fri", full: "Friday" },
  { id: "sat", label: "Sat", full: "Saturday" },
  { id: "sun", label: "Sun", full: "Sunday" },
];

// Repeat options
const REPEAT_OPTIONS = [
  { id: "never", label: "Never" },
  { id: "daily", label: "Daily" },
  { id: "weekdays", label: "Weekdays (Mon-Fri)" },
  { id: "weekends", label: "Weekends (Sat-Sun)" },
  { id: "custom", label: "Custom Days" },
];

const parseTimeTo12Hour = (timeString: string) => {
  if (!timeString) return { hour: "12", minute: "00", period: "AM" };
  const [h24, min] = timeString.split(":");
  let h12 = parseInt(h24, 10);
  const period = h12 >= 12 ? "PM" : "AM";
  h12 = h12 % 12;
  if (h12 === 0) h12 = 12;
  return {
    hour: h12.toString().padStart(2, "0"),
    minute: min || "00",
    period,
  };
};

const formatTimeFrom12Hour = (hour: string, minute: string, period: string) => {
  let h = parseInt(hour, 10);
  if (period === "PM" && h < 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  return `${h.toString().padStart(2, "0")}:${minute}`;
};

const TimePickerInput = ({ 
  label, 
  value, 
  onChange 
}: { 
  label: string; 
  value: string; 
  onChange: (val: string) => void; 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { hour, minute, period } = parseTimeTo12Hour(value);

  const hoursList = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));
  const minutesList = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, "0"));
  const periodsList = ["AM", "PM"];

  const handleSelect = (newHour: string, newMinute: string, newPeriod: string) => {
    onChange(formatTimeFrom12Hour(newHour, newMinute, newPeriod));
  };

  return (
    <div className="relative">
      <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block uppercase tracking-wider">
        {label}
      </label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#1A1A1A] border border-gray-300 dark:border-[#333] rounded-lg text-black dark:text-white focus:outline-hidden focus:ring-2 focus:ring-black dark:focus:ring-white cursor-pointer flex items-center justify-between transition-shadow hover:border-gray-400 dark:hover:border-gray-500 select-none relative"
      >
        <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-800 dark:text-gray-200 pointer-events-none" />
        <span>{value ? `${hour}:${minute} ${period}` : "--:-- --"}</span>
        <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 z-50 mt-1 w-64 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] rounded-xl shadow-lg p-3 flex gap-2 h-56">
            {/* Hours Column */}
            <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800">
              <div className="text-[10px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider mb-2 text-center sticky top-0 bg-white dark:bg-[#1A1A1A] py-1">Hour</div>
              <div className="space-y-1">
                {hoursList.map((h) => (
                  <button
                    key={h}
                    onClick={() => handleSelect(h, minute, period)}
                    className={`w-full py-1.5 rounded-lg text-xs font-semibold text-center transition-all ${
                      h === hour
                        ? "bg-black dark:bg-white text-white dark:text-black"
                        : "text-black dark:text-white bg-transparent dark:bg-[#252525] hover:bg-gray-100 dark:hover:bg-[#333333]"
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>

            {/* Minutes Column */}
            <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800 border-l border-r border-gray-100 dark:border-[#2A2A2A] px-1">
              <div className="text-[10px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider mb-2 text-center sticky top-0 bg-white dark:bg-[#1A1A1A] py-1">Min</div>
              <div className="space-y-1">
                {minutesList.map((m) => (
                  <button
                    key={m}
                    onClick={() => handleSelect(hour, m, period)}
                    className={`w-full py-1.5 rounded-lg text-xs font-semibold text-center transition-all ${
                      m === minute
                        ? "bg-black dark:bg-white text-white dark:text-black"
                        : "text-black dark:text-white bg-transparent dark:bg-[#252525] hover:bg-gray-100 dark:hover:bg-[#333333]"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Period Column */}
            <div className="flex-1 overflow-y-auto pr-1">
              <div className="text-[10px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider mb-2 text-center sticky top-0 bg-white dark:bg-[#1A1A1A] py-1">AM/PM</div>
              <div className="space-y-1">
                {periodsList.map((p) => (
                  <button
                    key={p}
                    onClick={() => handleSelect(hour, minute, p)}
                    className={`w-full py-1.5 rounded-lg text-xs font-semibold text-center transition-all ${
                      p === period
                        ? "bg-black dark:bg-white text-white dark:text-black"
                        : "text-black dark:text-white bg-transparent dark:bg-[#252525] hover:bg-gray-100 dark:hover:bg-[#333333]"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

interface ScheduleLockProps {
  sites: Site[];
}

export function ScheduleLock({ sites: initialSites = [] }: ScheduleLockProps) {
  const [sites, setSites] = useState<Site[]>(initialSites);
  const [selectedSites, setSelectedSites] = useState<number[]>([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [repeatOption, setRepeatOption] = useState("never");
  const [customDays, setCustomDays] = useState<string[]>([]);
  const [scheduleName, setScheduleName] = useState("");
  const [showAddSite, setShowAddSite] = useState(false);
  const [newSiteUrl, setNewSiteUrl] = useState("");
  const [showSites, setShowSites] = useState(true);
  const [siteSearchQuery, setSiteSearchQuery] = useState("");

  const [scheduledLocks, setScheduledLocks] = useState<Schedule[]>([
    {
      id: 1,
      name: "Work Hours Focus",
      sites: ["facebook.com", "youtube.com"],
      startTime: "09:00",
      endTime: "17:00",
      repeat: "weekdays",
      customDays: [],
      isActive: true,
      canModify: true,
    },
    {
      id: 2,
      name: "Sleep Time",
      sites: ["instagram.com", "tiktok.com"],
      startTime: "22:00",
      endTime: "06:00",
      repeat: "daily",
      customDays: [],
      isActive: false,
      canModify: false,
    },
  ]);

  const toggleSiteSelection = (siteId: number) => {
    setSelectedSites((prev) =>
      prev.includes(siteId)
        ? prev.filter((id) => id !== siteId)
        : [...prev, siteId]
    );
  };

  const handleAddSite = () => {
    if (newSiteUrl.trim()) {
      const cleanUrl = newSiteUrl.trim().toLowerCase();
      // Check if URL already exists
      const existing = sites.find((s) => s.url.toLowerCase() === cleanUrl);
      if (existing) {
        if (!selectedSites.includes(existing.id)) {
          setSelectedSites((prev) => [...prev, existing.id]);
        }
      } else {
        const newSite: Site = {
          id: Math.max(0, ...sites.map((s) => s.id)) + 1,
          url: cleanUrl,
          icon: "🌐",
          isLocked: true,
          category: "Custom",
          unlockCount: 0,
          avgLockDuration: 0,
        };
        setSites((prev) => [...prev, newSite]);
        setSelectedSites((prev) => [...prev, newSite.id]);
      }
      setNewSiteUrl("");
      setShowAddSite(false);
    }
  };

  const toggleCustomDay = (dayId: string) => {
    setCustomDays((prev) =>
      prev.includes(dayId)
        ? prev.filter((id) => id !== dayId)
        : [...prev, dayId]
    );
  };

  const addSchedule = () => {
    if (selectedSites.length > 0 && startTime && endTime) {
      const newSchedule: Schedule = {
        id: Math.max(...scheduledLocks.map((s) => s.id)) + 1,
        name: scheduleName || `Schedule ${scheduledLocks.length + 1}`,
        sites: selectedSites
          .map((id) => sites.find((s) => s.id === id)?.url)
          .filter(Boolean) as string[],
        startTime,
        endTime,
        repeat: repeatOption,
        customDays: repeatOption === "custom" ? customDays : [],
        isActive: true,
        canModify: true,
      };

      setScheduledLocks([...scheduledLocks, newSchedule]);

      // Reset form
      setSelectedSites([]);
      setStartTime("");
      setEndTime("");
      setRepeatOption("never");
      setCustomDays([]);
      setScheduleName("");
    }
  };

  const removeSchedule = (id: number) => {
    setScheduledLocks((prev) => prev.filter((s) => s.id !== id));
  };

  const toggleSchedule = (id: number) => {
    setScheduledLocks((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
  };

  const getRepeatText = (schedule: Schedule) => {
    switch (schedule.repeat) {
      case "daily":
        return "Every day";
      case "weekdays":
        return "Mon-Fri";
      case "weekends":
        return "Sat-Sun";
      case "custom":
        if (schedule.customDays.length === 0) return "Custom";
        return schedule.customDays
          .map((dayId) => DAYS_OF_WEEK.find((d) => d.id === dayId)?.label)
          .join(", ");
      default:
        return "Once";
    }
  };

  const isFormValid = () => {
    return (
      selectedSites.length > 0 &&
      startTime &&
      endTime &&
      (repeatOption !== "custom" || customDays.length > 0)
    );
  };

  return (
    <div className="space-y-6">
      {/* Create New Schedule */}
      <Card className="p-6 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] rounded-2xl shadow-sm relative overflow-hidden">
        <Clock className="absolute -right-12 -top-20 w-60 h-60 text-gray-400 dark:text-gray-400 opacity-[0.18] pointer-events-none z-0" />
        <h3 className="text-lg font-semibold text-black dark:text-white mb-6 flex items-center gap-2 relative z-10">
          <Timer className="w-5 h-5 text-black dark:text-white" />
          Create Schedule Lock
        </h3>

        {/* Schedule Name */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block uppercase tracking-wider">
            Schedule Name (Optional)
          </label>
          <div className="relative">
            <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-800 dark:text-gray-200 pointer-events-none" />
            <input
              type="text"
              value={scheduleName}
              onChange={(e) => setScheduleName(e.target.value)}
              placeholder="e.g., Work Focus, Sleep Time, Study Hours"
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#1A1A1A] border border-gray-300 dark:border-[#333] rounded-lg text-black dark:text-white placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-black transition-shadow"
            />
          </div>
        </div>

        {/* Site Selection */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Select Sites to Lock
            </h4>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddSite(!showAddSite)}
                className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#2A2A2A] dark:bg-[#252525] h-8 text-xs border border-gray-300 dark:border-[#333]"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add Site
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSites(!showSites)}
                className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#2A2A2A] dark:bg-[#252525] h-8 w-8 p-0 border border-gray-300 dark:border-[#333]"
              >
                {showSites ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {showAddSite && (
            <div className="mb-4 flex gap-2">
              <div className="relative grow">
                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-800 dark:text-gray-200 pointer-events-none" />
                <input
                  type="text"
                  value={newSiteUrl}
                  onChange={(e) => setNewSiteUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddSite();
                    }
                  }}
                  placeholder="Enter website URL (e.g., twitter.com)"
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#1A1A1A] border border-gray-300 dark:border-[#333] rounded-lg text-black dark:text-white placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-black"
                />
              </div>
              <Button
                onClick={handleAddSite}
                disabled={!newSiteUrl.trim()}
                className="bg-black dark:bg-white dark:bg-[#1A1A1A] hover:bg-gray-900 dark:hover:bg-gray-100 dark:hover:bg-[#2A2A2A] dark:bg-[#252525] text-white rounded-lg px-4 h-[42px] font-medium"
              >
                Add
              </Button>
            </div>
          )}

          {showSites && (
            <div>
              {/* Search Filter for Sites */}
              <div className="relative mb-3">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-800 dark:text-gray-200 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search sites to lock..."
                  value={siteSearchQuery}
                  onChange={(e) => setSiteSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-[#1A1A1A] border border-gray-300 dark:border-[#333] rounded-lg text-black dark:text-white placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                {sites
                  .filter((site) =>
                    site.url.toLowerCase().includes(siteSearchQuery.toLowerCase())
                  )
                  .map((site, index) => {
                    const isSelected = selectedSites.includes(site.id);
                    return (
                      <button
                        key={site.id}
                        onClick={() => toggleSiteSelection(site.id)}
                        className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? "bg-black dark:bg-white dark:bg-[#1A1A1A] border-black dark:border-white text-white shadow-sm"
                            : index % 2 === 0
                            ? "bg-gray-100 dark:bg-[#252525] border-gray-200 dark:border-[#2A2A2A] text-black dark:text-white hover:bg-gray-200 dark:hover:bg-[#333] dark:bg-[#333]"
                            : "bg-white dark:bg-[#1A1A1A] border-gray-200 dark:border-[#2A2A2A] text-black dark:text-white hover:bg-gray-50 dark:hover:bg-[#252525] dark:bg-[#1F1F1F]"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-xl shrink-0">{site.icon}</span>
                          <span className="truncate text-sm font-medium">{site.url}</span>
                        </div>
                        {isSelected && (
                          <Check className="w-4 h-4 text-white shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedSites.map((siteId) => {
                  const site = sites.find((s) => s.id === siteId);
                  return site ? (
                    <Badge
                      key={siteId}
                      variant="secondary"
                      className="text-xs bg-gray-100 dark:bg-[#252525] text-black dark:text-white border border-gray-300 dark:border-[#333] pl-2 pr-1 py-1 flex items-center gap-1 rounded-lg"
                    >
                      <span className="mr-0.5">{site.icon}</span> {site.url}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSiteSelection(siteId);
                        }}
                        className="ml-1 h-4 w-4 p-0 text-gray-500 dark:text-gray-400 hover:text-red-500 hover:bg-transparent transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>

        {/* Time Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <TimePickerInput
            label="Start Time"
            value={startTime}
            onChange={setStartTime}
          />
          <TimePickerInput
            label="End Time"
            value={endTime}
            onChange={setEndTime}
          />
        </div>

        {/* Repeat Options */}
        <div className="mb-8">
          <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 block flex items-center gap-2 uppercase tracking-wider">
            <Repeat className="w-4 h-4 text-black dark:text-white" />
            Repeat Schedule
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
            {REPEAT_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => setRepeatOption(option.id)}
                className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                  repeatOption === option.id
                    ? "bg-black dark:bg-white border-black dark:border-white text-white dark:text-black font-semibold"
                    : "bg-white dark:bg-[#1A1A1A] border-gray-200 dark:border-[#2A2A2A] text-black dark:text-white hover:bg-gray-50 dark:hover:bg-[#252525] hover:border-gray-300 dark:border-[#333]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Custom Days Selection */}
          {repeatOption === "custom" && (
            <div className="p-5 rounded-xl bg-gray-50 dark:bg-[#1F1F1F] border border-gray-200 dark:border-[#2A2A2A]">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">Select Days</div>
              <div className="flex flex-wrap gap-2">
                {DAYS_OF_WEEK.map((day) => (
                  <button
                    key={day.id}
                    onClick={() => toggleCustomDay(day.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                      customDays.includes(day.id)
                        ? "bg-black dark:bg-white border-black dark:border-white text-white dark:text-black font-semibold"
                        : "bg-white dark:bg-[#1A1A1A] text-black dark:text-white border-gray-300 dark:border-[#333] hover:bg-gray-50 dark:hover:bg-[#252525]"
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
              {customDays.length === 0 && (
                <p className="text-xs text-red-500 mt-3 font-medium">
                  Please select at least one day
                </p>
              )}
            </div>
          )}
        </div>

        <Button
          onClick={addSchedule}
          disabled={!isFormValid()}
          className="w-full bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100 text-white dark:text-black rounded-xl py-6 font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <Clock className="w-5 h-5 mr-2" />
          Create Schedule Lock
        </Button>
        {!isFormValid() && (
          <p className="text-xs text-gray-400 dark:text-gray-400 text-center mt-3 font-medium">
            {!selectedSites.length && !startTime && !endTime
              ? "Select at least one site and specify start/end times to create a lock"
              : !selectedSites.length
              ? "Please select at least one site to lock"
              : !startTime || !endTime
              ? "Please specify both Start and End times"
              : repeatOption === "custom" && !customDays.length
              ? "Please select at least one custom day"
              : ""}
          </p>
        )}
      </Card>

      {/* Active Schedules */}
      <Card className="p-6 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] rounded-2xl shadow-sm">
        <h3 className="text-lg font-semibold text-black dark:text-white mb-6 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-black dark:text-white" />
          Active Schedules ({scheduledLocks.length})
        </h3>

        <div className="space-y-4">
          {scheduledLocks.length > 0 ? (
            scheduledLocks.map((schedule, index) => (
              <div
                key={schedule.id}
                className={`p-5 rounded-xl border transition-all duration-200 ${
                  index % 2 === 0
                    ? "bg-gray-100 dark:bg-[#252525] border-gray-200 dark:border-[#2A2A2A]"
                    : "bg-white dark:bg-[#1A1A1A] border-gray-200 dark:border-[#2A2A2A]"
                } hover:bg-gray-200 dark:hover:bg-[#333] dark:bg-[#333] hover:border-gray-300 dark:border-[#333]`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-black dark:text-white text-base truncate">
                        {schedule.name}
                      </h4>
                      <Badge
                        variant={schedule.isActive ? "default" : "secondary"}
                        className={`shrink-0 ${schedule.isActive
                          ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                          : "bg-gray-100 dark:bg-[#252525] text-gray-600 dark:text-gray-400 border-gray-300 dark:border-[#333]"
                          }`}
                      >
                        {schedule.isActive ? "Active" : "Inactive"}
                      </Badge>
                      {!schedule.canModify && (
                        <Badge
                          variant="outline"
                          className="text-xs shrink-0 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/30"
                        >
                          <Lock className="w-3 h-3 mr-1" />
                          Locked
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1.5 bg-white dark:bg-[#1A1A1A] px-2.5 py-1 rounded-md border border-gray-200 dark:border-[#2A2A2A]">
                        <Clock className="w-3.5 h-3.5 text-black dark:text-white" />
                        {schedule.startTime} - {schedule.endTime}
                      </span>
                      <span className="flex items-center gap-1.5 bg-white dark:bg-[#1A1A1A] px-2.5 py-1 rounded-md border border-gray-200 dark:border-[#2A2A2A]">
                        <Repeat className="w-3.5 h-3.5 text-black dark:text-white" />
                        {getRepeatText(schedule)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <Switch
                      checked={schedule.isActive}
                      onCheckedChange={() => toggleSchedule(schedule.id)}
                      disabled={!schedule.canModify}
                      className="data-[state=checked]:bg-black dark:data-[state=checked]:bg-white"
                    />
                    {schedule.canModify && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSchedule(schedule.id)}
                        className="text-gray-400 dark:text-gray-400 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="space-y-2 mt-4 pt-4 border-t border-gray-100 dark:border-[#2A2A2A]">
                  <div className="text-xs font-medium text-gray-400 dark:text-gray-400 uppercase tracking-wider">Locked Sites:</div>
                  <div className="flex flex-wrap gap-2">
                    {schedule.sites.map((site, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs border-gray-200 dark:border-[#2A2A2A] bg-white dark:bg-[#1A1A1A] text-gray-700 dark:text-gray-300 py-1"
                      >
                        {site}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-400 dark:text-gray-400 bg-gray-50 dark:bg-[#1F1F1F] rounded-xl border border-dashed border-gray-300 dark:border-[#333]">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium mb-1 text-black dark:text-white">No schedules created yet</p>
              <p className="text-sm">
                Create your first schedule above to get started
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
// Analytics Component

const Analytics = ({ sites }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [timeRange, setTimeRange] = useState("week");
  const [currentStreak, setCurrentStreak] = useState(12);
  const [longestStreak, setLongestStreak] = useState(28);
  const [totalChallengesCompleted, setTotalChallengesCompleted] = useState(45);

  const dimColor = (color: string) => {
    if (!isDark) return color;
    const dimMap: { [key: string]: string } = {
      "#8B5CF6": "#7C3AED",
      "#F59E0B": "#D97706",
      "#10B981": "#059669",
      "#EF4444": "#DC2626",
      "#3B82F6": "#2563EB",
    };
    return dimMap[color] || color;
  };

  const shareStreak = () => {
    const text = `🔥 I've maintained a ${currentStreak}-day streak on AuthKey! Taking control of my digital habits. #DigitalWellness #ProductivityWin`;
    if (navigator.share) {
      navigator.share({
        title: "AuthKey Streak Achievement",
        text: text,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(text);
      alert("Streak shared to clipboard!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Streak Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="p-6 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] rounded-2xl shadow-sm relative overflow-hidden">
          <Flame className="absolute -right-8 -bottom-16 w-40 h-40 text-orange-500 opacity-25 dark:opacity-10 pointer-events-none" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">Current Streak</p>
              <div className="flex items-center gap-2">
                <NumberTicker value={currentStreak} className="!text-3xl text-black dark:text-white font-sans" />
                <Flame className="w-6 h-6 text-orange-500" />
              </div>
            </div>
            <Button
              size="sm"
              onClick={shareStreak}
              className="bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100 text-white dark:text-black rounded-lg transition-all"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] rounded-2xl shadow-sm relative overflow-hidden">
          <Trophy className="absolute -right-9 -bottom-16 w-40 h-40 text-yellow-500 opacity-25 dark:opacity-10 pointer-events-none" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">Longest Streak</p>
              <div className="flex items-center gap-2">
                <div className="text-3xl font-bold text-black dark:text-white leading-none">
                  {longestStreak}
                </div>
                <Trophy className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] rounded-2xl shadow-sm relative overflow-hidden">
          <div className="absolute -right-8 -bottom-16 w-40 h-40 pointer-events-none z-0">
            <Award className="w-full h-full text-green-600 opacity-25 dark:opacity-10" />
            <span className="absolute text-green-600 opacity-25 dark:opacity-10 text-5xl font-extrabold top-[33%] left-[50%] -translate-x-1/2 -translate-y-1/2 font-sans select-none">
              1
            </span>
          </div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">Challenges Completed</p>
              <div className="flex items-center gap-2">
                <div className="text-3xl font-bold text-black dark:text-white leading-none">
                  {totalChallengesCompleted}
                </div>
                <Award className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-2">
        {["day", "week", "month"].map((range) => (
          <Button
            key={range}
            variant="ghost"
            size="sm"
            onClick={() => setTimeRange(range)}
            className={`rounded-lg capitalize transition-all ${timeRange === range
              ? "!bg-black dark:!bg-white !text-white dark:!text-black border border-black dark:border-white font-semibold"
              : "border border-gray-300 dark:border-[#333] bg-white dark:bg-[#1A1A1A] hover:bg-gray-50 dark:hover:bg-[#252525] text-black dark:text-white"
              }`}
          >
            {range}
          </Button>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="columns-1 xl:columns-2 gap-6 space-y-6">
        {/* Unlock Patterns */}
        <Card className="p-5 pb-3 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] rounded-2xl shadow-sm break-inside-avoid">
          <h3 className="text-lg font-semibold text-black dark:text-white mb-3 flex items-center gap-2">
            <Activity className="w-5 h-5 text-black dark:text-white" />
            Unlock Patterns
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={timeRange === "day" ? hourlyUnlockData : weeklyUnlockData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="unlockGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={isDark ? "#FFFFFF" : "#000000"} stopOpacity={0.25} />
                    <stop offset="100%" stopColor={isDark ? "#FFFFFF" : "#000000"} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(255, 255, 255, 0.15)" : "#E5E7EB"} vertical={false} />
                <XAxis
                  dataKey={timeRange === "day" ? "hour" : "day"}
                  stroke="#9CA3AF"
                  fontSize={11}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis stroke="#9CA3AF" fontSize={11} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF", border: isDark ? "1px solid #2A2A2A" : "1px solid #E5E7EB", borderRadius: "12px", color: isDark ? "#FFFFFF" : "#111827", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}
                />
                <Area
                  type="monotone"
                  dataKey="unlocks"
                  stroke={isDark ? "#FFFFFF" : "#000000"}
                  strokeWidth={2}
                  fill="url(#unlockGradient)"
                  dot={{ fill: isDark ? "#FFFFFF" : "#000000", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: isDark ? "#FFFFFF" : "#000000", stroke: isDark ? "#1A1A1A" : "#FFFFFF", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Category Distribution */}
        <Card className="p-6 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] rounded-2xl shadow-sm break-inside-avoid">
          <h3 className="text-lg font-semibold text-black dark:text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-black dark:text-white" />
            Category Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="20%"
                outerRadius="95%"
                barSize={12}
                data={categoryData}
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar
                  minAngle={15}
                  background={{ fill: isDark ? "#252525" : "#F3F4F6" }}
                  clockWise
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={dimColor(entry.color)} 
                    />
                  ))}
                </RadialBar>
                <Tooltip
                  contentStyle={{ backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF", border: isDark ? "1px solid #2A2A2A" : "1px solid #E5E7EB", borderRadius: "12px", color: isDark ? "#FFFFFF" : "#111827", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}
                  itemStyle={{ color: isDark ? '#D1D5DB' : '#374151' }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {categoryData.map((category, index) => {
              const totalValue = categoryData.reduce((sum, item) => sum + item.value, 0);
              const percentage = Math.round((category.value / totalValue) * 100);
              return (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: dimColor(category.color) }}
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {category.name} <span className="font-bold text-black dark:text-white">[{percentage}%]</span>
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Most Unlocked Sites */}
        <Card className="p-6 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] rounded-2xl shadow-sm break-inside-avoid">
          <h3 className="text-lg font-semibold text-black dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-black dark:text-white" />
            Most Unlocked Sites
          </h3>
          <div className="space-y-3">
            {sites
              .sort((a, b) => b.unlockCount - a.unlockCount)
              .slice(0, 5)
              .map((site, index) => (
                <div
                  key={site.id}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-colors ${
                    index % 2 === 0
                      ? "bg-gray-100 dark:bg-[#252525] border-gray-200 dark:border-[#2A2A2A]"
                      : "bg-white dark:bg-[#1A1A1A] border-gray-200 dark:border-[#2A2A2A]"
                  } hover:bg-gray-200 dark:hover:bg-[#333] dark:bg-[#333] hover:border-gray-300 dark:border-[#333]`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-black dark:bg-white text-white dark:text-black text-xs font-bold">
                      #{index + 1}
                    </div>
                    <span className="text-xl">{site.icon}</span>
                    <span className="text-black dark:text-white font-medium text-sm">{site.url}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-black dark:text-white font-bold">{site.unlockCount}</div>
                    <div className="text-xs text-gray-400 dark:text-gray-400 font-medium uppercase tracking-wider">Unlocks</div>
                  </div>
                </div>
              ))}
          </div>
        </Card>

        {/* Lock Duration Stats */}
        <Card className="p-5 pb-3 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] rounded-2xl shadow-sm break-inside-avoid">
          <h3 className="text-lg font-semibold text-black dark:text-white mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-black dark:text-white" />
            Average Lock Duration
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sites.slice(0, 6)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(255, 255, 255, 0.15)" : "#E5E7EB"} vertical={false} />
                <ReferenceLine y={90} stroke={isDark ? "rgba(255, 255, 255, 0.15)" : "#E5E7EB"} strokeDasharray="3 3" />
                <XAxis
                  dataKey="url"
                  stroke="#9CA3AF"
                  fontSize={11}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  tick={{ fill: '#6B7280' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  stroke="#9CA3AF"
                  fontSize={11}
                  tick={{ fill: '#6B7280' }}
                  axisLine={false}
                  tickLine={false}
                  ticks={[0, 30, 60, 90, 120]}
                  domain={[0, 120]}
                />
                <Tooltip
                  cursor={{ fill: isDark ? '#222222' : '#F3F4F6', opacity: 0.8 }}
                  contentStyle={{ backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF", border: isDark ? "1px solid #2A2A2A" : "1px solid #E5E7EB", borderRadius: "12px", color: isDark ? "#FFFFFF" : "#111827", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}
                  itemStyle={{ color: isDark ? '#D1D5DB' : '#374151' }}
                  formatter={(value) => [`${value} min`, "Duration"]}
                />
                <Bar
                  dataKey="avgLockDuration"
                  fill={isDark ? "#FFFFFF" : "#000000"}
                  radius={[6, 6, 0, 0]}
                  barSize={40}
                >
                  {sites.slice(0, 6).map((entry, index) => (
                    <Cell 
                      key={`bar-cell-${index}`} 
                      fill={isDark ? (index % 2 === 0 ? "#FFFFFF" : "#6B7280") : (index % 2 === 0 ? "#000000" : "#374151")}
                      className="transition-all duration-300 cursor-pointer" 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Achievement Badges */}
      <Card className="p-6 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] rounded-2xl shadow-sm">
        <h3 className="text-lg font-semibold text-black dark:text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-black dark:text-white" />
          Recent Achievements
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-gray-50 dark:bg-[#1F1F1F] border border-gray-200 dark:border-[#2A2A2A] hover:border-gray-300 dark:border-[#333] transition-colors">
            <Trophy className="w-8 h-8 text-yellow-500 mb-3" />
            <h4 className="font-semibold text-black dark:text-white">Week Warrior</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">7 days streak</p>
          </div>
          <div className="p-5 rounded-xl bg-gray-50 dark:bg-[#1F1F1F] border border-gray-200 dark:border-[#2A2A2A] hover:border-gray-300 dark:border-[#333] transition-colors">
            <Shield className="w-8 h-8 text-black dark:text-white mb-3" />
            <h4 className="font-semibold text-black dark:text-white">Lock Master</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">100 sites locked</p>
          </div>
          <div className="p-5 rounded-xl bg-gray-50 dark:bg-[#1F1F1F] border border-gray-200 dark:border-[#2A2A2A] hover:border-gray-300 dark:border-[#333] transition-colors">
            <Target className="w-8 h-8 text-green-600 mb-3" />
            <h4 className="font-semibold text-black dark:text-white">Focus Champion</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">30 challenges completed</p>
          </div>
          <div className="p-5 rounded-xl bg-gray-50 dark:bg-[#1F1F1F] border border-gray-200 dark:border-[#2A2A2A] hover:border-gray-300 dark:border-[#333] transition-colors">
            <Flame className="w-8 h-8 text-orange-500 mb-3" />
            <h4 className="font-semibold text-black dark:text-white">Streak Legend</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">30 days streak</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

function Options() {
  const [isLoggined, setIsLoggined] = useState(true);
  const [sites, setSites] = useState(mockLockedSites);
  const [todayUnlocks] = useState(23);
  const [showAddSite, setShowAddSite] = useState(false);
  const [newSiteUrl, setNewSiteUrl] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    siteId: null,
    siteName: "",
  });
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const sitesPerPage = 6;

  const toggleSiteLock = (id) => {
    setSites(
      sites.map((site) =>
        site.id === id ? { ...site, isLocked: !site.isLocked } : site
      )
    );
  };

  const openConfirmModal = (id, siteName) => {
    setConfirmModal({ isOpen: true, siteId: id, siteName });
  };

  const closeConfirmModal = () => {
    setConfirmModal({ isOpen: false, siteId: null, siteName: "" });
  };

  const confirmRemoveSite = () => {
    setSites(sites.filter((site) => site.id !== confirmModal.siteId));
    closeConfirmModal();
  };

  const addNewSite = () => {
    if (newSiteUrl.trim()) {
      const newSite = {
        id: Math.max(...sites.map((s) => s.id)) + 1,
        url: newSiteUrl.trim(),
        icon: "🌐",
        isLocked: true,
        category: "Custom",
        unlockCount: 0,
        avgLockDuration: 0,
      };
      setSites([...sites, newSite]);
      setNewSiteUrl("");
      setShowAddSite(false);
    }
  };

  const lockedCount = sites.filter((site) => site.isLocked).length;
  const unlockedCount = sites.filter((site) => !site.isLocked).length;

  const totalPages = Math.ceil(sites.length / sitesPerPage);
  const startIndex = (currentPage - 1) * sitesPerPage;
  const endIndex = startIndex + sitesPerPage;
  const currentSites = sites.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  if (!isLoggined) {
    return <LoginScreen onLogin={() => setIsLoggined(true)} />;
  }

  return (
    <div className="flex h-screen text-black dark:text-white overflow-hidden font-sans relative bg-[#F5F5F5] dark:bg-[#0F0F0F] transition-colors">
      

      {/* LEFT SIDEBAR */}
      <aside 
        className={`relative z-10 transition-all duration-300 ease-in-out flex flex-col border-r border-gray-800 dark:border-[#2A2A2A] bg-black dark:bg-[#1A1A1A] ${
          isSidebarCollapsed ? "w-20" : "w-52"
        }`}
      >
     
        {/* Logo Area */}
        <div className={`h-20 flex items-center border-b border-gray-800 dark:border-[#2A2A2A] ${isSidebarCollapsed ? 'justify-center' : 'justify-start px-6'}`}>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-2 rounded-lg bg-white dark:bg-[#252525] shrink-0 hover:bg-gray-200 dark:hover:bg-[#333333] transition-colors focus:outline-hidden focus:ring-2 focus:ring-white cursor-pointer"
              title="Toggle Sidebar"
            >
              <Shield className="w-6 h-6 text-black dark:text-white" />
            </button>
            {!isSidebarCollapsed && (
              <div>
                <h1 className="text-xl font-bold text-white whitespace-nowrap tracking-tight">
                  AuthKey
                </h1>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Security Portal</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          <p className={`text-[10px] font-semibold text-gray-500 mb-4 px-2 uppercase tracking-widest ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
            Pages
          </p>
          {[
            { id: "dashboard", label: "Dashboard", icon: Shield },
            { id: "analytics", label: "Analytics", icon: BarChart3 },
            { id: "schedule", label: "Schedule Lock", icon: Timer },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'justify-start px-4'} py-6 rounded-xl transition-all ${
                activeTab === tab.id
                  ? "bg-white text-black hover:bg-gray-100"
                  : "text-gray-400 hover:text-white hover:bg-gray-800/60 border border-transparent"
              }`}
              title={isSidebarCollapsed ? tab.label : undefined}
            >
              <tab.icon className={`w-5 h-5 ${isSidebarCollapsed ? 'mr-0' : 'mr-3'}`} />
              {!isSidebarCollapsed && <span className="text-sm font-medium">{tab.label}</span>}
            </Button>
          ))}
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto relative z-10 bg-[#F5F5F5] dark:bg-[#0F0F0F] transition-colors">

        {/* Sticky Navbar */}
        <div className="sticky top-0 z-30 bg-[#F5F5F5]/80 dark:bg-[#0F0F0F]/80 backdrop-blur-md border-b border-gray-200 dark:border-[#2A2A2A] transition-colors">
          <div className="flex justify-between items-center gap-4 px-6 py-3 max-w-7xl mx-auto">

            {/* Search Box (UI only) */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-400" />
              <input
                type="text"
                placeholder="Search sites, settings..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] text-black dark:text-white rounded-xl outline-hidden focus:border-gray-400 dark:focus:border-gray-500 focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-700 transition-all placeholder:text-gray-400 dark:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>

            {/* Right side icons */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <ModeToggle />

              {/* Notification Bell */}
              <Button variant="ghost" size="icon" className="relative text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white rounded-full bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] hover:bg-gray-50 dark:hover:bg-[#252525] transition-all">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-[#F5F5F5] dark:border-[#0F0F0F] translate-x-1 -translate-y-1">
                  2
                </span>
              </Button>

              {/* Settings */}
              <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white rounded-full bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] hover:bg-gray-50 dark:hover:bg-[#252525] transition-all">
                <Settings className="w-5 h-5" />
              </Button>
            </div>

          </div>
        </div>

        <div className="p-6 pt-4 max-w-7xl mx-auto space-y-4">

          {activeTab === "dashboard" && (
            <>
              {/* HERO BANNER */}
              <div className="rounded-2xl p-6 mb-5 relative overflow-hidden border border-gray-200 dark:border-[#2A2A2A] bg-white dark:bg-[#1A1A1A] shadow-sm transition-colors">
                {/* Fading Grid Background */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: 'linear-gradient(to right, rgba(156, 163, 175, 0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(156, 163, 175, 0.35) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 90%)',
                    maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 90%)',
                  }}
                />
                {/* Decorative oversized Shield watermark */}
                <Shield className="absolute -right-20 -bottom-48 w-96 h-96 text-gray-200 opacity-40 dark:opacity-10 pointer-events-none" />
                <div className="relative z-10 flex flex-col justify-center">
                  <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-white mb-1 flex items-center gap-2 tracking-tight">
                    👋 Hello Swarnabh,
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-md text-xs sm:text-sm leading-relaxed">
                    Welcome to your AuthKey Dashboard! Monitor your unlocked sites,
                    track your lock progress, and gain valuable privacy insights.
                  </p>
                  <div>
                    <Button size="sm" className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100 font-medium px-4 h-8 text-xs transition-all rounded-lg">
                      Quick Review
                    </Button>
                  </div>
                </div>
              </div>

              {/* 3-COLUMN KPI GRID (Glassmorphism) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                <Card className="p-5 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] hover:border-gray-300 dark:border-[#333] dark:hover:border-gray-700 hover:shadow-md transition-all duration-200 rounded-2xl relative overflow-hidden">
                  <Unlock className="absolute -right-8 -bottom-16 w-40 h-40 text-gray-200 opacity-40 dark:opacity-10 pointer-events-none" />
                  <div className="relative z-10 flex items-start justify-between mb-3">
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A]">
                      <Unlock className="w-5 h-5 text-black dark:text-white" />
                    </div>
                  </div>
                  <div className="relative z-10">
                    <p className="text-xs font-medium text-gray-400 dark:text-gray-400 mb-1 uppercase tracking-wider">Today's Unlocks</p>
                    <NumberTicker value={todayUnlocks} className="!text-3xl text-black dark:text-white font-sans" />
                  </div>
                </Card>

                <Card className="p-5 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] hover:border-gray-300 dark:border-[#333] hover:shadow-md transition-all duration-200 rounded-2xl relative overflow-hidden">
                  <Lock className="absolute -right-8 -bottom-16 w-40 h-40 text-gray-200 opacity-40 dark:opacity-10 pointer-events-none" />
                  <div className="relative z-10 flex items-start justify-between mb-3">
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A]">
                      <Lock className="w-5 h-5 text-black dark:text-white" />
                    </div>
                  </div>
                  <div className="relative z-10">
                    <p className="text-xs font-medium text-gray-400 dark:text-gray-400 mb-1 uppercase tracking-wider">Sites Locked</p>
                    <div className="text-3xl font-bold text-black dark:text-white leading-none">{lockedCount}</div>
                  </div>
                </Card>

                <Card className="p-5 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] hover:border-gray-300 dark:border-[#333] hover:shadow-md transition-all duration-200 rounded-2xl relative overflow-hidden">
                  <Globe className="absolute -right-8 -bottom-16 w-40 h-40 text-gray-200 opacity-40 dark:opacity-10 pointer-events-none" />
                  <div className="relative z-10 flex items-start justify-between mb-3">
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-[#252525] border border-gray-200 dark:border-[#2A2A2A]">
                      <Globe className="w-5 h-5 text-black dark:text-white" />
                    </div>
                  </div>
                  <div className="relative z-10">
                    <p className="text-xs font-medium text-gray-400 dark:text-gray-400 mb-1 uppercase tracking-wider">Sites Unlocked</p>
                    <div className="text-3xl font-bold text-black dark:text-white leading-none">{unlockedCount}</div>
                  </div>
                </Card>
              </div>

              {/* MAIN DATA GRID (2/3 width for lists, 1/3 for quick actions) */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Left Side: Managed Sites (Takes up 2 columns) */}
                <div className="xl:col-span-2">
                  <Card className="p-6 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] hover:border-gray-300 dark:border-[#333] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <h2 className="text-xl font-semibold text-black dark:text-white tracking-tight">Managed Sites</h2>
                      <Button
                        size="sm"
                        onClick={() => setShowAddSite(!showAddSite)}
                        className="bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100 text-white dark:text-black rounded-lg transition-all"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Site
                      </Button>
                    </div>

                    {showAddSite && (
                      <div className="mb-6 p-4 rounded-xl bg-gray-50 dark:bg-[#1F1F1F] border border-gray-200 dark:border-[#2A2A2A]">
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            value={newSiteUrl}
                            onChange={(e) => setNewSiteUrl(e.target.value)}
                            placeholder="Enter website URL (e.g., example.com)"
                            className="flex-1 px-4 py-2 bg-white dark:bg-[#1A1A1A] border border-gray-300 dark:border-[#333] rounded-lg text-black dark:text-white placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-black"
                            onKeyPress={(e) => e.key === "Enter" && addNewSite()}
                          />
                          <Button onClick={addNewSite} className="bg-black dark:bg-white hover:bg-gray-900 dark:hover:bg-gray-100 text-white dark:text-black transition-all">
                            Add
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Fixed height container for sites */}
                    <div className="min-h-[400px] flex flex-col">
                      {/* CHANGED: Swapped space-y-3 for a CSS Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 grow">
                        {currentSites.length > 0 ? (
                          currentSites.map((site, index) => (
                            <div
                              key={site.id}
                              className={`flex flex-col p-5 rounded-2xl border hover:border-gray-300 dark:border-[#333] transition-all group relative hover:shadow-sm ${
                                index % 2 === 0
                                  ? "bg-gray-100 dark:bg-[#252525] border-gray-200 dark:border-[#2A2A2A]"
                                  : "bg-white dark:bg-[#1A1A1A] border-gray-200 dark:border-[#2A2A2A]"
                              }`}
                            >
                              {/* Top row: Icon and absolute positioned Trash */}
                              <div className="flex justify-between items-start mb-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 border border-gray-200 dark:border-[#2A2A2A] ${
                                  index % 2 === 0 ? "bg-white dark:bg-[#1A1A1A]" : "bg-gray-100 dark:bg-[#252525]"
                                }`}>
                                  {site.icon}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => openConfirmModal(site.id, site.url)}
                                  className="text-gray-300 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 absolute top-4 right-4"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>

                              {/* Middle row: Text details */}
                              <div className="mb-6">
                                <div className="font-semibold text-black dark:text-white truncate text-base">
                                  {site.url}
                                </div>
                                <div className="text-xs font-medium text-gray-400 dark:text-gray-400 mt-1">
                                  {site.category}
                                </div>
                              </div>

                              {/* Bottom row: Controls */}
                              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-[#2A2A2A]">
                                <Badge
                                  variant="outline"
                                  className={`${site.isLocked
                                      ? "bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-900/30"
                                      : "bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900/30"
                                    } px-3 py-1 rounded-md border text-xs font-bold tracking-wide`}
                                >
                                  {site.isLocked ? "Locked" : "Unlocked"}
                                </Badge>

                                <Switch
                                   checked={site.isLocked}
                                   onCheckedChange={() => toggleSiteLock(site.id)}
                                   className="data-[state=checked]:bg-black dark:data-[state=checked]:bg-white"
                                 />
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="col-span-full flex items-center justify-center h-64 text-gray-400 dark:text-gray-400">
                            <div className="text-center">
                              <Globe className="w-12 h-12 mx-auto mb-4 opacity-30" />
                              <p className="text-black dark:text-white font-medium">No sites added yet</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {totalPages > 1 && (
                        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100 dark:border-[#2A2A2A]">
                          <p className="text-sm text-gray-400 dark:text-gray-400">
                            Showing {startIndex + 1}-{Math.min(endIndex, sites.length)} of {sites.length}
                          </p>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => goToPage(currentPage - 1)}
                              disabled={currentPage === 1}
                              className="border-gray-300 dark:border-[#333] bg-white dark:bg-[#1A1A1A] hover:bg-gray-50 dark:hover:bg-[#252525] dark:bg-[#1F1F1F] text-black dark:text-white disabled:opacity-40"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => goToPage(currentPage + 1)}
                              disabled={currentPage === totalPages}
                              className="border-gray-300 dark:border-[#333] bg-white dark:bg-[#1A1A1A] hover:bg-gray-50 dark:hover:bg-[#252525] dark:bg-[#1F1F1F] text-black dark:text-white disabled:opacity-40"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>

                {/* Right Side: Quick Actions & Activity */}
                <div className="space-y-6">
                  <Card className="p-6 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] hover:border-gray-300 dark:border-[#333] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                    <h3 className="text-lg font-semibold text-black dark:text-white mb-4 tracking-tight">Quick Actions</h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start border-gray-200 dark:border-[#2A2A2A] bg-white dark:bg-[#1A1A1A] hover:bg-gray-50 dark:hover:bg-[#252525] dark:bg-[#1F1F1F] text-black dark:text-white py-6 rounded-xl">
                        <Eye className="w-4 h-4 mr-3 text-black dark:text-white" />
                        Unlock All Sites
                      </Button>
                      <Button variant="outline" className="w-full justify-start border-gray-200 dark:border-[#2A2A2A] bg-white dark:bg-[#1A1A1A] hover:bg-gray-50 dark:hover:bg-[#252525] dark:bg-[#1F1F1F] text-black dark:text-white py-6 rounded-xl">
                        <EyeOff className="w-4 h-4 mr-3 text-black dark:text-white" />
                        Lock All Sites
                      </Button>
                      <Button onClick={() => setActiveTab("schedule")} variant="outline" className="w-full justify-start border-gray-200 dark:border-[#2A2A2A] bg-white dark:bg-[#1A1A1A] hover:bg-gray-50 dark:hover:bg-[#252525] dark:bg-[#1F1F1F] text-black dark:text-white py-6 rounded-xl">
                        <Timer className="w-4 h-4 mr-3 text-black dark:text-white" />
                        Schedule Locks
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-6 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] hover:border-gray-300 dark:border-[#333] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                    <h3 className="text-lg font-semibold text-black dark:text-white mb-4 tracking-tight">Recent Activity</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-3 rounded-xl border bg-gray-100 dark:bg-[#252525] border-gray-200 dark:border-[#2A2A2A] hover:bg-gray-200 dark:hover:bg-[#2D2D2D] hover:border-gray-300 dark:hover:border-[#333] transition-colors">
                        <div className="w-2 h-2 bg-green-500 rounded-full shrink-0"></div>
                        <span className="text-sm text-black dark:text-white font-medium grow">Unlocked facebook.com</span>
                        <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">2m</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-xl border bg-white dark:bg-[#1A1A1A] border-gray-200 dark:border-[#2A2A2A] hover:bg-gray-100 dark:hover:bg-[#222222] hover:border-gray-300 dark:hover:border-[#333] transition-colors">
                        <div className="w-2 h-2 bg-red-500 rounded-full shrink-0"></div>
                        <span className="text-sm text-black dark:text-white font-medium grow">Locked youtube.com</span>
                        <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">5m</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-xl border bg-gray-100 dark:bg-[#252525] border-gray-200 dark:border-[#2A2A2A] hover:bg-gray-200 dark:hover:bg-[#2D2D2D] hover:border-gray-300 dark:hover:border-[#333] transition-colors">
                        <div className="w-2 h-2 bg-black dark:bg-white rounded-full shrink-0"></div>
                        <span className="text-sm text-black dark:text-white font-medium grow">Added reddit.com</span>
                        <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">1h</span>
                      </div>
                    </div>
                  </Card>
                </div>

              </div>
            </>
          )}

          {activeTab === "analytics" && <Analytics sites={sites} />}
          {activeTab === "schedule" && <ScheduleLock sites={sites} />}
        </div>
      </main>

      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={closeConfirmModal}
        onConfirm={confirmRemoveSite}
        siteName={confirmModal.siteName}
      />
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <Options />
  </ThemeProvider>
);