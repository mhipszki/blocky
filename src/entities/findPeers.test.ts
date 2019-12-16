import findPeers from './findPeers';
import { Colour, Red, Yellow, Blue, Green } from './types';
import Block from './block';

test('returns a single block of a 1x1 array', () => {
  const singleBlock = new Block({ x: 0, y: 1 }, Red);
  expect(findPeers(singleBlock, [[singleBlock]])).toEqual([singleBlock]);
});

test('returns all connected blocks with the same colour on a grid', () => {
  const R = Red;
  const Y = Yellow;
  const grid: Block[][] = [
    [Y, Y, Y, Y],
    [Y, Y, R, Y],
    [Y, R, R, R],
    [R, Y, R, R],
  ].map((col: Colour[], x) =>
    col.map((colour: Colour, y) => new Block({ x, y }, colour))
  );

  const blockAt = (x: number, y: number) => grid[x][y];

  expect(findPeers(blockAt(2, 1), grid)).toEqual([
    blockAt(2, 2),
    blockAt(1, 2),
    blockAt(2, 3),
    blockAt(3, 2),
    blockAt(3, 3),
  ]);
});

test.only('returns all connected blocks with the same colour on a grid', () => {
  const R = Red;
  const grid: Block[][] = [
    [R, R, R, R],
    [R, R, R, R],
    [R, R, R, R],
    [R, R, R, R],
  ].map((col: Colour[], x) =>
    col.map((colour: Colour, y) => new Block({ x, y }, colour))
  );

  const blockAt = (x: number, y: number) => grid[x][y];

  expect(findPeers(blockAt(2, 1), grid)).toEqual([
    blockAt(1, 1),
    blockAt(2, 2),
    blockAt(2, 0),
    blockAt(3, 1),
    blockAt(0, 1),
    blockAt(1, 2),
    blockAt(1, 0),
    blockAt(0, 2),
    blockAt(0, 0),
    blockAt(0, 3),
    blockAt(1, 3),
    blockAt(2, 3),
    blockAt(3, 3),
    blockAt(3, 2),
    blockAt(3, 0),
  ]);
});
