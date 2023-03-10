import React from 'react';
import { render, screen } from '@testing-library/react';
import RotationResume from './index';

describe('RotationResume', () => {
    it('should display the selected aircraft', () => {
        const selectedAircraft = 'ABC123';
        render(<RotationResume selectedAircraft={selectedAircraft} />);
        expect(screen.getByTestId('resume-ident')).toBeInTheDocument();
    });

    it('should display a message when no rotation is selected', () => {
        render(<RotationResume />);
        expect(screen.getByText('Please choose a rotation recommendation, or flights on the right panel.')).toBeInTheDocument();
        expect(screen.getByText('You can also choose a different aircraft on the left panel.')).toBeInTheDocument();
    });

    it('should not display a message when a rotation is selected', () => {
        const rotationList = [
            {
                ident: 'ABC123',
                origin: 'JFK',
                destination: 'LAX',
                departuretime: 236782,
                arrivaltime: 236788,
                status: 'Scheduled',
                percent: 50,
                readable_departure: 'Mar 8, 2022 11:00 AM',
                readable_arrival: 'Mar 8, 2022 2:00 PM',
            },
            {
                ident: 'DEF456',
                origin: 'LAX',
                destination: 'JFK',
                departuretime: 236781,
                arrivaltime: 236788,
                status: 'Scheduled',
                percent: 50,
                readable_departure: 'Mar 8, 2022 3:00 PM',
                readable_arrival: 'Mar 8, 2022 6:00 PM',
            },
        ];
        render(<RotationResume rotationList={rotationList} />);
        expect(screen.queryByText('Please choose a rotation recommendation, or flights on the right panel.')).not.toBeInTheDocument();
        expect(screen.queryByText('You can also choose a different aircraft on the left panel.')).not.toBeInTheDocument();
    });
});
