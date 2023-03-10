import React, { useMemo } from 'react';
import AirplaneVector from '../../assets/airplaneVector';
import { Paragraph } from '../../theme';
import { FlightType } from '../../types';
import { SCHEDULED_STATUS } from '../../utils/constants';
import getTimeline from '../../utils/getTimeline';
import Box from '../Box';

type RotationResumeProps = {
    selectedAircraft?: string;
    rotationList?: FlightType[]; 
}

const RotationResume = ({ selectedAircraft, rotationList = []}: RotationResumeProps) => {
    const timeline = getTimeline(rotationList);
    const totalScheduled = useMemo(() => {
        let total = 0;
        for (let i = 0; i < timeline.length; i++) {
            const [status, percent] = timeline[i];
            if (status === SCHEDULED_STATUS) {
                total += percent;
            }
        }
        return total;
    }, [timeline]);

    return (
        <>
            <Box
                breakpoints={{
                    xs: {
                        padding: '40px'
                    }
                }}
            >
                <Paragraph data-testid='resume-ident'>Aircraft ident: <b>{selectedAircraft}</b></Paragraph>
                <Paragraph>
                    Total Scheduled:: <b>{totalScheduled.toFixed(2)}%</b>
                </Paragraph>
            </Box>
            <AirplaneVector
                customStyle={{
                    width: '400px',
                    marginTop: '-100',
                }}
            />
            {
                rotationList.length === 0 &&
                <Box
                    breakpoints={{
                        xs: {
                            padding: '40px'
                        }
                    }}
                >
                    <Paragraph>Please choose a rotation recommendation, or flights on the right panel.</Paragraph>
                    <Paragraph>You can also choose a different aircraft on the left panel.</Paragraph>
                </Box>
            }
        </>
    );
}

export default RotationResume;