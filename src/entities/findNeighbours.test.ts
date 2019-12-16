import findNeighbours from './findNeighbours';
import { Red, Colour } from './types';
import Block from './block';

test('returns a single block of a 1x1 array', () => {
  const block = new Block({ x: 0, y: 1 }, Red);
  expect(findNeighbours(block, [[block]])).toEqual([block]);
});

test('returns neighbours on all sides of a specific block in a grid', () => {
  const grid: Block[][] = [
    [Red, Red, Red],
    [Red, Red, Red],
    [Red, Red, Red],
  ].map((col: Colour[], x) =>
    col.map((colour: Colour, y) => new Block({ x, y }, colour))
  );

  const blockAt = (x: number, y: number) => grid[x][y];

  // lower left
  expect(findNeighbours(blockAt(0, 0), grid)).toEqual([
    blockAt(0, 1), // above
    blockAt(1, 0), // on the right
  ]);

  // middle
  expect(findNeighbours(blockAt(1, 1), grid)).toEqual([
    blockAt(0, 1), // on the left
    blockAt(1, 2), // above
    blockAt(1, 0), // below
    blockAt(2, 1), // on the right
  ]);

  // upper right
  expect(findNeighbours(blockAt(2, 2), grid)).toEqual([
    blockAt(1, 2), // on the left
    blockAt(2, 1), // below
  ]);
});
