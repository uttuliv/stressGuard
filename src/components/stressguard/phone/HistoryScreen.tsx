import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronDown, ChevronUp, Clock, Heart } from 'lucide-react';
import { DEMO_STRESS_EVENTS, DEMO_COURSES } from '@/data/demo-timeline';

interface HistoryScreenProps {
  onBack: () => void;
}

export function HistoryScreen({ onBack }: HistoryScreenProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Group events by course
  const grouped = DEMO_COURSES.map(course => ({
    course,
    events: DEMO_STRESS_EVENTS.filter(e => e.courseId === course.id),
  })).filter(g => g.events.length > 0);

  return (
    <div className="h-full flex flex-col bg-black text-white">
      <div className="px-4 pt-3 pb-2 flex items-center gap-2">
        <button onClick={onBack} className="p-1">
          <ChevronLeft className="w-5 h-5 text-blue-400" />
        </button>
        <h1 className="text-sm font-semibold">Intervention History</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        {grouped.map(({ course, events }) => (
          <div key={course.id}>
            <h2 className="text-xs font-semibold text-neutral-400 mb-2">{course.name.split(' – ')[0]}</h2>
            <div className="space-y-2">
              {events.map((event, i) => (
                <motion.div
                  key={event.id}
                  className="rounded-xl overflow-hidden"
                  style={{ backgroundColor: 'hsl(0,0%,10%)' }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    onClick={() => setExpandedId(expandedId === event.id ? null : event.id)}
                    className="w-full p-3 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/15 flex items-center justify-center">
                        <Heart className="w-3.5 h-3.5 text-orange-400" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-medium">{event.interventionType}</p>
                        <p className="text-[10px] text-neutral-500">
                          {event.timestamp.toLocaleDateString()} · {event.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    {expandedId === event.id ? (
                      <ChevronUp className="w-4 h-4 text-neutral-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neutral-500" />
                    )}
                  </button>
                  {expandedId === event.id && (
                    <motion.div
                      className="px-3 pb-3 grid grid-cols-3 gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="rounded-lg p-2 text-center" style={{ backgroundColor: 'hsl(0,0%,15%)' }}>
                        <Clock className="w-3 h-3 text-neutral-400 mx-auto mb-1" />
                        <p className="text-xs font-bold">{event.duration}s</p>
                        <p className="text-[8px] text-neutral-500">Duration</p>
                      </div>
                      <div className="rounded-lg p-2 text-center" style={{ backgroundColor: 'hsl(0,0%,15%)' }}>
                        <Heart className="w-3 h-3 text-red-400 mx-auto mb-1" />
                        <p className="text-xs font-bold">{event.peakHR}</p>
                        <p className="text-[8px] text-neutral-500">Peak BPM</p>
                      </div>
                      <div className="rounded-lg p-2 text-center" style={{ backgroundColor: 'hsl(0,0%,15%)' }}>
                        <span className="text-[10px]">
                          {event.dismissMethod === 'tapped' ? '👆' : event.dismissMethod === 'auto' ? '⏱' : '⏰'}
                        </span>
                        <p className="text-xs font-bold capitalize">{event.dismissMethod}</p>
                        <p className="text-[8px] text-neutral-500">Dismissed</p>
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
