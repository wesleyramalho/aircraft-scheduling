import React from 'react';
import { render, screen } from '@testing-library/react';
import Box from './index';

describe('Box', () => {
  it('should render children', () => {
    render(
      <Box>
        <div>Hello world</div>
      </Box>
    );

    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('should apply styles to the root element', () => {
    const { container } = render(
      <Box
        backgroundColor="red"
        width="100%"
        height="50px"
        alignItems="center"
        justifyContent="space-between"
        padding="10px"
      >
        <div>Left</div>
        <div>Right</div>
      </Box>
    );

    // eslint-disable-next-line testing-library/no-node-access
    const rootElement = container.firstChild;

    expect(rootElement).toHaveStyle(`
      background-color: red;
      width: 100%;
      height: 50px;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
    `);
  });
});
