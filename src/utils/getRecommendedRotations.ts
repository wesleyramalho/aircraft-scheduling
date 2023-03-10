import { FlightType } from "../types";
import { DAY_LENGTH, SCHEDULED_STATUS } from "./constants";
import { canAccommodateTurnaround } from "./getPositionForFlight";
import getTimeline from "./getTimeline";

export const getRecommendedRotations = (flightsList: FlightType[]): FlightType[][] => {
  // Get all possible rotations
  const rotations = getAllRotations(flightsList);
  
  // Calculate timeline and total scheduled time for each rotation
  const rotationsWithTimeline = rotations.map((rotation) => {
    const timeline = getTimeline(rotation);
    let totalScheduled = 0;
    for (let i = 0; i < timeline.length; i++) {
      const [status, percent] = timeline[i];
      if (status === SCHEDULED_STATUS) {
        totalScheduled += percent;
      }
    }
    return {
      rotation,
      timeline,
      totalScheduled,
    };
  });
  
  // Sort rotations by total scheduled time in descending order
  const sortedRotations = rotationsWithTimeline.sort(
    (a, b) => b.totalScheduled - a.totalScheduled
  );
  
  return sortedRotations.map((rotation) => rotation.rotation);
}

function getAllRotations(flightsList: FlightType[]): FlightType[][] {
  const rotations: FlightType[][] = [];
  
  // Iterate through all possible starting points
  for (let i = 0; i < flightsList.length; i++) {
    const flight = flightsList[i];
    const remainingFlights = [...flightsList.slice(0, i), ...flightsList.slice(i + 1)];
    
    // Recursively find all possible rotations that start with this flight
    const rotationsStartingWithFlight = getRotationsStartingWithFlight(flight, remainingFlights);
    
    // Add these rotations to the master list
    rotations.push(...rotationsStartingWithFlight);
  }
  
  return rotations;
}

function getRotationsStartingWithFlight(flight: FlightType, remainingFlights: FlightType[]): FlightType[][] {
  const rotations: FlightType[][] = [];
  
  // Find all flights that can be appended to this flight
  const appendableFlights = remainingFlights.filter(
    (nextFlight) =>
      flight.destination === nextFlight.origin &&
      canAccommodateTurnaround(flight.arrivaltime, nextFlight.departuretime) &&
      flight.arrivaltime < DAY_LENGTH
  );
  
  // If there are no appendable flights, this flight alone is a rotation
  if (appendableFlights.length === 0) {
    rotations.push([flight]);
  } else {
    // Recursively find all possible rotations that can be formed by appending each appendable flight
    for (let i = 0; i < appendableFlights.length; i++) {
      const nextFlight = appendableFlights[i];
      const remainingFlightsForNextRotation = [...remainingFlights.slice(0, remainingFlights.indexOf(nextFlight)), ...remainingFlights.slice(remainingFlights.indexOf(nextFlight) + 1)];
      const rotationsStartingWithNextFlight = getRotationsStartingWithFlight(nextFlight, remainingFlightsForNextRotation);
      
      // Add the current flight to each rotation
      for (let j = 0; j < rotationsStartingWithNextFlight.length; j++) {
        const rotationStartingWithNextFlight = rotationsStartingWithNextFlight[j];
        rotations.push([flight, ...rotationStartingWithNextFlight]);
      }
    }
  }
  
  return rotations;
}