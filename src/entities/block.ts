import { Coordinate, Colour } from './types';

class Block {
  private _position: Coordinate;

  constructor(position: Coordinate, readonly colour: Colour) {
    this._position = position;
  }

  moveDown() {
    this._position.y--;
  }

  get position(): Coordinate {
    return this._position;
  }
}

export default Block;
