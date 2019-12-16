import { Colour } from './types';
import Block from './block';

export const createColumn = (colours: Colour[], x = 0): Block[] =>
  colours.map((colour: Colour, y) => new Block({ x, y }, colour));

export const createGrid = (colours: Colour[][]): Block[][] =>
  colours.map((col: Colour[], x) => createColumn(col, x));

export const colourMapOfBlocks = (blocks: Block[]): Colour[] =>
  blocks.map(({ colour }: Block) => colour);

export const colourMapOf = (grid: Block[][]): Colour[][] =>
  grid.map((col: Block[]) => colourMapOfBlocks(col));

export const findBlockOn = (grid: Block[][]) => (x: number, y: number) =>
  grid[x][y];

export const flatten = (arr: any[], next: any[]) => [...arr, ...next];
