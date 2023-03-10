import { FlightType } from '../types';
import { TURNAROUND_TIME, DAY_LENGTH } from './constants';
import {
    canAccommodateTurnaround,
    canPrependFlight,
    canAppendFlight,
    getPositionForFlight
} from './getPositionForFlight';

describe('FlightType Functions', () => {
    
    const flight1: FlightType = {
        ident: 'ABC123',
        origin: 'LAX',
        destination: 'JFK',
        departuretime: 21600,
        arrivaltime: 26100,
        readable_departure: '06:00',
        readable_arrival: '07:15',
    };

    const flight2: FlightType = {
        ident: 'DEF456',
        origin: 'JFK',
        destination: 'LAX',
        departuretime: 28800,
        arrivaltime: 33300,
        readable_departure: '08:00',
        readable_arrival: '09:15',
    };

    describe('canAccommodateTurnaround', () => {
        it('should return true if turnaround time can be accommodated', () => {
            expect(canAccommodateTurnaround(flight1.arrivaltime, flight2.departuretime)).toBe(true);
        });

        it('should return false if turnaround time cannot be accommodated', () => {
            expect(canAccommodateTurnaround(flight1.arrivaltime, flight1.arrivaltime + TURNAROUND_TIME - 1)).toBe(false);
        });
    });

    describe('canPrependFlight', () => {
        it('should return true if flight can be prepended', () => {
            expect(canPrependFlight(flight2, flight1)).toBe(true);
        });

        it('should return false if flight cannot be prepended', () => {
            expect(canPrependFlight(flight1, flight2)).toBe(false);
            expect(canPrependFlight(flight2, flight2)).toBe(false);
        });
    });

    describe('canAppendFlight', () => {
    
        const flight2: FlightType = {
          ident: 'AA200',
          origin: 'LAX',
          destination: 'SFO',
          departuretime: 1100,
          arrivaltime: 1200,
          readable_departure: '18:20',
          readable_arrival: '00:20',
        };
    
        const flight3: FlightType = {
          ident: 'AA300',
          origin: 'SFO',
          destination: 'SEA',
          departuretime: 1300,
          arrivaltime: 1400,
          readable_departure: '21:40',
          readable_arrival: '23:20',
        };
    
        it('should return false if flight cannot be appended', () => {
          const result = canAppendFlight(flight3, flight2);
          expect(result).toBe(false);
        });
    
        it('should return false if arrival time is greater than DAY_LENGTH', () => {
          const flight: FlightType = {
            ident: 'AA400',
            origin: 'SEA',
            destination: 'JFK',
            departuretime: 1500,
            arrivaltime: DAY_LENGTH + 1,
            readable_departure: '',
            readable_arrival: '',
          };
    
          const result = canAppendFlight(flight3, flight);
          expect(result).toBe(false);
        });
      });

    describe('getPositionForFlight', () => {
        const flights: FlightType[] = [
            {
                ident: 'AA100',
                origin: 'JFK',
                destination: 'LAX',
                departuretime: 21600,
                arrivaltime: 26100,
                readable_departure: '06:00',
                readable_arrival: '07:15',
            },
            {
                ident: 'AA200',
                origin: 'LAX',
                destination: 'ORD',
                departuretime: 28800,
                arrivaltime: 34200,
                readable_departure: '08:00',
                readable_arrival: '09:30',
            },
            {
                ident: 'AA300',
                origin: 'ORD',
                destination: 'LAX',
                departuretime: 46800,
                arrivaltime: 52200,
                readable_departure: '13:00',
                readable_arrival: '14:30',
            },
        ];

        test('should return flights.length if flight can be appended to last flight in list', () => {
            const flightToInsert: FlightType = {
                ident: 'AA400',
                origin: 'LAX',
                destination: 'JFK',
                departuretime: 55800,
                arrivaltime: 60300,
                readable_departure: '15:30',
                readable_arrival: '16:45',
            };
            const position = getPositionForFlight(flights, flightToInsert);
            expect(position).toEqual(flights.length);
        });

        test('should return null if flight cannot be inserted', () => {
            const flightToInsert: FlightType = {
                ident: 'AA150',
                origin: 'JFK',
                destination: 'ORD',
                departuretime: 25200,
                arrivaltime: 30600,
                readable_departure: '07:00',
                readable_arrival: '08:30',
            };
            const position = getPositionForFlight(flights, flightToInsert);
            expect(position).toBeNull();
        });
    });
});
