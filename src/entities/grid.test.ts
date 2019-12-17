import Grid from './grid';
import {
  Coordinate,
  Colour,
  colours,
  Red,
  Green,
  Blue,
  Yellow,
  Empty as X,
} from './types';
import { flatten, colourMapOf, colourMapOfBlocks } from './testhelpers';

test('can be created with lower left and upper right coordinates', () => {
  const lowerLeft: Coordinate = { x: 0, y: 0 };
  const upperRight: Coordinate = { x: 1, y: 1 };
  const colourFactory = jest.fn();
  const grid = new Grid(lowerLeft, upperRight, colourFactory);
  expect(grid.lowerLeft).toEqual({ x: 0, y: 0 });
  expect(grid.upperRight).toEqual({ x: 1, y: 1 });
});

test('calculates width and height when created', () => {
  const lowerLeft: Coordinate = { x: 0, y: 0 };
  const upperRight: Coordinate = { x: 1, y: 1 };
  const colourFactory = jest.fn();
  const grid = new Grid(lowerLeft, upperRight, colourFactory);
  expect(grid.width).toBe(2);
  expect(grid.height).toBe(2);
});

test('creates blocks in all positions with various colours', () => {
  const lowerLeft: Coordinate = { x: 0, y: 0 };
  const upperRight: Coordinate = { x: 1, y: 1 };
  const testColours: Colour[] = [...colours];
  const colourFactory = jest.fn(() => testColours.shift());

  const grid = new Grid(lowerLeft, upperRight, colourFactory);

  expect(grid.blocks[0][0].position).toEqual({ x: 0, y: 0 });
  expect(grid.blocks[0][0].colour).toEqual(Red);
  expect(grid.blocks[0][1].position).toEqual({ x: 0, y: 1 });
  expect(grid.blocks[0][1].colour).toEqual(Green);
  expect(grid.blocks[1][0].position).toEqual({ x: 1, y: 0 });
  expect(grid.blocks[1][0].colour).toEqual(Blue);
  expect(grid.blocks[1][1].position).toEqual({ x: 1, y: 1 });
  expect(grid.blocks[1][1].colour).toEqual(Yellow);
});

test('can return flat list of all blocks for rendering', () => {
  const lowerLeft: Coordinate = { x: 0, y: 0 };
  const upperRight: Coordinate = { x: 2, y: 2 };

  const R = Red;
  const G = Green;
  const B = Blue;
  const Y = Yellow;

  const testColours: Colour[] = [
    [B, Y, R],
    [Y, R, G],
    [R, G, B],
  ].reduce(flatten, []);

  const colourFactory = jest.fn(() => testColours.shift());

  const grid = new Grid(lowerLeft, upperRight, colourFactory);

  expect(colourMapOfBlocks(grid.listOfBlocks)).toEqual([
    B,
    G,
    R,
    G,
    R,
    Y,
    R,
    Y,
    B,
  ]);
});

test('can clear a block and its connected peers', () => {
  const lowerLeft: Coordinate = { x: 0, y: 0 };
  const upperRight: Coordinate = { x: 3, y: 3 };

  const R = Red;
  const Y = Yellow;

  const testColours: Colour[] = [
    [Y, Y, Y, Y],
    [Y, Y, R, Y],
    [Y, R, R, R],
    [R, Y, R, R],
  ].reduce(flatten, []);

  const colourFactory = jest.fn(() => testColours.shift());

  const grid = new Grid(lowerLeft, upperRight, colourFactory);

  grid.clearWithConnectedPeers(grid.blockAt(2, 1));

  expect(colourMapOf(grid.blocks)).toEqual([
    [Y, Y, Y, Y],
    [Y, Y, X, Y],
    [Y, X, X, X],
    [R, Y, X, X],
  ]);
});

test('can collapse empty blocks', () => {
  const lowerLeft: Coordinate = { x: 0, y: 0 };
  const upperRight: Coordinate = { x: 3, y: 3 };

  const R = Red;
  const Y = Yellow;

  const testColours: Colour[] = [
    [Y, Y, Y, Y],
    [Y, R, Y, Y],
    [Y, R, R, Y],
    [R, R, Y, Y],
  ].reduce(flatten, []);

  const colourFactory = jest.fn(() => testColours.shift());

  const grid = new Grid(lowerLeft, upperRight, colourFactory);

  grid.clearWithConnectedPeers(grid.blockAt(2, 1));

  expect(colourMapOf(grid.blocks)).toEqual([
    [Y, Y, Y, Y],
    [Y, X, Y, Y],
    [Y, X, X, Y],
    [X, X, Y, Y],
  ]);

  grid.collapseEmptyBlocks();

  expect(colourMapOf(grid.blocks)).toEqual([
    [Y, Y, Y, Y],
    [Y, Y, Y, X],
    [Y, Y, X, X],
    [Y, Y, X, X],
  ]);
});
