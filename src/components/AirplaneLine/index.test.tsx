import React from 'react';
import { render, screen } from '@testing-library/react';
import AirplaneLine from './index';

describe('AirplaneLine component', () => {
  test('renders airplane line', () => {
    render(<AirplaneLine />);
    const airplaneLine = screen.getByTestId('airplane-line');
    expect(airplaneLine).toBeInTheDocument();
  });
});