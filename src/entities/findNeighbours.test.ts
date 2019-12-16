import findNeighbours from './findNeighbours';
import { Red as R } from './types';
import { createGrid, findBlockOn } from './testhelpers';

test('returns neighbours on all sides of a specific block in a grid', () => {
  const grid = createGrid([
    [R, R, R],
    [R, R, R],
    [R, R, R],
  ]);

  const blockAt = findBlockOn(grid);

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
