import { TimelineEvent, Course, StressEvent } from '@/types/stressguard';

export interface ScheduleBlock {
  id: string;
  label: string;
  startTime: string;
  endTime: string;
  days: string[];
}

export const DEMO_COURSES: Course[] = [
  { id: 'math', name: 'Math', time: '10:55 AM', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
  { id: 'french', name: 'French', time: '11:50 AM', days: ['Tue', 'Thu'] },
  { id: 'art', name: 'Art', time: '11:50 AM', days: ['Mon', 'Fri'] },
  { id: 'science', name: 'Socials / Science', time: '1:35 PM', days: ['Mon', 'Wed'] },
];

export const DEMO_SCHEDULE: ScheduleBlock[] = [
  // 8:50–9:20
  { id: 's1', label: 'Gym', startTime: '8:50', endTime: '9:20', days: ['Mon', 'Tue'] },
  { id: 's2', label: 'Morning Check-in', startTime: '8:50', endTime: '9:20', days: ['Wed'] },
  { id: 's3', label: 'Music', startTime: '8:55', endTime: '9:35', days: ['Thu'] },
  { id: 's4', label: 'Morning Meeting', startTime: '8:50', endTime: '9:20', days: ['Fri'] },
  // 9:20–9:40
  { id: 's5', label: 'Journal – Weekend Reflection', startTime: '9:20', endTime: '9:40', days: ['Mon'] },
  { id: 's6', label: 'Mindfulness SEL – Morning Check-in', startTime: '9:20', endTime: '9:40', days: ['Tue'] },
  { id: 's7', label: 'Current Events', startTime: '9:20', endTime: '9:40', days: ['Wed'] },
  { id: 's8', label: 'Literacy Circle', startTime: '9:20', endTime: '9:40', days: ['Fri'] },
  // 9:40–10:25
  { id: 's9', label: 'Music', startTime: '9:40', endTime: '10:25', days: ['Mon'] },
  { id: 's10', label: 'Library', startTime: '9:45', endTime: '10:25', days: ['Tue'] },
  { id: 's11', label: 'Canadian Reader Socials', startTime: '9:40', endTime: '10:25', days: ['Wed'] },
  { id: 's12', label: 'Morning Meeting', startTime: '9:40', endTime: '10:25', days: ['Thu'] },
  { id: 's13', label: 'Mindfulness SEL', startTime: '9:40', endTime: '10:25', days: ['Fri'] },
  // 10:25–10:55
  { id: 's14', label: 'Recess', startTime: '10:25', endTime: '10:55', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
  // 10:55–11:40
  { id: 's15', label: 'Math', startTime: '10:55', endTime: '11:40', days: ['Mon', 'Tue', 'Wed', 'Thu'] },
  { id: 's16', label: 'Math Games', startTime: '10:55', endTime: '11:40', days: ['Fri'] },
  // 11:40–11:50
  { id: 's17', label: 'Brain Break', startTime: '11:40', endTime: '11:50', days: ['Mon', 'Tue', 'Wed', 'Thu'] },
  { id: 's18', label: 'Art', startTime: '11:40', endTime: '11:50', days: ['Fri'] },
  // 11:50–12:35
  { id: 's19', label: 'Art (ESL Kyryrl)', startTime: '11:50', endTime: '12:35', days: ['Mon'] },
  { id: 's20', label: 'French', startTime: '11:50', endTime: '12:35', days: ['Tue', 'Thu', 'Fri'] },
  { id: 's21', label: 'Health', startTime: '11:50', endTime: '12:35', days: ['Wed'] },
  // 12:35–1:15
  { id: 's22', label: 'Lunch', startTime: '12:35', endTime: '1:15', days: ['Mon', 'Wed', 'Thu', 'Fri'] },
  { id: 's23', label: 'Lunch Supervision', startTime: '12:35', endTime: '1:15', days: ['Tue'] },
  // 1:15–1:35
  { id: 's24', label: 'Silent Reading', startTime: '1:15', endTime: '1:35', days: ['Mon', 'Wed', 'Thu', 'Fri'] },
  { id: 's25', label: 'Literacy Circles', startTime: '1:15', endTime: '1:35', days: ['Tue'] },
  // 1:35–2:10
  { id: 's26', label: 'Socials / Science', startTime: '1:35', endTime: '2:10', days: ['Mon'] },
  { id: 's27', label: 'Science Nature Area Journaling', startTime: '1:35', endTime: '2:10', days: ['Wed'] },
  { id: 's28', label: 'Flex', startTime: '1:35', endTime: '2:10', days: ['Thu'] },
  { id: 's29', label: 'Art', startTime: '1:35', endTime: '2:10', days: ['Fri'] },
  // 2:10–2:53
  { id: 's30', label: 'Gym', startTime: '2:10', endTime: '2:53', days: ['Tue', 'Thu'] },
  { id: 's31', label: 'Flex', startTime: '2:10', endTime: '2:53', days: ['Fri'] },
];

// 3-minute compressed demo timeline (180,000 ms)
export const DEMO_TIMELINE: TimelineEvent[] = [
  // Start: onboarding
  { timeMs: 0, stressState: 'unstressed', phoneScreen: 'onboarding' },
  // Move to dashboard
  { timeMs: 10000, stressState: 'unstressed', phoneScreen: 'dashboard' },
  // Start CS101 session
  { timeMs: 20000, stressState: 'unstressed', phoneScreen: 'dashboard', courseIndex: 0 },
  // First stress event during class
  { timeMs: 35000, stressState: 'stressed', phoneScreen: 'dashboard' },
  // Recovery after intervention
  { timeMs: 50000, stressState: 'recovery', phoneScreen: 'dashboard' },
  // Back to normal
  { timeMs: 60000, stressState: 'unstressed', phoneScreen: 'dashboard' },
  // Second stress event
  { timeMs: 80000, stressState: 'stressed', phoneScreen: 'dashboard' },
  // Recovery
  { timeMs: 95000, stressState: 'recovery', phoneScreen: 'dashboard' },
  // Session ends, survey
  { timeMs: 105000, stressState: 'unstressed', phoneScreen: 'survey' },
  // Show weekly report
  { timeMs: 125000, stressState: 'unstressed', phoneScreen: 'report' },
  // Show history
  { timeMs: 145000, stressState: 'unstressed', phoneScreen: 'history' },
  // Show schedule
  { timeMs: 160000, stressState: 'unstressed', phoneScreen: 'schedule' },
  // Back to dashboard, loop
  { timeMs: 175000, stressState: 'unstressed', phoneScreen: 'dashboard' },
];

export const DEMO_STRESS_EVENTS: StressEvent[] = [
  {
    id: 'se1',
    timestamp: new Date(2026, 2, 25, 10, 58),
    duration: 15,
    peakHR: 94,
    interventionType: 'Deep Breathing',
    dismissMethod: 'tapped',
    courseId: 'math',
  },
  {
    id: 'se2',
    timestamp: new Date(2026, 2, 25, 11, 20),
    duration: 12,
    peakHR: 91,
    interventionType: 'Deep Breathing',
    dismissMethod: 'auto',
    courseId: 'math',
  },
  {
    id: 'se3',
    timestamp: new Date(2026, 2, 24, 12, 5),
    duration: 18,
    peakHR: 96,
    interventionType: 'Box Breathing',
    dismissMethod: 'tapped',
    courseId: 'french',
  },
  {
    id: 'se4',
    timestamp: new Date(2026, 2, 24, 1, 45),
    duration: 10,
    peakHR: 89,
    interventionType: 'Deep Breathing',
    dismissMethod: 'timeout',
    courseId: 'science',
  },
  {
    id: 'se5',
    timestamp: new Date(2026, 2, 23, 11, 55),
    duration: 20,
    peakHR: 98,
    interventionType: 'Grounding Exercise',
    dismissMethod: 'tapped',
    courseId: 'art',
  },
];

export const WEEKLY_REPORT_DATA = [
  { day: 'Mon', events: 3, avgHR: 88, courses: ['Math', 'Art'] },
  { day: 'Tue', events: 2, avgHR: 85, courses: ['Math', 'French'] },
  { day: 'Wed', events: 4, avgHR: 92, courses: ['Math', 'Science'] },
  { day: 'Thu', events: 1, avgHR: 82, courses: ['Math', 'French'] },
  { day: 'Fri', events: 2, avgHR: 86, courses: ['Math', 'Art'] },
  { day: 'Sat', events: 0, avgHR: 72, courses: [] },
  { day: 'Sun', events: 0, avgHR: 70, courses: [] },
];

export const TREND_DATA = [
  { week: 'Week 1', events: 14, avgStress: 3.8 },
  { week: 'Week 2', events: 11, avgStress: 3.2 },
  { week: 'Week 3', events: 8, avgStress: 2.7 },
  { week: 'Week 4', events: 6, avgStress: 2.1 },
];
