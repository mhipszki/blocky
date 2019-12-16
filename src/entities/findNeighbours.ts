import Block from './block';
import { Point } from './types';

const vectors: Point[] = [
  [-1, 0], // on the left
  [0, 1], // above
  [0, -1], // below
  [1, 0], // on the right
];

const shiftVectorsTo = (block: Block) => ([x, y]: Point): Point => [
  block.x + x,
  block.y + y,
];

const coordinatesIn = (grid: Block[][]) => ([x, y]: Point) =>
  x >= 0 && y >= 0 && x < grid.length && y < grid[0].length;

const toNeighboursIn = (grid: Block[][]) => ([x, y]: Point) => grid[x][y];

export default (block: Block, grid: Block[][]): Block[] =>
  vectors
    .map(shiftVectorsTo(block))
    .filter(coordinatesIn(grid))
    .map(toNeighboursIn(grid));
