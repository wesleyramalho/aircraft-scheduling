import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import SiteLayout from './index';
import { BASE_URL } from '../../utils/constants';

const server = setupServer(
    rest.get(`${BASE_URL}/aircrafts`, (req, res, ctx) => {
        return res(
            ctx.json([
                { ident: 'A123', type: 'Boeing 737', economySeats: 160, base: 'Buenos Aires' },
                { ident: 'B456', type: 'Airbus A320', economySeats: 140, base: 'Santiago' }
            ])
        );
    }),
    rest.get(`${BASE_URL}/flights`, (req, res, ctx) => {
        return res(
            ctx.json([
                { ident: '1', aircraft: 'A123', departuretime: 1646700000, destination: 'Santiago', readstatus: true },
                { ident: '2', aircraft: 'B456', departuretime: 1646710800, destination: 'Buenos Aires', readstatus: false },
                { ident: '3', aircraft: 'A123', departuretime: 1646721600, destination: 'Lima', readstatus: false },
            ])
        );
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders the aircrafts, rotation and flights columns', async () => {
    render(<SiteLayout />);

    await screen.findByTestId('flights-list');

    expect(screen.getByText('Aircrafts')).toBeInTheDocument();
    expect(screen.getByText('Rotation')).toBeInTheDocument();
    expect(screen.getByText('Flights')).toBeInTheDocument();
});

test('renders aircrafts', async () => {
    render(<SiteLayout />);

    await screen.findByTestId('flights-list');

    expect(screen.getByText('Aircrafts')).toBeInTheDocument();

    const identElements = screen.queryAllByText(/A123/i);
    expect(identElements.length).toBeGreaterThan(0);

    identElements.forEach((identElement) => {
        expect(identElement).toBeInTheDocument();
    });
    expect(screen.getByText('B456')).toBeInTheDocument();
});

test('renders flights', async () => {
    render(<SiteLayout />);

    // Wait for aircrafts and flights to load
    await screen.findByTestId('flights-list');

    expect(screen.getByText('Flights')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
});

test('adds and removes flights from rotation', async () => {
    render(<SiteLayout />);
    // Wait for aircrafts and flights to load
    await screen.findByTestId('flights-list');
    expect(screen.getByText('Flights')).toBeInTheDocument();

    // Select the first flight
    const addFlightButton = screen.getAllByText('add')[0];
    fireEvent.click(addFlightButton);

    // Check that the flight was added to the rotation
    expect(screen.getByText('Rotation')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();

    // Remove the flight
    const removeFlightButton = screen.getByText('remove');
    fireEvent.click(removeFlightButton);
});




