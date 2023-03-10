import React from 'react';
import { FlightType } from '../../types';
import { Paragraph } from '../../theme';
import Box from '../Box';
import AirplaneLine from '../AirplaneLine';
import "react-tooltip/dist/react-tooltip.css";

interface Props {
    flight: FlightType;
}


const Rotation = ({ flight }: Props) => {
    const { ident, origin, destination, readable_departure, readable_arrival, arrivaltime, departuretime } = flight;

    const formatDuration = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        return `${hours}h${minutes}min`;
    };

    const duration = formatDuration(arrivaltime - departuretime);

    return (
        <div>
            <Paragraph data-testid='flight-ident' ><strong>Ident:</strong> {ident}</Paragraph>
            <Box
                breakpoints={{
                    xs: {
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "20px",
                    },
                }}
            >
                <Box>
                    <Paragraph>
                        <strong>
                            {origin}
                        </strong>
                    </Paragraph>
                    <Paragraph> {readable_departure} GMT</Paragraph>
                </Box>
                <Box
                    breakpoints={{
                        xs: {
                            marginTop: '40px'
                        },
                    }}
                >
                    <AirplaneLine />
                    <Box
                        breakpoints={{
                            xs: {
                                padding: "20px",
                                marginTop: '10px'
                            },
                        }}>
                        <Paragraph>{duration}</Paragraph>
                    </Box>
                </Box>
                <Box>
                    <Paragraph>
                        <strong>
                            {destination}
                        </strong>
                    </Paragraph>
                    <Paragraph> {readable_arrival} GMT</Paragraph>
                </Box>
            </Box>
        </div>
    );
};

export default Rotation;






