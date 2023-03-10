import { render, screen } from '@testing-library/react';
import React from 'react';
import Rotation from './index';
import { FlightType } from '../../types';

const mockFlight: FlightType = {
  ident: 'AA123',
  origin: 'JFK',
  destination: 'LAX',
  readable_departure: '21:00',
  readable_arrival: '23:00',
  arrivaltime: 1647014700,
  departuretime: 1647003000,
};

describe('Rotation component', () => {
  it('renders flight details correctly', () => {
    render(<Rotation flight={mockFlight} />);
    expect(screen.getByTestId('flight-ident')).toBeInTheDocument();
    expect(screen.getByText('JFK')).toBeInTheDocument();
    expect(screen.getByText('LAX')).toBeInTheDocument();
    expect(screen.getByText('21:00 GMT')).toBeInTheDocument();
    expect(screen.getByText('23:00 GMT')).toBeInTheDocument();
  });
});
