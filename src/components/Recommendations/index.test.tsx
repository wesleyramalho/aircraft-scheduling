import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Recommendations from './index';

describe('Recommendations component', () => {

    const mockOnSelectRotationRecommendation = jest.fn();

    it('renders correctly with recommended rotations', () => {
        const mockRotations = [{
            rotation: {
                id: '1', name: 'Rotation 1', timelines: [{ id: '1', name: 'Timeline 1', scheduledPercentage: 40 }, { id: '2', name: 'Timeline 2', scheduledPercentage: 40 }]
            },
            totalScheduled: 80
        },
        {
            rotation: {
                id: '2',
                name: 'Rotation 2',
                timelines: [
                    {
                        id: '3',
                        name: 'Timeline 3',
                        scheduledPercentage: 35
                    },
                    {
                        id: '4',
                        name: 'Timeline 4',
                        scheduledPercentage: 50
                    }
                ]
            },
            totalScheduled: 85.5
        },
        {
            rotation: {
                id: '3',
                name: 'Rotation 3',
                timelines: [
                    {
                        id: '5',
                        name: 'Timeline 5',
                        scheduledPercentage: 45
                    },
                    {
                        id: '6',
                        name: 'Timeline 6',
                        scheduledPercentage: 50
                    }
                ]
            },
            totalScheduled: 90.25
        }
        ];

        render(<Recommendations recommendedRotations={mockRotations} onSelectRotationRecommendation={mockOnSelectRotationRecommendation} />);

        mockRotations.forEach((item, index) => {
            const rotationText = `Rotation ${index + 1}:`;
            expect(screen.getByText(rotationText)).toBeInTheDocument();
            expect(screen.getByText(`Total scheduled timeline: ${item.totalScheduled.toFixed(2)}%`)).toBeInTheDocument();
        });

        const buttons = screen.getAllByText('use this one');
        expect(buttons.length).toBe(mockRotations.length);
    });


    test('calls onSelectRotationRecommendation when "use this one" button is clicked', () => {
        const mockOnSelectRotationRecommendation = jest.fn();
        const mockRotations = [{ rotation: { id: 1 }, totalScheduled: 80 }, { rotation: { id: 2 }, totalScheduled: 85.5 }, { rotation: { id: 3 }, totalScheduled: 90.25 },];
        render(<Recommendations recommendedRotations={mockRotations} onSelectRotationRecommendation={mockOnSelectRotationRecommendation} />);
        const useThisOneButtons = screen.getAllByText('use this one');
        useThisOneButtons.forEach((button, index) => {
            fireEvent.click(button);
            expect(mockOnSelectRotationRecommendation).toHaveBeenCalledWith(mockRotations[index].rotation);
        });
    });

});
