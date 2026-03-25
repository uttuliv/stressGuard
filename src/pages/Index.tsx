import { useDemoController } from '@/hooks/use-demo-controller';
import { WatchSimulator } from '@/components/stressguard/WatchSimulator';
import { PhoneSimulator } from '@/components/stressguard/PhoneSimulator';
import { ControlBar } from '@/components/stressguard/ControlBar';

const Index = () => {
  const demo = useDemoController();

  const handleTapIntervention = () => {
    demo.setStressState('recovery');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ControlBar
        isPlaying={demo.isPlaying}
        elapsed={demo.elapsed}
        totalDuration={demo.totalDuration}
        onPlay={demo.play}
        onPause={demo.pause}
        onReset={demo.reset}
        onGoToScreen={demo.goToScreen}
        currentScreen={demo.phoneScreen}
      />

      <div className="flex-1 flex items-center justify-center gap-16 p-8">
        <PhoneSimulator
          screen={demo.phoneScreen}
          stressState={demo.stressState}
          activeCourseIndex={demo.activeCourseIndex}
          onNavigate={demo.goToScreen}
          onStartSession={(i) => demo.setActiveCourseIndex(i)}
          onEndSession={() => {
            demo.setActiveCourseIndex(null);
            demo.goToScreen('survey');
          }}
        />

        <WatchSimulator
          stressState={demo.stressState}
          heartRate={demo.heartRate}
          onTapIntervention={handleTapIntervention}
        />
      </div>
    </div>
  );
};

export default Index;
