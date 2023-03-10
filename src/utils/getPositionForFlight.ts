import { FlightType } from "../types";
import { DAY_LENGTH, TURNAROUND_TIME } from "./constants";

export const canAccommodateTurnaround = (start: number, end: number): boolean => end - start >= TURNAROUND_TIME;

export const canPrependFlight = (flight: FlightType, prevFlight: FlightType): boolean => {
  return flight.origin === prevFlight.destination &&
    canAccommodateTurnaround(prevFlight.arrivaltime, flight.departuretime);
};

export const canAppendFlight = (flight: FlightType, nextFlight: FlightType): boolean => {
  return flight.destination === nextFlight.origin &&
    canAccommodateTurnaround(flight.arrivaltime, nextFlight.departuretime) &&
    flight.arrivaltime < DAY_LENGTH;
};


export const getPositionForFlight = (flights: FlightType[], flightToInsert: FlightType): number | null => {
  if (!flights.length && flightToInsert !== null) {
    return 0;
  }

  if (canPrependFlight(flights[0], flightToInsert)) {
    return 0;
  }

  if (canAppendFlight(flights[flights.length - 1], flightToInsert)) {
    return flights.length;
  }


  const canPrependIndex = flights.findIndex(flight => canPrependFlight(flight, flightToInsert))
  if (canPrependIndex !== -1 && canAppendFlight(flights[canPrependIndex - 1], flightToInsert)) {
    return canPrependIndex
  }

  return null;
};


export default getPositionForFlight;