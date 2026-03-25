import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Send } from 'lucide-react';

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
      <div className="h-full flex flex-col items-center justify-center bg-black text-white">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4"
        >
          <span className="text-3xl">✓</span>
        </motion.div>
        <p className="text-sm font-semibold">Thank you!</p>
        <p className="text-xs text-neutral-400 mt-1">Response recorded</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-black text-white">
      <div className="px-4 pt-3 pb-2 flex items-center gap-2">
        <button onClick={onBack} className="p-1">
          <ChevronLeft className="w-5 h-5 text-blue-400" />
        </button>
        <div>
          <p className="text-xs text-neutral-500">Post-Session Survey</p>
          <p className="text-sm font-semibold">{courseName}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-5">
        {/* Stress Level */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <label className="text-xs font-semibold text-neutral-300 block mb-2">
            How stressed were you? (1–5)
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(n => (
              <button
                key={n}
                onClick={() => setStressLevel(n)}
                className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                  stressLevel === n
                    ? 'bg-orange-500 text-white scale-110'
                    : 'bg-neutral-800 text-neutral-400'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[9px] text-neutral-600">Calm</span>
            <span className="text-[9px] text-neutral-600">Very Stressed</span>
          </div>
        </motion.div>

        {/* Free text */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <label className="text-xs font-semibold text-neutral-300 block mb-2">
            What caused your stress?
          </label>
          <textarea
            value={freeText}
            onChange={e => setFreeText(e.target.value)}
            placeholder="e.g. Difficult quiz, time pressure..."
            className="w-full bg-neutral-800 rounded-xl p-3 text-xs text-white placeholder-neutral-600 resize-none h-16 outline-none focus:ring-1 focus:ring-blue-500"
          />
        </motion.div>

        {/* Intervention helpfulness */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <label className="text-xs font-semibold text-neutral-300 block mb-2">
            Were the interventions helpful? (1–5)
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(n => (
              <button
                key={n}
                onClick={() => setHelpful(n)}
                className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                  helpful === n
                    ? 'bg-blue-500 text-white scale-110'
                    : 'bg-neutral-800 text-neutral-400'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[9px] text-neutral-600">Not at all</span>
            <span className="text-[9px] text-neutral-600">Very helpful</span>
          </div>
        </motion.div>

        {/* Notes */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <label className="text-xs font-semibold text-neutral-300 block mb-2">
            Additional notes (optional)
          </label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Any other feedback..."
            className="w-full bg-neutral-800 rounded-xl p-3 text-xs text-white placeholder-neutral-600 resize-none h-14 outline-none focus:ring-1 focus:ring-blue-500"
          />
        </motion.div>

        <motion.button
          onClick={handleSubmit}
          className="w-full h-11 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
          whileTap={{ scale: 0.97 }}
        >
          <Send className="w-4 h-4" /> Submit Feedback
        </motion.button>
      </div>
    </div>
  );
}
