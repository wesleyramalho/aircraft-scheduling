import { FlightType } from "../types";
import { getRecommendedRotations } from "./getRecommendedRotations";
describe("getRecommendedRotations", () => {
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
        {
            ident: "B",
            origin: "B",
            destination: "C",
            arrivaltime: 200,
            departuretime: 120,
            readable_departure: "02:00",
            readable_arrival: "03:40",
        },
    ];

    
    it("should return an array of all possible rotations", () => {
        const result = getRecommendedRotations(flightsList);
        expect(result.length).toEqual(2);
    });

    it("should return rotations with total scheduled time calculated", () => {
        const result = getRecommendedRotations(flightsList);
        result.forEach((rotation) => {
            let totalScheduled = 0;
            for (let i = 0; i < rotation.length; i++) {
                const flight = rotation[i];
                totalScheduled += flight.arrivaltime - flight.departuretime;
            }
            expect(totalScheduled).toBeGreaterThan(0);
        });
    });
});
