import { Coordinate, Colour } from './types';
import Block from './block';
import findPeers from './findPeers';
import bubbleUpEmptyBlocks from './bubbleUpEmptyBlocks';

/**
 * passing in a colour factory function makes it easier
 * to test functionality with deterministic values
 */
export type ColourFactory = () => Colour;

class Grid {
  readonly width: number;
  readonly height: number;
  private _blocks: Block[][];

  constructor(
    readonly lowerLeft: Coordinate,
    readonly upperRight: Coordinate,
    generateColour: ColourFactory
  ) {
    this.width = upperRight.x - lowerLeft.x + 1;
    this.height = upperRight.y - lowerLeft.y + 1;
    this.createBlocks(generateColour);
  }

  /**
   * creates a 2 dimensional array of blocks
   * where position of a block corresponds to its position in the array
   */
  private createBlocks(generateColour: ColourFactory) {
    this._blocks = new Array(this.width).fill(null).map((_, x) => {
      const column = new Array(this.height)
        .fill(null)
        .map(generateColour)
        .map((colour, y) => {
          const position: Coordinate = { x, y };
          return new Block(position, colour);
        });
      return column;
    });
  }

  get blocks(): Block[][] {
    return this._blocks;
  }

  blockAt(x: number, y: number) {
    return this.blocks[x][y];
  }

  clearWithConnectedPeers(block: Block) {
    const peers = findPeers(block, this.blocks);
    [block, ...peers].forEach(peer => {
      const { x, y } = peer.position;
      this.blocks[x][y] = null;
    });
  }

  collapseEmptyBlocks() {
    this.blocks.forEach(bubbleUpEmptyBlocks);
  }
}

export default Grid;
