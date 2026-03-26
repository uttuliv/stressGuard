import { useState, useEffect, useCallback, useRef } from 'react';
import { StressState, PhoneScreen } from '@/types/stressguard';
import { DEMO_TIMELINE } from '@/data/demo-timeline';

const TOTAL_DURATION = 180000; // 3 minutes

export function useDemoController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [stressState, setStressState] = useState<StressState>('unstressed');
  const [phoneScreen, setPhoneScreen] = useState<PhoneScreen>('onboarding');
  const [activeCourseIndex, setActiveCourseIndex] = useState<number | null>(null);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
  const [heartRate, setHeartRate] = useState(68);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);

  const getHRRange = (state: StressState): [number, number] => {
    switch (state) {
      case 'unstressed': return [65, 75];
      case 'stressed': return [88, 98];
      case 'recovery': return [76, 85];
    }
  };

  const updateState = useCallback((currentElapsed: number) => {
    const loopedTime = currentElapsed % TOTAL_DURATION;

    let currentEvent = DEMO_TIMELINE[0];
    for (const event of DEMO_TIMELINE) {
      if (event.timeMs <= loopedTime) {
        currentEvent = event;
      } else {
        break;
      }
    }

    setStressState(currentEvent.stressState);
    if (currentEvent.phoneScreen) setPhoneScreen(currentEvent.phoneScreen);
    if (currentEvent.courseIndex !== undefined) setActiveCourseIndex(currentEvent.courseIndex);

    // Drift HR within range
    const [min, max] = getHRRange(currentEvent.stressState);
    setHeartRate(prev => {
      const drift = (Math.random() - 0.5) * 4;
      return Math.round(Math.min(max, Math.max(min, prev + drift)));
    });
  }, []);

  useEffect(() => {
    if (isPlaying) {
      startTimeRef.current = Date.now() - elapsed;
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const newElapsed = now - startTimeRef.current;
        setElapsed(newElapsed);
        updateState(newElapsed);
      }, 500);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, updateState]);

  const play = useCallback(() => setIsPlaying(true), []);
  const pause = useCallback(() => setIsPlaying(false), []);
  const reset = useCallback(() => {
    setIsPlaying(false);
    setElapsed(0);
    setStressState('unstressed');
    setPhoneScreen('onboarding');
    setActiveCourseIndex(null);
    setActiveBlockId(null);
    setHeartRate(68);
  }, []);

  const goToScreen = useCallback((screen: PhoneScreen) => {
    setPhoneScreen(screen);
  }, []);

  return {
    isPlaying,
    elapsed,
    stressState,
    phoneScreen,
    activeCourseIndex,
    activeBlockId,
    heartRate,
    play,
    pause,
    reset,
    setStressState,
    goToScreen,
    setActiveCourseIndex,
    setActiveBlockId,
    totalDuration: TOTAL_DURATION,
  };
}
