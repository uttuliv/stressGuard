import { motion } from 'framer-motion';
import { Clock, Play, Square, Activity, ChevronRight, BarChart3, List, Calendar } from 'lucide-react';
import { DEMO_COURSES, DEMO_STRESS_EVENTS, DEMO_SCHEDULE, ScheduleBlock } from '@/data/demo-timeline';
import { StressState } from '@/types/stressguard';

interface DashboardScreenProps {
  activeCourseIndex: number | null;
  stressState: StressState;
  onStartSession: (index: number) => void;
  onEndSession: () => void;
  onNavigate: (screen: string) => void;
}

const DAYS_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

function toMinutes(t: string): number {
  const [h, m] = t.split(':').map(Number);
  const adjusted = h < 8 ? h + 12 : h;
  return adjusted * 60 + m;
}

function formatTime(t: string) {
  const [h, m] = t.split(':').map(Number);
  const displayH = h > 12 ? h - 12 : h;
  return `${displayH}:${m.toString().padStart(2, '0')}`;
}

function getTodayDayName(): string {
  const dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return dayMap[new Date().getDay()] || 'Mon';
}

export function DashboardScreen({
  activeCourseIndex,
  stressState,
  onStartSession,
  onEndSession,
  onNavigate,
}: DashboardScreenProps) {
  const now = new Date();
  const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });
  const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const todayShort = getTodayDayName();
  const todayBlocks = DEMO_SCHEDULE
    .filter(b => b.days.includes(todayShort))
    .sort((a, b) => toMinutes(a.startTime) - toMinutes(b.startTime));

  const recentEvents = DEMO_STRESS_EVENTS.slice(0, 2);

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-stone-50 to-white text-stone-800">
      {/* Header */}
      <div className="px-5 pt-10 pb-3 flex items-start justify-between">
        <div>
          <p className="text-xs text-stone-400">Hi Max, your stress levels</p>
          <p className="text-xs text-stone-400">were lowest at 10am</p>
          <p className="text-xs text-stone-400">this morning.</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-stone-800">{dayName}</p>
          <p className="text-[10px] text-stone-400 uppercase tracking-wide">{dateStr}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        {/* Active Session Banner */}
        {activeCourseIndex !== null && (
          <motion.div
            className="rounded-2xl p-4 relative overflow-hidden border"
            style={{
              backgroundColor: stressState === 'stressed' ? 'hsl(38, 92%, 96%)' : stressState === 'recovery' ? 'hsl(210, 80%, 96%)' : 'hsl(142, 50%, 96%)',
              borderColor: stressState === 'stressed' ? 'hsl(38, 60%, 85%)' : stressState === 'recovery' ? 'hsl(210, 60%, 85%)' : 'hsl(142, 40%, 85%)',
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-stone-400 uppercase tracking-wide">Active Session</p>
                <p className="text-xs font-semibold mt-0.5 text-stone-800">{DEMO_COURSES[activeCourseIndex].name.split(' – ')[0]}</p>
              </div>
              <motion.div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: stressState === 'stressed' ? 'hsl(38,92%,50%)' : stressState === 'recovery' ? 'hsl(210,100%,52%)' : 'hsl(142,71%,45%)' }}
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
            <button onClick={onEndSession} className="mt-3 flex items-center gap-1.5 text-[10px] text-stone-500 hover:text-stone-700 transition-colors">
              <Square className="w-2.5 h-2.5" /> End Session
            </button>
          </motion.div>
        )}

        {/* Today's Schedule (Weekly Grid Preview) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Today's Schedule</h2>
            <button onClick={() => onNavigate('schedule')} className="text-[10px] text-stone-400 hover:text-stone-600 flex items-center gap-0.5">
              Full Week <ChevronRight className="w-2.5 h-2.5" />
            </button>
          </div>
          <div className="space-y-1.5">
            {todayBlocks.slice(0, 6).map((block, i) => (
              <motion.div
                key={block.id + '-' + i}
                className="rounded-xl p-2.5 flex items-center justify-between bg-white border border-stone-100"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex flex-col items-center min-w-[32px]">
                    <span className="text-[8px] text-stone-400">{formatTime(block.startTime)}</span>
                    <div className="w-px h-2 bg-stone-200" />
                    <span className="text-[8px] text-stone-400">{formatTime(block.endTime)}</span>
                  </div>
                  <p className="text-[10px] font-medium text-stone-700">{block.label}</p>
                </div>
              </motion.div>
            ))}
            {todayBlocks.length > 6 && (
              <button onClick={() => onNavigate('schedule')} className="w-full text-[9px] text-stone-400 py-1.5 hover:text-stone-600">
                +{todayBlocks.length - 6} more blocks
              </button>
            )}
          </div>
        </div>

        {/* Recent Stress Events */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Recent Events</h2>
            <button onClick={() => onNavigate('history')} className="text-[10px] text-stone-400 hover:text-stone-600 flex items-center gap-0.5">
              View All <ChevronRight className="w-2.5 h-2.5" />
            </button>
          </div>
          <div className="space-y-1.5">
            {recentEvents.map((event) => (
              <div key={event.id} className="rounded-xl p-2.5 flex items-center gap-3 bg-white border border-stone-100">
                <div className="w-7 h-7 rounded-xl bg-orange-50 flex items-center justify-center">
                  <Activity className="w-3 h-3 text-orange-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-medium text-stone-700 truncate">{event.interventionType}</p>
                  <p className="text-[8px] text-stone-400">
                    {event.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {event.peakHR} BPM
                  </p>
                </div>
                <span className="text-[9px] text-stone-400">{event.duration}s</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => onNavigate('report')}
            className="rounded-2xl p-3 text-left hover:bg-stone-50 transition-colors bg-white border border-stone-100">
            <BarChart3 className="w-3.5 h-3.5 text-stone-400 mb-1" />
            <p className="text-[11px] font-medium text-stone-700">Report</p>
            <p className="text-[9px] text-stone-400 mt-0.5">Daily & Weekly</p>
          </button>
          <button onClick={() => onNavigate('history')}
            className="rounded-2xl p-3 text-left hover:bg-stone-50 transition-colors bg-white border border-stone-100">
            <List className="w-3.5 h-3.5 text-stone-400 mb-1" />
            <p className="text-[11px] font-medium text-stone-700">History</p>
            <p className="text-[9px] text-stone-400 mt-0.5">All events</p>
          </button>
        </div>
      </div>
    </div>
  );
}
