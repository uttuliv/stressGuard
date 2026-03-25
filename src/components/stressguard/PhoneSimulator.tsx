import { PhoneScreen, StressState } from '@/types/stressguard';
import { OnboardingScreen } from './phone/OnboardingScreen';
import { DashboardScreen } from './phone/DashboardScreen';
import { SurveyScreen } from './phone/SurveyScreen';
import { WeeklyReportScreen } from './phone/WeeklyReportScreen';
import { HistoryScreen } from './phone/HistoryScreen';
import { ScheduleScreen } from './phone/ScheduleScreen';
import { DEMO_COURSES } from '@/data/demo-timeline';

interface PhoneSimulatorProps {
  screen: PhoneScreen;
  stressState: StressState;
  activeCourseIndex: number | null;
  onNavigate: (screen: PhoneScreen) => void;
  onStartSession: (index: number) => void;
  onEndSession: () => void;
}

export function PhoneSimulator({
  screen,
  stressState,
  activeCourseIndex,
  onNavigate,
  onStartSession,
  onEndSession,
}: PhoneSimulatorProps) {
  const renderScreen = () => {
    switch (screen) {
      case 'onboarding':
        return <OnboardingScreen onComplete={() => onNavigate('dashboard')} />;
      case 'dashboard':
        return (
          <DashboardScreen
            activeCourseIndex={activeCourseIndex}
            stressState={stressState}
            onStartSession={onStartSession}
            onEndSession={onEndSession}
            onNavigate={(s) => onNavigate(s as PhoneScreen)}
          />
        );
      case 'survey':
        return (
          <SurveyScreen
            courseName={activeCourseIndex !== null ? DEMO_COURSES[activeCourseIndex].name : 'Session'}
            onComplete={() => onNavigate('dashboard')}
            onBack={() => onNavigate('dashboard')}
          />
        );
      case 'report':
        return <WeeklyReportScreen onBack={() => onNavigate('dashboard')} />;
      case 'history':
        return <HistoryScreen onBack={() => onNavigate('dashboard')} />;
      case 'schedule':
        return <ScheduleScreen onBack={() => onNavigate('dashboard')} />;
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">iPhone</p>

      {/* Phone Frame */}
      <div className="relative">
        {/* Outer case */}
        <div className="w-[280px] h-[570px] rounded-[40px] bg-gradient-to-b from-stone-300 to-stone-400 p-[3px] shadow-2xl">
          {/* Inner bezel */}
          <div className="w-full h-full rounded-[38px] bg-gradient-to-b from-stone-200 to-stone-300 p-[2px]">
            {/* Screen */}
            <div className="w-full h-full rounded-[36px] overflow-hidden relative">
              {/* Dynamic Island */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[90px] h-[24px] bg-stone-900 rounded-full z-20" />
              {/* Home indicator */}
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[100px] h-[4px] bg-stone-400/40 rounded-full z-20" />

              {/* Screen content */}
              <div className="w-full h-full">
                {renderScreen()}
              </div>
            </div>
          </div>
        </div>
        {/* Side buttons */}
        <div className="absolute left-[-3px] top-[100px] w-[3px] h-[28px] rounded-l-sm bg-stone-400" />
        <div className="absolute left-[-3px] top-[145px] w-[3px] h-[50px] rounded-l-sm bg-stone-400" />
        <div className="absolute left-[-3px] top-[200px] w-[3px] h-[50px] rounded-l-sm bg-stone-400" />
        <div className="absolute right-[-3px] top-[155px] w-[3px] h-[60px] rounded-l-sm bg-stone-400" />
      </div>
    </div>
  );
}
