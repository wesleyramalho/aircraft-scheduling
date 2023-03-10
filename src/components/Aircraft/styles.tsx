import styled from 'styled-components';
import { Card, DisabledStyles } from '../../theme';

export const AircraftCard = styled(Card) <{ disabled?: boolean }>`
    ${({ disabled }) => disabled && DisabledStyles};
    margin-bottom: 15px;
`;
export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100px; 
  overflow: hidden;
  img {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.2s ease-in-out;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

export const OverlayContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.8) 100%), rgba(0, 0, 0, 0.1);
`;

