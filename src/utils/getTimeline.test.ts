import getTimeline from "./getTimeline";
import { FlightType } from "../types";

describe("getTimeline", () => {


  it("should return a timeline with no turnaround time if only one flight is given", () => {
    const flightsList: FlightType[] = [
      {
        ident: "A",
        origin: "A",
        destination: "B",
        arrivaltime: 100,
        departuretime: 0,
        readable_departure: "00:00",
        readable_arrival: "01:40",
      },
    ];
    const result = getTimeline(flightsList);
    expect(result.filter(([status]) => status === "turnaround")).toHaveLength(0);
  });

  it("should return a timeline with no turnaround time if there is only one flight", () => {
    const flightsList: FlightType[] = [
      {
        ident: "A",
        origin: "A",
        destination: "B",
        arrivaltime: 100,
        departuretime: 0,
        readable_departure: "00:00",
        readable_arrival: "01:40",
      },
    ];
    const result = getTimeline(flightsList);
    expect(result.filter(([status]) => status === "turnaround")).toHaveLength(0);
  });

});