import styled from 'styled-components';

const DATES_PADDING = '20px 0 10px';

export const Dates = styled.div`
    display: flex;
    flex: 1 100%;
    flex-flow: wrap;
    flex-wrap: nowrap;
    justify-content: space-between;
    padding: ${DATES_PADDING};
`;

interface LabelProps {
    transparentLabel?: boolean;
}

export const Label = styled.span<LabelProps>`
    color: ${props => props.transparentLabel ? 'transparent' : 'inherit'};
`;
