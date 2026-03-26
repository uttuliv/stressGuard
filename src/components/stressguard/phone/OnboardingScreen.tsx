import { useState } from 'react';
import { Shield, Lock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [step, setStep] = useState(0);

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-stone-100 via-orange-50/40 to-stone-200 text-foreground p-5">
      {step === 0 && (
        <motion.div
          className="flex-1 flex flex-col items-center justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Breathing circle */}
          <div className="relative w-40 h-40 mb-2 flex items-center justify-center">
            <motion.div
              className="absolute rounded-full border border-orange-300/40"
              animate={{ width: [60, 160, 60], height: [60, 160, 60] }}
              transition={{ duration: 5, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
            />
            <motion.div
              className="absolute rounded-full border border-orange-400/50"
              animate={{ width: [50, 120, 50], height: [50, 120, 50] }}
              transition={{ duration: 5, repeat: Infinity, ease: [0.45, 0, 0.55, 1], delay: 0.15 }}
            />
            <motion.div
              className="absolute rounded-full border border-orange-500/60"
              animate={{ width: [40, 80, 40], height: [40, 80, 40] }}
              transition={{ duration: 5, repeat: Infinity, ease: [0.45, 0, 0.55, 1], delay: 0.3 }}
            />
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-lg font-semibold tracking-tight text-stone-800">
              Track and measure your<br />stress levels with ease
            </h1>
            <p className="text-xs text-stone-500 leading-relaxed">
              Helping teachers recognize stress before it shapes the classroom.
            </p>
          </div>

          <Button
            onClick={() => setStep(1)}
            className="w-full bg-stone-800 text-white border-0 rounded-2xl h-11 text-xs font-medium hover:bg-stone-700"
          >
            Get Started
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </motion.div>
      )}

      {step === 1 && (
        <motion.div
          className="flex-1 flex flex-col gap-5"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-3 mt-8">
            <div className="w-8 h-8 rounded-xl bg-stone-800 flex items-center justify-center">
              <Lock className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-base font-semibold text-stone-800">Privacy First</h2>
          </div>

          <div className="space-y-4 flex-1">
            {[
              'All biometric data stays on your devices',
              'Your university only sees anonymized, aggregated reports',
              'No individual stress data is ever shared',
              'You control what data is collected',
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <div className="w-5 h-5 rounded-full bg-stone-800 flex items-center justify-center mt-0.5 shrink-0">
                  <span className="text-white text-[10px] font-bold">{i + 1}</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>

          <Button
            onClick={onComplete}
            className="w-full bg-stone-800 text-white rounded-2xl h-11 text-xs font-medium hover:bg-stone-700"
          >
            I Understand — Continue
          </Button>
        </motion.div>
      )}
    </div>
  );
}
