import bubbleUpEmpty from './bubbleUpEmptyBlocks';
import { Yellow as Y, Empty as X } from './types';
import { createColumn, colourMapOfBlocks } from './testhelpers';

test('bubbles up empty blocks', () => {
  const blocks = createColumn([Y, X, X, Y, Y, X, Y]);

  bubbleUpEmpty(blocks);

  expect(colourMapOfBlocks(blocks)).toEqual([Y, Y, Y, Y, X, X, X]);
});
