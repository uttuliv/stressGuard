import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Send, Check } from 'lucide-react';

interface SurveyScreenProps {
  courseName: string;
  onComplete: () => void;
  onBack: () => void;
}

export function SurveyScreen({ courseName, onComplete, onBack }: SurveyScreenProps) {
  const [stressLevel, setStressLevel] = useState(3);
  const [freeText, setFreeText] = useState('');
  const [helpful, setHelpful] = useState(4);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(onComplete, 1500);
  };

  if (submitted) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-stone-50 text-stone-800">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4"
        >
          <Check className="w-6 h-6 text-emerald-600" />
        </motion.div>
        <p className="text-sm font-semibold text-stone-700">Thank you!</p>
        <p className="text-xs text-stone-400 mt-1">Response recorded</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-stone-50 to-white text-stone-800">
      <div className="px-4 pt-10 pb-2 flex items-center gap-2">
        <button onClick={onBack} className="p-1">
          <ChevronLeft className="w-5 h-5 text-stone-400" />
        </button>
        <div>
          <p className="text-[10px] text-stone-400 uppercase tracking-wide">Post-Session Survey</p>
          <p className="text-xs font-semibold text-stone-700">{courseName}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-5">
        {/* Stress Level */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <label className="text-[11px] font-semibold text-stone-500 block mb-2">
            How stressed were you? (1-5)
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(n => (
              <button
                key={n}
                onClick={() => setStressLevel(n)}
                className={`w-10 h-10 rounded-xl text-xs font-semibold transition-all border ${
                  stressLevel === n
                    ? 'bg-stone-800 text-white border-stone-800 scale-110'
                    : 'bg-white text-stone-400 border-stone-200 hover:border-stone-300'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[9px] text-stone-400">Calm</span>
            <span className="text-[9px] text-stone-400">Very Stressed</span>
          </div>
        </motion.div>

        {/* Free text */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <label className="text-[11px] font-semibold text-stone-500 block mb-2">
            What caused your stress?
          </label>
          <textarea
            value={freeText}
            onChange={e => setFreeText(e.target.value)}
            placeholder="e.g. Difficult quiz, time pressure..."
            className="w-full bg-white border border-stone-200 rounded-xl p-3 text-xs text-stone-700 placeholder-stone-300 resize-none h-16 outline-none focus:ring-1 focus:ring-stone-400 focus:border-stone-400"
          />
        </motion.div>

        {/* Intervention helpfulness */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <label className="text-[11px] font-semibold text-stone-500 block mb-2">
            Were the interventions helpful? (1-5)
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(n => (
              <button
                key={n}
                onClick={() => setHelpful(n)}
                className={`w-10 h-10 rounded-xl text-xs font-semibold transition-all border ${
                  helpful === n
                    ? 'bg-stone-800 text-white border-stone-800 scale-110'
                    : 'bg-white text-stone-400 border-stone-200 hover:border-stone-300'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[9px] text-stone-400">Not at all</span>
            <span className="text-[9px] text-stone-400">Very helpful</span>
          </div>
        </motion.div>

        {/* Notes */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <label className="text-[11px] font-semibold text-stone-500 block mb-2">
            Additional notes (optional)
          </label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Any other feedback..."
            className="w-full bg-white border border-stone-200 rounded-xl p-3 text-xs text-stone-700 placeholder-stone-300 resize-none h-14 outline-none focus:ring-1 focus:ring-stone-400 focus:border-stone-400"
          />
        </motion.div>

        <motion.button
          onClick={handleSubmit}
          className="w-full h-11 bg-stone-800 text-white rounded-2xl text-xs font-medium flex items-center justify-center gap-2 hover:bg-stone-700"
          whileTap={{ scale: 0.97 }}
        >
          <Send className="w-3.5 h-3.5" /> Submit Feedback
        </motion.button>
      </div>
    </div>
  );
}
