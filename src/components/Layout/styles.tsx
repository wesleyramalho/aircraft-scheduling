import styled, { keyframes } from 'styled-components';
import { TERTIARY_COLOR, SECONDARY_COLOR, PRIMARY_COLOR } from '../../theme';
import MapImage from '../../assets/map.svg';
import { Card, DisabledStyles } from '../../theme';

const jumpAnimation = keyframes`
  0% {
    transform: translate3D(0, 0, 0);
    opacity: 0;
  }
  50% {
    transform: translate3D(0, -15px, 0);
    opacity: 0.5;
  }
  100% {
    transform: translate3D(0, 0, 0);
    opacity: 1;
  }
`;

export const LoaderWrapper = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const Dot = styled.span`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  animation: ${jumpAnimation} 0.6s ease-in infinite;
`;

export const Dot1 = styled(Dot)`
  background-color: ${PRIMARY_COLOR};
  animation-delay: 0.5s;
`;

export const Dot2 = styled(Dot)`
  background-color: ${SECONDARY_COLOR};
  animation-delay: 0.7s;
`;

export const Dot3 = styled(Dot)`
  background-color: ${TERTIARY_COLOR};
  animation-delay: 0.9s;
`;

export const ColumnsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  align-content: center;
  background-image: url(${MapImage});
  height: 94vh;
  background-size: cover;
  background-repeat: space;
`;

export const Column = styled.div`
  width: 30%;
  margin-bottom: 20px;
  background-color: rgb(255 255 255 / 28%);
  backdrop-filter: blur(5px);
  box-shadow: -1px 3px 10px -5px rgba(0,0,0,0.5);
  transition: box-shadow 0.2s ease-in-out;
  &:hover{
    box-shadow: -1px 3px 22px -10px rgba(0,0,0,0.73);
  }
  overflow-y: auto; /* add vertical scroll */
  max-height: 680px;
`;

export const Heading = styled.h2`
  font-size: 20px;
  position: sticky;
  top: 0;
  background-color: ${PRIMARY_COLOR}; /* set the same background color as the column */
  color: ${SECONDARY_COLOR};
  padding: 10px;
  z-index: 8;
  font-weight: lighter;
  letter-spacing: 1.3px;
`;

export const LayoutTimelineContainer = styled.div`
    position: absolute;
    width: 100%;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.28);
    backdrop-filter: blur(5px);
`

export const FlightCard = styled(Card) <{ disabled?: boolean }>`
    ${({ disabled }) => disabled && DisabledStyles};
    margin-bottom: 15px;
`;