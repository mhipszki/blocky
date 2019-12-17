import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Grid from './entities/grid';
import { blockColours, Colour } from './entities/types';

test('renders the grid', () => {
  const colours = [...blockColours];
  const colourFactory = () => colours.pop() as Colour;

  const grid = new Grid({ x: 0, y: 0 }, { x: 1, y: 1 }, colourFactory);

  const { getAllByTestId } = render(<App grid={grid} />);
  const blocks = getAllByTestId(/block/);
  expect(blocks).toHaveLength(4);
  expect(blocks[0].style.backgroundColor).toBe('red');
  expect(blocks[1].style.backgroundColor).toBe('blue');
  expect(blocks[2].style.backgroundColor).toBe('green');
  expect(blocks[3].style.backgroundColor).toBe('yellow');
});
