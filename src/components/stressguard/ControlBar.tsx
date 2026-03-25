import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PhoneScreen } from '@/types/stressguard';

interface ControlBarProps {
  isPlaying: boolean;
  elapsed: number;
  totalDuration: number;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onGoToScreen: (screen: PhoneScreen) => void;
  currentScreen: PhoneScreen;
}

const SCREENS: { key: PhoneScreen; label: string }[] = [
  { key: 'onboarding', label: 'Onboarding' },
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'survey', label: 'Survey' },
  { key: 'report', label: 'Report' },
  { key: 'history', label: 'History' },
  { key: 'schedule', label: 'Schedule' },
];

export function ControlBar({
  isPlaying,
  elapsed,
  totalDuration,
  onPlay,
  onPause,
  onReset,
  onGoToScreen,
  currentScreen,
}: ControlBarProps) {
  const progress = (elapsed % totalDuration) / totalDuration;
  const minutes = Math.floor((elapsed % totalDuration) / 60000);
  const seconds = Math.floor(((elapsed % totalDuration) % 60000) / 1000);

  return (
    <div className="w-full bg-card/80 backdrop-blur-sm border-b border-border px-6 py-3">
      <div className="max-w-5xl mx-auto flex items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">SG</span>
          </div>
          <span className="text-sm font-bold text-foreground">StressGuard</span>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            onClick={isPlaying ? onPause : onPlay}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={onReset}>
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
          <span className="text-xs font-mono text-muted-foreground w-12">
            {minutes}:{seconds.toString().padStart(2, '0')}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {/* Screen Nav */}
        <div className="flex gap-1 shrink-0">
          {SCREENS.map(s => (
            <button
              key={s.key}
              onClick={() => onGoToScreen(s.key)}
              className={`px-2 py-1 rounded-md text-[10px] font-medium transition-colors ${
                currentScreen === s.key
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
