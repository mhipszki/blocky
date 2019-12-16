import Block from './block';
import { Coordinate, Colour, Red } from './types';

test('can be created with a position and a colour', () => {
  const position: Coordinate = { x: 1, y: 1 };
  const colour: Colour = Red;
  const block = new Block(position, colour);
  expect(block.position).toEqual({ x: 1, y: 1 });
  expect(block.colour).toBe(Red);
});

test('can be moved down along the Y axis', () => {
  const position: Coordinate = { x: 1, y: 1 };
  const colour: Colour = Red;
  const block = new Block(position, colour);
  block.moveDown();
  expect(block.position).toEqual({ x: 1, y: 0 });
  block.moveDown();
  expect(block.position).toEqual({ x: 1, y: -1 });
});
