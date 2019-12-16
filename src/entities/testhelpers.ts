import { Colour } from './types';
import Block from './block';

export const Empty = 'empty';

export const createColumn = (
  colours: (Colour | typeof Empty)[],
  x = 0
): Block[] =>
  colours.map((colour: Colour | typeof Empty, y) =>
    colour === Empty ? null : new Block({ x, y }, colour)
  );

export const createGrid = (colours: Colour[][]): Block[][] =>
  colours.map((col: Colour[], x) => createColumn(col, x));

export const colourMapOfBlocks = (blocks: Block[]): (Colour | typeof Empty)[] =>
  blocks.map((block: Block) => (block ? block.colour : Empty));

export const colourMapOf = (grid: Block[][]): (Colour | typeof Empty)[][] =>
  grid.map((col: Block[]) => colourMapOfBlocks(col));

export const findBlockOn = (grid: Block[][]) => (x: number, y: number) =>
  grid[x][y];

export const flatten = (arr: any[], next: any[]) => [...arr, ...next];
