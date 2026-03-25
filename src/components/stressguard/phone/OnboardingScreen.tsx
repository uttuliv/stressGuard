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
    <div className="h-full flex flex-col bg-gradient-to-b from-black to-neutral-900 text-white p-5">
      {step === 0 && (
        <motion.div
          className="flex-1 flex flex-col items-center justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-xl font-bold text-center">StressGuard</h1>
          <p className="text-sm text-neutral-400 text-center leading-relaxed">
            Your personal stress companion for academic success
          </p>
          <Button
            onClick={() => setStep(1)}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white border-0 rounded-xl h-12 font-semibold"
          >
            Get Started
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </motion.div>
      )}

      {step === 1 && (
        <motion.div
          className="flex-1 flex flex-col gap-5"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-3 mt-4">
            <Lock className="w-6 h-6 text-green-400" />
            <h2 className="text-lg font-bold">Privacy First</h2>
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
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5 shrink-0">
                  <span className="text-green-400 text-xs">✓</span>
                </div>
                <p className="text-sm text-neutral-300">{item}</p>
              </motion.div>
            ))}
          </div>

          <Button
            onClick={onComplete}
            className="w-full bg-white text-black rounded-xl h-12 font-semibold hover:bg-neutral-200"
          >
            I Understand — Continue
          </Button>
        </motion.div>
      )}
    </div>
  );
}
