export type StressState = 'unstressed' | 'stressed' | 'recovery';

export interface TimelineEvent {
  timeMs: number;
  stressState: StressState;
  phoneScreen?: PhoneScreen;
  courseIndex?: number;
}

export type PhoneScreen = 'onboarding' | 'dashboard' | 'survey' | 'report' | 'history' | 'schedule';

export interface Course {
  id: string;
  name: string;
  time: string;
  days: string[];
  room?: string;
}

export interface StressEvent {
  id: string;
  timestamp: Date;
  duration: number; // seconds
  peakHR: number;
  interventionType: string;
  dismissMethod: 'tapped' | 'auto' | 'timeout';
  courseId?: string;
}

export interface SurveyResponse {
  courseId: string;
  stressLevel: number;
  freeText: string;
  interventionHelpful: number;
  notes: string;
  timestamp: Date;
}
