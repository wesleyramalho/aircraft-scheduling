import React from 'react';
import { render, screen } from '@testing-library/react';
import { DatesList } from '.';


describe('DatesList component', () => {
  it('renders the correct number of hours with the specified interval', () => {
    render(<DatesList hoursBetween={2} />);
    const hours = screen.getAllByRole('hour');

    // should render 12 hours with a 2 hour interval plus 23:59
    expect(hours.length).toBe(13);

    // first hour should be 00:00
    expect(hours[0]).toHaveTextContent('00:00');

    // last hour should be 23:59
    expect(hours[hours.length - 1]).toHaveTextContent('23:59');

    // each hour should have the correct role
    hours.forEach(hour => {
      expect(hour).toHaveAttribute('role', 'hour');
    });
  });
});
