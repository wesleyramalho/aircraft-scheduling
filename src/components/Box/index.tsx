import React from 'react';
import styled from 'styled-components';

interface BreakpointStyles {
  flexDirection?: 'row' | 'column';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  width?: string;
  height?: string;
  minHeight?: string;
  minWidth?: string;
  padding?: string;
  margin?: string;
  marginTop?: string;
  backgroundColor?: string;
  order?: string | number;
  position?: string;
}

interface Breakpoints {
  xs?: BreakpointStyles;
  sm?: BreakpointStyles;
  md?: BreakpointStyles;
  lg?: BreakpointStyles;
  xl?: BreakpointStyles;
}

interface BoxProps {
  transition?: string;
  flexDirection?: 'row' | 'column';
  position?: 'relative' | 'absolute' | 'sticky';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  width?: string;
  minWidth?: string;
  minHeight?: string;
  height?: string;
  padding?: string;
  margin?: string;
  marginTop?: string;
  backgroundColor?: string;
  breakpoints?: Breakpoints;
  children: React.ReactNode;
  className?: string;
}

interface BreakpointValues {
  [key: string]: number;
}

const breakpointValues: BreakpointValues = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

function toKebabCase(str: string) {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

const BoxStyles = styled.div<BoxProps>`
  display: flex;
  flex-direction: ${props => props.flexDirection || 'column'};
  position: ${props => props.position || 'relative'};
  justify-content: ${props => props.justifyContent || 'center'};
  align-items: ${props => props.alignItems || 'center'};
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || 'auto'};
  min-height: ${props => props.minHeight || 'auto'};
  min-width: ${props => props.minWidth || 'auto'};
  padding: ${props => props.padding || '0'};
  margin: ${props => props.margin || '0'};
  margin-top: ${props => props.marginTop || '0'};
  background-color: ${props => props.backgroundColor || 'transparent'};
  order: ${(props) => props.breakpoints?.xs?.order || 0};
  transition: ${props => props.transition || 'none'};

  ${props =>
    props.breakpoints
      ? Object.entries(props.breakpoints).map(
        ([breakpoint, styles]) => `
        @media (min-width: ${breakpointValues[breakpoint]}px) {
          ${Object.entries(styles)
            .map(([style, value]) => {
              if (style && value) {
                return `${toKebabCase(style)}: ${value};`;
              }
            })
            .join('')}
        }
      `
      )
      : null}
`;

const Box: React.FC<BoxProps> = (props) => {
  return (
    <BoxStyles {...props}>
      {props.children}
    </BoxStyles>
  );
};

export default Box;
