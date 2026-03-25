import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Plus, X, Check } from 'lucide-react';
import { DEMO_COURSES } from '@/data/demo-timeline';
import { Course } from '@/types/stressguard';

interface ScheduleScreenProps {
  onBack: () => void;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export function ScheduleScreen({ onBack }: ScheduleScreenProps) {
  const [courses, setCourses] = useState<Course[]>(DEMO_COURSES);
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newDays, setNewDays] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (!newName.trim()) { setError('Name is required'); return; }
    if (!newTime.trim()) { setError('Time is required'); return; }
    if (newDays.length === 0) { setError('Select at least one day'); return; }
    setCourses(prev => [...prev, {
      id: `custom-${Date.now()}`,
      name: newName,
      time: newTime,
      days: newDays,
    }]);
    setNewName('');
    setNewTime('');
    setNewDays([]);
    setAdding(false);
    setError('');
  };

  const toggleDay = (day: string) => {
    setNewDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-stone-50 to-white text-stone-800">
      <div className="px-4 pt-10 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="p-1">
            <ChevronLeft className="w-5 h-5 text-stone-400" />
          </button>
          <h1 className="text-sm font-semibold text-stone-700">Schedule</h1>
        </div>
        <button onClick={() => setAdding(!adding)} className="p-1.5 rounded-full bg-white border border-stone-200 hover:bg-stone-50">
          {adding ? <X className="w-4 h-4 text-stone-500" /> : <Plus className="w-4 h-4 text-stone-500" />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        {/* Add form */}
        {adding && (
          <motion.div
            className="rounded-2xl p-4 space-y-3 bg-white border border-stone-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <input
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="Course name"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-700 placeholder-stone-300 outline-none focus:ring-1 focus:ring-stone-400 focus:border-stone-400"
            />
            <input
              value={newTime}
              onChange={e => setNewTime(e.target.value)}
              placeholder="Time (e.g. 10:00 AM)"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-700 placeholder-stone-300 outline-none focus:ring-1 focus:ring-stone-400 focus:border-stone-400"
            />
            <div>
              <p className="text-[10px] text-stone-400 mb-1.5">Days</p>
              <div className="flex gap-1.5">
                {DAYS.map(day => (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-colors border ${
                      newDays.includes(day) ? 'bg-stone-800 text-white border-stone-800' : 'bg-white text-stone-400 border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
            {error && <p className="text-[10px] text-red-500">{error}</p>}
            <button
              onClick={handleAdd}
              className="w-full h-9 bg-stone-800 text-white rounded-xl text-xs font-medium flex items-center justify-center gap-1 hover:bg-stone-700"
            >
              <Check className="w-3.5 h-3.5" /> Add Course
            </button>
          </motion.div>
        )}

        {/* Course list */}
        {courses.map((course, i) => (
          <motion.div
            key={course.id}
            className="rounded-2xl p-3 bg-white border border-stone-100"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium text-stone-700">{course.name}</p>
                <p className="text-[9px] text-stone-400 mt-0.5">
                  {course.time} · {course.days.join(', ')}
                </p>
                {course.room && <p className="text-[9px] text-stone-400">{course.room}</p>}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
