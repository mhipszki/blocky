export interface Coordinate {
  x: number;
  y: number;
}

export type Point = [number, number];

export const Red = 'red';
export const Green = 'green';
export const Blue = 'blue';
export const Yellow = 'yellow';
export const Empty = 'empty';

export const colours = [Red, Green, Blue, Yellow, Empty] as const;

export type Colour = typeof colours[number];
