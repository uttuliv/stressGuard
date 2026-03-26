import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Plus, X, Check, Pencil, Trash2 } from 'lucide-react';
import { DEMO_SCHEDULE, ScheduleBlock } from '@/data/demo-timeline';

interface ScheduleScreenProps {
  onBack: () => void;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

/** Convert "H:MM" to minutes since midnight. Hours < 8 are treated as PM (add 12). */
function toMinutes(t: string): number {
  const [h, m] = t.split(':').map(Number);
  const adjusted = h < 8 ? h + 12 : h;
  return adjusted * 60 + m;
}

function formatTime(t: string): string {
  const [h, m] = t.split(':').map(Number);
  const isPM = h >= 12 || h < 8;
  const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${displayH}:${m.toString().padStart(2, '0')}`;
}

export function ScheduleScreen({ onBack }: ScheduleScreenProps) {
  const [blocks, setBlocks] = useState<ScheduleBlock[]>(DEMO_SCHEDULE);
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [editingBlock, setEditingBlock] = useState<ScheduleBlock | null>(null);
  const [newLabel, setNewLabel] = useState('');
  const [newStart, setNewStart] = useState('');
  const [newEnd, setNewEnd] = useState('');
  const [newDays, setNewDays] = useState<string[]>([]);
  const [error, setError] = useState('');

  const getBlockForSlot = (day: string, startTime: string): ScheduleBlock | undefined => {
    return blocks.find(b => b.days.includes(day) && b.startTime === startTime);
  };

  const toggleDay = (day: string) => {
    setNewDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  };

  const handleAdd = () => {
    if (!newLabel.trim()) { setError('Name required'); return; }
    if (!newStart.trim() || !newEnd.trim()) { setError('Times required'); return; }
    if (newDays.length === 0) { setError('Select days'); return; }
    setBlocks(prev => [...prev, {
      id: `custom-${Date.now()}`,
      label: newLabel, startTime: newStart, endTime: newEnd, days: newDays,
    }]);
    resetForm();
  };

  const handleEdit = () => {
    if (!editingBlock || !newLabel.trim()) return;
    setBlocks(prev => prev.map(b => b.id === editingBlock.id
      ? { ...b, label: newLabel, startTime: newStart || b.startTime, endTime: newEnd || b.endTime, days: newDays.length ? newDays : b.days }
      : b
    ));
    resetForm();
  };

  const handleDelete = (id: string) => {
    setBlocks(prev => prev.filter(b => b.id !== id));
  };

  const startEdit = (block: ScheduleBlock) => {
    setEditingBlock(block);
    setNewLabel(block.label);
    setNewStart(block.startTime);
    setNewEnd(block.endTime);
    setNewDays([...block.days]);
    setAdding(true);
  };

  const resetForm = () => {
    setAdding(false);
    setEditingBlock(null);
    setNewLabel('');
    setNewStart('');
    setNewEnd('');
    setNewDays([]);
    setError('');
  };

  // Build unique start times for rows, sorted correctly
  const rowTimes = [...new Set(blocks.map(b => b.startTime))].sort((a, b) => toMinutes(a) - toMinutes(b));

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-stone-50 to-white text-stone-800">
      <div className="px-4 pt-10 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="p-1">
            <ChevronLeft className="w-5 h-5 text-stone-400" />
          </button>
          <h1 className="text-sm font-semibold text-stone-700">Weekly Schedule</h1>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => { setEditing(!editing); if (editing) resetForm(); }}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-medium border transition-colors ${
              editing ? 'bg-stone-800 text-white border-stone-800' : 'bg-white text-stone-500 border-stone-200 hover:border-stone-300'
            }`}
          >
            {editing ? 'Done' : 'Edit'}
          </button>
          {editing && (
            <button onClick={() => { setEditingBlock(null); setAdding(!adding); }} className="p-1.5 rounded-full bg-white border border-stone-200 hover:bg-stone-50">
              {adding ? <X className="w-3.5 h-3.5 text-stone-500" /> : <Plus className="w-3.5 h-3.5 text-stone-500" />}
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-4">
        {/* Add/Edit Form */}
        <AnimatePresence>
          {adding && (
            <motion.div
              className="mx-2 mb-3 rounded-2xl p-3 space-y-2 bg-white border border-stone-200"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <input value={newLabel} onChange={e => setNewLabel(e.target.value)} placeholder="Block name"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-[11px] text-stone-700 placeholder-stone-300 outline-none focus:ring-1 focus:ring-stone-400" />
              <div className="flex gap-2">
                <input value={newStart} onChange={e => setNewStart(e.target.value)} placeholder="Start (e.g. 9:00)"
                  className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-[11px] text-stone-700 placeholder-stone-300 outline-none focus:ring-1 focus:ring-stone-400" />
                <input value={newEnd} onChange={e => setNewEnd(e.target.value)} placeholder="End (e.g. 9:40)"
                  className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-[11px] text-stone-700 placeholder-stone-300 outline-none focus:ring-1 focus:ring-stone-400" />
              </div>
              <div className="flex gap-1.5">
                {DAYS.map(day => (
                  <button key={day} onClick={() => toggleDay(day)}
                    className={`px-2 py-0.5 rounded-lg text-[9px] font-medium border transition-colors ${
                      newDays.includes(day) ? 'bg-stone-800 text-white border-stone-800' : 'bg-white text-stone-400 border-stone-200'
                    }`}>{day}</button>
                ))}
              </div>
              {error && <p className="text-[9px] text-red-500">{error}</p>}
              <button onClick={editingBlock ? handleEdit : handleAdd}
                className="w-full h-7 bg-stone-800 text-white rounded-xl text-[10px] font-medium flex items-center justify-center gap-1 hover:bg-stone-700">
                <Check className="w-3 h-3" /> {editingBlock ? 'Save' : 'Add Block'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Weekly Grid Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[8px]">
            <thead>
              <tr>
                <th className="text-[8px] font-medium text-stone-400 px-1 py-1.5 text-left w-10 sticky left-0 bg-stone-50">Time</th>
                {DAYS.map(day => (
                  <th key={day} className="text-[8px] font-medium text-stone-500 px-0.5 py-1.5 text-center">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rowTimes.map((time) => (
                <tr key={time} className="border-t border-stone-100">
                  <td className="text-[7px] text-stone-400 px-1 py-1 align-top whitespace-nowrap sticky left-0 bg-stone-50/80">
                    {formatTime(time)}
                  </td>
                  {DAYS.map(day => {
                    const block = getBlockForSlot(day, time);
                    return (
                      <td key={day} className="px-0.5 py-0.5 align-top">
                        {block ? (
                          <div className="bg-white border border-stone-100 rounded-lg px-1 py-1 min-h-[24px] relative group">
                            <p className="text-[7px] font-medium text-stone-700 leading-tight">{block.label}</p>
                            <p className="text-[6px] text-stone-400">{formatTime(block.startTime)}–{formatTime(block.endTime)}</p>
                            {editing && (
                              <div className="flex gap-0.5 mt-0.5">
                                <button onClick={() => startEdit(block)} className="p-0.5 rounded bg-stone-50 hover:bg-stone-100">
                                  <Pencil className="w-2 h-2 text-stone-400" />
                                </button>
                                <button onClick={() => handleDelete(block.id)} className="p-0.5 rounded bg-red-50 hover:bg-red-100">
                                  <Trash2 className="w-2 h-2 text-red-400" />
                                </button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="min-h-[24px]" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
