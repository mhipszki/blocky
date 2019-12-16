import { Coordinate, Colour } from './types';

class Block {
  private _position: Coordinate;

  constructor(position: Coordinate, readonly colour: Colour) {
    this._position = position;
  }

  get position(): Coordinate {
    return this._position;
  }
}

export default Block;
