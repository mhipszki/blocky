import bubbleUpEmpty from './bubbleUpEmptyBlocks';
import { Yellow as Y, Empty as X } from './types';
import { createColumn, colourMapOfBlocks } from './testhelpers';
import Block from './block';

test('bubbles up empty blocks', () => {
  const blocks = createColumn([Y, X, X, Y, Y, X, Y]);

  bubbleUpEmpty(blocks);

  expect(colourMapOfBlocks(blocks)).toEqual([Y, Y, Y, Y, X, X, X]);

  const toPoints = (blocks: Block[]) => blocks.map(({ x, y }) => [x, y]);

  expect(toPoints(blocks)).toEqual([
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
  ]);
});
