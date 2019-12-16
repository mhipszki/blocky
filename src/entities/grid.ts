import { Coordinate } from './types';

class Grid {
  readonly width: number;
  readonly height: number;

  constructor(readonly lowerLeft: Coordinate, readonly upperRight: Coordinate) {
    this.width = upperRight.x - lowerLeft.x + 1;
    this.height = upperRight.y - lowerLeft.y + 1;
  }
}

export default Grid;
