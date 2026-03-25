import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Info } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';
import { WEEKLY_REPORT_DATA, TREND_DATA, DEMO_STRESS_EVENTS } from '@/data/demo-timeline';

interface WeeklyReportScreenProps {
  onBack: () => void;
}

const DAILY_DATA = [
  { hour: '8AM', events: 0, hr: 72 },
  { hour: '9AM', events: 1, hr: 82 },
  { hour: '10AM', events: 2, hr: 88 },
  { hour: '11AM', events: 1, hr: 85 },
  { hour: '12PM', events: 0, hr: 76 },
  { hour: '1PM', events: 1, hr: 80 },
  { hour: '2PM', events: 1, hr: 84 },
  { hour: '3PM', events: 0, hr: 74 },
];

export function WeeklyReportScreen({ onBack }: WeeklyReportScreenProps) {
  const [tab, setTab] = useState<'daily' | 'weekly'>('daily');
  const [expandedDay, setExpandedDay] = useState<string | null>(null);

  const todayEvents = DEMO_STRESS_EVENTS.slice(0, 3);
  const totalDailyEvents = DAILY_DATA.reduce((s, d) => s + d.events, 0);
  const avgDailyHR = Math.round(DAILY_DATA.reduce((s, d) => s + d.hr, 0) / DAILY_DATA.length);

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-stone-50 to-white text-stone-800">
      <div className="px-4 pt-10 pb-2 flex items-center gap-2">
        <button onClick={onBack} className="p-1">
          <ChevronLeft className="w-5 h-5 text-stone-400" />
        </button>
        <h1 className="text-sm font-semibold text-stone-700">Report</h1>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-3">
        <div className="flex bg-stone-100 rounded-xl p-0.5">
          <button
            onClick={() => setTab('daily')}
            className={`flex-1 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
              tab === 'daily' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-400'
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setTab('weekly')}
            className={`flex-1 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
              tab === 'weekly' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-400'
            }`}
          >
            Weekly
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-100 rounded-xl px-3 py-1.5">
          <Info className="w-3 h-3 text-amber-500" />
          <span className="text-[10px] text-amber-600 font-medium">Simulated Data</span>
        </div>

        {tab === 'daily' ? (
          /* ===== DAILY VIEW ===== */
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-2xl p-2.5 bg-white border border-stone-100 text-center">
                <p className="text-base font-bold text-stone-800">{totalDailyEvents}</p>
                <p className="text-[8px] text-stone-400">Events Today</p>
              </div>
              <div className="rounded-2xl p-2.5 bg-white border border-stone-100 text-center">
                <p className="text-base font-bold text-stone-800">{avgDailyHR}</p>
                <p className="text-[8px] text-stone-400">Avg HR</p>
              </div>
              <div className="rounded-2xl p-2.5 bg-white border border-stone-100 text-center">
                <p className="text-base font-bold text-emerald-600">Low</p>
                <p className="text-[8px] text-stone-400">Stress Level</p>
              </div>
            </div>

            {/* Hourly Chart */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-[11px] font-semibold text-stone-500 uppercase tracking-wide mb-2">Stress by Hour</h2>
              <div className="h-28 rounded-2xl p-3 bg-white border border-stone-100">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DAILY_DATA}>
                    <XAxis dataKey="hour" tick={{ fontSize: 8, fill: '#a8a29e' }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'white', border: '1px solid #e7e5e4', borderRadius: '12px', fontSize: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                    />
                    <Bar dataKey="events" fill="#292524" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Heart Rate Through Day */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              <h2 className="text-[11px] font-semibold text-stone-500 uppercase tracking-wide mb-2">Heart Rate</h2>
              <div className="h-24 rounded-2xl p-3 bg-white border border-stone-100">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={DAILY_DATA}>
                    <XAxis dataKey="hour" tick={{ fontSize: 8, fill: '#a8a29e' }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Line type="monotone" dataKey="hr" stroke="#292524" strokeWidth={2} dot={{ fill: '#292524', r: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Today's Events List */}
            <div>
              <h2 className="text-[11px] font-semibold text-stone-500 uppercase tracking-wide mb-2">Today's Events</h2>
              <div className="space-y-1.5">
                {todayEvents.map(ev => (
                  <div key={ev.id} className="rounded-xl p-2.5 bg-white border border-stone-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-medium text-stone-700">{ev.interventionType}</p>
                      <p className="text-[8px] text-stone-400">{ev.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-medium text-stone-700">{ev.peakHR} BPM</p>
                      <p className="text-[8px] text-stone-400">{ev.duration}s</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* ===== WEEKLY VIEW ===== */
          <>
            {/* Stress Events by Day */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-[11px] font-semibold text-stone-500 uppercase tracking-wide mb-2">Stress Events by Day</h2>
              <div className="h-28 rounded-2xl p-3 bg-white border border-stone-100">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={WEEKLY_REPORT_DATA}>
                    <XAxis dataKey="day" tick={{ fontSize: 9, fill: '#a8a29e' }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'white', border: '1px solid #e7e5e4', borderRadius: '12px', fontSize: '11px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                    />
                    <Bar dataKey="events" fill="#292524" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-7 gap-1 mt-2">
                {WEEKLY_REPORT_DATA.map(d => (
                  <button key={d.day} onClick={() => setExpandedDay(expandedDay === d.day ? null : d.day)}
                    className={`text-[9px] text-center py-1 rounded-lg transition-colors border ${
                      expandedDay === d.day ? 'bg-stone-800 text-white border-stone-800' : 'bg-white text-stone-400 border-stone-100 hover:border-stone-200'
                    }`}>{d.day}</button>
                ))}
              </div>
              {expandedDay && (
                <motion.div className="mt-2 rounded-2xl p-3 bg-white border border-stone-100"
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                  {(() => {
                    const day = WEEKLY_REPORT_DATA.find(d => d.day === expandedDay)!;
                    return (
                      <>
                        <p className="text-xs font-semibold text-stone-700">{expandedDay}</p>
                        <p className="text-[10px] text-stone-400 mt-1">{day.events} stress events · Avg HR {day.avgHR} BPM</p>
                        <p className="text-[10px] text-stone-400 mt-0.5">Courses: {day.courses.join(', ') || 'None'}</p>
                      </>
                    );
                  })()}
                </motion.div>
              )}
            </motion.div>

            {/* 4-Week Trend */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
              <h2 className="text-[11px] font-semibold text-stone-500 uppercase tracking-wide mb-2">4-Week Trend</h2>
              <div className="h-24 rounded-2xl p-3 bg-white border border-stone-100">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={TREND_DATA}>
                    <XAxis dataKey="week" tick={{ fontSize: 9, fill: '#a8a29e' }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'white', border: '1px solid #e7e5e4', borderRadius: '12px', fontSize: '11px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                    />
                    <Line type="monotone" dataKey="events" stroke="#292524" strokeWidth={2} dot={{ fill: '#292524', r: 3 }} />
                    <Line type="monotone" dataKey="avgStress" stroke="#a8a29e" strokeWidth={2} dot={{ fill: '#a8a29e', r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-4 mt-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-stone-800" />
                  <span className="text-[9px] text-stone-400">Events</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-stone-400" />
                  <span className="text-[9px] text-stone-400">Avg Stress</span>
                </div>
              </div>
            </motion.div>

            {/* Summary Stats */}
            <div className="rounded-2xl p-3 grid grid-cols-3 gap-2 bg-white border border-stone-100">
              <div className="text-center">
                <p className="text-base font-bold text-emerald-600">-42%</p>
                <p className="text-[9px] text-stone-400">Stress Events</p>
              </div>
              <div className="text-center">
                <p className="text-base font-bold text-stone-700">-1.7</p>
                <p className="text-[9px] text-stone-400">Avg Stress</p>
              </div>
              <div className="text-center">
                <p className="text-base font-bold text-orange-500">87%</p>
                <p className="text-[9px] text-stone-400">Helpful</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
