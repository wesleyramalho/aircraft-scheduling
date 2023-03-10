export interface AircraftType {
    ident: string;
    type: string;
    economySeats: number;
    base: string;
}

export interface FlightType {
    ident: string;
    origin: string;
    destination: string;
    arrivaltime: number;
    departuretime: number;
    readable_departure: string;
    readable_arrival: string;
}
