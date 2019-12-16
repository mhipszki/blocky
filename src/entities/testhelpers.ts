import { Colour } from './types';
import Block from './block';

export const createGrid = (colours: Colour[][]): Block[][] =>
  colours.map((col: Colour[], x) =>
    col.map((colour: Colour, y) => new Block({ x, y }, colour))
  );

export const findBlockOn = (grid: Block[][]) => (x: number, y: number) =>
  grid[x][y];
