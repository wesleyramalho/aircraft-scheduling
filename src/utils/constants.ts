export const TURNAROUND_STATUS = 'turnaround';
export const SCHEDULED_STATUS = 'scheduled';
export const IDLE_STATUS = 'idle';

export type FlightStatus = typeof TURNAROUND_STATUS | typeof SCHEDULED_STATUS | typeof IDLE_STATUS;

export const DAY_LENGTH = 86400; // 24 hours in seconds
export const TURNAROUND_TIME = 20 * 60; // 20 minutes in seconds

export const BASE_URL = 'https://recruiting-assessment.alphasights.com/api';

