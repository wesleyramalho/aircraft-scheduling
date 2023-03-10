import styled from 'styled-components';
import { FlightStatus, SCHEDULED_STATUS, TURNAROUND_STATUS } from '../../utils/constants';

const SLIDER_MARGIN_BOTTOM = '10px';
const ITEM_FONT_SIZE = '13px';
const ITEM_CONTENT_DISPLAY = 'flex';
const ITEM_CONTENT_ALIGN_ITEMS = 'center';
const ITEM_CONTENT_JUSTIFY_CONTENT = 'center';
const ITEM_WIDTH_MAX = '100%';
const ITEM_COLOR_SCHEDULED = '#449253';
const ITEM_COLOR_TURNAROUND = '#9982c1';
const ITEM_COLOR_DEFAULT = '#EAEAEC';
const TOTAL_PERCENTAGE_FONT_WEIGHT = '900';

export const Slider = styled.div`
    display: flex;
    flex: 1 100%;
    flex-flow: wrap;
    flex-wrap: nowrap;
    font-weight: 500;
    word-break: break-all;
    text-align: center;
    border: 1px solid black;
    margin-bottom: ${SLIDER_MARGIN_BOTTOM};
`;

const getColor = (status: FlightStatus) => {
    if (status === SCHEDULED_STATUS) {
        return ITEM_COLOR_SCHEDULED;
    } else if (status === TURNAROUND_STATUS) {
        return ITEM_COLOR_TURNAROUND;
    } else {
        return ITEM_COLOR_DEFAULT;
    }
}


interface ItemContentProps {
    transparentLabel?: boolean;
}

export const ItemContent = styled.div<ItemContentProps>`
    width: ${ITEM_WIDTH_MAX};
    height: ${ITEM_WIDTH_MAX};
    display: ${ITEM_CONTENT_DISPLAY};
    align-items: ${ITEM_CONTENT_ALIGN_ITEMS};
    justify-content: ${ITEM_CONTENT_JUSTIFY_CONTENT};
    color: ${props => props.transparentLabel ? 'transparent' : 'inherit'};
    user-select: none;
`

export const Item = styled.div<{ status: FlightStatus, width: number | string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${props => getColor(props.status)};
    width: ${props => props.width}%;
    font-size: ${ITEM_FONT_SIZE};
    height: 40px;
`

export const TimelineContainer = styled.div`
    flex: 1 100%;
    position: relative;
    padding: 0 15px 20px;
    background-color: rgba(255, 255, 255, 0.28);
    backdrop-filter: blur(5px);
`

export const TotalPercentage = styled.span`
    font-weight: ${TOTAL_PERCENTAGE_FONT_WEIGHT};
`;
