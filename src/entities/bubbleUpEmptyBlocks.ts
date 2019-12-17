/**
 * simple bubble sort, lifting up empty blocks in an array
 */
import Block from './block';
import { Empty } from './types';

export default (blocks: Block[]) => {
  let swapped: boolean;
  do {
    swapped = false;
    for (let i = 0; i < blocks.length - 1; i++) {
      if (blocks[i].colour === Empty && blocks[i + 1].colour !== Empty) {
        let tmp = blocks[i];
        blocks[i] = blocks[i + 1];
        blocks[i + 1] = tmp;
        swapped = true;
      }
    }
  } while (swapped);

  blocks.forEach((block, i) => (block.y = i));
};
