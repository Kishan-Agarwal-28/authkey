import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ThemeProvider } from "@/components/ui/theme-provider";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
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
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { createRoot } from "react-dom/client";
import { Card } from "@/components/ui/card";
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
  { name: "Social Media", value: 130, color: "#06B6D4" },
  { name: "Entertainment", value: 98, color: "#3B82F6" },
  { name: "Development", value: 20, color: "#6366F1" },
  { name: "Professional", value: 15, color: "#8B5CF6" },
  { name: "Communication", value: 38, color: "#2DD4BF" },
];

// Number Ticker Component
const NumberTicker = ({ value, className = "" }) => {
  return (
    <div
      className={`font-mono text-2xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent ${className}`}
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
    <div className="w-full h-screen flex items-center justify-center p-4 relative" style={{background: 'linear-gradient(to bottom, #0f2460 0%, #071535 35%, #030a18 65%, #000000 100%)'}}>
      <div className="max-w-md w-full">
        <Card className="p-8 text-center bg-white/[0.04] backdrop-blur-2xlborder border-blue-400/10 hover:border-blue-400/50 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(148,163,255,0.06)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300">
          <div className="mb-6">
            <div className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 inline-block mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">AuthKey</h1>
            <p className="text-gray-400">
              A simple extension to manage your privacy
            </p>
          </div>

          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 flex items-center justify-center">
              <Lock className="w-16 h-16 text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Set up your passcode to use AuthKey
            </h2>
          </div>

          <Button
            onClick={handleRegister}
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
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
      <DialogContent className="bg-zinc-800 border-white/10 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="w-5 h-5" />
            Confirm Removal
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Are you sure you want to remove{" "}
            <span className="font-semibold text-white">{siteName}</span> from
            your managed sites? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 border-white/20 bg-white/5 hover:bg-white/10"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700"
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
      <Card className="p-6 bg-white/[0.04] backdrop-blur-2xl border border-blue-400/10 hover:border-blue-400/50 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(148,163,255,0.06)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Timer className="w-5 h-5 text-emerald-400" />
          Create Schedule Lock
        </h3>

        {/* Schedule Name */}
        <div className="mb-6">
          <label className="text-sm font-medium text-slate-400 mb-2 block">
            Schedule Name (Optional)
          </label>
          <input
            type="text"
            value={scheduleName}
            onChange={(e) => setScheduleName(e.target.value)}
            placeholder="e.g., Work Focus, Sleep Time, Study Hours"
            className="w-full px-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          />
        </div>

        {/* Site Selection */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-slate-400">
              Select Sites to Lock
            </h4>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddSite(!showAddSite)}
                className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 h-8 text-xs"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add Site
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSites(!showSites)}
                className="text-slate-400 hover:text-white hover:bg-slate-700 h-8 w-8 p-0"
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
            <div className="mb-4">
              <input
                type="text"
                value={newSiteUrl}
                onChange={(e) => setNewSiteUrl(e.target.value)}
                placeholder="Enter website URL"
                className="w-full px-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {showSites && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                {sites.map((site) => (
                  <button
                    key={site.id}
                    onClick={() => toggleSiteSelection(site.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${selectedSites.includes(site.id)
                      ? "bg-blue-900/20 border-blue-500/30 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                      : "bg-slate-900/50 border-slate-700/50 text-slate-300 hover:bg-slate-700 hover:border-slate-600"
                      }`}
                  >
                    <span className="text-xl flex-shrink-0">{site.icon}</span>
                    <span className="truncate text-sm font-medium">{site.url}</span>
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedSites.map((siteId) => {
                  const site = sites.find((s) => s.id === siteId);
                  return site ? (
                    <Badge
                      key={siteId}
                      variant="secondary"
                      className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 pl-2 pr-1 py-1"
                    >
                      <span className="mr-1">{site.icon}</span> {site.url}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSiteSelection(siteId);
                        }}
                        className="ml-1 h-4 w-4 p-0 text-blue-400 hover:text-blue-300 hover:bg-transparent"
                      >
                        <Lock className="w-2.5 h-2.5" />
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
          <div>
            <label className="text-sm font-medium text-slate-400 mb-2 block">
              Start Time
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 [color-scheme:dark]"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-400 mb-2 block">
              End Time
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 [color-scheme:dark]"
            />
          </div>
        </div>

        {/* Repeat Options */}
        <div className="mb-8">
          <label className="text-sm font-medium text-slate-400 mb-3 block flex items-center gap-2">
            <Repeat className="w-4 h-4 text-purple-400" />
            Repeat Schedule
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
            {REPEAT_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => setRepeatOption(option.id)}
                className={`p-3 rounded-xl border text-sm font-medium transition-all ${repeatOption === option.id
                  ? "bg-indigo-900/20 border-indigo-500/30 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.1)]"
                  : "bg-slate-900/50 border-slate-700/50 text-slate-300 hover:bg-slate-700 hover:border-slate-600"
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Custom Days Selection */}
          {repeatOption === "custom" && (
            <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-700/50">
              <div className="text-sm font-medium text-slate-400 mb-3">Select Days</div>
              <div className="flex flex-wrap gap-2">
                {DAYS_OF_WEEK.map((day) => (
                  <button
                    key={day.id}
                    onClick={() => toggleCustomDay(day.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${customDays.includes(day.id)
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700"
                      }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
              {customDays.length === 0 && (
                <p className="text-xs text-rose-400 mt-3 font-medium">
                  Please select at least one day
                </p>
              )}
            </div>
          )}
        </div>

        <Button
          onClick={addSchedule}
          disabled={!isFormValid()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6 font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"
        >
          <Clock className="w-5 h-5 mr-2" />
          Create Schedule Lock
        </Button>
      </Card>

      {/* Active Schedules */}
      <Card className="p-6 bg-white/[0.04] backdrop-blur-2xl border border-blue-400/10 hover:border-blue-400/50 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(148,163,255,0.06)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-400" />
          Active Schedules ({scheduledLocks.length})
        </h3>

        <div className="space-y-4">
          {scheduledLocks.length > 0 ? (
            scheduledLocks.map((schedule) => (
              <div
                key={schedule.id}
                className="p-5 rounded-xl bg-slate-900/50 border border-slate-700/50 hover:bg-slate-800 hover:border-slate-600 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-white text-base truncate">
                        {schedule.name}
                      </h4>
                      <Badge
                        variant={schedule.isActive ? "default" : "secondary"}
                        className={`flex-shrink-0 ${schedule.isActive
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-slate-700 text-slate-300 border-slate-600"
                          }`}
                      >
                        {schedule.isActive ? "Active" : "Inactive"}
                      </Badge>
                      {!schedule.canModify && (
                        <Badge
                          variant="outline"
                          className="text-xs flex-shrink-0 bg-rose-500/10 text-rose-400 border-rose-500/20"
                        >
                          <Lock className="w-3 h-3 mr-1" />
                          Locked
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                      <span className="flex items-center gap-1.5 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
                        <Clock className="w-3.5 h-3.5 text-blue-400" />
                        {schedule.startTime} - {schedule.endTime}
                      </span>
                      <span className="flex items-center gap-1.5 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
                        <Repeat className="w-3.5 h-3.5 text-purple-400" />
                        {getRepeatText(schedule)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <Switch
                      checked={schedule.isActive}
                      onCheckedChange={() => toggleSchedule(schedule.id)}
                      disabled={!schedule.canModify}
                      className="data-[state=checked]:bg-blue-600"
                    />
                    {schedule.canModify && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSchedule(schedule.id)}
                        className="text-slate-500 hover:text-rose-400 hover:bg-rose-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="space-y-2 mt-4 pt-4 border-t border-slate-700/50">
                  <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Locked Sites:</div>
                  <div className="flex flex-wrap gap-2">
                    {schedule.sites.map((site, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs border-slate-600 bg-slate-800 text-slate-300 py-1"
                      >
                        {site}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-slate-500 bg-slate-900/30 rounded-xl border border-dashed border-slate-700">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium mb-1">No schedules created yet</p>
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
  const [timeRange, setTimeRange] = useState("week");
  const [currentStreak, setCurrentStreak] = useState(12);
  const [longestStreak, setLongestStreak] = useState(28);
  const [totalChallengesCompleted, setTotalChallengesCompleted] = useState(45);

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
        <Card className="p-6 bg-white/[0.04] backdrop-blur-2xl border border-blue-400/10 hover:border-blue-400/50 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(148,163,255,0.06)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Current Streak</p>
              <div className="flex items-center gap-2">
                <NumberTicker value={currentStreak} className="!text-3xl text-white bg-none font-sans" />
                <Flame className="w-6 h-6 text-orange-400" />
              </div>
            </div>
            <Button
              size="sm"
              onClick={shareStreak}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </Card>

        <Card className="p-6 bg-white/[0.04] backdrop-blur-2xl border border-blue-400/10 hover:border-blue-400/50 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(148,163,255,0.06)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Longest Streak</p>
              <div className="flex items-center gap-2">
                <div className="text-3xl font-bold text-white leading-none">
                  {longestStreak}
                </div>
                <Trophy className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/[0.04] backdrop-blur-2xl border border-blue-400/10 hover:border-blue-400/50 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(148,163,255,0.06)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Challenges Completed</p>
              <div className="flex items-center gap-2">
                <div className="text-3xl font-bold text-white leading-none">
                  {totalChallengesCompleted}
                </div>
                <Award className="w-6 h-6 text-emerald-400" />
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
            variant={timeRange === range ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange(range)}
            className={`rounded-lg capitalize ${timeRange === range
              ? "bg-blue-600 text-white border-transparent"
              : "border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300"
              }`}
          >
            {range}
          </Button>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Unlock Patterns */}
        <Card className="p-6 bg-white/[0.04] backdrop-blur-2xl border border-blue-400/10 hover:border-blue-400/50 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(148,163,255,0.06)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-400" />
            Unlock Patterns
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={timeRange === "day" ? hourlyUnlockData : weeklyUnlockData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis
                  dataKey={timeRange === "day" ? "hour" : "day"}
                  stroke="#94A3B8"
                  fontSize={11}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis stroke="#94A3B8" fontSize={11} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0F172A",
                    border: "1px solid #1E293B",
                    borderRadius: "12px",
                    color: "#F8FAFC",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)"
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="unlocks"
                  stroke="#06B6D4"
                  strokeWidth={3}
                  dot={{ fill: "#06B6D4", strokeWidth: 2, r: 4, style: { filter: "drop-shadow(0px 0px 8px rgba(6, 182, 212, 0.8))" } }}
                  activeDot={{ r: 6, fill: "#E0F2FE", stroke: "#0284C7", strokeWidth: 2, style: { filter: "drop-shadow(0px 0px 12px rgba(14, 165, 233, 1))" } }}
                  style={{ filter: "drop-shadow(0px 0px 10px rgba(6, 182, 212, 0.6))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Category Distribution */}
        <Card className="p-6 bg-white/[0.04] backdrop-blur-2xl border border-blue-400/10 hover:border-blue-400/50 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(148,163,255,0.06)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-400" />
            Category Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      className="transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)] outline-none cursor-pointer" 
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0F172A",
                    border: "1px solid #1E293B",
                    borderRadius: "12px",
                    color: "#F8FAFC",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)"
                  }}
                  itemStyle={{ color: '#E2E8F0' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {categoryData.map((category, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full shadow-sm"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-sm font-medium text-slate-300">{category.name}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Most Unlocked Sites */}
        <Card className="p-6 bg-white/[0.04] backdrop-blur-2xl border border-blue-400/10 hover:border-blue-400/50 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(148,163,255,0.06)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-rose-400" />
            Most Unlocked Sites
          </h3>
          <div className="space-y-3">
            {sites
              .sort((a, b) => b.unlockCount - a.unlockCount)
              .slice(0, 5)
              .map((site, index) => (
                <div
                  key={site.id}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/50 border border-slate-700/50 hover:bg-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 text-xs font-bold border border-blue-500/20">
                      #{index + 1}
                    </div>
                    <span className="text-xl">{site.icon}</span>
                    <span className="text-white font-medium text-sm">{site.url}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">{site.unlockCount}</div>
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Unlocks</div>
                  </div>
                </div>
              ))}
          </div>
        </Card>

        {/* Lock Duration Stats */}
        <Card className="p-6 bg-white/[0.04] backdrop-blur-2xl border border-blue-400/10 hover:border-blue-400/50 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(148,163,255,0.06)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-400" />
            Average Lock Duration
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sites.slice(0, 6)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity={1} />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis
                  dataKey="url"
                  stroke="#94A3B8"
                  fontSize={11}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  tick={{ fill: '#94A3B8' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  stroke="#94A3B8"
                  fontSize={11}
                  tick={{ fill: '#94A3B8' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: '#1E293B', opacity: 0.4 }}
                  contentStyle={{
                    backgroundColor: "#0F172A",
                    border: "1px solid #1E293B",
                    borderRadius: "12px",
                    color: "#F8FAFC",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)"
                  }}
                  itemStyle={{ color: '#60A5FA' }}
                  formatter={(value) => [`${value} min`, "Duration"]}
                />
                <Bar
                  dataKey="avgLockDuration"
                  fill="url(#barGradient)"
                  radius={[6, 6, 0, 0]}
                  barSize={40}
                >
                  {sites.slice(0, 6).map((entry, index) => (
                    <Cell 
                      key={`bar-cell-${index}`} 
                      className="transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(6,182,212,0.8)] cursor-pointer" 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Achievement Badges */}
      <Card className="p-6 bg-white/[0.04] backdrop-blur-2xl border border-blue-400/10 hover:border-blue-400/50 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(148,163,255,0.06)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          Recent Achievements
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-slate-900/50 border border-yellow-500/20 hover:border-yellow-500/40 transition-colors">
            <Trophy className="w-8 h-8 text-yellow-400 mb-3" />
            <h4 className="font-semibold text-white">Week Warrior</h4>
            <p className="text-xs text-slate-400 mt-1">7 days streak</p>
          </div>
          <div className="p-5 rounded-xl bg-slate-900/50 border border-blue-500/20 hover:border-blue-500/40 transition-colors">
            <Shield className="w-8 h-8 text-blue-400 mb-3" />
            <h4 className="font-semibold text-white">Lock Master</h4>
            <p className="text-xs text-slate-400 mt-1">100 sites locked</p>
          </div>
          <div className="p-5 rounded-xl bg-slate-900/50 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
            <Target className="w-8 h-8 text-emerald-400 mb-3" />
            <h4 className="font-semibold text-white">Focus Champion</h4>
            <p className="text-xs text-slate-400 mt-1">30 challenges completed</p>
          </div>
          <div className="p-5 rounded-xl bg-slate-900/50 border border-rose-500/20 hover:border-rose-500/40 transition-colors">
            <Flame className="w-8 h-8 text-rose-400 mb-3" />
            <h4 className="font-semibold text-white">Streak Legend</h4>
            <p className="text-xs text-slate-400 mt-1">30 days streak</p>
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
    <div className="flex h-screen text-white overflow-hidden font-sans relative" style={{background: 'linear-gradient(to bottom, #0f2460 0%, #071535 35%, #030a18 65%, #000000 100%)'}}>
      

      {/* LEFT SIDEBAR (Glassmorphism) */}
      <aside 
        className={`relative z-10 transition-all duration-300 ease-in-out flex flex-col border-r ${
          isSidebarCollapsed ? "w-20" : "w-64"
        }`}
        style={{
          background: 'rgba(10, 20, 60, 0.35)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderColor: 'rgba(255, 255, 255, 0.07)',
          boxShadow: '4px 0 24px rgba(0, 0, 0, 0.4)',
        }}
      >
     
        {/* Logo Area */}
        <div className={`h-20 flex items-center border-b border-white/5 ${isSidebarCollapsed ? 'justify-center' : 'justify-start px-6'}`}>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex-shrink-0 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-lg shadow-blue-900/20"
              title="Toggle Sidebar"
            >
              <Shield className="w-6 h-6 text-white" />
            </button>
            {!isSidebarCollapsed && (
              <h1 className="text-xl font-bold text-white whitespace-nowrap tracking-wide">
                AuthKey
              </h1>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          <p className={`text-xs font-semibold text-slate-500 mb-4 px-2 uppercase tracking-wider ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
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
                  ? "bg-blue-600/20 border border-blue-500/30 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
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
      <main className="flex-1 overflow-y-auto relative z-10" style={{background: 'transparent'}}>
        <div className="p-6 pt-4 max-w-7xl mx-auto space-y-4">

          {/* Top Header Row (Optional Search/Settings placeholder to match Dasher) */}
          <div className="flex justify-end items-center gap-4 mb-2">

            {/* Notification Bell */}
            <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-white rounded-full" style={{background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(99,130,255,0.1)'}}>
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-slate-900 translate-x-1 -translate-y-1">
                2
              </span>
            </Button>

            {/* Settings */}
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white rounded-full" style={{background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(99,130,255,0.1)'}}>
              <Settings className="w-5 h-5" />
            </Button>

          </div>

          {activeTab === "dashboard" && (
            <>
              {/* HERO BANNER */}
              <div className="rounded-xl p-5 mb-5 relative overflow-hidden border" style={{background: 'linear-gradient(135deg, rgba(30,58,138,0.5) 0%, rgba(15,23,60,0.4) 50%, rgba(29,78,216,0.3) 100%)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderColor: 'rgba(99,130,255,0.15)', boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(148,163,255,0.1)'}}>
                <div className="relative z-10 flex flex-col justify-center">
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 flex items-center gap-2">
                    👋 Hello Swarnabh,
                  </h2>
                  <p className="text-slate-300 mb-4 max-w-md text-xs sm:text-sm leading-relaxed">
                    Welcome to your AuthKey Dashboard! Monitor your unlocked sites,
                    track your lock progress, and gain valuable privacy insights.
                  </p>
                  <div>
                    <Button size="sm" className="bg-white/10 text-white hover:bg-white/20 border border-white/10 font-medium px-4 h-8 text-xs backdrop-blur-sm transition-all">
                      Quick Review
                    </Button>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/50 pointer-events-none"></div>
              </div>

              {/* 3-COLUMN KPI GRID (Glassmorphism) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                <Card className="p-5 bg-white/[0.04] backdrop-blur-2xl borderhover:bg-white/[0.07] hover:border-blue-400/50 transition-all duration-300 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(148,163,255,0.06)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] ">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                      <Unlock className="w-5 h-5 text-green-400" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400 mb-1">Today's Unlocks</p>
                    <NumberTicker value={todayUnlocks} className="!text-3xl text-white bg-none font-sans" />
                  </div>
                </Card>

                <Card className="p-5 bg-white/[0.04] backdrop-blur-2xl border border-blue-400/10hover:bg-white/[0.07] hover:border-blue-400/50 transition-all duration-300 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(148,163,255,0.06)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20">
                      <Lock className="w-5 h-5 text-rose-400" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400 mb-1">Sites Locked</p>
                    <div className="text-3xl font-bold text-white leading-none">{lockedCount}</div>
                  </div>
                </Card>

                <Card className="p-5 bg-white/[0.04] backdrop-blur-2xl border border-blue-400/10hover:bg-white/[0.07] hover:border-blue-400/50 transition-all duration-300 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(148,163,255,0.06)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <Globe className="w-5 h-5 text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400 mb-1">Sites Unlocked</p>
                    <div className="text-3xl font-bold text-white leading-none">{unlockedCount}</div>
                  </div>
                </Card>
              </div>

              {/* MAIN DATA GRID (2/3 width for lists, 1/3 for quick actions) */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Left Side: Managed Sites (Takes up 2 columns) */}
                <div className="xl:col-span-2">
                  <Card className="p-6 bg-white/[0.04] backdrop-blur-2xl border border-blue-400/10 hover:border-blue-400/50 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(148,163,255,0.06)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <h2 className="text-xl font-semibold text-white">Managed Sites</h2>
                      <Button
                        size="sm"
                        onClick={() => setShowAddSite(!showAddSite)}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Site
                      </Button>
                    </div>

                    {showAddSite && (
                      <div className="mb-6 p-4 rounded-xl bg-slate-900 border border-slate-700">
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            value={newSiteUrl}
                            onChange={(e) => setNewSiteUrl(e.target.value)}
                            placeholder="Enter website URL (e.g., example.com)"
                            className="flex-1 px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onKeyPress={(e) => e.key === "Enter" && addNewSite()}
                          />
                          <Button onClick={addNewSite} className="bg-emerald-600 hover:bg-emerald-700">
                            Add
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Fixed height container for sites */}
                    <div className="min-h-[400px] flex flex-col">
                      {/* CHANGED: Swapped space-y-3 for a CSS Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-grow">
                        {currentSites.length > 0 ? (
                          currentSites.map((site) => (
                            <div
                              key={site.id}
                              className="flex flex-col p-5 rounded-2xl border hover:border-blue-400/20 transition-all group relative" style={{background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderColor: 'rgba(99,130,255,0.1)', boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(148,163,255,0.05)'}}
                            >
                              {/* Top row: Icon and absolute positioned Trash */}
                              <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-2xl flex-shrink-0 border border-slate-600 shadow-inner">
                                  {site.icon}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => openConfirmModal(site.id, site.url)}
                                  className="text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 absolute top-4 right-4"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>

                              {/* Middle row: Text details */}
                              <div className="mb-6">
                                <div className="font-semibold text-white truncate text-base">
                                  {site.url}
                                </div>
                                <div className="text-xs font-medium text-slate-400 mt-1">
                                  {site.category}
                                </div>
                              </div>

                              {/* Bottom row: Controls */}
                              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700/50">
                                <Badge
                                  variant={site.isLocked ? "destructive" : "secondary"}
                                  className={`${site.isLocked
                                      ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                                      : "bg-green-500/10 text-green-400 border-green-500/20"
                                    } px-3 py-1 rounded-md border text-xs font-medium`}
                                >
                                  {site.isLocked ? "Locked" : "Unlocked"}
                                </Badge>

                                <Switch
                                  checked={site.isLocked}
                                  onCheckedChange={() => toggleSiteLock(site.id)}
                                  className="data-[state=checked]:bg-rose-700"
                                />
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="col-span-full flex items-center justify-center h-64 text-slate-500">
                            <div className="text-center">
                              <Globe className="w-12 h-12 mx-auto mb-4 opacity-30" />
                              <p>No sites added yet</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {totalPages > 1 && (
                        <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-700">
                          <p className="text-sm text-slate-400">
                            Showing {startIndex + 1}-{Math.min(endIndex, sites.length)} of {sites.length}
                          </p>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => goToPage(currentPage - 1)}
                              disabled={currentPage === 1}
                              className="border-slate-700 bg-slate-800 hover:bg-slate-700"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => goToPage(currentPage + 1)}
                              disabled={currentPage === totalPages}
                              className="border-slate-700 bg-slate-800 hover:bg-slate-700"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>

                {/* Right Side: Quick Actions & Activity (Takes up 1 column) */}
                <div className="space-y-6">
                  <Card className="p-6 bg-white/[0.04] backdrop-blur-2xl border border-blue-400/10 hover:border-blue-400/50 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(148,163,255,0.06)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300">
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start border-slate-600 bg-slate-900/50 hover:bg-slate-700 text-slate-300 py-6 rounded-xl">
                        <Eye className="w-4 h-4 mr-3 text-blue-400" />
                        Unlock All Sites
                      </Button>
                      <Button variant="outline" className="w-full justify-start border-slate-600 bg-slate-900/50 hover:bg-slate-700 text-slate-300 py-6 rounded-xl">
                        <EyeOff className="w-4 h-4 mr-3 text-red-400" />
                        Lock All Sites
                      </Button>
                      <Button onClick={() => setActiveTab("schedule")} variant="outline" className="w-full justify-start border-slate-600 bg-slate-900/50 hover:bg-slate-700 text-slate-300 py-6 rounded-xl">
                        <Timer className="w-4 h-4 mr-3 text-emerald-400" />
                        Schedule Locks
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-6 bg-white/[0.04] backdrop-blur-2xl border border-blue-400/10 hover:border-blue-400/50 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(148,163,255,0.06)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300">
                    <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-sm text-slate-300 flex-grow">Unlocked facebook.com</span>
                        <span className="text-xs text-slate-500">2m</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span className="text-sm text-slate-300 flex-grow">Locked youtube.com</span>
                        <span className="text-xs text-slate-500">5m</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-sm text-slate-300 flex-grow">Added reddit.com</span>
                        <span className="text-xs text-slate-500">1h</span>
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
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Options />
  </ThemeProvider>

);
