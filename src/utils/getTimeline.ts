import { FlightType } from "../types";
import { DAY_LENGTH, IDLE_STATUS, SCHEDULED_STATUS, TURNAROUND_STATUS, TURNAROUND_TIME } from "./constants";

const getPercent = (time: number): number => Number((time * 100 / DAY_LENGTH).toFixed(2));

const getTimeline = (items: FlightType[]): Array<[string, number, FlightType]> => {
  if (items.length === 0) {
    return [[IDLE_STATUS, 100,
      {
        ident: '',
        origin: '',
        destination: '',
        arrivaltime: 0,
        departuretime: 0,
        readable_departure: '',
        readable_arrival: '',
      }]];
  }

  const timeline: Array<[string, number, FlightType]> = [];
  for (let i = 0; i < items.length; i++) {
    const current = items[i];
    const { departuretime, arrivaltime } = current;
    const scheduledValue: [string, number, FlightType] = [SCHEDULED_STATUS, getPercent(arrivaltime - departuretime), current];
    const idleBefore = (i === 0 ? getPercent(departuretime) : false);
    const idleAfter = (i === items.length - 1
      ? getPercent(DAY_LENGTH - arrivaltime)
      : getPercent(items[i + 1].departuretime - arrivaltime - TURNAROUND_TIME));

    if (idleBefore) {
      timeline.push([IDLE_STATUS, idleBefore, {
        ident: '',
        origin: '',
        destination: '',
        arrivaltime: 0,
        departuretime: 0,
        readable_departure: '',
        readable_arrival: '',
      }]);
    }
    timeline.push(scheduledValue);
    if (i !== items.length - 1) {
      timeline.push([TURNAROUND_STATUS, getPercent(TURNAROUND_TIME), {
        ident: '',
        origin: '',
        destination: '',
        arrivaltime: 0,
        departuretime: 0,
        readable_departure: '',
        readable_arrival: '',
      }]);
    }
    if (idleAfter) {
      timeline.push([IDLE_STATUS, idleAfter, {
        ident: '',
        origin: '',
        destination: '',
        arrivaltime: 0,
        departuretime: 0,
        readable_departure: '',
        readable_arrival: '',
      }]);
    }
  }

  return timeline;
};

export default getTimeline;
