import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronDown, ChevronUp, Clock, Heart, Hand, Timer } from 'lucide-react';
import { DEMO_STRESS_EVENTS, DEMO_COURSES } from '@/data/demo-timeline';

interface HistoryScreenProps {
  onBack: () => void;
}

export function HistoryScreen({ onBack }: HistoryScreenProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const grouped = DEMO_COURSES.map(course => ({
    course,
    events: DEMO_STRESS_EVENTS.filter(e => e.courseId === course.id),
  })).filter(g => g.events.length > 0);

  const getDismissIcon = (method: string) => {
    switch (method) {
      case 'tapped': return <Hand className="w-3 h-3 text-stone-400" />;
      case 'auto': return <Timer className="w-3 h-3 text-stone-400" />;
      default: return <Clock className="w-3 h-3 text-stone-400" />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-stone-50 to-white text-stone-800">
      <div className="px-4 pt-10 pb-2 flex items-center gap-2">
        <button onClick={onBack} className="p-1">
          <ChevronLeft className="w-5 h-5 text-stone-400" />
        </button>
        <h1 className="text-sm font-semibold text-stone-700">Intervention History</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        {grouped.map(({ course, events }) => (
          <div key={course.id}>
            <h2 className="text-[10px] font-semibold text-stone-400 uppercase tracking-wide mb-2">{course.name.split(' – ')[0]}</h2>
            <div className="space-y-2">
              {events.map((event, i) => (
                <motion.div
                  key={event.id}
                  className="rounded-2xl overflow-hidden bg-white border border-stone-100"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    onClick={() => setExpandedId(expandedId === event.id ? null : event.id)}
                    className="w-full p-3 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center">
                        <Heart className="w-3.5 h-3.5 text-orange-400" />
                      </div>
                      <div className="text-left">
                        <p className="text-[11px] font-medium text-stone-700">{event.interventionType}</p>
                        <p className="text-[9px] text-stone-400">
                          {event.timestamp.toLocaleDateString()} · {event.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    {expandedId === event.id ? (
                      <ChevronUp className="w-3.5 h-3.5 text-stone-300" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-stone-300" />
                    )}
                  </button>
                  {expandedId === event.id && (
                    <motion.div
                      className="px-3 pb-3 grid grid-cols-3 gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="rounded-xl p-2 text-center bg-stone-50 border border-stone-100">
                        <Clock className="w-3 h-3 text-stone-400 mx-auto mb-1" />
                        <p className="text-[11px] font-bold text-stone-700">{event.duration}s</p>
                        <p className="text-[8px] text-stone-400">Duration</p>
                      </div>
                      <div className="rounded-xl p-2 text-center bg-stone-50 border border-stone-100">
                        <Heart className="w-3 h-3 text-red-400 mx-auto mb-1" />
                        <p className="text-[11px] font-bold text-stone-700">{event.peakHR}</p>
                        <p className="text-[8px] text-stone-400">Peak BPM</p>
                      </div>
                      <div className="rounded-xl p-2 text-center bg-stone-50 border border-stone-100">
                        {getDismissIcon(event.dismissMethod)}
                        <p className="text-[11px] font-bold text-stone-700 capitalize mt-1">{event.dismissMethod}</p>
                        <p className="text-[8px] text-stone-400">Dismissed</p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
