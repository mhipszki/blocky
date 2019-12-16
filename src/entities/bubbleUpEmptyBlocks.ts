/**
 * simple bubble sort, lifting up empty blocks in an array
 */
import Block from './block';

export default (blocks: Block[]) => {
  let swapped: boolean;
  do {
    swapped = false;
    for (let i = 0; i < blocks.length - 1; i++) {
      if (blocks[i] === null && blocks[i + 1] !== null) {
        let tmp = blocks[i];
        blocks[i] = blocks[i + 1];
        blocks[i + 1] = tmp;
        swapped = true;
      }
    }
  } while (swapped);
};
