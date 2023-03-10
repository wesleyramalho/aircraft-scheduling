import React, { useMemo } from 'react';

import { Slider, Item, TimelineContainer, TotalPercentage, ItemContent } from './styles'

import { FlightStatus, SCHEDULED_STATUS } from '../../utils/constants';
import getTimeline from '../../utils/getTimeline';
import { FlightType } from '../../types';
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import DatesList from '../Dates';

type TimelineType = {
    hoursBetween?: number;
    items: FlightType[]
    renderedFromKey: string;
}

const Timeline = ({ items, hoursBetween = 2, renderedFromKey }: TimelineType) => {
    const timeline = useMemo(() => getTimeline(items), [items]);

    let totalScheduled = 0;
    for (let i = 0; i < timeline.length; i++) {
        const [status, percent] = timeline[i];
        if (status === SCHEDULED_STATUS) {
            totalScheduled += percent;
        }
    }

    return (
        <TimelineContainer>
            <DatesList
                hoursBetween={hoursBetween}
            />
            <Slider >
                {timeline.map((elem, index) => {
                    const [status, percent, flight] = elem;
                    return (
                        <Item role='slider' key={`timeline-item-${index}`} status={status as FlightStatus} width={percent}>
                            <ItemContent transparentLabel id={`timeline-tooltip-${index}-${renderedFromKey}`}>
                                {percent}%
                                <ReactTooltip
                                    anchorId={`timeline-tooltip-${index}-${renderedFromKey}`}
                                    place="top"
                                    html={
                                        `Status: ${status}  <br />` +
                                        `Ident: ${flight?.ident || '-'}  <br />` +
                                        `Departure: ${flight?.readable_departure || '-'}  <br />` +
                                        `Arrival: ${flight?.readable_arrival || '-'}  <br />` +
                                        `Origin: ${flight?.origin || '-'}  <br />` +
                                        `Destination: ${flight?.destination || '-'}  <br />` +
                                        `Percentage: ${percent}%`}
                                />
                            </ItemContent>
                        </Item>
                    )
                })}
            </Slider>
            Total Scheduled: <TotalPercentage>{totalScheduled.toFixed(2)}%</TotalPercentage>
        </TimelineContainer>
    );
};

export default Timeline;
