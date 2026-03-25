import { motion } from 'framer-motion';
import { StressState } from '@/types/stressguard';
import { Heart } from 'lucide-react';

interface WatchSimulatorProps {
  stressState: StressState;
  heartRate: number;
  onTapIntervention?: () => void;
}

const stateConfig = {
  unstressed: {
    color: 'hsl(142, 71%, 45%)',
    label: 'All Good',
    sublabel: 'No stress detected',
    icon: '✓',
  },
  stressed: {
    color: 'hsl(38, 92%, 50%)',
    label: 'Stress Detected',
    sublabel: 'Take 5 deep breaths',
    icon: '⚠',
  },
  recovery: {
    color: 'hsl(210, 100%, 52%)',
    label: 'Well Done',
    sublabel: 'Recovering nicely',
    icon: '♡',
  },
};

export function WatchSimulator({ stressState, heartRate, onTapIntervention }: WatchSimulatorProps) {
  const config = stateConfig[stressState];
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const progress = stressState === 'unstressed' ? 1 : stressState === 'recovery' ? 0.7 : 0.4;

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Apple Watch</p>

      {/* Watch Frame */}
      <div className="relative">
        {/* Outer case */}
        <div className="w-[220px] h-[268px] rounded-[44px] bg-gradient-to-b from-neutral-700 to-neutral-800 p-[3px] shadow-2xl">
          {/* Inner bezel */}
          <div className="w-full h-full rounded-[42px] bg-gradient-to-b from-neutral-800 to-neutral-900 p-[2px]">
            {/* Screen */}
            <div
              className="w-full h-full rounded-[40px] flex flex-col items-center justify-center relative overflow-hidden cursor-pointer"
              style={{ backgroundColor: '#000' }}
              onClick={stressState === 'stressed' ? onTapIntervention : undefined}
            >
              {/* Stress Ring */}
              <svg width="170" height="170" className="absolute inset-0 m-auto">
                {/* Background ring */}
                <circle
                  cx="85"
                  cy="85"
                  r={radius}
                  fill="none"
                  stroke="hsl(0, 0%, 20%)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {/* Animated ring */}
                <motion.circle
                  cx="85"
                  cy="85"
                  r={radius}
                  fill="none"
                  stroke={config.color}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - progress)}
                  transform="rotate(-90 85 85)"
                  initial={false}
                  animate={{
                    strokeDashoffset: circumference * (1 - progress),
                    stroke: config.color,
                    scale: stressState === 'stressed' ? [1, 1.03, 1] : 1,
                  }}
                  transition={{
                    strokeDashoffset: { duration: 1, ease: 'easeInOut' },
                    stroke: { duration: 0.5 },
                    scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                  }}
                />
              </svg>

              {/* Center content */}
              <div className="relative z-10 flex flex-col items-center gap-1">
                <motion.span
                  className="text-2xl"
                  animate={{ scale: stressState === 'stressed' ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {config.icon}
                </motion.span>
                <motion.p
                  className="text-sm font-semibold"
                  style={{ color: config.color }}
                  animate={{ color: config.color }}
                >
                  {config.label}
                </motion.p>
                <p className="text-[10px] text-neutral-400 text-center px-4">
                  {config.sublabel}
                </p>

                {/* Heart Rate */}
                <div className="flex items-center gap-1 mt-2">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    <Heart className="w-3 h-3" style={{ color: '#ff3b30', fill: '#ff3b30' }} />
                  </motion.div>
                  <span className="text-sm font-mono font-bold text-white">{heartRate}</span>
                  <span className="text-[9px] text-neutral-500">BPM</span>
                </div>
              </div>

              {/* Tap hint for stress state */}
              {stressState === 'stressed' && (
                <motion.p
                  className="absolute bottom-4 text-[9px] text-neutral-500"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Tap to dismiss
                </motion.p>
              )}
            </div>
          </div>
        </div>
        {/* Digital Crown */}
        <div className="absolute right-[-6px] top-[72px] w-[6px] h-[28px] rounded-r-sm bg-neutral-600" />
        {/* Side Button */}
        <div className="absolute right-[-5px] top-[112px] w-[5px] h-[16px] rounded-r-sm bg-neutral-600" />
      </div>
    </div>
  );
}
