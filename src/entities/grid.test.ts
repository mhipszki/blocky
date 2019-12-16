import Grid from './grid';
import { Coordinate } from './types';

test('can be created with lower left and upper right coordinates', () => {
  const lowerLeft: Coordinate = { x: 0, y: 0 };
  const upperRight: Coordinate = { x: 1, y: 1 };
  const grid = new Grid(lowerLeft, upperRight);
  expect(grid.lowerLeft).toEqual({ x: 0, y: 0 });
  expect(grid.upperRight).toEqual({ x: 1, y: 1 });
});

test('calculates width and height when created', () => {
  const lowerLeft: Coordinate = { x: 0, y: 0 };
  const upperRight: Coordinate = { x: 1, y: 1 };
  const grid = new Grid(lowerLeft, upperRight);
  expect(grid.width).toBe(2);
  expect(grid.height).toBe(2);
});
