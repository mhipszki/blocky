/**
 * passing in a colour factory function makes it easier
 * to test functionality with deterministic values
 */
import { Coordinate, ColourFactory, Empty } from './types';
import Block from './block';
import findPeers from './findPeers';
import bubbleUpEmptyBlocks from './bubbleUpEmptyBlocks';

class Grid {
  readonly width: number;
  readonly height: number;
  blocks: Block[][];

  constructor(
    readonly lowerLeft: Coordinate,
    readonly upperRight: Coordinate,
    generateColour: ColourFactory
  ) {
    this.width = upperRight.x - lowerLeft.x + 1;
    this.height = upperRight.y - lowerLeft.y + 1;
    this.blocks = this.createBlocks(generateColour);
  }

  /**
   * creates a 2 dimensional array of blocks
   * where position of a block corresponds to its position in the array
   */
  private createBlocks(generateColour: ColourFactory) {
    return new Array(this.width).fill(null).map((_, x) =>
      new Array(this.height)
        .fill(null)
        .map(generateColour)
        .map((colour, y) => new Block({ x, y }, colour))
    );
  }

  get listOfBlocks(): Block[] {
    const list: Block[] = [];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        list.unshift(this.blocks[x][y]);
      }
    }
    return list;
  }

  clearWithConnectedPeers(block: Block) {
    const peers = findPeers(block, this.blocks);
    [block, ...peers].forEach(peer => {
      const { x, y } = peer.position;
      this.blocks[x][y] = new Block({ x, y }, Empty);
    });
  }

  collapseEmptyBlocks() {
    this.blocks.forEach(bubbleUpEmptyBlocks);
  }
}

export default Grid;
