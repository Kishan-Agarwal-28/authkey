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
      className={`font-sans text-2xl sm:text-4xl font-bold text-black tracking-tight ${className}`}
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
    <div className="w-full h-screen flex items-center justify-center p-4 bg-[#F5F5F5]">
      <div className="max-w-md w-full">
        <Card className="p-8 text-center bg-white border border-gray-200 rounded-2xl shadow-sm">
          <div className="mb-6">
            <div className="p-4 rounded-full bg-black inline-block mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-black mb-2 tracking-tight">AuthKey</h1>
            <p className="text-gray-500 text-sm">
              A simple extension to manage your privacy
            </p>
          </div>

          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
              <Lock className="w-16 h-16 text-black" />
            </div>
            <h2 className="text-xl font-semibold text-black mb-2">
              Set up your passcode to use AuthKey
            </h2>
          </div>

          <Button
            onClick={handleRegister}
            disabled={isLoading}
            className="w-full py-3 bg-black hover:bg-gray-900 text-white font-medium rounded-xl"
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
      <DialogContent className="bg-white border border-gray-200 text-black max-w-md rounded-2xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600 font-semibold">
            <AlertTriangle className="w-5 h-5" />
            Confirm Removal
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Are you sure you want to remove{" "}
            <span className="font-semibold text-black">{siteName}</span> from
            your managed sites? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 border-gray-300 bg-white hover:bg-gray-50 text-black"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
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
      <Card className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
        <h3 className="text-lg font-semibold text-black mb-6 flex items-center gap-2">
          <Timer className="w-5 h-5 text-black" />
          Create Schedule Lock
        </h3>

        {/* Schedule Name */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-500 mb-2 block uppercase tracking-wider">
            Schedule Name (Optional)
          </label>
          <input
            type="text"
            value={scheduleName}
            onChange={(e) => setScheduleName(e.target.value)}
            placeholder="e.g., Work Focus, Sleep Time, Study Hours"
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition-shadow"
          />
        </div>

        {/* Site Selection */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Select Sites to Lock
            </h4>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddSite(!showAddSite)}
                className="text-black hover:bg-gray-100 h-8 text-xs border border-gray-300"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add Site
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSites(!showSites)}
                className="text-gray-500 hover:bg-gray-100 h-8 w-8 p-0 border border-gray-300"
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
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
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
                      ? "bg-black border-black text-white"
                      : "bg-white border-gray-200 text-black hover:bg-gray-50 hover:border-gray-300"
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
                      className="text-xs bg-gray-100 text-black border border-gray-300 pl-2 pr-1 py-1"
                    >
                      <span className="mr-1">{site.icon}</span> {site.url}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSiteSelection(siteId);
                        }}
                        className="ml-1 h-4 w-4 p-0 text-gray-500 hover:text-black hover:bg-transparent"
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
            <label className="text-sm font-medium text-gray-500 mb-2 block uppercase tracking-wider">
              Start Time
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black [color-scheme:light]"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500 mb-2 block uppercase tracking-wider">
              End Time
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black [color-scheme:light]"
            />
          </div>
        </div>

        {/* Repeat Options */}
        <div className="mb-8">
          <label className="text-sm font-medium text-gray-500 mb-3 block flex items-center gap-2 uppercase tracking-wider">
            <Repeat className="w-4 h-4 text-black" />
            Repeat Schedule
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
            {REPEAT_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => setRepeatOption(option.id)}
                className={`p-3 rounded-xl border text-sm font-medium transition-all ${repeatOption === option.id
                  ? "bg-black border-black text-white"
                  : "bg-white border-gray-200 text-black hover:bg-gray-50 hover:border-gray-300"
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Custom Days Selection */}
          {repeatOption === "custom" && (
            <div className="p-5 rounded-xl bg-gray-50 border border-gray-200">
              <div className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">Select Days</div>
              <div className="flex flex-wrap gap-2">
                {DAYS_OF_WEEK.map((day) => (
                  <button
                    key={day.id}
                    onClick={() => toggleCustomDay(day.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${customDays.includes(day.id)
                      ? "bg-black text-white"
                      : "bg-white text-black border border-gray-300 hover:bg-gray-50"
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
          className="w-full bg-black hover:bg-gray-900 text-white rounded-xl py-6 font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <Clock className="w-5 h-5 mr-2" />
          Create Schedule Lock
        </Button>
      </Card>

      {/* Active Schedules */}
      <Card className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
        <h3 className="text-lg font-semibold text-black mb-6 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-black" />
          Active Schedules ({scheduledLocks.length})
        </h3>

        <div className="space-y-4">
          {scheduledLocks.length > 0 ? (
            scheduledLocks.map((schedule) => (
              <div
                key={schedule.id}
                className="p-5 rounded-xl bg-gray-50 border border-gray-200 hover:bg-white hover:border-gray-300 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-black text-base truncate">
                        {schedule.name}
                      </h4>
                      <Badge
                        variant={schedule.isActive ? "default" : "secondary"}
                        className={`flex-shrink-0 ${schedule.isActive
                          ? "bg-black text-white border-black"
                          : "bg-gray-100 text-gray-600 border-gray-300"
                          }`}
                      >
                        {schedule.isActive ? "Active" : "Inactive"}
                      </Badge>
                      {!schedule.canModify && (
                        <Badge
                          variant="outline"
                          className="text-xs flex-shrink-0 bg-red-50 text-red-600 border-red-200"
                        >
                          <Lock className="w-3 h-3 mr-1" />
                          Locked
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-md border border-gray-200">
                        <Clock className="w-3.5 h-3.5 text-black" />
                        {schedule.startTime} - {schedule.endTime}
                      </span>
                      <span className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-md border border-gray-200">
                        <Repeat className="w-3.5 h-3.5 text-black" />
                        {getRepeatText(schedule)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <Switch
                      checked={schedule.isActive}
                      onCheckedChange={() => toggleSchedule(schedule.id)}
                      disabled={!schedule.canModify}
                      className="data-[state=checked]:bg-black"
                    />
                    {schedule.canModify && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSchedule(schedule.id)}
                        className="text-gray-400 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="space-y-2 mt-4 pt-4 border-t border-gray-100">
                  <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">Locked Sites:</div>
                  <div className="flex flex-wrap gap-2">
                    {schedule.sites.map((site, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs border-gray-200 bg-white text-gray-700 py-1"
                      >
                        {site}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium mb-1 text-black">No schedules created yet</p>
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
        <Card className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1 uppercase tracking-wider">Current Streak</p>
              <div className="flex items-center gap-2">
                <NumberTicker value={currentStreak} className="!text-3xl text-black font-sans" />
                <Flame className="w-6 h-6 text-orange-500" />
              </div>
            </div>
            <Button
              size="sm"
              onClick={shareStreak}
              className="bg-black hover:bg-gray-900 text-white rounded-lg"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </Card>

        <Card className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1 uppercase tracking-wider">Longest Streak</p>
              <div className="flex items-center gap-2">
                <div className="text-3xl font-bold text-black leading-none">
                  {longestStreak}
                </div>
                <Trophy className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1 uppercase tracking-wider">Challenges Completed</p>
              <div className="flex items-center gap-2">
                <div className="text-3xl font-bold text-black leading-none">
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
            variant={timeRange === range ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange(range)}
            className={`rounded-lg capitalize ${timeRange === range
              ? "bg-black text-white border-black"
              : "border-gray-300 bg-white hover:bg-gray-50 text-black"
              }`}
          >
            {range}
          </Button>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Unlock Patterns */}
        <Card className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <h3 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-black" />
            Unlock Patterns
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={timeRange === "day" ? hourlyUnlockData : weeklyUnlockData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis
                  dataKey={timeRange === "day" ? "hour" : "day"}
                  stroke="#9CA3AF"
                  fontSize={11}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis stroke="#9CA3AF" fontSize={11} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "12px",
                    color: "#111827",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)"
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="unlocks"
                  stroke="#000000"
                  strokeWidth={2}
                  dot={{ fill: "#000000", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#000000", stroke: "#FFFFFF", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Category Distribution */}
        <Card className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <h3 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-black" />
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
                      className="transition-all duration-300 outline-none cursor-pointer" 
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "12px",
                    color: "#111827",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)"
                  }}
                  itemStyle={{ color: '#374151' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {categoryData.map((category, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-sm font-medium text-gray-700">{category.name}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Most Unlocked Sites */}
        <Card className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <h3 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-black" />
            Most Unlocked Sites
          </h3>
          <div className="space-y-3">
            {sites
              .sort((a, b) => b.unlockCount - a.unlockCount)
              .slice(0, 5)
              .map((site, index) => (
                <div
                  key={site.id}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 border border-gray-200 hover:bg-white hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-black text-white text-xs font-bold">
                      #{index + 1}
                    </div>
                    <span className="text-xl">{site.icon}</span>
                    <span className="text-black font-medium text-sm">{site.url}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-black font-bold">{site.unlockCount}</div>
                    <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">Unlocks</div>
                  </div>
                </div>
              ))}
          </div>
        </Card>

        {/* Lock Duration Stats */}
        <Card className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <h3 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-black" />
            Average Lock Duration
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sites.slice(0, 6)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#111827" stopOpacity={1} />
                    <stop offset="100%" stopColor="#6B7280" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
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
                />
                <Tooltip
                  cursor={{ fill: '#F3F4F6', opacity: 0.8 }}
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "12px",
                    color: "#111827",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)"
                  }}
                  itemStyle={{ color: '#374151' }}
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
      <Card className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
        <h3 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-black" />
          Recent Achievements
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors">
            <Trophy className="w-8 h-8 text-yellow-500 mb-3" />
            <h4 className="font-semibold text-black">Week Warrior</h4>
            <p className="text-xs text-gray-500 mt-1">7 days streak</p>
          </div>
          <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors">
            <Shield className="w-8 h-8 text-black mb-3" />
            <h4 className="font-semibold text-black">Lock Master</h4>
            <p className="text-xs text-gray-500 mt-1">100 sites locked</p>
          </div>
          <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors">
            <Target className="w-8 h-8 text-green-600 mb-3" />
            <h4 className="font-semibold text-black">Focus Champion</h4>
            <p className="text-xs text-gray-500 mt-1">30 challenges completed</p>
          </div>
          <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors">
            <Flame className="w-8 h-8 text-orange-500 mb-3" />
            <h4 className="font-semibold text-black">Streak Legend</h4>
            <p className="text-xs text-gray-500 mt-1">30 days streak</p>
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
    <div className="flex h-screen text-black overflow-hidden font-sans relative bg-[#F5F5F5]">
      

      {/* LEFT SIDEBAR */}
      <aside 
        className={`relative z-10 transition-all duration-300 ease-in-out flex flex-col border-r border-gray-200 bg-white ${
          isSidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
     
        {/* Logo Area */}
        <div className={`h-20 flex items-center border-b border-gray-100 ${isSidebarCollapsed ? 'justify-center' : 'justify-start px-6'}`}>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-2 rounded-lg bg-black flex-shrink-0 hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
              title="Toggle Sidebar"
            >
              <Shield className="w-6 h-6 text-white" />
            </button>
            {!isSidebarCollapsed && (
              <div>
                <h1 className="text-xl font-bold text-black whitespace-nowrap tracking-tight">
                  AuthKey
                </h1>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Security Portal</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          <p className={`text-[10px] font-semibold text-gray-400 mb-4 px-2 uppercase tracking-widest ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
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
                  ? "bg-black text-white hover:bg-gray-900"
                  : "text-gray-500 hover:text-black hover:bg-gray-100 border border-transparent"
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
      <main className="flex-1 overflow-y-auto relative z-10 bg-[#F5F5F5]">
        <div className="p-6 pt-4 max-w-7xl mx-auto space-y-4">

          {/* Top Header Row */}
          <div className="flex justify-end items-center gap-4 mb-2">

            {/* Notification Bell */}
            <Button variant="ghost" size="icon" className="relative text-gray-500 hover:text-black rounded-full bg-white border border-gray-200 hover:bg-gray-50">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-black text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-[#F5F5F5] translate-x-1 -translate-y-1">
                2
              </span>
            </Button>

            {/* Settings */}
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-black rounded-full bg-white border border-gray-200 hover:bg-gray-50">
              <Settings className="w-5 h-5" />
            </Button>

          </div>

          {activeTab === "dashboard" && (
            <>
              {/* HERO BANNER */}
              <div className="rounded-2xl p-6 mb-5 relative overflow-hidden border border-gray-200 bg-white shadow-sm">
                <div className="relative z-10 flex flex-col justify-center">
                  <h2 className="text-xl sm:text-2xl font-bold text-black mb-1 flex items-center gap-2 tracking-tight">
                    👋 Hello Swarnabh,
                  </h2>
                  <p className="text-gray-500 mb-4 max-w-md text-xs sm:text-sm leading-relaxed">
                    Welcome to your AuthKey Dashboard! Monitor your unlocked sites,
                    track your lock progress, and gain valuable privacy insights.
                  </p>
                  <div>
                    <Button size="sm" className="bg-black text-white hover:bg-gray-900 font-medium px-4 h-8 text-xs transition-all rounded-lg">
                      Quick Review
                    </Button>
                  </div>
                </div>
              </div>

              {/* 3-COLUMN KPI GRID (Glassmorphism) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                <Card className="p-5 bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 rounded-2xl">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 rounded-lg bg-gray-100 border border-gray-200">
                      <Unlock className="w-5 h-5 text-black" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">Today's Unlocks</p>
                    <NumberTicker value={todayUnlocks} className="!text-3xl text-black font-sans" />
                  </div>
                </Card>

                <Card className="p-5 bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 rounded-2xl">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 rounded-lg bg-gray-100 border border-gray-200">
                      <Lock className="w-5 h-5 text-black" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">Sites Locked</p>
                    <div className="text-3xl font-bold text-black leading-none">{lockedCount}</div>
                  </div>
                </Card>

                <Card className="p-5 bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 rounded-2xl">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 rounded-lg bg-gray-100 border border-gray-200">
                      <Globe className="w-5 h-5 text-black" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">Sites Unlocked</p>
                    <div className="text-3xl font-bold text-black leading-none">{unlockedCount}</div>
                  </div>
                </Card>
              </div>

              {/* MAIN DATA GRID (2/3 width for lists, 1/3 for quick actions) */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Left Side: Managed Sites (Takes up 2 columns) */}
                <div className="xl:col-span-2">
                  <Card className="p-6 bg-white border border-gray-200 hover:border-gray-300 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <h2 className="text-xl font-semibold text-black tracking-tight">Managed Sites</h2>
                      <Button
                        size="sm"
                        onClick={() => setShowAddSite(!showAddSite)}
                        className="bg-black hover:bg-gray-900 text-white rounded-lg"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Site
                      </Button>
                    </div>

                    {showAddSite && (
                      <div className="mb-6 p-4 rounded-xl bg-gray-50 border border-gray-200">
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            value={newSiteUrl}
                            onChange={(e) => setNewSiteUrl(e.target.value)}
                            placeholder="Enter website URL (e.g., example.com)"
                            className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                            onKeyPress={(e) => e.key === "Enter" && addNewSite()}
                          />
                          <Button onClick={addNewSite} className="bg-black hover:bg-gray-900 text-white">
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
                              className="flex flex-col p-5 rounded-2xl border hover:border-gray-300 transition-all group relative bg-white border-gray-200 hover:shadow-sm"
                            >
                              {/* Top row: Icon and absolute positioned Trash */}
                              <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl flex-shrink-0 border border-gray-200">
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
                                <div className="font-semibold text-black truncate text-base">
                                  {site.url}
                                </div>
                                <div className="text-xs font-medium text-gray-400 mt-1">
                                  {site.category}
                                </div>
                              </div>

                              {/* Bottom row: Controls */}
                              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                <Badge
                                  variant="outline"
                                  className={`${site.isLocked
                                      ? "bg-red-50 text-red-700 border-red-200"
                                      : "bg-green-50 text-green-700 border-green-200"
                                    } px-3 py-1 rounded-md border text-xs font-bold tracking-wide`}
                                >
                                  {site.isLocked ? "Locked" : "Unlocked"}
                                </Badge>

                                <Switch
                                  checked={site.isLocked}
                                  onCheckedChange={() => toggleSiteLock(site.id)}
                                  className="data-[state=checked]:bg-black"
                                />
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="col-span-full flex items-center justify-center h-64 text-gray-400">
                            <div className="text-center">
                              <Globe className="w-12 h-12 mx-auto mb-4 opacity-30" />
                              <p className="text-black font-medium">No sites added yet</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {totalPages > 1 && (
                        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
                          <p className="text-sm text-gray-400">
                            Showing {startIndex + 1}-{Math.min(endIndex, sites.length)} of {sites.length}
                          </p>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => goToPage(currentPage - 1)}
                              disabled={currentPage === 1}
                              className="border-gray-300 bg-white hover:bg-gray-50 text-black disabled:opacity-40"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => goToPage(currentPage + 1)}
                              disabled={currentPage === totalPages}
                              className="border-gray-300 bg-white hover:bg-gray-50 text-black disabled:opacity-40"
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
                  <Card className="p-6 bg-white border border-gray-200 hover:border-gray-300 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                    <h3 className="text-lg font-semibold text-black mb-4 tracking-tight">Quick Actions</h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start border-gray-200 bg-white hover:bg-gray-50 text-black py-6 rounded-xl">
                        <Eye className="w-4 h-4 mr-3 text-black" />
                        Unlock All Sites
                      </Button>
                      <Button variant="outline" className="w-full justify-start border-gray-200 bg-white hover:bg-gray-50 text-black py-6 rounded-xl">
                        <EyeOff className="w-4 h-4 mr-3 text-black" />
                        Lock All Sites
                      </Button>
                      <Button onClick={() => setActiveTab("schedule")} variant="outline" className="w-full justify-start border-gray-200 bg-white hover:bg-gray-50 text-black py-6 rounded-xl">
                        <Timer className="w-4 h-4 mr-3 text-black" />
                        Schedule Locks
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-6 bg-white border border-gray-200 hover:border-gray-300 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                    <h3 className="text-lg font-semibold text-black mb-4 tracking-tight">Recent Activity</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                        <span className="text-sm text-black flex-grow">Unlocked facebook.com</span>
                        <span className="text-xs text-gray-400">2m</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                        <span className="text-sm text-black flex-grow">Locked youtube.com</span>
                        <span className="text-xs text-gray-400">5m</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-black rounded-full flex-shrink-0"></div>
                        <span className="text-sm text-black flex-grow">Added reddit.com</span>
                        <span className="text-xs text-gray-400">1h</span>
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