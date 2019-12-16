import findPeers from './findPeers';
import { Red as R, Yellow as Y } from './types';
import { createGrid, findBlockOn } from './testhelpers';

test('returns all connected blocks with the same colour on a grid', () => {
  const grid = createGrid([
    [Y, Y, Y, Y],
    [Y, Y, R, Y],
    [Y, R, R, R],
    [R, Y, R, R],
  ]);

  const blockAt = findBlockOn(grid);

  expect(findPeers(blockAt(2, 1), grid)).toEqual([
    blockAt(2, 2),
    blockAt(1, 2),
    blockAt(2, 3),
    blockAt(3, 2),
    blockAt(3, 3),
  ]);
});

test('returns all blocks on a grid only with homogeneous blocks', () => {
  const grid = createGrid([
    [R, R, R, R],
    [R, R, R, R],
    [R, R, R, R],
    [R, R, R, R],
  ]);

  const blockAt = findBlockOn(grid);

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
