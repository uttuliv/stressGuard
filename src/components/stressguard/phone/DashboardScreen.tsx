import { motion } from 'framer-motion';
import { Clock, Play, Square, Activity, ChevronRight } from 'lucide-react';
import { DEMO_COURSES, DEMO_STRESS_EVENTS } from '@/data/demo-timeline';
import { StressState } from '@/types/stressguard';

interface DashboardScreenProps {
  activeCourseIndex: number | null;
  stressState: StressState;
  onStartSession: (index: number) => void;
  onEndSession: () => void;
  onNavigate: (screen: string) => void;
}

export function DashboardScreen({
  activeCourseIndex,
  stressState,
  onStartSession,
  onEndSession,
  onNavigate,
}: DashboardScreenProps) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const recentEvents = DEMO_STRESS_EVENTS.slice(0, 3);

  return (
    <div className="h-full flex flex-col bg-black text-white">
      {/* Status Bar */}
      <div className="px-5 pt-3 pb-2">
        <p className="text-xs text-neutral-500">{today}</p>
        <h1 className="text-lg font-bold mt-1">Dashboard</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        {/* Active Session Banner */}
        {activeCourseIndex !== null && (
          <motion.div
            className="rounded-2xl p-4 relative overflow-hidden"
            style={{
              background: stressState === 'stressed'
                ? 'linear-gradient(135deg, hsl(38,92%,25%), hsl(0,60%,25%))'
                : stressState === 'recovery'
                ? 'linear-gradient(135deg, hsl(210,60%,20%), hsl(210,80%,30%))'
                : 'linear-gradient(135deg, hsl(142,50%,18%), hsl(142,60%,25%))',
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-300">Active Session</p>
                <p className="text-sm font-semibold mt-0.5">{DEMO_COURSES[activeCourseIndex].name.split(' – ')[0]}</p>
              </div>
              <motion.div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: stressState === 'stressed' ? 'hsl(38,92%,50%)' : stressState === 'recovery' ? 'hsl(210,100%,52%)' : 'hsl(142,71%,45%)',
                }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
            <button
              onClick={onEndSession}
              className="mt-3 flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white transition-colors"
            >
              <Square className="w-3 h-3" /> End Session
            </button>
          </motion.div>
        )}

        {/* Today's Schedule */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-neutral-300">Today's Schedule</h2>
            <button onClick={() => onNavigate('schedule')} className="text-xs text-blue-400">
              Edit
            </button>
          </div>
          <div className="space-y-2">
            {DEMO_COURSES.map((course, i) => (
              <motion.div
                key={course.id}
                className="rounded-xl p-3 flex items-center justify-between"
                style={{ backgroundColor: activeCourseIndex === i ? 'hsl(210,60%,15%)' : 'hsl(0,0%,12%)' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    <Clock className="w-3.5 h-3.5 text-neutral-500" />
                    <span className="text-[10px] text-neutral-500 mt-0.5">{course.time}</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium">{course.name.split(' – ')[0]}</p>
                    <p className="text-[10px] text-neutral-500">{course.room}</p>
                  </div>
                </div>
                {activeCourseIndex === i ? (
                  <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Live</span>
                ) : (
                  <button onClick={() => onStartSession(i)} className="p-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700">
                    <Play className="w-3 h-3 text-neutral-400" />
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Stress Events */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-neutral-300">Recent Events</h2>
            <button onClick={() => onNavigate('history')} className="text-xs text-blue-400 flex items-center gap-0.5">
              View All <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-2">
            {recentEvents.map((event, i) => (
              <div key={event.id} className="rounded-xl p-3 flex items-center gap-3" style={{ backgroundColor: 'hsl(0,0%,12%)' }}>
                <Activity className="w-4 h-4 text-orange-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{event.interventionType}</p>
                  <p className="text-[10px] text-neutral-500">
                    {event.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {event.peakHR} BPM peak
                  </p>
                </div>
                <span className="text-[10px] text-neutral-500">{event.duration}s</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onNavigate('report')}
            className="rounded-xl p-3 text-left hover:bg-neutral-800 transition-colors"
            style={{ backgroundColor: 'hsl(0,0%,12%)' }}
          >
            <p className="text-xs font-semibold">📊 Weekly Report</p>
            <p className="text-[10px] text-neutral-500 mt-0.5">View trends</p>
          </button>
          <button
            onClick={() => onNavigate('history')}
            className="rounded-xl p-3 text-left hover:bg-neutral-800 transition-colors"
            style={{ backgroundColor: 'hsl(0,0%,12%)' }}
          >
            <p className="text-xs font-semibold">📋 History</p>
            <p className="text-[10px] text-neutral-500 mt-0.5">All events</p>
          </button>
        </div>
      </div>
    </div>
  );
}
