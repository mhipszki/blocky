import { Colour } from './types';
import Block from './block';

export const Empty = 'empty';

export const createGrid = (colours: Colour[][]): Block[][] =>
  colours.map((col: Colour[], x) =>
    col.map((colour: Colour, y) => new Block({ x, y }, colour))
  );

export const colourMapOf = (grid: Block[][]): (Colour | typeof Empty)[][] =>
  grid.map((col: Block[]) =>
    col.map((block: Block) => (block ? block.colour : Empty))
  );

export const findBlockOn = (grid: Block[][]) => (x: number, y: number) =>
  grid[x][y];

export const flatten = (arr: any[], next: any[]) => [...arr, ...next];
