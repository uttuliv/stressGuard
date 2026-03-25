import { TimelineEvent, Course, StressEvent } from '@/types/stressguard';

export const DEMO_COURSES: Course[] = [
  { id: 'cs101', name: 'CS 101 – Intro to Programming', time: '9:00 AM', days: ['Mon', 'Wed', 'Fri'], room: 'Room 204' },
  { id: 'math201', name: 'MATH 201 – Linear Algebra', time: '11:00 AM', days: ['Tue', 'Thu'], room: 'Room 112' },
  { id: 'phys150', name: 'PHYS 150 – Mechanics', time: '2:00 PM', days: ['Mon', 'Wed'], room: 'Lab 3B' },
  { id: 'eng102', name: 'ENG 102 – Academic Writing', time: '4:00 PM', days: ['Tue', 'Thu'], room: 'Room 308' },
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
    timestamp: new Date(2026, 2, 25, 9, 22),
    duration: 15,
    peakHR: 94,
    interventionType: 'Deep Breathing',
    dismissMethod: 'tapped',
    courseId: 'cs101',
  },
  {
    id: 'se2',
    timestamp: new Date(2026, 2, 25, 9, 45),
    duration: 12,
    peakHR: 91,
    interventionType: 'Deep Breathing',
    dismissMethod: 'auto',
    courseId: 'cs101',
  },
  {
    id: 'se3',
    timestamp: new Date(2026, 2, 24, 11, 15),
    duration: 18,
    peakHR: 96,
    interventionType: 'Box Breathing',
    dismissMethod: 'tapped',
    courseId: 'math201',
  },
  {
    id: 'se4',
    timestamp: new Date(2026, 2, 24, 14, 30),
    duration: 10,
    peakHR: 89,
    interventionType: 'Deep Breathing',
    dismissMethod: 'timeout',
    courseId: 'phys150',
  },
  {
    id: 'se5',
    timestamp: new Date(2026, 2, 23, 9, 10),
    duration: 20,
    peakHR: 98,
    interventionType: 'Grounding Exercise',
    dismissMethod: 'tapped',
    courseId: 'cs101',
  },
];

export const WEEKLY_REPORT_DATA = [
  { day: 'Mon', events: 3, avgHR: 88, courses: ['CS 101', 'PHYS 150'] },
  { day: 'Tue', events: 2, avgHR: 85, courses: ['MATH 201', 'ENG 102'] },
  { day: 'Wed', events: 4, avgHR: 92, courses: ['CS 101', 'PHYS 150'] },
  { day: 'Thu', events: 1, avgHR: 82, courses: ['MATH 201', 'ENG 102'] },
  { day: 'Fri', events: 2, avgHR: 86, courses: ['CS 101'] },
  { day: 'Sat', events: 0, avgHR: 72, courses: [] },
  { day: 'Sun', events: 0, avgHR: 70, courses: [] },
];

export const TREND_DATA = [
  { week: 'Week 1', events: 14, avgStress: 3.8 },
  { week: 'Week 2', events: 11, avgStress: 3.2 },
  { week: 'Week 3', events: 8, avgStress: 2.7 },
  { week: 'Week 4', events: 6, avgStress: 2.1 },
];
