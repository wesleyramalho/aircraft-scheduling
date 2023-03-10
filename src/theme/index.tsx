import styled, { css } from 'styled-components';

export const PRIMARY_COLOR = '#516799';
export const SECONDARY_COLOR = '#FECEA5';
export const TERTIARY_COLOR = '#98DBC6';

export const Paragraph = styled.p`
  font-size: 16px;
  line-height: 1.4;
`;

export const Badge = styled.div`
    color: black;
    background-color: rgb(255, 255, 255);
    width: auto;
    padding: 5px;
    z-index: 4;
    left: 10px;
    position: absolute;
    top: 58px;
    ${Paragraph} {
        color: black;
        position: relative;
    }
`

export const Card = styled.div`
  margin-bottom: 10px;
  background-color: #fff;
  position: relative;
`;


export const DisabledStyles = css`
    filter: grayscale(50%);
    opacity: 0.5;
`;

export const Info = styled.span`
  font-size: 11px;
  line-height: 1.4;
  display: inline;
  text-align: start;
`;
