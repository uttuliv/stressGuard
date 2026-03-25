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
    <div className="h-full flex flex-col bg-black text-white">
      <div className="px-4 pt-3 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="p-1">
            <ChevronLeft className="w-5 h-5 text-blue-400" />
          </button>
          <h1 className="text-sm font-semibold">Schedule</h1>
        </div>
        <button onClick={() => setAdding(!adding)} className="p-1.5 rounded-full bg-neutral-800">
          {adding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4 text-blue-400" />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        {/* Add form */}
        {adding && (
          <motion.div
            className="rounded-xl p-4 space-y-3"
            style={{ backgroundColor: 'hsl(0,0%,10%)' }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <input
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="Course name"
              className="w-full bg-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-600 outline-none focus:ring-1 focus:ring-blue-500"
            />
            <input
              value={newTime}
              onChange={e => setNewTime(e.target.value)}
              placeholder="Time (e.g. 10:00 AM)"
              className="w-full bg-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-600 outline-none focus:ring-1 focus:ring-blue-500"
            />
            <div>
              <p className="text-[10px] text-neutral-400 mb-1.5">Days</p>
              <div className="flex gap-1.5">
                {DAYS.map(day => (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`px-2 py-1 rounded-md text-[10px] font-medium transition-colors ${
                      newDays.includes(day) ? 'bg-blue-500 text-white' : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
            {error && <p className="text-[10px] text-red-400">{error}</p>}
            <button
              onClick={handleAdd}
              className="w-full h-9 bg-green-500 rounded-lg text-xs font-semibold flex items-center justify-center gap-1"
            >
              <Check className="w-3.5 h-3.5" /> Add Course
            </button>
          </motion.div>
        )}

        {/* Course list */}
        {courses.map((course, i) => (
          <motion.div
            key={course.id}
            className="rounded-xl p-3"
            style={{ backgroundColor: 'hsl(0,0%,10%)' }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium">{course.name}</p>
                <p className="text-[10px] text-neutral-500 mt-0.5">
                  {course.time} · {course.days.join(', ')}
                </p>
                {course.room && <p className="text-[10px] text-neutral-600">{course.room}</p>}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
