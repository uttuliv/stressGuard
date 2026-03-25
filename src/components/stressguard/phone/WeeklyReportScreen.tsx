import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';
import { WEEKLY_REPORT_DATA, TREND_DATA } from '@/data/demo-timeline';

interface WeeklyReportScreenProps {
  onBack: () => void;
}

export function WeeklyReportScreen({ onBack }: WeeklyReportScreenProps) {
  const [expandedDay, setExpandedDay] = useState<string | null>(null);

  return (
    <div className="h-full flex flex-col bg-black text-white">
      <div className="px-4 pt-3 pb-2 flex items-center gap-2">
        <button onClick={onBack} className="p-1">
          <ChevronLeft className="w-5 h-5 text-blue-400" />
        </button>
        <h1 className="text-sm font-semibold">Weekly Report</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-5">
        {/* Simulated Data Badge */}
        <div className="flex items-center gap-1.5 bg-amber-500/10 rounded-lg px-3 py-1.5">
          <AlertTriangle className="w-3 h-3 text-amber-400" />
          <span className="text-[10px] text-amber-400 font-medium">Simulated Data</span>
        </div>

        {/* Stress Events by Day */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-xs font-semibold text-neutral-300 mb-3">Stress Events by Day</h2>
          <div className="h-32 rounded-xl p-2" style={{ backgroundColor: 'hsl(0,0%,8%)' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_REPORT_DATA}>
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#666' }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '8px', fontSize: '11px' }}
                  labelStyle={{ color: '#999' }}
                />
                <Bar dataKey="events" fill="hsl(38,92%,50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Tappable days */}
          <div className="grid grid-cols-7 gap-1 mt-2">
            {WEEKLY_REPORT_DATA.map(d => (
              <button
                key={d.day}
                onClick={() => setExpandedDay(expandedDay === d.day ? null : d.day)}
                className={`text-[9px] text-center py-1 rounded-md transition-colors ${
                  expandedDay === d.day ? 'bg-blue-500/20 text-blue-400' : 'bg-neutral-800/50 text-neutral-500'
                }`}
              >
                {d.day}
              </button>
            ))}
          </div>
          {expandedDay && (
            <motion.div
              className="mt-2 rounded-xl p-3"
              style={{ backgroundColor: 'hsl(0,0%,10%)' }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              {(() => {
                const day = WEEKLY_REPORT_DATA.find(d => d.day === expandedDay)!;
                return (
                  <>
                    <p className="text-xs font-semibold">{expandedDay}</p>
                    <p className="text-[10px] text-neutral-400 mt-1">{day.events} stress events · Avg HR {day.avgHR} BPM</p>
                    <p className="text-[10px] text-neutral-500 mt-0.5">Courses: {day.courses.join(', ') || 'None'}</p>
                  </>
                );
              })()}
            </motion.div>
          )}
        </motion.div>

        {/* 4-Week Trend */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
          <h2 className="text-xs font-semibold text-neutral-300 mb-3">4-Week Trend</h2>
          <div className="flex items-center gap-1.5 bg-amber-500/10 rounded-lg px-3 py-1.5 mb-2">
            <AlertTriangle className="w-3 h-3 text-amber-400" />
            <span className="text-[10px] text-amber-400 font-medium">Simulated Data</span>
          </div>
          <div className="h-28 rounded-xl p-2" style={{ backgroundColor: 'hsl(0,0%,8%)' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={TREND_DATA}>
                <XAxis dataKey="week" tick={{ fontSize: 9, fill: '#666' }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '8px', fontSize: '11px' }}
                  labelStyle={{ color: '#999' }}
                />
                <Line type="monotone" dataKey="events" stroke="hsl(38,92%,50%)" strokeWidth={2} dot={{ fill: 'hsl(38,92%,50%)', r: 3 }} />
                <Line type="monotone" dataKey="avgStress" stroke="hsl(210,100%,52%)" strokeWidth={2} dot={{ fill: 'hsl(210,100%,52%)', r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'hsl(38,92%,50%)' }} />
              <span className="text-[9px] text-neutral-500">Events</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'hsl(210,100%,52%)' }} />
              <span className="text-[9px] text-neutral-500">Avg Stress</span>
            </div>
          </div>
        </motion.div>

        {/* Summary */}
        <div className="rounded-xl p-3 grid grid-cols-3 gap-2" style={{ backgroundColor: 'hsl(0,0%,8%)' }}>
          <div className="text-center">
            <p className="text-lg font-bold text-green-400">↓42%</p>
            <p className="text-[9px] text-neutral-500">Stress Events</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-blue-400">↓1.7</p>
            <p className="text-[9px] text-neutral-500">Avg Stress</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-orange-400">87%</p>
            <p className="text-[9px] text-neutral-500">Helpful</p>
          </div>
        </div>
      </div>
    </div>
  );
}
